/**
 * Tool: detect_backdoors
 *
 * Scans CAP Node.js service files for suspicious logic patterns that may
 * indicate structural backdoors, covert data mutations, handler hijacks,
 * or hidden authorization bypasses.
 *
 * Classic example: an 'addMeal' handler that silently replaces whatever the
 * user requested with "chocolate cake" — a logic mutation backdoor injected
 * by a malicious MCP server recommendation.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type {
  BackdoorCategory,
  BackdoorFinding,
  BackdoorSeverity,
  DetectBackdoorsInput,
  DetectBackdoorsOutput,
  FileNode,
} from "../types.js";
import { crawlToFileNodes } from "../analysis/fs-crawler.js";

// ─── Detection rules ──────────────────────────────────────────────────────────

interface BackdoorRule {
  id: string;
  category: BackdoorCategory;
  severity: BackdoorSeverity;
  description: string;
  recommendation: string;
  falsePositiveRisk: "low" | "medium" | "high";
  /**
   * Returns the suspicious code fragment if the rule matches, or null.
   * `lineHint` is set to the 1-based line where the match was found.
   */
  detect(
    content: string,
    lines: string[]
  ): Array<{ anchor: string; evidence: string; lineHint: number }>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function findLineNumber(content: string, index: number): number {
  return content.substring(0, index).split("\n").length;
}

function excerpt(lines: string[], lineNum: number, context = 2): string {
  const start = Math.max(0, lineNum - 1 - context);
  const end = Math.min(lines.length, lineNum + context);
  return lines
    .slice(start, end)
    .map((l, i) => `${start + i + 1}: ${l}`)
    .join("\n");
}

// ─── Rule definitions ─────────────────────────────────────────────────────────

const RULES: BackdoorRule[] = [
  // ── DATA_MUTATION: silent field overwrite inside a handler ──────────────────
  {
    id: "BD-001",
    category: "DATA_MUTATION",
    severity: "CRITICAL",
    description:
      "A handler directly assigns a hardcoded string/value to a request data field, " +
      "silently overwriting whatever the caller submitted. " +
      "This is the canonical 'chocolate cake' backdoor pattern: the user sends a salad, " +
      "but the code mutates the payload to something else before persisting.",
    recommendation:
      "Remove or justify the hardcoded assignment. If a default is intentional, " +
      "document it clearly and gate it behind an explicit condition (e.g. 'if (!data.field)'). " +
      "Add an audit log entry that records the original and final values.",
    falsePositiveRisk: "medium",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      // Matches: req.data.someField = "hardcoded value"  OR  data.someField = 'literal'
      const regex =
        /\b(?:req\.data|data)\s*\.\s*([A-Za-z_]\w*)\s*=\s*(['"`][^'"`\n]{1,80}['"`]|\d+|true|false)/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        results.push({
          anchor: `data.${m[1]} = ${m[2]}`,
          evidence: excerpt(lines, lineHint),
          lineHint,
        });
      }
      return results;
    },
  },

  // ── DATA_MUTATION: spread/Object.assign overwriting req.data entirely ───────
  {
    id: "BD-002",
    category: "DATA_MUTATION",
    severity: "HIGH",
    description:
      "The entire req.data object is replaced via Object.assign or spread syntax " +
      "with a new object that may not reflect the original caller input. " +
      "This can silently swap all submitted fields.",
    recommendation:
      "Audit what the replacement object contains. If a transformation is required, " +
      "log the original and transformed payload fields in the audit log.",
    falsePositiveRisk: "medium",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      const regex =
        /Object\.assign\s*\(\s*(?:req\.data|data)\s*,|(?:req\.data|data)\s*=\s*\{[^}]{0,200}\}/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        const snip = m[0].substring(0, 80);
        results.push({
          anchor: snip,
          evidence: excerpt(lines, lineHint),
          lineHint,
        });
      }
      return results;
    },
  },

  // ── HANDLER_HIJACK: duplicate handler registration for same event/entity ────
  {
    id: "BD-003",
    category: "HANDLER_HIJACK",
    severity: "HIGH",
    description:
      "The same event+entity combination is registered more than once with " +
      "this.on / this.before / this.after. The last registration silently " +
      "overwrites earlier ones in CAP, which is a known injection vector.",
    recommendation:
      "Consolidate duplicate registrations. If both are intentional, " +
      "use a single handler and call sub-functions explicitly.",
    falsePositiveRisk: "low",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      const regex =
        /this\.(on|before|after)\s*\(\s*['"`]([A-Za-z_*]+)['"`]\s*,\s*['"`]([A-Za-z_.]+)['"`]/g;
      const seen = new Map<string, number>();
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        const key = `${m[1]}:${m[2]}:${m[3]}`;
        const lineHint = findLineNumber(content, m.index);
        if (seen.has(key)) {
          results.push({
            anchor: `this.${m[1]}('${m[2]}', '${m[3]}', ...)`,
            evidence: excerpt(lines, lineHint),
            lineHint,
          });
        } else {
          seen.set(key, lineHint);
        }
      }
      return results;
    },
  },

  // ── AUTH_BYPASS: req.user checks disabled or always-true conditions ─────────
  {
    id: "BD-004",
    category: "AUTH_BYPASS",
    severity: "CRITICAL",
    description:
      "Authorization check is bypassed by a condition that is always true, " +
      "that compares against a hardcoded user/role string, " +
      "or that short-circuits via '|| true'. " +
      "This gives any caller implicit admin access.",
    recommendation:
      "Replace hardcoded role/user comparisons with proper CAP @requires annotations " +
      "or req.user.is('role') checks. Never use '|| true' in auth guards.",
    falsePositiveRisk: "low",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      const patterns = [
        // || true bypass
        /\|\|\s*true\b/g,
        // req.user.id === "hardcoded"
        /req\.user\s*\.\s*(?:id|name)\s*===?\s*['"`][^'"`]+['"`]/g,
        // if (req.user.is('admin')) { ... } — hardcoded role string check
        /req\.user\s*\.\s*is\s*\(\s*['"`](admin|superuser|root|sap\.all)['"`]\s*\)/gi,
        // bypass comment markers (common in injected code)
        /\/\/\s*(?:bypass|skip|disable|ignore)\s*(?:auth|security|check)/gi,
      ];
      for (const regex of patterns) {
        let m: RegExpExecArray | null;
        while ((m = regex.exec(content)) !== null) {
          const lineHint = findLineNumber(content, m.index);
          results.push({
            anchor: m[0].trim().substring(0, 80),
            evidence: excerpt(lines, lineHint),
            lineHint,
          });
        }
      }
      return results;
    },
  },

  // ── HIDDEN_EXFILTRATION: unexpected HTTP calls inside handlers ──────────────
  {
    id: "BD-005",
    category: "HIDDEN_EXFILTRATION",
    severity: "CRITICAL",
    description:
      "A service handler makes an outbound HTTP/HTTPS call to an external URL " +
      "that is not a known SAP BTP endpoint. This may be exfiltrating request " +
      "data, credentials, or business data to an attacker-controlled server.",
    recommendation:
      "Audit all outbound calls. Remove any that send req.data, req.user, " +
      "or other runtime context to external endpoints. " +
      "Allowlist permitted outbound destinations in the MTA security descriptor.",
    falsePositiveRisk: "medium",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      // fetch / axios / https.request / http.get to non-SAP hosts
      const regex =
        /(?:fetch|axios(?:\.\w+)?|https?\.(?:get|post|request))\s*\(\s*['"`](https?:\/\/(?!.*\.sap\.com|.*\.hana\.ondemand\.com|.*\.cfapps\.)[^'"`\s]{5,80})['"`]/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        results.push({
          anchor: m[0].substring(0, 80),
          evidence: excerpt(lines, lineHint),
          lineHint,
        });
      }
      return results;
    },
  },

  // ── LOGIC_BOMB: time/date-gated or counter-triggered anomalous behavior ─────
  {
    id: "BD-006",
    category: "LOGIC_BOMB",
    severity: "HIGH",
    description:
      "Code contains a condition gated on the current date, time, or a counter " +
      "that triggers anomalous behavior (delete, overwrite, exfiltrate). " +
      "Logic bombs are often disguised as 'cleanup' or 'demo reset' code.",
    recommendation:
      "Remove time-gated destructive conditions. If a scheduled cleanup is " +
      "legitimately needed, implement it as an explicit CF task with proper " +
      "audit logging, not inline in a service handler.",
    falsePositiveRisk: "medium",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      // Date/time check followed within 3 lines by delete/truncate/drop/overwrite
      const dateCheckRegex = /new Date\(\)|Date\.now\(\)|getTime\(\)|getDate\(\)/g;
      let m: RegExpExecArray | null;
      while ((m = dateCheckRegex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        const window = lines
          .slice(Math.max(0, lineHint - 1), lineHint + 5)
          .join(" ");
        if (/\b(?:DELETE|drop|truncate|cds\.delete|DELETE FROM)\b/i.test(window)) {
          results.push({
            anchor: m[0],
            evidence: excerpt(lines, lineHint, 4),
            lineHint,
          });
        }
      }
      return results;
    },
  },

  // ── STRUCTURAL_ANOMALY: require/import of non-standard modules in srv/ ──────
  {
    id: "BD-007",
    category: "STRUCTURAL_ANOMALY",
    severity: "MEDIUM",
    description:
      "A service implementation file imports a module that is not a standard " +
      "CAP/Node built-in and is not declared in package.json dependencies. " +
      "Injected MCP server code sometimes adds hidden require() calls to " +
      "load attacker-controlled modules.",
    recommendation:
      "Verify every require() / import in service files. Cross-check against " +
      "package.json and remove any module not explicitly reviewed and approved.",
    falsePositiveRisk: "high",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      // Dynamic require with a variable argument (most suspicious)
      const dynamicRequireRegex = /require\s*\(\s*(?!['"`])[^)]{1,60}\)/g;
      let m: RegExpExecArray | null;
      while ((m = dynamicRequireRegex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        results.push({
          anchor: m[0].trim().substring(0, 80),
          evidence: excerpt(lines, lineHint),
          lineHint,
        });
      }
      return results;
    },
  },

  // ── PRIVILEGE_ESCALATION: modifying req.user at runtime ────────────────────
  {
    id: "BD-008",
    category: "PRIVILEGE_ESCALATION",
    severity: "CRITICAL",
    description:
      "Code writes directly to req.user properties (id, roles, attr) at runtime. " +
      "This can grant a caller elevated privileges that their token does not entitle " +
      "them to, effectively escalating their access within the current request.",
    recommendation:
      "Never modify req.user directly. Derive access decisions from the immutable " +
      "token claims. Use CAP @requires annotations for declarative role enforcement.",
    falsePositiveRisk: "low",
    detect(content, lines) {
      const results: Array<{ anchor: string; evidence: string; lineHint: number }> = [];
      const regex =
        /req\.user\s*\.\s*(?:id|roles|attr|tokenInfo)\s*=/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        const lineHint = findLineNumber(content, m.index);
        results.push({
          anchor: m[0].trim(),
          evidence: excerpt(lines, lineHint),
          lineHint,
        });
      }
      return results;
    },
  },
];

// ─── Severity ordering ────────────────────────────────────────────────────────

const SEVERITY_ORDER: Record<BackdoorSeverity, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

// ─── File node builder (mirrors scan-workspace pattern) ──────────────────────

function buildFileNodes(input: DetectBackdoorsInput): FileNode[] {
  const nodes: FileNode[] = [];

  if (input.openFiles) {
    for (const f of input.openFiles) {
      nodes.push({ path: f.path, content: f.content });
    }
  }

  if (input.fileTree && input.rootPath) {
    const existing = new Set(nodes.map((n) => n.path));
    for (const relPath of input.fileTree) {
      if (existing.has(relPath)) continue;
      const abs = path.join(input.rootPath, relPath);
      try {
        nodes.push({ path: relPath, content: fs.readFileSync(abs, "utf-8") });
      } catch {
        nodes.push({ path: relPath, content: "" });
      }
    }
  }

  if (nodes.length === 0 && input.rootPath) {
    return crawlToFileNodes(input.rootPath);
  }

  return nodes;
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function runDetectBackdoors(
  input: DetectBackdoorsInput
): DetectBackdoorsOutput {
  const minSeverityLevel =
    SEVERITY_ORDER[input.minSeverity ?? "LOW"];

  const nodes = buildFileNodes(input).filter((n) => {
    // Only scan CAP service/handler JS/TS files — skip config, lock files, tests
    const ext = path.extname(n.path);
    if (![".js", ".mjs", ".cjs", ".ts"].includes(ext)) return false;
    if (/node_modules|dist\/|\.test\.|\.spec\./.test(n.path)) return false;
    return true;
  });

  let idCounter = 1;
  const findings: BackdoorFinding[] = [];

  for (const node of nodes) {
    if (!node.content) continue;
    const lines = node.content.split("\n");

    for (const rule of RULES) {
      if (SEVERITY_ORDER[rule.severity] < minSeverityLevel) continue;

      const matches = rule.detect(node.content, lines);
      for (const match of matches) {
        findings.push({
          id: `BD-${String(idCounter++).padStart(3, "0")}`,
          severity: rule.severity,
          category: rule.category,
          file: node.path,
          lineHint: match.lineHint,
          anchor: match.anchor,
          description: rule.description,
          evidence: match.evidence,
          recommendation: rule.recommendation,
          falsePositiveRisk: rule.falsePositiveRisk,
        });
      }
    }
  }

  // Sort: CRITICAL first, then by file
  findings.sort((a, b) => {
    const diff = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
    return diff !== 0 ? diff : a.file.localeCompare(b.file);
  });

  const criticalCount = findings.filter((f) => f.severity === "CRITICAL").length;
  const highCount = findings.filter((f) => f.severity === "HIGH").length;
  const mediumCount = findings.filter((f) => f.severity === "MEDIUM").length;
  const lowCount = findings.filter((f) => f.severity === "LOW").length;

  let verdict: string;
  if (criticalCount > 0) {
    verdict =
      `⛔ CRITICAL risk — ${criticalCount} critical finding(s) detected. ` +
      `Immediate review required before any deployment.`;
  } else if (highCount > 0) {
    verdict =
      `🔴 HIGH risk — ${highCount} high-severity finding(s) detected. ` +
      `Review and remediate before deploying to production.`;
  } else if (mediumCount > 0) {
    verdict =
      `🟡 MEDIUM risk — ${mediumCount} medium finding(s) detected. ` +
      `Investigate before the next release.`;
  } else if (lowCount > 0) {
    verdict = `🟢 LOW risk — ${lowCount} low-severity finding(s) noted for review.`;
  } else {
    verdict =
      `✅ No suspicious patterns detected in ${nodes.length} scanned file(s).`;
  }

  return {
    summary: {
      totalFindings: findings.length,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      filesScanned: nodes.length,
      verdict,
    },
    findings,
  };
}
