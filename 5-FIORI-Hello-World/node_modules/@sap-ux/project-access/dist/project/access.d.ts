import type { ApplicationAccess, ApplicationAccessOptions, ProjectAccess, ProjectAccessOptions } from '../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Create an instance of ApplicationAccess that contains information about the application, like paths and services.
 *
 * @param appRoot - Application root path
 * @param fs optional `mem-fs-editor` instance. If provided, `mem-fs-editor` api is used instead of `fs` of node.
 * In case of CAP project, some CDS APIs are used internally which depends on `fs` of node and not `mem-fs-editor`.
 * When calling this function, adding or removing a CDS file in memory or changing CDS configuration will not be considered until present on real file system.
 * @returns - Instance of ApplicationAccess that contains information about the application, like paths and services
 */
export declare function createApplicationAccess(appRoot: string, fs?: Editor | ApplicationAccessOptions): Promise<ApplicationAccess>;
/**
 * Create an instance of ProjectAccess that contains information about the project, like applications, paths, services.
 *
 * @param root - Project root path
 * @param options - optional options, e.g. logger instance.
 * @returns - Instance of ProjectAccess that contains information about the project
 */
export declare function createProjectAccess(root: string, options?: ProjectAccessOptions): Promise<ProjectAccess>;
//# sourceMappingURL=access.d.ts.map