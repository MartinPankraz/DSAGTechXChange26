import * as Core from "./Core";
import * as Aggregation from "./Aggregation";
import * as Common from "./Common";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  Hierarchy-specific information in the result set of a hierarchical request
*/
export type RecursiveHierarchy = {
    term: HierarchyAnnotationTerms.RecursiveHierarchy;
} & AnnotationTerm<RecursiveHierarchyTypeTypes>;
export type HierarchyType = ComplexType & {
    $Type: HierarchyAnnotationTypes.HierarchyType;
    /**
        Number of entries from finer-grained aggregation levels that are expanded
    */
    LimitedDescendantCount?: Edm.Int64;
    /**
        Drill state of an entry
    */
    DrillState?: Edm.String;
    /**
        Position of the current aggregation level in the list of all aggregation levels
    */
    DistanceFromRoot?: Edm.Int64;
};
export type RecursiveHierarchyType = ComplexType & Omit<HierarchyType, '$Type'> & {
    $Type: HierarchyAnnotationTypes.RecursiveHierarchyType;
    /**
        Human-readable key value for a node
    */
    ExternalKey?: Edm.String;
    /**
        Type of a node
    */
    NodeType?: Edm.String;
    /**
        Number of descendants a node has in the limited hierarchy
    */
    LimitedDescendantCount?: Edm.Int64;
    /**
        Drill state of an occurrence of a node
    */
    DrillState?: Edm.String;
    /**
        Number of ancestors an occurrence of a node has in the limited hierarchy
    */
    DistanceFromRoot?: Edm.Int64;
    /**
        Number of children a node has in the unlimited hierarchy
    */
    ChildCount?: Edm.Int64;
    /**
        Number of descendants a node has in the unlimited hierarchy
    */
    DescendantCount?: Edm.Int64;
    /**
        Rank of a node in the limited hierarchy in preorder or postorder
    */
    LimitedRank?: Edm.Int64;
    /**
        Sibling rank of a node
    */
    SiblingRank?: Edm.Int64;
    /**
        Flag indicating [matching](#MatchCount) nodes
    */
    Matched?: Edm.Boolean;
    /**
        Number of [matching](#MatchCount) descendants a node has in the unlimited hierarchy
    */
    MatchedDescendantCount?: Edm.Int64;
};
/**
  Actions for maintaining the recursive hierarchy defined by the [base term](https://oasis-tcs.github.io/odata-vocabularies/vocabularies/Org.OData.Aggregation.V1.html#RecursiveHierarchy)
*/
export type RecursiveHierarchyActions = {
    term: HierarchyAnnotationTerms.RecursiveHierarchyActions;
} & AnnotationTerm<RecursiveHierarchyActionsTypeTypes>;
export type RecursiveHierarchyActionsType = ComplexType & {
    $Type: HierarchyAnnotationTypes.RecursiveHierarchyActionsType;
    /**
        Action that moves a node among its siblings, following [this template](#Template_ChangeNextSiblingAction)
    */
    ChangeNextSiblingAction?: Common.QualifiedName;
    /**
        Whether the sibling of a root can be changed
    */
    ChangeSiblingForRootsSupported: Edm.Boolean;
    /**
        Action that copies a node and its descendants, following [this template](#Template_CopyAction)
    */
    CopyAction?: Common.QualifiedName;
};
/**
  Instance annotation on the result of an `$apply` query option containing the number of matching nodes after hierarchical transformations
*/
export type MatchCount = {
    term: HierarchyAnnotationTerms.MatchCount;
} & AnnotationTerm<Edm.Int64>;
/**
  Returns the first n levels of a hierarchical collection in preorder with individual nodes expanded or collapsed
*/
export type TopLevels = (InputSet: Edm.EntityType, HierarchyNodes: Edm.EntityType, HierarchyQualifier: Aggregation.HierarchyQualifier, NodeProperty: any, Levels: Edm.Int64, Show: any, ExpandLevels: TopLevelsExpandType) => Edm.EntityType;
/**
  Information about nodes to be expanded
*/
export type TopLevelsExpandType = ComplexType & {
    $Type: HierarchyAnnotationTypes.TopLevelsExpandType;
    /**
        Identifier of a node to be expanded
    */
    NodeID: Edm.String;
    /**
        Number of levels to be expanded, null means all levels, 0 means collapsed
    */
    Levels?: Edm.Int64;
};
/**
  Whether the annotated collection acts as a [`RecursiveHierarchy`](#RecursiveHierarchy) with the given qualifier
*/
export type RecursiveHierarchySupported = {
    term: HierarchyAnnotationTerms.RecursiveHierarchySupported;
} & AnnotationTerm<Core.Tag>;
/**
  Template for actions that move a node among its siblings and are named in [`RecursiveHierarchyActions/ChangeNextSiblingAction`](#RecursiveHierarchyActionsType)
*/
export type Template_ChangeNextSiblingAction = (Node: Edm.EntityType, NextSibling: Edm.ComplexType) => void;
/**
  Template for actions that copy a node and its descendants and are named in [`RecursiveHierarchyActions/CopyAction`](#RecursiveHierarchyActionsType)
*/
export type Template_CopyAction = (Node: Edm.EntityType) => Edm.EntityType;
export declare const enum HierarchyAnnotationTerms {
    RecursiveHierarchy = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchy",
    RecursiveHierarchyActions = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchyActions",
    MatchCount = "com.sap.vocabularies.Hierarchy.v1.MatchCount",
    RecursiveHierarchySupported = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchySupported"
}
export declare const enum HierarchyAnnotationTypes {
    HierarchyType = "com.sap.vocabularies.Hierarchy.v1.HierarchyType",
    RecursiveHierarchyType = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchyType",
    RecursiveHierarchyActionsType = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchyActionsType",
    TopLevelsExpandType = "com.sap.vocabularies.Hierarchy.v1.TopLevelsExpandType"
}
export type HierarchyTypeTypes = HierarchyType | RecursiveHierarchyTypeTypes;
export type RecursiveHierarchyTypeTypes = RecursiveHierarchyType;
export type RecursiveHierarchyActionsTypeTypes = RecursiveHierarchyActionsType;
export type TopLevelsExpandTypeTypes = TopLevelsExpandType;
