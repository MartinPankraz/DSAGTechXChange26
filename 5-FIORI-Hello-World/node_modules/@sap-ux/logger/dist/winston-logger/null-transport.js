"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
/**
 * This is a sink, the equivalent of writing to /dev/null
 */
class NullTransport extends winston_transport_1.default {
    log(_data, callback) {
        callback();
    }
}
exports.NullTransport = NullTransport;
//# sourceMappingURL=null-transport.js.map