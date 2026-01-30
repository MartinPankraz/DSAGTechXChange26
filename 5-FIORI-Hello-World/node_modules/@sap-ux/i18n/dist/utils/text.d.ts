import type { SapTextType } from '../types';
/**
 * Get the calculated maximum text length for an i18n property value.
 *
 * @param value - Value of the i18n property
 * @returns max length for a given value
 * @description The algorithm considers the current UI5 specification.
 */
export declare function getI18nMaxLength(value: string): number;
/**
 * Get a suitable textType for an i18n property.
 *
 * @param maxLength - Maximum text length of the i18n property value
 * @returns returns text type
 * @description The textType is derived from the maximum text length maxLength of the property value.
 */
export declare function getI18nTextType(maxLength: number): SapTextType;
/**
 * Discover line ending.
 *
 * @param text text
 * @returns text
 */
export declare function discoverLineEnding(text: string): string;
/**
 * Discover indent.
 *
 * @param text text
 * @returns indented text
 */
export declare function discoverIndent(text: string): string;
/**
 * Apply indent.
 *
 * @param text text
 * @param indent indent
 * @param eol end of line
 * @param indentFirstLine indent first line
 * @returns indented text
 */
export declare function applyIndent(text: string, indent: string, eol: string, indentFirstLine?: boolean): string;
/**
 * Convert to camel case. It gets text like 'product details info' and convert it to 'productDetailsInfo'.
 *
 * @param text text
 * @param maxWord maximal word
 * @returns camel case text
 */
export declare function convertToCamelCase(text?: string, maxWord?: number): string;
/**
 * Convert to pascal case. It gets text like 'product details info' and convert it to 'ProductDetailsInfo'.
 *
 * @param text text
 * @param maxWord maximal word
 * @returns pascal case text
 */
export declare function convertToPascalCase(text: string, maxWord?: number): string;
//# sourceMappingURL=text.d.ts.map