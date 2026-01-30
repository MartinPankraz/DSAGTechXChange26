import * as Core from "./Core";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  CSS definitions that may be used as defaults
*/
export type CssDefaults = {
    term: HTML5AnnotationTerms.CssDefaults;
} & AnnotationTerm<CssDefaultsTypeTypes>;
export type CssDefaultsType = ComplexType & {
    $Type: HTML5AnnotationTypes.CssDefaultsType;
    /**
        css: width, see https://www.w3.org/TR/CSS21/visudet.html#propdef-width
    */
    width?: Edm.String;
};
/**
  Where to open a link for the annotated [URL](https://oasis-tcs.github.io/odata-vocabularies/vocabularies/Org.OData.Core.V1.html#IsURL)
*/
export type LinkTarget = {
    term: HTML5AnnotationTerms.LinkTarget;
} & AnnotationTerm<LinkTargetType>;
/**
  The values are interpreted like the [target attribute](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-target) in HTML
*/
export type LinkTargetType = Edm.String;
/**
  The annotated data field might use a rowSpan for adjacent duplicate values if used in a table.
*/
export type RowSpanForDuplicateValues = {
    term: HTML5AnnotationTerms.RowSpanForDuplicateValues;
} & AnnotationTerm<Core.Tag>;
export declare const enum HTML5AnnotationTerms {
    CssDefaults = "com.sap.vocabularies.HTML5.v1.CssDefaults",
    LinkTarget = "com.sap.vocabularies.HTML5.v1.LinkTarget",
    RowSpanForDuplicateValues = "com.sap.vocabularies.HTML5.v1.RowSpanForDuplicateValues"
}
export declare const enum HTML5AnnotationTypes {
    CssDefaultsType = "com.sap.vocabularies.HTML5.v1.CssDefaultsType"
}
export type CssDefaultsTypeTypes = CssDefaultsType;
