import * as Core from "./Core";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
/**
  Primary meaning of the entities in the annotated entity set
*/
export type EntitySemantics = {
    term: PersonalDataAnnotationTerms.EntitySemantics;
} & AnnotationTerm<EntitySemanticsType>;
/**
  Role of the data subjects in this set (e.g. employee, customer)
*/
export type DataSubjectRole = {
    term: PersonalDataAnnotationTerms.DataSubjectRole;
} & AnnotationTerm<Edm.String>;
/**
  Language-dependent description of the role of the data subjects in this set (e.g. employee, customer)
*/
export type DataSubjectRoleDescription = {
    term: PersonalDataAnnotationTerms.DataSubjectRoleDescription;
} & AnnotationTerm<Edm.String>;
/**
  Primary meaning of the data contained in the annotated entity set
*/
export type EntitySemanticsType = Edm.String;
/**
  Primary meaning of the personal data contained in the annotated property
*/
export type FieldSemantics = {
    term: PersonalDataAnnotationTerms.FieldSemantics;
} & AnnotationTerm<FieldSemanticsType>;
/**
  Primary meaning of a data field
*/
export type FieldSemanticsType = Edm.String;
/**
  Property contains potentially personal data
*/
export type IsPotentiallyPersonal = {
    term: PersonalDataAnnotationTerms.IsPotentiallyPersonal;
} & AnnotationTerm<Core.Tag>;
/**
  Property contains potentially sensitive personal data
*/
export type IsPotentiallySensitive = {
    term: PersonalDataAnnotationTerms.IsPotentiallySensitive;
} & AnnotationTerm<Core.Tag>;
export declare const enum PersonalDataAnnotationTerms {
    EntitySemantics = "com.sap.vocabularies.PersonalData.v1.EntitySemantics",
    DataSubjectRole = "com.sap.vocabularies.PersonalData.v1.DataSubjectRole",
    DataSubjectRoleDescription = "com.sap.vocabularies.PersonalData.v1.DataSubjectRoleDescription",
    FieldSemantics = "com.sap.vocabularies.PersonalData.v1.FieldSemantics",
    IsPotentiallyPersonal = "com.sap.vocabularies.PersonalData.v1.IsPotentiallyPersonal",
    IsPotentiallySensitive = "com.sap.vocabularies.PersonalData.v1.IsPotentiallySensitive"
}
export declare const enum PersonalDataAnnotationTypes {
}
