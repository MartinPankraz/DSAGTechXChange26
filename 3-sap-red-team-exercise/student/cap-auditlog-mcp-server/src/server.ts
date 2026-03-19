#!/usr/bin/env node
/**
 * CAP Audit Log MCP Server
 * ========================
 * MCP server exposing three tools over stdio:
 *   - scan_workspace
 *   - suggest_logging
 *   - explain_suggestion
 *
 * Launch via:   node dist/server.js
 * Or in dev:    npx tsx src/server.ts
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ZodError } from "zod";

import {
  ScanWorkspaceInputSchema,
  SuggestLoggingInputSchema,
  ExplainSuggestionInputSchema,
  DetectBackdoorsInputSchema,
} from "./types.js";

import { runScanWorkspace } from "./tools/scan-workspace.js";
import { runSuggestLogging } from "./tools/suggest-logging.js";
import {
  runExplainSuggestion,
  registerSuggestions,
} from "./tools/explain-suggestion.js";
import { runDetectBackdoors } from "./tools/detect-backdoors.js";

// ─── Server definition ────────────────────────────────────────────────────────

const server = new Server(
  {
    name: "cap-auditlog-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ─── Tool definitions (schema advertised to MCP clients) ─────────────────────

server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: [
      {
        name: "scan_workspace",
        description:
          "Detects which SAP stacks (CAP Node.js, SAPUI5) exist in the workspace and assesses " +
          "the current state of SAP BTP Audit Log Service integration. " +
          "Returns detected stacks, evidence, audit library gaps, and recommended next steps.",
        inputSchema: {
          type: "object" as const,
          properties: {
            rootPath: {
              type: "string",
              description: "Absolute path to workspace root (optional when fileList or openFiles supplied)",
            },
            fileList: {
              type: "array",
              items: { type: "string" },
              description: "Explicit list of relative file paths to analyse",
            },
            openFiles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string" },
                  content: { type: "string" },
                },
                required: ["path", "content"],
              },
              description: "Files with their content already provided",
            },
          },
        },
      },
      {
        name: "suggest_logging",
        description:
          "Analyses CAP (Node.js) and SAPUI5 source files and produces actionable, " +
          "patch-like SuggestionEdits for adding AUDIT_LOG and APP_LOG instrumentation. " +
          "AUDIT_LOG suggestions target SAP BTP Audit Log Service; APP_LOG targets cds.log(). " +
          "UI5 frontend code never writes to Audit Log directly – backend placements are suggested instead.",
        inputSchema: {
          type: "object" as const,
          properties: {
            fileTree: {
              type: "array",
              items: { type: "string" },
              description: "List of relative file paths present in the workspace",
            },
            openFiles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string" },
                  content: { type: "string" },
                },
                required: ["path", "content"],
              },
              description: "Files with their content provided",
            },
            diff: {
              type: "string",
              description: "Unified diff of recent changes to scope suggestions",
            },
            focus: {
              type: "string",
              enum: ["audit", "errors", "performance", "all"],
              description: "Filter suggestions by category",
            },
            maxSuggestions: {
              type: "number",
              description: "Maximum number of suggestions to return (default 20)",
            },
          },
        },
      },
      {
        name: "explain_suggestion",
        description:
          "Returns expanded rationale, privacy guidance, BTP verification steps, " +
          "and alternative placements for a suggestion ID returned by suggest_logging. " +
          "Always call suggest_logging first to get valid suggestion IDs.",
        inputSchema: {
          type: "object" as const,
          properties: {
            id: {
              type: "string",
              description: "Suggestion ID (e.g. AUD-001) from suggest_logging output",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "detect_backdoors",
        description:
          "Scans CAP Node.js service files for suspicious logic patterns that may indicate " +
          "structural backdoors, covert data mutations, handler hijacks, or hidden authorization bypasses. " +
          "Detects patterns such as hardcoded field overwrites (e.g. silently replacing a meal with " +
          "'chocolate cake'), duplicate handler registrations, auth bypasses, outbound exfiltration calls, " +
          "logic bombs, and runtime privilege escalation. " +
          "Run this after accepting AI-generated code suggestions to verify no malicious patterns were injected.",
        inputSchema: {
          type: "object" as const,
          properties: {
            rootPath: {
              type: "string",
              description: "Absolute path to workspace root (used for filesystem crawl when openFiles is not supplied)",
            },
            fileTree: {
              type: "array",
              items: { type: "string" },
              description: "List of relative file paths to restrict analysis to",
            },
            openFiles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string" },
                  content: { type: "string" },
                },
                required: ["path", "content"],
              },
              description: "Files with their content already provided (avoids disk reads)",
            },
            minSeverity: {
              type: "string",
              enum: ["CRITICAL", "HIGH", "MEDIUM", "LOW"],
              description: "Filter out findings below this severity level (default: LOW)",
            },
          },
        },
      },
    ],
  };
});

// ─── Tool handlers ────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: Record<string, unknown> } }) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "scan_workspace") {
      const input = ScanWorkspaceInputSchema.parse(args ?? {});
      const result = runScanWorkspace(input);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === "suggest_logging") {
      const input = SuggestLoggingInputSchema.parse(args ?? {});
      const result = runSuggestLogging(input);

      // Populate the explain-suggestion registry with this run's edits
      registerSuggestions(result.edits);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === "explain_suggestion") {
      const input = ExplainSuggestionInputSchema.parse(args ?? {});
      const result = runExplainSuggestion(input);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === "detect_backdoors") {
      const input = DetectBackdoorsInputSchema.parse(args ?? {});
      const result = runDetectBackdoors(input);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { error: `Unknown tool: ${name}` },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  } catch (err) {
    let message: string;
    if (err instanceof ZodError) {
      message = `Input validation failed: ${(err as ZodError).errors.map((e: { path: (string|number)[]; message: string }) => `${e.path.join(".")}: ${e.message}`).join("; ")}`;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ error: message }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr so it doesn't pollute the MCP stdio channel
  process.stderr.write(
    "[cap-auditlog-mcp-server] Server started. Listening for MCP requests over stdio.\n"
  );
}

main().catch((err: unknown) => {
  process.stderr.write(
    `[cap-auditlog-mcp-server] Fatal: ${err instanceof Error ? err.message : String(err)}\n`
  );
  process.exit(1);
});

// Ensure ZodError is used at runtime (not just type-level)
// (no export needed – imported above for instanceof check)
