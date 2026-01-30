import * as Org_OData_Validation_V1 from "./Validation";
export type EntityContainerAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractEntityContainerAnnotationsType<T> = T extends `${infer U extends keyof EntityContainerAnnotationsBase_Validation}#${string}` ? U : never;
export type EntityContainerAnnotations_Validation = EntityContainerAnnotationsBase_Validation & {
    [key in `${string & keyof EntityContainerAnnotationsBase_Validation}#${string}`]: EntityContainerAnnotationsBase_Validation[ExtractEntityContainerAnnotationsType<key>];
};
export type SchemaAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractSchemaAnnotationsType<T> = T extends `${infer U extends keyof SchemaAnnotationsBase_Validation}#${string}` ? U : never;
export type SchemaAnnotations_Validation = SchemaAnnotationsBase_Validation & {
    [key in `${string & keyof SchemaAnnotationsBase_Validation}#${string}`]: SchemaAnnotationsBase_Validation[ExtractSchemaAnnotationsType<key>];
};
export type ReferenceAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractReferenceAnnotationsType<T> = T extends `${infer U extends keyof ReferenceAnnotationsBase_Validation}#${string}` ? U : never;
export type ReferenceAnnotations_Validation = ReferenceAnnotationsBase_Validation & {
    [key in `${string & keyof ReferenceAnnotationsBase_Validation}#${string}`]: ReferenceAnnotationsBase_Validation[ExtractReferenceAnnotationsType<key>];
};
export type EntityTypeAnnotationsBase_Validation = {
    'Constraint'?: Org_OData_Validation_V1.Constraint;
    'ItemsOf'?: Org_OData_Validation_V1.ItemsOf;
    'OpenPropertyTypeConstraint'?: Org_OData_Validation_V1.OpenPropertyTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractEntityTypeAnnotationsType<T> = T extends `${infer U extends keyof EntityTypeAnnotationsBase_Validation}#${string}` ? U : never;
export type EntityTypeAnnotations_Validation = EntityTypeAnnotationsBase_Validation & {
    [key in `${string & keyof EntityTypeAnnotationsBase_Validation}#${string}`]: EntityTypeAnnotationsBase_Validation[ExtractEntityTypeAnnotationsType<key>];
};
export type EnumTypeAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractEnumTypeAnnotationsType<T> = T extends `${infer U extends keyof EnumTypeAnnotationsBase_Validation}#${string}` ? U : never;
export type EnumTypeAnnotations_Validation = EnumTypeAnnotationsBase_Validation & {
    [key in `${string & keyof EnumTypeAnnotationsBase_Validation}#${string}`]: EnumTypeAnnotationsBase_Validation[ExtractEnumTypeAnnotationsType<key>];
};
export type ComplexTypeAnnotationsBase_Validation = {
    'Constraint'?: Org_OData_Validation_V1.Constraint;
    'ItemsOf'?: Org_OData_Validation_V1.ItemsOf;
    'OpenPropertyTypeConstraint'?: Org_OData_Validation_V1.OpenPropertyTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractComplexTypeAnnotationsType<T> = T extends `${infer U extends keyof ComplexTypeAnnotationsBase_Validation}#${string}` ? U : never;
export type ComplexTypeAnnotations_Validation = ComplexTypeAnnotationsBase_Validation & {
    [key in `${string & keyof ComplexTypeAnnotationsBase_Validation}#${string}`]: ComplexTypeAnnotationsBase_Validation[ExtractComplexTypeAnnotationsType<key>];
};
export type PropertyAnnotationsBase_Validation = {
    'Pattern'?: Org_OData_Validation_V1.Pattern;
    'Minimum'?: Org_OData_Validation_V1.Minimum;
    'Maximum'?: Org_OData_Validation_V1.Maximum;
    'AllowedValues'?: Org_OData_Validation_V1.AllowedValues;
    'MultipleOf'?: Org_OData_Validation_V1.MultipleOf;
    'Constraint'?: Org_OData_Validation_V1.Constraint;
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'AllowedTerms'?: Org_OData_Validation_V1.AllowedTerms;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractPropertyAnnotationsType<T> = T extends `${infer U extends keyof PropertyAnnotationsBase_Validation}#${string}` ? U : never;
export type PropertyAnnotations_Validation = PropertyAnnotationsBase_Validation & {
    [key in `${string & keyof PropertyAnnotationsBase_Validation}#${string}`]: PropertyAnnotationsBase_Validation[ExtractPropertyAnnotationsType<key>];
};
export type NavigationPropertyAnnotationsBase_Validation = {
    'Constraint'?: Org_OData_Validation_V1.Constraint;
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractNavigationPropertyAnnotationsType<T> = T extends `${infer U extends keyof NavigationPropertyAnnotationsBase_Validation}#${string}` ? U : never;
export type NavigationPropertyAnnotations_Validation = NavigationPropertyAnnotationsBase_Validation & {
    [key in `${string & keyof NavigationPropertyAnnotationsBase_Validation}#${string}`]: NavigationPropertyAnnotationsBase_Validation[ExtractNavigationPropertyAnnotationsType<key>];
};
export type TypeDefinitionAnnotationsBase_Validation = {
    'AllowedValues'?: Org_OData_Validation_V1.AllowedValues;
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractTypeDefinitionAnnotationsType<T> = T extends `${infer U extends keyof TypeDefinitionAnnotationsBase_Validation}#${string}` ? U : never;
export type TypeDefinitionAnnotations_Validation = TypeDefinitionAnnotationsBase_Validation & {
    [key in `${string & keyof TypeDefinitionAnnotationsBase_Validation}#${string}`]: TypeDefinitionAnnotationsBase_Validation[ExtractTypeDefinitionAnnotationsType<key>];
};
export type TermAnnotationsBase_Validation = {
    'Pattern'?: Org_OData_Validation_V1.Pattern;
    'Minimum'?: Org_OData_Validation_V1.Minimum;
    'Maximum'?: Org_OData_Validation_V1.Maximum;
    'MultipleOf'?: Org_OData_Validation_V1.MultipleOf;
    'AllowedTerms'?: Org_OData_Validation_V1.AllowedTerms;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractTermAnnotationsType<T> = T extends `${infer U extends keyof TermAnnotationsBase_Validation}#${string}` ? U : never;
export type TermAnnotations_Validation = TermAnnotationsBase_Validation & {
    [key in `${string & keyof TermAnnotationsBase_Validation}#${string}`]: TermAnnotationsBase_Validation[ExtractTermAnnotationsType<key>];
};
export type ParameterAnnotationsBase_Validation = {
    'Pattern'?: Org_OData_Validation_V1.Pattern;
    'Minimum'?: Org_OData_Validation_V1.Minimum;
    'Maximum'?: Org_OData_Validation_V1.Maximum;
    'AllowedValues'?: Org_OData_Validation_V1.AllowedValues;
    'MultipleOf'?: Org_OData_Validation_V1.MultipleOf;
    'Constraint'?: Org_OData_Validation_V1.Constraint;
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractParameterAnnotationsType<T> = T extends `${infer U extends keyof ParameterAnnotationsBase_Validation}#${string}` ? U : never;
export type ParameterAnnotations_Validation = ParameterAnnotationsBase_Validation & {
    [key in `${string & keyof ParameterAnnotationsBase_Validation}#${string}`]: ParameterAnnotationsBase_Validation[ExtractParameterAnnotationsType<key>];
};
export type ReturnTypeAnnotationsBase_Validation = {
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractReturnTypeAnnotationsType<T> = T extends `${infer U extends keyof ReturnTypeAnnotationsBase_Validation}#${string}` ? U : never;
export type ReturnTypeAnnotations_Validation = ReturnTypeAnnotationsBase_Validation & {
    [key in `${string & keyof ReturnTypeAnnotationsBase_Validation}#${string}`]: ReturnTypeAnnotationsBase_Validation[ExtractReturnTypeAnnotationsType<key>];
};
export type EntitySetAnnotationsBase_Validation = {
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractEntitySetAnnotationsType<T> = T extends `${infer U extends keyof EntitySetAnnotationsBase_Validation}#${string}` ? U : never;
export type EntitySetAnnotations_Validation = EntitySetAnnotationsBase_Validation & {
    [key in `${string & keyof EntitySetAnnotationsBase_Validation}#${string}`]: EntitySetAnnotationsBase_Validation[ExtractEntitySetAnnotationsType<key>];
};
export type SingletonAnnotationsBase_Validation = {
    'DerivedTypeConstraint'?: Org_OData_Validation_V1.DerivedTypeConstraint;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractSingletonAnnotationsType<T> = T extends `${infer U extends keyof SingletonAnnotationsBase_Validation}#${string}` ? U : never;
export type SingletonAnnotations_Validation = SingletonAnnotationsBase_Validation & {
    [key in `${string & keyof SingletonAnnotationsBase_Validation}#${string}`]: SingletonAnnotationsBase_Validation[ExtractSingletonAnnotationsType<key>];
};
export type ActionImportAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractActionImportAnnotationsType<T> = T extends `${infer U extends keyof ActionImportAnnotationsBase_Validation}#${string}` ? U : never;
export type ActionImportAnnotations_Validation = ActionImportAnnotationsBase_Validation & {
    [key in `${string & keyof ActionImportAnnotationsBase_Validation}#${string}`]: ActionImportAnnotationsBase_Validation[ExtractActionImportAnnotationsType<key>];
};
export type FunctionImportAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractFunctionImportAnnotationsType<T> = T extends `${infer U extends keyof FunctionImportAnnotationsBase_Validation}#${string}` ? U : never;
export type FunctionImportAnnotations_Validation = FunctionImportAnnotationsBase_Validation & {
    [key in `${string & keyof FunctionImportAnnotationsBase_Validation}#${string}`]: FunctionImportAnnotationsBase_Validation[ExtractFunctionImportAnnotationsType<key>];
};
export type ActionAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractActionAnnotationsType<T> = T extends `${infer U extends keyof ActionAnnotationsBase_Validation}#${string}` ? U : never;
export type ActionAnnotations_Validation = ActionAnnotationsBase_Validation & {
    [key in `${string & keyof ActionAnnotationsBase_Validation}#${string}`]: ActionAnnotationsBase_Validation[ExtractActionAnnotationsType<key>];
};
export type FunctionAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractFunctionAnnotationsType<T> = T extends `${infer U extends keyof FunctionAnnotationsBase_Validation}#${string}` ? U : never;
export type FunctionAnnotations_Validation = FunctionAnnotationsBase_Validation & {
    [key in `${string & keyof FunctionAnnotationsBase_Validation}#${string}`]: FunctionAnnotationsBase_Validation[ExtractFunctionAnnotationsType<key>];
};
export type IncludeAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractIncludeAnnotationsType<T> = T extends `${infer U extends keyof IncludeAnnotationsBase_Validation}#${string}` ? U : never;
export type IncludeAnnotations_Validation = IncludeAnnotationsBase_Validation & {
    [key in `${string & keyof IncludeAnnotationsBase_Validation}#${string}`]: IncludeAnnotationsBase_Validation[ExtractIncludeAnnotationsType<key>];
};
export type AnnotationAnnotationsBase_Validation = {
    'Exclusive'?: Org_OData_Validation_V1.Exclusive;
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractAnnotationAnnotationsType<T> = T extends `${infer U extends keyof AnnotationAnnotationsBase_Validation}#${string}` ? U : never;
export type AnnotationAnnotations_Validation = AnnotationAnnotationsBase_Validation & {
    [key in `${string & keyof AnnotationAnnotationsBase_Validation}#${string}`]: AnnotationAnnotationsBase_Validation[ExtractAnnotationAnnotationsType<key>];
};
export type CollectionAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
    'MaxItems'?: Org_OData_Validation_V1.MaxItems;
    'MinItems'?: Org_OData_Validation_V1.MinItems;
};
type ExtractCollectionAnnotationsType<T> = T extends `${infer U extends keyof CollectionAnnotationsBase_Validation}#${string}` ? U : never;
export type CollectionAnnotations_Validation = CollectionAnnotationsBase_Validation & {
    [key in `${string & keyof CollectionAnnotationsBase_Validation}#${string}`]: CollectionAnnotationsBase_Validation[ExtractCollectionAnnotationsType<key>];
};
export type RecordAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractRecordAnnotationsType<T> = T extends `${infer U extends keyof RecordAnnotationsBase_Validation}#${string}` ? U : never;
export type RecordAnnotations_Validation = RecordAnnotationsBase_Validation & {
    [key in `${string & keyof RecordAnnotationsBase_Validation}#${string}`]: RecordAnnotationsBase_Validation[ExtractRecordAnnotationsType<key>];
};
export type PropertyValueAnnotationsBase_Validation = {
    'ApplicableTerms'?: Org_OData_Validation_V1.ApplicableTerms;
};
type ExtractPropertyValueAnnotationsType<T> = T extends `${infer U extends keyof PropertyValueAnnotationsBase_Validation}#${string}` ? U : never;
export type PropertyValueAnnotations_Validation = PropertyValueAnnotationsBase_Validation & {
    [key in `${string & keyof PropertyValueAnnotationsBase_Validation}#${string}`]: PropertyValueAnnotationsBase_Validation[ExtractPropertyValueAnnotationsType<key>];
};
export {};
