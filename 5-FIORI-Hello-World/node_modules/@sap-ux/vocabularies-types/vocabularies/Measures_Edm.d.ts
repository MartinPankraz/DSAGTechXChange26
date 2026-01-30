import * as Org_OData_Measures_V1 from "./Measures";
export type EntityContainerAnnotationsBase_Measures = {};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Measures}#${string}` ? U : never;
export type EntityContainerAnnotations_Measures = EntityContainerAnnotationsBase_Measures & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Measures}#${string}`]: EntityContainerAnnotationsBase_Measures[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Measures = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Measures}#${string}` ? U : never;
export type SchemaAnnotations_Measures = SchemaAnnotationsBase_Measures & {
    [key in `${string & keyof SchemaAnnotationsBase_Measures}#${string}`]: SchemaAnnotationsBase_Measures[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Measures = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Measures}#${string}` ? U : never;
export type ReferenceAnnotations_Measures = ReferenceAnnotationsBase_Measures & {
    [key in `${string & keyof ReferenceAnnotationsBase_Measures}#${string}`]: ReferenceAnnotationsBase_Measures[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Measures = {};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Measures}#${string}` ? U : never;
export type EntityTypeAnnotations_Measures = EntityTypeAnnotationsBase_Measures & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Measures}#${string}`]: EntityTypeAnnotationsBase_Measures[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Measures = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Measures}#${string}` ? U : never;
export type EnumTypeAnnotations_Measures = EnumTypeAnnotationsBase_Measures & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Measures}#${string}`]: EnumTypeAnnotationsBase_Measures[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Measures = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Measures}#${string}` ? U : never;
export type ComplexTypeAnnotations_Measures = ComplexTypeAnnotationsBase_Measures & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Measures}#${string}`]: ComplexTypeAnnotationsBase_Measures[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Measures = {
    'ISOCurrency'?: Org_OData_Measures_V1.ISOCurrency;
    'Scale'?: Org_OData_Measures_V1.Scale;
    'Unit'?: Org_OData_Measures_V1.Unit;
    'UNECEUnit'?: Org_OData_Measures_V1.UNECEUnit;
    'DurationGranularity'?: Org_OData_Measures_V1.DurationGranularity;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Measures}#${string}` ? U : never;
export type PropertyAnnotations_Measures = PropertyAnnotationsBase_Measures & {
    [key in `${string & keyof PropertyAnnotationsBase_Measures}#${string}`]: PropertyAnnotationsBase_Measures[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Measures = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Measures}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Measures = NavigationPropertyAnnotationsBase_Measures & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Measures}#${string}`]: NavigationPropertyAnnotationsBase_Measures[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Measures = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Measures}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Measures = TypeDefinitionAnnotationsBase_Measures & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Measures}#${string}`]: TypeDefinitionAnnotationsBase_Measures[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Measures = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Measures}#${string}` ? U : never;
export type TermAnnotations_Measures = TermAnnotationsBase_Measures & {
    [key in `${string & keyof TermAnnotationsBase_Measures}#${string}`]: TermAnnotationsBase_Measures[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Measures = {
    'ISOCurrency'?: Org_OData_Measures_V1.ISOCurrency;
    'Scale'?: Org_OData_Measures_V1.Scale;
    'Unit'?: Org_OData_Measures_V1.Unit;
    'UNECEUnit'?: Org_OData_Measures_V1.UNECEUnit;
    'DurationGranularity'?: Org_OData_Measures_V1.DurationGranularity;
};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Measures}#${string}` ? U : never;
export type ParameterAnnotations_Measures = ParameterAnnotationsBase_Measures & {
    [key in `${string & keyof ParameterAnnotationsBase_Measures}#${string}`]: ParameterAnnotationsBase_Measures[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Measures = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Measures}#${string}` ? U : never;
export type ReturnTypeAnnotations_Measures = ReturnTypeAnnotationsBase_Measures & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Measures}#${string}`]: ReturnTypeAnnotationsBase_Measures[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Measures = {};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Measures}#${string}` ? U : never;
export type EntitySetAnnotations_Measures = EntitySetAnnotationsBase_Measures & {
    [key in `${string & keyof EntitySetAnnotationsBase_Measures}#${string}`]: EntitySetAnnotationsBase_Measures[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Measures = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Measures}#${string}` ? U : never;
export type SingletonAnnotations_Measures = SingletonAnnotationsBase_Measures & {
    [key in `${string & keyof SingletonAnnotationsBase_Measures}#${string}`]: SingletonAnnotationsBase_Measures[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Measures = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Measures}#${string}` ? U : never;
export type ActionImportAnnotations_Measures = ActionImportAnnotationsBase_Measures & {
    [key in `${string & keyof ActionImportAnnotationsBase_Measures}#${string}`]: ActionImportAnnotationsBase_Measures[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Measures = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Measures}#${string}` ? U : never;
export type FunctionImportAnnotations_Measures = FunctionImportAnnotationsBase_Measures & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Measures}#${string}`]: FunctionImportAnnotationsBase_Measures[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Measures = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Measures}#${string}` ? U : never;
export type ActionAnnotations_Measures = ActionAnnotationsBase_Measures & {
    [key in `${string & keyof ActionAnnotationsBase_Measures}#${string}`]: ActionAnnotationsBase_Measures[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Measures = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Measures}#${string}` ? U : never;
export type FunctionAnnotations_Measures = FunctionAnnotationsBase_Measures & {
    [key in `${string & keyof FunctionAnnotationsBase_Measures}#${string}`]: FunctionAnnotationsBase_Measures[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Measures = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Measures}#${string}` ? U : never;
export type IncludeAnnotations_Measures = IncludeAnnotationsBase_Measures & {
    [key in `${string & keyof IncludeAnnotationsBase_Measures}#${string}`]: IncludeAnnotationsBase_Measures[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Measures = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Measures}#${string}` ? U : never;
export type AnnotationAnnotations_Measures = AnnotationAnnotationsBase_Measures & {
    [key in `${string & keyof AnnotationAnnotationsBase_Measures}#${string}`]: AnnotationAnnotationsBase_Measures[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Measures = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Measures}#${string}` ? U : never;
export type CollectionAnnotations_Measures = CollectionAnnotationsBase_Measures & {
    [key in `${string & keyof CollectionAnnotationsBase_Measures}#${string}`]: CollectionAnnotationsBase_Measures[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Measures = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Measures}#${string}` ? U : never;
export type RecordAnnotations_Measures = RecordAnnotationsBase_Measures & {
    [key in `${string & keyof RecordAnnotationsBase_Measures}#${string}`]: RecordAnnotationsBase_Measures[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Measures = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Measures}#${string}` ? U : never;
export type PropertyValueAnnotations_Measures = PropertyValueAnnotationsBase_Measures & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Measures}#${string}`]: PropertyValueAnnotationsBase_Measures[ExtractPropertyValueAnnotationsType<key>];
};
export {};
