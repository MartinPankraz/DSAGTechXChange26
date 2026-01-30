"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDependency = void 0;
exports.getNodeModulesPath = getNodeModulesPath;
exports.addPackageDevDependency = addPackageDevDependency;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const constants_1 = require("../constants");
const file_1 = require("../file");
/**
 * Helper to check for dependency/devDependency.
 *
 * @param packageJson - content of package.json to check
 * @param dependency - name of the dependency
 * @returns - true: has dependency; false: no dependency
 */
const hasDependency = (packageJson, dependency) => !!(packageJson.dependencies?.[dependency] ?? packageJson.devDependencies?.[dependency]);
exports.hasDependency = hasDependency;
/**
 * Returns path to folder that hosts 'node_modules' used by project.
 * Optionally, a module name can be passed to check for. This is
 * useful to check if a module is hoisted in a mono repository.
 *
 * @param projectRoot - absolute path to root of the project/app.
 * @param [module] -  optional module name to find in node_modules
 * @returns - parent path of node_modules used by project or undefined if node module path was not found
 */
function getNodeModulesPath(projectRoot, module) {
    if (!(0, node_path_1.isAbsolute)(projectRoot)) {
        return undefined;
    }
    const { root } = (0, node_path_1.parse)(projectRoot);
    let currentDir = projectRoot;
    let modulesPath;
    while (currentDir !== root) {
        let checkPath = (0, node_path_1.join)(currentDir, 'node_modules');
        if (module) {
            checkPath = (0, node_path_1.join)(checkPath, module, constants_1.FileName.Package);
        }
        if ((0, node_fs_1.existsSync)(checkPath)) {
            modulesPath = currentDir;
            break;
        }
        currentDir = (0, node_path_1.dirname)(currentDir);
    }
    return modulesPath;
}
/**
 * Adds a new dev dependency to the package.json.
 *
 * @param basePath - the base path
 * @param depName - the dependency name
 * @param depVersion - the dependency version
 * @param fs - optional memfs editor instance
 */
async function addPackageDevDependency(basePath, depName, depVersion, fs) {
    const filePath = (0, node_path_1.join)(basePath, constants_1.FileName.Package);
    const packageJson = await (0, file_1.readJSON)(filePath, fs);
    packageJson.devDependencies = packageJson.devDependencies ?? {};
    if (!packageJson.devDependencies[depName]) {
        packageJson.devDependencies[depName] = depVersion;
    }
    await (0, file_1.updatePackageJSON)(filePath, packageJson, fs);
}
//# sourceMappingURL=dependencies.js.map