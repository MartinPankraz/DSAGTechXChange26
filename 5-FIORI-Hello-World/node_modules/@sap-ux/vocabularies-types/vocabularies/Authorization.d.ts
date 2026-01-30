import * as Edm from "../Edm";
import AnnotationTerm = Edm.AnnotationTerm;
import ComplexType = Edm.RecordComplexType;
/**
  At least one of the specified security schemes are required to make a request against the service
*/
export type SecuritySchemes = {
    term: AuthorizationAnnotationTerms.SecuritySchemes;
} & AnnotationTerm<SecuritySchemeTypes[]>;
export type SecurityScheme = ComplexType & {
    $Type: AuthorizationAnnotationTypes.SecurityScheme;
    /**
        The name of a required authorization scheme
    */
    Authorization: SchemeName;
    /**
        The names of scopes required from this authorization scheme
    */
    RequiredScopes: Edm.String[];
};
/**
  Lists the methods supported by the service to authorize access
*/
export type Authorizations = {
    term: AuthorizationAnnotationTerms.Authorizations;
} & AnnotationTerm<AuthorizationTypes[]>;
/**
  Base type for all Authorization types
*/
export type Authorization = ComplexType & {
    $Type: AuthorizationAnnotationTypes.Authorization;
    /**
        Name that can be used to reference the authorization scheme
    */
    Name: Edm.String;
    /**
        Description of the authorization scheme
    */
    Description?: Edm.String;
};
export type OpenIDConnect = ComplexType & Omit<Authorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OpenIDConnect;
    /**
        Issuer location for the OpenID Provider. Configuration information can be obtained by appending `/.well-known/openid-configuration` to this Url.
    */
    IssuerUrl: Edm.String;
};
export type Http = ComplexType & Omit<Authorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.Http;
    /**
        HTTP Authorization scheme to be used in the Authorization header, as per RFC7235
    */
    Scheme: Edm.String;
    /**
        Format of the bearer token
    */
    BearerFormat?: Edm.String;
};
export type OAuthAuthorization = ComplexType & Omit<Authorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OAuthAuthorization;
    /**
        Available scopes
    */
    Scopes: AuthorizationScopeTypes[];
    /**
        Refresh Url
    */
    RefreshUrl?: Edm.String;
};
export type OAuth2ClientCredentials = ComplexType & Omit<OAuthAuthorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OAuth2ClientCredentials;
    /**
        Token Url
    */
    TokenUrl: Edm.String;
};
/**
  Security note: OAuth2 implicit grant is considered to be not secure and should not be used by clients, see [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics.html#name-implicit-grant).
*/
export type OAuth2Implicit = ComplexType & Omit<OAuthAuthorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OAuth2Implicit;
    /**
        Authorization URL
    */
    AuthorizationUrl: Edm.String;
};
export type OAuth2Password = ComplexType & Omit<OAuthAuthorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OAuth2Password;
    /**
        Token Url
    */
    TokenUrl: Edm.String;
};
export type OAuth2AuthCode = ComplexType & Omit<OAuthAuthorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.OAuth2AuthCode;
    /**
        Authorization URL
    */
    AuthorizationUrl: Edm.String;
    /**
        Token Url
    */
    TokenUrl: Edm.String;
};
export type AuthorizationScope = ComplexType & {
    $Type: AuthorizationAnnotationTypes.AuthorizationScope;
    /**
        Scope name
    */
    Scope: Edm.String;
    /**
        Identity that has access to the scope or can grant access to the scope.
    */
    Grant?: Edm.String;
    /**
        Description of the scope
    */
    Description: Edm.String;
};
export type ApiKey = ComplexType & Omit<Authorization, '$Type'> & {
    $Type: AuthorizationAnnotationTypes.ApiKey;
    /**
        The name of the header or query parameter
    */
    KeyName: Edm.String;
    /**
        Whether the API Key is passed in the header or as a query option
    */
    Location: KeyLocation;
};
export declare const enum KeyLocation {
    /**
    API Key is passed in the header
    */
    /**
    undefined
    */
    Header = "Authorization.KeyLocation/Header",
    /**
    API Key is passed as a query option
    */
    /**
    undefined
    */
    QueryOption = "Authorization.KeyLocation/QueryOption",
    /**
    API Key is passed as a cookie
    */
    /**
    undefined
    */
    Cookie = "Authorization.KeyLocation/Cookie"
}
export declare const enum KeyLocationValues {
    /**
    API Key is passed in the header
    */
    /**
    undefined
    */
    Header = 0,
    /**
    API Key is passed as a query option
    */
    /**
    undefined
    */
    QueryOption = 1,
    /**
    API Key is passed as a cookie
    */
    /**
    undefined
    */
    Cookie = 2
}
/**
  The name of the authorization scheme.
*/
export type SchemeName = Edm.String;
export declare const enum AuthorizationAnnotationTerms {
    SecuritySchemes = "Org.OData.Authorization.V1.SecuritySchemes",
    Authorizations = "Org.OData.Authorization.V1.Authorizations"
}
export declare const enum AuthorizationAnnotationTypes {
    SecurityScheme = "Org.OData.Authorization.V1.SecurityScheme",
    Authorization = "Org.OData.Authorization.V1.Authorization",
    OpenIDConnect = "Org.OData.Authorization.V1.OpenIDConnect",
    Http = "Org.OData.Authorization.V1.Http",
    OAuthAuthorization = "Org.OData.Authorization.V1.OAuthAuthorization",
    OAuth2ClientCredentials = "Org.OData.Authorization.V1.OAuth2ClientCredentials",
    OAuth2Implicit = "Org.OData.Authorization.V1.OAuth2Implicit",
    OAuth2Password = "Org.OData.Authorization.V1.OAuth2Password",
    OAuth2AuthCode = "Org.OData.Authorization.V1.OAuth2AuthCode",
    AuthorizationScope = "Org.OData.Authorization.V1.AuthorizationScope",
    ApiKey = "Org.OData.Authorization.V1.ApiKey"
}
export type SecuritySchemeTypes = SecurityScheme;
export type AuthorizationTypes = OpenIDConnectTypes | HttpTypes | OAuthAuthorizationTypes | ApiKeyTypes;
export type OpenIDConnectTypes = OpenIDConnect;
export type HttpTypes = Http;
export type OAuthAuthorizationTypes = OAuth2ClientCredentialsTypes | OAuth2ImplicitTypes | OAuth2PasswordTypes | OAuth2AuthCodeTypes;
export type OAuth2ClientCredentialsTypes = OAuth2ClientCredentials;
export type OAuth2ImplicitTypes = OAuth2Implicit;
export type OAuth2PasswordTypes = OAuth2Password;
export type OAuth2AuthCodeTypes = OAuth2AuthCode;
export type AuthorizationScopeTypes = AuthorizationScope;
export type ApiKeyTypes = ApiKey;
