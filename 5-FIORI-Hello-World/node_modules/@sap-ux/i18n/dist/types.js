"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_RELEVANT_FOR_TRANSLATION = exports.SapLongTextType = exports.SapShortTextType = void 0;
/**
 * Text types for texts that are less than 120 characters long
 * https://openui5.hana.ondemand.com/topic/831039835e7c4da3a8a0b49567573afe
 */
var SapShortTextType;
(function (SapShortTextType) {
    SapShortTextType["Accessibility"] = "XACT";
    SapShortTextType["AlternativeText"] = "XALT";
    SapShortTextType["BreadcrumbStep"] = "XBCB";
    SapShortTextType["BulletListItemText"] = "XBLI";
    SapShortTextType["ButtonText"] = "XBUT";
    SapShortTextType["Caption"] = "XCAP";
    SapShortTextType["Cell"] = "XCEL";
    SapShortTextType["Checkbox"] = "XCKL";
    SapShortTextType["ColumnHeader"] = "XCOL";
    SapShortTextType["Tabstrip"] = "XCRD";
    SapShortTextType["DataNavigationText"] = "XDAT";
    SapShortTextType["Label"] = "XFLD";
    SapShortTextType["Frame"] = "XFRM";
    SapShortTextType["Term"] = "XGLS";
    SapShortTextType["GroupTitle"] = "XGRP";
    SapShortTextType["Heading"] = "XHED";
    SapShortTextType["LegendText"] = "XLGD";
    SapShortTextType["HyperlinkText"] = "XLNK";
    SapShortTextType["LogEntry"] = "XLOG";
    SapShortTextType["ListBoxItem"] = "XLST";
    SapShortTextType["MenuHeader"] = "XMEN";
    SapShortTextType["MenuItem"] = "XMIT";
    SapShortTextType["MessageText"] = "XMSG";
    SapShortTextType["RadioButton"] = "XRBL";
    SapShortTextType["RoadmapStep"] = "XRMP";
    SapShortTextType["TableRowHeading"] = "XROW";
    SapShortTextType["SelectionText"] = "XSEL";
    SapShortTextType["TabStripText"] = "XTBS";
    SapShortTextType["TableTitle"] = "XTIT";
    SapShortTextType["TreeNodeText"] = "XTND";
    SapShortTextType["QuickInfoText"] = "XTOL";
    SapShortTextType["GeneralText"] = "XTXT";
})(SapShortTextType || (exports.SapShortTextType = SapShortTextType = {}));
/**
 * Text types for texts that are more than 120 characters long
 * https://openui5.hana.ondemand.com/topic/831039835e7c4da3a8a0b49567573afe
 */
var SapLongTextType;
(function (SapLongTextType) {
    SapLongTextType["Accessibility"] = "YACT";
    SapLongTextType["BulletListItemText"] = "YBLI";
    SapLongTextType["Definition"] = "YDEF";
    SapLongTextType["Description"] = "YDES";
    SapLongTextType["Explanation"] = "YEXP";
    SapLongTextType["FaqAnswer"] = "YFAA";
    SapLongTextType["Faq"] = "YFAQ";
    SapLongTextType["GlossaryDefinition"] = "YGLS";
    SapLongTextType["Information"] = "YINF";
    SapLongTextType["Instruction"] = "YINS";
    SapLongTextType["LogEntry"] = "YLOG";
    SapLongTextType["ErrorMessage"] = "YMSE";
    SapLongTextType["MessageText"] = "YMSG";
    SapLongTextType["InformationMessageLong"] = "YMSI";
    SapLongTextType["WarningMessage"] = "YMSW";
    SapLongTextType["TechnicalText"] = "YTEC";
    SapLongTextType["Ticker"] = "YTIC";
    SapLongTextType["GeneralTextLong"] = "YTXT";
})(SapLongTextType || (exports.SapLongTextType = SapLongTextType = {}));
exports.NOT_RELEVANT_FOR_TRANSLATION = 'NOTR';
//# sourceMappingURL=types.js.map