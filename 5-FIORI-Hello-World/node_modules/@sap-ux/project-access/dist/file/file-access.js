"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
exports.readJSON = readJSON;
exports.writeFile = writeFile;
exports.fileExists = fileExists;
exports.updatePackageJSON = updatePackageJSON;
exports.updateManifestJSON = updateManifestJSON;
exports.deleteFile = deleteFile;
exports.readDirectory = readDirectory;
exports.deleteDirectory = deleteDirectory;
const node_fs_1 = require("node:fs");
const json_parse_even_better_errors_1 = __importDefault(require("json-parse-even-better-errors"));
/**
 * Read file asynchronously. Throws error if file does not exist.
 *
 * @param path - path to file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as string
 */
async function readFile(path, memFs) {
    if (memFs) {
        return memFs.read(path);
    }
    else {
        return node_fs_1.promises.readFile(path, { encoding: 'utf8' });
    }
}
/**
 * Read JSON file asynchronously. Throws error if file does not exist or is malformatted.
 *
 * @param path - path to JSON file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as object of type T
 */
async function readJSON(path, memFs) {
    if (memFs) {
        return memFs.readJSON(path);
    }
    else {
        return JSON.parse(await readFile(path));
    }
}
/**
 * Write file asynchronously. Throws error if file does not exist.
 *
 * @param path - path to file
 * @param content - content to write to a file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as string
 */
async function writeFile(path, content, memFs) {
    if (memFs) {
        return memFs.write(path, content);
    }
    return node_fs_1.promises.writeFile(path, content, { encoding: 'utf8' });
}
/**
 * Checks if the provided file exists in the file system.
 *
 * @param path - the file path to check
 * @param memFs - optional mem-fs-editor instance
 * @returns - true if the file exists; false otherwise.
 */
async function fileExists(path, memFs) {
    try {
        if (memFs) {
            return memFs.exists(path);
        }
        else {
            await node_fs_1.promises.access(path);
            return true;
        }
    }
    catch {
        return false;
    }
}
/**
 * Updates package.json file asynchronously by keeping the previous indentation.
 *
 * @param path - path to file
 * @param packageJson - updated package.json file content
 * @param memFs - optional mem-fs-editor instance
 */
async function updatePackageJSON(path, packageJson, memFs) {
    await updateJSON(path, packageJson, memFs);
}
/**
 * Updates manifest.json file asynchronously by keeping the previous indentation.
 *
 * @param path - path to file
 * @param manifest - updated manifest.json file content
 * @param memFs - optional mem-fs-editor instance
 */
async function updateManifestJSON(path, manifest, memFs) {
    await updateJSON(path, manifest, memFs);
}
/**
 * Updates JSON file asynchronously by keeping the indentation from previous content with new content for given path.
 *
 * @param path - path to file
 * @param content - updated JSON file content
 * @param memFs - optional mem-fs-editor instance
 */
async function updateJSON(path, content, memFs) {
    // read old contents and indentation of the JSON file
    const oldContentText = await readFile(path, memFs);
    const oldContentJson = (0, json_parse_even_better_errors_1.default)(oldContentText);
    const indent = Symbol.for('indent');
    // prepare new JSON file content with previous indentation
    const result = JSON.stringify(content, null, oldContentJson[indent]) + '\n';
    await writeFile(path, result, memFs);
}
/**
 * Deletes file asynchronously.
 *
 * @param path - path to file
 * @param memFs - optional mem-fs-editor instance
 * @returns Promise to void.
 */
async function deleteFile(path, memFs) {
    if (memFs) {
        return memFs.delete(path);
    }
    return node_fs_1.promises.unlink(path);
}
/**
 * Read array of files from folder asynchronously.
 *
 * @param path - path to folder
 * @returns Array of the names of the files in the directory.
 */
async function readDirectory(path) {
    return node_fs_1.promises.readdir(path, { encoding: 'utf8' });
}
/**
 * Deletes folder asynchronously.
 *
 * @param path - path to folder
 * @param memFs - optional mem-fs-editor instance
 * @returns Promise to void.
 */
async function deleteDirectory(path, memFs) {
    if (memFs) {
        return memFs.delete(path);
    }
    return node_fs_1.promises.rm(path, { recursive: true, force: true });
}
//# sourceMappingURL=file-access.js.map