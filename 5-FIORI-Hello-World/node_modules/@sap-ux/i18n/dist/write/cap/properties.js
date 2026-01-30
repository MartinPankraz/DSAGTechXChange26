"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryAddPropertiesTexts = tryAddPropertiesTexts;
const utils_1 = require("../../utils");
const csv_1 = require("./csv");
const utils_2 = require("../utils");
/**
 * Add i18n entries to respective i18n file.
 *
 * @description It first tries to add to an existing `.properties` file, it it does not exist, it tries to add to `.csv` file,
 * if it fails, it generates new `.properties` file with new i18n entries.
 * @param env cds environment
 * @param path file path
 * @param newI18nEntries new i18n entries that will be maintained
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
async function tryAddPropertiesTexts(env, path, newI18nEntries, fs) {
    const newContent = newI18nEntries
        .map((entry) => (0, utils_1.printPropertiesI18nEntry)(entry.key, entry.value, entry.annotation))
        .join('');
    const i18nFilePath = (0, utils_1.capPropertiesPath)(path, env);
    if (!(await (0, utils_1.doesExist)(i18nFilePath))) {
        // if `.properties` file does not exit, try csv
        const completed = await (0, csv_1.tryAddCsvTexts)(env, path, newI18nEntries, fs);
        if (completed) {
            return true;
        }
        //  create a `.properties` file with new content
        await (0, utils_1.writeFile)(i18nFilePath, newContent, fs);
        return true;
    }
    // add to existing `.properties` file
    return await (0, utils_2.writeToExistingI18nPropertiesFile)(i18nFilePath, newI18nEntries, [], fs);
}
//# sourceMappingURL=properties.js.map