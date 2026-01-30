import type { BspApp, AbapTarget, Configuration, CustomMiddleware, CustomTask, FioriToolsProxyConfig, FioriToolsProxyConfigBackend, FioriToolsProxyConfigUI5, Ui5Document, Adp, MockserverConfig, ServeStaticPath, DataSourceConfig, AbapDeployConfig } from './types';
import type { NodeComment } from '@sap-ux/yaml';
/**
 * Represents a UI5 config file in yaml format (ui5(-*).yaml) with utility functions to manipulate the yaml document.
 *
 * @class UI5Config
 */
export declare class UI5Config {
    private document;
    private static validate;
    /**
     * Validates the schema of the given yaml document.
     *
     * @returns true if the document is valid, false otherwise
     */
    validateSchema(): Promise<boolean>;
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
    static newInstance(serializedYaml: string, options?: {
        validateSchema?: boolean;
    }): Promise<UI5Config>;
    /**
     * Tries reading the resources/configuration object from the config.
     *
     * @returns resources/configuration object from config or an empty object
     * @memberof UI5Config
     */
    getConfiguration(): Configuration;
    /**
     * Adds or replaces the resources/configuration object in the config.
     *
     * @param config configuration object that is to be written to the config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setConfiguration(config: Configuration): UI5Config;
    /**
     * Set the metadata object in the yaml file.
     * See also https://sap.github.io/ui5-tooling/pages/Configuration/#metadata for reference.
     *
     * @param {Ui5Document['metadata']} value metadata of the project or application
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setMetadata(value: Ui5Document['metadata']): UI5Config;
    /**
     * Get the type in the yaml file.
     *
     * @returns {Ui5Document['type']} the type
     */
    getType(): Ui5Document['type'];
    /**
     * Set the type in the yaml file.
     * See also https://sap.github.io/ui5-tooling/pages/Configuration/#general-configuration for reference.
     *
     * @param {Ui5Document['type']} value - type of the application
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    setType(value: Ui5Document['type']): UI5Config;
    /**
     * Add a custom configuration to the yaml.
     *
     * @param key key/name of the custom property
     * @param value the properties value
     */
    addCustomConfiguration(key: string, value: object | string): void;
    /**
     * Get a custom configuration from the yaml.
     *
     * @param key key/name of the custom property
     * @returns the value of the property or undefined
     */
    getCustomConfiguration(key: string): object | string | undefined;
    /**
     * Get the UI5 framework from the yaml.
     *
     * @returns the ui5 framework.
     */
    getUi5Framework(): Ui5Document['framework'] | undefined;
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
    addUI5Framework(ui5Framework: string, ui5Version: string, ui5Libraries: string[], ui5Theme?: string): UI5Config;
    /**
     * Adds a list of custom tasks to the config.
     *
     * @param {CustomTask<any>[]} tasks - the list of custom tasks
     * @param {NodeComment<CustomMiddleware<any>>[]} comments - a list of comments
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addCustomTasks(tasks: CustomTask<any>[], comments?: NodeComment<CustomMiddleware<any>>[]): UI5Config;
    /**
     * Adds a list of custom middlewares to the config.
     *
     * @param {CustomMiddleware<any>[]} middlewares - the list of custom middlewares
     * @param {NodeComment<CustomMiddleware<any>>[]} comments - a list of comments
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addCustomMiddleware(middlewares: CustomMiddleware<unknown>[], comments?: NodeComment<CustomMiddleware<unknown>>[]): UI5Config;
    /**
     * Adds an instance of the Fiori tools app-reload middleware to the config.
     *
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addFioriToolsAppReloadMiddleware(): UI5Config;
    /**
     * Adds an instance of the Fiori tools proxy middleware to the config.
     *
     * @param proxyConfig proxy configuration containing an optional array of backend and an option UI5 host configuration
     * @param afterMiddleware middleware after which fiori-tools-proxy middleware will be started
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addFioriToolsProxyMiddleware(proxyConfig: FioriToolsProxyConfig, afterMiddleware?: string): UI5Config;
    /**
     * Returns a fiori-tools-proxy middleware YAML configuration.
     *
     * @returns {unknown} The fiori-tools-proxy middleware configuration
     * @memberof UI5Config
     */
    private getFioriToolsProxyMiddlewareConfiguration;
    /**
     * Adds a backend configuration to an existing fiori-tools-proxy middleware keeping any existing 'fiori-tools-proxy' backend configurations. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param backend config of backend that is to be proxied
     * @param ignoreCertErrors if true some certificate errors are ignored
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addBackendToFioriToolsProxyMiddleware(backend: FioriToolsProxyConfigBackend, ignoreCertErrors?: boolean): this;
    /**
     * Updates backend configuration to an existing fiori-tools-proxy middleware that matches path. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param backend config of backend that is to be proxied
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    updateBackendToFioriToolsProxyMiddleware(backend: FioriToolsProxyConfigBackend): this;
    /**
     * Removes a backend configuration from an existing fiori-tools-proxy middleware backend configurations. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param path Path of the backend to delete.
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeBackendFromFioriToolsProxyMiddleware(path: string): this;
    /**
     * Returns the backend configuration from the fiori-tools-proxy middleware.
     *
     * @param path Path of the backend.
     * @returns {FioriToolsProxyConfigBackend} the backend configuration
     */
    getBackendConfigFromFioriToolsProxyMiddleware(path: string): FioriToolsProxyConfigBackend | undefined;
    /**
     * Returns the backend configurations from the fiori-tools-proxy middleware.
     *
     * @returns {FioriToolsProxyConfigBackend[]} the backend configurations
     */
    getBackendConfigsFromFioriToolsProxyMiddleware(): FioriToolsProxyConfigBackend[];
    /**
     * Adds a ui configuration to an existing fiori-tools-proxy middleware. If the config does not contain a fiori-tools-proxy middleware, an error is thrown.
     *
     * @param ui5 config of backend that is to be proxied
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    addUi5ToFioriToolsProxyMiddleware(ui5: FioriToolsProxyConfigUI5): this;
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
    addMockServerMiddleware(basePath: string, webappPath: string, dataSourcesConfig: DataSourceConfig[], annotationsConfig: MockserverConfig['annotations']): this;
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
    addServiceToMockserverMiddleware(basePath: string, webappPath: string, dataSourceConfig: DataSourceConfig, annotationsConfig?: MockserverConfig['annotations']): this;
    /**
     * Removes a service from the mockserver middleware.
     *
     * @param servicePath - path of the service that is to be deleted
     * @param annotationPaths - paths of the service related annotations
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeServiceFromMockServerMiddleware(servicePath: string, annotationPaths: string[]): this;
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
    addAbapDeployTask(target: AbapTarget, app: BspApp | Adp, fioriTools?: boolean, exclude?: string[], index?: boolean, lrep?: string, comments?: NodeComment<CustomTask<AbapDeployConfig>>[]): this;
    /**
     * Adds the Cloud Foundry deployment task to the config.
     *
     * @param archiveName the name of the archive that is to be generated as part of the CF bundling
     * @param addModulesTask if true the modules task is added to the deployment configuration
     * @param addTranspileTask if true the transpile task is added to the deployment configuration
     * @returns this UI5Config instance
     * @memberof UI5Config
     */
    addCloudFoundryDeployTask(archiveName: string, addModulesTask?: boolean, addTranspileTask?: boolean): this;
    /**
     * Remove a middleware form the UI5 config.
     *
     * @param name name of the middleware that is to be removed
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeCustomMiddleware(name: string): UI5Config;
    /**
     * Remove a task form the UI5 config.
     *
     * @param name name of the task that is to be removed
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    removeCustomTask(name: string): UI5Config;
    /**
     * Removes the entire config for the given key.
     *
     * @param key key of the config that is to be removed
     * @returns {UI5Config} the UI5Config instance
     */
    removeConfig(key: string): this;
    /**
     * Adds a comment to the ui5 config.
     *
     * @param root0 - the comment object
     * @param root0.comment - the comment object's comment
     * @param root0.location - the comment object's location
     * @returns {UI5Config} the UI5Config instance
     */
    addComment({ comment, location }: {
        comment: string;
        location?: 'beginning' | 'end';
    }): this;
    /**
     * Find a custom item in the UI5 config.
     *
     * @param name name of the item (task or middlewre) that is to be looked for
     * @param path path to the root of the sequence that is to be searched
     * @returns the configuration as object or undefined if not found
     * @memberof UI5Config
     */
    private findCustomActivity;
    /**
     * Find a middleware in the UI5 config.
     *
     * @param name name of the middleware that is to be looked for
     * @returns the middleware configuration as object or undefined if not found
     * @memberof UI5Config
     */
    findCustomMiddleware<T extends object = object>(name: string): CustomMiddleware<T> | undefined;
    /**
     * Find a task in the UI5 config.
     *
     * @param name name of the task that is to be looked for
     * @returns the middleware configuration as object or undefined if not found
     * @memberof UI5Config
     */
    findCustomTask<T extends object = object>(name: string): CustomTask<T> | undefined;
    /**
     * Update an existing custom middleware or create it. Existing custom middleware be overwritten, not merged.
     * If the custom middleware doesn't exist, it will be added.
     *
     * @param middleware - middleware config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    updateCustomMiddleware(middleware: CustomMiddleware<unknown>): UI5Config;
    /**
     * Merges existing custom middleware with the passed config.
     *
     * @param middleware - middleware config
     * @returns {UI5Config} the UI5Config instance
     * @memberof UI5Config
     */
    private mergeCustomMiddleware;
    /**
     * Returns the serve static config.
     *
     * @param addFioriToolProxy - if true, `fiori-tools-proxy` config is added, otherwise a `compression` config will be added
     * @param paths - serve static paths for the reuse libraries
     * @returns the serve static middleware config
     */
    private getServeStaticConfig;
    /**
     * Adds or updates the serve static middleware in the config.
     *
     * @param serveStaticPaths serve static paths for the reuse libraries
     * @returns {UI5Config} the UI5Config instance
     */
    addServeStaticConfig(serveStaticPaths: ServeStaticPath[]): this;
    /**
     * Returns a string representation of the config.
     *
     * @returns {string} the string representation
     * @memberof UI5Config
     */
    toString(): string;
}
//# sourceMappingURL=ui5config.d.ts.map