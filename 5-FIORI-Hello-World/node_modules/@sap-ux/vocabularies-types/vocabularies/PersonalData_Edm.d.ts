import * as com_sap_vocabularies_PersonalData_v1 from "./PersonalData";
export type EntityContainerAnnotationsBase_PersonalData = {};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_PersonalData}#${string}` ? U : never;
export type EntityContainerAnnotations_PersonalData = EntityContainerAnnotationsBase_PersonalData & {
    [key in `${string & keyof EntityContainerAnnotationsBase_PersonalData}#${string}`]: EntityContainerAnnotationsBase_PersonalData[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_PersonalData = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_PersonalData}#${string}` ? U : never;
export type SchemaAnnotations_PersonalData = SchemaAnnotationsBase_PersonalData & {
    [key in `${string & keyof SchemaAnnotationsBase_PersonalData}#${string}`]: SchemaAnnotationsBase_PersonalData[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_PersonalData = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ReferenceAnnotations_PersonalData = ReferenceAnnotationsBase_PersonalData & {
    [key in `${string & keyof ReferenceAnnotationsBase_PersonalData}#${string}`]: ReferenceAnnotationsBase_PersonalData[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_PersonalData = {};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_PersonalData}#${string}` ? U : never;
export type EntityTypeAnnotations_PersonalData = EntityTypeAnnotationsBase_PersonalData & {
    [key in `${string & keyof EntityTypeAnnotationsBase_PersonalData}#${string}`]: EntityTypeAnnotationsBase_PersonalData[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_PersonalData = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_PersonalData}#${string}` ? U : never;
export type EnumTypeAnnotations_PersonalData = EnumTypeAnnotationsBase_PersonalData & {
    [key in `${string & keyof EnumTypeAnnotationsBase_PersonalData}#${string}`]: EnumTypeAnnotationsBase_PersonalData[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_PersonalData = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ComplexTypeAnnotations_PersonalData = ComplexTypeAnnotationsBase_PersonalData & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_PersonalData}#${string}`]: ComplexTypeAnnotationsBase_PersonalData[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_PersonalData = {
    'FieldSemantics'?: com_sap_vocabularies_PersonalData_v1.FieldSemantics;
    'IsPotentiallyPersonal'?: com_sap_vocabularies_PersonalData_v1.IsPotentiallyPersonal;
    'IsPotentiallySensitive'?: com_sap_vocabularies_PersonalData_v1.IsPotentiallySensitive;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_PersonalData}#${string}` ? U : never;
export type PropertyAnnotations_PersonalData = PropertyAnnotationsBase_PersonalData & {
    [key in `${string & keyof PropertyAnnotationsBase_PersonalData}#${string}`]: PropertyAnnotationsBase_PersonalData[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_PersonalData = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_PersonalData}#${string}` ? U : never;
export type NavigationPropertyAnnotations_PersonalData = NavigationPropertyAnnotationsBase_PersonalData & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_PersonalData}#${string}`]: NavigationPropertyAnnotationsBase_PersonalData[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_PersonalData = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_PersonalData}#${string}` ? U : never;
export type TypeDefinitionAnnotations_PersonalData = TypeDefinitionAnnotationsBase_PersonalData & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_PersonalData}#${string}`]: TypeDefinitionAnnotationsBase_PersonalData[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_PersonalData = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_PersonalData}#${string}` ? U : never;
export type TermAnnotations_PersonalData = TermAnnotationsBase_PersonalData & {
    [key in `${string & keyof TermAnnotationsBase_PersonalData}#${string}`]: TermAnnotationsBase_PersonalData[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_PersonalData = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ParameterAnnotations_PersonalData = ParameterAnnotationsBase_PersonalData & {
    [key in `${string & keyof ParameterAnnotationsBase_PersonalData}#${string}`]: ParameterAnnotationsBase_PersonalData[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_PersonalData = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ReturnTypeAnnotations_PersonalData = ReturnTypeAnnotationsBase_PersonalData & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_PersonalData}#${string}`]: ReturnTypeAnnotationsBase_PersonalData[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_PersonalData = {
    'EntitySemantics'?: com_sap_vocabularies_PersonalData_v1.EntitySemantics;
    'DataSubjectRole'?: com_sap_vocabularies_PersonalData_v1.DataSubjectRole;
    'DataSubjectRoleDescription'?: com_sap_vocabularies_PersonalData_v1.DataSubjectRoleDescription;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_PersonalData}#${string}` ? U : never;
export type EntitySetAnnotations_PersonalData = EntitySetAnnotationsBase_PersonalData & {
    [key in `${string & keyof EntitySetAnnotationsBase_PersonalData}#${string}`]: EntitySetAnnotationsBase_PersonalData[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_PersonalData = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_PersonalData}#${string}` ? U : never;
export type SingletonAnnotations_PersonalData = SingletonAnnotationsBase_PersonalData & {
    [key in `${string & keyof SingletonAnnotationsBase_PersonalData}#${string}`]: SingletonAnnotationsBase_PersonalData[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_PersonalData = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ActionImportAnnotations_PersonalData = ActionImportAnnotationsBase_PersonalData & {
    [key in `${string & keyof ActionImportAnnotationsBase_PersonalData}#${string}`]: ActionImportAnnotationsBase_PersonalData[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_PersonalData = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_PersonalData}#${string}` ? U : never;
export type FunctionImportAnnotations_PersonalData = FunctionImportAnnotationsBase_PersonalData & {
    [key in `${string & keyof FunctionImportAnnotationsBase_PersonalData}#${string}`]: FunctionImportAnnotationsBase_PersonalData[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_PersonalData = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_PersonalData}#${string}` ? U : never;
export type ActionAnnotations_PersonalData = ActionAnnotationsBase_PersonalData & {
    [key in `${string & keyof ActionAnnotationsBase_PersonalData}#${string}`]: ActionAnnotationsBase_PersonalData[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_PersonalData = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_PersonalData}#${string}` ? U : never;
export type FunctionAnnotations_PersonalData = FunctionAnnotationsBase_PersonalData & {
    [key in `${string & keyof FunctionAnnotationsBase_PersonalData}#${string}`]: FunctionAnnotationsBase_PersonalData[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_PersonalData = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_PersonalData}#${string}` ? U : never;
export type IncludeAnnotations_PersonalData = IncludeAnnotationsBase_PersonalData & {
    [key in `${string & keyof IncludeAnnotationsBase_PersonalData}#${string}`]: IncludeAnnotationsBase_PersonalData[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_PersonalData = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_PersonalData}#${string}` ? U : never;
export type AnnotationAnnotations_PersonalData = AnnotationAnnotationsBase_PersonalData & {
    [key in `${string & keyof AnnotationAnnotationsBase_PersonalData}#${string}`]: AnnotationAnnotationsBase_PersonalData[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_PersonalData = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_PersonalData}#${string}` ? U : never;
export type CollectionAnnotations_PersonalData = CollectionAnnotationsBase_PersonalData & {
    [key in `${string & keyof CollectionAnnotationsBase_PersonalData}#${string}`]: CollectionAnnotationsBase_PersonalData[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_PersonalData = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_PersonalData}#${string}` ? U : never;
export type RecordAnnotations_PersonalData = RecordAnnotationsBase_PersonalData & {
    [key in `${string & keyof RecordAnnotationsBase_PersonalData}#${string}`]: RecordAnnotationsBase_PersonalData[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_PersonalData = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_PersonalData}#${string}` ? U : never;
export type PropertyValueAnnotations_PersonalData = PropertyValueAnnotationsBase_PersonalData & {
    [key in `${string & keyof PropertyValueAnnotationsBase_PersonalData}#${string}`]: PropertyValueAnnotationsBase_PersonalData[ExtractPropertyValueAnnotationsType<key>];
};
export {};
