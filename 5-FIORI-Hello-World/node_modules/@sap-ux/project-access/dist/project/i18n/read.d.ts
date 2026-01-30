import type { I18nBundles, I18nPropertiesPaths, ProjectType } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * For a given app in project, retrieves i18n bundles for 'sap.app' namespace,`models` of `sap.ui5` namespace and service for cap services.
 *
 * @param root project root
 * @param i18nPropertiesPaths paths to `.properties` file`
 * @param projectType optional type of project
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node.
 * In case of CAP project, some CDS APIs are used internally which depends on `fs` of node and not `mem-fs-editor`.
 * When calling this function, adding or removing a CDS file in memory or changing CDS configuration will not be considered until present on real file system.
 * @returns i18n bundles or exception captured in optional errors object
 */
export declare function getI18nBundles(root: string, i18nPropertiesPaths: I18nPropertiesPaths, projectType?: ProjectType, fs?: Editor): Promise<I18nBundles>;
/**
 * Retrieves a list of potential folder names for i18n files.
 *
 * @param root Project root.
 * @returns ii18n folder names
 */
export declare function getCapI18nFolderNames(root: string): Promise<string[]>;
//# sourceMappingURL=read.d.ts.map