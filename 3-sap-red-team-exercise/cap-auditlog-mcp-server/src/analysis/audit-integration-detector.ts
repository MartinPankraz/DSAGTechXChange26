/**
 * Audit integration detection.
 * Checks for the presence of SAP audit logging libraries,
 * CDS configuration, mta.yaml bindings, and VCAP_SERVICES usage.
 */

import type { AuditIntegration, AuditLibrary, FileNode } from "../types.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDependencies(
  content: string
): Record<string, string> {
  try {
    const pkg = JSON.parse(content) as Record<
      string,
      Record<string, string> | unknown
    >;
    return {
      ...(pkg["dependencies"] as Record<string, string> | undefined ?? {}),
      ...(pkg["devDependencies"] as Record<string, string> | undefined ?? {}),
    };
  } catch {
    return {};
  }
}

// ─── Library Detection ────────────────────────────────────────────────────────

/**
 * Detects which audit logging library (if any) is declared in package.json files.
 * Preference order: @cap-js/audit-logging > @sap/audit-logging > none
 */
export function detectAuditLibrary(files: FileNode[]): AuditLibrary {
  for (const file of files) {
    if (!file.path.endsWith("package.json")) continue;
    const deps = parseDependencies(file.content);
    if ("@cap-js/audit-logging" in deps) return "@cap-js/audit-logging";
    if ("@sap/audit-logging" in deps) return "@sap/audit-logging";
  }
  return "none";
}

// ─── CDS requires detection ───────────────────────────────────────────────────

/**
 * Returns true when .cdsrc.json or package.json cds section references
 * audit-logging plugin in the `requires` section.
 */
export function hasCdsAuditLoggingConfig(files: FileNode[]): boolean {
  for (const file of files) {
    // package.json cds section
    if (file.path.endsWith("package.json")) {
      try {
        const pkg = JSON.parse(file.content) as Record<string, unknown>;
        const cds = pkg["cds"] as Record<string, unknown> | undefined;
        if (cds) {
          const str = JSON.stringify(cds);
          if (str.includes("audit-logging") || str.includes("audit_logging")) {
            return true;
          }
        }
      } catch {
        // ignore
      }
    }

    // .cdsrc.json
    if (file.path.endsWith(".cdsrc.json")) {
      if (
        file.content.includes("audit-logging") ||
        file.content.includes("audit_logging")
      ) {
        return true;
      }
    }
  }
  return false;
}

// ─── MTA detection ────────────────────────────────────────────────────────────

/**
 * Returns true when mta.yaml references an auditlog service resource.
 */
export function hasMtaAuditLogResource(files: FileNode[]): boolean {
  for (const file of files) {
    if (file.path.endsWith("mta.yaml") || file.path.endsWith("mta.yml")) {
      if (
        /type:\s*org\.cloudfoundry\.managed-service/.test(file.content) &&
        /auditlog/.test(file.content)
      ) {
        return true;
      }
      if (/auditlog-api/.test(file.content)) {
        return true;
      }
    }
  }
  return false;
}

// ─── VCAP detection ───────────────────────────────────────────────────────────

/**
 * Returns true when any file references VCAP_SERVICES with auditlog.
 */
export function hasVcapServicesAuditLog(files: FileNode[]): boolean {
  for (const file of files) {
    if (
      /VCAP_SERVICES/.test(file.content) &&
      /auditlog/.test(file.content)
    ) {
      return true;
    }
  }
  return false;
}

// ─── Gap Detection ────────────────────────────────────────────────────────────

/**
 * Returns an array of integration gap descriptions based on the detection results.
 */
export function detectIntegrationGaps(
  library: AuditLibrary,
  configuredInCds: boolean,
  mtaPresent: boolean,
  vcapUsed: boolean
): string[] {
  const gaps: string[] = [];

  if (library === "none") {
    gaps.push(
      "No audit logging library detected in package.json. " +
        "Add @cap-js/audit-logging (preferred) or @sap/audit-logging."
    );
  }

  if (library === "@sap/audit-logging" && !configuredInCds) {
    gaps.push(
      "@sap/audit-logging detected but no CDS requires configuration found. " +
        "Configure it under cds.requires.audit-log in package.json or .cdsrc.json."
    );
  }

  if (library === "@cap-js/audit-logging" && !configuredInCds) {
    gaps.push(
      "@cap-js/audit-logging detected but cds.requires.audit-log not found. " +
        "Add cds.requires.auditlog = { impl: '@cap-js/audit-logging' } or enable via cds.audit-logging."
    );
  }

  if (!mtaPresent) {
    gaps.push(
      "No mta.yaml auditlog service resource detected. " +
        "Add an org.cloudfoundry.managed-service resource of type auditlog-api and bind it to your app module."
    );
  }

  if (!vcapUsed && !mtaPresent) {
    gaps.push(
      "No VCAP_SERVICES auditlog binding detected. " +
        "Ensure the auditlog service is bound (cf bind-service) and VCAP_SERVICES is available at runtime."
    );
  }

  return gaps;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * Full audit integration analysis for a set of workspace files.
 */
export function detectAuditIntegration(files: FileNode[]): AuditIntegration {
  const library = detectAuditLibrary(files);
  const configuredInCdsRequires = hasCdsAuditLoggingConfig(files);
  const mtaResourcePresent = hasMtaAuditLogResource(files);
  const vcapServicesUsed = hasVcapServicesAuditLog(files);
  const capPluginActive =
    library === "@cap-js/audit-logging" && configuredInCdsRequires;

  const integrationGaps = detectIntegrationGaps(
    library,
    configuredInCdsRequires,
    mtaResourcePresent,
    vcapServicesUsed
  );

  return {
    library,
    configuredInCdsRequires,
    mtaResourcePresent,
    vcapServicesUsed,
    capPluginActive,
    integrationGaps,
  };
}
