"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = getProject;
exports.getAppProgrammingLanguage = getAppProgrammingLanguage;
exports.getAppType = getAppType;
exports.getProjectType = getProjectType;
exports.getMinUI5VersionFromManifest = getMinUI5VersionFromManifest;
exports.getMinUI5VersionAsArray = getMinUI5VersionAsArray;
exports.getMinimumUI5Version = getMinimumUI5Version;
const node_path_1 = require("node:path");
const constants_1 = require("../constants");
const file_1 = require("../file");
const cap_1 = require("./cap");
const i18n_1 = require("./i18n/i18n");
const search_1 = require("./search");
const service_1 = require("./service");
const ui5_config_1 = require("./ui5-config");
const semver_1 = require("semver");
const path_1 = require("../path");
/**
 * Returns the project structure for a given Fiori project.
 *
 * @param root - project root folder
 * @param memFs - optional mem-fs-editor instance
 * @returns - project structure with project info like project type, apps, root folder
 */
async function getProject(root, memFs) {
    if (!(await (0, file_1.fileExists)((0, node_path_1.join)(root, constants_1.FileName.Package), memFs))) {
        throw new Error(`The project root folder '${root}' is not a Fiori project. No 'package.json' found.`);
    }
    const capProjectType = await (0, cap_1.getCapProjectType)(root);
    const projectType = capProjectType ?? 'EDMXBackend';
    const capCustomPaths = projectType === 'EDMXBackend' ? undefined : await (0, cap_1.getCapCustomPaths)(root);
    const appFolders = await getAppFolders(root, memFs);
    const apps = await getApps(root, appFolders, memFs);
    return {
        root: (0, path_1.normalizePath)(root),
        projectType,
        apps,
        capCustomPaths
    };
}
/**
 * Returns the applications for the project. For single app
 * projects, this is just an array with one empty string. For CAP projects, this is an
 * array of operating system specific relative paths to the apps.
 *
 * @param root - project root folder
 * @param memFs - optional mem-fs-editor instance
 * @returns - array of operating specific application folders
 */
async function getAppFolders(root, memFs) {
    const apps = await (0, search_1.findAllApps)([root], memFs);
    return apps.length > 0 ? apps.map((app) => (0, node_path_1.relative)(root, app.appRoot)) : [''];
}
/**
 * Get the application structure for each application in the project.
 *
 * @param root - project root folder
 * @param appFolders - array of relative application folders
 * @param memFs - optional mem-fs-editor instance
 * @returns - map of application structures
 */
async function getApps(root, appFolders, memFs) {
    const apps = {};
    for (const appFolder of appFolders) {
        const applicationStructure = await getApplicationStructure(root, appFolder, memFs);
        if (applicationStructure) {
            apps[appFolder] = applicationStructure;
        }
    }
    return apps;
}
/**
 * Get the application structure for a given application.
 *
 * @param root - project root folder
 * @param appFolder - relative application folder
 * @param memFs - optional mem-fs-editor instance
 * @returns - application structure with application info like manifest, changes, main service, services, annotations
 */
async function getApplicationStructure(root, appFolder, memFs) {
    const appRoot = (0, node_path_1.join)(root, appFolder);
    const absoluteWebappPath = await (0, ui5_config_1.getWebappPath)(appRoot, memFs);
    const appType = (await getAppType(appRoot, memFs));
    const manifest = (0, node_path_1.join)(absoluteWebappPath, constants_1.FileName.Manifest);
    if (!(await (0, file_1.fileExists)(manifest, memFs))) {
        return undefined;
    }
    const manifestObject = await (0, file_1.readJSON)(manifest, memFs);
    const changes = (0, node_path_1.join)(absoluteWebappPath, constants_1.DirName.Changes);
    const i18n = await (0, i18n_1.getI18nPropertiesPaths)(manifest, manifestObject, memFs);
    const mainService = (0, service_1.getMainService)(manifestObject);
    const services = await (0, service_1.getServicesAndAnnotations)(manifest, manifestObject, memFs);
    return {
        appRoot,
        appType,
        manifest,
        changes,
        i18n,
        mainService,
        services
    };
}
/**
 * Get the used programming language of an application.
 *
 * @param appRoot - root folder of the application
 * @param [memFs] - optional mem-fs editor instance
 * @returns - used language, JavaScript or TypeScript
 */
async function getAppProgrammingLanguage(appRoot, memFs) {
    const ignoreFolders = ['node_modules', '.git'];
    let appLanguage = '';
    try {
        const webappPath = await (0, ui5_config_1.getWebappPath)(appRoot, memFs);
        if (await (0, file_1.fileExists)(webappPath, memFs)) {
            if ((await (0, file_1.fileExists)((0, node_path_1.join)(appRoot, constants_1.FileName.Tsconfig), memFs)) &&
                (await (0, file_1.findFilesByExtension)('.ts', webappPath, ignoreFolders, memFs)).length > 0) {
                appLanguage = 'TypeScript';
            }
            else if ((await (0, file_1.findFilesByExtension)('.js', webappPath, ignoreFolders, memFs)).length > 0) {
                appLanguage = 'JavaScript';
            }
        }
    }
    catch {
        // could not detect app language
    }
    return appLanguage;
}
/**
 * Get the type of application or Fiori artifact.
 *
 * @param appRoot - path to application root
 * @param memFs - optional mem-fs-editor instance
 * @returns - type of application, e.g. SAP Fiori elements, SAPUI5 freestyle, SAPUI5 Extension, ... see AppType.
 */
async function getAppType(appRoot, memFs) {
    let appType;
    try {
        const artifacts = await (0, search_1.findFioriArtifacts)({
            wsFolders: [appRoot],
            artifacts: ['adaptations', 'applications', 'extensions', 'libraries'],
            memFs
        });
        if ((artifacts.applications?.length ?? 0) +
            (artifacts.adaptations?.length ?? 0) +
            (artifacts.extensions?.length ?? 0) +
            (artifacts.libraries?.length ?? 0) ===
            1) {
            if (artifacts.applications?.length === 1) {
                appType = await getApplicationType(artifacts.applications[0], memFs);
            }
            else if (artifacts.adaptations?.length === 1) {
                appType = 'Fiori Adaptation';
            }
            else if (artifacts.extensions?.length === 1) {
                appType = 'SAPUI5 Extension';
            }
            else if (artifacts.libraries?.length === 1) {
                appType = 'Fiori Reuse';
            }
        }
    }
    catch {
        // If error occurs we can't determine the type and return undefined
    }
    return appType;
}
/**
 * Get the application type from search results.
 *
 * @param application - application from findFioriArtifacts() results
 * @param memFs - optional mem-fs-editor instance
 * @returns - type of application: 'SAP Fiori elements' or 'SAPUI5 freestyle'
 */
async function getApplicationType(application, memFs) {
    let appType;
    const rootPackageJsonPath = (0, node_path_1.join)(application.projectRoot, constants_1.FileName.Package);
    const packageJson = (await (0, file_1.fileExists)(rootPackageJsonPath, memFs))
        ? await (0, file_1.readJSON)(rootPackageJsonPath, memFs)
        : null;
    if (application.projectRoot === application.appRoot) {
        appType = packageJson?.sapux ? 'SAP Fiori elements' : 'SAPUI5 freestyle';
    }
    else if (packageJson) {
        appType =
            Array.isArray(packageJson.sapux) &&
                packageJson.sapux.find((relAppPath) => (0, node_path_1.join)(application.projectRoot, ...relAppPath.split(/[/\\]/)) === application.appRoot)
                ? 'SAP Fiori elements'
                : 'SAPUI5 freestyle';
    }
    else {
        appType = 'SAPUI5 freestyle';
    }
    return appType;
}
/**
 * Returns the project type for a given Fiori project.
 *
 * @param projectRoot - root path of the project
 * @returns - project type like Edmx, CAPJava, CAPNodejs
 */
async function getProjectType(projectRoot) {
    const capType = await (0, cap_1.getCapProjectType)(projectRoot);
    if (capType === undefined) {
        return 'EDMXBackend';
    }
    return capType;
}
/**
 * Returns the minUI5Version, as defined in manifest.
 *
 * @param manifest - manifest object
 * @returns minUI5Version, if present
 */
function getMinUI5VersionFromManifest(manifest) {
    const dependencies = manifest['sap.ui5']?.dependencies;
    if (dependencies) {
        return dependencies.minUI5Version;
    }
    return undefined;
}
/**
 * Returns the valid minUI5Version(s) as string[].
 *
 * @param manifest - manifest object
 * @param noValidation - disables the semver validation
 * @returns minUI5Version, as an array of strings
 */
function getMinUI5VersionAsArray(manifest, noValidation = false) {
    const result = [];
    const minUI5Version = getMinUI5VersionFromManifest(manifest);
    if (minUI5Version) {
        const minUI5VersionArray = Array.isArray(minUI5Version) ? minUI5Version : [minUI5Version];
        minUI5VersionArray.forEach((version) => {
            if (noValidation || (0, semver_1.valid)(version)) {
                result.push(version);
            }
        });
    }
    return result;
}
/**
 * Returns the minUI5Version in string format (if valid).
 * If it is defined as an array, returns the minimum valid version from it.
 *
 * @param manifest - manifest object
 * @returns the minimum version as string
 */
function getMinimumUI5Version(manifest) {
    let result;
    const validVersionsArray = getMinUI5VersionAsArray(manifest);
    if (validVersionsArray.length > 0) {
        validVersionsArray.forEach((version) => {
            if (!result || (0, semver_1.gte)(result, version)) {
                result = version;
            }
        });
    }
    return result;
}
//# sourceMappingURL=info.js.map