import type { I18nAnnotation } from '../types';
/**
 * Creates annotation text in .properties file format
 * If no annotation is not provided, default one is generated based on text.
 *
 * @param text text
 * @param annotation Context information for the text
 * @returns printed i18n annotation
 */
export declare function printPropertiesI18nAnnotation(text: string, annotation?: string | I18nAnnotation): string;
/**
 * Creates text for i18n entry for `.properties` file format
 * If no annotation is not present, generic default one will be generated based on the text.
 *
 * @param key key
 * @param text text
 * @param annotation Context information for the text
 * @returns printed i18n entries
 */
export declare function printPropertiesI18nEntry(key: string, text: string, annotation?: string | I18nAnnotation): string;
//# sourceMappingURL=print.d.ts.map