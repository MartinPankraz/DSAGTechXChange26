import type { CdsEnvironment } from '../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Returns the location of an existing `_i18n` folder next to or in the
 * folder hierarchy above the given path, if any.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePath CDS source file path
 * @returns i18n folder or undefined
 */
export declare function resolveCapI18nFolderForFile(root: string, env: CdsEnvironment, filePath: string): string | undefined;
/**
 * Merges i18n files for CDS source files.
 *
 * @param root project root
 * @param env CDS environment configuration
 * @param filePaths CDS file path
 * @returns i18n files
 */
export declare function getCapI18nFiles(root: string, env: CdsEnvironment, filePaths: string[]): string[];
/**
 * Get an i18n folder for an existing CDS file. A new folder is only created, if it does not exist and optional `mem-fs-editor` instance is not provided.
 *
 * @param root project root
 * @param path absolute path to cds file
 * @param env CDS environment configuration,
 * @param fs optional `mem-fs-editor` instance. If provided, a new folder is not created, even if it does not exist
 * @returns i18n folder path
 */
export declare function getCapI18nFolder(root: string, path: string, env: CdsEnvironment, fs?: Editor): Promise<string>;
//# sourceMappingURL=resolve.d.ts.map