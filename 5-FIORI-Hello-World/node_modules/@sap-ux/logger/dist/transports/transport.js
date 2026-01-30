"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTransport = exports.VSCodeTransport = exports.StringArrayTransport = exports.FileTransport = exports.NullTransport = exports.UI5ToolingTransport = exports.ConsoleTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
const types_1 = require("../types");
/**
 *  This represents the console target
 */
class ConsoleTransport extends types_1.Transport {
    static singletonInstance;
    options;
    /**
     *
     * @param opts
     */
    constructor(opts = {}) {
        super();
        if (!ConsoleTransport.singletonInstance) {
            ConsoleTransport.singletonInstance = this;
            this.options = this.copy(opts);
        }
        return ConsoleTransport.singletonInstance;
    }
}
exports.ConsoleTransport = ConsoleTransport;
/**
 * Transport used in UI5 tooling to print to the console.
 * Don't use this together with `ConsoleTransport` or you'll have logs doubled up
 * on the console in different formats
 */
class UI5ToolingTransport extends types_1.Transport {
    static instances = new Map();
    options;
    /**
     *
     * @param opts
     */
    constructor(opts) {
        super();
        const instance = UI5ToolingTransport.instances.get(opts.moduleName);
        if (!instance) {
            this.options = this.copy(opts);
            UI5ToolingTransport.instances.set(opts.moduleName, this);
            return this;
        }
        else {
            return instance;
        }
    }
}
exports.UI5ToolingTransport = UI5ToolingTransport;
/**
 *  Use this when you just want a sink for the logs
 */
class NullTransport extends types_1.Transport {
    static singletonInstance;
    /**
     *
     */
    constructor() {
        super();
        if (!NullTransport.singletonInstance) {
            NullTransport.singletonInstance = this;
        }
        return NullTransport.singletonInstance;
    }
}
exports.NullTransport = NullTransport;
/**
 *  This represents a file target
 */
class FileTransport extends types_1.Transport {
    options;
    /**
     * Constructor for FileTransport, expects the options for the transport, file name is mandatory.
     *
     * @param opts - options for the transport
     */
    constructor(opts) {
        super();
        this.options = this.copy(opts);
    }
}
exports.FileTransport = FileTransport;
/**
 *
 */
class StringArrayTransport extends types_1.Transport {
}
exports.StringArrayTransport = StringArrayTransport;
/**
 *  This represents an output channel in VS Code
 *  https://code.visualstudio.com/api/extension-capabilities/common-capabilities#output-channel
 */
class VSCodeTransport extends types_1.Transport {
    static instances = new Map();
    options;
    /**
     *
     * @param opts
     */
    constructor(opts) {
        super();
        const instance = VSCodeTransport.instances.get(opts.channelName);
        if (!instance) {
            this.options = this.copy(opts);
            VSCodeTransport.instances.set(opts.channelName, this);
            return this;
        }
        else {
            return instance;
        }
    }
}
exports.VSCodeTransport = VSCodeTransport;
/**
 *
 */
class ArrayTransport extends winston_transport_1.default {
    logs;
    /**
     *
     * @param opts
     */
    constructor(opts) {
        super({ level: typeof opts?.logLevel === 'number' ? types_1.LogLevel[opts.logLevel].toLowerCase() : 'debug' });
        this.logs = opts?.logs ?? [];
    }
    /**
     *
     * @param info
     * @param next
     */
    log(info, next) {
        this.logs.push(info);
        next();
    }
    // Mixin from Transport
    copy = types_1.Transport.prototype.copy;
}
exports.ArrayTransport = ArrayTransport;
//# sourceMappingURL=transport.js.map