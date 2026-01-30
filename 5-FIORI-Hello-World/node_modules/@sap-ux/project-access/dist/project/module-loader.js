"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModulePath = getModulePath;
exports.loadModuleFromProject = loadModuleFromProject;
exports.getModule = getModule;
exports.deleteModule = deleteModule;
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const dependencies_1 = require("./dependencies");
const constants_1 = require("../constants");
const command_1 = require("../command");
/**
 * Get the module path from project or app. Throws error if module is not installed.
 *
 * @param projectRoot - root path of the project/app.
 * @param moduleName - name of the node module.
 * @returns - path to module.
 */
async function getModulePath(projectRoot, moduleName) {
    if (!(0, dependencies_1.getNodeModulesPath)(projectRoot, moduleName)) {
        throw Error('Path to module not found.');
    }
    return require.resolve(moduleName, { paths: [projectRoot] });
}
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
async function loadModuleFromProject(projectRoot, moduleName) {
    let module;
    try {
        const modulePath = await getModulePath(projectRoot, moduleName);
        module = (await Promise.resolve(`${modulePath}`).then(s => __importStar(require(s))));
    }
    catch (error) {
        throw Error(`Module '${moduleName}' not installed in project '${projectRoot}'.\n${error.toString()}`);
    }
    return module;
}
/**
 * Get a module, if it is not cached it will be installed and returned.
 *
 * @param module - name of the module
 * @param version - version of the module
 * @param options - optional options
 * @param options.logger - optional logger instance
 * @returns - module
 */
async function getModule(module, version, options) {
    const logger = options?.logger;
    const moduleDirectory = (0, node_path_1.join)(constants_1.moduleCacheRoot, module, version);
    const modulePackagePath = (0, node_path_1.join)(moduleDirectory, constants_1.FileName.Package);
    const installCommand = ['install', '--prefix', moduleDirectory, `${module}@${version}`];
    if (!(0, node_fs_1.existsSync)(modulePackagePath)) {
        if ((0, node_fs_1.existsSync)(moduleDirectory)) {
            await (0, promises_1.rm)(moduleDirectory, { recursive: true });
        }
        await (0, promises_1.mkdir)(moduleDirectory, { recursive: true });
        await (0, command_1.execNpmCommand)(installCommand, {
            cwd: moduleDirectory,
            logger
        });
    }
    let resolvedModule;
    try {
        resolvedModule = await loadModuleFromProject(moduleDirectory, module);
    }
    catch (e) {
        logger?.error(`Failed to load module: ${module}. Attempting to fix installation.`);
        const modulePackageLockPath = (0, node_path_1.join)(moduleDirectory, constants_1.FileName.PackageLock);
        // If 'package-lock.json' file exists then use 'npm ci', otherwise try reinstall
        const command = (0, node_fs_1.existsSync)(modulePackageLockPath) ? ['ci'] : installCommand;
        // Run reinstall only if the first attempt fails
        await (0, command_1.execNpmCommand)(command, {
            cwd: moduleDirectory,
            logger
        });
        // Retry loading the module
        resolvedModule = await loadModuleFromProject(moduleDirectory, module);
    }
    return resolvedModule;
}
/**
 * Delete a module from cache.
 *
 * @param module - name of the module
 * @param version - version of the module
 */
async function deleteModule(module, version) {
    const moduleDirectory = (0, node_path_1.join)(constants_1.moduleCacheRoot, module, version);
    if ((0, node_fs_1.existsSync)(moduleDirectory)) {
        await (0, promises_1.rm)(moduleDirectory, { recursive: true });
    }
}
//# sourceMappingURL=module-loader.js.map