"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRangeWithPosition = exports.copyRange = exports.copyPosition = void 0;
exports.rangeAt = rangeAt;
exports.arePositionsEqual = arePositionsEqual;
exports.areRangesEqual = areRangesEqual;
exports.createRange = createRange;
const position_1 = require("./position");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
/**
 * Create range.
 *
 * @param lineOffsets line offset
 * @param start start point
 * @param end end point
 * @param textLength text length
 * @returns range
 */
function rangeAt(lineOffsets, start, end, textLength) {
    return vscode_languageserver_types_1.Range.create((0, position_1.positionAt)(lineOffsets, start, textLength), (0, position_1.positionAt)(lineOffsets, end, textLength));
}
/**
 * Checks if given positions are equal.
 *
 * @param a Position 1
 * @param b Position 2
 * @returns True if positions are equal
 */
function arePositionsEqual(a, b) {
    return a.line === b.line && a.character === b.character;
}
/**
 * Checks if given ranges are equal.
 *
 * @param a Range 1
 * @param b Range 2
 * @returns True if ranges are equal
 */
function areRangesEqual(a, b) {
    return arePositionsEqual(a.start, b.start) && arePositionsEqual(a.end, b.end);
}
const copyPosition = (position) => vscode_languageserver_types_1.Position.create(position.line, position.character);
exports.copyPosition = copyPosition;
const copyRange = (range) => vscode_languageserver_types_1.Range.create((0, exports.copyPosition)(range.start), (0, exports.copyPosition)(range.end));
exports.copyRange = copyRange;
/**
 * Cretaes range by given coordinates.
 *
 * @param line1
 * @param character1
 * @param line2
 * @param character2
 * @returns range object
 */
function createRange(line1, character1, line2, character2) {
    return vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(line1, character1), vscode_languageserver_types_1.Position.create(line2, character2));
}
const createRangeWithPosition = (start, end) => start && end ? vscode_languageserver_types_1.Range.create((0, exports.copyPosition)(start), (0, exports.copyPosition)(end)) : undefined; //hint: used as createRange in cds converter package . will remove comments after consumption.
exports.createRangeWithPosition = createRangeWithPosition;
//# sourceMappingURL=range.js.map