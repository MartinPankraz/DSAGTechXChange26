import type { CdsEnvironment, NewI18nEntry } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Add csv text.
 *
 * @param text csv text
 * @param fallbackLocale fallback local
 * @param newEntries new i18n entries that will be maintained
 * @returns csv text
 */
export declare function addCsvTexts(text: string, fallbackLocale: string, newEntries: NewI18nEntry[]): string;
/**
 * Try add new i18n entries to csv file.
 *
 * @param env cds environment
 * @param path file path
 * @param newI18nEntries new i18n entries that will be maintained
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
export declare function tryAddCsvTexts(env: CdsEnvironment, path: string, newI18nEntries: NewI18nEntry[], fs?: Editor): Promise<boolean>;
//# sourceMappingURL=csv.d.ts.map