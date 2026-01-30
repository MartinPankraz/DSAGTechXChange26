import * as com_sap_vocabularies_Communication_v1 from "./Communication";
export type EntityContainerAnnotationsBase_Communication = {};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Communication}#${string}` ? U : never;
export type EntityContainerAnnotations_Communication = EntityContainerAnnotationsBase_Communication & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Communication}#${string}`]: EntityContainerAnnotationsBase_Communication[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Communication = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Communication}#${string}` ? U : never;
export type SchemaAnnotations_Communication = SchemaAnnotationsBase_Communication & {
    [key in `${string & keyof SchemaAnnotationsBase_Communication}#${string}`]: SchemaAnnotationsBase_Communication[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Communication = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Communication}#${string}` ? U : never;
export type ReferenceAnnotations_Communication = ReferenceAnnotationsBase_Communication & {
    [key in `${string & keyof ReferenceAnnotationsBase_Communication}#${string}`]: ReferenceAnnotationsBase_Communication[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Communication = {
    'Contact'?: com_sap_vocabularies_Communication_v1.Contact;
    'Address'?: com_sap_vocabularies_Communication_v1.Address;
    'Event'?: com_sap_vocabularies_Communication_v1.Event;
    'Task'?: com_sap_vocabularies_Communication_v1.Task;
    'Message'?: com_sap_vocabularies_Communication_v1.Message;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Communication}#${string}` ? U : never;
export type EntityTypeAnnotations_Communication = EntityTypeAnnotationsBase_Communication & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Communication}#${string}`]: EntityTypeAnnotationsBase_Communication[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Communication = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Communication}#${string}` ? U : never;
export type EnumTypeAnnotations_Communication = EnumTypeAnnotationsBase_Communication & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Communication}#${string}`]: EnumTypeAnnotationsBase_Communication[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Communication = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Communication}#${string}` ? U : never;
export type ComplexTypeAnnotations_Communication = ComplexTypeAnnotationsBase_Communication & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Communication}#${string}`]: ComplexTypeAnnotationsBase_Communication[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Communication = {
    'IsEmailAddress'?: com_sap_vocabularies_Communication_v1.IsEmailAddress;
    'IsPhoneNumber'?: com_sap_vocabularies_Communication_v1.IsPhoneNumber;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Communication}#${string}` ? U : never;
export type PropertyAnnotations_Communication = PropertyAnnotationsBase_Communication & {
    [key in `${string & keyof PropertyAnnotationsBase_Communication}#${string}`]: PropertyAnnotationsBase_Communication[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Communication = {};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Communication}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Communication = NavigationPropertyAnnotationsBase_Communication & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Communication}#${string}`]: NavigationPropertyAnnotationsBase_Communication[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Communication = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Communication}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Communication = TypeDefinitionAnnotationsBase_Communication & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Communication}#${string}`]: TypeDefinitionAnnotationsBase_Communication[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Communication = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Communication}#${string}` ? U : never;
export type TermAnnotations_Communication = TermAnnotationsBase_Communication & {
    [key in `${string & keyof TermAnnotationsBase_Communication}#${string}`]: TermAnnotationsBase_Communication[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Communication = {
    'IsEmailAddress'?: com_sap_vocabularies_Communication_v1.IsEmailAddress;
    'IsPhoneNumber'?: com_sap_vocabularies_Communication_v1.IsPhoneNumber;
};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Communication}#${string}` ? U : never;
export type ParameterAnnotations_Communication = ParameterAnnotationsBase_Communication & {
    [key in `${string & keyof ParameterAnnotationsBase_Communication}#${string}`]: ParameterAnnotationsBase_Communication[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Communication = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Communication}#${string}` ? U : never;
export type ReturnTypeAnnotations_Communication = ReturnTypeAnnotationsBase_Communication & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Communication}#${string}`]: ReturnTypeAnnotationsBase_Communication[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Communication = {};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Communication}#${string}` ? U : never;
export type EntitySetAnnotations_Communication = EntitySetAnnotationsBase_Communication & {
    [key in `${string & keyof EntitySetAnnotationsBase_Communication}#${string}`]: EntitySetAnnotationsBase_Communication[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Communication = {};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Communication}#${string}` ? U : never;
export type SingletonAnnotations_Communication = SingletonAnnotationsBase_Communication & {
    [key in `${string & keyof SingletonAnnotationsBase_Communication}#${string}`]: SingletonAnnotationsBase_Communication[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Communication = {};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Communication}#${string}` ? U : never;
export type ActionImportAnnotations_Communication = ActionImportAnnotationsBase_Communication & {
    [key in `${string & keyof ActionImportAnnotationsBase_Communication}#${string}`]: ActionImportAnnotationsBase_Communication[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Communication = {};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Communication}#${string}` ? U : never;
export type FunctionImportAnnotations_Communication = FunctionImportAnnotationsBase_Communication & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Communication}#${string}`]: FunctionImportAnnotationsBase_Communication[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Communication = {};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Communication}#${string}` ? U : never;
export type ActionAnnotations_Communication = ActionAnnotationsBase_Communication & {
    [key in `${string & keyof ActionAnnotationsBase_Communication}#${string}`]: ActionAnnotationsBase_Communication[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Communication = {};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Communication}#${string}` ? U : never;
export type FunctionAnnotations_Communication = FunctionAnnotationsBase_Communication & {
    [key in `${string & keyof FunctionAnnotationsBase_Communication}#${string}`]: FunctionAnnotationsBase_Communication[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Communication = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Communication}#${string}` ? U : never;
export type IncludeAnnotations_Communication = IncludeAnnotationsBase_Communication & {
    [key in `${string & keyof IncludeAnnotationsBase_Communication}#${string}`]: IncludeAnnotationsBase_Communication[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Communication = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Communication}#${string}` ? U : never;
export type AnnotationAnnotations_Communication = AnnotationAnnotationsBase_Communication & {
    [key in `${string & keyof AnnotationAnnotationsBase_Communication}#${string}`]: AnnotationAnnotationsBase_Communication[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Communication = {};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Communication}#${string}` ? U : never;
export type CollectionAnnotations_Communication = CollectionAnnotationsBase_Communication & {
    [key in `${string & keyof CollectionAnnotationsBase_Communication}#${string}`]: CollectionAnnotationsBase_Communication[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Communication = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Communication}#${string}` ? U : never;
export type RecordAnnotations_Communication = RecordAnnotationsBase_Communication & {
    [key in `${string & keyof RecordAnnotationsBase_Communication}#${string}`]: RecordAnnotationsBase_Communication[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Communication = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Communication}#${string}` ? U : never;
export type PropertyValueAnnotations_Communication = PropertyValueAnnotationsBase_Communication & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Communication}#${string}`]: PropertyValueAnnotationsBase_Communication[ExtractPropertyValueAnnotationsType<key>];
};
export {};
