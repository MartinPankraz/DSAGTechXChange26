"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToI18nBundle = jsonToI18nBundle;
const jsonc_parser_1 = require("jsonc-parser");
const text_document_utils_1 = require("@sap-ux/text-document-utils");
/**
 * Create text node value with its range.
 *
 * @param value node value
 * @param range node range
 * @returns text node with range info
 */
function createTextNode(value, range) {
    return {
        value,
        range
    };
}
/**
 * Convert a json node to text node with range information.
 *
 * @param node json node
 * @param lineOffsets line offsets
 * @param contentLength length of json content
 * @returns text node along its range or undefined
 */
function toTextNode(node, lineOffsets, contentLength) {
    if (!node) {
        return undefined;
    }
    let result;
    switch (typeof node.value) {
        case 'string': {
            // for string literals node offset starts with '"' character, but we don't include it in the text node range
            const start = (0, text_document_utils_1.positionAt)(lineOffsets, node.offset + 1, contentLength);
            const { value } = node;
            result = createTextNode(value, text_document_utils_1.Range.create(start, text_document_utils_1.Position.create(start.line, start.character + value.length)));
            break;
        }
        case 'number': {
            const start = (0, text_document_utils_1.positionAt)(lineOffsets, node.offset, contentLength);
            const value = node.value.toString();
            result = createTextNode(value, text_document_utils_1.Range.create(start, text_document_utils_1.Position.create(start.line, start.character + value.length)));
            break;
        }
        case 'boolean': {
            const start = (0, text_document_utils_1.positionAt)(lineOffsets, node.offset, contentLength);
            // CDS currently uses the boolean value if its true, otherwise falls back to using the key
            const value = node.value ? 'true' : '';
            result = createTextNode(value, text_document_utils_1.Range.create(start, text_document_utils_1.Position.create(start.line, start.character + value.length)));
            break;
        }
        default: {
            const start = (0, text_document_utils_1.positionAt)(lineOffsets, node.offset, contentLength);
            result = createTextNode('', text_document_utils_1.Range.create(start, start));
        }
    }
    return result;
}
/**
 * Process text nodes.
 *
 * @param textNodes text nodes
 * @param lineOffsets line offsets
 * @param contentLength content length
 * @param filePath file path
 * @returns i18n entires
 */
function processTextNodes(textNodes, lineOffsets, contentLength, filePath) {
    const entries = [];
    for (const textNode of textNodes) {
        if (textNode.type === 'property') {
            const key = toTextNode((textNode.children ?? [])[0], lineOffsets, contentLength);
            const value = toTextNode((textNode.children ?? [])[1], lineOffsets, contentLength);
            if (key && value) {
                entries.push({
                    filePath,
                    key,
                    value
                });
            }
        }
    }
    return entries;
}
/**
 * Convert json text to i18n bundles.
 *
 * @param text json text
 * @param filePath file path of json text
 * @returns i18n bundles
 */
function jsonToI18nBundle(text, filePath = '') {
    const bundle = {};
    const rootNode = (0, jsonc_parser_1.parseTree)(text);
    const lineOffsets = (0, text_document_utils_1.getLineOffsets)(text);
    const contentLength = text.length;
    if (rootNode?.type !== 'object') {
        return bundle;
    }
    const localeNodes = rootNode.children ?? [];
    for (const localeNode of localeNodes) {
        if (localeNode.type === 'property') {
            const locale = (localeNode.children ?? [])[0]?.value ?? '';
            const textNodes = (localeNode.children ?? [])[1]?.children ?? [];
            bundle[locale] = processTextNodes(textNodes, lineOffsets, contentLength, filePath);
        }
    }
    return bundle;
}
//# sourceMappingURL=json.js.map