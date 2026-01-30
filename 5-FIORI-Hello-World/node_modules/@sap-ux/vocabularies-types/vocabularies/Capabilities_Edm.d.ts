import * as Org_OData_Capabilities_V1 from "./Capabilities";
export type EntityContainerAnnotationsBase_Capabilities = {
    'ConformanceLevel'?: Org_OData_Capabilities_V1.ConformanceLevel;
    'SupportedFormats'?: Org_OData_Capabilities_V1.SupportedFormats;
    'SupportedMetadataFormats'?: Org_OData_Capabilities_V1.SupportedMetadataFormats;
    'AcceptableEncodings'?: Org_OData_Capabilities_V1.AcceptableEncodings;
    'AsynchronousRequestsSupported'?: Org_OData_Capabilities_V1.AsynchronousRequestsSupported;
    'BatchContinueOnErrorSupported'?: Org_OData_Capabilities_V1.BatchContinueOnErrorSupported;
    'IsolationSupported'?: Org_OData_Capabilities_V1.IsolationSupported;
    'CrossJoinSupported'?: Org_OData_Capabilities_V1.CrossJoinSupported;
    'CallbackSupported'?: Org_OData_Capabilities_V1.CallbackSupported;
    'SelectSupport'?: Org_OData_Capabilities_V1.SelectSupport;
    'BatchSupported'?: Org_OData_Capabilities_V1.BatchSupported;
    'BatchSupport'?: Org_OData_Capabilities_V1.BatchSupport;
    'FilterFunctions'?: Org_OData_Capabilities_V1.FilterFunctions;
    'KeyAsSegmentSupported'?: Org_OData_Capabilities_V1.KeyAsSegmentSupported;
    'QuerySegmentSupported'?: Org_OData_Capabilities_V1.QuerySegmentSupported;
    'DeepInsertSupport'?: Org_OData_Capabilities_V1.DeepInsertSupport;
    'DeepUpdateSupport'?: Org_OData_Capabilities_V1.DeepUpdateSupport;
    'AnnotationValuesInQuerySupported'?: Org_OData_Capabilities_V1.AnnotationValuesInQuerySupported;
    'ModificationQueryOptions'?: Org_OData_Capabilities_V1.ModificationQueryOptions;
    'CustomHeaders'?: Org_OData_Capabilities_V1.CustomHeaders;
    'CustomQueryOptions'?: Org_OData_Capabilities_V1.CustomQueryOptions;
    'DefaultCapabilities'?: Org_OData_Capabilities_V1.DefaultCapabilities;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Capabilities}#${string}` ? U : never;
export type EntityContainerAnnotations_Capabilities = EntityContainerAnnotationsBase_Capabilities & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Capabilities}#${string}`]: EntityContainerAnnotationsBase_Capabilities[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Capabilities = {};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Capabilities}#${string}` ? U : never;
export type SchemaAnnotations_Capabilities = SchemaAnnotationsBase_Capabilities & {
    [key in `${string & keyof SchemaAnnotationsBase_Capabilities}#${string}`]: SchemaAnnotationsBase_Capabilities[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Capabilities = {};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ReferenceAnnotations_Capabilities = ReferenceAnnotationsBase_Capabilities & {
    [key in `${string & keyof ReferenceAnnotationsBase_Capabilities}#${string}`]: ReferenceAnnotationsBase_Capabilities[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Capabilities = {
    'MediaLocationUpdateSupported'?: Org_OData_Capabilities_V1.MediaLocationUpdateSupported;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Capabilities}#${string}` ? U : never;
export type EntityTypeAnnotations_Capabilities = EntityTypeAnnotationsBase_Capabilities & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Capabilities}#${string}`]: EntityTypeAnnotationsBase_Capabilities[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Capabilities = {};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Capabilities}#${string}` ? U : never;
export type EnumTypeAnnotations_Capabilities = EnumTypeAnnotationsBase_Capabilities & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Capabilities}#${string}`]: EnumTypeAnnotationsBase_Capabilities[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Capabilities = {};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ComplexTypeAnnotations_Capabilities = ComplexTypeAnnotationsBase_Capabilities & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Capabilities}#${string}`]: ComplexTypeAnnotationsBase_Capabilities[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Capabilities = {
    'MediaLocationUpdateSupported'?: Org_OData_Capabilities_V1.MediaLocationUpdateSupported;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Capabilities}#${string}` ? U : never;
export type PropertyAnnotations_Capabilities = PropertyAnnotationsBase_Capabilities & {
    [key in `${string & keyof PropertyAnnotationsBase_Capabilities}#${string}`]: PropertyAnnotationsBase_Capabilities[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Capabilities = {
    'ChangeTracking'?: Org_OData_Capabilities_V1.ChangeTracking;
};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Capabilities}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Capabilities = NavigationPropertyAnnotationsBase_Capabilities & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Capabilities}#${string}`]: NavigationPropertyAnnotationsBase_Capabilities[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Capabilities = {};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Capabilities}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Capabilities = TypeDefinitionAnnotationsBase_Capabilities & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Capabilities}#${string}`]: TypeDefinitionAnnotationsBase_Capabilities[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Capabilities = {};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Capabilities}#${string}` ? U : never;
export type TermAnnotations_Capabilities = TermAnnotationsBase_Capabilities & {
    [key in `${string & keyof TermAnnotationsBase_Capabilities}#${string}`]: TermAnnotationsBase_Capabilities[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Capabilities = {};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ParameterAnnotations_Capabilities = ParameterAnnotationsBase_Capabilities & {
    [key in `${string & keyof ParameterAnnotationsBase_Capabilities}#${string}`]: ParameterAnnotationsBase_Capabilities[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Capabilities = {};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ReturnTypeAnnotations_Capabilities = ReturnTypeAnnotationsBase_Capabilities & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Capabilities}#${string}`]: ReturnTypeAnnotationsBase_Capabilities[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Capabilities = {
    'CallbackSupported'?: Org_OData_Capabilities_V1.CallbackSupported;
    'ChangeTracking'?: Org_OData_Capabilities_V1.ChangeTracking;
    'CountRestrictions'?: Org_OData_Capabilities_V1.CountRestrictions;
    'NavigationRestrictions'?: Org_OData_Capabilities_V1.NavigationRestrictions;
    'IndexableByKey'?: Org_OData_Capabilities_V1.IndexableByKey;
    'TopSupported'?: Org_OData_Capabilities_V1.TopSupported;
    'SkipSupported'?: Org_OData_Capabilities_V1.SkipSupported;
    'ComputeSupported'?: Org_OData_Capabilities_V1.ComputeSupported;
    'SelectSupport'?: Org_OData_Capabilities_V1.SelectSupport;
    'FilterFunctions'?: Org_OData_Capabilities_V1.FilterFunctions;
    'FilterRestrictions'?: Org_OData_Capabilities_V1.FilterRestrictions;
    'SortRestrictions'?: Org_OData_Capabilities_V1.SortRestrictions;
    'ExpandRestrictions'?: Org_OData_Capabilities_V1.ExpandRestrictions;
    'SearchRestrictions'?: Org_OData_Capabilities_V1.SearchRestrictions;
    'InsertRestrictions'?: Org_OData_Capabilities_V1.InsertRestrictions;
    'DeepInsertSupport'?: Org_OData_Capabilities_V1.DeepInsertSupport;
    'UpdateRestrictions'?: Org_OData_Capabilities_V1.UpdateRestrictions;
    'DeepUpdateSupport'?: Org_OData_Capabilities_V1.DeepUpdateSupport;
    'DeleteRestrictions'?: Org_OData_Capabilities_V1.DeleteRestrictions;
    'CollectionPropertyRestrictions'?: Org_OData_Capabilities_V1.CollectionPropertyRestrictions;
    'ReadRestrictions'?: Org_OData_Capabilities_V1.ReadRestrictions;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Capabilities}#${string}` ? U : never;
export type EntitySetAnnotations_Capabilities = EntitySetAnnotationsBase_Capabilities & {
    [key in `${string & keyof EntitySetAnnotationsBase_Capabilities}#${string}`]: EntitySetAnnotationsBase_Capabilities[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Capabilities = {
    'ChangeTracking'?: Org_OData_Capabilities_V1.ChangeTracking;
    'NavigationRestrictions'?: Org_OData_Capabilities_V1.NavigationRestrictions;
    'SelectSupport'?: Org_OData_Capabilities_V1.SelectSupport;
    'ExpandRestrictions'?: Org_OData_Capabilities_V1.ExpandRestrictions;
    'UpdateRestrictions'?: Org_OData_Capabilities_V1.UpdateRestrictions;
    'DeleteRestrictions'?: Org_OData_Capabilities_V1.DeleteRestrictions;
    'CollectionPropertyRestrictions'?: Org_OData_Capabilities_V1.CollectionPropertyRestrictions;
    'ReadRestrictions'?: Org_OData_Capabilities_V1.ReadRestrictions;
};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Capabilities}#${string}` ? U : never;
export type SingletonAnnotations_Capabilities = SingletonAnnotationsBase_Capabilities & {
    [key in `${string & keyof SingletonAnnotationsBase_Capabilities}#${string}`]: SingletonAnnotationsBase_Capabilities[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Capabilities = {
    'ModificationQueryOptions'?: Org_OData_Capabilities_V1.ModificationQueryOptions;
};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ActionImportAnnotations_Capabilities = ActionImportAnnotationsBase_Capabilities & {
    [key in `${string & keyof ActionImportAnnotationsBase_Capabilities}#${string}`]: ActionImportAnnotationsBase_Capabilities[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Capabilities = {
    'ChangeTracking'?: Org_OData_Capabilities_V1.ChangeTracking;
};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Capabilities}#${string}` ? U : never;
export type FunctionImportAnnotations_Capabilities = FunctionImportAnnotationsBase_Capabilities & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Capabilities}#${string}`]: FunctionImportAnnotationsBase_Capabilities[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Capabilities = {
    'OperationRestrictions'?: Org_OData_Capabilities_V1.OperationRestrictions;
    'ModificationQueryOptions'?: Org_OData_Capabilities_V1.ModificationQueryOptions;
};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Capabilities}#${string}` ? U : never;
export type ActionAnnotations_Capabilities = ActionAnnotationsBase_Capabilities & {
    [key in `${string & keyof ActionAnnotationsBase_Capabilities}#${string}`]: ActionAnnotationsBase_Capabilities[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Capabilities = {
    'ChangeTracking'?: Org_OData_Capabilities_V1.ChangeTracking;
    'OperationRestrictions'?: Org_OData_Capabilities_V1.OperationRestrictions;
};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Capabilities}#${string}` ? U : never;
export type FunctionAnnotations_Capabilities = FunctionAnnotationsBase_Capabilities & {
    [key in `${string & keyof FunctionAnnotationsBase_Capabilities}#${string}`]: FunctionAnnotationsBase_Capabilities[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Capabilities = {};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Capabilities}#${string}` ? U : never;
export type IncludeAnnotations_Capabilities = IncludeAnnotationsBase_Capabilities & {
    [key in `${string & keyof IncludeAnnotationsBase_Capabilities}#${string}`]: IncludeAnnotationsBase_Capabilities[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Capabilities = {};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Capabilities}#${string}` ? U : never;
export type AnnotationAnnotations_Capabilities = AnnotationAnnotationsBase_Capabilities & {
    [key in `${string & keyof AnnotationAnnotationsBase_Capabilities}#${string}`]: AnnotationAnnotationsBase_Capabilities[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Capabilities = {
    'CountRestrictions'?: Org_OData_Capabilities_V1.CountRestrictions;
    'NavigationRestrictions'?: Org_OData_Capabilities_V1.NavigationRestrictions;
    'IndexableByKey'?: Org_OData_Capabilities_V1.IndexableByKey;
    'TopSupported'?: Org_OData_Capabilities_V1.TopSupported;
    'SkipSupported'?: Org_OData_Capabilities_V1.SkipSupported;
    'ComputeSupported'?: Org_OData_Capabilities_V1.ComputeSupported;
    'SelectSupport'?: Org_OData_Capabilities_V1.SelectSupport;
    'FilterFunctions'?: Org_OData_Capabilities_V1.FilterFunctions;
    'FilterRestrictions'?: Org_OData_Capabilities_V1.FilterRestrictions;
    'SortRestrictions'?: Org_OData_Capabilities_V1.SortRestrictions;
    'ExpandRestrictions'?: Org_OData_Capabilities_V1.ExpandRestrictions;
    'SearchRestrictions'?: Org_OData_Capabilities_V1.SearchRestrictions;
    'InsertRestrictions'?: Org_OData_Capabilities_V1.InsertRestrictions;
    'DeepInsertSupport'?: Org_OData_Capabilities_V1.DeepInsertSupport;
    'UpdateRestrictions'?: Org_OData_Capabilities_V1.UpdateRestrictions;
    'DeepUpdateSupport'?: Org_OData_Capabilities_V1.DeepUpdateSupport;
    'DeleteRestrictions'?: Org_OData_Capabilities_V1.DeleteRestrictions;
    'ReadRestrictions'?: Org_OData_Capabilities_V1.ReadRestrictions;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Capabilities}#${string}` ? U : never;
export type CollectionAnnotations_Capabilities = CollectionAnnotationsBase_Capabilities & {
    [key in `${string & keyof CollectionAnnotationsBase_Capabilities}#${string}`]: CollectionAnnotationsBase_Capabilities[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Capabilities = {};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Capabilities}#${string}` ? U : never;
export type RecordAnnotations_Capabilities = RecordAnnotationsBase_Capabilities & {
    [key in `${string & keyof RecordAnnotationsBase_Capabilities}#${string}`]: RecordAnnotationsBase_Capabilities[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Capabilities = {};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Capabilities}#${string}` ? U : never;
export type PropertyValueAnnotations_Capabilities = PropertyValueAnnotationsBase_Capabilities & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Capabilities}#${string}`]: PropertyValueAnnotationsBase_Capabilities[ExtractPropertyValueAnnotationsType<key>];
};
export {};
