"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionAt = positionAt;
exports.isBefore = isBefore;
exports.positionContained = positionContained;
exports.positionContainedStrict = positionContainedStrict;
exports.rangeContained = rangeContained;
exports.getIndentLevel = getIndentLevel;
exports.indent = indent;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
/**
 *
 * @param lineOffsets Array of indices with line start offsets.
 * e.g [0] represents a document with one line that starts at offset 0.
 * @param offset
 * @param textLength
 * @returns
 */
function positionAt(lineOffsets, offset, textLength) {
    const target = Math.max(Math.min(offset, textLength), 0);
    let low = 0;
    let high = lineOffsets.length;
    if (high === 0) {
        return vscode_languageserver_types_1.Position.create(0, target);
    }
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > target) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    const line = low - 1;
    return vscode_languageserver_types_1.Position.create(line, target - lineOffsets[line]);
}
/**
 * Checks if position1 is before position2.
 *
 * @param pos1 position1
 * @param pos2 position2
 * @param includeEqual when positions are equal - if true then result is true, otherwise false
 * @returns boolean result
 */
function isBefore(pos1, pos2, includeEqual = false) {
    if (pos1.line < pos2.line) {
        return true;
    }
    if (pos1.line > pos2.line) {
        return false;
    }
    if (includeEqual) {
        return pos1.character <= pos2.character;
    }
    return pos1.character < pos2.character;
}
/**
 * Checks if position is contained in range.
 *
 * @param range range
 * @param position position
 * @returns boolean result
 */
function positionContained(range, position) {
    return range !== undefined && !isBefore(position, range.start, false) && isBefore(position, range.end, true);
}
/**
 * Checks if position is contained in range (range must be defined).
 *
 * @param range range
 * @param position position
 * @returns boolean result
 */
function positionContainedStrict(range, position) {
    return !isBefore(position, range.start, false) && isBefore(position, range.end, true);
}
/**
 * Check if the second range is within the first.
 *
 * @param a first range
 * @param b second range
 * @returns booelan result
 */
function rangeContained(a, b) {
    return isBefore(a.start, b.start, true) && isBefore(b.end, a.end, true);
}
/**
 * Get indent level based on the start position and tab width.
 *
 * @param startPosition
 * @param tabWidth
 * @returns numeric indent level
 */
function getIndentLevel(startPosition, tabWidth) {
    let level;
    if (startPosition < 0) {
        level = -1;
    }
    else {
        level = startPosition / tabWidth;
    }
    return level;
}
/**
 * Indents based on tabs or tab width.
 *
 * @param tabWidth
 * @param useTabs
 * @param level
 * @returns intentation string
 */
function indent(tabWidth, useTabs, level) {
    if (useTabs) {
        return '\t'.repeat(level);
    }
    else {
        return ' '.repeat(tabWidth * level);
    }
}
//# sourceMappingURL=position.js.map