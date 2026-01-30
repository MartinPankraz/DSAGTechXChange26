"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapI18nEntries = createCapI18nEntries;
const node_path_1 = require("node:path");
const utils_1 = require("../../utils");
const json_1 = require("./json");
const csv_1 = require("./csv");
const properties_1 = require("./properties");
/**
 * Create new i18n entries to an existing file or in a new file if one does not exist.
 *
 * @param root project root, where i18n folder should reside if no i18n file exists
 * @param path absolute path to cds file for which translation should be maintained
 * @param newI18nEntries new i18n entries that will be maintained
 * @param env CDS environment configuration
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean or exception
 * @description To create new entries, if tries:
 * ```markdown
 * 1. `.json` file
 * 2. `.properties` file, if failed for `.json` file
 * 3. `.csv` file if failed for `.properties` file
 * ```
 */
async function createCapI18nEntries(root, path, newI18nEntries, env, fs) {
    const { baseFileName } = (0, utils_1.getI18nConfiguration)(env);
    const i18nFolderPath = await (0, utils_1.getCapI18nFolder)(root, path, env, fs);
    const filePath = (0, node_path_1.join)(i18nFolderPath, baseFileName);
    const updaters = [json_1.tryAddJsonTexts, properties_1.tryAddPropertiesTexts, csv_1.tryAddCsvTexts];
    for (const update of updaters) {
        const completed = await update(env, filePath, newI18nEntries, fs);
        if (completed) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=create.js.map