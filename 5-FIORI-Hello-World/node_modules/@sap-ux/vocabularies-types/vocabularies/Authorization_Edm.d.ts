import * as Org_OData_Authorization_V1 from "./Authorization";
export type EntityContainerAnnotationsBase_Authorization = {
    'SecuritySchemes'?: Org_OData_Authorization_V1.SecuritySchemes;
    'Authorizations'?: Org_OData_Authorization_V1.Authorizations;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Authorization}#${string}` ? U : never;
export type EntityContainerAnnotations_Authorization = EntityContainerAnnotationsBase_Authorization & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Authorization}#${string}`]: EntityContainerAnnotationsBase_Authorization[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Authorization = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Authorization}#${string}` ? U : never;
export type SchemaAnnotations_Authorization = SchemaAnnotationsBase_Authorization & {
    [key in `${string & keyof SchemaAnnotationsBase_Authorization}#${string}`]: SchemaAnnotationsBase_Authorization[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Authorization = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Authorization}#${string}` ? U : never;
export type ReferenceAnnotations_Authorization = ReferenceAnnotationsBase_Authorization & {
    [key in `${string & keyof ReferenceAnnotationsBase_Authorization}#${string}`]: ReferenceAnnotationsBase_Authorization[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Authorization = {};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Authorization}#${string}` ? U : never;
export type EntityTypeAnnotations_Authorization = EntityTypeAnnotationsBase_Authorization & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Authorization}#${string}`]: EntityTypeAnnotationsBase_Authorization[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Authorization = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Authorization}#${string}` ? U : never;
export type EnumTypeAnnotations_Authorization = EnumTypeAnnotationsBase_Authorization & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Authorization}#${string}`]: EnumTypeAnnotationsBase_Authorization[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Authorization = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Authorization}#${string}` ? U : never;
export type ComplexTypeAnnotations_Authorization = ComplexTypeAnnotationsBase_Authorization & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Authorization}#${string}`]: ComplexTypeAnnotationsBase_Authorization[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Authorization = {};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Authorization}#${string}` ? U : never;
export type PropertyAnnotations_Authorization = PropertyAnnotationsBase_Authorization & {
    [key in `${string & keyof PropertyAnnotationsBase_Authorization}#${string}`]: PropertyAnnotationsBase_Authorization[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Authorization = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Authorization}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Authorization = NavigationPropertyAnnotationsBase_Authorization & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Authorization}#${string}`]: NavigationPropertyAnnotationsBase_Authorization[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Authorization = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Authorization}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Authorization = TypeDefinitionAnnotationsBase_Authorization & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Authorization}#${string}`]: TypeDefinitionAnnotationsBase_Authorization[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Authorization = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Authorization}#${string}` ? U : never;
export type TermAnnotations_Authorization = TermAnnotationsBase_Authorization & {
    [key in `${string & keyof TermAnnotationsBase_Authorization}#${string}`]: TermAnnotationsBase_Authorization[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Authorization = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Authorization}#${string}` ? U : never;
export type ParameterAnnotations_Authorization = ParameterAnnotationsBase_Authorization & {
    [key in `${string & keyof ParameterAnnotationsBase_Authorization}#${string}`]: ParameterAnnotationsBase_Authorization[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Authorization = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Authorization}#${string}` ? U : never;
export type ReturnTypeAnnotations_Authorization = ReturnTypeAnnotationsBase_Authorization & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Authorization}#${string}`]: ReturnTypeAnnotationsBase_Authorization[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Authorization = {};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Authorization}#${string}` ? U : never;
export type EntitySetAnnotations_Authorization = EntitySetAnnotationsBase_Authorization & {
    [key in `${string & keyof EntitySetAnnotationsBase_Authorization}#${string}`]: EntitySetAnnotationsBase_Authorization[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Authorization = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Authorization}#${string}` ? U : never;
export type SingletonAnnotations_Authorization = SingletonAnnotationsBase_Authorization & {
    [key in `${string & keyof SingletonAnnotationsBase_Authorization}#${string}`]: SingletonAnnotationsBase_Authorization[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Authorization = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Authorization}#${string}` ? U : never;
export type ActionImportAnnotations_Authorization = ActionImportAnnotationsBase_Authorization & {
    [key in `${string & keyof ActionImportAnnotationsBase_Authorization}#${string}`]: ActionImportAnnotationsBase_Authorization[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Authorization = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Authorization}#${string}` ? U : never;
export type FunctionImportAnnotations_Authorization = FunctionImportAnnotationsBase_Authorization & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Authorization}#${string}`]: FunctionImportAnnotationsBase_Authorization[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Authorization = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Authorization}#${string}` ? U : never;
export type ActionAnnotations_Authorization = ActionAnnotationsBase_Authorization & {
    [key in `${string & keyof ActionAnnotationsBase_Authorization}#${string}`]: ActionAnnotationsBase_Authorization[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Authorization = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Authorization}#${string}` ? U : never;
export type FunctionAnnotations_Authorization = FunctionAnnotationsBase_Authorization & {
    [key in `${string & keyof FunctionAnnotationsBase_Authorization}#${string}`]: FunctionAnnotationsBase_Authorization[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Authorization = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Authorization}#${string}` ? U : never;
export type IncludeAnnotations_Authorization = IncludeAnnotationsBase_Authorization & {
    [key in `${string & keyof IncludeAnnotationsBase_Authorization}#${string}`]: IncludeAnnotationsBase_Authorization[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Authorization = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Authorization}#${string}` ? U : never;
export type AnnotationAnnotations_Authorization = AnnotationAnnotationsBase_Authorization & {
    [key in `${string & keyof AnnotationAnnotationsBase_Authorization}#${string}`]: AnnotationAnnotationsBase_Authorization[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Authorization = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Authorization}#${string}` ? U : never;
export type CollectionAnnotations_Authorization = CollectionAnnotationsBase_Authorization & {
    [key in `${string & keyof CollectionAnnotationsBase_Authorization}#${string}`]: CollectionAnnotationsBase_Authorization[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Authorization = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Authorization}#${string}` ? U : never;
export type RecordAnnotations_Authorization = RecordAnnotationsBase_Authorization & {
    [key in `${string & keyof RecordAnnotationsBase_Authorization}#${string}`]: RecordAnnotationsBase_Authorization[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Authorization = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Authorization}#${string}` ? U : never;
export type PropertyValueAnnotations_Authorization = PropertyValueAnnotationsBase_Authorization & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Authorization}#${string}`]: PropertyValueAnnotationsBase_Authorization[ExtractPropertyValueAnnotationsType<key>];
};
export {};
