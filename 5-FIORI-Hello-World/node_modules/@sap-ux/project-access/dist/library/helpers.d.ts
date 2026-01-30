import { type LibraryResults, type Manifest, type ReuseLib, type LibraryXml } from '../types';
/**
 * Returns an array of the reuse libraries found in the folders.
 *
 * @param libs - array of libraries found in the workspace folders.
 * @returns list of reuse library
 */
export declare const getReuseLibs: (libs?: LibraryResults[]) => Promise<ReuseLib[]>;
/**
 * Checks for missing dependencies in the selected reuse libraries.
 *
 * @param answers - reuse libraries selected by the user
 * @param reuseLibs - all available reuse libraries
 * @returns a string with the missing dependencies
 */
export declare function checkDependencies(answers: ReuseLib[], reuseLibs: ReuseLib[]): string;
/**
 * Returns the library description.
 *
 * @param library - library object
 * @param libraryPath - library path
 * @returns library description
 */
export declare function getLibraryDesc(library: LibraryXml, libraryPath: string): Promise<string>;
/**
 * Returns the library dependencies.
 *
 * @param library - library object
 * @returns array of dependencies
 */
export declare function getLibraryDependencies(library: LibraryXml): string[];
/**
 * Returns the manifest description.
 *
 * @param manifest - manifest object
 * @param manifestPath - manifestPath path
 * @returns manifest description
 */
export declare function getManifestDesc(manifest: Manifest, manifestPath: string): Promise<string>;
/**
 * Returns the manifest dependencies.
 *
 * @param manifest - manifest object
 * @returns array of dependencies
 */
export declare function getManifestDependencies(manifest: Manifest): string[];
//# sourceMappingURL=helpers.d.ts.map