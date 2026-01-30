import * as com_sap_vocabularies_Analytics_v1 from "./Analytics";
export type EntityContainerAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Analytics}#${string}` ? U : never;
export type EntityContainerAnnotations_Analytics = EntityContainerAnnotationsBase_Analytics & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Analytics}#${string}`]: EntityContainerAnnotationsBase_Analytics[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Analytics}#${string}` ? U : never;
export type SchemaAnnotations_Analytics = SchemaAnnotationsBase_Analytics & {
    [key in `${string & keyof SchemaAnnotationsBase_Analytics}#${string}`]: SchemaAnnotationsBase_Analytics[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Analytics}#${string}` ? U : never;
export type ReferenceAnnotations_Analytics = ReferenceAnnotationsBase_Analytics & {
    [key in `${string & keyof ReferenceAnnotationsBase_Analytics}#${string}`]: ReferenceAnnotationsBase_Analytics[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
    'DrillURL'?: com_sap_vocabularies_Analytics_v1.DrillURL;
    'AggregatedProperties'?: com_sap_vocabularies_Analytics_v1.AggregatedProperties;
    'AggregatedProperty'?: com_sap_vocabularies_Analytics_v1.AggregatedProperty;
    'LevelInformation'?: com_sap_vocabularies_Analytics_v1.LevelInformation;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Analytics}#${string}` ? U : never;
export type EntityTypeAnnotations_Analytics = EntityTypeAnnotationsBase_Analytics & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Analytics}#${string}`]: EntityTypeAnnotationsBase_Analytics[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Analytics}#${string}` ? U : never;
export type EnumTypeAnnotations_Analytics = EnumTypeAnnotationsBase_Analytics & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Analytics}#${string}`]: EnumTypeAnnotationsBase_Analytics[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Analytics}#${string}` ? U : never;
export type ComplexTypeAnnotations_Analytics = ComplexTypeAnnotationsBase_Analytics & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Analytics}#${string}`]: ComplexTypeAnnotationsBase_Analytics[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Analytics = {
    'Dimension'?: com_sap_vocabularies_Analytics_v1.Dimension;
    'Measure'?: com_sap_vocabularies_Analytics_v1.Measure;
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Analytics}#${string}` ? U : never;
export type PropertyAnnotations_Analytics = PropertyAnnotationsBase_Analytics & {
    [key in `${string & keyof PropertyAnnotationsBase_Analytics}#${string}`]: PropertyAnnotationsBase_Analytics[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Analytics}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Analytics = NavigationPropertyAnnotationsBase_Analytics & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Analytics}#${string}`]: NavigationPropertyAnnotationsBase_Analytics[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Analytics}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Analytics = TypeDefinitionAnnotationsBase_Analytics & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Analytics}#${string}`]: TypeDefinitionAnnotationsBase_Analytics[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Analytics}#${string}` ? U : never;
export type TermAnnotations_Analytics = TermAnnotationsBase_Analytics & {
    [key in `${string & keyof TermAnnotationsBase_Analytics}#${string}`]: TermAnnotationsBase_Analytics[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Analytics}#${string}` ? U : never;
export type ParameterAnnotations_Analytics = ParameterAnnotationsBase_Analytics & {
    [key in `${string & keyof ParameterAnnotationsBase_Analytics}#${string}`]: ParameterAnnotationsBase_Analytics[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Analytics}#${string}` ? U : never;
export type ReturnTypeAnnotations_Analytics = ReturnTypeAnnotationsBase_Analytics & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Analytics}#${string}`]: ReturnTypeAnnotationsBase_Analytics[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Analytics}#${string}` ? U : never;
export type EntitySetAnnotations_Analytics = EntitySetAnnotationsBase_Analytics & {
    [key in `${string & keyof EntitySetAnnotationsBase_Analytics}#${string}`]: EntitySetAnnotationsBase_Analytics[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Analytics}#${string}` ? U : never;
export type SingletonAnnotations_Analytics = SingletonAnnotationsBase_Analytics & {
    [key in `${string & keyof SingletonAnnotationsBase_Analytics}#${string}`]: SingletonAnnotationsBase_Analytics[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
    'PlanningAction'?: com_sap_vocabularies_Analytics_v1.PlanningAction;
};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Analytics}#${string}` ? U : never;
export type ActionImportAnnotations_Analytics = ActionImportAnnotationsBase_Analytics & {
    [key in `${string & keyof ActionImportAnnotationsBase_Analytics}#${string}`]: ActionImportAnnotationsBase_Analytics[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Analytics}#${string}` ? U : never;
export type FunctionImportAnnotations_Analytics = FunctionImportAnnotationsBase_Analytics & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Analytics}#${string}`]: FunctionImportAnnotationsBase_Analytics[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Analytics}#${string}` ? U : never;
export type ActionAnnotations_Analytics = ActionAnnotationsBase_Analytics & {
    [key in `${string & keyof ActionAnnotationsBase_Analytics}#${string}`]: ActionAnnotationsBase_Analytics[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Analytics}#${string}` ? U : never;
export type FunctionAnnotations_Analytics = FunctionAnnotationsBase_Analytics & {
    [key in `${string & keyof FunctionAnnotationsBase_Analytics}#${string}`]: FunctionAnnotationsBase_Analytics[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Analytics}#${string}` ? U : never;
export type IncludeAnnotations_Analytics = IncludeAnnotationsBase_Analytics & {
    [key in `${string & keyof IncludeAnnotationsBase_Analytics}#${string}`]: IncludeAnnotationsBase_Analytics[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Analytics}#${string}` ? U : never;
export type AnnotationAnnotations_Analytics = AnnotationAnnotationsBase_Analytics & {
    [key in `${string & keyof AnnotationAnnotationsBase_Analytics}#${string}`]: AnnotationAnnotationsBase_Analytics[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
    'AnalyticalContext'?: com_sap_vocabularies_Analytics_v1.AnalyticalContext;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Analytics}#${string}` ? U : never;
export type CollectionAnnotations_Analytics = CollectionAnnotationsBase_Analytics & {
    [key in `${string & keyof CollectionAnnotationsBase_Analytics}#${string}`]: CollectionAnnotationsBase_Analytics[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Analytics}#${string}` ? U : never;
export type RecordAnnotations_Analytics = RecordAnnotationsBase_Analytics & {
    [key in `${string & keyof RecordAnnotationsBase_Analytics}#${string}`]: RecordAnnotationsBase_Analytics[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Analytics = {
    'AccumulativeMeasure'?: com_sap_vocabularies_Analytics_v1.AccumulativeMeasure;
    'RolledUpPropertyCount'?: com_sap_vocabularies_Analytics_v1.RolledUpPropertyCount;
};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Analytics}#${string}` ? U : never;
export type PropertyValueAnnotations_Analytics = PropertyValueAnnotationsBase_Analytics & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Analytics}#${string}`]: PropertyValueAnnotationsBase_Analytics[ExtractPropertyValueAnnotationsType<key>];
};
export {};
