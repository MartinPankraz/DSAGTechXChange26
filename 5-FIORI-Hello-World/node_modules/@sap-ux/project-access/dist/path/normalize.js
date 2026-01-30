"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = normalizePath;
const node_fs_1 = require("node:fs");
let toUpperCase;
/**
 *  Normalize path to canonical form.
 *
 * @param path - URI or string.
 * @returns File path.
 */
function normalizePath(path) {
    // for windows, some NodeJS methods will output uppercase drive letters, some in lowercase
    if (process.platform === 'win32') {
        if (toUpperCase === undefined) {
            const driveLetter = node_fs_1.realpathSync.native('\\')[0];
            toUpperCase = driveLetter === driveLetter.toUpperCase();
        }
        const correctedDriveLetter = toUpperCase ? path.charAt(0).toUpperCase() : path.charAt(0).toLowerCase();
        return correctedDriveLetter + path.slice(1);
    }
    return path;
}
//# sourceMappingURL=normalize.js.map