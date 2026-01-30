import * as com_sap_vocabularies_CodeList_v1 from "./CodeList";
export type EntityContainerAnnotationsBase_CodeList = {
    'CurrencyCodes'?: com_sap_vocabularies_CodeList_v1.CurrencyCodes;
    'UnitsOfMeasure'?: com_sap_vocabularies_CodeList_v1.UnitsOfMeasure;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_CodeList}#${string}` ? U : never;
export type EntityContainerAnnotations_CodeList = EntityContainerAnnotationsBase_CodeList & {
    [key in `${string & keyof EntityContainerAnnotationsBase_CodeList}#${string}`]: EntityContainerAnnotationsBase_CodeList[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_CodeList = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_CodeList}#${string}` ? U : never;
export type SchemaAnnotations_CodeList = SchemaAnnotationsBase_CodeList & {
    [key in `${string & keyof SchemaAnnotationsBase_CodeList}#${string}`]: SchemaAnnotationsBase_CodeList[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_CodeList = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_CodeList}#${string}` ? U : never;
export type ReferenceAnnotations_CodeList = ReferenceAnnotationsBase_CodeList & {
    [key in `${string & keyof ReferenceAnnotationsBase_CodeList}#${string}`]: ReferenceAnnotationsBase_CodeList[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_CodeList = {};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_CodeList}#${string}` ? U : never;
export type EntityTypeAnnotations_CodeList = EntityTypeAnnotationsBase_CodeList & {
    [key in `${string & keyof EntityTypeAnnotationsBase_CodeList}#${string}`]: EntityTypeAnnotationsBase_CodeList[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_CodeList = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_CodeList}#${string}` ? U : never;
export type EnumTypeAnnotations_CodeList = EnumTypeAnnotationsBase_CodeList & {
    [key in `${string & keyof EnumTypeAnnotationsBase_CodeList}#${string}`]: EnumTypeAnnotationsBase_CodeList[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_CodeList = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_CodeList}#${string}` ? U : never;
export type ComplexTypeAnnotations_CodeList = ComplexTypeAnnotationsBase_CodeList & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_CodeList}#${string}`]: ComplexTypeAnnotationsBase_CodeList[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_CodeList = {
    'StandardCode'?: com_sap_vocabularies_CodeList_v1.StandardCode;
    'ExternalCode'?: com_sap_vocabularies_CodeList_v1.ExternalCode;
    'IsConfigurationDeprecationCode'?: com_sap_vocabularies_CodeList_v1.IsConfigurationDeprecationCode;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_CodeList}#${string}` ? U : never;
export type PropertyAnnotations_CodeList = PropertyAnnotationsBase_CodeList & {
    [key in `${string & keyof PropertyAnnotationsBase_CodeList}#${string}`]: PropertyAnnotationsBase_CodeList[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_CodeList = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_CodeList}#${string}` ? U : never;
export type NavigationPropertyAnnotations_CodeList = NavigationPropertyAnnotationsBase_CodeList & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_CodeList}#${string}`]: NavigationPropertyAnnotationsBase_CodeList[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_CodeList = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_CodeList}#${string}` ? U : never;
export type TypeDefinitionAnnotations_CodeList = TypeDefinitionAnnotationsBase_CodeList & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_CodeList}#${string}`]: TypeDefinitionAnnotationsBase_CodeList[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_CodeList = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_CodeList}#${string}` ? U : never;
export type TermAnnotations_CodeList = TermAnnotationsBase_CodeList & {
    [key in `${string & keyof TermAnnotationsBase_CodeList}#${string}`]: TermAnnotationsBase_CodeList[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_CodeList = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_CodeList}#${string}` ? U : never;
export type ParameterAnnotations_CodeList = ParameterAnnotationsBase_CodeList & {
    [key in `${string & keyof ParameterAnnotationsBase_CodeList}#${string}`]: ParameterAnnotationsBase_CodeList[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_CodeList = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_CodeList}#${string}` ? U : never;
export type ReturnTypeAnnotations_CodeList = ReturnTypeAnnotationsBase_CodeList & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_CodeList}#${string}`]: ReturnTypeAnnotationsBase_CodeList[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_CodeList = {};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_CodeList}#${string}` ? U : never;
export type EntitySetAnnotations_CodeList = EntitySetAnnotationsBase_CodeList & {
    [key in `${string & keyof EntitySetAnnotationsBase_CodeList}#${string}`]: EntitySetAnnotationsBase_CodeList[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_CodeList = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_CodeList}#${string}` ? U : never;
export type SingletonAnnotations_CodeList = SingletonAnnotationsBase_CodeList & {
    [key in `${string & keyof SingletonAnnotationsBase_CodeList}#${string}`]: SingletonAnnotationsBase_CodeList[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_CodeList = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_CodeList}#${string}` ? U : never;
export type ActionImportAnnotations_CodeList = ActionImportAnnotationsBase_CodeList & {
    [key in `${string & keyof ActionImportAnnotationsBase_CodeList}#${string}`]: ActionImportAnnotationsBase_CodeList[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_CodeList = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_CodeList}#${string}` ? U : never;
export type FunctionImportAnnotations_CodeList = FunctionImportAnnotationsBase_CodeList & {
    [key in `${string & keyof FunctionImportAnnotationsBase_CodeList}#${string}`]: FunctionImportAnnotationsBase_CodeList[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_CodeList = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_CodeList}#${string}` ? U : never;
export type ActionAnnotations_CodeList = ActionAnnotationsBase_CodeList & {
    [key in `${string & keyof ActionAnnotationsBase_CodeList}#${string}`]: ActionAnnotationsBase_CodeList[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_CodeList = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_CodeList}#${string}` ? U : never;
export type FunctionAnnotations_CodeList = FunctionAnnotationsBase_CodeList & {
    [key in `${string & keyof FunctionAnnotationsBase_CodeList}#${string}`]: FunctionAnnotationsBase_CodeList[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_CodeList = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_CodeList}#${string}` ? U : never;
export type IncludeAnnotations_CodeList = IncludeAnnotationsBase_CodeList & {
    [key in `${string & keyof IncludeAnnotationsBase_CodeList}#${string}`]: IncludeAnnotationsBase_CodeList[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_CodeList = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_CodeList}#${string}` ? U : never;
export type AnnotationAnnotations_CodeList = AnnotationAnnotationsBase_CodeList & {
    [key in `${string & keyof AnnotationAnnotationsBase_CodeList}#${string}`]: AnnotationAnnotationsBase_CodeList[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_CodeList = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_CodeList}#${string}` ? U : never;
export type CollectionAnnotations_CodeList = CollectionAnnotationsBase_CodeList & {
    [key in `${string & keyof CollectionAnnotationsBase_CodeList}#${string}`]: CollectionAnnotationsBase_CodeList[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_CodeList = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_CodeList}#${string}` ? U : never;
export type RecordAnnotations_CodeList = RecordAnnotationsBase_CodeList & {
    [key in `${string & keyof RecordAnnotationsBase_CodeList}#${string}`]: RecordAnnotationsBase_CodeList[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_CodeList = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_CodeList}#${string}` ? U : never;
export type PropertyValueAnnotations_CodeList = PropertyValueAnnotationsBase_CodeList & {
    [key in `${string & keyof PropertyValueAnnotationsBase_CodeList}#${string}`]: PropertyValueAnnotationsBase_CodeList[ExtractPropertyValueAnnotationsType<key>];
};
export {};
