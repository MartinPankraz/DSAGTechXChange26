import type { Package } from '../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Helper to check for dependency/devDependency.
 *
 * @param packageJson - content of package.json to check
 * @param dependency - name of the dependency
 * @returns - true: has dependency; false: no dependency
 */
export declare const hasDependency: (packageJson: Package, dependency: string) => boolean;
/**
 * Returns path to folder that hosts 'node_modules' used by project.
 * Optionally, a module name can be passed to check for. This is
 * useful to check if a module is hoisted in a mono repository.
 *
 * @param projectRoot - absolute path to root of the project/app.
 * @param [module] -  optional module name to find in node_modules
 * @returns - parent path of node_modules used by project or undefined if node module path was not found
 */
export declare function getNodeModulesPath(projectRoot: string, module?: string): string | undefined;
/**
 * Adds a new dev dependency to the package.json.
 *
 * @param basePath - the base path
 * @param depName - the dependency name
 * @param depVersion - the dependency version
 * @param fs - optional memfs editor instance
 */
export declare function addPackageDevDependency(basePath: string, depName: string, depVersion: string, fs?: Editor): Promise<void>;
//# sourceMappingURL=dependencies.d.ts.map