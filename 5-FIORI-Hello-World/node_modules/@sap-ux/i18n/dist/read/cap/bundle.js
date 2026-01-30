"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapI18nBundle = getCapI18nBundle;
const utils_1 = require("../../utils");
const json_1 = require("../../transformer/json");
const properties_1 = require("../../transformer/properties");
const csv_1 = require("../../transformer/csv");
/**
 * Try to convert text to i18n bundle.
 *
 * @param path file path
 * @param toI18nBundle function to convert to i18n bundle
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns i18n bundle or undefine
 */
async function tryTransformTexts(path, toI18nBundle, fs) {
    if (!(await (0, utils_1.doesExist)(path))) {
        return undefined;
    }
    const content = await (0, utils_1.readFile)(path, fs);
    return toI18nBundle(content, path);
}
/**
 * Get transformers.
 *
 * @param fallbackLanguage fallback language
 * @returns array of transformer
 */
const getTransformers = (fallbackLanguage) => [
    { toI18nBundle: json_1.jsonToI18nBundle, bundlePath: utils_1.jsonPath },
    {
        toI18nBundle: (content, path) => ({
            [fallbackLanguage]: (0, properties_1.propertiesToI18nEntry)(content, path)
        }),
        bundlePath: utils_1.capPropertiesPath
    },
    { toI18nBundle: csv_1.csvToI18nBundle, bundlePath: utils_1.csvPath }
];
/**
 * Merges i18n files in to a single bundle for CDS source files.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePaths CDS file path
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns i18n bundle or exception
 */
async function getCapI18nBundle(root, env, filePaths, fs) {
    const bundle = {};
    const { defaultLanguage, fallbackLanguage } = (0, utils_1.getI18nConfiguration)(env);
    const i18nFileLocations = (0, utils_1.getCapI18nFiles)(root, env, filePaths);
    for (const path of i18nFileLocations) {
        const transformers = getTransformers(fallbackLanguage);
        for (const { toI18nBundle, bundlePath } of transformers) {
            const i18nFilePath = bundlePath(path, env);
            const entries = await tryTransformTexts(i18nFilePath, toI18nBundle, fs);
            if (!entries) {
                continue;
            }
            const currentBundle = entries[fallbackLanguage] ?? entries[defaultLanguage] ?? [];
            for (const entry of currentBundle) {
                if (!bundle[entry.key.value]) {
                    bundle[entry.key.value] = [];
                }
                bundle[entry.key.value].push(entry);
            }
            break;
        }
    }
    return bundle;
}
//# sourceMappingURL=bundle.js.map