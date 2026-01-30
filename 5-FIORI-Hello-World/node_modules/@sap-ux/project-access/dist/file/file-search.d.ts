import type { Editor } from 'mem-fs-editor';
/**
 * Find function to search for files by names or file extensions.
 * Empty name and extension option returns all files in the given folder.
 *
 * @param options - find options
 * @param [options.fileNames] - optional array of file names to search for
 * @param [options.extensionNames] - optional array of file extensions to search for
 * @param options.root - folder to start recursive search
 * @param [options.excludeFolders] - optional array of folder names to exclude
 * @param [options.memFs] - optional memfs editor instance
 * @param [options.noTraversal] - optional flag to disable root path traversal
 * @returns - array of paths that contain the file
 * @throws Error[] - list of errors that occurred during the search
 */
export declare function findBy(options: {
    fileNames?: string[];
    extensionNames?: string[];
    root: string;
    excludeFolders?: string[];
    noTraversal?: boolean;
    memFs?: Editor;
}): Promise<string[]>;
/**
 * Search for 'filename' starting from 'root'. Returns array of paths that contain the file.
 *
 * @param filename - filename to search
 * @param root - root folder to start search
 * @param excludeFolders - list of folder names to exclude (search doesn't traverse into these folders)
 * @param [memFs] - optional mem-fs-editor instance
 * @returns - array of paths that contain the filename
 */
export declare function findFiles(filename: string, root: string, excludeFolders: string[], memFs?: Editor): Promise<string[]>;
/**
 * Search for 'filename' starting from 'root'. Returns array of paths that contain the file.
 *
 * @param extension - file extension to search for including '.', e.g. '.ts'
 * @param root - root folder to start search
 * @param excludeFolders - list of folder names to exclude (search doesn't traverse into these folders)
 * @param [memFs] - optional mem-fs-editor instance
 * @param noTraversal - optional flag to disable root path traversal
 * @returns - array of file paths that have the extension
 */
export declare function findFilesByExtension(extension: string, root: string, excludeFolders: string[], memFs?: Editor, noTraversal?: boolean): Promise<string[]>;
/**
 * Find a file by name in parent folders starting from 'startPath'.
 *
 * @param fileName - file name to look for
 * @param startPath - path for start searching up
 * @param fs - optional mem-fs-editor instance
 * @returns - path to file name if found, otherwise undefined
 */
export declare function findFileUp(fileName: string, startPath: string, fs?: Editor): Promise<string | undefined>;
/**
 * @description Returns a flat list of all file paths under a directory tree,
 * recursing through all subdirectories.
 * @param {string} dir - the directory to walk
 * @returns {string[]} - array of file path strings
 * @throws if an error occurs reading a file path
 */
export declare function getFilePaths(dir: string): Promise<string[] | []>;
//# sourceMappingURL=file-search.d.ts.map