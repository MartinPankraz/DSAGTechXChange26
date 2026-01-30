"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI5Config = void 0;
const yaml_1 = require("@sap-ux/yaml");
const middlewares_1 = require("./middlewares");
const constants_1 = require("./constants");
const ajv_1 = __importDefault(require("ajv"));
const node_path_1 = require("node:path");
const promises_1 = require("node:fs/promises");
const js_yaml_1 = __importDefault(require("js-yaml"));
/**
 * Represents a UI5 config file in yaml format (ui5(-*).yaml) with utility functions to manipulate the yaml document.
 *
 * @class UI5Config
 */
class UI5Config {
    document;
    static validate;
    /**
     * Validates the schema of the given yaml document.
     *
     * @returns true if the document is valid, false otherwise
     */
    async validateSchema() {
        if (!UI5Config.validate) {
            const path = (0, node_path_1.join)(__dirname, '..', 'dist', 'schema', 'ui5.yaml.json');
            const schema = JSON.parse(await (0, promises_1.readFile)(path, 'utf8'));
            if (!schema) {
                throw Error('The schema file was not found. Validation is not possible.');
            }
            UI5Config.validate = new ajv_1.default({ strict: false }).compile(schema);
        }
        let isValid = false;
        try {
            isValid = js_yaml_1.default.loadAll(this.document.toString()).every((document) => UI5Config.validate(document));
        }
        catch (error) {
            throw Error(`No validation possible. Error: ${error}`);
        }
        return isValid;
    }
    /**
     * Returns a new instance of UI5Config.
     *
     * @static
     * @param {string} serializedYaml - the serialized yaml string
     * @param options - options
     * @param [options.validateSchema] - whether to validate the schema of the yaml file
     * @returns {UI5Config} the UI5Config instance
     * @throws {Error} if the schema validation fails
     * @memberof UI5Config
     */
    static async newInstance(serializedYaml, options) {
        const instance = new UI5Config();
        instance.document = await yaml_1.YamlDocument.newInstance(serializedYaml);
        const validateSchema = options?.validateSchema ?? false;
        if (validateSchema) {
            const isValid = await instance.validateSchema();
            if (!isValid) {
                throw new Error('This file does not comply with the schema.');
            }
        }
        return instance;
    }
    /**
     * Tries reading the resources/configuration object from the config.
     *
     * @returns resources/configuration object from config or an empty object
     * @memberof UI5Config
     */
    getConfiguration() {
        let resources;
        try {
            resources = this.document.getMap({ path: 'resources' }).toJSON();
        }
        catch {
            resources = {};
        }
        return resources.configuration ?? {};
    }
    /**
     * Adds or replaces the resources/configuration object in the config.
     *
     * @param config configuration object that is to be written to the config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setConfiguration(config) {
        this.document.setIn({
            path: 'resources',
            value: { configuration: config }
        });
        return this;
    }
    /**
     * Set the metadata object in the yaml file.
     * See also https://sap.github.io/ui5-tooling/pages/Configuration/#metadata for reference.
     *
     * @param {Ui5Document['metadata']} value metadata of the project or application
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setMetadata(value) {
        this.document.setIn({ path: 'metadata', value });
        return this;
    }
    /**
     * Get the type in the yaml file.
     *
     * @returns {Ui5Document['type']} the type
     */
    getType() {
        const type = this.document.getNode({ path: 'type' });
        return type;
    }
    /**
     * Set the type in the yaml file.
     * See also https://sap.github.io/ui5-tooling/pages/Configuration/#general-configuration for reference.
     *
     * @param {Ui5Document['type']} value - type of the application
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setType(value) {
        this.document.setIn({ path: 'type', value });
        return this;
    }
    /**
     * Add a custom configuration to the yaml.
     *
     * @param key key/name of the custom property
     * @param value the properties value
     */
    addCustomConfiguration(key, value) {
        try {
            const configNode = this.document.getMap({ path: 'customConfiguration' });
            configNode.setIn([key], value);
        }
        catch {
            this.document.setIn({
                path: 'customConfiguration',
                value: {
                    [key]: value
                }
            });
        }
    }
    /**
     * Get a custom configuration from the yaml.
     *
     * @param key key/name of the custom property
     * @returns the value of the property or undefined
     */
    getCustomConfiguration(key) {
        try {
            const node = this.document.getMap({ path: 'customConfiguration' }).get(key);
            return node?.toJSON?.() ?? node?.toString();
        }
        catch (_error) {
            return undefined;
        }
    }
    /**
     * Get the UI5 framework from the yaml.
     *
     * @returns the ui5 framework.
     */
    getUi5Framework() {
        return this.document.getMap({ path: 'framework' }).toJSON();
    }
    /**
     * Adds a UI5 Framework entry to the yaml file.
     *
     * @param {string} ui5Framework - whether to user SAPUI5 or OpenUI5
     * @param {string} ui5Version - ui5 version
     * @param {string[]} ui5Libraries - a list of libraries
     * @param {string} ui5Theme - optional ui5 theme
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addUI5Framework(ui5Framework, ui5Version, ui5Libraries, ui5Theme = 'sap_fiori_3') {
        const libraryObjs = [];
        for (const library of ui5Libraries) {
            libraryObjs.push({ name: library });
        }
        // Add theme lib (dark theme versions are provided by base theme lib)
        libraryObjs.push({ name: `themelib_${ui5Theme.replace(/_dark$|_hcw$|_hcb$/, '')}` });
        this.document.setIn({
            path: 'framework',
            value: { name: ui5Framework, version: ui5Version, libraries: libraryObjs }
        });
        return this;
    }
    /**
     * Adds a list of custom tasks to the config.
     *
     * @param {CustomTask<any>[]} tasks - the list of custom tasks
     * @param {NodeComment<CustomMiddleware<any>>[]} comments - a list of comments
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addCustomTasks(tasks, comments) {
        for (const task of tasks) {
            this.document.appendTo({ path: 'builder.customTasks', value: task, comments });
        }
        return this;
    }
    /**
     * Adds a list of custom middlewares to the config.
     *
     * @param {CustomMiddleware<any>[]} middlewares - the list of custom middlewares
     * @param {NodeComment<CustomMiddleware<any>>[]} comments - a list of comments
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addCustomMiddleware(middlewares, comments) {
        for (const mw of middlewares) {
            this.document.appendTo({ path: 'server.customMiddleware', value: mw, comments });
        }
        return this;
    }
    /**
     * Adds an instance of the Fiori tools app-reload middleware to the config.
     *
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addFioriToolsAppReloadMiddleware() {
        this.document.appendTo({
            path: 'server.customMiddleware',
            value: (0, middlewares_1.getAppReloadMiddlewareConfig)()
        });
        return this;
    }
    /**
     * Adds an instance of the Fiori tools proxy middleware to the config.
     *
     * @param proxyConfig proxy configuration containing an optional array of backend and an option UI5 host configuration
     * @param afterMiddleware middleware after which fiori-tools-proxy middleware will be started
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addFioriToolsProxyMiddleware(proxyConfig, afterMiddleware) {
        // Support both old and new property names for backward compatibility
        const resolvedIgnoreCertErrors = proxyConfig?.ignoreCertErrors ?? proxyConfig?.ignoreCertError ?? false; // NOSONAR
        const { config, comments } = (0, middlewares_1.getFioriToolsProxyMiddlewareConfig)(proxyConfig.backend, proxyConfig.ui5, afterMiddleware, resolvedIgnoreCertErrors);
        this.document.appendTo({
            path: 'server.customMiddleware',
            value: config,
            comments: comments
        });
        return this;
    }
    /**
     * Returns a fiori-tools-proxy middleware YAML configuration.
     *
     * @returns {unknown} The fiori-tools-proxy middleware configuration
     * @memberof UI5Config
     */
    getFioriToolsProxyMiddlewareConfiguration() {
        const middlewareList = this.document.getSequence({ path: 'server.customMiddleware' });
        const proxyMiddleware = this.document.findItem(middlewareList, (item) => item.name === constants_1.fioriToolsProxy);
        if (!proxyMiddleware) {
            throw new Error('Could not find fiori-tools-proxy');
        }
        return this.document.getMap({
            start: proxyMiddleware,
            path: 'configuration'
        });
    }
    /**
     * Adds a backend configuration to an existing fiori-tools-proxy middleware keeping any existing 'fiori-tools-proxy' backend configurations. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param backend config of backend that is to be proxied
     * @param ignoreCertErrors if true some certificate errors are ignored
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addBackendToFioriToolsProxyMiddleware(backend, ignoreCertErrors = false) {
        const configuration = this.getFioriToolsProxyMiddlewareConfiguration();
        const proxyMiddlewareConfig = configuration.toJSON();
        const comments = (0, middlewares_1.getBackendComments)(backend);
        const backendNode = this.document.createNode({
            value: backend,
            comments
        });
        // Support both old and new property names for backward compatibility
        const currentIgnoreCertErrors = proxyMiddlewareConfig?.ignoreCertErrors ?? proxyMiddlewareConfig?.ignoreCertError ?? false; // NOSONAR
        if (currentIgnoreCertErrors !== ignoreCertErrors) {
            configuration.set('ignoreCertErrors', ignoreCertErrors);
            // Remove the deprecated property if it exists
            //prettier-ignore
            if (proxyMiddlewareConfig?.ignoreCertError !== undefined) { // NOSONAR
                configuration.delete('ignoreCertError');
            }
        }
        // Add new entry to existing backend configurations in yaml, avoid duplicates
        if (proxyMiddlewareConfig?.backend) {
            if (!proxyMiddlewareConfig?.backend.find((existingBackend) => existingBackend.path === backend.path)) {
                const backendConfigs = this.document.getSequence({ start: configuration, path: 'backend' });
                if (backendConfigs.items.length === 0) {
                    configuration.set('backend', [backendNode]);
                }
                else {
                    backendConfigs.add(backendNode);
                }
            }
        }
        else {
            // Create a new 'backend' node in yaml for middleware config
            configuration.set('backend', [backendNode]);
        }
        return this;
    }
    /**
     * Updates backend configuration to an existing fiori-tools-proxy middleware that matches path. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param backend config of backend that is to be proxied
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    updateBackendToFioriToolsProxyMiddleware(backend) {
        const configuration = this.getFioriToolsProxyMiddlewareConfiguration();
        const proxyMiddlewareConfig = configuration.toJSON();
        const comments = (0, middlewares_1.getBackendComments)(backend);
        const backendNode = this.document.createNode({
            value: backend,
            comments
        });
        // Update existing backend entry with matching path
        if (proxyMiddlewareConfig?.backend) {
            const matchingBackendIndex = proxyMiddlewareConfig?.backend.findIndex((existingBackend) => existingBackend.path && existingBackend.path === backend.path);
            if (matchingBackendIndex !== -1) {
                const backendConfigs = this.document.getSequence({ start: configuration, path: 'backend' });
                backendConfigs.set(matchingBackendIndex, backendNode);
            }
        }
        return this;
    }
    /**
     * Removes a backend configuration from an existing fiori-tools-proxy middleware backend configurations. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param path Path of the backend to delete.
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeBackendFromFioriToolsProxyMiddleware(path) {
        const fioriToolsProxyMiddleware = this.findCustomMiddleware(constants_1.fioriToolsProxy);
        if (!fioriToolsProxyMiddleware) {
            throw new Error('Could not find fiori-tools-proxy');
        }
        else {
            const proxyMiddlewareConfig = fioriToolsProxyMiddleware?.configuration;
            // Remove backend from middleware configurations in yaml
            if (proxyMiddlewareConfig?.backend) {
                const reservedBackendPath = '/sap';
                // Make sure entry with "/sap" path is not getting deleted
                const backendIndexToKeep = proxyMiddlewareConfig.backend.findIndex((existingBackend) => existingBackend.path === reservedBackendPath);
                proxyMiddlewareConfig.backend = proxyMiddlewareConfig.backend.filter((existingBackend, index) => {
                    if (index === backendIndexToKeep) {
                        return true;
                    }
                    return existingBackend.path !== path;
                });
                this.updateCustomMiddleware(fioriToolsProxyMiddleware);
            }
        }
        return this;
    }
    /**
     * Returns the backend configuration from the fiori-tools-proxy middleware.
     *
     * @param path Path of the backend.
     * @returns {FioriToolsProxyConfigBackend} the backend configuration
     */
    getBackendConfigFromFioriToolsProxyMiddleware(path) {
        const backendConfigs = this.getBackendConfigsFromFioriToolsProxyMiddleware();
        return backendConfigs.find((backendConfig) => backendConfig.path === path);
    }
    /**
     * Returns the backend configurations from the fiori-tools-proxy middleware.
     *
     * @returns {FioriToolsProxyConfigBackend[]} the backend configurations
     */
    getBackendConfigsFromFioriToolsProxyMiddleware() {
        let backendConfigs;
        try {
            const middlewareList = this.document.getSequence({ path: 'server.customMiddleware' });
            const proxyMiddleware = this.document.findItem(middlewareList, (item) => item.name === constants_1.fioriToolsProxy);
            const configuration = this.document.getMap({ start: proxyMiddleware, path: 'configuration' });
            backendConfigs = this.document
                .getSequence({ start: configuration, path: 'backend' })
                .toJSON();
        }
        catch (e) {
            return [];
        }
        return backendConfigs;
    }
    /**
     * Adds a ui configuration to an existing fiori-tools-proxy middleware. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param ui5 config of backend that is to be proxied
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addUi5ToFioriToolsProxyMiddleware(ui5) {
        const middlewareList = this.document.getSequence({ path: 'server.customMiddleware' });
        const proxyMiddleware = this.document.findItem(middlewareList, (item) => item.name === constants_1.fioriToolsProxy);
        if (!proxyMiddleware) {
            throw new Error('Could not find fiori-tools-proxy');
        }
        this.document.getMap({ start: proxyMiddleware, path: 'configuration' }).set('ui5', [ui5]);
        return this;
    }
    /**
     * Adds an instance of the mockserver middleware to the config.
     *
     * @param basePath - path to project root, where package.json and ui5.yaml is
     * @param webappPath - path to webapp folder, where manifest.json is
     * @param dataSourcesConfig - annotations config that is to be mocked
     * @param annotationsConfig - annotations config that is to be mocked
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addMockServerMiddleware(basePath, webappPath, dataSourcesConfig, annotationsConfig) {
        this.document.appendTo({
            path: 'server.customMiddleware',
            value: (0, middlewares_1.getMockServerMiddlewareConfig)(basePath, webappPath, dataSourcesConfig, annotationsConfig)
        });
        return this;
    }
    /**
     * Adds a service configuration to an existing sap-fe-mockserver middleware keeping any existing service configurations. If the config does not contain a sap-fe-mockserver middleware, an error is thrown.
     *
     * @param basePath - path to project root, where package.json and ui5.yaml is
     * @param webappPath - path to webapp folder, where manifest.json is
     * @param dataSourceConfig - dataSource config from manifest to add to mockserver middleware services list
     * @param annotationsConfig - optional, annotations config that is to be mocked
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addServiceToMockserverMiddleware(basePath, webappPath, dataSourceConfig, annotationsConfig = []) {
        const mockserverMiddleware = this.findCustomMiddleware('sap-fe-mockserver');
        if (!mockserverMiddleware) {
            throw new Error('Could not find sap-fe-mockserver');
        }
        else {
            // Else append new data to current middleware config and then run middleware update
            const serviceRoot = `.${node_path_1.posix.sep}${(0, node_path_1.relative)(basePath, (0, node_path_1.join)(webappPath, 'localService', dataSourceConfig.serviceName)).replaceAll(node_path_1.sep, node_path_1.posix.sep)}`;
            const mockserverMiddlewareConfig = mockserverMiddleware?.configuration;
            if (mockserverMiddlewareConfig?.services) {
                const urlPath = dataSourceConfig.servicePath.replace(/\/$/, ''); // Mockserver is sensitive to trailing '/'
                const newServiceData = {
                    urlPath,
                    metadataPath: dataSourceConfig.metadataPath ?? `${serviceRoot}/metadata.xml`,
                    mockdataPath: `${serviceRoot}/data`,
                    generateMockData: true
                };
                if (dataSourceConfig.resolveExternalServiceReferences === true) {
                    newServiceData.resolveExternalServiceReferences = true;
                }
                const serviceIndex = mockserverMiddlewareConfig.services.findIndex((existingService) => existingService.urlPath === urlPath);
                if (serviceIndex === -1) {
                    mockserverMiddlewareConfig.services = [...mockserverMiddlewareConfig.services, newServiceData];
                }
            }
            if (mockserverMiddlewareConfig?.annotations) {
                const existingAnnotations = mockserverMiddlewareConfig.annotations;
                annotationsConfig.forEach((annotationConfig) => {
                    if (!existingAnnotations.find((existingAnnotation) => existingAnnotation.urlPath === annotationConfig.urlPath)) {
                        existingAnnotations.push(annotationConfig);
                    }
                });
            }
            this.updateCustomMiddleware(mockserverMiddleware);
        }
        return this;
    }
    /**
     * Removes a service from the mockserver middleware.
     *
     * @param servicePath - path of the service that is to be deleted
     * @param annotationPaths - paths of the service related annotations
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeServiceFromMockServerMiddleware(servicePath, annotationPaths) {
        const mockserverMiddleware = this.findCustomMiddleware('sap-fe-mockserver');
        if (!mockserverMiddleware) {
            throw new Error('Could not find sap-fe-mockserver');
        }
        else {
            const mockserverMiddlewareConfig = mockserverMiddleware?.configuration;
            // Remove service from middleware configurations in yaml
            if (mockserverMiddlewareConfig?.services) {
                mockserverMiddlewareConfig.services = mockserverMiddlewareConfig?.services.filter((existingService) => existingService.urlPath !== servicePath.replace(/\/$/, ''));
            }
            // Remove service related annotations
            if (mockserverMiddlewareConfig?.annotations) {
                const mockserverMiddlewareConfigAnnotations = mockserverMiddlewareConfig.annotations;
                annotationPaths.forEach((annotationPath) => {
                    // Search for annotations that needs to be deleted
                    mockserverMiddlewareConfig.annotations = mockserverMiddlewareConfigAnnotations.filter((existingAnnotation) => existingAnnotation.urlPath !== annotationPath);
                });
            }
            this.updateCustomMiddleware(mockserverMiddleware);
        }
        return this;
    }
    /**
     * Adds the ABAP deployment task to the config.
     *
     * @param target system that this app is to be deployed to
     * @param app application configuration for the deployment to ABAP
     * @param fioriTools if true use the middleware included in the @sap/ux-ui5-tooling module
     * @param exclude optional list of files that are to be excluded from the deployment configuration
     * @param index if true a standalone index.html is generated during deployment
     * @param lrep optional lrep namespace to be used for the deployment configuration
     * @param comments optional comments that are added to the task
     * @returns this UI5Config instance
     * @memberof UI5Config
     */
    addAbapDeployTask(target, app, fioriTools = true, exclude, index = false, lrep, comments = []) {
        this.document.appendTo({
            path: 'builder.resources.excludes',
            value: '/test/**'
        });
        this.document.appendTo({
            path: 'builder.resources.excludes',
            value: '/localService/**'
        });
        const configuration = { target, app, exclude, lrep };
        if (index) {
            configuration['index'] = true;
        }
        this.document.appendTo({
            path: 'builder.customTasks',
            value: {
                name: fioriTools ? 'deploy-to-abap' : 'abap-deploy-task',
                afterTask: 'generateCachebusterInfo',
                configuration
            },
            comments
        });
        return this;
    }
    /**
     * Adds the Cloud Foundry deployment task to the config.
     *
     * @param archiveName the name of the archive that is to be generated as part of the CF bundling
     * @param addModulesTask if true the modules task is added to the deployment configuration
     * @param addTranspileTask if true the transpile task is added to the deployment configuration
     * @returns this UI5Config instance
     * @memberof UI5Config
     */
    addCloudFoundryDeployTask(archiveName, addModulesTask = false, addTranspileTask = false) {
        this.document.appendTo({
            path: 'builder.resources.excludes',
            value: '/test/**'
        });
        this.document.appendTo({
            path: 'builder.resources.excludes',
            value: '/localService/**'
        });
        this.document.appendTo({
            path: 'builder.customTasks',
            value: {
                name: 'ui5-task-zipper',
                afterTask: 'generateCachebusterInfo',
                configuration: {
                    archiveName,
                    relativePaths: true,
                    additionalFiles: ['xs-app.json']
                }
            }
        });
        if (addModulesTask) {
            this.document.appendTo({
                path: 'builder.customTasks',
                value: {
                    name: 'ui5-tooling-modules-task',
                    afterTask: 'replaceVersion',
                    configuration: {}
                }
            });
        }
        if (addTranspileTask) {
            this.document.appendTo({
                path: 'builder.customTasks',
                value: {
                    name: 'ui5-tooling-transpile-task',
                    afterTask: 'replaceVersion',
                    configuration: {
                        debug: true,
                        removeConsoleStatements: true,
                        transpileAsync: true,
                        transpileTypeScript: true
                    }
                }
            });
        }
        return this;
    }
    /**
     * Remove a middleware form the UI5 config.
     *
     * @param name name of the middleware that is to be removed
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeCustomMiddleware(name) {
        this.document.deleteAt({
            path: 'server.customMiddleware',
            matcher: { key: 'name', value: name }
        });
        return this;
    }
    /**
     * Remove a task form the UI5 config.
     *
     * @param name name of the task that is to be removed
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeCustomTask(name) {
        this.document.deleteAt({
            path: 'builder.customTasks',
            matcher: { key: 'name', value: name }
        });
        return this;
    }
    /**
     * Removes the entire config for the given key.
     *
     * @param key key of the config that is to be removed
     * @returns {UI5Config} the UI5Config instance
     */
    removeConfig(key) {
        this.document.delete(key);
        return this;
    }
    /**
     * Adds a comment to the ui5 config.
     *
     * @param root0 - the comment object
     * @param root0.comment - the comment object's comment
     * @param root0.location - the comment object's location
     * @returns {UI5Config} the UI5Config instance
     */
    addComment({ comment, location = 'beginning' }) {
        this.document.addDocumentComment({ comment, location });
        return this;
    }
    /**
     * Find a custom item in the UI5 config.
     *
     * @param name name of the item (task or middlewre) that is to be looked for
     * @param path path to the root of the sequence that is to be searched
     * @returns the configuration as object or undefined if not found
     * @memberof UI5Config
     */
    findCustomActivity(name, path) {
        let list;
        try {
            list = this.document.getSequence({ path });
        }
        catch (error) {
            // if the document does not contain the builder > customTasks section and error is thrown
        }
        let item;
        if (list) {
            item = this.document.findItem(list, (item) => item.name === name);
        }
        return item ? item.toJSON() : undefined;
    }
    /**
     * Find a middleware in the UI5 config.
     *
     * @param name name of the middleware that is to be looked for
     * @returns the middleware configuration as object or undefined if not found
     * @memberof UI5Config
     */
    findCustomMiddleware(name) {
        return this.findCustomActivity(name, 'server.customMiddleware');
    }
    /**
     * Find a task in the UI5 config.
     *
     * @param name name of the task that is to be looked for
     * @returns the middleware configuration as object or undefined if not found
     * @memberof UI5Config
     */
    findCustomTask(name) {
        return this.findCustomActivity(name, 'builder.customTasks');
    }
    /**
     * Update an existing custom middleware or create it. Existing custom middleware be overwritten, not merged.
     * If the custom middleware doesn't exist, it will be added.
     *
     * @param middleware - middleware config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    updateCustomMiddleware(middleware) {
        const name = middleware.name;
        if (this.findCustomMiddleware(name)) {
            this.document.updateAt({
                path: 'server.customMiddleware',
                matcher: { key: 'name', value: name },
                value: middleware,
                mode: 'overwrite'
            });
        }
        else {
            this.addCustomMiddleware([middleware]);
        }
        return this;
    }
    /**
     * Merges existing custom middleware with the passed config.
     *
     * @param middleware - middleware config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    mergeCustomMiddleware(middleware) {
        const name = middleware.name;
        if (this.findCustomMiddleware(name)) {
            this.document.updateAt({
                path: 'server.customMiddleware',
                matcher: { key: 'name', value: name },
                value: middleware,
                mode: 'merge'
            });
        }
        return this;
    }
    /**
     * Returns the serve static config.
     *
     * @param addFioriToolProxy - if true, `fiori-tools-proxy` config is added, otherwise a `compression` config will be added
     * @param paths - serve static paths for the reuse libraries
     * @returns the serve static middleware config
     */
    getServeStaticConfig(addFioriToolProxy, paths) {
        return addFioriToolProxy
            ? {
                name: constants_1.serveStatic,
                beforeMiddleware: constants_1.fioriToolsProxy,
                configuration: {
                    paths: paths
                }
            }
            : {
                name: constants_1.serveStatic,
                afterMiddleware: 'compression',
                configuration: {
                    paths: paths
                }
            };
    }
    /**
     * Adds or updates the serve static middleware in the config.
     *
     * @param serveStaticPaths serve static paths for the reuse libraries
     * @returns {UI5Config} the UI5Config instance
     */
    addServeStaticConfig(serveStaticPaths) {
        const serveStaticConfig = this.findCustomMiddleware(constants_1.serveStatic);
        const fioriToolsProxyConfig = this.findCustomMiddleware(constants_1.fioriToolsProxy);
        if (serveStaticConfig) {
            if (serveStaticConfig.afterMiddleware === 'compression' && fioriToolsProxyConfig) {
                this.updateCustomMiddleware({
                    name: constants_1.serveStatic,
                    beforeMiddleware: constants_1.fioriToolsProxy,
                    configuration: {
                        paths: [...serveStaticConfig.configuration.paths, ...serveStaticPaths]
                    }
                });
            }
            else {
                this.mergeCustomMiddleware({
                    name: constants_1.serveStatic,
                    configuration: {
                        paths: [...serveStaticConfig.configuration.paths, ...serveStaticPaths]
                    }
                });
            }
        }
        else {
            const serveStaticConfig = this.getServeStaticConfig(!!fioriToolsProxyConfig, serveStaticPaths);
            this.addCustomMiddleware([serveStaticConfig]);
        }
        return this;
    }
    /**
     * Returns a string representation of the config.
     *
     * @returns {string} the string representation
     * @memberof UI5Config
     */
    toString() {
        return this.document.toString();
    }
}
exports.UI5Config = UI5Config;
//# sourceMappingURL=ui5config.js.map