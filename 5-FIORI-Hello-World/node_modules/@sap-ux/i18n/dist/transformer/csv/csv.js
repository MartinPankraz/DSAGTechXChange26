"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToI18nBundle = csvToI18nBundle;
const parser_1 = require("../../parser/csv/parser");
/**
 * Convert csv field to text node.
 *
 * @param field csv field
 * @returns text node or undefined
 */
function toTextNode(field) {
    if (!field) {
        return undefined;
    }
    return {
        value: field.value,
        range: field.range
    };
}
/**
 * Convert CSV content to i18n bundles.
 *
 * @param text csv text
 * @param filePath file path of csv text
 * @returns i18n bundles
 */
function csvToI18nBundle(text, filePath = '') {
    const bundle = {};
    const { ast } = (0, parser_1.parseCsv)(text);
    for (let columnIndex = 1; columnIndex < ast.header.fields.length; columnIndex++) {
        const locale = ast.header.fields[columnIndex];
        const entries = [];
        for (const row of ast.rows) {
            if (row) {
                const key = toTextNode(row.fields[0]);
                const value = toTextNode(row.fields[columnIndex]);
                if (key && value) {
                    entries.push({
                        filePath,
                        key,
                        value
                    });
                }
            }
        }
        bundle[locale.value] = entries;
    }
    return bundle;
}
//# sourceMappingURL=csv.js.map