"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionLogger = void 0;
const transports_1 = require("../transports");
const vscode_output_channel_transport_1 = require("../winston-logger/vscode-output-channel-transport");
const winston_logger_1 = require("../winston-logger");
const types_1 = require("../types");
const adapter_1 = require("../winston-logger/adapter");
/**
 *
 */
class ExtensionLogger extends winston_logger_1.WinstonLogger {
    /**
     *
     * @param channelName
     */
    constructor(channelName) {
        const vscodeTransport = new transports_1.VSCodeTransport({ channelName });
        super({
            logLevel: types_1.LogLevel.Silly, // set to lowest level, let VSCode filter levels
            transports: [vscodeTransport],
            logPrefix: ''
        });
    }
    /**
     * Private function to enable adding additional arguments to the log message.
     * Prepares the message for formatting with format.splat().
     *
     * @param level - log level
     * @param message - log message
     * @param args - additional arguments like objects, arrays, etc.
     */
    logWithArgs(level, message, ...args) {
        const winstonLevel = (0, adapter_1.toWinstonLogLevel)(level) ?? this._logger.level;
        if (args.length > 0) {
            message += ' %O'.repeat(args.length);
        }
        this._logger.log(winstonLevel, message, ...args);
    }
    /**
     * Log an error message.
     *
     * @param message - error message
     * @param args - additional arguments like objects, arrays, etc.
     */
    error(message, ...args) {
        this.logWithArgs(types_1.LogLevel.Error, message, ...args);
    }
    /**
     * Log a warning message.
     *
     * @param message - warning message
     * @param args - additional arguments like objects, arrays, etc.
     */
    warn(message, ...args) {
        this.logWithArgs(types_1.LogLevel.Warn, message, ...args);
    }
    /**
     * Log an info message.
     *
     * @param message - info message
     * @param args - additional arguments like objects, arrays, etc.
     */
    info(message, ...args) {
        this.logWithArgs(types_1.LogLevel.Info, message, ...args);
    }
    /**
     * Log a debug message.
     *
     * @param message - debug message
     * @param args - additional arguments like objects, arrays, etc.
     */
    debug(message, ...args) {
        this.logWithArgs(types_1.LogLevel.Debug, message, ...args);
    }
    /**
     * Log a trace message.
     *
     * @param message - log message
     * @param args - additional arguments like objects, arrays, etc.
     */
    trace(message, ...args) {
        this.logWithArgs(types_1.LogLevel.Silly, message, ...args);
    }
    /**
     * Show the output channel in Visual Studio Code.
     */
    show() {
        const winstonVSCodeTransport = this._logger.transports.find((t) => t instanceof vscode_output_channel_transport_1.VSCodeTransport);
        if (winstonVSCodeTransport) {
            winstonVSCodeTransport.show();
        }
    }
}
exports.ExtensionLogger = ExtensionLogger;
//# sourceMappingURL=index.js.map