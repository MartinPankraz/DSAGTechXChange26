import * as com_sap_vocabularies_HTML5_v1 from "./HTML5";
export type EntityContainerAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_HTML5}#${string}` ? U : never;
export type EntityContainerAnnotations_HTML5 = EntityContainerAnnotationsBase_HTML5 & {
    [key in `${string & keyof EntityContainerAnnotationsBase_HTML5}#${string}`]: EntityContainerAnnotationsBase_HTML5[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_HTML5}#${string}` ? U : never;
export type SchemaAnnotations_HTML5 = SchemaAnnotationsBase_HTML5 & {
    [key in `${string & keyof SchemaAnnotationsBase_HTML5}#${string}`]: SchemaAnnotationsBase_HTML5[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_HTML5}#${string}` ? U : never;
export type ReferenceAnnotations_HTML5 = ReferenceAnnotationsBase_HTML5 & {
    [key in `${string & keyof ReferenceAnnotationsBase_HTML5}#${string}`]: ReferenceAnnotationsBase_HTML5[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_HTML5}#${string}` ? U : never;
export type EntityTypeAnnotations_HTML5 = EntityTypeAnnotationsBase_HTML5 & {
    [key in `${string & keyof EntityTypeAnnotationsBase_HTML5}#${string}`]: EntityTypeAnnotationsBase_HTML5[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_HTML5}#${string}` ? U : never;
export type EnumTypeAnnotations_HTML5 = EnumTypeAnnotationsBase_HTML5 & {
    [key in `${string & keyof EnumTypeAnnotationsBase_HTML5}#${string}`]: EnumTypeAnnotationsBase_HTML5[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_HTML5}#${string}` ? U : never;
export type ComplexTypeAnnotations_HTML5 = ComplexTypeAnnotationsBase_HTML5 & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_HTML5}#${string}`]: ComplexTypeAnnotationsBase_HTML5[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_HTML5}#${string}` ? U : never;
export type PropertyAnnotations_HTML5 = PropertyAnnotationsBase_HTML5 & {
    [key in `${string & keyof PropertyAnnotationsBase_HTML5}#${string}`]: PropertyAnnotationsBase_HTML5[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_HTML5}#${string}` ? U : never;
export type NavigationPropertyAnnotations_HTML5 = NavigationPropertyAnnotationsBase_HTML5 & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_HTML5}#${string}`]: NavigationPropertyAnnotationsBase_HTML5[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_HTML5}#${string}` ? U : never;
export type TypeDefinitionAnnotations_HTML5 = TypeDefinitionAnnotationsBase_HTML5 & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_HTML5}#${string}`]: TypeDefinitionAnnotationsBase_HTML5[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_HTML5}#${string}` ? U : never;
export type TermAnnotations_HTML5 = TermAnnotationsBase_HTML5 & {
    [key in `${string & keyof TermAnnotationsBase_HTML5}#${string}`]: TermAnnotationsBase_HTML5[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_HTML5}#${string}` ? U : never;
export type ParameterAnnotations_HTML5 = ParameterAnnotationsBase_HTML5 & {
    [key in `${string & keyof ParameterAnnotationsBase_HTML5}#${string}`]: ParameterAnnotationsBase_HTML5[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_HTML5}#${string}` ? U : never;
export type ReturnTypeAnnotations_HTML5 = ReturnTypeAnnotationsBase_HTML5 & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_HTML5}#${string}`]: ReturnTypeAnnotationsBase_HTML5[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_HTML5}#${string}` ? U : never;
export type EntitySetAnnotations_HTML5 = EntitySetAnnotationsBase_HTML5 & {
    [key in `${string & keyof EntitySetAnnotationsBase_HTML5}#${string}`]: EntitySetAnnotationsBase_HTML5[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_HTML5}#${string}` ? U : never;
export type SingletonAnnotations_HTML5 = SingletonAnnotationsBase_HTML5 & {
    [key in `${string & keyof SingletonAnnotationsBase_HTML5}#${string}`]: SingletonAnnotationsBase_HTML5[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_HTML5}#${string}` ? U : never;
export type ActionImportAnnotations_HTML5 = ActionImportAnnotationsBase_HTML5 & {
    [key in `${string & keyof ActionImportAnnotationsBase_HTML5}#${string}`]: ActionImportAnnotationsBase_HTML5[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_HTML5}#${string}` ? U : never;
export type FunctionImportAnnotations_HTML5 = FunctionImportAnnotationsBase_HTML5 & {
    [key in `${string & keyof FunctionImportAnnotationsBase_HTML5}#${string}`]: FunctionImportAnnotationsBase_HTML5[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_HTML5}#${string}` ? U : never;
export type ActionAnnotations_HTML5 = ActionAnnotationsBase_HTML5 & {
    [key in `${string & keyof ActionAnnotationsBase_HTML5}#${string}`]: ActionAnnotationsBase_HTML5[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_HTML5}#${string}` ? U : never;
export type FunctionAnnotations_HTML5 = FunctionAnnotationsBase_HTML5 & {
    [key in `${string & keyof FunctionAnnotationsBase_HTML5}#${string}`]: FunctionAnnotationsBase_HTML5[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_HTML5}#${string}` ? U : never;
export type IncludeAnnotations_HTML5 = IncludeAnnotationsBase_HTML5 & {
    [key in `${string & keyof IncludeAnnotationsBase_HTML5}#${string}`]: IncludeAnnotationsBase_HTML5[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_HTML5}#${string}` ? U : never;
export type AnnotationAnnotations_HTML5 = AnnotationAnnotationsBase_HTML5 & {
    [key in `${string & keyof AnnotationAnnotationsBase_HTML5}#${string}`]: AnnotationAnnotationsBase_HTML5[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_HTML5}#${string}` ? U : never;
export type CollectionAnnotations_HTML5 = CollectionAnnotationsBase_HTML5 & {
    [key in `${string & keyof CollectionAnnotationsBase_HTML5}#${string}`]: CollectionAnnotationsBase_HTML5[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_HTML5 = {
    'CssDefaults'?: com_sap_vocabularies_HTML5_v1.CssDefaults;
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
    'RowSpanForDuplicateValues'?: com_sap_vocabularies_HTML5_v1.RowSpanForDuplicateValues;
};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_HTML5}#${string}` ? U : never;
export type RecordAnnotations_HTML5 = RecordAnnotationsBase_HTML5 & {
    [key in `${string & keyof RecordAnnotationsBase_HTML5}#${string}`]: RecordAnnotationsBase_HTML5[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_HTML5 = {
    'LinkTarget'?: com_sap_vocabularies_HTML5_v1.LinkTarget;
};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_HTML5}#${string}` ? U : never;
export type PropertyValueAnnotations_HTML5 = PropertyValueAnnotationsBase_HTML5 & {
    [key in `${string & keyof PropertyValueAnnotationsBase_HTML5}#${string}`]: PropertyValueAnnotationsBase_HTML5[ExtractPropertyValueAnnotationsType<key>];
};
export {};
