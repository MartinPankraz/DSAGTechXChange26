"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getI18nMaxLength = getI18nMaxLength;
exports.getI18nTextType = getI18nTextType;
exports.discoverLineEnding = discoverLineEnding;
exports.discoverIndent = discoverIndent;
exports.applyIndent = applyIndent;
exports.convertToCamelCase = convertToCamelCase;
exports.convertToPascalCase = convertToPascalCase;
const types_1 = require("../types");
/**
 * Get the calculated maximum text length for an i18n property value.
 *
 * @param value - Value of the i18n property
 * @returns max length for a given value
 * @description The algorithm considers the current UI5 specification.
 */
function getI18nMaxLength(value) {
    const iLength = value.length;
    if (iLength < 8) {
        return iLength * 5;
    }
    if (iLength <= 30) {
        return iLength * 3;
    }
    return iLength * 1.5;
}
/**
 * Get a suitable textType for an i18n property.
 *
 * @param maxLength - Maximum text length of the i18n property value
 * @returns returns text type
 * @description The textType is derived from the maximum text length maxLength of the property value.
 */
function getI18nTextType(maxLength) {
    if (maxLength <= 120) {
        return types_1.SapShortTextType.Label;
    }
    return types_1.SapLongTextType.MessageText;
}
/**
 * Discover line ending.
 *
 * @param text text
 * @returns text
 */
function discoverLineEnding(text) {
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        if (character === '\r') {
            if (i + 1 < text.length && text[i + 1] === '\n') {
                return '\r\n';
            }
            return '\r';
        }
        else if (character === '\n') {
            return '\n';
        }
    }
    return '\n';
}
const INDENT_PATTERN = /(?:\r|\n|\r?\n)([ \t]+)/;
/**
 * Discover indent.
 *
 * @param text text
 * @returns indented text
 */
function discoverIndent(text) {
    const match = INDENT_PATTERN.exec(text);
    if (match) {
        return match[1];
    }
    return '    ';
}
const LINE_ENDING_PATTERN = /\r|\n|\r?\n/;
/**
 * Apply indent.
 *
 * @param text text
 * @param indent indent
 * @param eol end of line
 * @param indentFirstLine indent first line
 * @returns indented text
 */
function applyIndent(text, indent, eol, indentFirstLine = true) {
    const lines = text.split(LINE_ENDING_PATTERN);
    let out = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!indentFirstLine && i === 0) {
            out += line;
        }
        else {
            out += indent + line;
        }
        if (i + 1 !== lines.length) {
            out += eol;
        }
    }
    return out;
}
/**
 * Convert to camel case. It gets text like 'product details info' and convert it to 'productDetailsInfo'.
 *
 * @param text text
 * @param maxWord maximal word
 * @returns camel case text
 */
function convertToCamelCase(text = '', maxWord = 4) {
    let output = '';
    const parts = text
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(' ');
    const len = parts.length >= maxWord ? maxWord : parts.length;
    for (let i = 0; len > i; i++) {
        const part = parts[i];
        if (i === 0) {
            output += part.toLowerCase();
        }
        else {
            const initial = part.charAt(0).toUpperCase();
            const rest = part.substring(1).toLowerCase();
            output += `${initial}${rest}`;
        }
    }
    return output;
}
/**
 * Convert to pascal case. It gets text like 'product details info' and convert it to 'ProductDetailsInfo'.
 *
 * @param text text
 * @param maxWord maximal word
 * @returns pascal case text
 */
function convertToPascalCase(text, maxWord = 4) {
    let output = '';
    const parts = text
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(' ');
    const len = parts.length >= maxWord ? maxWord : parts.length;
    for (let i = 0; len > i; i++) {
        const part = parts[i];
        const initial = part.charAt(0).toUpperCase();
        const rest = part.substring(1).toLowerCase();
        output += `${initial}${rest}`;
    }
    return output;
}
//# sourceMappingURL=text.js.map