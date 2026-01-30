"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
const constant_1 = require("../constant");
/**
 * Check if character is whitespace.
 *
 * @param character character to check
 * @returns boolean
 */
function isWhitespace(character) {
    if (!character) {
        return false;
    }
    return constant_1.WHITESPACE.test(character);
}
/**
 * Check if character is escape char.
 *
 * @param character character to check
 * @returns boolean
 */
function isEscape(character) {
    return character === '\\';
}
/**
 * Check is character is comment.
 *
 * @param character character to check
 * @returns boolean
 */
function isComment(character) {
    if (!character) {
        return false;
    }
    return constant_1.COMMENT_START.test(character);
}
/**
 * Check if character is end of line.
 *
 * @param character character to check
 * @returns boolean
 */
function isEndOfLine(character) {
    if (!character) {
        return false;
    }
    return constant_1.END_OF_LINE.test(character);
}
/**
 * Check if character is separator.
 *
 * @param character character to check
 * @returns boolean
 */
function isSeparator(character) {
    if (!character) {
        return false;
    }
    return constant_1.SEPARATOR.test(character);
}
/**
 * Check if character is escape character.
 *
 * @param character character to check
 * @returns boolean
 */
function isEscapeS(character) {
    return character === '\\';
}
/**
 * Clean spaces after escape characters.
 *
 * @param text text to be cleaned
 * @returns clean texted
 */
function cleanSpacesAfterEscape(text) {
    return text.replace(/\\\s+/g, '\\');
}
/**
 * Check if next token is a value.
 *
 * @param tokens existing tokens
 * @returns boolean
 */
function isValue(tokens) {
    const tokensCleaned = tokens.filter((t) => t.type !== 'whitespace');
    // if previous token is separator, nex token must be value
    if (tokensCleaned[tokensCleaned.length - 1]?.type === 'separator') {
        return true;
    }
    return false;
}
/**
 * Properties tokenizer class.
 */
class PropertiesTokenizer {
    offset;
    text;
    tokens;
    /**
     * Class constructor.
     *
     * @param text text to be tokenized
     * @returns void
     */
    constructor(text) {
        this.text = text;
        this.offset = 0;
        this.tokens = [];
    }
    /**
     * Peek token.
     *
     * @param count number of token to peek
     * @returns token or undefined
     */
    peekToken(count = 0) {
        return this.tokens[count];
    }
    /**
     * Peek character.
     *
     * @param count number of character to peek
     * @returns undefine or string
     */
    peek(count = 0) {
        if (this.offset + count >= this.text.length) {
            return undefined;
        }
        return this.text.charAt(this.offset + count);
    }
    /**
     * Get next char and increment offset.
     *
     * @param count amount characters to increment offset. By default one char
     * @returns undefine or string
     */
    next(count = 1) {
        if (this.offset >= this.text.length) {
            return undefined;
        }
        // increment offset
        this.offset = this.offset + count;
        return this.text.charAt(count);
    }
    /**
     * Get image.
     *
     * @param start start of offset
     * @param end end of offset
     * @returns image for given offset
     */
    getImage(start, end) {
        return this.text.substring(start, end);
    }
    /**
     * Create token.
     *
     * @param type token type
     * @param start start of offset
     * @param end end of offset
     * @param image image. If provided will be used as image of a token
     * @returns token
     */
    createToken(type, start, end, image) {
        return {
            type,
            image: image ?? this.getImage(start, end),
            start,
            end
        };
    }
    /**
     * Consume whitespace.
     */
    consumeWhitespace() {
        const start = this.offset;
        const token = this.peekToken(this.getTokens().length - 1);
        while (isWhitespace(this.peek())) {
            this.next();
        }
        let type = 'whitespace';
        if (!isSeparator(this.peek()) && token?.type === 'key') {
            // whitespace can also serve as separator
            type = 'separator';
        }
        const end = this.offset;
        this.tokens.push(this.createToken(type, start, end));
    }
    /**
     * Consume comment.
     */
    consumeComment() {
        const start = this.offset;
        // first check there is another character
        while (this.peek() && !isEndOfLine(this.peek())) {
            this.next();
        }
        const end = this.offset;
        this.tokens.push(this.createToken('comment', start, end));
    }
    /**
     * Consume key.
     */
    consumeKey() {
        const start = this.offset;
        while (this.peek()) {
            const character = this.peek();
            if (isEndOfLine(character)) {
                break;
            }
            if (isWhitespace(character)) {
                break;
            }
            if (isEscapeS(character)) {
                // consume escape char and it's following char
                this.next(2);
                continue;
            }
            if (isSeparator(character)) {
                break;
            }
            this.next();
        }
        const end = this.offset;
        this.tokens.push(this.createToken('key', start, end));
    }
    /**
     * Collect escape characters.
     *
     * @returns colleted escape characters
     */
    collectEscape() {
        let character = '';
        while (isEscape(this.peek())) {
            character += this.peek();
            this.next();
        }
        return character;
    }
    /**
     * Consume value.
     *
     * @param start start of offset.
     */
    consumeValue(start = this.offset) {
        while (this.peek()) {
            const character = this.peek();
            if (isEscape(character)) {
                this.consumeEscape(start);
                // return to stop execution flow
                return;
            }
            if (isEndOfLine(character)) {
                break;
            }
            this.next();
        }
        const end = this.offset;
        this.tokens.push(this.createToken('value', start, end));
    }
    /**
     * Consume end of line.
     */
    consumeEndOfLine() {
        const start = this.offset;
        // incase of multiple line breaks
        while (isEndOfLine(this.peek())) {
            this.next();
        }
        const end = this.offset;
        this.tokens.push(this.createToken('end-of-line', start, end));
    }
    /**
     * Consume escape.
     *
     * @param start start of offset
     * @param addToken boolean to add to tokens or not
     */
    consumeEscape(start, addToken = true) {
        const escape = this.collectEscape();
        if (escape.length % 2 === 0) {
            const end = this.offset;
            this.tokens.push(this.createToken('value', start, end));
            return;
        }
        const nextChar = this.peek();
        if (isEndOfLine(nextChar)) {
            // consume line break after odd escaped char
            this.next();
        }
        while (this.peek()) {
            const char = this.peek();
            if (isEscapeS(char)) {
                this.consumeEscape(start, false);
                continue;
            }
            if (isEndOfLine(char)) {
                break;
            }
            this.next();
        }
        if (addToken) {
            const end = this.offset;
            const image = cleanSpacesAfterEscape(this.getImage(start, end));
            this.tokens.push(this.createToken('value', start, end, image));
        }
    }
    /**
     * Consume separator.
     */
    consumeSeparator() {
        const start = this.offset;
        // consume one character
        this.next();
        const end = this.offset;
        this.tokens.push(this.createToken('separator', start, end));
    }
    /**
     * Tokenize a text.
     */
    tokenize() {
        while (this.peek()) {
            const character = this.peek();
            if (isWhitespace(character)) {
                this.consumeWhitespace();
                continue;
            }
            if (isEndOfLine(character)) {
                this.consumeEndOfLine();
                continue;
            }
            if (isComment(character)) {
                this.consumeComment();
                continue;
            }
            if (isSeparator(character)) {
                this.consumeSeparator();
                continue;
            }
            if (isValue(this.getTokens())) {
                this.consumeValue();
                continue;
            }
            this.consumeKey();
        }
    }
    /**
     * Get list of tokens.
     *
     * @returns tokenized tokens
     */
    getTokens() {
        return this.tokens;
    }
}
/**
 * Tokenize text.
 *
 * @param text text
 * @returns list of tokens
 */
function tokenize(text) {
    const tokenizer = new PropertiesTokenizer(text);
    tokenizer.tokenize();
    return tokenizer.getTokens();
}
//# sourceMappingURL=index.js.map