import type { CdsEnvironment } from '../types';
/**
 * Get json path.
 *
 * @param path file path
 * @returns .json file path
 */
export declare function jsonPath(path: string): string;
/**
 * Get properties path.
 *
 * @param path file path
 * @param env cds environment
 * @returns .properties file path
 */
export declare function capPropertiesPath(path: string, env: CdsEnvironment): string;
/**
 * Get csv path.
 *
 * @param path file path
 * @returns .csv file path
 */
export declare function csvPath(path: string): string;
/**
 * Check if a folder of a file exists.
 *
 * @param path an absolute path to a folder or a file
 * @returns boolean
 */
export declare function doesExist(path: string): Promise<boolean>;
//# sourceMappingURL=path.d.ts.map