import type { Editor } from 'mem-fs-editor';
/**
 * Updates the package.json with a new script.
 *
 * @param basePath - the base path
 * @param scriptName - the script name
 * @param script - the script content
 * @param fs - optional memfs editor instance
 */
export declare function updatePackageScript(basePath: string, scriptName: string, script: string, fs?: Editor): Promise<void>;
/**
 * Check if dev dependencies contains @ui5/cli version greater than 2.
 *
 * @param devDependencies dev dependencies from package.json
 * @returns boolean
 */
export declare function hasUI5CliV3(devDependencies: any): boolean;
//# sourceMappingURL=script.d.ts.map