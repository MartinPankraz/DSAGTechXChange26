import * as com_sap_vocabularies_Session_v1 from "./Session";
export type EntityContainerAnnotationsBase_Session = {};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Session}#${string}` ? U : never;
export type EntityContainerAnnotations_Session = EntityContainerAnnotationsBase_Session & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Session}#${string}`]: EntityContainerAnnotationsBase_Session[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Session = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Session}#${string}` ? U : never;
export type SchemaAnnotations_Session = SchemaAnnotationsBase_Session & {
    [key in `${string & keyof SchemaAnnotationsBase_Session}#${string}`]: SchemaAnnotationsBase_Session[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Session = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Session}#${string}` ? U : never;
export type ReferenceAnnotations_Session = ReferenceAnnotationsBase_Session & {
    [key in `${string & keyof ReferenceAnnotationsBase_Session}#${string}`]: ReferenceAnnotationsBase_Session[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Session = {};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Session}#${string}` ? U : never;
export type EntityTypeAnnotations_Session = EntityTypeAnnotationsBase_Session & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Session}#${string}`]: EntityTypeAnnotationsBase_Session[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Session = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Session}#${string}` ? U : never;
export type EnumTypeAnnotations_Session = EnumTypeAnnotationsBase_Session & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Session}#${string}`]: EnumTypeAnnotationsBase_Session[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Session = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Session}#${string}` ? U : never;
export type ComplexTypeAnnotations_Session = ComplexTypeAnnotationsBase_Session & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Session}#${string}`]: ComplexTypeAnnotationsBase_Session[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Session = {};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Session}#${string}` ? U : never;
export type PropertyAnnotations_Session = PropertyAnnotationsBase_Session & {
    [key in `${string & keyof PropertyAnnotationsBase_Session}#${string}`]: PropertyAnnotationsBase_Session[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Session = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Session}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Session = NavigationPropertyAnnotationsBase_Session & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Session}#${string}`]: NavigationPropertyAnnotationsBase_Session[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Session = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Session}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Session = TypeDefinitionAnnotationsBase_Session & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Session}#${string}`]: TypeDefinitionAnnotationsBase_Session[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Session = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Session}#${string}` ? U : never;
export type TermAnnotations_Session = TermAnnotationsBase_Session & {
    [key in `${string & keyof TermAnnotationsBase_Session}#${string}`]: TermAnnotationsBase_Session[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Session = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Session}#${string}` ? U : never;
export type ParameterAnnotations_Session = ParameterAnnotationsBase_Session & {
    [key in `${string & keyof ParameterAnnotationsBase_Session}#${string}`]: ParameterAnnotationsBase_Session[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Session = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Session}#${string}` ? U : never;
export type ReturnTypeAnnotations_Session = ReturnTypeAnnotationsBase_Session & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Session}#${string}`]: ReturnTypeAnnotationsBase_Session[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Session = {
    'StickySessionSupported'?: com_sap_vocabularies_Session_v1.StickySessionSupported;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Session}#${string}` ? U : never;
export type EntitySetAnnotations_Session = EntitySetAnnotationsBase_Session & {
    [key in `${string & keyof EntitySetAnnotationsBase_Session}#${string}`]: EntitySetAnnotationsBase_Session[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Session = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Session}#${string}` ? U : never;
export type SingletonAnnotations_Session = SingletonAnnotationsBase_Session & {
    [key in `${string & keyof SingletonAnnotationsBase_Session}#${string}`]: SingletonAnnotationsBase_Session[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Session = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Session}#${string}` ? U : never;
export type ActionImportAnnotations_Session = ActionImportAnnotationsBase_Session & {
    [key in `${string & keyof ActionImportAnnotationsBase_Session}#${string}`]: ActionImportAnnotationsBase_Session[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Session = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Session}#${string}` ? U : never;
export type FunctionImportAnnotations_Session = FunctionImportAnnotationsBase_Session & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Session}#${string}`]: FunctionImportAnnotationsBase_Session[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Session = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Session}#${string}` ? U : never;
export type ActionAnnotations_Session = ActionAnnotationsBase_Session & {
    [key in `${string & keyof ActionAnnotationsBase_Session}#${string}`]: ActionAnnotationsBase_Session[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Session = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Session}#${string}` ? U : never;
export type FunctionAnnotations_Session = FunctionAnnotationsBase_Session & {
    [key in `${string & keyof FunctionAnnotationsBase_Session}#${string}`]: FunctionAnnotationsBase_Session[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Session = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Session}#${string}` ? U : never;
export type IncludeAnnotations_Session = IncludeAnnotationsBase_Session & {
    [key in `${string & keyof IncludeAnnotationsBase_Session}#${string}`]: IncludeAnnotationsBase_Session[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Session = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Session}#${string}` ? U : never;
export type AnnotationAnnotations_Session = AnnotationAnnotationsBase_Session & {
    [key in `${string & keyof AnnotationAnnotationsBase_Session}#${string}`]: AnnotationAnnotationsBase_Session[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Session = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Session}#${string}` ? U : never;
export type CollectionAnnotations_Session = CollectionAnnotationsBase_Session & {
    [key in `${string & keyof CollectionAnnotationsBase_Session}#${string}`]: CollectionAnnotationsBase_Session[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Session = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Session}#${string}` ? U : never;
export type RecordAnnotations_Session = RecordAnnotationsBase_Session & {
    [key in `${string & keyof RecordAnnotationsBase_Session}#${string}`]: RecordAnnotationsBase_Session[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Session = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Session}#${string}` ? U : never;
export type PropertyValueAnnotations_Session = PropertyValueAnnotationsBase_Session & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Session}#${string}`]: PropertyValueAnnotationsBase_Session[ExtractPropertyValueAnnotationsType<key>];
};
export {};
