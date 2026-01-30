"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJsonTexts = addJsonTexts;
exports.tryAddJsonTexts = tryAddJsonTexts;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const utils_1 = require("../../utils");
const text_document_utils_1 = require("@sap-ux/text-document-utils");
const jsonc_parser_1 = require("jsonc-parser");
/**
 * Create full bundle.
 *
 * @param fallbackLocale fallback local
 * @param newEntries new i18n entries that will be maintained
 * @returns fallback key with i18n bundle
 */
function createFullBundle(fallbackLocale, newEntries) {
    const fallbackBundle = newEntries.reduce((acc, entry) => {
        acc[entry.key] = entry.value;
        return acc;
    }, {});
    return {
        [fallbackLocale]: fallbackBundle
    };
}
/**
 * Get text document.
 *
 * @param text json text
 * @returns text document instance
 */
const getTextDocument = (text) => vscode_languageserver_textdocument_1.TextDocument.create('', '', 0, text);
/**
 * Add json text to fallback node.
 *
 * @param text json text
 * @param fallbackLocale fallback node
 * @param fallbackLocaleNode fallback local node
 * @param indent indentation
 * @param eol end of line
 * @param newEntries new i18n entries that will be maintained
 * @returns text string
 */
function addToExistingFallbackLocalNode(text, fallbackLocale, fallbackLocaleNode, indent, eol, newEntries) {
    const bundleNode = (fallbackLocaleNode.children ?? [])[1];
    const textNodes = bundleNode?.children ?? [];
    if (textNodes.length) {
        const document = getTextDocument(text);
        const position = document.positionAt(textNodes[0].offset);
        let newText = '';
        for (const entry of newEntries) {
            newText += `${indent + indent}"${entry.key}": "${entry.value}",${eol}`;
        }
        const edit = {
            newText: newText,
            range: text_document_utils_1.Range.create(position.line, 0, position.line, 0)
        };
        return vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, [edit]);
    }
    if (bundleNode?.offset) {
        const document = getTextDocument(text);
        const start = document.positionAt(bundleNode.offset);
        const end = document.positionAt(bundleNode.offset + bundleNode.length);
        const bundle = createFullBundle(fallbackLocale, newEntries);
        const newText = JSON.stringify(bundle[fallbackLocale], undefined, indent);
        const indented = (0, utils_1.applyIndent)(`${newText}`, indent, eol, false);
        const edit = {
            newText: indented,
            range: text_document_utils_1.Range.create(start, end)
        };
        return vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, [edit]);
    }
    return text;
}
/**
 * Add json text.
 *
 * @param text json text
 * @param fallbackLocale fallback local i18n
 * @param newEntries new i18n entries that will be maintained
 * @returns text string
 */
function addJsonTexts(text, fallbackLocale, newEntries) {
    if (text === '') {
        const bundle = createFullBundle(fallbackLocale, newEntries);
        return JSON.stringify(bundle, undefined, 4);
    }
    const rootNode = (0, jsonc_parser_1.parseTree)(text);
    if (rootNode?.type !== 'object') {
        return text;
    }
    const localeNodes = rootNode.children ?? [];
    const eol = (0, utils_1.discoverLineEnding)(text);
    const indent = (0, utils_1.discoverIndent)(text);
    if (localeNodes.length === 0) {
        const bundle = createFullBundle(fallbackLocale, newEntries);
        return JSON.stringify(bundle, undefined, 4);
    }
    const fallbackLocaleNode = localeNodes.find((node) => (node.children ?? [])[0]?.value === fallbackLocale);
    if (fallbackLocaleNode) {
        return addToExistingFallbackLocalNode(text, fallbackLocale, fallbackLocaleNode, indent, eol, newEntries);
    }
    // create new entries with local fallback
    const document = getTextDocument(text);
    const [last] = localeNodes.slice(-1);
    const position = document.positionAt(last.offset);
    const bundle = createFullBundle(fallbackLocale, newEntries);
    const newText = JSON.stringify(bundle[fallbackLocale], undefined, indent);
    const indented = (0, utils_1.applyIndent)(`"${fallbackLocale}": ${newText},`, indent, eol);
    const edit = {
        newText: indented + eol,
        range: text_document_utils_1.Range.create(position.line, 0, position.line, 0)
    };
    return vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, [edit]);
}
/**
 * Try add new i18n entries to json file.
 *
 * @param env cds environment
 * @param path file path
 * @param newI18nEntries new i18n entries that will be maintained
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
async function tryAddJsonTexts(env, path, newI18nEntries, fs) {
    const i18nFilePath = (0, utils_1.jsonPath)(path);
    if (!(await (0, utils_1.doesExist)(i18nFilePath))) {
        return false;
    }
    const { fallbackLanguage } = (0, utils_1.getI18nConfiguration)(env);
    const content = await (0, utils_1.readFile)(i18nFilePath, fs);
    const newContent = addJsonTexts(content, fallbackLanguage, newI18nEntries);
    await (0, utils_1.writeFile)(i18nFilePath, newContent, fs);
    return true;
}
//# sourceMappingURL=json.js.map