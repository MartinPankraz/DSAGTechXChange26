"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonPath = jsonPath;
exports.capPropertiesPath = capPropertiesPath;
exports.csvPath = csvPath;
exports.doesExist = doesExist;
const node_fs_1 = require("node:fs");
const config_1 = require("./config");
/**
 * Get json path.
 *
 * @param path file path
 * @returns .json file path
 */
function jsonPath(path) {
    return `${path}.json`;
}
/**
 * Get properties path.
 *
 * @param path file path
 * @param env cds environment
 * @returns .properties file path
 */
function capPropertiesPath(path, env) {
    const { fallbackLanguage } = (0, config_1.getI18nConfiguration)(env);
    const languageSuffix = fallbackLanguage === '' ? '' : `_${fallbackLanguage}`;
    return `${path}${languageSuffix}.properties`;
}
/**
 * Get csv path.
 *
 * @param path file path
 * @returns .csv file path
 */
function csvPath(path) {
    return `${path}.csv`;
}
/**
 * Check if a folder of a file exists.
 *
 * @param path an absolute path to a folder or a file
 * @returns boolean
 */
function doesExist(path) {
    return new Promise((resolve) => {
        (0, node_fs_1.stat)(path, (err) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
//# sourceMappingURL=path.js.map