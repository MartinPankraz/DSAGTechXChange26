"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProperties = parseProperties;
const lexer_1 = require("../lexer");
const properties_parser_1 = require("./properties-parser");
/**
 * Parse properties text.
 *
 * @param text text
 * @returns parse result
 */
function parseProperties(text) {
    const tokens = (0, lexer_1.tokenize)(text);
    const ast = (0, properties_parser_1.getPropertyList)(tokens, text);
    return { ast, tokens };
}
//# sourceMappingURL=index.js.map