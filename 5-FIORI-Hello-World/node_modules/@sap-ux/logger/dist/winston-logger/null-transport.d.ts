import Transport from 'winston-transport';
/**
 * This is a sink, the equivalent of writing to /dev/null
 */
export declare class NullTransport extends Transport {
    log(_data: unknown, callback: () => void): void;
}
//# sourceMappingURL=null-transport.d.ts.map