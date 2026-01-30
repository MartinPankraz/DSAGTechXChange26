"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWinstonLogLevel = toWinstonLogLevel;
exports.toWinstonTransport = toWinstonTransport;
const types_1 = require("../types");
const winston_1 = __importStar(require("winston"));
const transports_1 = require("../transports");
const null_transport_1 = require("./null-transport");
const vscode_output_channel_transport_1 = require("./vscode-output-channel-transport");
const node_util_1 = require("node:util");
const chalk_1 = __importDefault(require("chalk"));
/**
 * Translate type {LogLevel} to what Winston understands.
 *
 * @param {LogLevel} logLevel - optional logLevel
 * @returns log - level that Winston understands (https://github.com/winstonjs/winston#logging-levels)
 */
function toWinstonLogLevel(logLevel) {
    return logLevel === undefined ? undefined : types_1.LogLevel[logLevel].toLowerCase();
}
const toWinstonTransportOptions = (transportOptions) => {
    const { logLevel, ...opts } = transportOptions;
    return { ...opts, level: toWinstonLogLevel(logLevel) };
};
const levelColor = {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    verbose: 'blue',
    silly: 'magenta',
    debug: 'cyan'
};
const hasColorSupport = () => process.stdout.isTTY;
const colorFn = (color) => {
    try {
        return color ? chalk_1.default.keyword(color) : undefined;
    }
    catch {
        return undefined;
    }
};
const ui5ToolingFormat = (moduleName) => winston_1.format.combine(winston_1.format.colorize(), winston_1.format.label({ label: moduleName }), winston_1.format.printf(({ level, message, label }) => {
    let msg = typeof message === 'string' ? message : (0, node_util_1.inspect)(message);
    msg = msg.split(/\r?\n/).join(`\n${level} ${chalk_1.default.magenta(label)} `);
    return `${level} ${chalk_1.default.magenta(label)} ${msg}`;
}));
const decorateLevel = (level) => {
    const padded = level.padEnd(7);
    if (hasColorSupport()) {
        const decorator = colorFn(levelColor[level]);
        if (decorator) {
            return decorator(padded);
        }
    }
    return padded;
};
/**
 * Return a colored label if label and color are specified, _if_ we running on a TTY.
 * Else return `''`
 *
 * @param label - Label name
 * @param labelColor - Label color
 * @returns {string} decorated label
 */
const decorateLabel = (label, labelColor) => {
    let l = label ?? '';
    if (hasColorSupport() && label && typeof labelColor === 'string') {
        const decorator = colorFn(labelColor);
        if (decorator) {
            l = decorator(label);
        }
    }
    return l;
};
const consoleFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message, label, labelColor, ...meta }) => {
    const msg = typeof message === 'string' ? message : (0, node_util_1.inspect)(message);
    const lvl = decorateLevel(level);
    return `${timestamp} ${lvl} ${decorateLabel(label, labelColor)}: ${msg} ${Object.keys(meta).length ? (0, node_util_1.inspect)(meta) : ''}`;
}));
/**
 * Take a type {Transport} and return the corresponding type {WinstonTransport} will throw an error if the transport is not recognized.
 *
 * @param transport - transport to convert
 * @returns {WinstonTransport} winston transport
 */
function toWinstonTransport(transport) {
    if (transport instanceof transports_1.NullTransport) {
        return new null_transport_1.NullTransport();
    }
    else if (transport instanceof transports_1.ConsoleTransport) {
        return new winston_1.default.transports.Console({
            ...toWinstonTransportOptions(transport.options),
            format: consoleFormat
        });
    }
    else if (transport instanceof transports_1.FileTransport) {
        return new winston_1.default.transports.File(toWinstonTransportOptions(transport.options));
    }
    else if (transport instanceof transports_1.VSCodeTransport) {
        return new vscode_output_channel_transport_1.VSCodeTransport(toWinstonTransportOptions(transport.options));
    }
    else if (transport instanceof transports_1.UI5ToolingTransport) {
        return new winston_1.default.transports.Console({
            ...toWinstonTransportOptions(transport.options),
            format: ui5ToolingFormat(transport.options.moduleName)
        });
    }
    else if (transport instanceof transports_1.ArrayTransport) {
        return transport;
    }
    else {
        throw new Error('Unrecognized transport type');
    }
}
//# sourceMappingURL=adapter.js.map