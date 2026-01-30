"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationAnnotationTypes = exports.AuthorizationAnnotationTerms = exports.KeyLocationValues = exports.KeyLocation = void 0;
// EnumType 
var KeyLocation;
(function (KeyLocation) {
    /**
    API Key is passed in the header
    */
    /**
    undefined
    */
    KeyLocation["Header"] = "Authorization.KeyLocation/Header";
    /**
    API Key is passed as a query option
    */
    /**
    undefined
    */
    KeyLocation["QueryOption"] = "Authorization.KeyLocation/QueryOption";
    /**
    API Key is passed as a cookie
    */
    /**
    undefined
    */
    KeyLocation["Cookie"] = "Authorization.KeyLocation/Cookie";
})(KeyLocation = exports.KeyLocation || (exports.KeyLocation = {}));
var KeyLocationValues;
(function (KeyLocationValues) {
    /**
    API Key is passed in the header
    */
    /**
    undefined
    */
    KeyLocationValues[KeyLocationValues["Header"] = 0] = "Header";
    /**
    API Key is passed as a query option
    */
    /**
    undefined
    */
    KeyLocationValues[KeyLocationValues["QueryOption"] = 1] = "QueryOption";
    /**
    API Key is passed as a cookie
    */
    /**
    undefined
    */
    KeyLocationValues[KeyLocationValues["Cookie"] = 2] = "Cookie";
})(KeyLocationValues = exports.KeyLocationValues || (exports.KeyLocationValues = {}));
var AuthorizationAnnotationTerms;
(function (AuthorizationAnnotationTerms) {
    AuthorizationAnnotationTerms["SecuritySchemes"] = "Org.OData.Authorization.V1.SecuritySchemes";
    AuthorizationAnnotationTerms["Authorizations"] = "Org.OData.Authorization.V1.Authorizations";
})(AuthorizationAnnotationTerms = exports.AuthorizationAnnotationTerms || (exports.AuthorizationAnnotationTerms = {}));
var AuthorizationAnnotationTypes;
(function (AuthorizationAnnotationTypes) {
    AuthorizationAnnotationTypes["SecurityScheme"] = "Org.OData.Authorization.V1.SecurityScheme";
    AuthorizationAnnotationTypes["Authorization"] = "Org.OData.Authorization.V1.Authorization";
    AuthorizationAnnotationTypes["OpenIDConnect"] = "Org.OData.Authorization.V1.OpenIDConnect";
    AuthorizationAnnotationTypes["Http"] = "Org.OData.Authorization.V1.Http";
    AuthorizationAnnotationTypes["OAuthAuthorization"] = "Org.OData.Authorization.V1.OAuthAuthorization";
    AuthorizationAnnotationTypes["OAuth2ClientCredentials"] = "Org.OData.Authorization.V1.OAuth2ClientCredentials";
    AuthorizationAnnotationTypes["OAuth2Implicit"] = "Org.OData.Authorization.V1.OAuth2Implicit";
    AuthorizationAnnotationTypes["OAuth2Password"] = "Org.OData.Authorization.V1.OAuth2Password";
    AuthorizationAnnotationTypes["OAuth2AuthCode"] = "Org.OData.Authorization.V1.OAuth2AuthCode";
    AuthorizationAnnotationTypes["AuthorizationScope"] = "Org.OData.Authorization.V1.AuthorizationScope";
    AuthorizationAnnotationTypes["ApiKey"] = "Org.OData.Authorization.V1.ApiKey";
})(AuthorizationAnnotationTypes = exports.AuthorizationAnnotationTypes || (exports.AuthorizationAnnotationTypes = {}));
