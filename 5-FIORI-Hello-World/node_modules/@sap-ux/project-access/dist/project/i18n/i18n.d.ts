import type { I18nPropertiesPaths, Manifest } from '../../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Return absolute paths to i18n.properties files from manifest.
 *
 * @param manifestPath - path to manifest.json; used to parse manifest.json if not provided as second argument and to resolve absolute paths
 * @param manifest - optionally, parsed content of manifest.json, pass to avoid reading it again.
 * @param memFs - optional mem-fs-editor instance
 * @returns - absolute paths to i18n.properties
 */
export declare function getI18nPropertiesPaths(manifestPath: string, manifest?: Manifest, memFs?: Editor): Promise<I18nPropertiesPaths>;
/**
 * Return paths to i18n.properties files from manifest,
 * relative to the manifest.json.
 *
 * @param manifest - parsed content of manifest.json
 * @returns - paths to i18n.properties files from sap.app and models
 */
export declare function getRelativeI18nPropertiesPaths(manifest: Manifest): I18nPropertiesPaths;
//# sourceMappingURL=i18n.d.ts.map