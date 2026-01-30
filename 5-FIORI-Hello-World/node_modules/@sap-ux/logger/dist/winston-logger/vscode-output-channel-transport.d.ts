import Transport from 'winston-transport';
/**
 * Interface for function arguments that get passed into the
 * log function by winston,set in vscodeTransport
 * createLogger() and log()
 */
interface DataLog {
    timestamp: string;
    message: string;
    level: string;
}
/**
 * Winston transport for output to VSCode channel
 */
export declare class VSCodeTransport extends Transport {
    private readonly channel;
    private readonly winstonToVSCodeMap;
    constructor(options: Transport.TransportStreamOptions & {
        channelName: string;
    });
    log(data: DataLog, callback: () => void): void;
    show(): void;
}
export {};
//# sourceMappingURL=vscode-output-channel-transport.d.ts.map