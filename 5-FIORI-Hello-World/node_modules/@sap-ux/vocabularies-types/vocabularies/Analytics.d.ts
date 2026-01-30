import * as Core from "./Core";
import * as Aggregation from "./Aggregation";
import * as Hierarchy from "./Hierarchy";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  A property holding the key of a dimension in an analytical context
*/
export type Dimension = {
    term: AnalyticsAnnotationTerms.Dimension;
} & AnnotationTerm<Core.Tag>;
/**
  A property holding the numeric value of a measure in an analytical context
*/
export type Measure = {
    term: AnalyticsAnnotationTerms.Measure;
} & AnnotationTerm<Core.Tag>;
/**
  The measure has non-negative and additive values; it can be used in whole-part charts, e.g. the Donut
*/
export type AccumulativeMeasure = {
    term: AnalyticsAnnotationTerms.AccumulativeMeasure;
} & AnnotationTerm<Core.Tag>;
/**
  Number of properties in the entity instance that have been aggregated away
*/
export type RolledUpPropertyCount = {
    term: AnalyticsAnnotationTerms.RolledUpPropertyCount;
} & AnnotationTerm<Edm.Int16>;
/**
  
            URL to retrieve more detailed data related to a node of a recursive hierarchy.
            Annotations with this term MUST include a qualifier to select the hierarchy for which the drill URL is provided.
          
*/
export type DrillURL = {
    term: AnalyticsAnnotationTerms.DrillURL;
} & AnnotationTerm<Edm.String>;
/**
   Processes or generates plan data. Its logic may have side-effects on entity sets.
          
*/
export type PlanningAction = {
    term: AnalyticsAnnotationTerms.PlanningAction;
} & AnnotationTerm<Core.Tag>;
/**
  Dynamic properties for aggregate expressions with specified aggregation method defined on the annotated entity type.
*/
export type AggregatedProperties = {
    term: AnalyticsAnnotationTerms.AggregatedProperties;
} & AnnotationTerm<AggregatedPropertyTypeTypes[]>;
/**
  Dynamic property for aggregate expression with specified aggregation method defined on the annotated entity type.
*/
export type AggregatedProperty = {
    term: AnalyticsAnnotationTerms.AggregatedProperty;
} & AnnotationTerm<AggregatedPropertyTypeTypes>;
export type AggregatedPropertyType = ComplexType & {
    $Type: AnalyticsAnnotationTypes.AggregatedPropertyType;
    /**
        Name of the dynamic property holding the aggregated value.
    */
    Name: Core.SimpleIdentifier;
    /**
        Name of the standard or custom aggregation method to be applied.
    */
    AggregationMethod: Aggregation.AggregationMethod;
    /**
        Property whose values shall be aggregated.
    */
    AggregatableProperty: Edm.PropertyPath;
};
/**
  Collection of properties that define an analytical context
*/
export type AnalyticalContext = {
    term: AnalyticsAnnotationTerms.AnalyticalContext;
} & AnnotationTerm<AnalyticalContextTypeTypes[]>;
/**
  Exactly one of `Property` and `DynamicProperty` must be present
*/
export type AnalyticalContextType = ComplexType & {
    $Type: AnalyticsAnnotationTypes.AnalyticalContextType;
    /**
        Property that is part of the analytical context
    */
    Property?: Edm.PropertyPath;
    /**
        Dynamic property introduced by annotations that is part of the analytical context
    */
    DynamicProperty?: Edm.AnnotationPath<AggregatedProperty | Aggregation.CustomAggregate>;
    /**
        The property holds the key of a dimension
    */
    Dimension: Core.Tag;
    /**
        The property holds the numeric value of a measure
    */
    Measure: Core.Tag;
    /**
        The measure has non-negative and additive values; it can be used in whole-part charts, e.g. the Donut
    */
    AccumulativeMeasure: Core.Tag;
};
/**
  `$apply` transformation that expands an unnamed leveled hierarchy with custom aggregation of certain properties
*/
export type MultiLevelExpand = (InputSet: Edm.EntityType, LevelProperties: MultiLevelExpandLevel, Aggregation: any, SiblingOrder: MultiLevelExpandSiblingOrder, Levels: Edm.Int64, ExpandLevels: MultiLevelExpandEntry, SubtotalsAtBottom: Edm.Boolean) => Edm.EntityType;
/**
  Property names constituting a level in an [unnamed leveled hierarchy](#MultiLevelExpand)
*/
export type MultiLevelExpandLevel = ComplexType & {
    $Type: AnalyticsAnnotationTypes.MultiLevelExpandLevel;
    /**
        A non-empty list of property names that define a combination of dimension values
    */
    DimensionProperties: Edm.String[];
    /**
        A possibly empty list of names of additional properties of the dimensions that occur in `DimensionProperties`
    */
    AdditionalProperties: Edm.String[];
};
/**
  Sibling order in an [unnamed leveled hierarchy](#MultiLevelExpand)
*/
export type MultiLevelExpandSiblingOrder = ComplexType & {
    $Type: AnalyticsAnnotationTypes.MultiLevelExpandSiblingOrder;
    /**
        Property by which to sort
    */
    Property: Edm.String;
    /**
        Sort direction, ascending if not specified otherwise
    */
    Descending?: Edm.Boolean;
};
/**
  Expansion state of an entry in an [unnamed leveled hierarchy](#MultiLevelExpand)
*/
export type MultiLevelExpandEntry = ComplexType & {
    $Type: AnalyticsAnnotationTypes.MultiLevelExpandEntry;
    /**
        An entry on a given [level](#MultiLevelExpandLevel) is identified by a list of values for the `DimensionProperties` that constitute all levels up to and including the given one
    */
    Entry: Edm.String[];
    /**
        Number of levels to be expanded, null means all levels, 0 means collapsed
    */
    Levels?: Edm.Int64;
};
/**
  Information about grouping levels in the result set of a request including the [`MultiLevelExpand`](#MultiLevelExpand) transformation
*/
export type LevelInformation = {
    term: AnalyticsAnnotationTerms.LevelInformation;
} & AnnotationTerm<Hierarchy.HierarchyType>;
export declare const enum AnalyticsAnnotationTerms {
    Dimension = "com.sap.vocabularies.Analytics.v1.Dimension",
    Measure = "com.sap.vocabularies.Analytics.v1.Measure",
    AccumulativeMeasure = "com.sap.vocabularies.Analytics.v1.AccumulativeMeasure",
    RolledUpPropertyCount = "com.sap.vocabularies.Analytics.v1.RolledUpPropertyCount",
    DrillURL = "com.sap.vocabularies.Analytics.v1.DrillURL",
    PlanningAction = "com.sap.vocabularies.Analytics.v1.PlanningAction",
    AggregatedProperties = "com.sap.vocabularies.Analytics.v1.AggregatedProperties",
    AggregatedProperty = "com.sap.vocabularies.Analytics.v1.AggregatedProperty",
    AnalyticalContext = "com.sap.vocabularies.Analytics.v1.AnalyticalContext",
    LevelInformation = "com.sap.vocabularies.Analytics.v1.LevelInformation"
}
export declare const enum AnalyticsAnnotationTypes {
    AggregatedPropertyType = "com.sap.vocabularies.Analytics.v1.AggregatedPropertyType",
    AnalyticalContextType = "com.sap.vocabularies.Analytics.v1.AnalyticalContextType",
    MultiLevelExpandLevel = "com.sap.vocabularies.Analytics.v1.MultiLevelExpandLevel",
    MultiLevelExpandSiblingOrder = "com.sap.vocabularies.Analytics.v1.MultiLevelExpandSiblingOrder",
    MultiLevelExpandEntry = "com.sap.vocabularies.Analytics.v1.MultiLevelExpandEntry"
}
export type AggregatedPropertyTypeTypes = AggregatedPropertyType;
export type AnalyticalContextTypeTypes = AnalyticalContextType;
export type MultiLevelExpandLevelTypes = MultiLevelExpandLevel;
export type MultiLevelExpandSiblingOrderTypes = MultiLevelExpandSiblingOrder;
export type MultiLevelExpandEntryTypes = MultiLevelExpandEntry;
