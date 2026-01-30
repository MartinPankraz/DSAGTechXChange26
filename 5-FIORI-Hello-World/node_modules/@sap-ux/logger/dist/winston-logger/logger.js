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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const transports_1 = require("../transports");
const types_1 = require("../types");
const winston_1 = __importStar(require("winston"));
const adapter_1 = require("./adapter");
const utils_1 = require("./utils");
const node_util_1 = require("node:util");
const defaultLoggerOptions = {
    transports: [new transports_1.ConsoleTransport()]
};
class BaseWinstonLogger {
    _logger;
    logPrefix;
    logPrefixColor;
    winstonLevel;
    metadataOverride;
    // Maintain of map of transports. This is useful for adding/removing transports
    transportMap;
    initialize({ logger, transportMap, metadataOverride, winstonLevel, logPrefix }) {
        this._logger = logger;
        this.transportMap = transportMap;
        this.winstonLevel = winstonLevel;
        this.logPrefix = logPrefix;
        this.metadataOverride = metadataOverride;
    }
    info(message) {
        this.log({ level: types_1.LogLevel.Info, message });
    }
    warn(message) {
        this.log({ level: types_1.LogLevel.Warn, message });
    }
    error(message) {
        this.log({ level: types_1.LogLevel.Error, message });
    }
    debug(message) {
        this.log({ level: types_1.LogLevel.Debug, message });
    }
    log(data) {
        if (!this.transportMap.size) {
            // Nothing to do
            return;
        }
        if (typeof data === 'string') {
            this.winstonLog({ level: this.winstonLevel, message: data, metadata: this.metadataOverride });
        }
        else {
            const level = (0, adapter_1.toWinstonLogLevel)(data.level) ?? this._logger.level;
            this.winstonLog({ level, message: data.message, metadata: this.metadataOverride });
        }
    }
    winstonLog({ level, message, metadata }) {
        const msg = typeof message === 'string' ? message : (0, node_util_1.inspect)(message);
        this._logger.log(level, msg, metadata);
    }
    addToMap(transportMap, transport) {
        const winstonTransport = (0, adapter_1.toWinstonTransport)(transport);
        if (!transportMap.has(transport)) {
            transportMap.set(transport, winstonTransport);
            return winstonTransport;
        }
        return undefined;
    }
    add(transport) {
        const winstonTransport = this.addToMap(this.transportMap, transport);
        if (winstonTransport) {
            this._logger.add(winstonTransport);
        }
        return this;
    }
    remove(transport) {
        const winstonTransport = this.transportMap.get(transport);
        if (winstonTransport) {
            this._logger.remove(winstonTransport);
            this.transportMap.delete(transport);
            return this;
        }
        else {
            throw new Error('Cannot remove non-existent transport');
        }
    }
    transports() {
        return Array.from(this.transportMap.keys());
    }
    child({ logPrefix }) {
        const childLogPrefix = `${this.logPrefix}.${logPrefix}`;
        const metadataOverride = { label: childLogPrefix, labelColor: (0, utils_1.nextColor)() };
        const childWinstonLogger = this._logger.child(metadataOverride);
        const childLogger = new BaseWinstonLogger();
        childLogger.initialize({
            logger: childWinstonLogger,
            transportMap: this.transportMap,
            winstonLevel: this.winstonLevel,
            logPrefix: childLogPrefix,
            metadataOverride
        });
        return childLogger;
    }
}
/**
 *  Winston implementation of the @type {Logger} interface
 */
class WinstonLogger extends BaseWinstonLogger {
    constructor({ logLevel = types_1.LogLevel.Info, transports = [], logPrefix = 'main' } = defaultLoggerOptions) {
        super();
        const transportMap = new Map();
        transports.forEach((t) => this.addToMap(transportMap, t));
        const level = (0, adapter_1.toWinstonLogLevel)(logLevel);
        const logger = winston_1.default.createLogger({
            level,
            transports: Array.from(transportMap.values()),
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.splat()),
            defaultMeta: { label: logPrefix, labelColor: (0, utils_1.nextColor)() }
        });
        const winstonLevel = level ?? logger.level;
        this.initialize({ logger, transportMap, winstonLevel, logPrefix });
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=logger.js.map