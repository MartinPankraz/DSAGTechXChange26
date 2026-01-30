import type { CdsEnvironment, I18nBundle } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Merges i18n files in to a single bundle for CDS source files.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePaths CDS file path
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node
 * @returns i18n bundle or exception
 */
export declare function getCapI18nBundle(root: string, env: CdsEnvironment, filePaths: string[], fs?: Editor): Promise<I18nBundle>;
//# sourceMappingURL=bundle.d.ts.map