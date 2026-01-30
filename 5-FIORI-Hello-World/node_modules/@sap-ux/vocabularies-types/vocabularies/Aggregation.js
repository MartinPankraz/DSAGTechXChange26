"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationAnnotationTypes = exports.AggregationAnnotationTerms = exports.RollupTypeValues = exports.RollupType = void 0;
// EnumType 
/**
  The number of `rollup` or `rolluprecursive` operators allowed in a `groupby` transformation
*/
var RollupType;
(function (RollupType) {
    /**
    No support for `rollup` or `rolluprecursive`
    */
    /**
    undefined
    */
    RollupType["None"] = "Aggregation.RollupType/None";
    /**
    Only one `rollup` or `rolluprecursive` operator per `groupby`
    */
    /**
    undefined
    */
    RollupType["SingleHierarchy"] = "Aggregation.RollupType/SingleHierarchy";
    /**
    Full support for `rollup` and `rolluprecursive`
    */
    /**
    undefined
    */
    RollupType["MultipleHierarchies"] = "Aggregation.RollupType/MultipleHierarchies";
})(RollupType = exports.RollupType || (exports.RollupType = {}));
var RollupTypeValues;
(function (RollupTypeValues) {
    /**
    No support for `rollup` or `rolluprecursive`
    */
    /**
    undefined
    */
    RollupTypeValues[RollupTypeValues["None"] = 0] = "None";
    /**
    Only one `rollup` or `rolluprecursive` operator per `groupby`
    */
    /**
    undefined
    */
    RollupTypeValues[RollupTypeValues["SingleHierarchy"] = 1] = "SingleHierarchy";
    /**
    Full support for `rollup` and `rolluprecursive`
    */
    /**
    undefined
    */
    RollupTypeValues[RollupTypeValues["MultipleHierarchies"] = 2] = "MultipleHierarchies";
})(RollupTypeValues = exports.RollupTypeValues || (exports.RollupTypeValues = {}));
var AggregationAnnotationTerms;
(function (AggregationAnnotationTerms) {
    AggregationAnnotationTerms["ApplySupported"] = "Org.OData.Aggregation.V1.ApplySupported";
    AggregationAnnotationTerms["ApplySupportedDefaults"] = "Org.OData.Aggregation.V1.ApplySupportedDefaults";
    AggregationAnnotationTerms["Groupable"] = "Org.OData.Aggregation.V1.Groupable";
    AggregationAnnotationTerms["Aggregatable"] = "Org.OData.Aggregation.V1.Aggregatable";
    AggregationAnnotationTerms["CustomAggregate"] = "Org.OData.Aggregation.V1.CustomAggregate";
    AggregationAnnotationTerms["ContextDefiningProperties"] = "Org.OData.Aggregation.V1.ContextDefiningProperties";
    AggregationAnnotationTerms["LeveledHierarchy"] = "Org.OData.Aggregation.V1.LeveledHierarchy";
    AggregationAnnotationTerms["RecursiveHierarchy"] = "Org.OData.Aggregation.V1.RecursiveHierarchy";
    AggregationAnnotationTerms["UpPath"] = "Org.OData.Aggregation.V1.UpPath";
    AggregationAnnotationTerms["AvailableOnAggregates"] = "Org.OData.Aggregation.V1.AvailableOnAggregates";
})(AggregationAnnotationTerms = exports.AggregationAnnotationTerms || (exports.AggregationAnnotationTerms = {}));
var AggregationAnnotationTypes;
(function (AggregationAnnotationTypes) {
    AggregationAnnotationTypes["ApplySupportedBase"] = "Org.OData.Aggregation.V1.ApplySupportedBase";
    AggregationAnnotationTypes["ApplySupportedType"] = "Org.OData.Aggregation.V1.ApplySupportedType";
    AggregationAnnotationTypes["AggregatablePropertyType"] = "Org.OData.Aggregation.V1.AggregatablePropertyType";
    AggregationAnnotationTypes["RecursiveHierarchyType"] = "Org.OData.Aggregation.V1.RecursiveHierarchyType";
    AggregationAnnotationTypes["AvailableOnAggregatesType"] = "Org.OData.Aggregation.V1.AvailableOnAggregatesType";
    AggregationAnnotationTypes["NavigationPropertyAggregationCapabilities"] = "Org.OData.Aggregation.V1.NavigationPropertyAggregationCapabilities";
    AggregationAnnotationTypes["CustomAggregateType"] = "Org.OData.Aggregation.V1.CustomAggregateType";
})(AggregationAnnotationTypes = exports.AggregationAnnotationTypes || (exports.AggregationAnnotationTypes = {}));
