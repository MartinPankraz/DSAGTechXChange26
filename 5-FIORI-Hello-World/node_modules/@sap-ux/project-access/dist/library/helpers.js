"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReuseLibs = void 0;
exports.checkDependencies = checkDependencies;
exports.getLibraryDesc = getLibraryDesc;
exports.getLibraryDependencies = getLibraryDependencies;
exports.getManifestDesc = getManifestDesc;
exports.getManifestDependencies = getManifestDependencies;
const node_path_1 = require("node:path");
const constants_1 = require("./constants");
const file_1 = require("../file");
const constants_2 = require("../constants");
const node_fs_1 = require("node:fs");
const fast_xml_parser_1 = require("fast-xml-parser");
const i18n_1 = require("../project/i18n");
const i18n_2 = require("@sap-ux/i18n");
/**
 * Reads the manifest file and returns the reuse library.
 *
 * @param manifest - manifest file content
 * @param manifestPath - path to the manifest file
 * @param reuseLibs - existing reuse libraries
 * @param projectRoot - root of the project
 * @returns reuse library or undefined
 */
const getLibraryFromManifest = async (manifest, manifestPath, reuseLibs, projectRoot) => {
    let reuseLib;
    const manifestType = manifest['sap.app']?.type;
    if ((manifestType === 'component' || manifestType === 'library') && manifestPath) {
        const reuseType = getReuseType(manifestPath);
        const libDeps = getManifestDependencies(manifest);
        const description = await getManifestDesc(manifest, manifestPath);
        const libIndex = reuseLibs.findIndex((reuseLib) => reuseLib.name === manifest?.['sap.app'].id);
        if (libIndex === -1) {
            reuseLib = {
                name: `${manifest['sap.app'].id}`,
                path: (0, node_path_1.dirname)(manifestPath),
                type: reuseType,
                uri: manifest['sap.platform.abap']?.uri ?? '',
                dependencies: libDeps,
                libRoot: projectRoot,
                description
            };
        }
    }
    return reuseLib;
};
/**
 * Reads library file and returns a reuse lib object.
 *
 * @param library - library file content
 * @param libraryPath - path to the library file
 * @param projectRoot - root of the project
 * @returns reuse library or undefined
 */
const getLibraryFromLibraryFile = async (library, libraryPath, projectRoot) => {
    let libEntry;
    const parsedFile = new fast_xml_parser_1.XMLParser({ removeNSPrefix: true }).parse(library, false);
    if (parsedFile?.library?.name) {
        const manifestType = parsedFile?.library ? 'library' : 'component';
        if (manifestType === 'component' || manifestType === 'library') {
            const reuseType = getReuseType(libraryPath);
            const libDeps = getLibraryDependencies(parsedFile);
            const description = await getLibraryDesc(parsedFile, libraryPath);
            libEntry = {
                name: `${parsedFile.library.name}`,
                path: (0, node_path_1.dirname)(libraryPath),
                type: reuseType,
                uri: parsedFile.library?.appData?.manifest?.['sap.platform.abap']?.uri ?? '',
                dependencies: libDeps,
                libRoot: projectRoot,
                description
            };
        }
    }
    return libEntry;
};
/**
 * Updates the library options with the new library.
 *
 * @param reuseLibs - existing library options
 * @param reuseLib - new library
 */
const updateLibOptions = (reuseLibs, reuseLib) => {
    if (reuseLib) {
        const libIndex = reuseLibs.findIndex((lib) => lib.name === reuseLib.name);
        if (libIndex >= 0) {
            // replace
            reuseLibs[libIndex] = reuseLib;
        }
        else {
            reuseLibs.push(reuseLib);
        }
    }
};
/**
 * Returns an array of the reuse libraries found in the folders.
 *
 * @param libs - array of libraries found in the workspace folders.
 * @returns list of reuse library
 */
const getReuseLibs = async (libs) => {
    const reuseLibs = [];
    if (libs) {
        for (const lib of libs) {
            const excludeFolders = ['.git', 'node_modules', 'dist'];
            const manifestPaths = await (0, file_1.findFiles)('manifest.json', lib.projectRoot, excludeFolders);
            const libraryPaths = [
                ...(await (0, file_1.findFiles)('library.js', lib.projectRoot, excludeFolders)),
                ...(await (0, file_1.findFiles)('library.ts', lib.projectRoot, excludeFolders))
            ];
            for (const manifestPath of manifestPaths) {
                const manifestFilePath = (0, node_path_1.join)(manifestPath, constants_2.FileName.Manifest);
                const manifest = await (0, file_1.readJSON)(manifestFilePath);
                const library = await getLibraryFromManifest(manifest, manifestFilePath, reuseLibs, lib.projectRoot);
                if (library) {
                    reuseLibs.push(library);
                }
            }
            for (const libraryPath of libraryPaths) {
                try {
                    const libraryFilePath = (0, node_path_1.join)(libraryPath, constants_2.FileName.Library);
                    const library = (await node_fs_1.promises.readFile(libraryFilePath, { encoding: 'utf8' })).toString();
                    const libFile = await getLibraryFromLibraryFile(library, libraryFilePath, lib.projectRoot);
                    updateLibOptions(reuseLibs, libFile);
                }
                catch {
                    // ignore exception
                }
            }
        }
    }
    return reuseLibs;
};
exports.getReuseLibs = getReuseLibs;
/**
 * Gets the type of reuse library.
 *
 * @param libraryPath - path to the reuse library
 * @returns the type of reuse library
 */
function getReuseType(libraryPath) {
    return (0, node_fs_1.existsSync)((0, node_path_1.join)((0, node_path_1.dirname)(libraryPath), '/library.js')) ||
        (0, node_fs_1.existsSync)((0, node_path_1.join)((0, node_path_1.dirname)(libraryPath), '/library.ts'))
        ? "library" /* ReuseLibType.Library */
        : "component" /* ReuseLibType.Component */;
}
/**
 * Checks for missing dependencies in the selected reuse libraries.
 *
 * @param answers - reuse libraries selected by the user
 * @param reuseLibs - all available reuse libraries
 * @returns a string with the missing dependencies
 */
function checkDependencies(answers, reuseLibs) {
    const missingDeps = [];
    answers.forEach((answer) => {
        const dependencies = answer.dependencies;
        if (dependencies?.length) {
            dependencies.forEach((dependency) => {
                if (!reuseLibs.some((lib) => {
                    return dependency === lib.name;
                })) {
                    missingDeps.push(dependency);
                }
            });
        }
    });
    return missingDeps.join();
}
/**
 * Returns the library description.
 *
 * @param library - library object
 * @param libraryPath - library path
 * @returns library description
 */
async function getLibraryDesc(library, libraryPath) {
    let libraryDesc = library?.library?.documentation;
    if (typeof libraryDesc === 'string' && libraryDesc.startsWith('{{')) {
        const key = libraryDesc.substring(2, libraryDesc.length - 2);
        libraryDesc = await geti18nPropertyValue((0, node_path_1.join)((0, node_path_1.dirname)(libraryPath), library.library?.appData?.manifest?.i18n?.toString() ?? ''), key);
    }
    return libraryDesc?.toString() ?? '';
}
/**
 * Returns the library dependencies.
 *
 * @param library - library object
 * @returns array of dependencies
 */
function getLibraryDependencies(library) {
    const result = [];
    if (library?.library?.dependencies?.dependency) {
        let deps = library.library.dependencies.dependency;
        if (!Array.isArray(deps)) {
            deps = [deps];
        }
        deps.forEach((lib) => {
            // ignore libs that start with SAPUI5 delivered namespaces
            if (!constants_1.ui5Libs.some((substring) => {
                return lib.libraryName === substring || lib.libraryName.startsWith(substring + '.');
            })) {
                result.push(lib.libraryName);
            }
        });
    }
    return result;
}
/**
 * Returns the i18n property value.
 *
 * @param i18nPath - i18n path
 * @param key - property key
 * @returns i18n property value
 */
async function geti18nPropertyValue(i18nPath, key) {
    let value = '';
    try {
        const bundle = await (0, i18n_2.getPropertiesI18nBundle)(i18nPath);
        const node = bundle[key].find((i) => i.key.value === key);
        if (node) {
            value = node.value.value;
        }
    }
    catch (e) {
        // ignore exception
    }
    return value;
}
/**
 * Returns the manifest description.
 *
 * @param manifest - manifest object
 * @param manifestPath - manifestPath path
 * @returns manifest description
 */
async function getManifestDesc(manifest, manifestPath) {
    let manifestDesc = manifest['sap.app']?.description;
    if (typeof manifestDesc === 'string' && manifestDesc.startsWith('{{')) {
        const key = manifestDesc.substring(2, manifestDesc.length - 2);
        const { 'sap.app': i18nPath } = await (0, i18n_1.getI18nPropertiesPaths)(manifestPath, manifest);
        manifestDesc = await geti18nPropertyValue(i18nPath, key);
    }
    return (manifestDesc ?? '').toString();
}
/**
 * Returns the manifest dependencies.
 *
 * @param manifest - manifest object
 * @returns array of dependencies
 */
function getManifestDependencies(manifest) {
    const result = [];
    const depTypes = ['libs', 'components'];
    Object.values(depTypes).forEach((reuseType) => {
        const dependencies = manifest['sap.ui5']?.dependencies?.[reuseType];
        if (dependencies) {
            const libs = manifest?.['sap.ui5']?.dependencies?.libs;
            if (libs) {
                Object.keys(libs).forEach((manifestLibKey) => {
                    // ignore libs that start with SAPUI5 delivered namespaces
                    if (!constants_1.ui5Libs.some((substring) => {
                        return manifestLibKey === substring || manifestLibKey.startsWith(substring + '.');
                    })) {
                        result.push(manifestLibKey);
                    }
                });
            }
        }
    });
    return result;
}
//# sourceMappingURL=helpers.js.map