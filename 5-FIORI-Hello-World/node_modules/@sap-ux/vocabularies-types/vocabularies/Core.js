"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreAnnotationTypes = exports.CoreAnnotationTerms = exports.PermissionValues = exports.Permission = exports.DataModificationOperationKindValues = exports.DataModificationOperationKind = exports.RevisionKindValues = exports.RevisionKind = void 0;
// EnumType 
var RevisionKind;
(function (RevisionKind) {
    /**
    Model element was added
    */
    /**
    undefined
    */
    RevisionKind["Added"] = "Core.RevisionKind/Added";
    /**
    Model element was modified
    */
    /**
    undefined
    */
    RevisionKind["Modified"] = "Core.RevisionKind/Modified";
    /**
    Model element was deprecated
    */
    /**
    undefined
    */
    RevisionKind["Deprecated"] = "Core.RevisionKind/Deprecated";
})(RevisionKind = exports.RevisionKind || (exports.RevisionKind = {}));
var RevisionKindValues;
(function (RevisionKindValues) {
    /**
    Model element was added
    */
    /**
    undefined
    */
    RevisionKindValues[RevisionKindValues["Added"] = 0] = "Added";
    /**
    Model element was modified
    */
    /**
    undefined
    */
    RevisionKindValues[RevisionKindValues["Modified"] = 1] = "Modified";
    /**
    Model element was deprecated
    */
    /**
    undefined
    */
    RevisionKindValues[RevisionKindValues["Deprecated"] = 2] = "Deprecated";
})(RevisionKindValues = exports.RevisionKindValues || (exports.RevisionKindValues = {}));
// EnumType 
var DataModificationOperationKind;
(function (DataModificationOperationKind) {
    /**
    Insert new instance
    */
    /**
    undefined
    */
    DataModificationOperationKind["insert"] = "Core.DataModificationOperationKind/insert";
    /**
    Update existing instance
    */
    /**
    undefined
    */
    DataModificationOperationKind["update"] = "Core.DataModificationOperationKind/update";
    /**
    Insert new instance or update it if it already exists
    */
    /**
    undefined
    */
    DataModificationOperationKind["upsert"] = "Core.DataModificationOperationKind/upsert";
    /**
    Delete existing instance
    */
    /**
    undefined
    */
    DataModificationOperationKind["delete"] = "Core.DataModificationOperationKind/delete";
    /**
    Invoke action or function
    */
    /**
    undefined
    */
    DataModificationOperationKind["invoke"] = "Core.DataModificationOperationKind/invoke";
    /**
    Add link between entities
    */
    /**
    undefined
    */
    DataModificationOperationKind["link"] = "Core.DataModificationOperationKind/link";
    /**
    Remove link between entities
    */
    /**
    undefined
    */
    DataModificationOperationKind["unlink"] = "Core.DataModificationOperationKind/unlink";
})(DataModificationOperationKind = exports.DataModificationOperationKind || (exports.DataModificationOperationKind = {}));
var DataModificationOperationKindValues;
(function (DataModificationOperationKindValues) {
    /**
    Insert new instance
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["insert"] = 0] = "insert";
    /**
    Update existing instance
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["update"] = 1] = "update";
    /**
    Insert new instance or update it if it already exists
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["upsert"] = 2] = "upsert";
    /**
    Delete existing instance
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["delete"] = 3] = "delete";
    /**
    Invoke action or function
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["invoke"] = 4] = "invoke";
    /**
    Add link between entities
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["link"] = 5] = "link";
    /**
    Remove link between entities
    */
    /**
    undefined
    */
    DataModificationOperationKindValues[DataModificationOperationKindValues["unlink"] = 6] = "unlink";
})(DataModificationOperationKindValues = exports.DataModificationOperationKindValues || (exports.DataModificationOperationKindValues = {}));
// EnumType 
var Permission;
(function (Permission) {
    /**
    No permissions
    */
    /**
    undefined
    */
    Permission["None"] = "Core.Permission/None";
    /**
    Read permission
    */
    /**
    undefined
    */
    Permission["Read"] = "Core.Permission/Read";
    /**
    Write permission
    */
    /**
    undefined
    */
    Permission["Write"] = "Core.Permission/Write";
    /**
    Read and write permission
    */
    /**
    undefined
    */
    Permission["ReadWrite"] = "Core.Permission/ReadWrite";
    /**
    Permission to invoke actions
    */
    /**
    undefined
    */
    Permission["Invoke"] = "Core.Permission/Invoke";
})(Permission = exports.Permission || (exports.Permission = {}));
var PermissionValues;
(function (PermissionValues) {
    /**
    No permissions
    */
    /**
    undefined
    */
    PermissionValues[PermissionValues["None"] = 0] = "None";
    /**
    Read permission
    */
    /**
    undefined
    */
    PermissionValues[PermissionValues["Read"] = 1] = "Read";
    /**
    Write permission
    */
    /**
    undefined
    */
    PermissionValues[PermissionValues["Write"] = 2] = "Write";
    /**
    Read and write permission
    */
    /**
    undefined
    */
    PermissionValues[PermissionValues["ReadWrite"] = 3] = "ReadWrite";
    /**
    Permission to invoke actions
    */
    /**
    undefined
    */
    PermissionValues[PermissionValues["Invoke"] = 4] = "Invoke";
})(PermissionValues = exports.PermissionValues || (exports.PermissionValues = {}));
var CoreAnnotationTerms;
(function (CoreAnnotationTerms) {
    CoreAnnotationTerms["ODataVersions"] = "Org.OData.Core.V1.ODataVersions";
    CoreAnnotationTerms["SchemaVersion"] = "Org.OData.Core.V1.SchemaVersion";
    CoreAnnotationTerms["Revisions"] = "Org.OData.Core.V1.Revisions";
    CoreAnnotationTerms["Description"] = "Org.OData.Core.V1.Description";
    CoreAnnotationTerms["LongDescription"] = "Org.OData.Core.V1.LongDescription";
    CoreAnnotationTerms["Links"] = "Org.OData.Core.V1.Links";
    CoreAnnotationTerms["Example"] = "Org.OData.Core.V1.Example";
    CoreAnnotationTerms["Messages"] = "Org.OData.Core.V1.Messages";
    CoreAnnotationTerms["ValueException"] = "Org.OData.Core.V1.ValueException";
    CoreAnnotationTerms["ResourceException"] = "Org.OData.Core.V1.ResourceException";
    CoreAnnotationTerms["DataModificationException"] = "Org.OData.Core.V1.DataModificationException";
    CoreAnnotationTerms["IsLanguageDependent"] = "Org.OData.Core.V1.IsLanguageDependent";
    CoreAnnotationTerms["RequiresType"] = "Org.OData.Core.V1.RequiresType";
    CoreAnnotationTerms["AppliesViaContainer"] = "Org.OData.Core.V1.AppliesViaContainer";
    CoreAnnotationTerms["ResourcePath"] = "Org.OData.Core.V1.ResourcePath";
    CoreAnnotationTerms["DereferenceableIDs"] = "Org.OData.Core.V1.DereferenceableIDs";
    CoreAnnotationTerms["ConventionalIDs"] = "Org.OData.Core.V1.ConventionalIDs";
    CoreAnnotationTerms["Permissions"] = "Org.OData.Core.V1.Permissions";
    CoreAnnotationTerms["ContentID"] = "Org.OData.Core.V1.ContentID";
    CoreAnnotationTerms["DefaultNamespace"] = "Org.OData.Core.V1.DefaultNamespace";
    CoreAnnotationTerms["Immutable"] = "Org.OData.Core.V1.Immutable";
    CoreAnnotationTerms["Computed"] = "Org.OData.Core.V1.Computed";
    CoreAnnotationTerms["ComputedDefaultValue"] = "Org.OData.Core.V1.ComputedDefaultValue";
    CoreAnnotationTerms["IsURL"] = "Org.OData.Core.V1.IsURL";
    CoreAnnotationTerms["AcceptableMediaTypes"] = "Org.OData.Core.V1.AcceptableMediaTypes";
    CoreAnnotationTerms["MediaType"] = "Org.OData.Core.V1.MediaType";
    CoreAnnotationTerms["IsMediaType"] = "Org.OData.Core.V1.IsMediaType";
    CoreAnnotationTerms["ContentDisposition"] = "Org.OData.Core.V1.ContentDisposition";
    CoreAnnotationTerms["OptimisticConcurrency"] = "Org.OData.Core.V1.OptimisticConcurrency";
    CoreAnnotationTerms["AdditionalProperties"] = "Org.OData.Core.V1.AdditionalProperties";
    CoreAnnotationTerms["AutoExpand"] = "Org.OData.Core.V1.AutoExpand";
    CoreAnnotationTerms["AutoExpandReferences"] = "Org.OData.Core.V1.AutoExpandReferences";
    CoreAnnotationTerms["MayImplement"] = "Org.OData.Core.V1.MayImplement";
    CoreAnnotationTerms["Ordered"] = "Org.OData.Core.V1.Ordered";
    CoreAnnotationTerms["PositionalInsert"] = "Org.OData.Core.V1.PositionalInsert";
    CoreAnnotationTerms["AlternateKeys"] = "Org.OData.Core.V1.AlternateKeys";
    CoreAnnotationTerms["OptionalParameter"] = "Org.OData.Core.V1.OptionalParameter";
    CoreAnnotationTerms["OperationAvailable"] = "Org.OData.Core.V1.OperationAvailable";
    CoreAnnotationTerms["RequiresExplicitBinding"] = "Org.OData.Core.V1.RequiresExplicitBinding";
    CoreAnnotationTerms["ExplicitOperationBindings"] = "Org.OData.Core.V1.ExplicitOperationBindings";
    CoreAnnotationTerms["SymbolicName"] = "Org.OData.Core.V1.SymbolicName";
    CoreAnnotationTerms["GeometryFeature"] = "Org.OData.Core.V1.GeometryFeature";
    CoreAnnotationTerms["AnyStructure"] = "Org.OData.Core.V1.AnyStructure";
    CoreAnnotationTerms["IsDelta"] = "Org.OData.Core.V1.IsDelta";
})(CoreAnnotationTerms = exports.CoreAnnotationTerms || (exports.CoreAnnotationTerms = {}));
var CoreAnnotationTypes;
(function (CoreAnnotationTypes) {
    CoreAnnotationTypes["RevisionType"] = "Org.OData.Core.V1.RevisionType";
    CoreAnnotationTypes["Link"] = "Org.OData.Core.V1.Link";
    CoreAnnotationTypes["ExampleValue"] = "Org.OData.Core.V1.ExampleValue";
    CoreAnnotationTypes["PrimitiveExampleValue"] = "Org.OData.Core.V1.PrimitiveExampleValue";
    CoreAnnotationTypes["ComplexExampleValue"] = "Org.OData.Core.V1.ComplexExampleValue";
    CoreAnnotationTypes["EntityExampleValue"] = "Org.OData.Core.V1.EntityExampleValue";
    CoreAnnotationTypes["ExternalExampleValue"] = "Org.OData.Core.V1.ExternalExampleValue";
    CoreAnnotationTypes["MessageType"] = "Org.OData.Core.V1.MessageType";
    CoreAnnotationTypes["ExceptionType"] = "Org.OData.Core.V1.ExceptionType";
    CoreAnnotationTypes["ValueExceptionType"] = "Org.OData.Core.V1.ValueExceptionType";
    CoreAnnotationTypes["ResourceExceptionType"] = "Org.OData.Core.V1.ResourceExceptionType";
    CoreAnnotationTypes["DataModificationExceptionType"] = "Org.OData.Core.V1.DataModificationExceptionType";
    CoreAnnotationTypes["ContentDispositionType"] = "Org.OData.Core.V1.ContentDispositionType";
    CoreAnnotationTypes["AlternateKey"] = "Org.OData.Core.V1.AlternateKey";
    CoreAnnotationTypes["PropertyRef"] = "Org.OData.Core.V1.PropertyRef";
    CoreAnnotationTypes["Dictionary"] = "Org.OData.Core.V1.Dictionary";
    CoreAnnotationTypes["OptionalParameterType"] = "Org.OData.Core.V1.OptionalParameterType";
    CoreAnnotationTypes["GeometryFeatureType"] = "Org.OData.Core.V1.GeometryFeatureType";
})(CoreAnnotationTypes = exports.CoreAnnotationTypes || (exports.CoreAnnotationTypes = {}));
