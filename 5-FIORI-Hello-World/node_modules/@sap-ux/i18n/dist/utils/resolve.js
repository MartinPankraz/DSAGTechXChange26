"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCapI18nFolderForFile = resolveCapI18nFolderForFile;
exports.getCapI18nFiles = getCapI18nFiles;
exports.getCapI18nFolder = getCapI18nFolder;
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const config_1 = require("./config");
/**
 * Normalize file pth.
 *
 * @param path file path
 * @returns normalized file path
 */
function normalizePath(path) {
    if (process.platform === 'win32') {
        return path.charAt(0).toLowerCase() + path.slice(1);
    }
    return path;
}
/**
 * Check if path a start with path b.
 *
 * @param a file path one
 * @param b file path two
 * @returns boolean
 */
function pathStartsWith(a, b) {
    return normalizePath(a).startsWith(normalizePath(b));
}
const nodeModules = node_path_1.sep + 'node_modules';
/**
 * Returns the location of an existing `_i18n` folder next to or in the
 * folder hierarchy above the given path, if any.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePath CDS source file path
 * @returns i18n folder or undefined
 */
function resolveCapI18nFolderForFile(root, env, filePath) {
    const { folders } = (0, config_1.getI18nConfiguration)(env);
    /**
     * Resolve file path.
     *
     * @param path file path
     * @returns file path or undefined
     */
    function resolve(path) {
        // check whether a <path>/_i18n exists
        for (const folderName of folders) {
            const folderPath = (0, node_path_1.join)(path, folderName);
            if ((0, node_fs_1.existsSync)(folderPath)) {
                return folderPath;
            }
        }
        //> no --> search up the folder hierarchy
        const next = (0, node_path_1.dirname)(path);
        if (next.includes(nodeModules)) {
            if (next.endsWith(nodeModules)) {
                return undefined;
            }
        }
        else if (!pathStartsWith(next, root)) {
            return undefined;
        }
        return !next || next === path ? undefined : resolve(next);
    }
    return resolve(filePath);
}
/**
 * Merges i18n files for CDS source files.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePaths CDS file path
 * @returns i18n files
 */
function getCapI18nFiles(root, env, filePaths) {
    const { baseFileName } = (0, config_1.getI18nConfiguration)(env);
    const i18nFiles = filePaths.reduce((acc, filePath) => {
        const i18nFolder = resolveCapI18nFolderForFile(root, env, filePath);
        if (i18nFolder) {
            const file = (0, node_path_1.join)(i18nFolder, baseFileName);
            if (acc.indexOf(file) === -1) {
                acc.push(file);
            }
        }
        return acc;
    }, []);
    return i18nFiles;
}
/**
 * Get an i18n folder for an existing CDS file. A new folder is only created, if it does not exist and optional `mem-fs-editor` instance is not provided.
 *
 * @param root project root
 * @param path absolute path to cds file
 * @param env CDS environment configuration,
 * @param fs optional `mem-fs-editor` instance. If provided, a new folder is not created, even if it does not exist
 * @returns i18n folder path
 */
async function getCapI18nFolder(root, path, env, fs) {
    const { folders } = (0, config_1.getI18nConfiguration)(env);
    let i18nFolderPath = resolveCapI18nFolderForFile(root, env, path);
    if (!i18nFolderPath) {
        const folder = folders[0];
        i18nFolderPath = (0, node_path_1.join)(root, folder);
        if (!fs) {
            // create directory when mem-fs-editor is not provided. when mem-fs-editor is provided, directory is created on using `.commit()` API
            await node_fs_1.promises.mkdir(i18nFolderPath);
        }
    }
    return i18nFolderPath;
}
//# sourceMappingURL=resolve.js.map