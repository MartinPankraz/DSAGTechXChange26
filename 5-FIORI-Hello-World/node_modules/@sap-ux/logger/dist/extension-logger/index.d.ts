import { WinstonLogger } from '../winston-logger';
/**
 *
 */
export declare class ExtensionLogger extends WinstonLogger {
    /**
     *
     * @param channelName
     */
    constructor(channelName: string);
    /**
     * Private function to enable adding additional arguments to the log message.
     * Prepares the message for formatting with format.splat().
     *
     * @param level - log level
     * @param message - log message
     * @param args - additional arguments like objects, arrays, etc.
     */
    private logWithArgs;
    /**
     * Log an error message.
     *
     * @param message - error message
     * @param args - additional arguments like objects, arrays, etc.
     */
    error(message: string, ...args: any): void;
    /**
     * Log a warning message.
     *
     * @param message - warning message
     * @param args - additional arguments like objects, arrays, etc.
     */
    warn(message: string, ...args: any): void;
    /**
     * Log an info message.
     *
     * @param message - info message
     * @param args - additional arguments like objects, arrays, etc.
     */
    info(message: string, ...args: any): void;
    /**
     * Log a debug message.
     *
     * @param message - debug message
     * @param args - additional arguments like objects, arrays, etc.
     */
    debug(message: string, ...args: any): void;
    /**
     * Log a trace message.
     *
     * @param message - log message
     * @param args - additional arguments like objects, arrays, etc.
     */
    trace(message: string, ...args: any): void;
    /**
     * Show the output channel in Visual Studio Code.
     */
    show(): void;
}
//# sourceMappingURL=index.d.ts.map