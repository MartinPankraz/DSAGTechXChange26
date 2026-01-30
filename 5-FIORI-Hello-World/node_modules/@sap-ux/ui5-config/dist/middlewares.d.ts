import type { FioriToolsProxyConfigBackend, CustomMiddleware, FioriAppReloadConfig, FioriToolsProxyConfig, MockserverConfig, FioriToolsProxyConfigUI5, FioriPreviewConfig, DataSourceConfig } from './types';
import type { NodeComment } from '@sap-ux/yaml';
/**
 * Get the configuration for the AppReload middleware.
 *
 * @returns {CustomMiddleware<FioriAppReloadConfig>} the configuration
 */
export declare function getAppReloadMiddlewareConfig(): CustomMiddleware<FioriAppReloadConfig>;
/**
 * Generates the configuration for a Fiori preview middleware.
 *
 * @param previewConfigOpts - The options for configuring the preview middleware.
 * @param {string} previewConfigOpts.ui5Theme - The theme to be used for the application.dedededdedeededededededdededdeddedededededed
 * @param {string} previewConfigOpts.appId - The ID of the application for which the preview middleware is being configured.
 * @param {string} previewConfigOpts.flpAction - The action to be used for the Fiori launchpad.
 * @param {string} previewConfigOpts.localStartFile - The local start file to be used for the application.
 * @returns {CustomMiddleware<FioriPreviewConfig>} The configuration object for the middleware.
 */
export declare function getPreviewMiddlewareConfig({ ui5Theme, appId, flpAction, localStartFile }: {
    ui5Theme?: string;
    appId?: string;
    flpAction?: string;
    localStartFile?: string;
}): CustomMiddleware<FioriPreviewConfig>;
/**
 * Returns default comments for the given backend configuration values.
 *
 * @param backend backend config
 * @param index - optional index of backend entry
 * @returns the node comments for the backend config
 */
export declare function getBackendComments(backend: FioriToolsProxyConfigBackend, index?: number): NodeComment<CustomMiddleware<FioriToolsProxyConfig>>[];
/**
 * Get the configuration for the Fiori tools middleware.
 *
 * @param backends configuration of backends
 * @param ui5 UI5 configuration
 * @param afterMiddleware middleware after which fiori-tools-proxy middleware will be started
 * @param ignoreCertErrors ignore certificate errors
 * @returns {{config, comments}} configuration and comments
 */
export declare function getFioriToolsProxyMiddlewareConfig(backends?: FioriToolsProxyConfigBackend[], ui5?: Partial<FioriToolsProxyConfigUI5>, afterMiddleware?: string, ignoreCertErrors?: boolean): {
    config: CustomMiddleware<FioriToolsProxyConfig>;
    comments: NodeComment<CustomMiddleware<FioriToolsProxyConfig>>[];
};
export declare const getMockServerMiddlewareConfig: (basePath: string, webappPath: string, dataSourcesConfig: DataSourceConfig[], annotationsConfig: MockserverConfig["annotations"]) => CustomMiddleware<MockserverConfig>;
//# sourceMappingURL=middlewares.d.ts.map