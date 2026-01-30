"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIAnnotationTypes = exports.UIAnnotationTerms = exports.OperationGroupingTypeValues = exports.OperationGroupingType = exports.CriticalityRepresentationTypeValues = exports.CriticalityRepresentationType = exports.ImportanceTypeValues = exports.ImportanceType = exports.TextArrangementTypeValues = exports.TextArrangementType = exports.SelectionRangeOptionTypeValues = exports.SelectionRangeOptionType = exports.SelectionRangeSignTypeValues = exports.SelectionRangeSignType = exports.ChartMeasureRoleTypeValues = exports.ChartMeasureRoleType = exports.ChartDimensionRoleTypeValues = exports.ChartDimensionRoleType = exports.ChartAxisAutoScaleDataScopeTypeValues = exports.ChartAxisAutoScaleDataScopeType = exports.ChartAxisScaleBehaviorTypeValues = exports.ChartAxisScaleBehaviorType = exports.ChartTypeValues = exports.ChartType = exports.TrendTypeValues = exports.TrendType = exports.ImprovementDirectionTypeValues = exports.ImprovementDirectionType = exports.CriticalityTypeValues = exports.CriticalityType = exports.VisualizationTypeValues = exports.VisualizationType = void 0;
// EnumType 
var VisualizationType;
(function (VisualizationType) {
    /**
    Visualize as a number
    */
    /**
    undefined
    */
    VisualizationType["Number"] = "UI.VisualizationType/Number";
    /**
    Visualize as bullet chart - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationType["BulletChart"] = "UI.VisualizationType/BulletChart";
    /**
    Visualize as progress indicator - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationType["Progress"] = "UI.VisualizationType/Progress";
    /**
    Visualize as partially or completely filled stars/hearts/... - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationType["Rating"] = "UI.VisualizationType/Rating";
    /**
    Visualize as donut, optionally with missing segment - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationType["Donut"] = "UI.VisualizationType/Donut";
    /**
    Visualize as delta bullet chart - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationType["DeltaBulletChart"] = "UI.VisualizationType/DeltaBulletChart";
})(VisualizationType = exports.VisualizationType || (exports.VisualizationType = {}));
var VisualizationTypeValues;
(function (VisualizationTypeValues) {
    /**
    Visualize as a number
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["Number"] = 0] = "Number";
    /**
    Visualize as bullet chart - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["BulletChart"] = 1] = "BulletChart";
    /**
    Visualize as progress indicator - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["Progress"] = 2] = "Progress";
    /**
    Visualize as partially or completely filled stars/hearts/... - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["Rating"] = 3] = "Rating";
    /**
    Visualize as donut, optionally with missing segment - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["Donut"] = 4] = "Donut";
    /**
    Visualize as delta bullet chart - requires TargetValue
    */
    /**
    undefined
    */
    VisualizationTypeValues[VisualizationTypeValues["DeltaBulletChart"] = 5] = "DeltaBulletChart";
})(VisualizationTypeValues = exports.VisualizationTypeValues || (exports.VisualizationTypeValues = {}));
// EnumType 
/**
  Criticality of a value or status, represented e.g. via semantic colors (https://experience.sap.com/fiori-design-web/foundation/colors/#semantic-colors)
*/
var CriticalityType;
(function (CriticalityType) {
    /**
    Very negative / dark-red status - risk - out of stock - late
    */
    /**
    undefined
    */
    CriticalityType["VeryNegative"] = "UI.CriticalityType/VeryNegative";
    /**
    Neutral / grey status - inactive - open - in progress
    */
    /**
    undefined
    */
    CriticalityType["Neutral"] = "UI.CriticalityType/Neutral";
    /**
    Negative / red status - attention - overload - alert
    */
    /**
    undefined
    */
    CriticalityType["Negative"] = "UI.CriticalityType/Negative";
    /**
    Critical / orange status - warning
    */
    /**
    undefined
    */
    CriticalityType["Critical"] = "UI.CriticalityType/Critical";
    /**
    Positive / green status - completed - available - on track - acceptable
    */
    /**
    undefined
    */
    CriticalityType["Positive"] = "UI.CriticalityType/Positive";
    /**
    Very positive - above max stock - excess
    */
    /**
    undefined
    */
    CriticalityType["VeryPositive"] = "UI.CriticalityType/VeryPositive";
    /**
    Information - noticable - informative
    */
    /**
    undefined
    */
    CriticalityType["Information"] = "UI.CriticalityType/Information";
})(CriticalityType = exports.CriticalityType || (exports.CriticalityType = {}));
var CriticalityTypeValues;
(function (CriticalityTypeValues) {
    /**
    Very negative / dark-red status - risk - out of stock - late
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["VeryNegative"] = -1] = "VeryNegative";
    /**
    Neutral / grey status - inactive - open - in progress
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["Neutral"] = 0] = "Neutral";
    /**
    Negative / red status - attention - overload - alert
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["Negative"] = 1] = "Negative";
    /**
    Critical / orange status - warning
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["Critical"] = 2] = "Critical";
    /**
    Positive / green status - completed - available - on track - acceptable
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["Positive"] = 3] = "Positive";
    /**
    Very positive - above max stock - excess
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["VeryPositive"] = 4] = "VeryPositive";
    /**
    Information - noticable - informative
    */
    /**
    undefined
    */
    CriticalityTypeValues[CriticalityTypeValues["Information"] = 5] = "Information";
})(CriticalityTypeValues = exports.CriticalityTypeValues || (exports.CriticalityTypeValues = {}));
// EnumType 
/**
  Describes which direction of a value change is seen as an improvement
*/
var ImprovementDirectionType;
(function (ImprovementDirectionType) {
    /**
    Lower is better
    */
    /**
    undefined
    */
    ImprovementDirectionType["Minimize"] = "UI.ImprovementDirectionType/Minimize";
    /**
    Closer to the target is better
    */
    /**
    undefined
    */
    ImprovementDirectionType["Target"] = "UI.ImprovementDirectionType/Target";
    /**
    Higher is better
    */
    /**
    undefined
    */
    ImprovementDirectionType["Maximize"] = "UI.ImprovementDirectionType/Maximize";
})(ImprovementDirectionType = exports.ImprovementDirectionType || (exports.ImprovementDirectionType = {}));
var ImprovementDirectionTypeValues;
(function (ImprovementDirectionTypeValues) {
    /**
    Lower is better
    */
    /**
    undefined
    */
    ImprovementDirectionTypeValues[ImprovementDirectionTypeValues["Minimize"] = 1] = "Minimize";
    /**
    Closer to the target is better
    */
    /**
    undefined
    */
    ImprovementDirectionTypeValues[ImprovementDirectionTypeValues["Target"] = 2] = "Target";
    /**
    Higher is better
    */
    /**
    undefined
    */
    ImprovementDirectionTypeValues[ImprovementDirectionTypeValues["Maximize"] = 3] = "Maximize";
})(ImprovementDirectionTypeValues = exports.ImprovementDirectionTypeValues || (exports.ImprovementDirectionTypeValues = {}));
// EnumType 
/**
  The trend of a value
*/
var TrendType;
(function (TrendType) {
    /**
    Value grows strongly
    */
    /**
    undefined
    */
    TrendType["StrongUp"] = "UI.TrendType/StrongUp";
    /**
    Value grows
    */
    /**
    undefined
    */
    TrendType["Up"] = "UI.TrendType/Up";
    /**
    Value does not significantly grow or shrink
    */
    /**
    undefined
    */
    TrendType["Sideways"] = "UI.TrendType/Sideways";
    /**
    Value shrinks
    */
    /**
    undefined
    */
    TrendType["Down"] = "UI.TrendType/Down";
    /**
    Value shrinks strongly
    */
    /**
    undefined
    */
    TrendType["StrongDown"] = "UI.TrendType/StrongDown";
})(TrendType = exports.TrendType || (exports.TrendType = {}));
var TrendTypeValues;
(function (TrendTypeValues) {
    /**
    Value grows strongly
    */
    /**
    undefined
    */
    TrendTypeValues[TrendTypeValues["StrongUp"] = 1] = "StrongUp";
    /**
    Value grows
    */
    /**
    undefined
    */
    TrendTypeValues[TrendTypeValues["Up"] = 2] = "Up";
    /**
    Value does not significantly grow or shrink
    */
    /**
    undefined
    */
    TrendTypeValues[TrendTypeValues["Sideways"] = 3] = "Sideways";
    /**
    Value shrinks
    */
    /**
    undefined
    */
    TrendTypeValues[TrendTypeValues["Down"] = 4] = "Down";
    /**
    Value shrinks strongly
    */
    /**
    undefined
    */
    TrendTypeValues[TrendTypeValues["StrongDown"] = 5] = "StrongDown";
})(TrendTypeValues = exports.TrendTypeValues || (exports.TrendTypeValues = {}));
// EnumType 
var ChartType;
(function (ChartType) {
    ChartType["Column"] = "UI.ChartType/Column";
    ChartType["ColumnStacked"] = "UI.ChartType/ColumnStacked";
    ChartType["ColumnDual"] = "UI.ChartType/ColumnDual";
    ChartType["ColumnStackedDual"] = "UI.ChartType/ColumnStackedDual";
    ChartType["ColumnStacked100"] = "UI.ChartType/ColumnStacked100";
    ChartType["ColumnStackedDual100"] = "UI.ChartType/ColumnStackedDual100";
    ChartType["Bar"] = "UI.ChartType/Bar";
    ChartType["BarStacked"] = "UI.ChartType/BarStacked";
    ChartType["BarDual"] = "UI.ChartType/BarDual";
    ChartType["BarStackedDual"] = "UI.ChartType/BarStackedDual";
    ChartType["BarStacked100"] = "UI.ChartType/BarStacked100";
    ChartType["BarStackedDual100"] = "UI.ChartType/BarStackedDual100";
    ChartType["Area"] = "UI.ChartType/Area";
    ChartType["AreaStacked"] = "UI.ChartType/AreaStacked";
    ChartType["AreaStacked100"] = "UI.ChartType/AreaStacked100";
    ChartType["HorizontalArea"] = "UI.ChartType/HorizontalArea";
    ChartType["HorizontalAreaStacked"] = "UI.ChartType/HorizontalAreaStacked";
    ChartType["HorizontalAreaStacked100"] = "UI.ChartType/HorizontalAreaStacked100";
    ChartType["Line"] = "UI.ChartType/Line";
    ChartType["LineDual"] = "UI.ChartType/LineDual";
    ChartType["Combination"] = "UI.ChartType/Combination";
    ChartType["CombinationStacked"] = "UI.ChartType/CombinationStacked";
    ChartType["CombinationDual"] = "UI.ChartType/CombinationDual";
    ChartType["CombinationStackedDual"] = "UI.ChartType/CombinationStackedDual";
    ChartType["HorizontalCombinationStacked"] = "UI.ChartType/HorizontalCombinationStacked";
    ChartType["Pie"] = "UI.ChartType/Pie";
    ChartType["Donut"] = "UI.ChartType/Donut";
    ChartType["Scatter"] = "UI.ChartType/Scatter";
    ChartType["Bubble"] = "UI.ChartType/Bubble";
    ChartType["Radar"] = "UI.ChartType/Radar";
    ChartType["HeatMap"] = "UI.ChartType/HeatMap";
    ChartType["TreeMap"] = "UI.ChartType/TreeMap";
    ChartType["Waterfall"] = "UI.ChartType/Waterfall";
    ChartType["Bullet"] = "UI.ChartType/Bullet";
    ChartType["VerticalBullet"] = "UI.ChartType/VerticalBullet";
    ChartType["HorizontalWaterfall"] = "UI.ChartType/HorizontalWaterfall";
    ChartType["HorizontalCombinationDual"] = "UI.ChartType/HorizontalCombinationDual";
    ChartType["HorizontalCombinationStackedDual"] = "UI.ChartType/HorizontalCombinationStackedDual";
    ChartType["Donut100"] = "UI.ChartType/Donut100";
})(ChartType = exports.ChartType || (exports.ChartType = {}));
var ChartTypeValues;
(function (ChartTypeValues) {
    ChartTypeValues[ChartTypeValues["Column"] = 0] = "Column";
    ChartTypeValues[ChartTypeValues["ColumnStacked"] = 1] = "ColumnStacked";
    ChartTypeValues[ChartTypeValues["ColumnDual"] = 2] = "ColumnDual";
    ChartTypeValues[ChartTypeValues["ColumnStackedDual"] = 3] = "ColumnStackedDual";
    ChartTypeValues[ChartTypeValues["ColumnStacked100"] = 4] = "ColumnStacked100";
    ChartTypeValues[ChartTypeValues["ColumnStackedDual100"] = 5] = "ColumnStackedDual100";
    ChartTypeValues[ChartTypeValues["Bar"] = 6] = "Bar";
    ChartTypeValues[ChartTypeValues["BarStacked"] = 7] = "BarStacked";
    ChartTypeValues[ChartTypeValues["BarDual"] = 8] = "BarDual";
    ChartTypeValues[ChartTypeValues["BarStackedDual"] = 9] = "BarStackedDual";
    ChartTypeValues[ChartTypeValues["BarStacked100"] = 10] = "BarStacked100";
    ChartTypeValues[ChartTypeValues["BarStackedDual100"] = 11] = "BarStackedDual100";
    ChartTypeValues[ChartTypeValues["Area"] = 12] = "Area";
    ChartTypeValues[ChartTypeValues["AreaStacked"] = 13] = "AreaStacked";
    ChartTypeValues[ChartTypeValues["AreaStacked100"] = 14] = "AreaStacked100";
    ChartTypeValues[ChartTypeValues["HorizontalArea"] = 15] = "HorizontalArea";
    ChartTypeValues[ChartTypeValues["HorizontalAreaStacked"] = 16] = "HorizontalAreaStacked";
    ChartTypeValues[ChartTypeValues["HorizontalAreaStacked100"] = 17] = "HorizontalAreaStacked100";
    ChartTypeValues[ChartTypeValues["Line"] = 18] = "Line";
    ChartTypeValues[ChartTypeValues["LineDual"] = 19] = "LineDual";
    ChartTypeValues[ChartTypeValues["Combination"] = 20] = "Combination";
    ChartTypeValues[ChartTypeValues["CombinationStacked"] = 21] = "CombinationStacked";
    ChartTypeValues[ChartTypeValues["CombinationDual"] = 22] = "CombinationDual";
    ChartTypeValues[ChartTypeValues["CombinationStackedDual"] = 23] = "CombinationStackedDual";
    ChartTypeValues[ChartTypeValues["HorizontalCombinationStacked"] = 24] = "HorizontalCombinationStacked";
    ChartTypeValues[ChartTypeValues["Pie"] = 25] = "Pie";
    ChartTypeValues[ChartTypeValues["Donut"] = 26] = "Donut";
    ChartTypeValues[ChartTypeValues["Scatter"] = 27] = "Scatter";
    ChartTypeValues[ChartTypeValues["Bubble"] = 28] = "Bubble";
    ChartTypeValues[ChartTypeValues["Radar"] = 29] = "Radar";
    ChartTypeValues[ChartTypeValues["HeatMap"] = 30] = "HeatMap";
    ChartTypeValues[ChartTypeValues["TreeMap"] = 31] = "TreeMap";
    ChartTypeValues[ChartTypeValues["Waterfall"] = 32] = "Waterfall";
    ChartTypeValues[ChartTypeValues["Bullet"] = 33] = "Bullet";
    ChartTypeValues[ChartTypeValues["VerticalBullet"] = 34] = "VerticalBullet";
    ChartTypeValues[ChartTypeValues["HorizontalWaterfall"] = 35] = "HorizontalWaterfall";
    ChartTypeValues[ChartTypeValues["HorizontalCombinationDual"] = 36] = "HorizontalCombinationDual";
    ChartTypeValues[ChartTypeValues["HorizontalCombinationStackedDual"] = 37] = "HorizontalCombinationStackedDual";
    ChartTypeValues[ChartTypeValues["Donut100"] = 38] = "Donut100";
})(ChartTypeValues = exports.ChartTypeValues || (exports.ChartTypeValues = {}));
// EnumType 
var ChartAxisScaleBehaviorType;
(function (ChartAxisScaleBehaviorType) {
    /**
    Value axes scale automatically
    */
    /**
    undefined
    */
    ChartAxisScaleBehaviorType["AutoScale"] = "UI.ChartAxisScaleBehaviorType/AutoScale";
    /**
    Fixed minimum and maximum values are applied, which are derived from the @UI.MeasureAttributes.DataPoint/MinimumValue and .../MaximumValue annotation by default.
        For stacking chart types with multiple measures, they are taken from ChartAxisScalingType/FixedScaleMultipleStackedMeasuresBoundaryValues.
            
    */
    /**
    undefined
    */
    ChartAxisScaleBehaviorType["FixedScale"] = "UI.ChartAxisScaleBehaviorType/FixedScale";
})(ChartAxisScaleBehaviorType = exports.ChartAxisScaleBehaviorType || (exports.ChartAxisScaleBehaviorType = {}));
var ChartAxisScaleBehaviorTypeValues;
(function (ChartAxisScaleBehaviorTypeValues) {
    /**
    Value axes scale automatically
    */
    /**
    undefined
    */
    ChartAxisScaleBehaviorTypeValues[ChartAxisScaleBehaviorTypeValues["AutoScale"] = 0] = "AutoScale";
    /**
    Fixed minimum and maximum values are applied, which are derived from the @UI.MeasureAttributes.DataPoint/MinimumValue and .../MaximumValue annotation by default.
        For stacking chart types with multiple measures, they are taken from ChartAxisScalingType/FixedScaleMultipleStackedMeasuresBoundaryValues.
            
    */
    /**
    undefined
    */
    ChartAxisScaleBehaviorTypeValues[ChartAxisScaleBehaviorTypeValues["FixedScale"] = 1] = "FixedScale";
})(ChartAxisScaleBehaviorTypeValues = exports.ChartAxisScaleBehaviorTypeValues || (exports.ChartAxisScaleBehaviorTypeValues = {}));
// EnumType 
var ChartAxisAutoScaleDataScopeType;
(function (ChartAxisAutoScaleDataScopeType) {
    /**
    Minimum and maximum axes values are determined from the entire data set
    */
    /**
    undefined
    */
    ChartAxisAutoScaleDataScopeType["DataSet"] = "UI.ChartAxisAutoScaleDataScopeType/DataSet";
    /**
    Minimum and maximum axes values are determined from the currently visible data. Scrolling will change the scale.
    */
    /**
    undefined
    */
    ChartAxisAutoScaleDataScopeType["VisibleData"] = "UI.ChartAxisAutoScaleDataScopeType/VisibleData";
})(ChartAxisAutoScaleDataScopeType = exports.ChartAxisAutoScaleDataScopeType || (exports.ChartAxisAutoScaleDataScopeType = {}));
var ChartAxisAutoScaleDataScopeTypeValues;
(function (ChartAxisAutoScaleDataScopeTypeValues) {
    /**
    Minimum and maximum axes values are determined from the entire data set
    */
    /**
    undefined
    */
    ChartAxisAutoScaleDataScopeTypeValues[ChartAxisAutoScaleDataScopeTypeValues["DataSet"] = 0] = "DataSet";
    /**
    Minimum and maximum axes values are determined from the currently visible data. Scrolling will change the scale.
    */
    /**
    undefined
    */
    ChartAxisAutoScaleDataScopeTypeValues[ChartAxisAutoScaleDataScopeTypeValues["VisibleData"] = 1] = "VisibleData";
})(ChartAxisAutoScaleDataScopeTypeValues = exports.ChartAxisAutoScaleDataScopeTypeValues || (exports.ChartAxisAutoScaleDataScopeTypeValues = {}));
// EnumType 
var ChartDimensionRoleType;
(function (ChartDimensionRoleType) {
    ChartDimensionRoleType["Category"] = "UI.ChartDimensionRoleType/Category";
    ChartDimensionRoleType["Series"] = "UI.ChartDimensionRoleType/Series";
    ChartDimensionRoleType["Category2"] = "UI.ChartDimensionRoleType/Category2";
})(ChartDimensionRoleType = exports.ChartDimensionRoleType || (exports.ChartDimensionRoleType = {}));
var ChartDimensionRoleTypeValues;
(function (ChartDimensionRoleTypeValues) {
    ChartDimensionRoleTypeValues[ChartDimensionRoleTypeValues["Category"] = 0] = "Category";
    ChartDimensionRoleTypeValues[ChartDimensionRoleTypeValues["Series"] = 1] = "Series";
    ChartDimensionRoleTypeValues[ChartDimensionRoleTypeValues["Category2"] = 2] = "Category2";
})(ChartDimensionRoleTypeValues = exports.ChartDimensionRoleTypeValues || (exports.ChartDimensionRoleTypeValues = {}));
// EnumType 
var ChartMeasureRoleType;
(function (ChartMeasureRoleType) {
    ChartMeasureRoleType["Axis1"] = "UI.ChartMeasureRoleType/Axis1";
    ChartMeasureRoleType["Axis2"] = "UI.ChartMeasureRoleType/Axis2";
    ChartMeasureRoleType["Axis3"] = "UI.ChartMeasureRoleType/Axis3";
})(ChartMeasureRoleType = exports.ChartMeasureRoleType || (exports.ChartMeasureRoleType = {}));
var ChartMeasureRoleTypeValues;
(function (ChartMeasureRoleTypeValues) {
    ChartMeasureRoleTypeValues[ChartMeasureRoleTypeValues["Axis1"] = 0] = "Axis1";
    ChartMeasureRoleTypeValues[ChartMeasureRoleTypeValues["Axis2"] = 1] = "Axis2";
    ChartMeasureRoleTypeValues[ChartMeasureRoleTypeValues["Axis3"] = 2] = "Axis3";
})(ChartMeasureRoleTypeValues = exports.ChartMeasureRoleTypeValues || (exports.ChartMeasureRoleTypeValues = {}));
// EnumType 
var SelectionRangeSignType;
(function (SelectionRangeSignType) {
    /**
    Inclusive
    */
    /**
    undefined
    */
    SelectionRangeSignType["I"] = "UI.SelectionRangeSignType/I";
    /**
    Exclusive
    */
    /**
    undefined
    */
    SelectionRangeSignType["E"] = "UI.SelectionRangeSignType/E";
})(SelectionRangeSignType = exports.SelectionRangeSignType || (exports.SelectionRangeSignType = {}));
var SelectionRangeSignTypeValues;
(function (SelectionRangeSignTypeValues) {
    /**
    Inclusive
    */
    /**
    undefined
    */
    SelectionRangeSignTypeValues[SelectionRangeSignTypeValues["I"] = 0] = "I";
    /**
    Exclusive
    */
    /**
    undefined
    */
    SelectionRangeSignTypeValues[SelectionRangeSignTypeValues["E"] = 1] = "E";
})(SelectionRangeSignTypeValues = exports.SelectionRangeSignTypeValues || (exports.SelectionRangeSignTypeValues = {}));
// EnumType 
/**
  Comparison operator
*/
var SelectionRangeOptionType;
(function (SelectionRangeOptionType) {
    /**
    Equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionType["EQ"] = "UI.SelectionRangeOptionType/EQ";
    /**
    Between
    */
    /**
    undefined
    */
    SelectionRangeOptionType["BT"] = "UI.SelectionRangeOptionType/BT";
    /**
    Contains pattern
    */
    /**
    undefined
    */
    SelectionRangeOptionType["CP"] = "UI.SelectionRangeOptionType/CP";
    /**
    Less than or equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionType["LE"] = "UI.SelectionRangeOptionType/LE";
    /**
    Greater than or equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionType["GE"] = "UI.SelectionRangeOptionType/GE";
    /**
    Not equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionType["NE"] = "UI.SelectionRangeOptionType/NE";
    /**
    Not between
    */
    /**
    undefined
    */
    SelectionRangeOptionType["NB"] = "UI.SelectionRangeOptionType/NB";
    /**
    Does not contain pattern
    */
    /**
    undefined
    */
    SelectionRangeOptionType["NP"] = "UI.SelectionRangeOptionType/NP";
    /**
    Greater than
    */
    /**
    undefined
    */
    SelectionRangeOptionType["GT"] = "UI.SelectionRangeOptionType/GT";
    /**
    Less than
    */
    /**
    undefined
    */
    SelectionRangeOptionType["LT"] = "UI.SelectionRangeOptionType/LT";
})(SelectionRangeOptionType = exports.SelectionRangeOptionType || (exports.SelectionRangeOptionType = {}));
var SelectionRangeOptionTypeValues;
(function (SelectionRangeOptionTypeValues) {
    /**
    Equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["EQ"] = 0] = "EQ";
    /**
    Between
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["BT"] = 1] = "BT";
    /**
    Contains pattern
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["CP"] = 2] = "CP";
    /**
    Less than or equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["LE"] = 3] = "LE";
    /**
    Greater than or equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["GE"] = 4] = "GE";
    /**
    Not equal to
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["NE"] = 5] = "NE";
    /**
    Not between
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["NB"] = 6] = "NB";
    /**
    Does not contain pattern
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["NP"] = 7] = "NP";
    /**
    Greater than
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["GT"] = 8] = "GT";
    /**
    Less than
    */
    /**
    undefined
    */
    SelectionRangeOptionTypeValues[SelectionRangeOptionTypeValues["LT"] = 9] = "LT";
})(SelectionRangeOptionTypeValues = exports.SelectionRangeOptionTypeValues || (exports.SelectionRangeOptionTypeValues = {}));
// EnumType 
var TextArrangementType;
(function (TextArrangementType) {
    /**
    Text is first, followed by the code/ID (e.g. in parentheses)
    */
    /**
    undefined
    */
    TextArrangementType["TextFirst"] = "UI.TextArrangementType/TextFirst";
    /**
    Code/ID is first, followed by the text (e.g. separated by a dash)
    */
    /**
    undefined
    */
    TextArrangementType["TextLast"] = "UI.TextArrangementType/TextLast";
    /**
    Code/ID and text are represented separately (code/ID will be shown and text can be visualized in a separate place)
    */
    /**
    undefined
    */
    TextArrangementType["TextSeparate"] = "UI.TextArrangementType/TextSeparate";
    /**
    Only text is represented, code/ID is hidden (e.g. for UUIDs)
    */
    /**
    undefined
    */
    TextArrangementType["TextOnly"] = "UI.TextArrangementType/TextOnly";
})(TextArrangementType = exports.TextArrangementType || (exports.TextArrangementType = {}));
var TextArrangementTypeValues;
(function (TextArrangementTypeValues) {
    /**
    Text is first, followed by the code/ID (e.g. in parentheses)
    */
    /**
    undefined
    */
    TextArrangementTypeValues[TextArrangementTypeValues["TextFirst"] = 0] = "TextFirst";
    /**
    Code/ID is first, followed by the text (e.g. separated by a dash)
    */
    /**
    undefined
    */
    TextArrangementTypeValues[TextArrangementTypeValues["TextLast"] = 1] = "TextLast";
    /**
    Code/ID and text are represented separately (code/ID will be shown and text can be visualized in a separate place)
    */
    /**
    undefined
    */
    TextArrangementTypeValues[TextArrangementTypeValues["TextSeparate"] = 2] = "TextSeparate";
    /**
    Only text is represented, code/ID is hidden (e.g. for UUIDs)
    */
    /**
    undefined
    */
    TextArrangementTypeValues[TextArrangementTypeValues["TextOnly"] = 3] = "TextOnly";
})(TextArrangementTypeValues = exports.TextArrangementTypeValues || (exports.TextArrangementTypeValues = {}));
// EnumType 
var ImportanceType;
(function (ImportanceType) {
    /**
    High importance
    */
    /**
    undefined
    */
    ImportanceType["High"] = "UI.ImportanceType/High";
    /**
    Medium importance
    */
    /**
    undefined
    */
    ImportanceType["Medium"] = "UI.ImportanceType/Medium";
    /**
    Low importance
    */
    /**
    undefined
    */
    ImportanceType["Low"] = "UI.ImportanceType/Low";
})(ImportanceType = exports.ImportanceType || (exports.ImportanceType = {}));
var ImportanceTypeValues;
(function (ImportanceTypeValues) {
    /**
    High importance
    */
    /**
    undefined
    */
    ImportanceTypeValues[ImportanceTypeValues["High"] = 0] = "High";
    /**
    Medium importance
    */
    /**
    undefined
    */
    ImportanceTypeValues[ImportanceTypeValues["Medium"] = 1] = "Medium";
    /**
    Low importance
    */
    /**
    undefined
    */
    ImportanceTypeValues[ImportanceTypeValues["Low"] = 2] = "Low";
})(ImportanceTypeValues = exports.ImportanceTypeValues || (exports.ImportanceTypeValues = {}));
// EnumType 
var CriticalityRepresentationType;
(function (CriticalityRepresentationType) {
    /**
    Criticality is represented with an icon
    */
    /**
    undefined
    */
    CriticalityRepresentationType["WithIcon"] = "UI.CriticalityRepresentationType/WithIcon";
    /**
    Criticality is represented without icon, e.g. only via text color
    */
    /**
    undefined
    */
    CriticalityRepresentationType["WithoutIcon"] = "UI.CriticalityRepresentationType/WithoutIcon";
    /**
    Criticality is represented only by using an icon
    */
    /**
    undefined
    */
    CriticalityRepresentationType["OnlyIcon"] = "UI.CriticalityRepresentationType/OnlyIcon";
})(CriticalityRepresentationType = exports.CriticalityRepresentationType || (exports.CriticalityRepresentationType = {}));
var CriticalityRepresentationTypeValues;
(function (CriticalityRepresentationTypeValues) {
    /**
    Criticality is represented with an icon
    */
    /**
    undefined
    */
    CriticalityRepresentationTypeValues[CriticalityRepresentationTypeValues["WithIcon"] = 0] = "WithIcon";
    /**
    Criticality is represented without icon, e.g. only via text color
    */
    /**
    undefined
    */
    CriticalityRepresentationTypeValues[CriticalityRepresentationTypeValues["WithoutIcon"] = 1] = "WithoutIcon";
    /**
    Criticality is represented only by using an icon
    */
    /**
    undefined
    */
    CriticalityRepresentationTypeValues[CriticalityRepresentationTypeValues["OnlyIcon"] = 2] = "OnlyIcon";
})(CriticalityRepresentationTypeValues = exports.CriticalityRepresentationTypeValues || (exports.CriticalityRepresentationTypeValues = {}));
// EnumType 
var OperationGroupingType;
(function (OperationGroupingType) {
    /**
    Invoke each action in isolation from other actions
    */
    /**
    undefined
    */
    OperationGroupingType["Isolated"] = "UI.OperationGroupingType/Isolated";
    /**
    Group all actions into a single change set
    */
    /**
    undefined
    */
    OperationGroupingType["ChangeSet"] = "UI.OperationGroupingType/ChangeSet";
})(OperationGroupingType = exports.OperationGroupingType || (exports.OperationGroupingType = {}));
var OperationGroupingTypeValues;
(function (OperationGroupingTypeValues) {
    /**
    Invoke each action in isolation from other actions
    */
    /**
    undefined
    */
    OperationGroupingTypeValues[OperationGroupingTypeValues["Isolated"] = 0] = "Isolated";
    /**
    Group all actions into a single change set
    */
    /**
    undefined
    */
    OperationGroupingTypeValues[OperationGroupingTypeValues["ChangeSet"] = 1] = "ChangeSet";
})(OperationGroupingTypeValues = exports.OperationGroupingTypeValues || (exports.OperationGroupingTypeValues = {}));
var UIAnnotationTerms;
(function (UIAnnotationTerms) {
    UIAnnotationTerms["HeaderInfo"] = "com.sap.vocabularies.UI.v1.HeaderInfo";
    UIAnnotationTerms["Identification"] = "com.sap.vocabularies.UI.v1.Identification";
    UIAnnotationTerms["Badge"] = "com.sap.vocabularies.UI.v1.Badge";
    UIAnnotationTerms["LineItem"] = "com.sap.vocabularies.UI.v1.LineItem";
    UIAnnotationTerms["StatusInfo"] = "com.sap.vocabularies.UI.v1.StatusInfo";
    UIAnnotationTerms["FieldGroup"] = "com.sap.vocabularies.UI.v1.FieldGroup";
    UIAnnotationTerms["ConnectedFields"] = "com.sap.vocabularies.UI.v1.ConnectedFields";
    UIAnnotationTerms["GeoLocations"] = "com.sap.vocabularies.UI.v1.GeoLocations";
    UIAnnotationTerms["GeoLocation"] = "com.sap.vocabularies.UI.v1.GeoLocation";
    UIAnnotationTerms["Contacts"] = "com.sap.vocabularies.UI.v1.Contacts";
    UIAnnotationTerms["MediaResource"] = "com.sap.vocabularies.UI.v1.MediaResource";
    UIAnnotationTerms["DataPoint"] = "com.sap.vocabularies.UI.v1.DataPoint";
    UIAnnotationTerms["KPI"] = "com.sap.vocabularies.UI.v1.KPI";
    UIAnnotationTerms["Chart"] = "com.sap.vocabularies.UI.v1.Chart";
    UIAnnotationTerms["ValueCriticality"] = "com.sap.vocabularies.UI.v1.ValueCriticality";
    UIAnnotationTerms["CriticalityLabels"] = "com.sap.vocabularies.UI.v1.CriticalityLabels";
    UIAnnotationTerms["SelectionFields"] = "com.sap.vocabularies.UI.v1.SelectionFields";
    UIAnnotationTerms["Facets"] = "com.sap.vocabularies.UI.v1.Facets";
    UIAnnotationTerms["HeaderFacets"] = "com.sap.vocabularies.UI.v1.HeaderFacets";
    UIAnnotationTerms["QuickViewFacets"] = "com.sap.vocabularies.UI.v1.QuickViewFacets";
    UIAnnotationTerms["QuickCreateFacets"] = "com.sap.vocabularies.UI.v1.QuickCreateFacets";
    UIAnnotationTerms["FilterFacets"] = "com.sap.vocabularies.UI.v1.FilterFacets";
    UIAnnotationTerms["OperationParameterFacets"] = "com.sap.vocabularies.UI.v1.OperationParameterFacets";
    UIAnnotationTerms["SelectionPresentationVariant"] = "com.sap.vocabularies.UI.v1.SelectionPresentationVariant";
    UIAnnotationTerms["PresentationVariant"] = "com.sap.vocabularies.UI.v1.PresentationVariant";
    UIAnnotationTerms["SelectionVariant"] = "com.sap.vocabularies.UI.v1.SelectionVariant";
    UIAnnotationTerms["ThingPerspective"] = "com.sap.vocabularies.UI.v1.ThingPerspective";
    UIAnnotationTerms["IsSummary"] = "com.sap.vocabularies.UI.v1.IsSummary";
    UIAnnotationTerms["PartOfPreview"] = "com.sap.vocabularies.UI.v1.PartOfPreview";
    UIAnnotationTerms["Map"] = "com.sap.vocabularies.UI.v1.Map";
    UIAnnotationTerms["Gallery"] = "com.sap.vocabularies.UI.v1.Gallery";
    UIAnnotationTerms["IsImageURL"] = "com.sap.vocabularies.UI.v1.IsImageURL";
    UIAnnotationTerms["IsImage"] = "com.sap.vocabularies.UI.v1.IsImage";
    UIAnnotationTerms["MultiLineText"] = "com.sap.vocabularies.UI.v1.MultiLineText";
    UIAnnotationTerms["Placeholder"] = "com.sap.vocabularies.UI.v1.Placeholder";
    UIAnnotationTerms["InputMask"] = "com.sap.vocabularies.UI.v1.InputMask";
    UIAnnotationTerms["TextArrangement"] = "com.sap.vocabularies.UI.v1.TextArrangement";
    UIAnnotationTerms["DateTimeStyle"] = "com.sap.vocabularies.UI.v1.DateTimeStyle";
    UIAnnotationTerms["Note"] = "com.sap.vocabularies.UI.v1.Note";
    UIAnnotationTerms["Importance"] = "com.sap.vocabularies.UI.v1.Importance";
    UIAnnotationTerms["Hidden"] = "com.sap.vocabularies.UI.v1.Hidden";
    UIAnnotationTerms["IsCopyAction"] = "com.sap.vocabularies.UI.v1.IsCopyAction";
    UIAnnotationTerms["IsAIOperation"] = "com.sap.vocabularies.UI.v1.IsAIOperation";
    UIAnnotationTerms["CreateHidden"] = "com.sap.vocabularies.UI.v1.CreateHidden";
    UIAnnotationTerms["UpdateHidden"] = "com.sap.vocabularies.UI.v1.UpdateHidden";
    UIAnnotationTerms["DeleteHidden"] = "com.sap.vocabularies.UI.v1.DeleteHidden";
    UIAnnotationTerms["HiddenFilter"] = "com.sap.vocabularies.UI.v1.HiddenFilter";
    UIAnnotationTerms["AdaptationHidden"] = "com.sap.vocabularies.UI.v1.AdaptationHidden";
    UIAnnotationTerms["DataFieldDefault"] = "com.sap.vocabularies.UI.v1.DataFieldDefault";
    UIAnnotationTerms["Criticality"] = "com.sap.vocabularies.UI.v1.Criticality";
    UIAnnotationTerms["CriticalityCalculation"] = "com.sap.vocabularies.UI.v1.CriticalityCalculation";
    UIAnnotationTerms["Emphasized"] = "com.sap.vocabularies.UI.v1.Emphasized";
    UIAnnotationTerms["OrderBy"] = "com.sap.vocabularies.UI.v1.OrderBy";
    UIAnnotationTerms["ParameterDefaultValue"] = "com.sap.vocabularies.UI.v1.ParameterDefaultValue";
    UIAnnotationTerms["RecommendationState"] = "com.sap.vocabularies.UI.v1.RecommendationState";
    UIAnnotationTerms["RecommendationList"] = "com.sap.vocabularies.UI.v1.RecommendationList";
    UIAnnotationTerms["Recommendations"] = "com.sap.vocabularies.UI.v1.Recommendations";
    UIAnnotationTerms["ExcludeFromNavigationContext"] = "com.sap.vocabularies.UI.v1.ExcludeFromNavigationContext";
    UIAnnotationTerms["DoNotCheckScaleOfMeasuredQuantity"] = "com.sap.vocabularies.UI.v1.DoNotCheckScaleOfMeasuredQuantity";
    UIAnnotationTerms["LeadingEntitySet"] = "com.sap.vocabularies.UI.v1.LeadingEntitySet";
})(UIAnnotationTerms = exports.UIAnnotationTerms || (exports.UIAnnotationTerms = {}));
var UIAnnotationTypes;
(function (UIAnnotationTypes) {
    UIAnnotationTypes["HeaderInfoType"] = "com.sap.vocabularies.UI.v1.HeaderInfoType";
    UIAnnotationTypes["BadgeType"] = "com.sap.vocabularies.UI.v1.BadgeType";
    UIAnnotationTypes["FieldGroupType"] = "com.sap.vocabularies.UI.v1.FieldGroupType";
    UIAnnotationTypes["ConnectedFieldsType"] = "com.sap.vocabularies.UI.v1.ConnectedFieldsType";
    UIAnnotationTypes["GeoLocationType"] = "com.sap.vocabularies.UI.v1.GeoLocationType";
    UIAnnotationTypes["MediaResourceType"] = "com.sap.vocabularies.UI.v1.MediaResourceType";
    UIAnnotationTypes["ImageType"] = "com.sap.vocabularies.UI.v1.ImageType";
    UIAnnotationTypes["DataPointType"] = "com.sap.vocabularies.UI.v1.DataPointType";
    UIAnnotationTypes["NumberFormat"] = "com.sap.vocabularies.UI.v1.NumberFormat";
    UIAnnotationTypes["ReferencePeriod"] = "com.sap.vocabularies.UI.v1.ReferencePeriod";
    UIAnnotationTypes["CriticalityCalculationType"] = "com.sap.vocabularies.UI.v1.CriticalityCalculationType";
    UIAnnotationTypes["CriticalityThresholdsType"] = "com.sap.vocabularies.UI.v1.CriticalityThresholdsType";
    UIAnnotationTypes["LevelThresholdsType"] = "com.sap.vocabularies.UI.v1.LevelThresholdsType";
    UIAnnotationTypes["TrendCalculationType"] = "com.sap.vocabularies.UI.v1.TrendCalculationType";
    UIAnnotationTypes["KPIType"] = "com.sap.vocabularies.UI.v1.KPIType";
    UIAnnotationTypes["KPIDetailType"] = "com.sap.vocabularies.UI.v1.KPIDetailType";
    UIAnnotationTypes["ChartDefinitionType"] = "com.sap.vocabularies.UI.v1.ChartDefinitionType";
    UIAnnotationTypes["ChartAxisScalingType"] = "com.sap.vocabularies.UI.v1.ChartAxisScalingType";
    UIAnnotationTypes["ChartAxisAutoScaleBehaviorType"] = "com.sap.vocabularies.UI.v1.ChartAxisAutoScaleBehaviorType";
    UIAnnotationTypes["FixedScaleMultipleStackedMeasuresBoundaryValuesType"] = "com.sap.vocabularies.UI.v1.FixedScaleMultipleStackedMeasuresBoundaryValuesType";
    UIAnnotationTypes["ChartDimensionAttributeType"] = "com.sap.vocabularies.UI.v1.ChartDimensionAttributeType";
    UIAnnotationTypes["ChartMeasureAttributeType"] = "com.sap.vocabularies.UI.v1.ChartMeasureAttributeType";
    UIAnnotationTypes["EmphasisLabelType"] = "com.sap.vocabularies.UI.v1.EmphasisLabelType";
    UIAnnotationTypes["ValueCriticalityType"] = "com.sap.vocabularies.UI.v1.ValueCriticalityType";
    UIAnnotationTypes["CriticalityLabelType"] = "com.sap.vocabularies.UI.v1.CriticalityLabelType";
    UIAnnotationTypes["Facet"] = "com.sap.vocabularies.UI.v1.Facet";
    UIAnnotationTypes["CollectionFacet"] = "com.sap.vocabularies.UI.v1.CollectionFacet";
    UIAnnotationTypes["ReferenceFacet"] = "com.sap.vocabularies.UI.v1.ReferenceFacet";
    UIAnnotationTypes["ReferenceURLFacet"] = "com.sap.vocabularies.UI.v1.ReferenceURLFacet";
    UIAnnotationTypes["SelectionPresentationVariantType"] = "com.sap.vocabularies.UI.v1.SelectionPresentationVariantType";
    UIAnnotationTypes["PresentationVariantType"] = "com.sap.vocabularies.UI.v1.PresentationVariantType";
    UIAnnotationTypes["SelectionVariantType"] = "com.sap.vocabularies.UI.v1.SelectionVariantType";
    UIAnnotationTypes["ParameterAbstract"] = "com.sap.vocabularies.UI.v1.ParameterAbstract";
    UIAnnotationTypes["Parameter"] = "com.sap.vocabularies.UI.v1.Parameter";
    UIAnnotationTypes["IntervalParameter"] = "com.sap.vocabularies.UI.v1.IntervalParameter";
    UIAnnotationTypes["SelectOptionType"] = "com.sap.vocabularies.UI.v1.SelectOptionType";
    UIAnnotationTypes["SelectionRangeType"] = "com.sap.vocabularies.UI.v1.SelectionRangeType";
    UIAnnotationTypes["InputMaskType"] = "com.sap.vocabularies.UI.v1.InputMaskType";
    UIAnnotationTypes["InputMaskRuleType"] = "com.sap.vocabularies.UI.v1.InputMaskRuleType";
    UIAnnotationTypes["NoteType"] = "com.sap.vocabularies.UI.v1.NoteType";
    UIAnnotationTypes["DataFieldAbstract"] = "com.sap.vocabularies.UI.v1.DataFieldAbstract";
    UIAnnotationTypes["DataFieldForAnnotation"] = "com.sap.vocabularies.UI.v1.DataFieldForAnnotation";
    UIAnnotationTypes["DataFieldForActionAbstract"] = "com.sap.vocabularies.UI.v1.DataFieldForActionAbstract";
    UIAnnotationTypes["DataFieldForAction"] = "com.sap.vocabularies.UI.v1.DataFieldForAction";
    UIAnnotationTypes["DataFieldForIntentBasedNavigation"] = "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";
    UIAnnotationTypes["DataFieldForActionGroup"] = "com.sap.vocabularies.UI.v1.DataFieldForActionGroup";
    UIAnnotationTypes["DataField"] = "com.sap.vocabularies.UI.v1.DataField";
    UIAnnotationTypes["DataFieldWithAction"] = "com.sap.vocabularies.UI.v1.DataFieldWithAction";
    UIAnnotationTypes["DataFieldWithIntentBasedNavigation"] = "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation";
    UIAnnotationTypes["DataFieldWithNavigationPath"] = "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath";
    UIAnnotationTypes["DataFieldWithUrl"] = "com.sap.vocabularies.UI.v1.DataFieldWithUrl";
    UIAnnotationTypes["DataFieldWithActionGroup"] = "com.sap.vocabularies.UI.v1.DataFieldWithActionGroup";
    UIAnnotationTypes["RecommendationListType"] = "com.sap.vocabularies.UI.v1.RecommendationListType";
    UIAnnotationTypes["RecommendationBinding"] = "com.sap.vocabularies.UI.v1.RecommendationBinding";
    UIAnnotationTypes["PropertyRecommendationType"] = "com.sap.vocabularies.UI.v1.PropertyRecommendationType";
})(UIAnnotationTypes = exports.UIAnnotationTypes || (exports.UIAnnotationTypes = {}));
