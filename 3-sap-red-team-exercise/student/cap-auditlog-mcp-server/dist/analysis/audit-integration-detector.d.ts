/**
 * Audit integration detection.
 * Checks for the presence of SAP audit logging libraries,
 * CDS configuration, mta.yaml bindings, and VCAP_SERVICES usage.
 */
import type { AuditIntegration, AuditLibrary, FileNode } from "../types.js";
/**
 * Detects which audit logging library (if any) is declared in package.json files.
 * Preference order: @cap-js/audit-logging > @sap/audit-logging > none
 */
export declare function detectAuditLibrary(files: FileNode[]): AuditLibrary;
/**
 * Returns true when .cdsrc.json or package.json cds section references
 * audit-logging plugin in the `requires` section.
 */
export declare function hasCdsAuditLoggingConfig(files: FileNode[]): boolean;
/**
 * Returns true when mta.yaml references an auditlog service resource.
 * Accepts both managed-service (freshly provisioned) and existing-service
 * (pre-provisioned instance) resource types, as both result in a valid
 * VCAP_SERVICES binding at CF runtime.
 */
export declare function hasMtaAuditLogResource(files: FileNode[]): boolean;
/**
 * Returns true when any file references VCAP_SERVICES with auditlog.
 */
export declare function hasVcapServicesAuditLog(files: FileNode[]): boolean;
/**
 * Returns an array of integration gap descriptions based on the detection results.
 */
export declare function detectIntegrationGaps(library: AuditLibrary, configuredInCds: boolean, mtaPresent: boolean, vcapUsed: boolean): string[];
/**
 * Full audit integration analysis for a set of workspace files.
 */
export declare function detectAuditIntegration(files: FileNode[]): AuditIntegration;
//# sourceMappingURL=audit-integration-detector.d.ts.map