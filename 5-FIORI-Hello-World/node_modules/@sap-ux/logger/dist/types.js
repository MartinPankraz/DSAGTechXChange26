"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = exports.LogLevel = void 0;
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
/**
 * Follows severity ordering specified in RFC 5424: https://datatracker.ietf.org/doc/html/rfc5424
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warn"] = 1] = "Warn";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
    LogLevel[LogLevel["Silly"] = 5] = "Silly";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
/**
 *  This is the base abstract transport class. A transport is a destination for the logs.
 *  Concrete classes are defined separately
 */
class Transport {
    /**
     * A utility copy method to make immutable, deep copies of objects.
     *
     * @param obj
     * @returns  a frozen deep clone of `obj`
     */
    copy(obj) {
        return Object.freeze((0, cloneDeep_1.default)(obj));
    }
}
exports.Transport = Transport;
//# sourceMappingURL=types.js.map