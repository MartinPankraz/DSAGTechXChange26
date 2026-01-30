import type { Editor } from 'mem-fs-editor';
import type { AppProgrammingLanguage, AppType, Manifest, Project, ProjectType } from '../types';
/**
 * Returns the project structure for a given Fiori project.
 *
 * @param root - project root folder
 * @param memFs - optional mem-fs-editor instance
 * @returns - project structure with project info like project type, apps, root folder
 */
export declare function getProject(root: string, memFs?: Editor): Promise<Project>;
/**
 * Get the used programming language of an application.
 *
 * @param appRoot - root folder of the application
 * @param [memFs] - optional mem-fs editor instance
 * @returns - used language, JavaScript or TypeScript
 */
export declare function getAppProgrammingLanguage(appRoot: string, memFs?: Editor): Promise<AppProgrammingLanguage>;
/**
 * Get the type of application or Fiori artifact.
 *
 * @param appRoot - path to application root
 * @param memFs - optional mem-fs-editor instance
 * @returns - type of application, e.g. SAP Fiori elements, SAPUI5 freestyle, SAPUI5 Extension, ... see AppType.
 */
export declare function getAppType(appRoot: string, memFs?: Editor): Promise<AppType | undefined>;
/**
 * Returns the project type for a given Fiori project.
 *
 * @param projectRoot - root path of the project
 * @returns - project type like Edmx, CAPJava, CAPNodejs
 */
export declare function getProjectType(projectRoot: string): Promise<ProjectType>;
/**
 * Returns the minUI5Version, as defined in manifest.
 *
 * @param manifest - manifest object
 * @returns minUI5Version, if present
 */
export declare function getMinUI5VersionFromManifest(manifest: Manifest): string | string[] | undefined;
/**
 * Returns the valid minUI5Version(s) as string[].
 *
 * @param manifest - manifest object
 * @param noValidation - disables the semver validation
 * @returns minUI5Version, as an array of strings
 */
export declare function getMinUI5VersionAsArray(manifest: Manifest, noValidation?: boolean): string[];
/**
 * Returns the minUI5Version in string format (if valid).
 * If it is defined as an array, returns the minimum valid version from it.
 *
 * @param manifest - manifest object
 * @returns the minimum version as string
 */
export declare function getMinimumUI5Version(manifest: Manifest): string | undefined;
//# sourceMappingURL=info.d.ts.map