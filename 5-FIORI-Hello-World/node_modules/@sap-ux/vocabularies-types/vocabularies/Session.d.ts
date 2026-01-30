import * as Core from "./Core";
import * as Common from "./Common";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  The annotated entity set allows data modification only within a sticky session
*/
export type StickySessionSupported = {
    term: SessionAnnotationTerms.StickySessionSupported;
} & AnnotationTerm<StickySessionSupportedTypeTypes>;
/**
  Actions for managing data modification within a sticky session
*/
export type StickySessionSupportedType = ComplexType & {
    $Type: SessionAnnotationTypes.StickySessionSupportedType;
    /**
        Bound action that initiates a sticky session for creating new entities in the targeted entity set or collection
    */
    NewAction: Common.QualifiedName;
    /**
        Additional bound actions that initiate a sticky session
    */
    AdditionalNewActions: Common.QualifiedName[];
    /**
        Bound action that initiates a sticky session for editing the targeted entity
    */
    EditAction: Common.QualifiedName;
    /**
        Bound action that saves a new or edited entity
    */
    SaveAction: Common.QualifiedName;
    /**
        Action import for an unbound action that discards all changes and terminates the sticky session
    */
    DiscardAction: Core.SimpleIdentifier;
};
export declare const enum SessionAnnotationTerms {
    StickySessionSupported = "com.sap.vocabularies.Session.v1.StickySessionSupported"
}
export declare const enum SessionAnnotationTypes {
    StickySessionSupportedType = "com.sap.vocabularies.Session.v1.StickySessionSupportedType"
}
export type StickySessionSupportedTypeTypes = StickySessionSupportedType;
