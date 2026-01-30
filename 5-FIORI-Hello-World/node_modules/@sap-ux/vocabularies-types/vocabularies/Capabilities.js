"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapabilitiesAnnotationTypes = exports.CapabilitiesAnnotationTerms = exports.HttpMethodValues = exports.HttpMethod = exports.SearchExpressionsValues = exports.SearchExpressions = exports.NavigationTypeValues = exports.NavigationType = exports.IsolationLevelValues = exports.IsolationLevel = exports.ConformanceLevelTypeValues = exports.ConformanceLevelType = void 0;
// EnumType 
var ConformanceLevelType;
(function (ConformanceLevelType) {
    /**
    Minimal conformance level
    */
    /**
    undefined
    */
    ConformanceLevelType["Minimal"] = "Capabilities.ConformanceLevelType/Minimal";
    /**
    Intermediate conformance level
    */
    /**
    undefined
    */
    ConformanceLevelType["Intermediate"] = "Capabilities.ConformanceLevelType/Intermediate";
    /**
    Advanced conformance level
    */
    /**
    undefined
    */
    ConformanceLevelType["Advanced"] = "Capabilities.ConformanceLevelType/Advanced";
})(ConformanceLevelType = exports.ConformanceLevelType || (exports.ConformanceLevelType = {}));
var ConformanceLevelTypeValues;
(function (ConformanceLevelTypeValues) {
    /**
    Minimal conformance level
    */
    /**
    undefined
    */
    ConformanceLevelTypeValues[ConformanceLevelTypeValues["Minimal"] = 0] = "Minimal";
    /**
    Intermediate conformance level
    */
    /**
    undefined
    */
    ConformanceLevelTypeValues[ConformanceLevelTypeValues["Intermediate"] = 1] = "Intermediate";
    /**
    Advanced conformance level
    */
    /**
    undefined
    */
    ConformanceLevelTypeValues[ConformanceLevelTypeValues["Advanced"] = 2] = "Advanced";
})(ConformanceLevelTypeValues = exports.ConformanceLevelTypeValues || (exports.ConformanceLevelTypeValues = {}));
// EnumType 
var IsolationLevel;
(function (IsolationLevel) {
    /**
    All data returned for a request, including multiple requests within a batch or results retrieved across multiple pages, will be consistent as of a single point in time
    */
    /**
    undefined
    */
    IsolationLevel["Snapshot"] = "Capabilities.IsolationLevel/Snapshot";
})(IsolationLevel = exports.IsolationLevel || (exports.IsolationLevel = {}));
var IsolationLevelValues;
(function (IsolationLevelValues) {
    /**
    All data returned for a request, including multiple requests within a batch or results retrieved across multiple pages, will be consistent as of a single point in time
    */
    /**
    undefined
    */
    IsolationLevelValues[IsolationLevelValues["Snapshot"] = 1] = "Snapshot";
})(IsolationLevelValues = exports.IsolationLevelValues || (exports.IsolationLevelValues = {}));
// EnumType 
var NavigationType;
(function (NavigationType) {
    /**
    Navigation properties can be recursively navigated
    */
    /**
    undefined
    */
    NavigationType["Recursive"] = "Capabilities.NavigationType/Recursive";
    /**
    Navigation properties can be navigated to a single level
    */
    /**
    undefined
    */
    NavigationType["Single"] = "Capabilities.NavigationType/Single";
    /**
    Navigation properties are not navigable
    */
    /**
    undefined
    */
    NavigationType["None"] = "Capabilities.NavigationType/None";
})(NavigationType = exports.NavigationType || (exports.NavigationType = {}));
var NavigationTypeValues;
(function (NavigationTypeValues) {
    /**
    Navigation properties can be recursively navigated
    */
    /**
    undefined
    */
    NavigationTypeValues[NavigationTypeValues["Recursive"] = 0] = "Recursive";
    /**
    Navigation properties can be navigated to a single level
    */
    /**
    undefined
    */
    NavigationTypeValues[NavigationTypeValues["Single"] = 1] = "Single";
    /**
    Navigation properties are not navigable
    */
    /**
    undefined
    */
    NavigationTypeValues[NavigationTypeValues["None"] = 2] = "None";
})(NavigationTypeValues = exports.NavigationTypeValues || (exports.NavigationTypeValues = {}));
// EnumType 
var SearchExpressions;
(function (SearchExpressions) {
    /**
    Single search term
    */
    /**
    undefined
    */
    SearchExpressions["none"] = "Capabilities.SearchExpressions/none";
    /**
    Multiple search terms, optionally separated by `AND`
    */
    /**
    undefined
    */
    SearchExpressions["AND"] = "Capabilities.SearchExpressions/AND";
    /**
    Multiple search terms separated by `OR`
    */
    /**
    undefined
    */
    SearchExpressions["OR"] = "Capabilities.SearchExpressions/OR";
    /**
    Search terms preceded by `NOT`
    */
    /**
    undefined
    */
    SearchExpressions["NOT"] = "Capabilities.SearchExpressions/NOT";
    /**
    Search phrases enclosed in double quotes
    */
    /**
    undefined
    */
    SearchExpressions["phrase"] = "Capabilities.SearchExpressions/phrase";
    /**
    Precedence grouping of search expressions with parentheses
    */
    /**
    undefined
    */
    SearchExpressions["group"] = "Capabilities.SearchExpressions/group";
})(SearchExpressions = exports.SearchExpressions || (exports.SearchExpressions = {}));
var SearchExpressionsValues;
(function (SearchExpressionsValues) {
    /**
    Single search term
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["none"] = 0] = "none";
    /**
    Multiple search terms, optionally separated by `AND`
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["AND"] = 1] = "AND";
    /**
    Multiple search terms separated by `OR`
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["OR"] = 2] = "OR";
    /**
    Search terms preceded by `NOT`
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["NOT"] = 4] = "NOT";
    /**
    Search phrases enclosed in double quotes
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["phrase"] = 8] = "phrase";
    /**
    Precedence grouping of search expressions with parentheses
    */
    /**
    undefined
    */
    SearchExpressionsValues[SearchExpressionsValues["group"] = 16] = "group";
})(SearchExpressionsValues = exports.SearchExpressionsValues || (exports.SearchExpressionsValues = {}));
// EnumType 
var HttpMethod;
(function (HttpMethod) {
    /**
    The HTTP GET Method
    */
    /**
    undefined
    */
    HttpMethod["GET"] = "Capabilities.HttpMethod/GET";
    /**
    The HTTP PATCH Method
    */
    /**
    undefined
    */
    HttpMethod["PATCH"] = "Capabilities.HttpMethod/PATCH";
    /**
    The HTTP PUT Method
    */
    /**
    undefined
    */
    HttpMethod["PUT"] = "Capabilities.HttpMethod/PUT";
    /**
    The HTTP POST Method
    */
    /**
    undefined
    */
    HttpMethod["POST"] = "Capabilities.HttpMethod/POST";
    /**
    The HTTP DELETE Method
    */
    /**
    undefined
    */
    HttpMethod["DELETE"] = "Capabilities.HttpMethod/DELETE";
    /**
    The HTTP OPTIONS Method
    */
    /**
    undefined
    */
    HttpMethod["OPTIONS"] = "Capabilities.HttpMethod/OPTIONS";
    /**
    The HTTP HEAD Method
    */
    /**
    undefined
    */
    HttpMethod["HEAD"] = "Capabilities.HttpMethod/HEAD";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpMethodValues;
(function (HttpMethodValues) {
    /**
    The HTTP GET Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["GET"] = 1] = "GET";
    /**
    The HTTP PATCH Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["PATCH"] = 2] = "PATCH";
    /**
    The HTTP PUT Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["PUT"] = 4] = "PUT";
    /**
    The HTTP POST Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["POST"] = 8] = "POST";
    /**
    The HTTP DELETE Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["DELETE"] = 16] = "DELETE";
    /**
    The HTTP OPTIONS Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["OPTIONS"] = 32] = "OPTIONS";
    /**
    The HTTP HEAD Method
    */
    /**
    undefined
    */
    HttpMethodValues[HttpMethodValues["HEAD"] = 64] = "HEAD";
})(HttpMethodValues = exports.HttpMethodValues || (exports.HttpMethodValues = {}));
var CapabilitiesAnnotationTerms;
(function (CapabilitiesAnnotationTerms) {
    CapabilitiesAnnotationTerms["ConformanceLevel"] = "Org.OData.Capabilities.V1.ConformanceLevel";
    CapabilitiesAnnotationTerms["SupportedFormats"] = "Org.OData.Capabilities.V1.SupportedFormats";
    CapabilitiesAnnotationTerms["SupportedMetadataFormats"] = "Org.OData.Capabilities.V1.SupportedMetadataFormats";
    CapabilitiesAnnotationTerms["AcceptableEncodings"] = "Org.OData.Capabilities.V1.AcceptableEncodings";
    CapabilitiesAnnotationTerms["AsynchronousRequestsSupported"] = "Org.OData.Capabilities.V1.AsynchronousRequestsSupported";
    CapabilitiesAnnotationTerms["BatchContinueOnErrorSupported"] = "Org.OData.Capabilities.V1.BatchContinueOnErrorSupported";
    CapabilitiesAnnotationTerms["IsolationSupported"] = "Org.OData.Capabilities.V1.IsolationSupported";
    CapabilitiesAnnotationTerms["CrossJoinSupported"] = "Org.OData.Capabilities.V1.CrossJoinSupported";
    CapabilitiesAnnotationTerms["CallbackSupported"] = "Org.OData.Capabilities.V1.CallbackSupported";
    CapabilitiesAnnotationTerms["ChangeTracking"] = "Org.OData.Capabilities.V1.ChangeTracking";
    CapabilitiesAnnotationTerms["CountRestrictions"] = "Org.OData.Capabilities.V1.CountRestrictions";
    CapabilitiesAnnotationTerms["NavigationRestrictions"] = "Org.OData.Capabilities.V1.NavigationRestrictions";
    CapabilitiesAnnotationTerms["IndexableByKey"] = "Org.OData.Capabilities.V1.IndexableByKey";
    CapabilitiesAnnotationTerms["TopSupported"] = "Org.OData.Capabilities.V1.TopSupported";
    CapabilitiesAnnotationTerms["SkipSupported"] = "Org.OData.Capabilities.V1.SkipSupported";
    CapabilitiesAnnotationTerms["ComputeSupported"] = "Org.OData.Capabilities.V1.ComputeSupported";
    CapabilitiesAnnotationTerms["SelectSupport"] = "Org.OData.Capabilities.V1.SelectSupport";
    CapabilitiesAnnotationTerms["BatchSupported"] = "Org.OData.Capabilities.V1.BatchSupported";
    CapabilitiesAnnotationTerms["BatchSupport"] = "Org.OData.Capabilities.V1.BatchSupport";
    CapabilitiesAnnotationTerms["FilterFunctions"] = "Org.OData.Capabilities.V1.FilterFunctions";
    CapabilitiesAnnotationTerms["FilterRestrictions"] = "Org.OData.Capabilities.V1.FilterRestrictions";
    CapabilitiesAnnotationTerms["SortRestrictions"] = "Org.OData.Capabilities.V1.SortRestrictions";
    CapabilitiesAnnotationTerms["ExpandRestrictions"] = "Org.OData.Capabilities.V1.ExpandRestrictions";
    CapabilitiesAnnotationTerms["SearchRestrictions"] = "Org.OData.Capabilities.V1.SearchRestrictions";
    CapabilitiesAnnotationTerms["KeyAsSegmentSupported"] = "Org.OData.Capabilities.V1.KeyAsSegmentSupported";
    CapabilitiesAnnotationTerms["QuerySegmentSupported"] = "Org.OData.Capabilities.V1.QuerySegmentSupported";
    CapabilitiesAnnotationTerms["InsertRestrictions"] = "Org.OData.Capabilities.V1.InsertRestrictions";
    CapabilitiesAnnotationTerms["DeepInsertSupport"] = "Org.OData.Capabilities.V1.DeepInsertSupport";
    CapabilitiesAnnotationTerms["UpdateRestrictions"] = "Org.OData.Capabilities.V1.UpdateRestrictions";
    CapabilitiesAnnotationTerms["DeepUpdateSupport"] = "Org.OData.Capabilities.V1.DeepUpdateSupport";
    CapabilitiesAnnotationTerms["DeleteRestrictions"] = "Org.OData.Capabilities.V1.DeleteRestrictions";
    CapabilitiesAnnotationTerms["CollectionPropertyRestrictions"] = "Org.OData.Capabilities.V1.CollectionPropertyRestrictions";
    CapabilitiesAnnotationTerms["OperationRestrictions"] = "Org.OData.Capabilities.V1.OperationRestrictions";
    CapabilitiesAnnotationTerms["AnnotationValuesInQuerySupported"] = "Org.OData.Capabilities.V1.AnnotationValuesInQuerySupported";
    CapabilitiesAnnotationTerms["ModificationQueryOptions"] = "Org.OData.Capabilities.V1.ModificationQueryOptions";
    CapabilitiesAnnotationTerms["ReadRestrictions"] = "Org.OData.Capabilities.V1.ReadRestrictions";
    CapabilitiesAnnotationTerms["CustomHeaders"] = "Org.OData.Capabilities.V1.CustomHeaders";
    CapabilitiesAnnotationTerms["CustomQueryOptions"] = "Org.OData.Capabilities.V1.CustomQueryOptions";
    CapabilitiesAnnotationTerms["MediaLocationUpdateSupported"] = "Org.OData.Capabilities.V1.MediaLocationUpdateSupported";
    CapabilitiesAnnotationTerms["DefaultCapabilities"] = "Org.OData.Capabilities.V1.DefaultCapabilities";
})(CapabilitiesAnnotationTerms = exports.CapabilitiesAnnotationTerms || (exports.CapabilitiesAnnotationTerms = {}));
var CapabilitiesAnnotationTypes;
(function (CapabilitiesAnnotationTypes) {
    CapabilitiesAnnotationTypes["CallbackType"] = "Org.OData.Capabilities.V1.CallbackType";
    CapabilitiesAnnotationTypes["CallbackProtocol"] = "Org.OData.Capabilities.V1.CallbackProtocol";
    CapabilitiesAnnotationTypes["ChangeTrackingBase"] = "Org.OData.Capabilities.V1.ChangeTrackingBase";
    CapabilitiesAnnotationTypes["ChangeTrackingType"] = "Org.OData.Capabilities.V1.ChangeTrackingType";
    CapabilitiesAnnotationTypes["CountRestrictionsBase"] = "Org.OData.Capabilities.V1.CountRestrictionsBase";
    CapabilitiesAnnotationTypes["CountRestrictionsType"] = "Org.OData.Capabilities.V1.CountRestrictionsType";
    CapabilitiesAnnotationTypes["NavigationRestrictionsType"] = "Org.OData.Capabilities.V1.NavigationRestrictionsType";
    CapabilitiesAnnotationTypes["NavigationPropertyRestriction"] = "Org.OData.Capabilities.V1.NavigationPropertyRestriction";
    CapabilitiesAnnotationTypes["SelectSupportType"] = "Org.OData.Capabilities.V1.SelectSupportType";
    CapabilitiesAnnotationTypes["BatchSupportType"] = "Org.OData.Capabilities.V1.BatchSupportType";
    CapabilitiesAnnotationTypes["FilterRestrictionsBase"] = "Org.OData.Capabilities.V1.FilterRestrictionsBase";
    CapabilitiesAnnotationTypes["FilterRestrictionsType"] = "Org.OData.Capabilities.V1.FilterRestrictionsType";
    CapabilitiesAnnotationTypes["FilterExpressionRestrictionType"] = "Org.OData.Capabilities.V1.FilterExpressionRestrictionType";
    CapabilitiesAnnotationTypes["SortRestrictionsBase"] = "Org.OData.Capabilities.V1.SortRestrictionsBase";
    CapabilitiesAnnotationTypes["SortRestrictionsType"] = "Org.OData.Capabilities.V1.SortRestrictionsType";
    CapabilitiesAnnotationTypes["ExpandRestrictionsBase"] = "Org.OData.Capabilities.V1.ExpandRestrictionsBase";
    CapabilitiesAnnotationTypes["ExpandRestrictionsType"] = "Org.OData.Capabilities.V1.ExpandRestrictionsType";
    CapabilitiesAnnotationTypes["SearchRestrictionsType"] = "Org.OData.Capabilities.V1.SearchRestrictionsType";
    CapabilitiesAnnotationTypes["InsertRestrictionsBase"] = "Org.OData.Capabilities.V1.InsertRestrictionsBase";
    CapabilitiesAnnotationTypes["InsertRestrictionsType"] = "Org.OData.Capabilities.V1.InsertRestrictionsType";
    CapabilitiesAnnotationTypes["PermissionType"] = "Org.OData.Capabilities.V1.PermissionType";
    CapabilitiesAnnotationTypes["ScopeType"] = "Org.OData.Capabilities.V1.ScopeType";
    CapabilitiesAnnotationTypes["DeepInsertSupportType"] = "Org.OData.Capabilities.V1.DeepInsertSupportType";
    CapabilitiesAnnotationTypes["UpdateRestrictionsBase"] = "Org.OData.Capabilities.V1.UpdateRestrictionsBase";
    CapabilitiesAnnotationTypes["UpdateRestrictionsType"] = "Org.OData.Capabilities.V1.UpdateRestrictionsType";
    CapabilitiesAnnotationTypes["DeepUpdateSupportType"] = "Org.OData.Capabilities.V1.DeepUpdateSupportType";
    CapabilitiesAnnotationTypes["DeleteRestrictionsBase"] = "Org.OData.Capabilities.V1.DeleteRestrictionsBase";
    CapabilitiesAnnotationTypes["DeleteRestrictionsType"] = "Org.OData.Capabilities.V1.DeleteRestrictionsType";
    CapabilitiesAnnotationTypes["CollectionPropertyRestrictionsType"] = "Org.OData.Capabilities.V1.CollectionPropertyRestrictionsType";
    CapabilitiesAnnotationTypes["OperationRestrictionsType"] = "Org.OData.Capabilities.V1.OperationRestrictionsType";
    CapabilitiesAnnotationTypes["ModificationQueryOptionsType"] = "Org.OData.Capabilities.V1.ModificationQueryOptionsType";
    CapabilitiesAnnotationTypes["ReadRestrictionsBase"] = "Org.OData.Capabilities.V1.ReadRestrictionsBase";
    CapabilitiesAnnotationTypes["ReadByKeyRestrictionsType"] = "Org.OData.Capabilities.V1.ReadByKeyRestrictionsType";
    CapabilitiesAnnotationTypes["ReadRestrictionsType"] = "Org.OData.Capabilities.V1.ReadRestrictionsType";
    CapabilitiesAnnotationTypes["CustomParameter"] = "Org.OData.Capabilities.V1.CustomParameter";
    CapabilitiesAnnotationTypes["DefaultCapabilitiesType"] = "Org.OData.Capabilities.V1.DefaultCapabilitiesType";
    CapabilitiesAnnotationTypes["HttpResponse"] = "Org.OData.Capabilities.V1.HttpResponse";
})(CapabilitiesAnnotationTypes = exports.CapabilitiesAnnotationTypes || (exports.CapabilitiesAnnotationTypes = {}));
