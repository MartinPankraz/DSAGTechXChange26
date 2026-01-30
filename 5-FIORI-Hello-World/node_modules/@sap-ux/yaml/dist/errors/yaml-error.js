"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YAMLError = void 0;
/**
 * Error thrown during YAML document processing.
 */
class YAMLError extends Error {
    code;
    /**
     * Constructor taking a message and any object.
     *
     * @param message human readable error message
     * @param code error code
     */
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}
exports.YAMLError = YAMLError;
//# sourceMappingURL=yaml-error.js.map