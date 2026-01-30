"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageScript = updatePackageScript;
exports.hasUI5CliV3 = hasUI5CliV3;
const node_path_1 = require("node:path");
const constants_1 = require("../constants");
const file_1 = require("../file");
const semver_1 = __importDefault(require("semver"));
/**
 * Updates the package.json with a new script.
 *
 * @param basePath - the base path
 * @param scriptName - the script name
 * @param script - the script content
 * @param fs - optional memfs editor instance
 */
async function updatePackageScript(basePath, scriptName, script, fs) {
    const filePath = (0, node_path_1.join)(basePath, constants_1.FileName.Package);
    const packageJson = await (0, file_1.readJSON)(filePath, fs);
    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }
    packageJson.scripts[scriptName] = script;
    await (0, file_1.updatePackageJSON)(filePath, packageJson, fs);
}
/**
 * Check if dev dependencies contains @ui5/cli version greater than 2.
 *
 * @param devDependencies dev dependencies from package.json
 * @returns boolean
 */
function hasUI5CliV3(devDependencies) {
    let isV3 = false;
    const ui5CliSemver = semver_1.default.coerce(devDependencies['@ui5/cli']);
    if (ui5CliSemver && semver_1.default.gte(ui5CliSemver, '3.0.0')) {
        isV3 = true;
    }
    return isV3;
}
//# sourceMappingURL=script.js.map