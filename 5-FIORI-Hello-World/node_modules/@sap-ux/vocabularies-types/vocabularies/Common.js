"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonAnnotationTypes = exports.CommonAnnotationTerms = exports.EffectTypeValues = exports.EffectType = exports.FieldControlTypeValues = exports.FieldControlType = exports.FilterExpressionTypeValues = exports.FilterExpressionType = exports.TextFormatTypeValues = exports.TextFormatType = void 0;
// EnumType 
var TextFormatType;
(function (TextFormatType) {
    /**
    Plain text, line breaks represented as the character 0x0A
    */
    /**
    undefined
    */
    TextFormatType["plain"] = "Common.TextFormatType/plain";
    /**
    Plain text with markup that can validly appear directly within an HTML DIV element
    */
    /**
    undefined
    */
    TextFormatType["html"] = "Common.TextFormatType/html";
})(TextFormatType = exports.TextFormatType || (exports.TextFormatType = {}));
var TextFormatTypeValues;
(function (TextFormatTypeValues) {
    /**
    Plain text, line breaks represented as the character 0x0A
    */
    /**
    undefined
    */
    TextFormatTypeValues[TextFormatTypeValues["plain"] = 0] = "plain";
    /**
    Plain text with markup that can validly appear directly within an HTML DIV element
    */
    /**
    undefined
    */
    TextFormatTypeValues[TextFormatTypeValues["html"] = 1] = "html";
})(TextFormatTypeValues = exports.TextFormatTypeValues || (exports.TextFormatTypeValues = {}));
// EnumType 
var FilterExpressionType;
(function (FilterExpressionType) {
    /**
    a single 'eq' clause
    */
    /**
    undefined
    */
    FilterExpressionType["SingleValue"] = "Common.FilterExpressionType/SingleValue";
    /**
    one or more 'eq' clauses, separated by 'or'
    */
    /**
    undefined
    */
    FilterExpressionType["MultiValue"] = "Common.FilterExpressionType/MultiValue";
    /**
    at most one 'ge' and one 'le' clause, separated by 'and', alternatively a single 'eq' clause
    */
    /**
    undefined
    */
    FilterExpressionType["SingleInterval"] = "Common.FilterExpressionType/SingleInterval";
})(FilterExpressionType = exports.FilterExpressionType || (exports.FilterExpressionType = {}));
var FilterExpressionTypeValues;
(function (FilterExpressionTypeValues) {
    /**
    a single 'eq' clause
    */
    /**
    undefined
    */
    FilterExpressionTypeValues[FilterExpressionTypeValues["SingleValue"] = 0] = "SingleValue";
    /**
    one or more 'eq' clauses, separated by 'or'
    */
    /**
    undefined
    */
    FilterExpressionTypeValues[FilterExpressionTypeValues["MultiValue"] = 1] = "MultiValue";
    /**
    at most one 'ge' and one 'le' clause, separated by 'and', alternatively a single 'eq' clause
    */
    /**
    undefined
    */
    FilterExpressionTypeValues[FilterExpressionTypeValues["SingleInterval"] = 2] = "SingleInterval";
})(FilterExpressionTypeValues = exports.FilterExpressionTypeValues || (exports.FilterExpressionTypeValues = {}));
// EnumType 
/**
  Control state of a property
*/
var FieldControlType;
(function (FieldControlType) {
    /**
    Property is mandatory from a business perspective
    */
    /**
    A request that
- sets the property to null or an empty value or
- creates a non-[draft](#DraftRoot) entity and omits the property or
- activates a draft entity while the property is null or empty

fails entirely if this annotation is `Mandatory` in the after-image of the request.
The empty string is an empty value. Service-specific rules may consider other values, also
of non-string type, empty.
Values in draft entities are never considered empty.
Mandatory properties SHOULD be decorated in the UI with an asterisk.
Null or empty values can also be disallowed by restricting the property value range with the standard type facet `Nullable` or terms from the [Validation vocabulary](https://github.com/oasis-tcs/odata-vocabularies/blob/main/vocabularies/Org.OData.Validation.V1.md).
    */
    FieldControlType["Mandatory"] = "Common.FieldControlType/Mandatory";
    /**
    Property may have a value
    */
    /**
    This value does not make sense as a static annotation value.
    */
    FieldControlType["Optional"] = "Common.FieldControlType/Optional";
    /**
    Property value cannot be changed
    */
    /**
    A request to change the property to a value that differs from the before-image fails entirely
            according to [OData-Protocol, section 11.4.3](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_UpdateanEntity)
            if this annotation is given dynamically as `ReadOnly` in the before-image of the request.

            To statically mark a property as read-only use term [Core.Computed](https://github.com/oasis-tcs/odata-vocabularies/blob/main/vocabularies/Org.OData.Core.V1.md#Computed) instead.
    */
    FieldControlType["ReadOnly"] = "Common.FieldControlType/ReadOnly";
    /**
    Property has no meaning in the current entity state
    */
    /**
    A request that sets the property to a non-initial non-null value fails entirely if this annotation is `Inapplicable` in the after-image of the request.

            This value does not make sense as a static annotation value.

Example for dynamic use: in a travel expense report the property `DestinationCountry` is inapplicable if trip type is domestic, and mandatory if trip type is international.
    */
    FieldControlType["Inapplicable"] = "Common.FieldControlType/Inapplicable";
    /**
    Deprecated synonym for Inapplicable, do not use
    */
    /**
    To statically hide a property on a UI use [UI.Hidden](UI.md#Hidden) instead
    */
    FieldControlType["Hidden"] = "Common.FieldControlType/Hidden";
})(FieldControlType = exports.FieldControlType || (exports.FieldControlType = {}));
var FieldControlTypeValues;
(function (FieldControlTypeValues) {
    /**
    Property is mandatory from a business perspective
    */
    /**
    A request that
- sets the property to null or an empty value or
- creates a non-[draft](#DraftRoot) entity and omits the property or
- activates a draft entity while the property is null or empty

fails entirely if this annotation is `Mandatory` in the after-image of the request.
The empty string is an empty value. Service-specific rules may consider other values, also
of non-string type, empty.
Values in draft entities are never considered empty.
Mandatory properties SHOULD be decorated in the UI with an asterisk.
Null or empty values can also be disallowed by restricting the property value range with the standard type facet `Nullable` or terms from the [Validation vocabulary](https://github.com/oasis-tcs/odata-vocabularies/blob/main/vocabularies/Org.OData.Validation.V1.md).
    */
    FieldControlTypeValues[FieldControlTypeValues["Mandatory"] = 7] = "Mandatory";
    /**
    Property may have a value
    */
    /**
    This value does not make sense as a static annotation value.
    */
    FieldControlTypeValues[FieldControlTypeValues["Optional"] = 3] = "Optional";
    /**
    Property value cannot be changed
    */
    /**
    A request to change the property to a value that differs from the before-image fails entirely
            according to [OData-Protocol, section 11.4.3](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_UpdateanEntity)
            if this annotation is given dynamically as `ReadOnly` in the before-image of the request.

            To statically mark a property as read-only use term [Core.Computed](https://github.com/oasis-tcs/odata-vocabularies/blob/main/vocabularies/Org.OData.Core.V1.md#Computed) instead.
    */
    FieldControlTypeValues[FieldControlTypeValues["ReadOnly"] = 1] = "ReadOnly";
    /**
    Property has no meaning in the current entity state
    */
    /**
    A request that sets the property to a non-initial non-null value fails entirely if this annotation is `Inapplicable` in the after-image of the request.

            This value does not make sense as a static annotation value.

Example for dynamic use: in a travel expense report the property `DestinationCountry` is inapplicable if trip type is domestic, and mandatory if trip type is international.
    */
    FieldControlTypeValues[FieldControlTypeValues["Inapplicable"] = 0] = "Inapplicable";
    /**
    Deprecated synonym for Inapplicable, do not use
    */
    /**
    To statically hide a property on a UI use [UI.Hidden](UI.md#Hidden) instead
    */
    FieldControlTypeValues[FieldControlTypeValues["Hidden"] = 0] = "Hidden";
})(FieldControlTypeValues = exports.FieldControlTypeValues || (exports.FieldControlTypeValues = {}));
// EnumType 
var EffectType;
(function (EffectType) {
    /**
    Validation messages are assigned to a target
    */
    /**
    This side effect type indicates that validation messages may result from changes of source properties or entities.
Thus, a validation request can be sent either in conjunction with or separately after a modifying request.
Validation messages shall be persisted with the draft and immediately available in a subsequent request without repeating the validation logic.
    */
    EffectType["ValidationMessage"] = "Common.EffectType/ValidationMessage";
    /**
    The value of a target changes
    */
    /**
    This side effect type declares that changes to source properties or entities may impact the values of any, one or multiple target properties or entities.
Upon modification preparation logic is performed that determines additional values to be stored in the draft document.
    */
    EffectType["ValueChange"] = "Common.EffectType/ValueChange";
    /**
    The value of the Common.FieldControl annotation of a target changes
    */
    /**
    This side effect type specifies that source properties or entities may impact the dynamic field control state of any, one or multiple target properties or entities.
Upon modification field control logic is invoked so that meta-information like hidden or read-only is determined.
    */
    EffectType["FieldControlChange"] = "Common.EffectType/FieldControlChange";
})(EffectType = exports.EffectType || (exports.EffectType = {}));
var EffectTypeValues;
(function (EffectTypeValues) {
    /**
    Validation messages are assigned to a target
    */
    /**
    This side effect type indicates that validation messages may result from changes of source properties or entities.
Thus, a validation request can be sent either in conjunction with or separately after a modifying request.
Validation messages shall be persisted with the draft and immediately available in a subsequent request without repeating the validation logic.
    */
    EffectTypeValues[EffectTypeValues["ValidationMessage"] = 1] = "ValidationMessage";
    /**
    The value of a target changes
    */
    /**
    This side effect type declares that changes to source properties or entities may impact the values of any, one or multiple target properties or entities.
Upon modification preparation logic is performed that determines additional values to be stored in the draft document.
    */
    EffectTypeValues[EffectTypeValues["ValueChange"] = 2] = "ValueChange";
    /**
    The value of the Common.FieldControl annotation of a target changes
    */
    /**
    This side effect type specifies that source properties or entities may impact the dynamic field control state of any, one or multiple target properties or entities.
Upon modification field control logic is invoked so that meta-information like hidden or read-only is determined.
    */
    EffectTypeValues[EffectTypeValues["FieldControlChange"] = 4] = "FieldControlChange";
})(EffectTypeValues = exports.EffectTypeValues || (exports.EffectTypeValues = {}));
var CommonAnnotationTerms;
(function (CommonAnnotationTerms) {
    CommonAnnotationTerms["Experimental"] = "com.sap.vocabularies.Common.v1.Experimental";
    CommonAnnotationTerms["ServiceVersion"] = "com.sap.vocabularies.Common.v1.ServiceVersion";
    CommonAnnotationTerms["ServiceSchemaVersion"] = "com.sap.vocabularies.Common.v1.ServiceSchemaVersion";
    CommonAnnotationTerms["Label"] = "com.sap.vocabularies.Common.v1.Label";
    CommonAnnotationTerms["Heading"] = "com.sap.vocabularies.Common.v1.Heading";
    CommonAnnotationTerms["QuickInfo"] = "com.sap.vocabularies.Common.v1.QuickInfo";
    CommonAnnotationTerms["DocumentationRef"] = "com.sap.vocabularies.Common.v1.DocumentationRef";
    CommonAnnotationTerms["Text"] = "com.sap.vocabularies.Common.v1.Text";
    CommonAnnotationTerms["TextFor"] = "com.sap.vocabularies.Common.v1.TextFor";
    CommonAnnotationTerms["ExternalID"] = "com.sap.vocabularies.Common.v1.ExternalID";
    CommonAnnotationTerms["IsLanguageIdentifier"] = "com.sap.vocabularies.Common.v1.IsLanguageIdentifier";
    CommonAnnotationTerms["TextFormat"] = "com.sap.vocabularies.Common.v1.TextFormat";
    CommonAnnotationTerms["Timezone"] = "com.sap.vocabularies.Common.v1.Timezone";
    CommonAnnotationTerms["IsTimezone"] = "com.sap.vocabularies.Common.v1.IsTimezone";
    CommonAnnotationTerms["IsDigitSequence"] = "com.sap.vocabularies.Common.v1.IsDigitSequence";
    CommonAnnotationTerms["IsUpperCase"] = "com.sap.vocabularies.Common.v1.IsUpperCase";
    CommonAnnotationTerms["IsCurrency"] = "com.sap.vocabularies.Common.v1.IsCurrency";
    CommonAnnotationTerms["IsUnit"] = "com.sap.vocabularies.Common.v1.IsUnit";
    CommonAnnotationTerms["UnitSpecificScale"] = "com.sap.vocabularies.Common.v1.UnitSpecificScale";
    CommonAnnotationTerms["UnitSpecificPrecision"] = "com.sap.vocabularies.Common.v1.UnitSpecificPrecision";
    CommonAnnotationTerms["SecondaryKey"] = "com.sap.vocabularies.Common.v1.SecondaryKey";
    CommonAnnotationTerms["MinOccurs"] = "com.sap.vocabularies.Common.v1.MinOccurs";
    CommonAnnotationTerms["MaxOccurs"] = "com.sap.vocabularies.Common.v1.MaxOccurs";
    CommonAnnotationTerms["AssociationEntity"] = "com.sap.vocabularies.Common.v1.AssociationEntity";
    CommonAnnotationTerms["DerivedNavigation"] = "com.sap.vocabularies.Common.v1.DerivedNavigation";
    CommonAnnotationTerms["Masked"] = "com.sap.vocabularies.Common.v1.Masked";
    CommonAnnotationTerms["MaskedValue"] = "com.sap.vocabularies.Common.v1.MaskedValue";
    CommonAnnotationTerms["RevealOnDemand"] = "com.sap.vocabularies.Common.v1.RevealOnDemand";
    CommonAnnotationTerms["SemanticObject"] = "com.sap.vocabularies.Common.v1.SemanticObject";
    CommonAnnotationTerms["SemanticObjectMapping"] = "com.sap.vocabularies.Common.v1.SemanticObjectMapping";
    CommonAnnotationTerms["SemanticObjectUnavailableActions"] = "com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions";
    CommonAnnotationTerms["IsInstanceAnnotation"] = "com.sap.vocabularies.Common.v1.IsInstanceAnnotation";
    CommonAnnotationTerms["FilterExpressionRestrictions"] = "com.sap.vocabularies.Common.v1.FilterExpressionRestrictions";
    CommonAnnotationTerms["FieldControl"] = "com.sap.vocabularies.Common.v1.FieldControl";
    CommonAnnotationTerms["ExceptionCategory"] = "com.sap.vocabularies.Common.v1.ExceptionCategory";
    CommonAnnotationTerms["Application"] = "com.sap.vocabularies.Common.v1.Application";
    CommonAnnotationTerms["Timestamp"] = "com.sap.vocabularies.Common.v1.Timestamp";
    CommonAnnotationTerms["TransactionId"] = "com.sap.vocabularies.Common.v1.TransactionId";
    CommonAnnotationTerms["ErrorResolution"] = "com.sap.vocabularies.Common.v1.ErrorResolution";
    CommonAnnotationTerms["Messages"] = "com.sap.vocabularies.Common.v1.Messages";
    CommonAnnotationTerms["additionalTargets"] = "com.sap.vocabularies.Common.v1.additionalTargets";
    CommonAnnotationTerms["longtextUrl"] = "com.sap.vocabularies.Common.v1.longtextUrl";
    CommonAnnotationTerms["numericSeverity"] = "com.sap.vocabularies.Common.v1.numericSeverity";
    CommonAnnotationTerms["MaximumNumericMessageSeverity"] = "com.sap.vocabularies.Common.v1.MaximumNumericMessageSeverity";
    CommonAnnotationTerms["IsActionCritical"] = "com.sap.vocabularies.Common.v1.IsActionCritical";
    CommonAnnotationTerms["Attributes"] = "com.sap.vocabularies.Common.v1.Attributes";
    CommonAnnotationTerms["RelatedRecursiveHierarchy"] = "com.sap.vocabularies.Common.v1.RelatedRecursiveHierarchy";
    CommonAnnotationTerms["Interval"] = "com.sap.vocabularies.Common.v1.Interval";
    CommonAnnotationTerms["ResultContext"] = "com.sap.vocabularies.Common.v1.ResultContext";
    CommonAnnotationTerms["SAPObjectNodeType"] = "com.sap.vocabularies.Common.v1.SAPObjectNodeType";
    CommonAnnotationTerms["Composition"] = "com.sap.vocabularies.Common.v1.Composition";
    CommonAnnotationTerms["SAPObjectNodeTypeReference"] = "com.sap.vocabularies.Common.v1.SAPObjectNodeTypeReference";
    CommonAnnotationTerms["IsNaturalPerson"] = "com.sap.vocabularies.Common.v1.IsNaturalPerson";
    CommonAnnotationTerms["ValueList"] = "com.sap.vocabularies.Common.v1.ValueList";
    CommonAnnotationTerms["ValueListRelevantQualifiers"] = "com.sap.vocabularies.Common.v1.ValueListRelevantQualifiers";
    CommonAnnotationTerms["ValueListWithFixedValues"] = "com.sap.vocabularies.Common.v1.ValueListWithFixedValues";
    CommonAnnotationTerms["ValueListShowValuesImmediately"] = "com.sap.vocabularies.Common.v1.ValueListShowValuesImmediately";
    CommonAnnotationTerms["ValueListForValidation"] = "com.sap.vocabularies.Common.v1.ValueListForValidation";
    CommonAnnotationTerms["ValueListReferences"] = "com.sap.vocabularies.Common.v1.ValueListReferences";
    CommonAnnotationTerms["ValueListMapping"] = "com.sap.vocabularies.Common.v1.ValueListMapping";
    CommonAnnotationTerms["IsCalendarYear"] = "com.sap.vocabularies.Common.v1.IsCalendarYear";
    CommonAnnotationTerms["IsCalendarHalfyear"] = "com.sap.vocabularies.Common.v1.IsCalendarHalfyear";
    CommonAnnotationTerms["IsCalendarQuarter"] = "com.sap.vocabularies.Common.v1.IsCalendarQuarter";
    CommonAnnotationTerms["IsCalendarMonth"] = "com.sap.vocabularies.Common.v1.IsCalendarMonth";
    CommonAnnotationTerms["IsCalendarWeek"] = "com.sap.vocabularies.Common.v1.IsCalendarWeek";
    CommonAnnotationTerms["IsDayOfCalendarMonth"] = "com.sap.vocabularies.Common.v1.IsDayOfCalendarMonth";
    CommonAnnotationTerms["IsDayOfCalendarYear"] = "com.sap.vocabularies.Common.v1.IsDayOfCalendarYear";
    CommonAnnotationTerms["IsCalendarYearHalfyear"] = "com.sap.vocabularies.Common.v1.IsCalendarYearHalfyear";
    CommonAnnotationTerms["IsCalendarYearQuarter"] = "com.sap.vocabularies.Common.v1.IsCalendarYearQuarter";
    CommonAnnotationTerms["IsCalendarYearMonth"] = "com.sap.vocabularies.Common.v1.IsCalendarYearMonth";
    CommonAnnotationTerms["IsCalendarYearWeek"] = "com.sap.vocabularies.Common.v1.IsCalendarYearWeek";
    CommonAnnotationTerms["IsCalendarDate"] = "com.sap.vocabularies.Common.v1.IsCalendarDate";
    CommonAnnotationTerms["IsFiscalYear"] = "com.sap.vocabularies.Common.v1.IsFiscalYear";
    CommonAnnotationTerms["IsFiscalPeriod"] = "com.sap.vocabularies.Common.v1.IsFiscalPeriod";
    CommonAnnotationTerms["IsFiscalYearPeriod"] = "com.sap.vocabularies.Common.v1.IsFiscalYearPeriod";
    CommonAnnotationTerms["IsFiscalQuarter"] = "com.sap.vocabularies.Common.v1.IsFiscalQuarter";
    CommonAnnotationTerms["IsFiscalYearQuarter"] = "com.sap.vocabularies.Common.v1.IsFiscalYearQuarter";
    CommonAnnotationTerms["IsFiscalWeek"] = "com.sap.vocabularies.Common.v1.IsFiscalWeek";
    CommonAnnotationTerms["IsFiscalYearWeek"] = "com.sap.vocabularies.Common.v1.IsFiscalYearWeek";
    CommonAnnotationTerms["IsDayOfFiscalYear"] = "com.sap.vocabularies.Common.v1.IsDayOfFiscalYear";
    CommonAnnotationTerms["IsFiscalYearVariant"] = "com.sap.vocabularies.Common.v1.IsFiscalYearVariant";
    CommonAnnotationTerms["MutuallyExclusiveTerm"] = "com.sap.vocabularies.Common.v1.MutuallyExclusiveTerm";
    CommonAnnotationTerms["OperationTemplate"] = "com.sap.vocabularies.Common.v1.OperationTemplate";
    CommonAnnotationTerms["DraftRoot"] = "com.sap.vocabularies.Common.v1.DraftRoot";
    CommonAnnotationTerms["DraftNode"] = "com.sap.vocabularies.Common.v1.DraftNode";
    CommonAnnotationTerms["DraftActivationVia"] = "com.sap.vocabularies.Common.v1.DraftActivationVia";
    CommonAnnotationTerms["EditableFieldFor"] = "com.sap.vocabularies.Common.v1.EditableFieldFor";
    CommonAnnotationTerms["SemanticKey"] = "com.sap.vocabularies.Common.v1.SemanticKey";
    CommonAnnotationTerms["SideEffects"] = "com.sap.vocabularies.Common.v1.SideEffects";
    CommonAnnotationTerms["DefaultValuesFunction"] = "com.sap.vocabularies.Common.v1.DefaultValuesFunction";
    CommonAnnotationTerms["DerivedDefaultValue"] = "com.sap.vocabularies.Common.v1.DerivedDefaultValue";
    CommonAnnotationTerms["FilterDefaultValue"] = "com.sap.vocabularies.Common.v1.FilterDefaultValue";
    CommonAnnotationTerms["FilterDefaultValueHigh"] = "com.sap.vocabularies.Common.v1.FilterDefaultValueHigh";
    CommonAnnotationTerms["DerivedFilterDefaultValue"] = "com.sap.vocabularies.Common.v1.DerivedFilterDefaultValue";
    CommonAnnotationTerms["SortOrder"] = "com.sap.vocabularies.Common.v1.SortOrder";
    CommonAnnotationTerms["RecursiveHierarchy"] = "com.sap.vocabularies.Common.v1.RecursiveHierarchy";
    CommonAnnotationTerms["CreatedAt"] = "com.sap.vocabularies.Common.v1.CreatedAt";
    CommonAnnotationTerms["CreatedBy"] = "com.sap.vocabularies.Common.v1.CreatedBy";
    CommonAnnotationTerms["ChangedAt"] = "com.sap.vocabularies.Common.v1.ChangedAt";
    CommonAnnotationTerms["ChangedBy"] = "com.sap.vocabularies.Common.v1.ChangedBy";
    CommonAnnotationTerms["OriginalProtocolVersion"] = "com.sap.vocabularies.Common.v1.OriginalProtocolVersion";
    CommonAnnotationTerms["ApplyMultiUnitBehaviorForSortingAndFiltering"] = "com.sap.vocabularies.Common.v1.ApplyMultiUnitBehaviorForSortingAndFiltering";
    CommonAnnotationTerms["mediaUploadLink"] = "com.sap.vocabularies.Common.v1.mediaUploadLink";
    CommonAnnotationTerms["PrimitivePropertyPath"] = "com.sap.vocabularies.Common.v1.PrimitivePropertyPath";
    CommonAnnotationTerms["WebSocketBaseURL"] = "com.sap.vocabularies.Common.v1.WebSocketBaseURL";
    CommonAnnotationTerms["WebSocketChannel"] = "com.sap.vocabularies.Common.v1.WebSocketChannel";
    CommonAnnotationTerms["AddressViaNavigationPath"] = "com.sap.vocabularies.Common.v1.AddressViaNavigationPath";
    CommonAnnotationTerms["ReferentialConstraint"] = "com.sap.vocabularies.Common.v1.ReferentialConstraint";
})(CommonAnnotationTerms = exports.CommonAnnotationTerms || (exports.CommonAnnotationTerms = {}));
var CommonAnnotationTypes;
(function (CommonAnnotationTypes) {
    CommonAnnotationTypes["SemanticObjectMappingAbstract"] = "com.sap.vocabularies.Common.v1.SemanticObjectMappingAbstract";
    CommonAnnotationTypes["SemanticObjectMappingType"] = "com.sap.vocabularies.Common.v1.SemanticObjectMappingType";
    CommonAnnotationTypes["SemanticObjectMappingConstant"] = "com.sap.vocabularies.Common.v1.SemanticObjectMappingConstant";
    CommonAnnotationTypes["FilterExpressionRestrictionType"] = "com.sap.vocabularies.Common.v1.FilterExpressionRestrictionType";
    CommonAnnotationTypes["ApplicationType"] = "com.sap.vocabularies.Common.v1.ApplicationType";
    CommonAnnotationTypes["ErrorResolutionType"] = "com.sap.vocabularies.Common.v1.ErrorResolutionType";
    CommonAnnotationTypes["IntervalType"] = "com.sap.vocabularies.Common.v1.IntervalType";
    CommonAnnotationTypes["SAPObjectNodeTypeType"] = "com.sap.vocabularies.Common.v1.SAPObjectNodeTypeType";
    CommonAnnotationTypes["ValueListType"] = "com.sap.vocabularies.Common.v1.ValueListType";
    CommonAnnotationTypes["ValueListMappingType"] = "com.sap.vocabularies.Common.v1.ValueListMappingType";
    CommonAnnotationTypes["ValueListParameter"] = "com.sap.vocabularies.Common.v1.ValueListParameter";
    CommonAnnotationTypes["ValueListParameterIn"] = "com.sap.vocabularies.Common.v1.ValueListParameterIn";
    CommonAnnotationTypes["ValueListParameterConstant"] = "com.sap.vocabularies.Common.v1.ValueListParameterConstant";
    CommonAnnotationTypes["ValueListParameterConstants"] = "com.sap.vocabularies.Common.v1.ValueListParameterConstants";
    CommonAnnotationTypes["ValueListParameterInOut"] = "com.sap.vocabularies.Common.v1.ValueListParameterInOut";
    CommonAnnotationTypes["ValueListParameterOut"] = "com.sap.vocabularies.Common.v1.ValueListParameterOut";
    CommonAnnotationTypes["ValueListParameterDisplayOnly"] = "com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly";
    CommonAnnotationTypes["ValueListParameterFilterOnly"] = "com.sap.vocabularies.Common.v1.ValueListParameterFilterOnly";
    CommonAnnotationTypes["DraftRootType"] = "com.sap.vocabularies.Common.v1.DraftRootType";
    CommonAnnotationTypes["DraftNodeType"] = "com.sap.vocabularies.Common.v1.DraftNodeType";
    CommonAnnotationTypes["SideEffectsType"] = "com.sap.vocabularies.Common.v1.SideEffectsType";
    CommonAnnotationTypes["SortOrderType"] = "com.sap.vocabularies.Common.v1.SortOrderType";
    CommonAnnotationTypes["RecursiveHierarchyType"] = "com.sap.vocabularies.Common.v1.RecursiveHierarchyType";
    CommonAnnotationTypes["ReferentialConstraintType"] = "com.sap.vocabularies.Common.v1.ReferentialConstraintType";
})(CommonAnnotationTypes = exports.CommonAnnotationTypes || (exports.CommonAnnotationTypes = {}));
