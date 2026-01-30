import type { Logger } from '@sap-ux/logger';
/**
 * Execute an npm command.
 *
 * @param commandArguments - command arguments as array, e.g. ['install', '@sap/ux-specification@1.2.3']
 * @param [options] - optional options
 * @param [options.cwd] - optional current working directory
 * @param [options.logger] - optional logger instance
 * @returns - stdout of the command
 */
export declare function execNpmCommand(commandArguments: string[], options?: {
    cwd?: string;
    logger?: Logger;
}): Promise<string>;
//# sourceMappingURL=npm-command.d.ts.map