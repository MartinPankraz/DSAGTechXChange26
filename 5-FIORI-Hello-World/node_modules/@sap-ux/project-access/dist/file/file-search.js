"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBy = findBy;
exports.findFiles = findFiles;
exports.findFilesByExtension = findFilesByExtension;
exports.findFileUp = findFileUp;
exports.getFilePaths = getFilePaths;
const node_path_1 = require("node:path");
const findit2_1 = __importDefault(require("findit2"));
const file_access_1 = require("./file-access");
const node_fs_1 = require("node:fs");
/**
 * Get deleted and modified files from mem-fs editor filtered by query and 'by' (name|extension).
 *
 * @param changes - memfs editor changes, usually retrieved by fs.dump()
 * @param fileNames - array of file names to search for
 * @param extensionNames - array of extensions names to search for
 * @param root - path to root folder
 * @example
 * // returns { deleted: ['src/test.css'], modified: ['src/app.js'] }
 * const changes = {
 *   'src/app.js': { state: 'modified' },
 *   'src/test.css': { state: 'deleted' },
 *   'src/index.ts': { state: 'modified' }
 * };
 * getMemFsChanges(changes, ['app.js'], ['.css'], 'src');
 * @returns - array of deleted and modified files filtered by query
 */
function getMemFsChanges(changes, fileNames, extensionNames, root) {
    const deleted = [];
    const modified = [];
    const filteredChanges = Object.keys(changes).filter((f) => f.startsWith(root.replaceAll(node_path_1.sep, node_path_1.posix.sep)) &&
        (fileNames.includes((0, node_path_1.basename)(f)) ||
            extensionNames.includes((0, node_path_1.extname)(f)) ||
            (fileNames.length === 0 && extensionNames.length === 0)));
    for (const file of filteredChanges) {
        if (changes[file].state === 'deleted') {
            deleted.push((0, node_path_1.join)(file));
        }
        if (changes[file].state === 'modified') {
            modified.push((0, node_path_1.join)(file));
        }
    }
    return { deleted, modified };
}
/**
 * Returns the search results and fatal errors.
 * This is required to include potential memfs changes in the search results.
 *
 * @param results - array of file paths that were found during the search.
 * @param fileNames - array of file names that were searched for
 * @param extensionNames - array of file extensions that were searched for
 * @param root - root directory where the search was performed
 * @param errors - array of errors that occurred during the search
 * @param [memFs] - optional memfs editor instance
 * @returns - object containing the search results and any fatal errors
 */
function getFindResultOnEnd(results, fileNames, extensionNames, root, errors, memFs) {
    let searchResult = results;
    let fatalErrors = errors;
    if (memFs) {
        const { modified, deleted } = getMemFsChanges(memFs.dump(''), fileNames, extensionNames, root);
        const merged = Array.from(new Set([...results, ...modified]));
        searchResult = merged.filter((f) => !deleted.includes(f));
        // Filter out errors that are of type ENOENT and path is part of memfs changes, which can happen for folders that contain memfs files only.
        fatalErrors = errors.filter((e) => e.code !== 'ENOENT' ||
            (typeof e.path === 'string' && !modified.some((f) => f.startsWith(e.path))));
    }
    return { searchResult, fatalErrors };
}
/**
 * Find function to search for files by names or file extensions.
 * Empty name and extension option returns all files in the given folder.
 *
 * @param options - find options
 * @param [options.fileNames] - optional array of file names to search for
 * @param [options.extensionNames] - optional array of file extensions to search for
 * @param options.root - folder to start recursive search
 * @param [options.excludeFolders] - optional array of folder names to exclude
 * @param [options.memFs] - optional memfs editor instance
 * @param [options.noTraversal] - optional flag to disable root path traversal
 * @returns - array of paths that contain the file
 * @throws Error[] - list of errors that occurred during the search
 */
function findBy(options) {
    return new Promise((resolve, reject) => {
        const results = [];
        const fileNames = Array.isArray(options.fileNames) ? options.fileNames : [];
        const extensionNames = Array.isArray(options.extensionNames) ? options.extensionNames : [];
        const excludeFolders = Array.isArray(options.excludeFolders) ? options.excludeFolders : [];
        const noTraversal = options.noTraversal ?? false;
        const errors = [];
        const finder = (0, findit2_1.default)(options.root);
        finder.on('directory', (dir, _stat, stop) => {
            const base = (0, node_path_1.basename)(dir);
            if (excludeFolders.includes(base) || (noTraversal && dir !== options.root)) {
                stop();
            }
        });
        finder.on('file', (file) => {
            if (extensionNames.includes((0, node_path_1.extname)(file)) ||
                fileNames.includes((0, node_path_1.basename)(file)) ||
                (fileNames.length === 0 && extensionNames.length === 0)) {
                results.push(file);
            }
        });
        finder.on('end', () => {
            const { searchResult, fatalErrors } = getFindResultOnEnd(results, fileNames, extensionNames, options.root, errors, options.memFs);
            if (fatalErrors.length === 0) {
                resolve(searchResult);
            }
            else {
                reject(fatalErrors);
            }
        });
        finder.on('error', (error) => {
            errors.push(error);
        });
    });
}
/**
 * Search for 'filename' starting from 'root'. Returns array of paths that contain the file.
 *
 * @param filename - filename to search
 * @param root - root folder to start search
 * @param excludeFolders - list of folder names to exclude (search doesn't traverse into these folders)
 * @param [memFs] - optional mem-fs-editor instance
 * @returns - array of paths that contain the filename
 */
async function findFiles(filename, root, excludeFolders, memFs) {
    const results = await findBy({ fileNames: [filename], root, excludeFolders, memFs });
    return results.map((f) => (0, node_path_1.dirname)(f));
}
/**
 * Search for 'filename' starting from 'root'. Returns array of paths that contain the file.
 *
 * @param extension - file extension to search for including '.', e.g. '.ts'
 * @param root - root folder to start search
 * @param excludeFolders - list of folder names to exclude (search doesn't traverse into these folders)
 * @param [memFs] - optional mem-fs-editor instance
 * @param noTraversal - optional flag to disable root path traversal
 * @returns - array of file paths that have the extension
 */
function findFilesByExtension(extension, root, excludeFolders, memFs, noTraversal) {
    return findBy({ extensionNames: [extension], root, excludeFolders, noTraversal, memFs });
}
/**
 * Find a file by name in parent folders starting from 'startPath'.
 *
 * @param fileName - file name to look for
 * @param startPath - path for start searching up
 * @param fs - optional mem-fs-editor instance
 * @returns - path to file name if found, otherwise undefined
 */
async function findFileUp(fileName, startPath, fs) {
    const filePath = (0, node_path_1.join)(startPath, fileName);
    if (await (0, file_access_1.fileExists)(filePath, fs)) {
        return filePath;
    }
    else {
        return (0, node_path_1.dirname)(startPath) !== startPath ? findFileUp(fileName, (0, node_path_1.dirname)(startPath), fs) : undefined;
    }
}
/**
 * @description Returns a flat list of all file paths under a directory tree,
 * recursing through all subdirectories.
 * @param {string} dir - the directory to walk
 * @returns {string[]} - array of file path strings
 * @throws if an error occurs reading a file path
 */
async function getFilePaths(dir) {
    const entries = await node_fs_1.promises.readdir(dir);
    const filePathsPromises = entries.map(async (entry) => {
        const entryPath = (0, node_path_1.join)(dir, entry);
        const isDirectory = (await node_fs_1.promises.stat(entryPath)).isDirectory();
        return isDirectory ? getFilePaths(entryPath) : entryPath;
    });
    const filePaths = await Promise.all(filePathsPromises);
    return [].concat(...filePaths);
}
//# sourceMappingURL=file-search.js.map