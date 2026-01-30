import type { Editor } from 'mem-fs-editor';
import type { Manifest, Package } from '../types';
/**
 * Read file asynchronously. Throws error if file does not exist.
 *
 * @param path - path to file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as string
 */
export declare function readFile(path: string, memFs?: Editor): Promise<string>;
/**
 * Read JSON file asynchronously. Throws error if file does not exist or is malformatted.
 *
 * @param path - path to JSON file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as object of type T
 */
export declare function readJSON<T>(path: string, memFs?: Editor): Promise<T>;
/**
 * Write file asynchronously. Throws error if file does not exist.
 *
 * @param path - path to file
 * @param content - content to write to a file
 * @param memFs - optional mem-fs-editor instance
 * @returns - file content as string
 */
export declare function writeFile(path: string, content: string, memFs?: Editor): Promise<string | void>;
/**
 * Checks if the provided file exists in the file system.
 *
 * @param path - the file path to check
 * @param memFs - optional mem-fs-editor instance
 * @returns - true if the file exists; false otherwise.
 */
export declare function fileExists(path: string, memFs?: Editor): Promise<boolean>;
/**
 * Updates package.json file asynchronously by keeping the previous indentation.
 *
 * @param path - path to file
 * @param packageJson - updated package.json file content
 * @param memFs - optional mem-fs-editor instance
 */
export declare function updatePackageJSON(path: string, packageJson: Package, memFs?: Editor): Promise<void>;
/**
 * Updates manifest.json file asynchronously by keeping the previous indentation.
 *
 * @param path - path to file
 * @param manifest - updated manifest.json file content
 * @param memFs - optional mem-fs-editor instance
 */
export declare function updateManifestJSON(path: string, manifest: Manifest, memFs?: Editor): Promise<void>;
/**
 * Deletes file asynchronously.
 *
 * @param path - path to file
 * @param memFs - optional mem-fs-editor instance
 * @returns Promise to void.
 */
export declare function deleteFile(path: string, memFs?: Editor): Promise<void>;
/**
 * Read array of files from folder asynchronously.
 *
 * @param path - path to folder
 * @returns Array of the names of the files in the directory.
 */
export declare function readDirectory(path: string): Promise<string[]>;
/**
 * Deletes folder asynchronously.
 *
 * @param path - path to folder
 * @param memFs - optional mem-fs-editor instance
 * @returns Promise to void.
 */
export declare function deleteDirectory(path: string, memFs?: Editor): Promise<void>;
//# sourceMappingURL=file-access.d.ts.map