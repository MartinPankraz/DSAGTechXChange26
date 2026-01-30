import WinstonTransport from 'winston-transport';
import type { TransportOptions } from '../types';
import { Transport } from '../types';
export type ConsoleTransportOptions = TransportOptions;
/**
 *  This represents the console target
 */
export declare class ConsoleTransport extends Transport {
    private static singletonInstance;
    readonly options: ConsoleTransportOptions;
    /**
     *
     * @param opts
     */
    constructor(opts?: ConsoleTransportOptions);
}
export interface UI5ToolingTransportOptions extends TransportOptions {
    moduleName: string;
}
/**
 * Transport used in UI5 tooling to print to the console.
 * Don't use this together with `ConsoleTransport` or you'll have logs doubled up
 * on the console in different formats
 */
export declare class UI5ToolingTransport extends Transport {
    private static readonly instances;
    readonly options: UI5ToolingTransportOptions;
    /**
     *
     * @param opts
     */
    constructor(opts: UI5ToolingTransportOptions);
}
/**
 *  Use this when you just want a sink for the logs
 */
export declare class NullTransport extends Transport {
    private static singletonInstance;
    /**
     *
     */
    constructor();
}
export interface FileTransportOptions extends TransportOptions {
    filename: string;
    maxsize?: number;
    maxFiles?: number;
}
/**
 *  This represents a file target
 */
export declare class FileTransport extends Transport {
    readonly options: FileTransportOptions;
    /**
     * Constructor for FileTransport, expects the options for the transport, file name is mandatory.
     *
     * @param opts - options for the transport
     */
    constructor(opts: FileTransportOptions);
}
/**
 *  This target is useful when the logs need to be accumulated in an array of strings
 */
export interface StringArrayTransportOptions extends TransportOptions {
    logs: string[];
}
/**
 *
 */
export declare class StringArrayTransport extends Transport {
}
export interface VSCodeTransportOptions extends TransportOptions {
    channelName: string;
}
/**
 *  This represents an output channel in VS Code
 *  https://code.visualstudio.com/api/extension-capabilities/common-capabilities#output-channel
 */
export declare class VSCodeTransport extends Transport {
    private static readonly instances;
    readonly options: VSCodeTransportOptions;
    /**
     *
     * @param opts
     */
    constructor(opts: VSCodeTransportOptions);
}
/**
 * Transport for logging into an array
 */
export interface ArrayTransportLogEntry {
    level: string;
    message: string;
}
export interface ArrayTransportOptions extends TransportOptions {
    logs?: ArrayTransportLogEntry[];
}
/**
 *
 */
export declare class ArrayTransport extends WinstonTransport {
    readonly logs: ArrayTransportLogEntry[];
    /**
     *
     * @param opts
     */
    constructor(opts?: ArrayTransportOptions);
    /**
     *
     * @param info
     * @param next
     */
    log(info: ArrayTransportLogEntry, next: () => void): void;
    copy: <T>(obj: T) => T;
}
//# sourceMappingURL=transport.d.ts.map