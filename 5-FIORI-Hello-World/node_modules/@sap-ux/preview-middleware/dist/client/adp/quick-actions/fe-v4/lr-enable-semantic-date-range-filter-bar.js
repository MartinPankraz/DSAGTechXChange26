"use strict";

sap.ui.define(["../../../cpe/quick-actions/utils", "../../../utils/core", "./utils", "../simple-quick-action-base"], function (_____cpe_quick_actions_utils, _____utils_core, ___utils, ___simple_quick_action_base) {
  "use strict";

  const pageHasControlId = _____cpe_quick_actions_utils["pageHasControlId"];
  const getControlById = _____utils_core["getControlById"];
  const executeToggleAction = ___utils["executeToggleAction"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const ENABLE_SEMANTIC_DATE_RANGE = 'enable-semantic-date-range';
  const PROPERTY_NAME = 'useSemanticDateRange';
  const PROPERTY_PATH = `controlConfiguration/@com.sap.vocabularies.UI.v1.SelectionFields/${PROPERTY_NAME}`;
  const CONTROL_TYPE = 'sap.fe.macros.controls.FilterBar';
  const boolMap = {
    'true': true,
    'false': false
  };
  /**
   * Quick Action for toggling the visibility of "Semantic date range" for filter bar fields in LR.
   */
  class ToggleSemanticDateRangeFilterBar extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_SEMANTIC_DATE_RANGE, [], '', context);
    }
    forceRefreshAfterExecution = true;
    isUseDateRangeTypeEnabled = false;
    initialize() {
      const controls = this.context.controlIndex[CONTROL_TYPE] ?? [];
      for (const control of controls) {
        const isActionApplicable = pageHasControlId(this.context.view, control.controlId);
        const filterBar = getControlById(control.controlId);
        if (isActionApplicable && filterBar) {
          this.control = filterBar;
          const value = this.context.changeService.getConfigurationPropertyValue(control.controlId, PROPERTY_NAME);
          this.isUseDateRangeTypeEnabled = value === undefined ? boolMap[this.control.data('useSemanticDateRange')] : value;
        }
      }
      return Promise.resolve();
    }
    get textKey() {
      return this.isUseDateRangeTypeEnabled ? 'QUICK_ACTION_LR_DISABLE_SEMANTIC_DATE_RANGE_FILTER_BAR' : 'QUICK_ACTION_LR_ENABLE_SEMANTIC_DATE_RANGE_FILTER_BAR';
    }
    async execute() {
      const command = await executeToggleAction(this.context, this.isUseDateRangeTypeEnabled, CONTROL_TYPE, PROPERTY_PATH);
      if (command.length) {
        this.isUseDateRangeTypeEnabled = !this.isUseDateRangeTypeEnabled;
      }
      return command;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_SEMANTIC_DATE_RANGE = ENABLE_SEMANTIC_DATE_RANGE;
  __exports.ToggleSemanticDateRangeFilterBar = ToggleSemanticDateRangeFilterBar;
  return __exports;
});
//# sourceMappingURL=lr-enable-semantic-date-range-filter-bar.js.map