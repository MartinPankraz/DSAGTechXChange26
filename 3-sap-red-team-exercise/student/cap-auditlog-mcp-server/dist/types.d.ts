/**
 * Shared types and Zod schemas for the CAP Audit Log MCP Server.
 * All tool inputs/outputs are validated against these schemas.
 */
import { z } from "zod";
export type DetectedStack = "cap" | "ui5";
export declare const OpenFileSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    content: string;
}, {
    path: string;
    content: string;
}>;
export type OpenFile = z.infer<typeof OpenFileSchema>;
export declare const AuditLibrary: z.ZodEnum<["@cap-js/audit-logging", "@sap/audit-logging", "none"]>;
export type AuditLibrary = z.infer<typeof AuditLibrary>;
export declare const AuditIntegrationSchema: z.ZodObject<{
    library: z.ZodEnum<["@cap-js/audit-logging", "@sap/audit-logging", "none"]>;
    configuredInCdsRequires: z.ZodBoolean;
    mtaResourcePresent: z.ZodBoolean;
    vcapServicesUsed: z.ZodBoolean;
    capPluginActive: z.ZodBoolean;
    integrationGaps: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
    configuredInCdsRequires: boolean;
    mtaResourcePresent: boolean;
    vcapServicesUsed: boolean;
    capPluginActive: boolean;
    integrationGaps: string[];
}, {
    library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
    configuredInCdsRequires: boolean;
    mtaResourcePresent: boolean;
    vcapServicesUsed: boolean;
    capPluginActive: boolean;
    integrationGaps: string[];
}>;
export type AuditIntegration = z.infer<typeof AuditIntegrationSchema>;
export declare const EvidenceSchema: z.ZodObject<{
    capFiles: z.ZodArray<z.ZodString, "many">;
    ui5Files: z.ZodArray<z.ZodString, "many">;
    packageJsonPaths: z.ZodArray<z.ZodString, "many">;
    handlerPatterns: z.ZodArray<z.ZodString, "many">;
    sensitiveEntities: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    capFiles: string[];
    ui5Files: string[];
    packageJsonPaths: string[];
    handlerPatterns: string[];
    sensitiveEntities: string[];
}, {
    capFiles: string[];
    ui5Files: string[];
    packageJsonPaths: string[];
    handlerPatterns: string[];
    sensitiveEntities: string[];
}>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export declare const SuggestionTypeSchema: z.ZodEnum<["AUDIT_LOG", "APP_LOG"]>;
export type SuggestionType = z.infer<typeof SuggestionTypeSchema>;
export declare const PrioritySchema: z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>;
export type Priority = z.infer<typeof PrioritySchema>;
export declare const WhatToLogSchema: z.ZodObject<{
    actor: z.ZodString;
    action: z.ZodString;
    object: z.ZodString;
    objectId: z.ZodString;
    outcome: z.ZodEnum<["success", "failure", "denied"]>;
    tenant: z.ZodString;
    correlationId: z.ZodString;
    additionalAttributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    object: string;
    actor: string;
    action: string;
    objectId: string;
    outcome: "success" | "failure" | "denied";
    tenant: string;
    correlationId: string;
    additionalAttributes?: Record<string, string> | undefined;
}, {
    object: string;
    actor: string;
    action: string;
    objectId: string;
    outcome: "success" | "failure" | "denied";
    tenant: string;
    correlationId: string;
    additionalAttributes?: Record<string, string> | undefined;
}>;
export type WhatToLog = z.infer<typeof WhatToLogSchema>;
export declare const AnchorSchema: z.ZodObject<{
    type: z.ZodEnum<["function_name", "pattern", "line_start", "after_require", "before_return"]>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
}, {
    value: string;
    type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
}>;
export type Anchor = z.infer<typeof AnchorSchema>;
export declare const CodeSnippetSchema: z.ZodObject<{
    snippet: z.ZodString;
    imports: z.ZodArray<z.ZodString, "many">;
    setupNotes: z.ZodArray<z.ZodString, "many">;
    wrapperNeeded: z.ZodBoolean;
    wrapperPath: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    snippet: string;
    imports: string[];
    setupNotes: string[];
    wrapperNeeded: boolean;
    wrapperPath?: string | undefined;
}, {
    snippet: string;
    imports: string[];
    setupNotes: string[];
    wrapperNeeded: boolean;
    wrapperPath?: string | undefined;
}>;
export type CodeSnippet = z.infer<typeof CodeSnippetSchema>;
export declare const PrivacyNoteSchema: z.ZodObject<{
    piiFields: z.ZodArray<z.ZodString, "many">;
    maskingAdvice: z.ZodString;
    legalBasis: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    piiFields: string[];
    maskingAdvice: string;
    legalBasis?: string | undefined;
}, {
    piiFields: string[];
    maskingAdvice: string;
    legalBasis?: string | undefined;
}>;
export type PrivacyNote = z.infer<typeof PrivacyNoteSchema>;
export declare const ValidationStepsSchema: z.ZodObject<{
    unitTestHint: z.ZodString;
    btpVerification: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    unitTestHint: string;
    btpVerification: string[];
}, {
    unitTestHint: string;
    btpVerification: string[];
}>;
export type ValidationSteps = z.infer<typeof ValidationStepsSchema>;
export declare const SuggestionEditSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["AUDIT_LOG", "APP_LOG"]>;
    priority: z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>;
    file: z.ZodString;
    anchor: z.ZodObject<{
        type: z.ZodEnum<["function_name", "pattern", "line_start", "after_require", "before_return"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
    }, {
        value: string;
        type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
    }>;
    line_hint: z.ZodOptional<z.ZodNumber>;
    why: z.ZodString;
    what_to_log: z.ZodObject<{
        actor: z.ZodString;
        action: z.ZodString;
        object: z.ZodString;
        objectId: z.ZodString;
        outcome: z.ZodEnum<["success", "failure", "denied"]>;
        tenant: z.ZodString;
        correlationId: z.ZodString;
        additionalAttributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        object: string;
        actor: string;
        action: string;
        objectId: string;
        outcome: "success" | "failure" | "denied";
        tenant: string;
        correlationId: string;
        additionalAttributes?: Record<string, string> | undefined;
    }, {
        object: string;
        actor: string;
        action: string;
        objectId: string;
        outcome: "success" | "failure" | "denied";
        tenant: string;
        correlationId: string;
        additionalAttributes?: Record<string, string> | undefined;
    }>;
    how: z.ZodObject<{
        snippet: z.ZodString;
        imports: z.ZodArray<z.ZodString, "many">;
        setupNotes: z.ZodArray<z.ZodString, "many">;
        wrapperNeeded: z.ZodBoolean;
        wrapperPath: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        snippet: string;
        imports: string[];
        setupNotes: string[];
        wrapperNeeded: boolean;
        wrapperPath?: string | undefined;
    }, {
        snippet: string;
        imports: string[];
        setupNotes: string[];
        wrapperNeeded: boolean;
        wrapperPath?: string | undefined;
    }>;
    privacy_notes: z.ZodObject<{
        piiFields: z.ZodArray<z.ZodString, "many">;
        maskingAdvice: z.ZodString;
        legalBasis: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        piiFields: string[];
        maskingAdvice: string;
        legalBasis?: string | undefined;
    }, {
        piiFields: string[];
        maskingAdvice: string;
        legalBasis?: string | undefined;
    }>;
    validation: z.ZodObject<{
        unitTestHint: z.ZodString;
        btpVerification: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        unitTestHint: string;
        btpVerification: string[];
    }, {
        unitTestHint: string;
        btpVerification: string[];
    }>;
    correlation: z.ZodObject<{
        strategy: z.ZodString;
        headerName: z.ZodOptional<z.ZodString>;
        capBinding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        strategy: string;
        headerName?: string | undefined;
        capBinding?: string | undefined;
    }, {
        strategy: string;
        headerName?: string | undefined;
        capBinding?: string | undefined;
    }>;
    confidence: z.ZodNumber;
    ui5BackendNote: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    validation: {
        unitTestHint: string;
        btpVerification: string[];
    };
    type: "AUDIT_LOG" | "APP_LOG";
    id: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    file: string;
    anchor: {
        value: string;
        type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
    };
    why: string;
    what_to_log: {
        object: string;
        actor: string;
        action: string;
        objectId: string;
        outcome: "success" | "failure" | "denied";
        tenant: string;
        correlationId: string;
        additionalAttributes?: Record<string, string> | undefined;
    };
    how: {
        snippet: string;
        imports: string[];
        setupNotes: string[];
        wrapperNeeded: boolean;
        wrapperPath?: string | undefined;
    };
    privacy_notes: {
        piiFields: string[];
        maskingAdvice: string;
        legalBasis?: string | undefined;
    };
    correlation: {
        strategy: string;
        headerName?: string | undefined;
        capBinding?: string | undefined;
    };
    confidence: number;
    line_hint?: number | undefined;
    ui5BackendNote?: string | undefined;
}, {
    validation: {
        unitTestHint: string;
        btpVerification: string[];
    };
    type: "AUDIT_LOG" | "APP_LOG";
    id: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    file: string;
    anchor: {
        value: string;
        type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
    };
    why: string;
    what_to_log: {
        object: string;
        actor: string;
        action: string;
        objectId: string;
        outcome: "success" | "failure" | "denied";
        tenant: string;
        correlationId: string;
        additionalAttributes?: Record<string, string> | undefined;
    };
    how: {
        snippet: string;
        imports: string[];
        setupNotes: string[];
        wrapperNeeded: boolean;
        wrapperPath?: string | undefined;
    };
    privacy_notes: {
        piiFields: string[];
        maskingAdvice: string;
        legalBasis?: string | undefined;
    };
    correlation: {
        strategy: string;
        headerName?: string | undefined;
        capBinding?: string | undefined;
    };
    confidence: number;
    line_hint?: number | undefined;
    ui5BackendNote?: string | undefined;
}>;
export type SuggestionEdit = z.infer<typeof SuggestionEditSchema>;
export declare const ScanWorkspaceInputSchema: z.ZodObject<{
    rootPath: z.ZodOptional<z.ZodString>;
    fileList: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    openFiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        content: string;
    }, {
        path: string;
        content: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    rootPath?: string | undefined;
    fileList?: string[] | undefined;
    openFiles?: {
        path: string;
        content: string;
    }[] | undefined;
}, {
    rootPath?: string | undefined;
    fileList?: string[] | undefined;
    openFiles?: {
        path: string;
        content: string;
    }[] | undefined;
}>;
export type ScanWorkspaceInput = z.infer<typeof ScanWorkspaceInputSchema>;
export declare const ScanWorkspaceOutputSchema: z.ZodObject<{
    detectedStacks: z.ZodArray<z.ZodEnum<["cap", "ui5"]>, "many">;
    evidence: z.ZodObject<{
        capFiles: z.ZodArray<z.ZodString, "many">;
        ui5Files: z.ZodArray<z.ZodString, "many">;
        packageJsonPaths: z.ZodArray<z.ZodString, "many">;
        handlerPatterns: z.ZodArray<z.ZodString, "many">;
        sensitiveEntities: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        capFiles: string[];
        ui5Files: string[];
        packageJsonPaths: string[];
        handlerPatterns: string[];
        sensitiveEntities: string[];
    }, {
        capFiles: string[];
        ui5Files: string[];
        packageJsonPaths: string[];
        handlerPatterns: string[];
        sensitiveEntities: string[];
    }>;
    auditIntegration: z.ZodObject<{
        library: z.ZodEnum<["@cap-js/audit-logging", "@sap/audit-logging", "none"]>;
        configuredInCdsRequires: z.ZodBoolean;
        mtaResourcePresent: z.ZodBoolean;
        vcapServicesUsed: z.ZodBoolean;
        capPluginActive: z.ZodBoolean;
        integrationGaps: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        configuredInCdsRequires: boolean;
        mtaResourcePresent: boolean;
        vcapServicesUsed: boolean;
        capPluginActive: boolean;
        integrationGaps: string[];
    }, {
        library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        configuredInCdsRequires: boolean;
        mtaResourcePresent: boolean;
        vcapServicesUsed: boolean;
        capPluginActive: boolean;
        integrationGaps: string[];
    }>;
    recommendedNextSteps: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    detectedStacks: ("cap" | "ui5")[];
    evidence: {
        capFiles: string[];
        ui5Files: string[];
        packageJsonPaths: string[];
        handlerPatterns: string[];
        sensitiveEntities: string[];
    };
    auditIntegration: {
        library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        configuredInCdsRequires: boolean;
        mtaResourcePresent: boolean;
        vcapServicesUsed: boolean;
        capPluginActive: boolean;
        integrationGaps: string[];
    };
    recommendedNextSteps: string[];
}, {
    detectedStacks: ("cap" | "ui5")[];
    evidence: {
        capFiles: string[];
        ui5Files: string[];
        packageJsonPaths: string[];
        handlerPatterns: string[];
        sensitiveEntities: string[];
    };
    auditIntegration: {
        library: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        configuredInCdsRequires: boolean;
        mtaResourcePresent: boolean;
        vcapServicesUsed: boolean;
        capPluginActive: boolean;
        integrationGaps: string[];
    };
    recommendedNextSteps: string[];
}>;
export type ScanWorkspaceOutput = z.infer<typeof ScanWorkspaceOutputSchema>;
export declare const SuggestLoggingInputSchema: z.ZodObject<{
    rootPath: z.ZodOptional<z.ZodString>;
    fileTree: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    openFiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        content: string;
    }, {
        path: string;
        content: string;
    }>, "many">>;
    diff: z.ZodOptional<z.ZodString>;
    focus: z.ZodDefault<z.ZodEnum<["audit", "errors", "performance", "all"]>>;
    maxSuggestions: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    focus: "audit" | "errors" | "performance" | "all";
    maxSuggestions: number;
    rootPath?: string | undefined;
    openFiles?: {
        path: string;
        content: string;
    }[] | undefined;
    fileTree?: string[] | undefined;
    diff?: string | undefined;
}, {
    rootPath?: string | undefined;
    openFiles?: {
        path: string;
        content: string;
    }[] | undefined;
    fileTree?: string[] | undefined;
    diff?: string | undefined;
    focus?: "audit" | "errors" | "performance" | "all" | undefined;
    maxSuggestions?: number | undefined;
}>;
export type SuggestLoggingInput = z.infer<typeof SuggestLoggingInputSchema>;
export declare const SuggestLoggingOutputSchema: z.ZodObject<{
    summary: z.ZodObject<{
        totalEdits: z.ZodNumber;
        auditLogEdits: z.ZodNumber;
        appLogEdits: z.ZodNumber;
        highPriorityCount: z.ZodNumber;
        detectedStacks: z.ZodArray<z.ZodEnum<["cap", "ui5"]>, "many">;
        auditLibraryDetected: z.ZodEnum<["@cap-js/audit-logging", "@sap/audit-logging", "none"]>;
        coverageWarnings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        detectedStacks: ("cap" | "ui5")[];
        totalEdits: number;
        auditLogEdits: number;
        appLogEdits: number;
        highPriorityCount: number;
        auditLibraryDetected: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        coverageWarnings: string[];
    }, {
        detectedStacks: ("cap" | "ui5")[];
        totalEdits: number;
        auditLogEdits: number;
        appLogEdits: number;
        highPriorityCount: number;
        auditLibraryDetected: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        coverageWarnings: string[];
    }>;
    edits: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["AUDIT_LOG", "APP_LOG"]>;
        priority: z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>;
        file: z.ZodString;
        anchor: z.ZodObject<{
            type: z.ZodEnum<["function_name", "pattern", "line_start", "after_require", "before_return"]>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        }, {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        }>;
        line_hint: z.ZodOptional<z.ZodNumber>;
        why: z.ZodString;
        what_to_log: z.ZodObject<{
            actor: z.ZodString;
            action: z.ZodString;
            object: z.ZodString;
            objectId: z.ZodString;
            outcome: z.ZodEnum<["success", "failure", "denied"]>;
            tenant: z.ZodString;
            correlationId: z.ZodString;
            additionalAttributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        }, {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        }>;
        how: z.ZodObject<{
            snippet: z.ZodString;
            imports: z.ZodArray<z.ZodString, "many">;
            setupNotes: z.ZodArray<z.ZodString, "many">;
            wrapperNeeded: z.ZodBoolean;
            wrapperPath: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        }, {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        }>;
        privacy_notes: z.ZodObject<{
            piiFields: z.ZodArray<z.ZodString, "many">;
            maskingAdvice: z.ZodString;
            legalBasis: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        }, {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        }>;
        validation: z.ZodObject<{
            unitTestHint: z.ZodString;
            btpVerification: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            unitTestHint: string;
            btpVerification: string[];
        }, {
            unitTestHint: string;
            btpVerification: string[];
        }>;
        correlation: z.ZodObject<{
            strategy: z.ZodString;
            headerName: z.ZodOptional<z.ZodString>;
            capBinding: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        }, {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        }>;
        confidence: z.ZodNumber;
        ui5BackendNote: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        validation: {
            unitTestHint: string;
            btpVerification: string[];
        };
        type: "AUDIT_LOG" | "APP_LOG";
        id: string;
        priority: "HIGH" | "MEDIUM" | "LOW";
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        why: string;
        what_to_log: {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        };
        how: {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        };
        privacy_notes: {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        };
        correlation: {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        };
        confidence: number;
        line_hint?: number | undefined;
        ui5BackendNote?: string | undefined;
    }, {
        validation: {
            unitTestHint: string;
            btpVerification: string[];
        };
        type: "AUDIT_LOG" | "APP_LOG";
        id: string;
        priority: "HIGH" | "MEDIUM" | "LOW";
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        why: string;
        what_to_log: {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        };
        how: {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        };
        privacy_notes: {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        };
        correlation: {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        };
        confidence: number;
        line_hint?: number | undefined;
        ui5BackendNote?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    summary: {
        detectedStacks: ("cap" | "ui5")[];
        totalEdits: number;
        auditLogEdits: number;
        appLogEdits: number;
        highPriorityCount: number;
        auditLibraryDetected: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        coverageWarnings: string[];
    };
    edits: {
        validation: {
            unitTestHint: string;
            btpVerification: string[];
        };
        type: "AUDIT_LOG" | "APP_LOG";
        id: string;
        priority: "HIGH" | "MEDIUM" | "LOW";
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        why: string;
        what_to_log: {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        };
        how: {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        };
        privacy_notes: {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        };
        correlation: {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        };
        confidence: number;
        line_hint?: number | undefined;
        ui5BackendNote?: string | undefined;
    }[];
}, {
    summary: {
        detectedStacks: ("cap" | "ui5")[];
        totalEdits: number;
        auditLogEdits: number;
        appLogEdits: number;
        highPriorityCount: number;
        auditLibraryDetected: "@cap-js/audit-logging" | "@sap/audit-logging" | "none";
        coverageWarnings: string[];
    };
    edits: {
        validation: {
            unitTestHint: string;
            btpVerification: string[];
        };
        type: "AUDIT_LOG" | "APP_LOG";
        id: string;
        priority: "HIGH" | "MEDIUM" | "LOW";
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        why: string;
        what_to_log: {
            object: string;
            actor: string;
            action: string;
            objectId: string;
            outcome: "success" | "failure" | "denied";
            tenant: string;
            correlationId: string;
            additionalAttributes?: Record<string, string> | undefined;
        };
        how: {
            snippet: string;
            imports: string[];
            setupNotes: string[];
            wrapperNeeded: boolean;
            wrapperPath?: string | undefined;
        };
        privacy_notes: {
            piiFields: string[];
            maskingAdvice: string;
            legalBasis?: string | undefined;
        };
        correlation: {
            strategy: string;
            headerName?: string | undefined;
            capBinding?: string | undefined;
        };
        confidence: number;
        line_hint?: number | undefined;
        ui5BackendNote?: string | undefined;
    }[];
}>;
export type SuggestLoggingOutput = z.infer<typeof SuggestLoggingOutputSchema>;
export declare const ExplainSuggestionInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type ExplainSuggestionInput = z.infer<typeof ExplainSuggestionInputSchema>;
export declare const ExplainSuggestionOutputSchema: z.ZodObject<{
    id: z.ZodString;
    expandedRationale: z.ZodString;
    privacyGuidance: z.ZodString;
    btpVerificationSteps: z.ZodArray<z.ZodString, "many">;
    alternativePlacements: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        anchor: z.ZodObject<{
            type: z.ZodEnum<["function_name", "pattern", "line_start", "after_require", "before_return"]>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        }, {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        }>;
        tradeoff: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        tradeoff: string;
    }, {
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        tradeoff: string;
    }>, "many">;
    references: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        url: string;
    }, {
        title: string;
        url: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    expandedRationale: string;
    privacyGuidance: string;
    btpVerificationSteps: string[];
    alternativePlacements: {
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        tradeoff: string;
    }[];
    references: {
        title: string;
        url: string;
    }[];
}, {
    id: string;
    expandedRationale: string;
    privacyGuidance: string;
    btpVerificationSteps: string[];
    alternativePlacements: {
        file: string;
        anchor: {
            value: string;
            type: "function_name" | "pattern" | "line_start" | "after_require" | "before_return";
        };
        tradeoff: string;
    }[];
    references: {
        title: string;
        url: string;
    }[];
}>;
export type ExplainSuggestionOutput = z.infer<typeof ExplainSuggestionOutputSchema>;
export interface FileNode {
    path: string;
    content: string;
}
export interface AnalysisContext {
    stacks: DetectedStack[];
    auditIntegration: AuditIntegration;
    evidence: Evidence;
    files: FileNode[];
}
//# sourceMappingURL=types.d.ts.map