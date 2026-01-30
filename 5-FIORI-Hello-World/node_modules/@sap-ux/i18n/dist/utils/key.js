"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractI18nKey = extractI18nKey;
exports.extractDoubleCurlyBracketsKey = extractDoubleCurlyBracketsKey;
exports.getI18nUniqueKey = getI18nUniqueKey;
/**
 * Extract i18n key.
 *
 * @param input input content
 * @param key i18n key used. Default is `i18n`
 * @returns extracted key
 */
function extractI18nKey(input, key = 'i18n') {
    const sanitizedInput = input.trim();
    const regPattern = new RegExp(`^({@?${key}(>|&gt;))`, 'g');
    return sanitizedInput.replace(regPattern, '').replace(/\}$/gm, '').trim();
}
/**
 * Checks if a string starts with '{{' and ends with '}}'.
 *
 * @param input input string to check.
 * @returns  boolean
 */
function doesDoubleCurlyBracketsExist(input) {
    return input.startsWith('{{') && input.endsWith('}}');
}
/**
 * Extracts double curly brackets key from the given input.
 *
 * @param input string to extract the double curly brackets key from
 * @returns extracted key or undefined if open and closing double curly bracket does not exist
 */
function extractDoubleCurlyBracketsKey(input) {
    const data = input.trim();
    if (!doesDoubleCurlyBracketsExist(data)) {
        return undefined;
    }
    return data.substring(2, data.length - 2).trim();
}
/**
 * Get unique key. If the key is not unique, it increment key by one and recheck.
 *
 * @param key new key and it is incremented
 * @param i18nData I18n entries
 * @param originalKey original key without any index increment
 * @param counter counter for increment
 * @returns unique key
 */
function getI18nUniqueKey(key, i18nData, originalKey = key, counter = 1) {
    const uniqueKey = key;
    let keyExists = false;
    if (Array.isArray(i18nData)) {
        keyExists = i18nData.findIndex((item) => item.key.value === key) !== -1;
    }
    else {
        keyExists = i18nData[key] !== undefined;
    }
    if (keyExists) {
        key = `${originalKey}${counter}`;
        counter++;
        return getI18nUniqueKey(key, i18nData, originalKey, counter);
    }
    return uniqueKey;
}
//# sourceMappingURL=key.js.map