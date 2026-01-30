import type { Logger } from '@sap-ux/logger';
/**
 * Get the module path from project or app. Throws error if module is not installed.
 *
 * @param projectRoot - root path of the project/app.
 * @param moduleName - name of the node module.
 * @returns - path to module.
 */
export declare function getModulePath(projectRoot: string, moduleName: string): Promise<string>;
/**
 * Load module from project or app. Throws error if module is not installed.
 *
 * Note: Node's require.resolve() caches file access results in internal statCache, see:
 * (https://github.com/nodejs/node/blob/d150316a8ecad1a9c20615ae62fcaf4f8d060dcc/lib/internal/modules/cjs/loader.js#L155)
 * This means, if a module is not installed and require.resolve() is executed, it will never resolve, even after the
 * module is installed later on. To prevent filling cjs loader's statCache with entries for non existing files,
 * we check if the module exists using getNodeModulesPath() before require.resolve().
 *
 * @param projectRoot - root path of the project/app.
 * @param moduleName - name of the node module.
 * @returns - loaded module.
 */
export declare function loadModuleFromProject<T>(projectRoot: string, moduleName: string): Promise<T>;
/**
 * Get a module, if it is not cached it will be installed and returned.
 *
 * @param module - name of the module
 * @param version - version of the module
 * @param options - optional options
 * @param options.logger - optional logger instance
 * @returns - module
 */
export declare function getModule<T>(module: string, version: string, options?: {
    logger?: Logger;
}): Promise<T>;
/**
 * Delete a module from cache.
 *
 * @param module - name of the module
 * @param version - version of the module
 */
export declare function deleteModule(module: string, version: string): Promise<void>;
//# sourceMappingURL=module-loader.d.ts.map