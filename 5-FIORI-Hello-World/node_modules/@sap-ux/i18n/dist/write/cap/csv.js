"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCsvTexts = addCsvTexts;
exports.tryAddCsvTexts = tryAddCsvTexts;
const utils_1 = require("../../utils");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const text_document_utils_1 = require("@sap-ux/text-document-utils");
const parser_1 = require("../../parser/csv/parser");
/**
 * Add CSV text for fallback.
 *
 * @param text csv text
 * @param eol end of line
 * @param newEntries new i18n entries
 * @param headerFields header fields of csv
 * @param fallbackLocale fallback local
 * @returns csv text
 */
function addFallbackCsvText(text, eol, newEntries, headerFields, fallbackLocale) {
    let newText = '';
    for (const entry of newEntries) {
        newText += `${entry.key};`;
        for (let column = 1; column < headerFields.length; column++) {
            const columnHeader = headerFields[column];
            if (columnHeader.value === fallbackLocale) {
                newText += `${entry.value}`;
            }
            if (column + 1 !== headerFields.length) {
                newText += ';';
            }
        }
        newText += eol;
    }
    if (text.endsWith(eol)) {
        return text + newText;
    }
    return text + eol + newText;
}
/**
 * Add csv text.
 *
 * @param text csv text
 * @param fallbackLocale fallback local
 * @param newEntries new i18n entries that will be maintained
 * @returns csv text
 */
function addCsvTexts(text, fallbackLocale, newEntries) {
    const { ast } = (0, parser_1.parseCsv)(text);
    const eol = (0, utils_1.discoverLineEnding)(text);
    const headerFields = ast.header.fields;
    if (headerFields.length === 0) {
        let newText = `key;${fallbackLocale}${eol}`;
        for (const entry of newEntries) {
            newText += `${entry.key};${entry.value}${eol}`;
        }
        return text + newText;
    }
    const fallbackFieldIndex = headerFields.findIndex((field) => field.value === fallbackLocale);
    if (fallbackFieldIndex !== -1) {
        return addFallbackCsvText(text, eol, newEntries, headerFields, fallbackLocale);
    }
    const document = vscode_languageserver_textdocument_1.TextDocument.create('', '', 0, text);
    const edits = [];
    edits.push({
        newText: `;${fallbackLocale}`,
        range: text_document_utils_1.Range.create(0, ast.header.range.end.character, 0, ast.header.range.end.character)
    });
    for (const row of ast.rows) {
        edits.push({
            newText: `;`,
            range: text_document_utils_1.Range.create(row.range.end, row.range.end)
        });
    }
    let newText = `${eol}`;
    for (const entry of newEntries) {
        newText += `${entry.key};`;
        for (let column = 1; column < headerFields.length; column++) {
            newText += ';';
        }
        newText += `${entry.value}${eol}`;
    }
    const lastRow = ast.rows.slice(-1)[0];
    const position = lastRow ? lastRow.range.end : text_document_utils_1.Position.create(1, 0);
    edits.push({
        newText,
        range: text_document_utils_1.Range.create(position, position)
    });
    return vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, edits);
}
/**
 * Try add new i18n entries to csv file.
 *
 * @param env cds environment
 * @param path file path
 * @param newI18nEntries new i18n entries that will be maintained
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
async function tryAddCsvTexts(env, path, newI18nEntries, fs) {
    const i18nFilePath = (0, utils_1.csvPath)(path);
    if (!(await (0, utils_1.doesExist)(i18nFilePath))) {
        return false;
    }
    const { defaultLanguage } = (0, utils_1.getI18nConfiguration)(env);
    const content = await (0, utils_1.readFile)(i18nFilePath, fs);
    const newContent = addCsvTexts(content, defaultLanguage, newI18nEntries);
    await (0, utils_1.writeFile)(i18nFilePath, newContent, fs);
    return true;
}
//# sourceMappingURL=csv.js.map