import type { Range } from 'vscode-languageserver-types';
import { Position } from 'vscode-languageserver-types';
/**
 *
 * @param lineOffsets Array of indices with line start offsets.
 * e.g [0] represents a document with one line that starts at offset 0.
 * @param offset
 * @param textLength
 * @returns
 */
export declare function positionAt(lineOffsets: number[], offset: number, textLength: number): Position;
/**
 * Checks if position1 is before position2.
 *
 * @param pos1 position1
 * @param pos2 position2
 * @param includeEqual when positions are equal - if true then result is true, otherwise false
 * @returns boolean result
 */
export declare function isBefore(pos1: Position, pos2: Position, includeEqual?: boolean): boolean;
/**
 * Checks if position is contained in range.
 *
 * @param range range
 * @param position position
 * @returns boolean result
 */
export declare function positionContained(range: Range | undefined, position: Position): range is Range;
/**
 * Checks if position is contained in range (range must be defined).
 *
 * @param range range
 * @param position position
 * @returns boolean result
 */
export declare function positionContainedStrict(range: Range, position: Position): boolean;
/**
 * Check if the second range is within the first.
 *
 * @param a first range
 * @param b second range
 * @returns booelan result
 */
export declare function rangeContained(a: Range, b: Range): boolean;
/**
 * Get indent level based on the start position and tab width.
 *
 * @param startPosition
 * @param tabWidth
 * @returns numeric indent level
 */
export declare function getIndentLevel(startPosition: number, tabWidth: number): number;
/**
 * Indents based on tabs or tab width.
 *
 * @param tabWidth
 * @param useTabs
 * @param level
 * @returns intentation string
 */
export declare function indent(tabWidth: number, useTabs: boolean, level: number): string;
//# sourceMappingURL=position.d.ts.map