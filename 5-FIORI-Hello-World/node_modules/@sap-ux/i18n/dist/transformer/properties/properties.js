"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesToI18nEntry = propertiesToI18nEntry;
const parser_1 = require("../../parser/properties/parser");
const annotation_1 = require("./annotation");
/**
 * Convert `.properties` content to i18n entries.
 *
 * @param content `.properties` content
 * @param filePath path to i18n file
 * @returns i18n entry
 */
function propertiesToI18nEntry(content, filePath = '') {
    const i18nEntries = [];
    const { ast } = (0, parser_1.parseProperties)(content);
    for (let i = 0; ast.length > i; i++) {
        const line = ast[i];
        if (line.type !== 'key-element-line') {
            continue;
        }
        const commentLine = ast[i - 1];
        const entry = {
            filePath,
            key: {
                value: line.key.value,
                range: line.key.range
            },
            value: {
                value: line.element.value,
                range: line.element.range
            },
            annotation: (0, annotation_1.getAnnotation)(commentLine)
        };
        i18nEntries.push(entry);
    }
    return i18nEntries;
}
//# sourceMappingURL=properties.js.map