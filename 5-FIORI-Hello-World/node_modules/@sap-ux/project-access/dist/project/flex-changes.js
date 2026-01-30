"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFlexChanges = readFlexChanges;
const node_path_1 = require("node:path");
const file_1 = require("../file");
const node_fs_1 = require("node:fs");
/**
 * Reads all flex change files from the changes directory.
 *
 * @param changesPath - path to changes directory.
 * @param memFs - optional mem-fs-editor instance.
 * @returns A promise that resolves to an array of flex change files.
 */
async function readFlexChanges(changesPath, memFs) {
    const changes = {};
    if ((0, node_fs_1.existsSync)(changesPath)) {
        const files = await (0, file_1.readDirectory)(changesPath);
        for (const file of files) {
            changes[file] = await (0, file_1.readFile)((0, node_path_1.join)(changesPath, file), memFs);
        }
    }
    return changes;
}
//# sourceMappingURL=flex-changes.js.map