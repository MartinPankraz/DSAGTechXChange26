import type { Logger } from '@sap-ux/logger';
/**
 * Loads the specification module from cache and returns it.
 *
 * @param root - root path of the project/app
 * @param [options] - optional options
 * @param [options.logger] - logger instance
 * @returns - specification instance
 */
export declare function getSpecificationModuleFromCache<T>(root: string, options?: {
    logger?: Logger;
}): Promise<T>;
/**
 * Loads and return specification from project or cache.
 * 1. if package.json contains devDependency to specification, attempts to load from project.
 * 2. if not in package.json of project, attempts to load from cache.
 *
 * @param root - root path of the project/app
 * @param [options] - optional options
 * @param [options.logger] - logger instance
 * @returns - specification instance
 */
export declare function getSpecification<T>(root: string, options?: {
    logger?: Logger;
}): Promise<T>;
/**
 * Refreshes the specification dist-tags cache. Also cleans specification modules in cache that are not required anymore.
 *
 * @param [options] - optional options, like logger
 * @param [options.logger] - logger instance
 */
export declare function refreshSpecificationDistTags(options?: {
    logger?: Logger;
}): Promise<void>;
/**
 * Returns the path to the specification used.
 * Can be path to node_modules in project, or cache.
 *
 * @param root - root path of the project/app
 * @param [options] - optional options
 * @param [options.logger] - optional logger instance
 * @returns - path to specification
 */
export declare function getSpecificationPath(root: string, options?: {
    logger?: Logger;
}): Promise<string>;
//# sourceMappingURL=specification.d.ts.map