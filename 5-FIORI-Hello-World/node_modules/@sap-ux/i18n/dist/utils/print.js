"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printPropertiesI18nAnnotation = printPropertiesI18nAnnotation;
exports.printPropertiesI18nEntry = printPropertiesI18nEntry;
const text_1 = require("./text");
/**
 * Creates annotation text in .properties file format
 * If no annotation is not provided, default one is generated based on text.
 *
 * @param text text
 * @param annotation Context information for the text
 * @returns printed i18n annotation
 */
function printPropertiesI18nAnnotation(text, annotation) {
    if (!annotation) {
        const maxLen = (0, text_1.getI18nMaxLength)(text);
        const textType = (0, text_1.getI18nTextType)(maxLen);
        return `${textType},${maxLen}`;
    }
    if (typeof annotation === 'string') {
        const prefix = text.length <= 120 ? 'X' : 'Y';
        return `${prefix}${annotation}`;
    }
    if (typeof annotation === 'object') {
        const { textType, note, maxLength } = annotation;
        const fragments = [textType];
        if (maxLength !== undefined) {
            fragments.push(',', maxLength.toString());
        }
        if (note) {
            fragments.push(':', ' ', note.trim());
        }
        return fragments.join('');
    }
    return '';
}
/**
 * Creates text for i18n entry for `.properties` file format
 * If no annotation is not present, generic default one will be generated based on the text.
 *
 * @param key key
 * @param text text
 * @param annotation Context information for the text
 * @returns printed i18n entries
 */
function printPropertiesI18nEntry(key, text, annotation) {
    const annotationText = printPropertiesI18nAnnotation(text, annotation);
    const comment = `#${annotationText}`;
    const keyValue = `${key}=${text}`;
    return `\n${comment}\n${keyValue}\n`;
}
//# sourceMappingURL=print.js.map