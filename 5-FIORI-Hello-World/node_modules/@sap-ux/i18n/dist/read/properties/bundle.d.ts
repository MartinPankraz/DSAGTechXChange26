import type { I18nBundle } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Gets i18n bundle for `.properties` file.
 *
 * @param i18nFilePath absolute path to `i18n.properties` file
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns i18n bundle or exception
 */
export declare function getPropertiesI18nBundle(i18nFilePath: string, fs?: Editor): Promise<I18nBundle>;
//# sourceMappingURL=bundle.d.ts.map