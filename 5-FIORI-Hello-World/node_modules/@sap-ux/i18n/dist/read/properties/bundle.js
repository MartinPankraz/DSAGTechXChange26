"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertiesI18nBundle = getPropertiesI18nBundle;
const properties_1 = require("../../transformer/properties");
const utils_1 = require("../../utils");
/**
 * Gets i18n bundle for `.properties` file.
 *
 * @param i18nFilePath absolute path to `i18n.properties` file
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns i18n bundle or exception
 */
async function getPropertiesI18nBundle(i18nFilePath, fs) {
    const bundle = {};
    const content = await (0, utils_1.readFile)(i18nFilePath, fs);
    const ast = (0, properties_1.propertiesToI18nEntry)(content, i18nFilePath);
    for (const entry of ast) {
        if (!bundle[entry.key.value]) {
            bundle[entry.key.value] = [];
        }
        bundle[entry.key.value].push(entry);
    }
    return bundle;
}
//# sourceMappingURL=bundle.js.map