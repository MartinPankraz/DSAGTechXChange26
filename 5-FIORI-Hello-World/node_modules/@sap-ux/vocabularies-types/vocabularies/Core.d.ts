import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import PropertyAnnotationValue = Edm.PropertyAnnotationValue;
import ComplexType = Edm.RecordComplexType;
/**
  A space-separated list of supported versions of the OData Protocol. Note that 4.0 is implied by 4.01 and does not need to be separately listed.
*/
export type ODataVersions = {
    term: CoreAnnotationTerms.ODataVersions;
} & AnnotationTerm<Edm.String>;
/**
  Service-defined value representing the version of the schema. Services MAY use semantic versioning, but clients MUST NOT assume this is the case.
*/
export type SchemaVersion = {
    term: CoreAnnotationTerms.SchemaVersion;
} & AnnotationTerm<Edm.String>;
/**
  List of revisions of a model element
*/
export type Revisions = {
    term: CoreAnnotationTerms.Revisions;
} & AnnotationTerm<RevisionTypeTypes[]>;
export type RevisionType = ComplexType & {
    $Type: CoreAnnotationTypes.RevisionType;
    /**
        The schema version with which this revision was first published
    */
    Version?: Edm.String;
    /**
        The kind of revision
    */
    Kind: RevisionKind;
    /**
        Text describing the reason for the revision
    */
    Description: Edm.String;
};
export declare const enum RevisionKind {
    /**
    Model element was added
    */
    /**
    undefined
    */
    Added = "Core.RevisionKind/Added",
    /**
    Model element was modified
    */
    /**
    undefined
    */
    Modified = "Core.RevisionKind/Modified",
    /**
    Model element was deprecated
    */
    /**
    undefined
    */
    Deprecated = "Core.RevisionKind/Deprecated"
}
export declare const enum RevisionKindValues {
    /**
    Model element was added
    */
    /**
    undefined
    */
    Added = 0,
    /**
    Model element was modified
    */
    /**
    undefined
    */
    Modified = 1,
    /**
    Model element was deprecated
    */
    /**
    undefined
    */
    Deprecated = 2
}
/**
  A brief description of a model element
*/
export type Description = {
    term: CoreAnnotationTerms.Description;
} & AnnotationTerm<Edm.String>;
/**
  A long description of a model element
*/
export type LongDescription = {
    term: CoreAnnotationTerms.LongDescription;
} & AnnotationTerm<Edm.String>;
/**
  Link to related information
*/
export type Links = {
    term: CoreAnnotationTerms.Links;
} & AnnotationTerm<LinkTypes[]>;
/**
  The Link term is inspired by the `atom:link` element, see [RFC4287](https://tools.ietf.org/html/rfc4287#section-4.2.7), and the `Link` HTTP header, see [RFC5988](https://tools.ietf.org/html/rfc5988)
*/
export type Link = ComplexType & {
    $Type: CoreAnnotationTypes.Link;
    /**
        Link relation type, see [IANA Link Relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml)
    */
    rel: Edm.String;
    /**
        URL of related information
    */
    href: Edm.String;
};
/**
  Example for an instance of the annotated model element
*/
export type Example = {
    term: CoreAnnotationTerms.Example;
} & AnnotationTerm<ExampleValueTypes>;
export type ExampleValue = ComplexType & {
    $Type: CoreAnnotationTypes.ExampleValue;
    /**
        Description of the example value
    */
    Description?: Edm.String;
};
export type PrimitiveExampleValue = ComplexType & Omit<ExampleValue, '$Type'> & {
    $Type: CoreAnnotationTypes.PrimitiveExampleValue;
    /**
        Example value for the custom parameter
    */
    Value: Edm.PrimitiveType;
};
export type ComplexExampleValue = ComplexType & Omit<ExampleValue, '$Type'> & {
    $Type: CoreAnnotationTypes.ComplexExampleValue;
    /**
        Example value for the custom parameter
    */
    Value: Edm.ComplexType;
};
export type EntityExampleValue = ComplexType & Omit<ExampleValue, '$Type'> & {
    $Type: CoreAnnotationTypes.EntityExampleValue;
    /**
        Example value for the custom parameter
    */
    Value: Edm.EntityType;
};
export type ExternalExampleValue = ComplexType & Omit<ExampleValue, '$Type'> & {
    $Type: CoreAnnotationTypes.ExternalExampleValue;
    /**
        Url reference to the value in its literal format
    */
    ExternalValue: Edm.String;
};
/**
  Instance annotation for warning and info messages
*/
export type Messages = {
    term: CoreAnnotationTerms.Messages;
} & AnnotationTerm<MessageTypeTypes[]>;
export type MessageType = ComplexType & {
    $Type: CoreAnnotationTypes.MessageType;
    /**
        Machine-readable, language-independent message code
    */
    code: Edm.String;
    /**
        Human-readable, language-dependent message text
    */
    message: Edm.String;
    /**
        Severity of the message
    */
    severity: MessageSeverity;
    /**
        A path to the target of the message detail, relative to the annotated instance
    */
    target?: Edm.String;
    /**
        List of detail messages
    */
    details: MessageTypeTypes[];
};
export type MessageSeverity = Edm.String;
/**
  The annotated value is problematic
*/
export type ValueException = {
    term: CoreAnnotationTerms.ValueException;
} & AnnotationTerm<ValueExceptionTypeTypes>;
export type ExceptionType = ComplexType & {
    $Type: CoreAnnotationTypes.ExceptionType;
    /**
        Information about the exception
    */
    info?: MessageTypeTypes;
};
export type ValueExceptionType = ComplexType & Omit<ExceptionType, '$Type'> & {
    $Type: CoreAnnotationTypes.ValueExceptionType;
    /**
        String representation of the exact value
    */
    value?: Edm.String;
};
/**
  The annotated instance within a success payload is problematic
*/
export type ResourceException = {
    term: CoreAnnotationTerms.ResourceException;
} & AnnotationTerm<ResourceExceptionTypeTypes>;
export type ResourceExceptionType = ComplexType & Omit<ExceptionType, '$Type'> & {
    $Type: CoreAnnotationTypes.ResourceExceptionType;
    /**
        A GET request to this URL retries retrieving the problematic instance
    */
    retryLink?: Edm.String;
};
/**
  A modification operation failed on the annotated instance or collection within a success payload
*/
export type DataModificationException = {
    term: CoreAnnotationTerms.DataModificationException;
} & AnnotationTerm<DataModificationExceptionTypeTypes>;
export type DataModificationExceptionType = ComplexType & Omit<ExceptionType, '$Type'> & {
    $Type: CoreAnnotationTypes.DataModificationExceptionType;
    /**
        The kind of modification operation that failed
    */
    failedOperation: DataModificationOperationKind;
    /**
        Response code of the failed operation, e.g. 424 for a failed dependency
    */
    responseCode?: Edm.Int16;
};
export declare const enum DataModificationOperationKind {
    /**
    Insert new instance
    */
    /**
    undefined
    */
    insert = "Core.DataModificationOperationKind/insert",
    /**
    Update existing instance
    */
    /**
    undefined
    */
    update = "Core.DataModificationOperationKind/update",
    /**
    Insert new instance or update it if it already exists
    */
    /**
    undefined
    */
    upsert = "Core.DataModificationOperationKind/upsert",
    /**
    Delete existing instance
    */
    /**
    undefined
    */
    delete = "Core.DataModificationOperationKind/delete",
    /**
    Invoke action or function
    */
    /**
    undefined
    */
    invoke = "Core.DataModificationOperationKind/invoke",
    /**
    Add link between entities
    */
    /**
    undefined
    */
    link = "Core.DataModificationOperationKind/link",
    /**
    Remove link between entities
    */
    /**
    undefined
    */
    unlink = "Core.DataModificationOperationKind/unlink"
}
export declare const enum DataModificationOperationKindValues {
    /**
    Insert new instance
    */
    /**
    undefined
    */
    insert = 0,
    /**
    Update existing instance
    */
    /**
    undefined
    */
    update = 1,
    /**
    Insert new instance or update it if it already exists
    */
    /**
    undefined
    */
    upsert = 2,
    /**
    Delete existing instance
    */
    /**
    undefined
    */
    delete = 3,
    /**
    Invoke action or function
    */
    /**
    undefined
    */
    invoke = 4,
    /**
    Add link between entities
    */
    /**
    undefined
    */
    link = 5,
    /**
    Remove link between entities
    */
    /**
    undefined
    */
    unlink = 6
}
/**
  Properties and terms annotated with this term are language-dependent
*/
export type IsLanguageDependent = {
    term: CoreAnnotationTerms.IsLanguageDependent;
} & AnnotationTerm<Tag>;
/**
  This is the type to use for all tagging terms
*/
export type Tag = Edm.Boolean;
/**
  Terms annotated with this term can only be applied to elements that have a type that is identical to or derived from the given type name
*/
export type RequiresType = {
    term: CoreAnnotationTerms.RequiresType;
} & AnnotationTerm<Edm.String>;
/**
  The target path of an annotation with the tagged term MUST start with an entity container or the annotation MUST be embedded within an entity container, entity set or singleton
*/
export type AppliesViaContainer = {
    term: CoreAnnotationTerms.AppliesViaContainer;
} & AnnotationTerm<Tag>;
/**
  Resource path for entity container child, can be relative to xml:base and the request URL
*/
export type ResourcePath = {
    term: CoreAnnotationTerms.ResourcePath;
} & AnnotationTerm<Edm.String>;
/**
  Entity-ids are URLs that locate the identified entity
*/
export type DereferenceableIDs = {
    term: CoreAnnotationTerms.DereferenceableIDs;
} & AnnotationTerm<Tag>;
/**
  Entity-ids follow OData URL conventions
*/
export type ConventionalIDs = {
    term: CoreAnnotationTerms.ConventionalIDs;
} & AnnotationTerm<Tag>;
/**
  Permissions for accessing a resource
*/
export type Permissions = Permission | PermissionValues[];
export declare const enum Permission {
    /**
    No permissions
    */
    /**
    undefined
    */
    None = "Core.Permission/None",
    /**
    Read permission
    */
    /**
    undefined
    */
    Read = "Core.Permission/Read",
    /**
    Write permission
    */
    /**
    undefined
    */
    Write = "Core.Permission/Write",
    /**
    Read and write permission
    */
    /**
    undefined
    */
    ReadWrite = "Core.Permission/ReadWrite",
    /**
    Permission to invoke actions
    */
    /**
    undefined
    */
    Invoke = "Core.Permission/Invoke"
}
export declare const enum PermissionValues {
    /**
    No permissions
    */
    /**
    undefined
    */
    None = 0,
    /**
    Read permission
    */
    /**
    undefined
    */
    Read = 1,
    /**
    Write permission
    */
    /**
    undefined
    */
    Write = 2,
    /**
    Read and write permission
    */
    /**
    undefined
    */
    ReadWrite = 3,
    /**
    Permission to invoke actions
    */
    /**
    undefined
    */
    Invoke = 4
}
/**
  A unique identifier for nested entities within a request.
*/
export type ContentID = {
    term: CoreAnnotationTerms.ContentID;
} & AnnotationTerm<Edm.String>;
/**
  Functions, actions and types in this namespace can be referenced in URLs with or without namespace- or alias- qualification.
*/
export type DefaultNamespace = {
    term: CoreAnnotationTerms.DefaultNamespace;
} & AnnotationTerm<Tag>;
/**
  A value for this non-key property can be provided by the client on insert and remains unchanged on update
*/
export type Immutable = {
    term: CoreAnnotationTerms.Immutable;
} & AnnotationTerm<Tag>;
/**
  A value for this property is generated on both insert and update
*/
export type Computed = {
    term: CoreAnnotationTerms.Computed;
} & AnnotationTerm<Tag>;
/**
  A value for this property can be provided by the client on insert and update. If no value is provided on insert, a non-static default value is generated
*/
export type ComputedDefaultValue = {
    term: CoreAnnotationTerms.ComputedDefaultValue;
} & AnnotationTerm<Tag>;
/**
  Properties and terms annotated with this term MUST contain a valid URL
*/
export type IsURL = {
    term: CoreAnnotationTerms.IsURL;
} & AnnotationTerm<Tag>;
/**
  Lists the MIME types acceptable for the annotated entity type marked with HasStream="true" or the annotated binary, stream, or string property or term
*/
export type AcceptableMediaTypes = {
    term: CoreAnnotationTerms.AcceptableMediaTypes;
} & AnnotationTerm<Edm.String[]>;
/**
  The media type of the media stream of the annotated entity type marked with HasStream="true" or the annotated binary, stream, or string property or term
*/
export type MediaType = {
    term: CoreAnnotationTerms.MediaType;
} & AnnotationTerm<PropertyAnnotationValue<Edm.String>>;
/**
  Properties and terms annotated with this term MUST contain a valid MIME type
*/
export type IsMediaType = {
    term: CoreAnnotationTerms.IsMediaType;
} & AnnotationTerm<Tag>;
/**
  The content disposition of the media stream of the annotated entity type marked with HasStream="true" or the annotated binary, stream, or string property or term
*/
export type ContentDisposition = {
    term: CoreAnnotationTerms.ContentDisposition;
} & AnnotationTerm<ContentDispositionTypeTypes>;
export type ContentDispositionType = ComplexType & {
    $Type: CoreAnnotationTypes.ContentDispositionType;
    /**
        The disposition type of the binary or stream value, see [RFC 6266, Disposition Type](https://datatracker.ietf.org/doc/html/rfc6266#section-4.2)
    */
    Type: Edm.String;
    /**
        The proposed filename for downloading the binary or stream value, see [RFC 6266, Disposition Parameter: 'Filename'](https://datatracker.ietf.org/doc/html/rfc6266#section-4.3)
    */
    Filename?: PropertyAnnotationValue<Edm.String>;
};
/**
  Data modification requires the use of ETags. A non-empty collection contains the set of properties that are used to compute the ETag. An empty collection means that the service won't tell how it computes the ETag
*/
export type OptimisticConcurrency = {
    term: CoreAnnotationTerms.OptimisticConcurrency;
} & AnnotationTerm<Edm.PropertyPath[]>;
/**
  Instances of this type may contain properties in addition to those declared in $metadata
*/
export type AdditionalProperties = {
    term: CoreAnnotationTerms.AdditionalProperties;
} & AnnotationTerm<Tag>;
/**
  The service will automatically expand this stream property, navigation property, or the media stream of this media entity type even if not requested with $expand
*/
export type AutoExpand = {
    term: CoreAnnotationTerms.AutoExpand;
} & AnnotationTerm<Tag>;
/**
  The service will automatically expand this navigation property as entity references even if not requested with $expand=.../$ref
*/
export type AutoExpandReferences = {
    term: CoreAnnotationTerms.AutoExpandReferences;
} & AnnotationTerm<Tag>;
/**
  A collection of qualified type names outside of the type hierarchy that instances of this type might be addressable as by using a type-cast segment.
*/
export type MayImplement = {
    term: CoreAnnotationTerms.MayImplement;
} & AnnotationTerm<QualifiedTypeName[]>;
/**
  The qualified name of a term in scope.
*/
export type QualifiedTermName = Edm.String;
/**
  The qualified name of a type in scope.
*/
export type QualifiedTypeName = Edm.String;
/**
  The qualified name of an action in scope.
*/
export type QualifiedActionName = Edm.String;
/**
  The qualified name of a bound action or function in scope.
*/
export type QualifiedBoundOperationName = Edm.String;
/**
  Collection has a stable order. Ordered collections of primitive or complex types can be indexed by ordinal.
*/
export type Ordered = {
    term: CoreAnnotationTerms.Ordered;
} & AnnotationTerm<Tag>;
/**
  Items can be inserted at a given ordinal index.
*/
export type PositionalInsert = {
    term: CoreAnnotationTerms.PositionalInsert;
} & AnnotationTerm<Tag>;
/**
  Communicates available alternate keys
*/
export type AlternateKeys = {
    term: CoreAnnotationTerms.AlternateKeys;
} & AnnotationTerm<AlternateKeyTypes[]>;
export type AlternateKey = ComplexType & {
    $Type: CoreAnnotationTypes.AlternateKey;
    /**
        The set of properties that make up this key
    */
    Key: PropertyRefTypes[];
};
export type PropertyRef = ComplexType & {
    $Type: CoreAnnotationTypes.PropertyRef;
    /**
        A path expression resolving to a primitive property of the entity type itself or to a primitive property of a complex or navigation property (recursively) of the entity type. The names of the properties in the path are joined together by forward slashes.
    */
    Name: Edm.PropertyPath;
    /**
        A SimpleIdentifier that MUST be unique within the set of aliases, structural and navigation properties of the containing entity type that MUST be used in the key predicate of URLs
    */
    Alias?: Edm.String;
};
/**
  A dictionary of name-value pairs. Names must be valid property names, values may be restricted to a list of types via an annotation with term `Validation.OpenPropertyTypeConstraint`.
*/
export type Dictionary = ComplexType & {
    $Type: CoreAnnotationTypes.Dictionary;
};
/**
  Supplying a value for the action or function parameter is optional.
*/
export type OptionalParameter = {
    term: CoreAnnotationTerms.OptionalParameter;
} & AnnotationTerm<OptionalParameterTypeTypes>;
export type OptionalParameterType = ComplexType & {
    $Type: CoreAnnotationTypes.OptionalParameterType;
    /**
        Default value for an optional parameter of primitive or enumeration type, using the same rules as the `cast` function in URLs.
    */
    DefaultValue?: Edm.String;
};
/**
  Action or function is available
*/
export type OperationAvailable = {
    term: CoreAnnotationTerms.OperationAvailable;
} & AnnotationTerm<PropertyAnnotationValue<Edm.Boolean>>;
/**
  This bound action or function is only available on model elements annotated with the ExplicitOperationBindings term.
*/
export type RequiresExplicitBinding = {
    term: CoreAnnotationTerms.RequiresExplicitBinding;
} & AnnotationTerm<Tag>;
/**
  The qualified names of explicitly bound operations that are supported on the target model element. These operations are in addition to any operations not annotated with RequiresExplicitBinding that are bound to the type of the target model element.
*/
export type ExplicitOperationBindings = {
    term: CoreAnnotationTerms.ExplicitOperationBindings;
} & AnnotationTerm<QualifiedBoundOperationName[]>;
/**
  A string representing a Local Date-Time value with no offset.
*/
export type LocalDateTime = Edm.String;
/**
  A symbolic name for a model element
*/
export type SymbolicName = {
    term: CoreAnnotationTerms.SymbolicName;
} & AnnotationTerm<SimpleIdentifier>;
/**
  A [simple identifier](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_SimpleIdentifier)
*/
export type SimpleIdentifier = Edm.String;
/**
  A [Feature Object](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2) represents a spatially bounded thing
*/
export type GeometryFeature = {
    term: CoreAnnotationTerms.GeometryFeature;
} & AnnotationTerm<GeometryFeatureTypeTypes>;
/**
  A [Feature Object](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2) represents a spatially bounded thing
*/
export type GeometryFeatureType = ComplexType & {
    $Type: CoreAnnotationTypes.GeometryFeatureType;
    /**
        Location of the Feature
    */
    geometry?: Edm.Geometry;
    /**
        Properties of the Feature
    */
    properties?: DictionaryTypes;
    /**
        Commonly used identifer for a Feature
    */
    id?: Edm.String;
};
/**
  Instances of a type are annotated with this tag if they have no common structure in a given response payload
*/
export type AnyStructure = {
    term: CoreAnnotationTerms.AnyStructure;
} & AnnotationTerm<Tag>;
/**
  The annotated Action or Function Parameter or Return Type is represented as a Delta payload
*/
export type IsDelta = {
    term: CoreAnnotationTerms.IsDelta;
} & AnnotationTerm<Tag>;
export declare const enum CoreAnnotationTerms {
    ODataVersions = "Org.OData.Core.V1.ODataVersions",
    SchemaVersion = "Org.OData.Core.V1.SchemaVersion",
    Revisions = "Org.OData.Core.V1.Revisions",
    Description = "Org.OData.Core.V1.Description",
    LongDescription = "Org.OData.Core.V1.LongDescription",
    Links = "Org.OData.Core.V1.Links",
    Example = "Org.OData.Core.V1.Example",
    Messages = "Org.OData.Core.V1.Messages",
    ValueException = "Org.OData.Core.V1.ValueException",
    ResourceException = "Org.OData.Core.V1.ResourceException",
    DataModificationException = "Org.OData.Core.V1.DataModificationException",
    IsLanguageDependent = "Org.OData.Core.V1.IsLanguageDependent",
    RequiresType = "Org.OData.Core.V1.RequiresType",
    AppliesViaContainer = "Org.OData.Core.V1.AppliesViaContainer",
    ResourcePath = "Org.OData.Core.V1.ResourcePath",
    DereferenceableIDs = "Org.OData.Core.V1.DereferenceableIDs",
    ConventionalIDs = "Org.OData.Core.V1.ConventionalIDs",
    Permissions = "Org.OData.Core.V1.Permissions",
    ContentID = "Org.OData.Core.V1.ContentID",
    DefaultNamespace = "Org.OData.Core.V1.DefaultNamespace",
    Immutable = "Org.OData.Core.V1.Immutable",
    Computed = "Org.OData.Core.V1.Computed",
    ComputedDefaultValue = "Org.OData.Core.V1.ComputedDefaultValue",
    IsURL = "Org.OData.Core.V1.IsURL",
    AcceptableMediaTypes = "Org.OData.Core.V1.AcceptableMediaTypes",
    MediaType = "Org.OData.Core.V1.MediaType",
    IsMediaType = "Org.OData.Core.V1.IsMediaType",
    ContentDisposition = "Org.OData.Core.V1.ContentDisposition",
    OptimisticConcurrency = "Org.OData.Core.V1.OptimisticConcurrency",
    AdditionalProperties = "Org.OData.Core.V1.AdditionalProperties",
    AutoExpand = "Org.OData.Core.V1.AutoExpand",
    AutoExpandReferences = "Org.OData.Core.V1.AutoExpandReferences",
    MayImplement = "Org.OData.Core.V1.MayImplement",
    Ordered = "Org.OData.Core.V1.Ordered",
    PositionalInsert = "Org.OData.Core.V1.PositionalInsert",
    AlternateKeys = "Org.OData.Core.V1.AlternateKeys",
    OptionalParameter = "Org.OData.Core.V1.OptionalParameter",
    OperationAvailable = "Org.OData.Core.V1.OperationAvailable",
    RequiresExplicitBinding = "Org.OData.Core.V1.RequiresExplicitBinding",
    ExplicitOperationBindings = "Org.OData.Core.V1.ExplicitOperationBindings",
    SymbolicName = "Org.OData.Core.V1.SymbolicName",
    GeometryFeature = "Org.OData.Core.V1.GeometryFeature",
    AnyStructure = "Org.OData.Core.V1.AnyStructure",
    IsDelta = "Org.OData.Core.V1.IsDelta"
}
export declare const enum CoreAnnotationTypes {
    RevisionType = "Org.OData.Core.V1.RevisionType",
    Link = "Org.OData.Core.V1.Link",
    ExampleValue = "Org.OData.Core.V1.ExampleValue",
    PrimitiveExampleValue = "Org.OData.Core.V1.PrimitiveExampleValue",
    ComplexExampleValue = "Org.OData.Core.V1.ComplexExampleValue",
    EntityExampleValue = "Org.OData.Core.V1.EntityExampleValue",
    ExternalExampleValue = "Org.OData.Core.V1.ExternalExampleValue",
    MessageType = "Org.OData.Core.V1.MessageType",
    ExceptionType = "Org.OData.Core.V1.ExceptionType",
    ValueExceptionType = "Org.OData.Core.V1.ValueExceptionType",
    ResourceExceptionType = "Org.OData.Core.V1.ResourceExceptionType",
    DataModificationExceptionType = "Org.OData.Core.V1.DataModificationExceptionType",
    ContentDispositionType = "Org.OData.Core.V1.ContentDispositionType",
    AlternateKey = "Org.OData.Core.V1.AlternateKey",
    PropertyRef = "Org.OData.Core.V1.PropertyRef",
    Dictionary = "Org.OData.Core.V1.Dictionary",
    OptionalParameterType = "Org.OData.Core.V1.OptionalParameterType",
    GeometryFeatureType = "Org.OData.Core.V1.GeometryFeatureType"
}
export type RevisionTypeTypes = RevisionType;
export type LinkTypes = Link;
export type ExampleValueTypes = ExampleValue | PrimitiveExampleValueTypes | ComplexExampleValueTypes | EntityExampleValueTypes | ExternalExampleValueTypes;
export type PrimitiveExampleValueTypes = PrimitiveExampleValue;
export type ComplexExampleValueTypes = ComplexExampleValue;
export type EntityExampleValueTypes = EntityExampleValue;
export type ExternalExampleValueTypes = ExternalExampleValue;
export type MessageTypeTypes = MessageType;
export type ExceptionTypeTypes = ValueExceptionTypeTypes | ResourceExceptionTypeTypes | DataModificationExceptionTypeTypes;
export type ValueExceptionTypeTypes = ValueExceptionType;
export type ResourceExceptionTypeTypes = ResourceExceptionType;
export type DataModificationExceptionTypeTypes = DataModificationExceptionType;
export type ContentDispositionTypeTypes = ContentDispositionType;
export type AlternateKeyTypes = AlternateKey;
export type PropertyRefTypes = PropertyRef;
export type DictionaryTypes = Dictionary;
export type OptionalParameterTypeTypes = OptionalParameterType;
export type GeometryFeatureTypeTypes = GeometryFeatureType;
