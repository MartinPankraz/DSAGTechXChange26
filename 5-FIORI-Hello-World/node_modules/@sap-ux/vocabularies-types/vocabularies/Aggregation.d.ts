import * as Core from "./Core";
import * as Capabilities from "./Capabilities";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  This entity set or collection supports the `$apply` system query option
*/
export type ApplySupported = {
    term: AggregationAnnotationTerms.ApplySupported;
} & AnnotationTerm<ApplySupportedTypeTypes>;
/**
  Default support of the `$apply` system query option for all collection-valued resources in the container
*/
export type ApplySupportedDefaults = {
    term: AggregationAnnotationTerms.ApplySupportedDefaults;
} & AnnotationTerm<ApplySupportedBaseTypes>;
export type ApplySupportedBase = ComplexType & {
    $Type: AggregationAnnotationTypes.ApplySupportedBase;
    /**
        Transformations that can be used in `$apply`
    */
    Transformations: Transformation[];
    /**
        Qualified names of custom aggregation methods that can be used in `aggregate(...with...)`
    */
    CustomAggregationMethods: Edm.String[];
    /**
        The service supports rollup hierarchies in a `groupby` transformation
    */
    Rollup: RollupType;
    /**
        The service supports the `from` keyword in an `aggregate` transformation
    */
    From: Edm.Boolean;
};
export type ApplySupportedType = ComplexType & Omit<ApplySupportedBase, '$Type'> & {
    $Type: AggregationAnnotationTypes.ApplySupportedType;
    /**
        Only properties marked as `Groupable` can be used in the `groupby` transformation, and only those marked as `Aggregatable` can be used in the  `aggregate` transformation
    */
    PropertyRestrictions: Edm.Boolean;
    /**
        A non-empty collection indicates that only the listed properties of the annotated target are supported by the `groupby` transformation
    */
    GroupableProperties: Edm.AnyPropertyPath[];
    /**
        A non-empty collection indicates that only the listed properties of the annotated target can be used in the `aggregate` transformation, optionally restricted to the specified aggregation methods
    */
    AggregatableProperties: AggregatablePropertyTypeTypes[];
};
export type AggregatablePropertyType = ComplexType & {
    $Type: AggregationAnnotationTypes.AggregatablePropertyType;
    /**
        Aggregatable property
    */
    Property: Edm.PropertyPath;
    /**
        Standard and custom aggregation methods that can be applied to the property. If omitted, all aggregation methods can be applied
    */
    SupportedAggregationMethods: AggregationMethod[];
    /**
        Recommended method for aggregating values of the property
    */
    RecommendedAggregationMethod?: AggregationMethod;
};
/**
  A transformation that can be used in `$apply`
*/
export type Transformation = Edm.String;
/**
  Standard or custom aggregation method
*/
export type AggregationMethod = Edm.String;
/**
  The number of `rollup` or `rolluprecursive` operators allowed in a `groupby` transformation
*/
export declare const enum RollupType {
    /**
    No support for `rollup` or `rolluprecursive`
    */
    /**
    undefined
    */
    None = "Aggregation.RollupType/None",
    /**
    Only one `rollup` or `rolluprecursive` operator per `groupby`
    */
    /**
    undefined
    */
    SingleHierarchy = "Aggregation.RollupType/SingleHierarchy",
    /**
    Full support for `rollup` and `rolluprecursive`
    */
    /**
    undefined
    */
    MultipleHierarchies = "Aggregation.RollupType/MultipleHierarchies"
}
export declare const enum RollupTypeValues {
    /**
    No support for `rollup` or `rolluprecursive`
    */
    /**
    undefined
    */
    None = 0,
    /**
    Only one `rollup` or `rolluprecursive` operator per `groupby`
    */
    /**
    undefined
    */
    SingleHierarchy = 1,
    /**
    Full support for `rollup` and `rolluprecursive`
    */
    /**
    undefined
    */
    MultipleHierarchies = 2
}
/**
  This property can be used in the `groupby` transformation
*/
export type Groupable = {
    term: AggregationAnnotationTerms.Groupable;
} & AnnotationTerm<Core.Tag>;
/**
  This property can be used in the `aggregate` transformation
*/
export type Aggregatable = {
    term: AggregationAnnotationTerms.Aggregatable;
} & AnnotationTerm<Core.Tag>;
/**
  Dynamic property that can be used in the `aggregate` transformation
*/
export type CustomAggregate = {
    term: AggregationAnnotationTerms.CustomAggregate;
} & AnnotationTerm<Edm.String>;
/**
  The annotated property or custom aggregate is only well-defined in the context of these properties
*/
export type ContextDefiningProperties = {
    term: AggregationAnnotationTerms.ContextDefiningProperties;
} & AnnotationTerm<Edm.PropertyPath[]>;
/**
  Defines a leveled hierarchy (OData-Data-Agg-v4.0, section 5.5.1)
*/
export type LeveledHierarchy = {
    term: AggregationAnnotationTerms.LeveledHierarchy;
} & AnnotationTerm<Edm.PropertyPath[]>;
/**
  Defines a recursive hierarchy (OData-Data-Agg-v4.0, section 5.5.2)
*/
export type RecursiveHierarchy = {
    term: AggregationAnnotationTerms.RecursiveHierarchy;
} & AnnotationTerm<RecursiveHierarchyTypeTypes>;
export type RecursiveHierarchyType = ComplexType & {
    $Type: AggregationAnnotationTypes.RecursiveHierarchyType;
    /**
        Primitive property holding the node identifier
    */
    NodeProperty: Edm.PropertyPath;
    /**
        Property for navigating to the parent node(s). Its type MUST be the entity type annotated with this term, and it MUST be collection-valued or nullable single-valued.
    */
    ParentNavigationProperty: Edm.NavigationPropertyPath;
};
/**
  Qualifier of a [`RecursiveHierarchy`](#RecursiveHierarchy) annotation
*/
export type HierarchyQualifier = Edm.String;
/**
  Is the entity a node of the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`)? (See OData-Data-Agg-v4.0, section 5.5.2.1)
*/
export type isnode = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType) => Edm.Boolean;
/**
  Is the entity a root node of the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`)?
*/
export type isroot = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType) => Edm.Boolean;
/**
  Is the entity a descendant node of the ancestor node in the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`) with at most the specified distance? (See OData-Data-Agg-v4.0, section 5.5.2.1)
*/
export type isdescendant = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType, Ancestor: Edm.PrimitiveType, MaxDistance: Edm.Int16, IncludeSelf: Edm.Boolean) => Edm.Boolean;
/**
  Is the entity an ancestor node of the descendant node in the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`) with at most the specified distance? (See OData-Data-Agg-v4.0, section 5.5.2.1)
*/
export type isancestor = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType, Descendant: Edm.PrimitiveType, MaxDistance: Edm.Int16, IncludeSelf: Edm.Boolean) => Edm.Boolean;
/**
  Is the entity a sibling node of the other node in the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`)? (See OData-Data-Agg-v4.0, section 5.5.2.1)
*/
export type issibling = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType, Other: Edm.PrimitiveType) => Edm.Boolean;
/**
  Is the entity a leaf node in the hierarchy specified by the [parameter pair](#HierarchyQualifier) (`HierarchyNodes`, `HierarchyQualifier`)? (See OData-Data-Agg-v4.0, section 5.5.2.1)
*/
export type isleaf = (HierarchyNodes: Edm.EntityType, HierarchyQualifier: HierarchyQualifier, Node: Edm.PrimitiveType) => Edm.Boolean;
/**
  During `rolluprecursive` for a hierarchy node, this function returns the node
*/
export type rollupnode = (Position: Edm.Int16) => Edm.EntityType;
/**
  The string values of the node identifiers in a path from the annotated node to a start node in a traversal of a recursive hierarchy
*/
export type UpPath = {
    term: AggregationAnnotationTerms.UpPath;
} & AnnotationTerm<Edm.String[]>;
/**
  This function is available on aggregated entities if the `RequiredProperties` are still defined
*/
export type AvailableOnAggregates = {
    term: AggregationAnnotationTerms.AvailableOnAggregates;
} & AnnotationTerm<AvailableOnAggregatesTypeTypes>;
export type AvailableOnAggregatesType = ComplexType & {
    $Type: AggregationAnnotationTypes.AvailableOnAggregatesType;
    /**
        Properties required to apply this function
    */
    RequiredProperties: Edm.PropertyPath[];
};
/**
  Aggregation capabilities on a navigation path
*/
export type NavigationPropertyAggregationCapabilities = ComplexType & Omit<Capabilities.NavigationPropertyRestriction, '$Type'> & {
    $Type: AggregationAnnotationTypes.NavigationPropertyAggregationCapabilities;
    /**
        Support for `$apply`
    */
    ApplySupported?: ApplySupportedTypeTypes;
    /**
        Supported custom aggregates
    */
    CustomAggregates: CustomAggregateTypeTypes[];
};
export type CustomAggregateType = ComplexType & {
    $Type: AggregationAnnotationTypes.CustomAggregateType;
    /**
        Name of the dynamic property that can be used in the `aggregate` transformation
    */
    Name: Edm.String;
    /**
        Qualified name of a primitive type. The aggregated value will be of that type
    */
    Type: Edm.String;
};
export declare const enum AggregationAnnotationTerms {
    ApplySupported = "Org.OData.Aggregation.V1.ApplySupported",
    ApplySupportedDefaults = "Org.OData.Aggregation.V1.ApplySupportedDefaults",
    Groupable = "Org.OData.Aggregation.V1.Groupable",
    Aggregatable = "Org.OData.Aggregation.V1.Aggregatable",
    CustomAggregate = "Org.OData.Aggregation.V1.CustomAggregate",
    ContextDefiningProperties = "Org.OData.Aggregation.V1.ContextDefiningProperties",
    LeveledHierarchy = "Org.OData.Aggregation.V1.LeveledHierarchy",
    RecursiveHierarchy = "Org.OData.Aggregation.V1.RecursiveHierarchy",
    UpPath = "Org.OData.Aggregation.V1.UpPath",
    AvailableOnAggregates = "Org.OData.Aggregation.V1.AvailableOnAggregates"
}
export declare const enum AggregationAnnotationTypes {
    ApplySupportedBase = "Org.OData.Aggregation.V1.ApplySupportedBase",
    ApplySupportedType = "Org.OData.Aggregation.V1.ApplySupportedType",
    AggregatablePropertyType = "Org.OData.Aggregation.V1.AggregatablePropertyType",
    RecursiveHierarchyType = "Org.OData.Aggregation.V1.RecursiveHierarchyType",
    AvailableOnAggregatesType = "Org.OData.Aggregation.V1.AvailableOnAggregatesType",
    NavigationPropertyAggregationCapabilities = "Org.OData.Aggregation.V1.NavigationPropertyAggregationCapabilities",
    CustomAggregateType = "Org.OData.Aggregation.V1.CustomAggregateType"
}
export type ApplySupportedBaseTypes = ApplySupportedBase | ApplySupportedTypeTypes;
export type ApplySupportedTypeTypes = ApplySupportedType;
export type AggregatablePropertyTypeTypes = AggregatablePropertyType;
export type RecursiveHierarchyTypeTypes = RecursiveHierarchyType;
export type AvailableOnAggregatesTypeTypes = AvailableOnAggregatesType;
export type NavigationPropertyAggregationCapabilitiesTypes = NavigationPropertyAggregationCapabilities;
export type NavigationPropertyRestrictionTypes = Capabilities.NavigationPropertyRestriction | NavigationPropertyAggregationCapabilitiesTypes;
export type CustomAggregateTypeTypes = CustomAggregateType;
