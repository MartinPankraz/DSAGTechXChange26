/// <reference path="../utils/edmx.d.ts" />
import type { RawMetadata } from '@sap-ux/vocabularies-types';
/**
 * Parse an edmx file and return an object structure representing the service definition.
 *
 * @param xml {string} the original XML string
 * @param fileIdentification {string} a way to identify this file
 * @returns the parsed metadata definition
 */
export declare function parse(xml: string, fileIdentification?: string): RawMetadata;
//# sourceMappingURL=parser.d.ts.map