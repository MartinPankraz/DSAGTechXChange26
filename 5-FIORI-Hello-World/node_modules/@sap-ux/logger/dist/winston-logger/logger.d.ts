import type { ChildLoggerOptions, Log, Logger, LoggerOptions, Transport } from '../types';
import winston from 'winston';
import type WinstonTransport from 'winston-transport';
type Metadata = {
    [key: string]: unknown;
};
interface BaseLoggerOptions {
    logger: winston.Logger;
    transportMap: Map<Transport, WinstonTransport>;
    winstonLevel: string;
    logPrefix: string;
    metadataOverride?: Metadata;
}
declare class BaseWinstonLogger implements Logger {
    protected _logger: winston.Logger;
    protected logPrefix: string;
    protected logPrefixColor: string;
    protected winstonLevel: string;
    protected metadataOverride?: Metadata;
    protected transportMap: Map<Transport, WinstonTransport>;
    protected initialize({ logger, transportMap, metadataOverride, winstonLevel, logPrefix }: BaseLoggerOptions): void;
    info(message: string | object): void;
    warn(message: string | object): void;
    error(message: string | object): void;
    debug(message: string | object): void;
    log(data: string | Log): void;
    private winstonLog;
    protected addToMap(transportMap: Map<Transport, WinstonTransport>, transport: Transport): WinstonTransport | undefined;
    add(transport: Transport): this;
    remove(transport: Transport): this;
    transports(): Transport[];
    child({ logPrefix }: ChildLoggerOptions): Logger;
}
/**
 *  Winston implementation of the @type {Logger} interface
 */
export declare class WinstonLogger extends BaseWinstonLogger {
    constructor({ logLevel, transports, logPrefix }?: LoggerOptions);
}
export {};
//# sourceMappingURL=logger.d.ts.map