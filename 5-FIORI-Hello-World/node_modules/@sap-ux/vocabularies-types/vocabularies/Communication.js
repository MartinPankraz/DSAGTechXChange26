"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationAnnotationTypes = exports.CommunicationAnnotationTerms = exports.GenderTypeValues = exports.GenderType = exports.PhoneTypeValues = exports.PhoneType = exports.ContactInformationTypeValues = exports.ContactInformationType = exports.KindTypeValues = exports.KindType = void 0;
// EnumType 
var KindType;
(function (KindType) {
    /**
    A single person or entity
    */
    /**
    undefined
    */
    KindType["individual"] = "Communication.KindType/individual";
    /**
    A group of persons or entities
    */
    /**
    undefined
    */
    KindType["group"] = "Communication.KindType/group";
    /**
    An organization
    */
    /**
    undefined
    */
    KindType["org"] = "Communication.KindType/org";
    /**
    A named geographical place
    */
    /**
    undefined
    */
    KindType["location"] = "Communication.KindType/location";
})(KindType = exports.KindType || (exports.KindType = {}));
var KindTypeValues;
(function (KindTypeValues) {
    /**
    A single person or entity
    */
    /**
    undefined
    */
    KindTypeValues[KindTypeValues["individual"] = 0] = "individual";
    /**
    A group of persons or entities
    */
    /**
    undefined
    */
    KindTypeValues[KindTypeValues["group"] = 1] = "group";
    /**
    An organization
    */
    /**
    undefined
    */
    KindTypeValues[KindTypeValues["org"] = 2] = "org";
    /**
    A named geographical place
    */
    /**
    undefined
    */
    KindTypeValues[KindTypeValues["location"] = 3] = "location";
})(KindTypeValues = exports.KindTypeValues || (exports.KindTypeValues = {}));
// EnumType 
var ContactInformationType;
(function (ContactInformationType) {
    /**
    Related to an individual's work place
    */
    /**
    undefined
    */
    ContactInformationType["work"] = "Communication.ContactInformationType/work";
    /**
    Related to an indivdual's personal life
    */
    /**
    undefined
    */
    ContactInformationType["home"] = "Communication.ContactInformationType/home";
    /**
    Preferred-use contact information
    */
    /**
    undefined
    */
    ContactInformationType["preferred"] = "Communication.ContactInformationType/preferred";
})(ContactInformationType = exports.ContactInformationType || (exports.ContactInformationType = {}));
var ContactInformationTypeValues;
(function (ContactInformationTypeValues) {
    /**
    Related to an individual's work place
    */
    /**
    undefined
    */
    ContactInformationTypeValues[ContactInformationTypeValues["work"] = 1] = "work";
    /**
    Related to an indivdual's personal life
    */
    /**
    undefined
    */
    ContactInformationTypeValues[ContactInformationTypeValues["home"] = 2] = "home";
    /**
    Preferred-use contact information
    */
    /**
    undefined
    */
    ContactInformationTypeValues[ContactInformationTypeValues["preferred"] = 4] = "preferred";
})(ContactInformationTypeValues = exports.ContactInformationTypeValues || (exports.ContactInformationTypeValues = {}));
// EnumType 
var PhoneType;
(function (PhoneType) {
    /**
    Work telephone number
    */
    /**
    undefined
    */
    PhoneType["work"] = "Communication.PhoneType/work";
    /**
    Private telephone number
    */
    /**
    undefined
    */
    PhoneType["home"] = "Communication.PhoneType/home";
    /**
    Preferred-use telephone number
    */
    /**
    undefined
    */
    PhoneType["preferred"] = "Communication.PhoneType/preferred";
    /**
    Voice telephone number
    */
    /**
    undefined
    */
    PhoneType["voice"] = "Communication.PhoneType/voice";
    /**
    Cellular or mobile telephone number
    */
    /**
    undefined
    */
    PhoneType["cell"] = "Communication.PhoneType/cell";
    /**
    Facsimile telephone number
    */
    /**
    undefined
    */
    PhoneType["fax"] = "Communication.PhoneType/fax";
    /**
    Video conferencing telephone number
    */
    /**
    undefined
    */
    PhoneType["video"] = "Communication.PhoneType/video";
})(PhoneType = exports.PhoneType || (exports.PhoneType = {}));
var PhoneTypeValues;
(function (PhoneTypeValues) {
    /**
    Work telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["work"] = 1] = "work";
    /**
    Private telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["home"] = 2] = "home";
    /**
    Preferred-use telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["preferred"] = 4] = "preferred";
    /**
    Voice telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["voice"] = 8] = "voice";
    /**
    Cellular or mobile telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["cell"] = 16] = "cell";
    /**
    Facsimile telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["fax"] = 32] = "fax";
    /**
    Video conferencing telephone number
    */
    /**
    undefined
    */
    PhoneTypeValues[PhoneTypeValues["video"] = 64] = "video";
})(PhoneTypeValues = exports.PhoneTypeValues || (exports.PhoneTypeValues = {}));
// EnumType 
var GenderType;
(function (GenderType) {
    /**
    male
    */
    /**
    undefined
    */
    GenderType["M"] = "Communication.GenderType/M";
    /**
    female
    */
    /**
    undefined
    */
    GenderType["F"] = "Communication.GenderType/F";
    /**
    other
    */
    /**
    undefined
    */
    GenderType["O"] = "Communication.GenderType/O";
    /**
    not applicable
    */
    /**
    undefined
    */
    GenderType["N"] = "Communication.GenderType/N";
    /**
    unknown
    */
    /**
    undefined
    */
    GenderType["U"] = "Communication.GenderType/U";
})(GenderType = exports.GenderType || (exports.GenderType = {}));
var GenderTypeValues;
(function (GenderTypeValues) {
    /**
    male
    */
    /**
    undefined
    */
    GenderTypeValues[GenderTypeValues["M"] = 0] = "M";
    /**
    female
    */
    /**
    undefined
    */
    GenderTypeValues[GenderTypeValues["F"] = 1] = "F";
    /**
    other
    */
    /**
    undefined
    */
    GenderTypeValues[GenderTypeValues["O"] = 2] = "O";
    /**
    not applicable
    */
    /**
    undefined
    */
    GenderTypeValues[GenderTypeValues["N"] = 3] = "N";
    /**
    unknown
    */
    /**
    undefined
    */
    GenderTypeValues[GenderTypeValues["U"] = 4] = "U";
})(GenderTypeValues = exports.GenderTypeValues || (exports.GenderTypeValues = {}));
var CommunicationAnnotationTerms;
(function (CommunicationAnnotationTerms) {
    CommunicationAnnotationTerms["Contact"] = "com.sap.vocabularies.Communication.v1.Contact";
    CommunicationAnnotationTerms["Address"] = "com.sap.vocabularies.Communication.v1.Address";
    CommunicationAnnotationTerms["IsEmailAddress"] = "com.sap.vocabularies.Communication.v1.IsEmailAddress";
    CommunicationAnnotationTerms["IsPhoneNumber"] = "com.sap.vocabularies.Communication.v1.IsPhoneNumber";
    CommunicationAnnotationTerms["Event"] = "com.sap.vocabularies.Communication.v1.Event";
    CommunicationAnnotationTerms["Task"] = "com.sap.vocabularies.Communication.v1.Task";
    CommunicationAnnotationTerms["Message"] = "com.sap.vocabularies.Communication.v1.Message";
})(CommunicationAnnotationTerms = exports.CommunicationAnnotationTerms || (exports.CommunicationAnnotationTerms = {}));
var CommunicationAnnotationTypes;
(function (CommunicationAnnotationTypes) {
    CommunicationAnnotationTypes["ContactType"] = "com.sap.vocabularies.Communication.v1.ContactType";
    CommunicationAnnotationTypes["NameType"] = "com.sap.vocabularies.Communication.v1.NameType";
    CommunicationAnnotationTypes["AddressType"] = "com.sap.vocabularies.Communication.v1.AddressType";
    CommunicationAnnotationTypes["PhoneNumberType"] = "com.sap.vocabularies.Communication.v1.PhoneNumberType";
    CommunicationAnnotationTypes["EmailAddressType"] = "com.sap.vocabularies.Communication.v1.EmailAddressType";
    CommunicationAnnotationTypes["GeoDataType"] = "com.sap.vocabularies.Communication.v1.GeoDataType";
    CommunicationAnnotationTypes["UrlType"] = "com.sap.vocabularies.Communication.v1.UrlType";
    CommunicationAnnotationTypes["EventData"] = "com.sap.vocabularies.Communication.v1.EventData";
    CommunicationAnnotationTypes["TaskData"] = "com.sap.vocabularies.Communication.v1.TaskData";
    CommunicationAnnotationTypes["MessageData"] = "com.sap.vocabularies.Communication.v1.MessageData";
})(CommunicationAnnotationTypes = exports.CommunicationAnnotationTypes || (exports.CommunicationAnnotationTypes = {}));
