"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = writeFile;
const node_fs_1 = require("node:fs");
/**
 * Write data to a file.
 *
 * @param filePath absolute path to a file
 * @param content content to write
 * @param fs optional `mem-fs-editor` instance. If provided, `write` api of `mem-fs-editor` is used.
 * @returns string or void
 */
async function writeFile(filePath, content, fs) {
    if (fs) {
        return fs.write(filePath, content);
    }
    return node_fs_1.promises.writeFile(filePath, content, { encoding: 'utf8' });
}
//# sourceMappingURL=write.js.map