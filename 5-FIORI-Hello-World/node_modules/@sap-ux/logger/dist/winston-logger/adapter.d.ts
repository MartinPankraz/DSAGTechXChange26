import type { Transport } from '../types';
import { LogLevel } from '../types';
import type WinstonTransport from 'winston-transport';
/**
 * Translate type {LogLevel} to what Winston understands.
 *
 * @param {LogLevel} logLevel - optional logLevel
 * @returns log - level that Winston understands (https://github.com/winstonjs/winston#logging-levels)
 */
export declare function toWinstonLogLevel(logLevel?: LogLevel): string | undefined;
/**
 * Take a type {Transport} and return the corresponding type {WinstonTransport} will throw an error if the transport is not recognized.
 *
 * @param transport - transport to convert
 * @returns {WinstonTransport} winston transport
 */
export declare function toWinstonTransport(transport: Transport): WinstonTransport;
//# sourceMappingURL=adapter.d.ts.map