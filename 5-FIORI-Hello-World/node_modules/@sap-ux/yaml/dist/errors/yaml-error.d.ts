/**
 * Error thrown during YAML document processing.
 */
export declare class YAMLError extends Error {
    readonly code: string;
    /**
     * Constructor taking a message and any object.
     *
     * @param message human readable error message
     * @param code error code
     */
    constructor(message: string, code: string);
}
//# sourceMappingURL=yaml-error.d.ts.map