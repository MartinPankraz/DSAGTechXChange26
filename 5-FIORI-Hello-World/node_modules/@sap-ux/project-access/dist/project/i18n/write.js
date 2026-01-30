"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapI18nEntries = createCapI18nEntries;
exports.createUI5I18nEntries = createUI5I18nEntries;
exports.createAnnotationI18nEntries = createAnnotationI18nEntries;
exports.createManifestI18nEntries = createManifestI18nEntries;
const i18n_1 = require("@sap-ux/i18n");
const __1 = require("..");
const node_path_1 = require("node:path");
const file_1 = require("../../file");
const promises_1 = require("node:fs/promises");
/**
 * Maintains new translation entries in CAP i18n files.
 *
 * @param root project root.
 * @param filePath absolute path to file in which the translation entry will be used.
 * @param newI18nEntries translation entries to write in the i18n file.
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * In case of CAP project, some CDS APIs are used internally which depends on `fs` of node and not `mem-fs-editor`.
 * When calling this function, adding or removing a CDS file in memory or changing CDS configuration will not be considered until present on real file system.
 * @returns boolean or exception
 */
async function createCapI18nEntries(root, filePath, newI18nEntries, fs) {
    const env = await (0, __1.getCapEnvironment)(root);
    return (0, i18n_1.createCapI18nEntries)(root, filePath, newI18nEntries, env, fs);
}
/**
 * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist for given model key.
 *
 * @param root project root
 * @param manifestPath absolute path to `manifest.json` file
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param newEntries translation entries to write in the `.properties` file
 * @param modelKey i18n model key,
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean or exception
 */
async function createUI5I18nEntriesBase(root, manifestPath, i18nPropertiesPaths, newEntries, modelKey, fs) {
    const defaultPath = 'i18n/i18n.properties';
    const i18nFilePath = i18nPropertiesPaths.models[modelKey]?.path;
    if (i18nFilePath) {
        // ensure folder for i18n exists
        const dirPath = (0, node_path_1.dirname)(i18nFilePath);
        if (!fs) {
            // create directory when mem-fs-editor is not provided. when mem-fs-editor is provided, directory is created on using `.commit()` API
            await (0, promises_1.mkdir)(dirPath, { recursive: true });
        }
        return (0, i18n_1.createPropertiesI18nEntries)(i18nFilePath, newEntries, root, fs);
    }
    // update manifest.json entry
    const manifest = await (0, file_1.readJSON)(manifestPath);
    const models = {
        ...manifest['sap.ui5']?.models
    };
    models[modelKey] = { type: 'sap.ui.model.resource.ResourceModel', uri: defaultPath };
    const newContent = {
        ...manifest,
        'sap.ui5': {
            ...manifest['sap.ui5'],
            models
        }
    };
    await (0, file_1.writeFile)(manifestPath, JSON.stringify(newContent, undefined, 4), fs);
    // make sure i18n folder exists
    const dirPath = (0, node_path_1.dirname)(defaultPath);
    if (!fs) {
        // create directory when mem-fs-editor is not provided. when mem-fs-editor is provided, directory is created on using `.commit()` API
        await (0, promises_1.mkdir)((0, node_path_1.join)((0, node_path_1.dirname)(manifestPath), dirPath), { recursive: true });
    }
    return (0, i18n_1.createPropertiesI18nEntries)((0, node_path_1.join)((0, node_path_1.dirname)(manifestPath), defaultPath), newEntries, root, fs);
}
/**
 * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
 *
 * @param root project root
 * @param manifestPath absolute path to `manifest.json` file
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param newEntries translation entries to write in the `.properties` file
 * @param modelKey i18n model key
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean or exception
 * @description It also update `manifest.json` file if `<modelKey>` entry is missing from `"sap.ui5":{"models": {}}`
 * as
 * ```JSON
 * {
 *      "sap.ui5": {
 *          "models": {
 *              "<modelKey>": {
 *                  "type": "sap.ui.model.resource.ResourceModel",
 *                  "uri": "i18n/i18n.properties"
 *              }
 *          }
 *      }
 * }
 * ```
 */
async function createUI5I18nEntries(root, manifestPath, i18nPropertiesPaths, newEntries, modelKey, fs) {
    return createUI5I18nEntriesBase(root, manifestPath, i18nPropertiesPaths, newEntries, modelKey, fs);
}
/**
 * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
 *
 * @param root project root
 * @param manifestPath absolute path to `manifest.json` file
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param newEntries translation entries to write in the `.properties` file
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean or exception
 * @description It also update `manifest.json` file if `@i18n` entry is missing from `"sap.ui5":{"models": {}}`
 * as
 * ```JSON
 * {
 *      "sap.ui5": {
 *          "models": {
 *              "@i18n": {
 *                  "type": "sap.ui.model.resource.ResourceModel",
 *                  "uri": "i18n/i18n.properties"
 *              }
 *          }
 *      }
 * }
 * ```
 */
async function createAnnotationI18nEntries(root, manifestPath, i18nPropertiesPaths, newEntries, fs) {
    return createUI5I18nEntriesBase(root, manifestPath, i18nPropertiesPaths, newEntries, '@i18n', fs);
}
/**
 * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
 *
 * @param root project root
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param newEntries translation entries to write in the `.properties` file
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean or exception
 * @description If `i18n` entry is missing from `"sap.app":{}`, default `i18n/i18n.properties` is used. Update of `manifest.json` file is not needed.
 */
async function createManifestI18nEntries(root, i18nPropertiesPaths, newEntries, fs) {
    const i18nFilePath = i18nPropertiesPaths['sap.app'];
    // make sure i18n folder exists
    const dirPath = (0, node_path_1.dirname)(i18nFilePath);
    if (!fs) {
        // create directory when mem-fs-editor is not provided. when mem-fs-editor is provided, directory is created on using `.commit()` API
        await (0, promises_1.mkdir)(dirPath, { recursive: true });
    }
    return (0, i18n_1.createPropertiesI18nEntries)(i18nFilePath, newEntries, root, fs);
}
//# sourceMappingURL=write.js.map