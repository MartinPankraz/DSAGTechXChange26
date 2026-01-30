import type { Manifest, ManifestNamespace, ServiceSpecification } from '../types';
import type { Editor } from 'mem-fs-editor';
/**
 * Get the main service name from the manifest.
 * LROP: by definition the service name can be read from the UI5 model with "" as name.
 * OVP: the main model needs to be read from the sap.ovp config and then the service can be derived.
 *
 * @param manifest - application manifest
 * @returns - main service name
 */
export declare function getMainService(manifest: Manifest): string | undefined;
/**
 * Return the service annotation specification for a specific app.
 *
 * @param manifestPath - path to manifest.json
 * @param manifest - optionally, parsed content of manifest.json, pass to avoid reading it again.
 * @param memFs - optional mem-fs-editor instance
 * @returns - service and annotation specification
 */
export declare function getServicesAndAnnotations(manifestPath: string, manifest: Manifest, memFs?: Editor): Promise<{
    [index: string]: ServiceSpecification;
}>;
/**
 * Filters data sources by type.
 *
 * @param {Record<string, ManifestNamespace.DataSource>} dataSources - Data sources from the manifest.
 * @param {string} type - Data source type to filter by.
 * @returns {Record<string, ManifestNamespace.DataSource>} Data source IDs.
 */
export declare function filterDataSourcesByType(dataSources: Record<string, ManifestNamespace.DataSource>, type: string): Record<string, ManifestNamespace.DataSource>;
//# sourceMappingURL=service.d.ts.map