"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSCodeTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
/**
 * Winston transport for output to VSCode channel
 */
class VSCodeTransport extends winston_transport_1.default {
    channel;
    winstonToVSCodeMap = new Map([
        ['error', 'error'],
        ['warn', 'warn'],
        ['info', 'info'],
        ['verbose', 'debug'],
        ['debug', 'debug'],
        ['silly', 'trace']
    ]);
    constructor(options) {
        super(options);
        this.channel = getVSCodeInstance().window.createOutputChannel(options.channelName, { log: true });
    }
    log(data, callback) {
        setImmediate(() => {
            const logFunction = this.winstonToVSCodeMap.get(data.level) ?? 'info';
            this.channel[logFunction](data.message);
        });
        callback();
    }
    show() {
        this.channel.show();
    }
}
exports.VSCodeTransport = VSCodeTransport;
function getVSCodeInstance() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('vscode');
}
//# sourceMappingURL=vscode-output-channel-transport.js.map