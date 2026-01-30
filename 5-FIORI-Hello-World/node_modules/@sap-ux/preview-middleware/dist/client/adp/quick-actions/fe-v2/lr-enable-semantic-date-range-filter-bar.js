"use strict";

sap.ui.define(["../../../cpe/quick-actions/utils", "../../../utils/core", "../simple-quick-action-base", "./utils", "../../../utils/version"], function (_____cpe_quick_actions_utils, _____utils_core, ___simple_quick_action_base, ___utils, _____utils_version) {
  "use strict";

  const pageHasControlId = _____cpe_quick_actions_utils["pageHasControlId"];
  const getControlById = _____utils_core["getControlById"];
  const isA = _____utils_core["isA"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const prepareManifestChange = ___utils["prepareManifestChange"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR = 'enable-semantic-daterange-filterbar';
  const CONTROL_TYPE_LR = 'sap.ui.comp.smartfilterbar.SmartFilterBar';
  const CONTROL_TYPE_ALP = 'sap.suite.ui.generic.template.AnalyticalListPage.control.SmartFilterBarExt';
  const COMPONENT_LR = 'sap.suite.ui.generic.template.ListReport';
  const COMPONENT_ALP = 'sap.suite.ui.generic.template.AnalyticalListPage';

  /**
   * Quick Action for toggling the visibility of "semantic date range" for filterbar fields.
   */
  class ToggleSemanticDateRangeFilterBar extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR, [], '', context);
    }
    forceRefreshAfterExecution = true;
    isUseDateRangeTypeEnabled = false;
    async initialize() {
      const manifestChangesSupported = await areManifestChangesSupported(this.context.manifest);
      if (!manifestChangesSupported) {
        return;
      }
      const controls = [...(this.context.controlIndex[CONTROL_TYPE_LR] ?? []), ...(this.context.controlIndex[CONTROL_TYPE_ALP] ?? [])];
      for (const control of controls) {
        const isActionApplicable = pageHasControlId(this.context.view, control.controlId);
        const modifiedControl = getControlById(control.controlId);
        if (isActionApplicable && modifiedControl) {
          this.control = modifiedControl;
          const id = this.control.getProperty('persistencyKey') ?? this.control.getId();
          if (typeof id !== 'string') {
            throw new Error('Could not retrieve configuration property because control id is not valid!');
          }
          const value = this.context.changeService.getConfigurationPropertyValue(id, 'useDateRange');
          this.isUseDateRangeTypeEnabled = value === undefined ? this.control.getUseDateRangeType() : value;
        }
      }
    }
    get textKey() {
      return this.isUseDateRangeTypeEnabled ? 'QUICK_ACTION_LR_DISABLE_SEMANTIC_DATE_RANGE_FILTER_BAR' : 'QUICK_ACTION_LR_ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR';
    }
    async execute() {
      const version = await getUi5Version();
      const isLowerMinimalVersion = isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 126
      });
      let entitySet;
      if (isLowerMinimalVersion && isA(CONTROL_TYPE_LR, this.control)) {
        // In older versions of UI5, the getEntitySet method is unavailable, so this workaround has been introduced.
        const regex = /::([^:]+)--/;
        entitySet = regex.exec(this.control?.getId() ?? '')?.[1];
      } else {
        entitySet = isA(CONTROL_TYPE_LR, this.control) || isA(CONTROL_TYPE_ALP, this.control) ? this.control.getEntitySet() : undefined;
      }
      const viewName = this.context.view.getViewName();
      const command = await prepareManifestChange(this.context, 'component/settings/filterSettings/dateSettings', this.control, viewName.includes('AnalyticalListPage') ? COMPONENT_ALP : COMPONENT_LR, entitySet, {
        useDateRange: !this.isUseDateRangeTypeEnabled
      });
      return command;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR = ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR;
  __exports.ToggleSemanticDateRangeFilterBar = ToggleSemanticDateRangeFilterBar;
  return __exports;
});
//# sourceMappingURL=lr-enable-semantic-date-range-filter-bar.js.map