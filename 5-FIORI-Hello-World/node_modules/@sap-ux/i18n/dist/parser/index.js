"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
const types_1 = require("./types");
const parser_1 = require("./properties/parser");
const parser_2 = require("./csv/parser");
/**
 * Parse text.
 *
 * @param text text
 * @param format extension format
 * @returns parse result
 */
function parse(text, format) {
    if (format === types_1.FileFormat.properties) {
        return (0, parser_1.parseProperties)(text);
    }
    return (0, parser_2.parseCsv)(text);
}
//# sourceMappingURL=index.js.map