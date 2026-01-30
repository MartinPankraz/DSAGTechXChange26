import * as com_sap_vocabularies_Hierarchy_v1 from "./Hierarchy";
export type EntityContainerAnnotationsBase_Hierarchy = {};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type EntityContainerAnnotations_Hierarchy = EntityContainerAnnotationsBase_Hierarchy & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Hierarchy}#${string}`]: EntityContainerAnnotationsBase_Hierarchy[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Hierarchy = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type SchemaAnnotations_Hierarchy = SchemaAnnotationsBase_Hierarchy & {
    [key in `${string & keyof SchemaAnnotationsBase_Hierarchy}#${string}`]: SchemaAnnotationsBase_Hierarchy[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Hierarchy = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ReferenceAnnotations_Hierarchy = ReferenceAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ReferenceAnnotationsBase_Hierarchy}#${string}`]: ReferenceAnnotationsBase_Hierarchy[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Hierarchy = {
    'RecursiveHierarchy'?: com_sap_vocabularies_Hierarchy_v1.RecursiveHierarchy;
    'RecursiveHierarchyActions'?: com_sap_vocabularies_Hierarchy_v1.RecursiveHierarchyActions;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type EntityTypeAnnotations_Hierarchy = EntityTypeAnnotationsBase_Hierarchy & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Hierarchy}#${string}`]: EntityTypeAnnotationsBase_Hierarchy[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Hierarchy = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type EnumTypeAnnotations_Hierarchy = EnumTypeAnnotationsBase_Hierarchy & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Hierarchy}#${string}`]: EnumTypeAnnotationsBase_Hierarchy[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Hierarchy = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ComplexTypeAnnotations_Hierarchy = ComplexTypeAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Hierarchy}#${string}`]: ComplexTypeAnnotationsBase_Hierarchy[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Hierarchy = {};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type PropertyAnnotations_Hierarchy = PropertyAnnotationsBase_Hierarchy & {
    [key in `${string & keyof PropertyAnnotationsBase_Hierarchy}#${string}`]: PropertyAnnotationsBase_Hierarchy[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Hierarchy = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Hierarchy = NavigationPropertyAnnotationsBase_Hierarchy & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Hierarchy}#${string}`]: NavigationPropertyAnnotationsBase_Hierarchy[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Hierarchy = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Hierarchy = TypeDefinitionAnnotationsBase_Hierarchy & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Hierarchy}#${string}`]: TypeDefinitionAnnotationsBase_Hierarchy[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Hierarchy = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type TermAnnotations_Hierarchy = TermAnnotationsBase_Hierarchy & {
    [key in `${string & keyof TermAnnotationsBase_Hierarchy}#${string}`]: TermAnnotationsBase_Hierarchy[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Hierarchy = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ParameterAnnotations_Hierarchy = ParameterAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ParameterAnnotationsBase_Hierarchy}#${string}`]: ParameterAnnotationsBase_Hierarchy[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Hierarchy = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ReturnTypeAnnotations_Hierarchy = ReturnTypeAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Hierarchy}#${string}`]: ReturnTypeAnnotationsBase_Hierarchy[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Hierarchy = {};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type EntitySetAnnotations_Hierarchy = EntitySetAnnotationsBase_Hierarchy & {
    [key in `${string & keyof EntitySetAnnotationsBase_Hierarchy}#${string}`]: EntitySetAnnotationsBase_Hierarchy[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Hierarchy = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type SingletonAnnotations_Hierarchy = SingletonAnnotationsBase_Hierarchy & {
    [key in `${string & keyof SingletonAnnotationsBase_Hierarchy}#${string}`]: SingletonAnnotationsBase_Hierarchy[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Hierarchy = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ActionImportAnnotations_Hierarchy = ActionImportAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ActionImportAnnotationsBase_Hierarchy}#${string}`]: ActionImportAnnotationsBase_Hierarchy[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Hierarchy = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type FunctionImportAnnotations_Hierarchy = FunctionImportAnnotationsBase_Hierarchy & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Hierarchy}#${string}`]: FunctionImportAnnotationsBase_Hierarchy[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Hierarchy = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type ActionAnnotations_Hierarchy = ActionAnnotationsBase_Hierarchy & {
    [key in `${string & keyof ActionAnnotationsBase_Hierarchy}#${string}`]: ActionAnnotationsBase_Hierarchy[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Hierarchy = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type FunctionAnnotations_Hierarchy = FunctionAnnotationsBase_Hierarchy & {
    [key in `${string & keyof FunctionAnnotationsBase_Hierarchy}#${string}`]: FunctionAnnotationsBase_Hierarchy[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Hierarchy = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type IncludeAnnotations_Hierarchy = IncludeAnnotationsBase_Hierarchy & {
    [key in `${string & keyof IncludeAnnotationsBase_Hierarchy}#${string}`]: IncludeAnnotationsBase_Hierarchy[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Hierarchy = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type AnnotationAnnotations_Hierarchy = AnnotationAnnotationsBase_Hierarchy & {
    [key in `${string & keyof AnnotationAnnotationsBase_Hierarchy}#${string}`]: AnnotationAnnotationsBase_Hierarchy[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Hierarchy = {
    'MatchCount'?: com_sap_vocabularies_Hierarchy_v1.MatchCount;
    'RecursiveHierarchySupported'?: com_sap_vocabularies_Hierarchy_v1.RecursiveHierarchySupported;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type CollectionAnnotations_Hierarchy = CollectionAnnotationsBase_Hierarchy & {
    [key in `${string & keyof CollectionAnnotationsBase_Hierarchy}#${string}`]: CollectionAnnotationsBase_Hierarchy[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Hierarchy = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type RecordAnnotations_Hierarchy = RecordAnnotationsBase_Hierarchy & {
    [key in `${string & keyof RecordAnnotationsBase_Hierarchy}#${string}`]: RecordAnnotationsBase_Hierarchy[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Hierarchy = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Hierarchy}#${string}` ? U : never;
export type PropertyValueAnnotations_Hierarchy = PropertyValueAnnotationsBase_Hierarchy & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Hierarchy}#${string}`]: PropertyValueAnnotationsBase_Hierarchy[ExtractPropertyValueAnnotationsType<key>];
};
export {};
