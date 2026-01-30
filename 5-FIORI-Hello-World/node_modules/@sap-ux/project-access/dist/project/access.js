"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationAccess = createApplicationAccess;
exports.createProjectAccess = createProjectAccess;
const node_path_1 = require("node:path");
const i18n_1 = require("./i18n");
const info_1 = require("./info");
const search_1 = require("./search");
const file_1 = require("../file");
const constants_1 = require("../constants");
const specification_1 = require("./specification");
const flex_changes_1 = require("./flex-changes");
const cap_1 = require("./cap");
/**
 *
 */
class ApplicationAccessImp {
    _project;
    appId;
    options;
    /**
     * Constructor for ApplicationAccess.
     *
     * @param _project - Project structure
     * @param appId - Application ID
     * @param options - optional options, see below
     * @param options.fs - optional `mem-fs-editor` instance
     */
    constructor(_project, appId, options) {
        this._project = _project;
        this.appId = appId;
        this.options = options;
    }
    /**
     * Returns the application structure.
     *
     * @returns ApplicationStructure
     */
    get app() {
        return this.project.apps[this.appId];
    }
    /**
     * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
     *
     * @param newEntries - translation entries to write in the `.properties` file
     * @returns - boolean or exception
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
    createAnnotationI18nEntries(newEntries) {
        return (0, i18n_1.createAnnotationI18nEntries)(this.project.root, this.app.manifest, this.app.i18n, newEntries, this.options?.fs);
    }
    /**
     * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
     *
     * @param newEntries - translation entries to write in the `.properties` file
     * @param modelKey - i18n model key. Default key is `i18n`
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
    createUI5I18nEntries(newEntries, modelKey = 'i18n') {
        return (0, i18n_1.createUI5I18nEntries)(this.project.root, this.app.manifest, this.app.i18n, newEntries, modelKey, this.options?.fs);
    }
    /**
     * Maintains new translation entries in an existing i18n file or in a new i18n properties file if it does not exist.
     *
     * @param newEntries translation entries to write in the `.properties` file
     * @returns boolean or exception
     * @description If `i18n` entry is missing from `"sap.app":{}`, default `i18n/i18n.properties` is used. Update of `manifest.json` file is not needed.
     */
    createManifestI18nEntries(newEntries) {
        return (0, i18n_1.createManifestI18nEntries)(this.project.root, this.app.i18n, newEntries, this.options?.fs);
    }
    /**
     * Maintains new translation entries in CAP i18n files.
     *
     * @param filePath absolute path to file in which the translation entry will be used.
     * @param newI18nEntries translation entries to write in the i18n file.
     * @returns boolean or exception
     */
    createCapI18nEntries(filePath, newI18nEntries) {
        return (0, i18n_1.createCapI18nEntries)(this.project.root, filePath, newI18nEntries, this.options?.fs);
    }
    /**
     * Return the application id of this app, which is the relative path from the project root
     * to the app root.
     *
     * @returns - Application root path
     */
    getAppId() {
        return this.appId;
    }
    /**
     * Return the absolute application root path.
     *
     * @returns - Application root path
     */
    getAppRoot() {
        return this.app.appRoot;
    }
    /**
     * For a given app in project, retrieves i18n bundles for 'sap.app' namespace,`models` of `sap.ui5` namespace and service for cap services.
     *
     * @returns i18n bundles or exception captured in optional errors object
     */
    getI18nBundles() {
        return (0, i18n_1.getI18nBundles)(this.project.root, this.app.i18n, this.project.projectType, this.options?.fs);
    }
    /**
     * Return absolute paths to i18n.properties files from manifest.
     *
     * @returns absolute paths to i18n.properties
     */
    getI18nPropertiesPaths() {
        return (0, i18n_1.getI18nPropertiesPaths)(this.app.manifest);
    }
    /**
     * Return an instance of @sap/ux-specification specific to the application version.
     *
     * @returns - instance of @sap/ux-specification
     */
    async getSpecification() {
        return (0, specification_1.getSpecification)(this.app.appRoot);
    }
    /**
     * Updates package.json file asynchronously by keeping the previous indentation.
     *
     * @param packageJson - updated package.json file content
     * @param memFs - optional mem-fs-editor instance
     */
    async updatePackageJSON(packageJson, memFs) {
        await (0, file_1.updatePackageJSON)((0, node_path_1.join)(this.app.appRoot, constants_1.FileName.Package), packageJson, memFs ?? this.options?.fs);
    }
    /**
     * Updates manifest.json file asynchronously by keeping the previous indentation.
     *
     * @param manifest - updated manifest.json file content
     * @param memFs - optional mem-fs-editor instance
     */
    async updateManifestJSON(manifest, memFs) {
        await (0, file_1.updateManifestJSON)(this.app.manifest, manifest, memFs ?? this.options?.fs);
    }
    /**
     * Reads and returns the parsed `manifest.json` file for the application.
     *
     * @param memFs - optional mem-fs-editor instance
     * @returns A promise resolving to the parsed `manifest.json` content.
     */
    async readManifest(memFs) {
        return (0, file_1.readJSON)(this.app.manifest, memFs ?? this.options?.fs);
    }
    /**
     * Reads and returns all Flex Changes (`*.change` files) associated with the application.
     *
     * @param memFs - optional mem-fs-editor instance
     * @returns A promise that resolves to an array of flex change files.
     */
    async readFlexChanges(memFs) {
        return (0, flex_changes_1.readFlexChanges)(this.app.changes, memFs ?? this.options?.fs);
    }
    /**
     * Reads and returns all annotation files associated with the application's main service.
     *
     * @param memFs - optional mem-fs-editor instance
     * @returns A promise resolving to an array of annotation file descriptors.
     */
    async readAnnotationFiles(memFs) {
        const annotationData = [];
        const mainServiceName = this.app.mainService ?? 'mainService';
        const mainService = this.app?.services?.[mainServiceName];
        if (!mainService) {
            return [];
        }
        if (mainService.uri && (this.projectType === 'CAPJava' || this.projectType === 'CAPNodejs')) {
            const serviceUri = mainService?.uri ?? '';
            if (serviceUri) {
                const edmx = await (0, cap_1.readCapServiceMetadataEdmx)(this.root, serviceUri);
                annotationData.push({
                    fileContent: edmx,
                    dataSourceUri: serviceUri
                });
            }
        }
        else {
            if (mainService.local) {
                const serviceFile = await (0, file_1.readFile)(mainService.local, memFs ?? this.options?.fs);
                annotationData.push({
                    dataSourceUri: mainService.local,
                    fileContent: serviceFile.toString()
                });
            }
            const { annotations = [] } = mainService;
            for (const annotation of annotations) {
                if (annotation.local) {
                    const annotationFile = await (0, file_1.readFile)(annotation.local, memFs ?? this.options?.fs);
                    annotationData.push({
                        dataSourceUri: annotation.local,
                        fileContent: annotationFile.toString()
                    });
                }
            }
        }
        return annotationData;
    }
    /**
     * Project structure.
     *
     * @returns - Project structure
     */
    get project() {
        return this._project;
    }
    /**
     * Project type.
     *
     * @returns - Project type, like EDMXBackend, CAPJava, or CAPNodejs
     */
    get projectType() {
        return this.project.projectType;
    }
    /**
     * Project root path.
     *
     * @returns - Project root path
     */
    get root() {
        return this.project.root;
    }
}
/**
 * Class that implements ProjectAccess interface.
 * It can be used to retrieve information about the project, like applications, paths, services.
 */
class ProjectAccessImp {
    _project;
    options;
    /**
     * Constructor for ProjectAccess.
     *
     * @param _project - Project structure
     * @param options - optional options, like logger
     */
    constructor(_project, options) {
        this._project = _project;
        this.options = options;
    }
    /**
     * Returns list of application IDs.
     *
     * @returns - array of application IDs. For single application projects it will return ['']
     */
    getApplicationIds() {
        return Object.keys(this._project.apps);
    }
    /**
     * Get application ID (the relative path from project root to app root) for a given 'sap.app.id' from the manifest.
     *
     * @param manifestAppId - The 'sap.app.id' from the manifest
     * @returns - application ID (the relative path from project root to app root) or undefined if not found
     */
    async getApplicationIdByManifestAppId(manifestAppId) {
        for (const [appId, { manifest: manifestPath }] of Object.entries(this._project.apps)) {
            const manifestContent = await (0, file_1.readJSON)(manifestPath, this.options?.memFs);
            if (manifestContent['sap.app']?.id === manifestAppId) {
                return appId;
            }
        }
        return undefined;
    }
    /**
     * Returns an instance of an application for a given application ID (the relative path from project root to app root, NOT the 'sap.app.id' from the manifest).
     * It contains information about the application, like paths and services.
     *
     * @param appId - application ID (the relative path from project root to app root, NOT the 'sap.app.id' from the manifest)
     * @returns - Instance of ApplicationAccess that contains information about the application, like paths and services
     */
    getApplication(appId) {
        if (!this.project.apps[appId]) {
            throw new Error(`Could not find app with id ${appId}`);
        }
        return new ApplicationAccessImp(this.project, appId, this.options);
    }
    /**
     * Project structure.
     *
     * @returns - Project structure
     */
    get project() {
        return this._project;
    }
    /**
     * Project type.
     *
     * @returns - Project type, like EDMXBackend, CAPJava, or CAPNodejs
     */
    get projectType() {
        return this.project.projectType;
    }
    /**
     * Project root path.
     *
     * @returns - Project root path
     */
    get root() {
        return this.project.root;
    }
}
/**
 * Type guard for Editor or ApplicationAccessOptions.
 *
 * @param argument - argument to check
 * @returns true if argument is Editor, false if it is ApplicationAccessOptions
 */
function isEditor(argument) {
    return argument.commit !== undefined;
}
/**
 * Create an instance of ApplicationAccess that contains information about the application, like paths and services.
 *
 * @param appRoot - Application root path
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node.
 * In case of CAP project, some CDS APIs are used internally which depends on `fs` of node and not `mem-fs-editor`.
 * When calling this function, adding or removing a CDS file in memory or changing CDS configuration will not be considered until present on real file system.
 * @returns - Instance of ApplicationAccess that contains information about the application, like paths and services
 */
async function createApplicationAccess(appRoot, fs) {
    try {
        let options;
        if (fs) {
            options = isEditor(fs) ? { fs } : fs;
        }
        const apps = await (0, search_1.findAllApps)([appRoot], options?.fs);
        const app = apps.find((app) => app.appRoot === appRoot);
        if (!app) {
            throw new Error(`Could not find app with root ${appRoot}`);
        }
        const project = await (0, info_1.getProject)(app.projectRoot, options?.fs);
        const appId = (0, node_path_1.relative)(project.root, appRoot);
        return new ApplicationAccessImp(project, appId, options);
    }
    catch (error) {
        throw Error(`Error when creating application access for ${appRoot}: ${error}`);
    }
}
/**
 * Create an instance of ProjectAccess that contains information about the project, like applications, paths, services.
 *
 * @param root - Project root path
 * @param options - optional options, e.g. logger instance.
 * @returns - Instance of ProjectAccess that contains information about the project
 */
async function createProjectAccess(root, options) {
    try {
        const project = await (0, info_1.getProject)(root, options?.memFs);
        const projectAccess = new ProjectAccessImp(project, options);
        return projectAccess;
    }
    catch (error) {
        throw Error(`Error when creating project access for ${root}: ${error}`);
    }
}
//# sourceMappingURL=access.js.map