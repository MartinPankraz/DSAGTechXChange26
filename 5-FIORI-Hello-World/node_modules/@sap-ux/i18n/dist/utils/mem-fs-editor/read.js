"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
const node_fs_1 = require("node:fs");
/**
 * Read the entire contents of a file.
 *
 * @param filePath absolute path to a file.
 * @param fs optional `mem-fs-editor` instance. If provided, `read` api of `mem-fs-editor` is used.
 * @returns file content
 */
async function readFile(filePath, fs) {
    if (fs) {
        return fs.read(filePath);
    }
    return node_fs_1.promises.readFile(filePath, { encoding: 'utf8' });
}
//# sourceMappingURL=read.js.map