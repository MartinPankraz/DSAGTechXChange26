import type { I18nBundle, I18nEntry } from './../types';
/**
 * Extract i18n key.
 *
 * @param input input content
 * @param key i18n key used. Default is `i18n`
 * @returns extracted key
 */
export declare function extractI18nKey(input: string, key?: string): string;
/**
 * Extracts double curly brackets key from the given input.
 *
 * @param input string to extract the double curly brackets key from
 * @returns extracted key or undefined if open and closing double curly bracket does not exist
 */
export declare function extractDoubleCurlyBracketsKey(input: string): string | undefined;
/**
 * Get unique key. If the key is not unique, it increment key by one and recheck.
 *
 * @param key new key and it is incremented
 * @param i18nData I18n entries
 * @param originalKey original key without any index increment
 * @param counter counter for increment
 * @returns unique key
 */
export declare function getI18nUniqueKey(key: string, i18nData: I18nEntry[] | I18nBundle, originalKey?: string, counter?: number): string;
//# sourceMappingURL=key.d.ts.map