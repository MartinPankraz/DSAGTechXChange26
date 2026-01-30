"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = parseCsv;
const text_document_utils_1 = require("@sap-ux/text-document-utils");
const types_1 = require("../types");
const lexer_1 = require("../lexer");
/**
 * Parse CSV
 */
class ParseCsv {
    text;
    lineOffsets;
    i;
    tokens;
    /**
     * Constructor of ParseCsv class.
     *
     * @param text text
     */
    constructor(text) {
        this.text = text;
        this.tokens = (0, lexer_1.tokenize)(text);
        this.lineOffsets = (0, text_document_utils_1.getLineOffsets)(text);
        this.i = 0;
    }
    /**
     * Get tokens.
     *
     * @returns list of tokens
     */
    getTokens() {
        return this.tokens;
    }
    /**
     * Get content length from text.
     *
     * @returns number
     */
    getContentLength() {
        return this.text.length;
    }
    /**
     * Peek a token.
     *
     * @param count number to peek
     * @returns Token or undefined
     */
    peek(count = 0) {
        return this.tokens[this.i + count];
    }
    /**
     * Consume a token.
     *
     * @returns token
     */
    consume() {
        return this.tokens[this.i++];
    }
    /**
     * End of line.
     *
     * @returns boolean
     */
    eof() {
        return this.i >= this.tokens.length;
    }
    /**
     * Parse CSV field.
     *
     * @returns CSV filed
     */
    parseField() {
        const token = this.consume();
        return {
            quoted: token.type === types_1.TokenType.escaped,
            value: token.value,
            range: text_document_utils_1.Range.create((0, text_document_utils_1.positionAt)(this.lineOffsets, token.start, this.getContentLength()), (0, text_document_utils_1.positionAt)(this.lineOffsets, token.end, this.getContentLength()))
        };
    }
    /**
     * Parse CSV row.
     *
     * @returns CDV row
     */
    parseRow() {
        const row = {
            fields: [],
            range: text_document_utils_1.Range.create(0, 0, 0, 0)
        };
        while (!this.eof() && this.peek()?.type !== types_1.TokenType.eol) {
            if (this.peek()?.type === types_1.TokenType.escaped || this.peek()?.type === types_1.TokenType.text) {
                row.fields.push(this.parseField());
            }
            const next = this.peek();
            if (next && next.type !== types_1.TokenType.eol) {
                if (next.type === types_1.TokenType.separator && this.peek(1) === undefined) {
                    // trailing separator at the end of file
                    row.fields.push({
                        quoted: false,
                        value: '',
                        range: text_document_utils_1.Range.create((0, text_document_utils_1.positionAt)(this.lineOffsets, next.end, this.getContentLength()), (0, text_document_utils_1.positionAt)(this.lineOffsets, next.end, this.getContentLength()))
                    });
                }
                this.consume();
            }
        }
        if (row.fields.length) {
            const start = row.fields[0].range.start;
            const end = row.fields[row.fields.length - 1].range.end;
            row.range = text_document_utils_1.Range.create(start.line, start.character, end.line, end.character);
        }
        return row;
    }
    /**
     * Parse CSV document.
     *
     * @returns CSV document
     */
    parseDocument() {
        // escape newline(s)
        while (!this.eof()) {
            const next = this.peek();
            if (next?.type === types_1.TokenType.text && next.value.length === 0 && this.peek(1)?.type === types_1.TokenType.eol) {
                this.consume(); // empty text
                this.consume(); // eol
            }
            else {
                break;
            }
        }
        const document = {
            header: this.parseRow(),
            rows: []
        };
        while (!this.eof()) {
            if (this.peek()?.type === types_1.TokenType.escaped || this.peek()?.type === types_1.TokenType.text) {
                document.rows.push(this.parseRow());
            }
            this.consume();
        }
        return document;
    }
}
/**
 * Parse CSV content.
 *
 * @param text text
 * @returns CSV parsed result
 */
function parseCsv(text) {
    const csv = new ParseCsv(text);
    const tokens = csv.getTokens();
    return {
        ast: csv.parseDocument(),
        tokens
    };
}
//# sourceMappingURL=csv-parser.js.map