import type { AnnotationTerm, RawAnnotation, Reference } from '@sap-ux/vocabularies-types';
/**
 * Revert an annotation term to it's generic or raw equivalent.
 *
 * @param references the reference of the current context
 * @param annotation the annotation term to revert
 * @returns the raw annotation
 */
export declare function revertTermToGenericType(references: Reference[], annotation: AnnotationTerm<any>): RawAnnotation;
//# sourceMappingURL=writeback.d.ts.map