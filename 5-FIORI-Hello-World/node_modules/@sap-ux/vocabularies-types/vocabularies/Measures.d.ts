import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import PropertyAnnotationValue = Edm.PropertyAnnotationValue;
/**
  The currency for this monetary amount as an ISO 4217 currency code
*/
export type ISOCurrency = {
    term: MeasuresAnnotationTerms.ISOCurrency;
} & AnnotationTerm<PropertyAnnotationValue<Edm.String>>;
/**
  The number of significant decimal places in the scale part (less than or equal to the number declared in the Scale facet)
*/
export type Scale = {
    term: MeasuresAnnotationTerms.Scale;
} & AnnotationTerm<Edm.Byte>;
/**
  The unit of measure for this measured quantity, e.g. cm for centimeters or % for percentages
*/
export type Unit = {
    term: MeasuresAnnotationTerms.Unit;
} & AnnotationTerm<PropertyAnnotationValue<Edm.String>>;
/**
  The unit of measure for this measured quantity, according to the [UN/CEFACT Recommendation 20](http://tfig.unece.org/contents/recommendation-20.htm)
*/
export type UNECEUnit = {
    term: MeasuresAnnotationTerms.UNECEUnit;
} & AnnotationTerm<Edm.String>;
/**
  The minimum granularity of duration values.
*/
export type DurationGranularity = {
    term: MeasuresAnnotationTerms.DurationGranularity;
} & AnnotationTerm<DurationGranularityType>;
export type DurationGranularityType = Edm.String;
export declare const enum MeasuresAnnotationTerms {
    ISOCurrency = "Org.OData.Measures.V1.ISOCurrency",
    Scale = "Org.OData.Measures.V1.Scale",
    Unit = "Org.OData.Measures.V1.Unit",
    UNECEUnit = "Org.OData.Measures.V1.UNECEUnit",
    DurationGranularity = "Org.OData.Measures.V1.DurationGranularity"
}
export declare const enum MeasuresAnnotationTypes {
}
