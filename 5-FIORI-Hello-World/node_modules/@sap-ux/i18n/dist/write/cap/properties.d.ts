import type { CdsEnvironment, NewI18nEntry } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Add i18n entries to respective i18n file.
 *
 * @description It first tries to add to an existing `.properties` file, it it does not exist, it tries to add to `.csv` file,
 * if it fails, it generates new `.properties` file with new i18n entries.
 * @param env cds environment
 * @param path file path
 * @param newI18nEntries new i18n entries that will be maintained
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns boolean
 */
export declare function tryAddPropertiesTexts(env: CdsEnvironment, path: string, newI18nEntries: NewI18nEntry[], fs?: Editor): Promise<boolean>;
//# sourceMappingURL=properties.d.ts.map