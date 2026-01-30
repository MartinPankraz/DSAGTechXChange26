import * as Core from "./Core";
import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import PropertyAnnotationValue = Edm.PropertyAnnotationValue;
import ComplexType = Edm.RecordComplexType;
/**
  Address book entry
*/
export type Contact = {
    term: CommunicationAnnotationTerms.Contact;
} & AnnotationTerm<ContactTypeTypes>;
export type ContactType = ComplexType & {
    $Type: CommunicationAnnotationTypes.ContactType;
    /**
        Full name
    */
    fn?: PropertyAnnotationValue<Edm.String>;
    /**
        Name
    */
    n?: NameTypeTypes;
    /**
        Nickname
    */
    nickname?: PropertyAnnotationValue<Edm.String>;
    /**
        Image or photograph
    */
    photo?: PropertyAnnotationValue<Edm.String>;
    /**
        Birthday
    */
    bday?: PropertyAnnotationValue<Edm.Date>;
    /**
        Date of marriage, or equivalent
    */
    anniversary?: PropertyAnnotationValue<Edm.Date>;
    /**
        Sex and gender identity
    */
    gender?: PropertyAnnotationValue<GenderType>;
    /**
        Position or job title
    */
    title?: PropertyAnnotationValue<Edm.String>;
    /**
        Function or part played in a particular situation
    */
    role?: PropertyAnnotationValue<Edm.String>;
    /**
        Organization Name defined by X.520
    */
    org?: PropertyAnnotationValue<Edm.String>;
    /**
        Organization Unit defined by X.520
    */
    orgunit?: PropertyAnnotationValue<Edm.String>;
    /**
        Kind of contact
    */
    kind?: PropertyAnnotationValue<KindType>;
    /**
        Supplemental information or a comment associated with the contact
    */
    note?: PropertyAnnotationValue<Edm.String>;
    /**
        Addresses
    */
    adr: AddressTypeTypes[];
    /**
        Phone numbers
    */
    tel: PhoneNumberTypeTypes[];
    /**
        Email addresses
    */
    email: EmailAddressTypeTypes[];
    /**
        Geographic locations
    */
    geo: GeoDataTypeTypes[];
    /**
        URLs
    */
    url: UrlTypeTypes[];
};
export type NameType = ComplexType & {
    $Type: CommunicationAnnotationTypes.NameType;
    /**
        Surname or family name
    */
    surname?: PropertyAnnotationValue<Edm.String>;
    /**
        Given name
    */
    given?: PropertyAnnotationValue<Edm.String>;
    /**
        Additional names
    */
    additional?: PropertyAnnotationValue<Edm.String>;
    /**
        Honorific prefix(es)
    */
    prefix?: PropertyAnnotationValue<Edm.String>;
    /**
        Honorific suffix(es)
    */
    suffix?: PropertyAnnotationValue<Edm.String>;
};
/**
  Address
*/
export type Address = {
    term: CommunicationAnnotationTerms.Address;
} & AnnotationTerm<AddressTypeTypes>;
export type AddressType = ComplexType & {
    $Type: CommunicationAnnotationTypes.AddressType;
    /**
        Building identifier
    */
    building?: PropertyAnnotationValue<Edm.String>;
    /**
        Street address
    */
    street?: PropertyAnnotationValue<Edm.String>;
    /**
        Territorial administrative organization in a large city
    */
    district?: PropertyAnnotationValue<Edm.String>;
    /**
        City or similar
    */
    locality?: PropertyAnnotationValue<Edm.String>;
    /**
        State, province, or similar
    */
    region?: PropertyAnnotationValue<Edm.String>;
    /**
        Postal code
    */
    code?: PropertyAnnotationValue<Edm.String>;
    /**
        Country name
    */
    country?: PropertyAnnotationValue<Edm.String>;
    /**
        Post office box
    */
    pobox?: PropertyAnnotationValue<Edm.String>;
    /**
        Extended address (e.g., apartment or suite number)
    */
    ext?: PropertyAnnotationValue<Edm.String>;
    /**
        An intermediary who is responsible for transferring a piece of mail between the postal system and the final addressee
    */
    careof?: PropertyAnnotationValue<Edm.String>;
    /**
        Delivery address label; plain-text string representing the formatted address, may contain line breaks
    */
    label?: PropertyAnnotationValue<Edm.String>;
    /**
        Address type
    */
    type?: ContactInformationType[];
};
export type PhoneNumberType = ComplexType & {
    $Type: CommunicationAnnotationTypes.PhoneNumberType;
    /**
        This SHOULD use the tel: URL schema defined in RFC3966
    */
    uri?: PropertyAnnotationValue<Edm.String>;
    /**
        Telephone type
    */
    type?: PhoneType[];
};
export type EmailAddressType = ComplexType & {
    $Type: CommunicationAnnotationTypes.EmailAddressType;
    /**
        Email address
    */
    address?: PropertyAnnotationValue<Edm.String>;
    /**
        Address type
    */
    type?: ContactInformationType[];
};
export type GeoDataType = ComplexType & {
    $Type: CommunicationAnnotationTypes.GeoDataType;
    /**
        This SHOULD use the geo: URL schema defined in RFC5870 which encodes the same information as an Edm.GeographyPoint
    */
    uri?: PropertyAnnotationValue<Edm.String>;
    /**
        Address type
    */
    type?: ContactInformationType[];
};
export type UrlType = ComplexType & {
    $Type: CommunicationAnnotationTypes.UrlType;
    /**
        This MUST use the URL schema defined in RFC3986
    */
    uri?: PropertyAnnotationValue<Edm.String>;
    /**
        URL type
    */
    type?: ContactInformationType[];
};
export declare const enum KindType {
    /**
    A single person or entity
    */
    /**
    undefined
    */
    individual = "Communication.KindType/individual",
    /**
    A group of persons or entities
    */
    /**
    undefined
    */
    group = "Communication.KindType/group",
    /**
    An organization
    */
    /**
    undefined
    */
    org = "Communication.KindType/org",
    /**
    A named geographical place
    */
    /**
    undefined
    */
    location = "Communication.KindType/location"
}
export declare const enum KindTypeValues {
    /**
    A single person or entity
    */
    /**
    undefined
    */
    individual = 0,
    /**
    A group of persons or entities
    */
    /**
    undefined
    */
    group = 1,
    /**
    An organization
    */
    /**
    undefined
    */
    org = 2,
    /**
    A named geographical place
    */
    /**
    undefined
    */
    location = 3
}
export declare const enum ContactInformationType {
    /**
    Related to an individual's work place
    */
    /**
    undefined
    */
    work = "Communication.ContactInformationType/work",
    /**
    Related to an indivdual's personal life
    */
    /**
    undefined
    */
    home = "Communication.ContactInformationType/home",
    /**
    Preferred-use contact information
    */
    /**
    undefined
    */
    preferred = "Communication.ContactInformationType/preferred"
}
export declare const enum ContactInformationTypeValues {
    /**
    Related to an individual's work place
    */
    /**
    undefined
    */
    work = 1,
    /**
    Related to an indivdual's personal life
    */
    /**
    undefined
    */
    home = 2,
    /**
    Preferred-use contact information
    */
    /**
    undefined
    */
    preferred = 4
}
export declare const enum PhoneType {
    /**
    Work telephone number
    */
    /**
    undefined
    */
    work = "Communication.PhoneType/work",
    /**
    Private telephone number
    */
    /**
    undefined
    */
    home = "Communication.PhoneType/home",
    /**
    Preferred-use telephone number
    */
    /**
    undefined
    */
    preferred = "Communication.PhoneType/preferred",
    /**
    Voice telephone number
    */
    /**
    undefined
    */
    voice = "Communication.PhoneType/voice",
    /**
    Cellular or mobile telephone number
    */
    /**
    undefined
    */
    cell = "Communication.PhoneType/cell",
    /**
    Facsimile telephone number
    */
    /**
    undefined
    */
    fax = "Communication.PhoneType/fax",
    /**
    Video conferencing telephone number
    */
    /**
    undefined
    */
    video = "Communication.PhoneType/video"
}
export declare const enum PhoneTypeValues {
    /**
    Work telephone number
    */
    /**
    undefined
    */
    work = 1,
    /**
    Private telephone number
    */
    /**
    undefined
    */
    home = 2,
    /**
    Preferred-use telephone number
    */
    /**
    undefined
    */
    preferred = 4,
    /**
    Voice telephone number
    */
    /**
    undefined
    */
    voice = 8,
    /**
    Cellular or mobile telephone number
    */
    /**
    undefined
    */
    cell = 16,
    /**
    Facsimile telephone number
    */
    /**
    undefined
    */
    fax = 32,
    /**
    Video conferencing telephone number
    */
    /**
    undefined
    */
    video = 64
}
export declare const enum GenderType {
    /**
    male
    */
    /**
    undefined
    */
    M = "Communication.GenderType/M",
    /**
    female
    */
    /**
    undefined
    */
    F = "Communication.GenderType/F",
    /**
    other
    */
    /**
    undefined
    */
    O = "Communication.GenderType/O",
    /**
    not applicable
    */
    /**
    undefined
    */
    N = "Communication.GenderType/N",
    /**
    unknown
    */
    /**
    undefined
    */
    U = "Communication.GenderType/U"
}
export declare const enum GenderTypeValues {
    /**
    male
    */
    /**
    undefined
    */
    M = 0,
    /**
    female
    */
    /**
    undefined
    */
    F = 1,
    /**
    other
    */
    /**
    undefined
    */
    O = 2,
    /**
    not applicable
    */
    /**
    undefined
    */
    N = 3,
    /**
    unknown
    */
    /**
    undefined
    */
    U = 4
}
/**
  Property contains an email address
*/
export type IsEmailAddress = {
    term: CommunicationAnnotationTerms.IsEmailAddress;
} & AnnotationTerm<Core.Tag>;
/**
  Property contains a phone number
*/
export type IsPhoneNumber = {
    term: CommunicationAnnotationTerms.IsPhoneNumber;
} & AnnotationTerm<Core.Tag>;
/**
  Calendar entry
*/
export type Event = {
    term: CommunicationAnnotationTerms.Event;
} & AnnotationTerm<EventDataTypes>;
export type EventData = ComplexType & {
    $Type: CommunicationAnnotationTypes.EventData;
    /**
        Short description of the event
    */
    summary?: Edm.String;
    /**
        More complete description
    */
    description?: Edm.String;
    /**
        Categories or subtypes of the event
    */
    categories: Edm.String[];
    /**
        Start date and time of the event
    */
    dtstart?: Edm.DateTimeOffset;
    /**
        Date and time by which the event ends, alternative to duration
    */
    dtend?: Edm.DateTimeOffset;
    /**
        Duration of the event, alternative to dtend
    */
    duration?: Edm.Duration;
    /**
        Access classification, e.g. PUBLIC, PRIVATE, CONFIDENTIAL
    */
    class?: Edm.String;
    /**
        Confirmation status, e.g. CONFIRMED, TENTATIVE, CANCELLED
    */
    status?: Edm.String;
    /**
        Intended venue of the event
    */
    location?: Edm.String;
    /**
        Time transparency for busy time searches, true = free, false = blocked
    */
    transp?: Edm.Boolean;
    /**
        Wholeday event
    */
    wholeday?: Edm.Boolean;
    /**
        Free or busy time type, e.g. FREE, BUSY, BUSY-TENTATIVE
    */
    fbtype?: Edm.String;
};
/**
  Task list entry
*/
export type Task = {
    term: CommunicationAnnotationTerms.Task;
} & AnnotationTerm<TaskDataTypes>;
export type TaskData = ComplexType & {
    $Type: CommunicationAnnotationTypes.TaskData;
    /**
        Short description of the task
    */
    summary?: Edm.String;
    /**
        More complete description of the task
    */
    description?: Edm.String;
    /**
        Date and time that a to-do is expected to be completed
    */
    due?: Edm.DateTimeOffset;
    /**
        Date and time that a to-do was actually completed
    */
    completed?: Edm.DateTimeOffset;
    /**
        Percent completion of a to-do, e.g. 50 for half done
    */
    percentcomplete?: Edm.Byte;
    /**
        Relative priority, 0 = undefined, 1 = highest, 9 = lowest
    */
    priority?: Edm.Byte;
};
/**
  Email message
*/
export type Message = {
    term: CommunicationAnnotationTerms.Message;
} & AnnotationTerm<MessageDataTypes>;
export type MessageData = ComplexType & {
    $Type: CommunicationAnnotationTypes.MessageData;
    /**
        Author(s) of the message
    */
    from?: Edm.String;
    /**
        Agent responsible for the actual transmission of the message, e.g. a secretary
    */
    sender?: Edm.String;
    /**
        List of primary recipients
    */
    to: Edm.String[];
    /**
        List of other recipients (carbon copy)
    */
    cc: Edm.String[];
    /**
        List of recipients whose addresses are not to be revealed (blind carbon copy)
    */
    bcc: Edm.String[];
    /**
        Topic of the message
    */
    subject?: Edm.String;
    /**
        Main part of the message
    */
    body?: Edm.String;
    /**
        List of important words and phrases that might be useful for the recipient
    */
    keywords: Edm.String[];
    /**
        Date and time the message was received
    */
    received?: Edm.DateTimeOffset;
};
export declare const enum CommunicationAnnotationTerms {
    Contact = "com.sap.vocabularies.Communication.v1.Contact",
    Address = "com.sap.vocabularies.Communication.v1.Address",
    IsEmailAddress = "com.sap.vocabularies.Communication.v1.IsEmailAddress",
    IsPhoneNumber = "com.sap.vocabularies.Communication.v1.IsPhoneNumber",
    Event = "com.sap.vocabularies.Communication.v1.Event",
    Task = "com.sap.vocabularies.Communication.v1.Task",
    Message = "com.sap.vocabularies.Communication.v1.Message"
}
export declare const enum CommunicationAnnotationTypes {
    ContactType = "com.sap.vocabularies.Communication.v1.ContactType",
    NameType = "com.sap.vocabularies.Communication.v1.NameType",
    AddressType = "com.sap.vocabularies.Communication.v1.AddressType",
    PhoneNumberType = "com.sap.vocabularies.Communication.v1.PhoneNumberType",
    EmailAddressType = "com.sap.vocabularies.Communication.v1.EmailAddressType",
    GeoDataType = "com.sap.vocabularies.Communication.v1.GeoDataType",
    UrlType = "com.sap.vocabularies.Communication.v1.UrlType",
    EventData = "com.sap.vocabularies.Communication.v1.EventData",
    TaskData = "com.sap.vocabularies.Communication.v1.TaskData",
    MessageData = "com.sap.vocabularies.Communication.v1.MessageData"
}
export type ContactTypeTypes = ContactType;
export type NameTypeTypes = NameType;
export type AddressTypeTypes = AddressType;
export type PhoneNumberTypeTypes = PhoneNumberType;
export type EmailAddressTypeTypes = EmailAddressType;
export type GeoDataTypeTypes = GeoDataType;
export type UrlTypeTypes = UrlType;
export type EventDataTypes = EventData;
export type TaskDataTypes = TaskData;
export type MessageDataTypes = MessageData;
