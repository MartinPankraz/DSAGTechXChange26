"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainService = getMainService;
exports.getServicesAndAnnotations = getServicesAndAnnotations;
exports.filterDataSourcesByType = filterDataSourcesByType;
const node_path_1 = require("node:path");
const file_1 = require("../file");
/**
 * Get the main service name from the manifest.
 * LROP: by definition the service name can be read from the UI5 model with "" as name.
 * OVP: the main model needs to be read from the sap.ovp config and then the service can be derived.
 *
 * @param manifest - application manifest
 * @returns - main service name
 */
function getMainService(manifest) {
    const model = typeof manifest?.['sap.ovp']?.globalFilterModel === 'string' ? manifest['sap.ovp'].globalFilterModel : '';
    return typeof manifest?.['sap.ui5']?.models?.[model]?.dataSource === 'string'
        ? manifest['sap.ui5'].models[model].dataSource
        : undefined;
}
/**
 * Return the service annotation specification for a specific app.
 *
 * @param manifestPath - path to manifest.json
 * @param manifest - optionally, parsed content of manifest.json, pass to avoid reading it again.
 * @param memFs - optional mem-fs-editor instance
 * @returns - service and annotation specification
 */
async function getServicesAndAnnotations(manifestPath, manifest, memFs) {
    const parsedManifest = manifest ?? (await (0, file_1.readJSON)(manifestPath, memFs));
    const manifestFolder = (0, node_path_1.dirname)(manifestPath);
    const services = {};
    const dataSources = parsedManifest?.['sap.app']?.dataSources ?? {};
    for (const name in dataSources) {
        if (dataSources[name].type !== 'OData') {
            continue;
        }
        services[name] = getServiceSpecification(manifestFolder, name, dataSources);
    }
    return services;
}
/**
 * Get the service specification for a given service.
 *
 * @param webappFolder - relative path to webapp folder from project root
 * @param name - name of the service
 * @param dataSources - dataSources from manifest
 * @returns - service specification
 */
function getServiceSpecification(webappFolder, name, dataSources) {
    const dataSource = dataSources[name];
    const uri = dataSource.uri;
    const local = typeof dataSource.settings?.localUri === 'string'
        ? (0, node_path_1.join)(webappFolder, dataSource.settings.localUri)
        : '';
    const odataVersion = dataSource.settings?.odataVersion ?? '2.0';
    const annotations = [];
    const annotationNames = dataSource.settings?.annotations;
    if (Array.isArray(annotationNames)) {
        for (const annotationName of annotationNames) {
            const annotation = dataSources[annotationName];
            if (annotation) {
                annotations.push({
                    uri: annotation.uri,
                    local: annotation.settings?.localUri ? (0, node_path_1.join)(webappFolder, annotation.settings.localUri) : undefined
                });
            }
        }
    }
    return {
        uri,
        local,
        odataVersion,
        annotations
    };
}
/**
 * Filters data sources by type.
 *
 * @param {Record<string, ManifestNamespace.DataSource>} dataSources - Data sources from the manifest.
 * @param {string} type - Data source type to filter by.
 * @returns {Record<string, ManifestNamespace.DataSource>} Data source IDs.
 */
function filterDataSourcesByType(dataSources, type) {
    return Object.fromEntries(Object.entries(dataSources).filter(([, data]) => data.type === type));
}
//# sourceMappingURL=service.js.map