"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getI18nBundles = getI18nBundles;
exports.getCapI18nFolderNames = getCapI18nFolderNames;
const i18n_1 = require("@sap-ux/i18n");
const __1 = require("..");
/**
 * Add error to optional errors object.
 *
 * @param result i18n bundles
 * @param key key to associate with the error
 * @param error error to add
 */
function addToErrors(result, key, error) {
    if (!result.errors) {
        result.errors = {};
    }
    result.errors[key] = error;
}
/**
 * For a given app in project, retrieves i18n bundles for 'sap.app' namespace,`models` of `sap.ui5` namespace and service for cap services.
 *
 * @param root project root
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param projectType optional type of project
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node.
 * In case of CAP project, some CDS APIs are used internally which depends on `fs` of node and not `mem-fs-editor`.
 * When calling this function, adding or removing a CDS file in memory or changing CDS configuration will not be considered until present on real file system.
 * @returns i18n bundles or exception captured in optional errors object
 */
async function getI18nBundles(root, i18nPropertiesPaths, projectType, fs) {
    const result = {
        'sap.app': {},
        models: {},
        service: {}
    };
    try {
        result['sap.app'] = await (0, i18n_1.getPropertiesI18nBundle)(i18nPropertiesPaths['sap.app'], fs);
    }
    catch (error) {
        addToErrors(result, 'sap.app', error);
    }
    for (const key of Object.keys(i18nPropertiesPaths.models)) {
        try {
            result.models[key] = await (0, i18n_1.getPropertiesI18nBundle)(i18nPropertiesPaths.models[key].path, fs);
        }
        catch (error) {
            // add models key with empty model
            result.models[key] = {};
            addToErrors(result, `models.${key}`, error);
        }
    }
    if (projectType === 'CAPJava' || projectType === 'CAPNodejs') {
        try {
            const env = await (0, __1.getCapEnvironment)(root);
            const cdsFiles = await (0, __1.getCdsFiles)(root, true);
            result.service = await (0, i18n_1.getCapI18nBundle)(root, env, cdsFiles, fs);
        }
        catch (error) {
            addToErrors(result, 'service', error);
        }
    }
    return result;
}
/**
 * Retrieves a list of potential folder names for i18n files.
 *
 * @param root Project root.
 * @returns ii18n folder names
 */
async function getCapI18nFolderNames(root) {
    const environment = await (0, __1.getCapEnvironment)(root);
    return (0, i18n_1.getI18nFolderNames)(environment);
}
//# sourceMappingURL=read.js.map