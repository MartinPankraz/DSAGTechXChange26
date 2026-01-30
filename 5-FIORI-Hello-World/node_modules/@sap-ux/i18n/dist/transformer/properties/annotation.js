"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnotation = getAnnotation;
const text_document_utils_1 = require("@sap-ux/text-document-utils");
/**
 * Convert text to value node with range information.
 *
 * @param comment comment
 * @param commaIndex comma index
 * @param colonIndex colon index
 * @returns value node with range info
 */
function toTextTypeNode(comment, commaIndex, colonIndex) {
    const { range: { start }, value } = comment;
    // Comments can only be single line, so start and end lines will be equal
    if (commaIndex !== -1) {
        return {
            value: value.slice(1, commaIndex),
            range: text_document_utils_1.Range.create(start.line, start.character, start.line, start.character + commaIndex)
        };
    }
    if (colonIndex !== -1) {
        return {
            value: value.slice(1, colonIndex),
            range: text_document_utils_1.Range.create(start.line, start.character + 1, start.line, start.character + colonIndex)
        };
    }
    return {
        value: value.slice(1),
        range: text_document_utils_1.Range.create(start.line, start.character, start.line, start.character + value.length)
    };
}
/**
 * Convert text to value node with range information.
 *
 * @param comment comment
 * @param commaIndex comma index
 * @param colonIndex colon index
 * @returns value node with range info
 */
function toMaxLength(comment, commaIndex, colonIndex) {
    if (commaIndex === -1) {
        return undefined;
    }
    const { range: { start }, value } = comment;
    return {
        value: Number.parseInt(value.slice(commaIndex + 1, colonIndex === -1 ? undefined : colonIndex), 10),
        range: text_document_utils_1.Range.create(start.line, start.character + commaIndex + 1, start.line, start.character + (colonIndex === -1 ? value.length : colonIndex))
    };
}
/**
 * Convert comment to note node with range info.
 *
 * @param comment comment
 * @param colonIndex colon index
 * @returns note node with range info
 */
function toNote(comment, colonIndex) {
    if (colonIndex === -1) {
        return undefined;
    }
    const { range: { start }, value } = comment;
    return {
        value: value.slice(colonIndex + 1),
        range: text_document_utils_1.Range.create(start.line, start.character + colonIndex + 1, start.line, start.character + value.length)
    };
}
/**
 * Get i18n annotation.
 *
 * @param commentLine comment line
 * @returns annotation node
 */
function getAnnotation(commentLine) {
    if (commentLine?.type !== 'comment-line') {
        return undefined;
    }
    const { value } = commentLine;
    const commaIndex = value.indexOf(',');
    const colonIndex = value.indexOf(':');
    const annotation = {
        textType: toTextTypeNode(commentLine, commaIndex, colonIndex),
        maxLength: toMaxLength(commentLine, commaIndex, colonIndex),
        note: toNote(commentLine, colonIndex)
    };
    return annotation;
}
//# sourceMappingURL=annotation.js.map