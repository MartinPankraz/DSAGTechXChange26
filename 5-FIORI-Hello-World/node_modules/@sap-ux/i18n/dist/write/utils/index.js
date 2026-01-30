"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToExistingI18nPropertiesFile = writeToExistingI18nPropertiesFile;
const utils_1 = require("../../utils");
const text_document_utils_1 = require("@sap-ux/text-document-utils");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const parser_1 = require("../../parser/properties/parser");
/**
 * Write i18n entries to an existing i18n.properties file.
 * If keys to remove are provided, they will be removed from the file before writing new entries.
 *
 * @param i18nFilePath i18n file path
 * @param newI18nEntries  new i18n entries that will be maintained
 * @param keysToRemove - Array of keys to remove from the file.
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
async function writeToExistingI18nPropertiesFile(i18nFilePath, newI18nEntries, keysToRemove = [], fs) {
    let newContent = newI18nEntries
        .map((entry) => (0, utils_1.printPropertiesI18nEntry)(entry.key, entry.value, entry.annotation))
        .join('');
    let content = await (0, utils_1.readFile)(i18nFilePath, fs);
    if (keysToRemove.length) {
        content = removeKeysFromI18nPropertiesFile(content, keysToRemove);
    }
    const lines = content.split(/\r\n|\n/);
    // check if file does not end with new line
    if (lines.length > 0 && lines[lines.length - 1].trim()) {
        // If there no end line - add new gap line before new content
        newContent = `\n${newContent}`;
    }
    await (0, utils_1.writeFile)(i18nFilePath, content.concat(newContent), fs);
    return true;
}
/**
 * Removes i18n entries from an existing i18n.properties file.
 *
 * @param content content of the i18n.properties file.
 * @param keysToRemove Array of keys to remove from the file.
 * @returns string
 */
function removeKeysFromI18nPropertiesFile(content, keysToRemove) {
    const document = vscode_languageserver_textdocument_1.TextDocument.create('', '', 0, content);
    const textEdits = [];
    const { ast } = (0, parser_1.parseProperties)(content);
    for (let i = 0; i < ast.length; i++) {
        const line = ast[i];
        if (line.type === 'key-element-line' && keysToRemove.findIndex((key) => line.key.value.includes(key)) !== -1) {
            const previousLine = ast[i - 1];
            const start = previousLine.type === 'comment-line' ? previousLine.range.start : line.range.start;
            const end = line.endOfLineToken ? document.positionAt(line.endOfLineToken.end) : line.range.end;
            textEdits.push(text_document_utils_1.TextEdit.del(text_document_utils_1.Range.create(start, end)));
        }
    }
    return vscode_languageserver_textdocument_1.TextDocument.applyEdits(document, textEdits).trim();
}
//# sourceMappingURL=index.js.map