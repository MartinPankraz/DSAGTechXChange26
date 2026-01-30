import * as Org_OData_Aggregation_V1 from "./Aggregation";
export type EntityContainerAnnotationsBase_Aggregation = {
    'ApplySupportedDefaults'?: Org_OData_Aggregation_V1.ApplySupportedDefaults;
    'CustomAggregate'?: Org_OData_Aggregation_V1.CustomAggregate;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Aggregation}#${string}` ? U : never;
export type EntityContainerAnnotations_Aggregation = EntityContainerAnnotationsBase_Aggregation & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Aggregation}#${string}`]: EntityContainerAnnotationsBase_Aggregation[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Aggregation = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Aggregation}#${string}` ? U : never;
export type SchemaAnnotations_Aggregation = SchemaAnnotationsBase_Aggregation & {
    [key in `${string & keyof SchemaAnnotationsBase_Aggregation}#${string}`]: SchemaAnnotationsBase_Aggregation[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Aggregation = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ReferenceAnnotations_Aggregation = ReferenceAnnotationsBase_Aggregation & {
    [key in `${string & keyof ReferenceAnnotationsBase_Aggregation}#${string}`]: ReferenceAnnotationsBase_Aggregation[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Aggregation = {
    'ApplySupported'?: Org_OData_Aggregation_V1.ApplySupported;
    'CustomAggregate'?: Org_OData_Aggregation_V1.CustomAggregate;
    'LeveledHierarchy'?: Org_OData_Aggregation_V1.LeveledHierarchy;
    'RecursiveHierarchy'?: Org_OData_Aggregation_V1.RecursiveHierarchy;
    'UpPath'?: Org_OData_Aggregation_V1.UpPath;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Aggregation}#${string}` ? U : never;
export type EntityTypeAnnotations_Aggregation = EntityTypeAnnotationsBase_Aggregation & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Aggregation}#${string}`]: EntityTypeAnnotationsBase_Aggregation[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Aggregation = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Aggregation}#${string}` ? U : never;
export type EnumTypeAnnotations_Aggregation = EnumTypeAnnotationsBase_Aggregation & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Aggregation}#${string}`]: EnumTypeAnnotationsBase_Aggregation[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Aggregation = {
    'LeveledHierarchy'?: Org_OData_Aggregation_V1.LeveledHierarchy;
};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ComplexTypeAnnotations_Aggregation = ComplexTypeAnnotationsBase_Aggregation & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Aggregation}#${string}`]: ComplexTypeAnnotationsBase_Aggregation[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Aggregation = {
    'Groupable'?: Org_OData_Aggregation_V1.Groupable;
    'Aggregatable'?: Org_OData_Aggregation_V1.Aggregatable;
    'ContextDefiningProperties'?: Org_OData_Aggregation_V1.ContextDefiningProperties;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Aggregation}#${string}` ? U : never;
export type PropertyAnnotations_Aggregation = PropertyAnnotationsBase_Aggregation & {
    [key in `${string & keyof PropertyAnnotationsBase_Aggregation}#${string}`]: PropertyAnnotationsBase_Aggregation[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Aggregation = {
    'Groupable'?: Org_OData_Aggregation_V1.Groupable;
    'Aggregatable'?: Org_OData_Aggregation_V1.Aggregatable;
};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Aggregation}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Aggregation = NavigationPropertyAnnotationsBase_Aggregation & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Aggregation}#${string}`]: NavigationPropertyAnnotationsBase_Aggregation[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Aggregation = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Aggregation}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Aggregation = TypeDefinitionAnnotationsBase_Aggregation & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Aggregation}#${string}`]: TypeDefinitionAnnotationsBase_Aggregation[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Aggregation = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Aggregation}#${string}` ? U : never;
export type TermAnnotations_Aggregation = TermAnnotationsBase_Aggregation & {
    [key in `${string & keyof TermAnnotationsBase_Aggregation}#${string}`]: TermAnnotationsBase_Aggregation[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Aggregation = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ParameterAnnotations_Aggregation = ParameterAnnotationsBase_Aggregation & {
    [key in `${string & keyof ParameterAnnotationsBase_Aggregation}#${string}`]: ParameterAnnotationsBase_Aggregation[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Aggregation = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ReturnTypeAnnotations_Aggregation = ReturnTypeAnnotationsBase_Aggregation & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Aggregation}#${string}`]: ReturnTypeAnnotationsBase_Aggregation[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Aggregation = {
    'ApplySupported'?: Org_OData_Aggregation_V1.ApplySupported;
    'CustomAggregate'?: Org_OData_Aggregation_V1.CustomAggregate;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Aggregation}#${string}` ? U : never;
export type EntitySetAnnotations_Aggregation = EntitySetAnnotationsBase_Aggregation & {
    [key in `${string & keyof EntitySetAnnotationsBase_Aggregation}#${string}`]: EntitySetAnnotationsBase_Aggregation[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Aggregation = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Aggregation}#${string}` ? U : never;
export type SingletonAnnotations_Aggregation = SingletonAnnotationsBase_Aggregation & {
    [key in `${string & keyof SingletonAnnotationsBase_Aggregation}#${string}`]: SingletonAnnotationsBase_Aggregation[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Aggregation = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ActionImportAnnotations_Aggregation = ActionImportAnnotationsBase_Aggregation & {
    [key in `${string & keyof ActionImportAnnotationsBase_Aggregation}#${string}`]: ActionImportAnnotationsBase_Aggregation[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Aggregation = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Aggregation}#${string}` ? U : never;
export type FunctionImportAnnotations_Aggregation = FunctionImportAnnotationsBase_Aggregation & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Aggregation}#${string}`]: FunctionImportAnnotationsBase_Aggregation[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Aggregation = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Aggregation}#${string}` ? U : never;
export type ActionAnnotations_Aggregation = ActionAnnotationsBase_Aggregation & {
    [key in `${string & keyof ActionAnnotationsBase_Aggregation}#${string}`]: ActionAnnotationsBase_Aggregation[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Aggregation = {
    'AvailableOnAggregates'?: Org_OData_Aggregation_V1.AvailableOnAggregates;
};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Aggregation}#${string}` ? U : never;
export type FunctionAnnotations_Aggregation = FunctionAnnotationsBase_Aggregation & {
    [key in `${string & keyof FunctionAnnotationsBase_Aggregation}#${string}`]: FunctionAnnotationsBase_Aggregation[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Aggregation = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Aggregation}#${string}` ? U : never;
export type IncludeAnnotations_Aggregation = IncludeAnnotationsBase_Aggregation & {
    [key in `${string & keyof IncludeAnnotationsBase_Aggregation}#${string}`]: IncludeAnnotationsBase_Aggregation[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Aggregation = {
    'ContextDefiningProperties'?: Org_OData_Aggregation_V1.ContextDefiningProperties;
};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Aggregation}#${string}` ? U : never;
export type AnnotationAnnotations_Aggregation = AnnotationAnnotationsBase_Aggregation & {
    [key in `${string & keyof AnnotationAnnotationsBase_Aggregation}#${string}`]: AnnotationAnnotationsBase_Aggregation[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Aggregation = {
    'ApplySupported'?: Org_OData_Aggregation_V1.ApplySupported;
    'CustomAggregate'?: Org_OData_Aggregation_V1.CustomAggregate;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Aggregation}#${string}` ? U : never;
export type CollectionAnnotations_Aggregation = CollectionAnnotationsBase_Aggregation & {
    [key in `${string & keyof CollectionAnnotationsBase_Aggregation}#${string}`]: CollectionAnnotationsBase_Aggregation[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Aggregation = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Aggregation}#${string}` ? U : never;
export type RecordAnnotations_Aggregation = RecordAnnotationsBase_Aggregation & {
    [key in `${string & keyof RecordAnnotationsBase_Aggregation}#${string}`]: RecordAnnotationsBase_Aggregation[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Aggregation = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Aggregation}#${string}` ? U : never;
export type PropertyValueAnnotations_Aggregation = PropertyValueAnnotationsBase_Aggregation & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Aggregation}#${string}`]: PropertyValueAnnotationsBase_Aggregation[ExtractPropertyValueAnnotationsType<key>];
};
export {};
