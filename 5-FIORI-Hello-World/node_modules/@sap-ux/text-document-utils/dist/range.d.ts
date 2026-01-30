import { Position, Range } from 'vscode-languageserver-types';
/**
 * Create range.
 *
 * @param lineOffsets line offset
 * @param start start point
 * @param end end point
 * @param textLength text length
 * @returns range
 */
export declare function rangeAt(lineOffsets: number[], start: number, end: number, textLength: number): Range;
/**
 * Checks if given positions are equal.
 *
 * @param a Position 1
 * @param b Position 2
 * @returns True if positions are equal
 */
export declare function arePositionsEqual(a: Position, b: Position): boolean;
/**
 * Checks if given ranges are equal.
 *
 * @param a Range 1
 * @param b Range 2
 * @returns True if ranges are equal
 */
export declare function areRangesEqual(a: Range, b: Range): boolean;
export declare const copyPosition: (position: Position) => Position;
export declare const copyRange: (range: Range) => Range;
/**
 * Cretaes range by given coordinates.
 *
 * @param line1
 * @param character1
 * @param line2
 * @param character2
 * @returns range object
 */
export declare function createRange(line1: number, character1: number, line2: number, character2: number): Range;
export declare const createRangeWithPosition: (start: Position | undefined, end: Position | undefined) => Range | undefined;
//# sourceMappingURL=range.d.ts.map