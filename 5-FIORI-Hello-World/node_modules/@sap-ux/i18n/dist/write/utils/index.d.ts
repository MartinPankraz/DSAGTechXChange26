import type { NewI18nEntry } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Write i18n entries to an existing i18n.properties file.
 * If keys to remove are provided, they will be removed from the file before writing new entries.
 *
 * @param i18nFilePath i18n file path
 * @param newI18nEntries  new i18n entries that will be maintained
 * @param keysToRemove - Array of keys to remove from the file.
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
export declare function writeToExistingI18nPropertiesFile(i18nFilePath: string, newI18nEntries: NewI18nEntry[], keysToRemove?: string[], fs?: Editor): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map