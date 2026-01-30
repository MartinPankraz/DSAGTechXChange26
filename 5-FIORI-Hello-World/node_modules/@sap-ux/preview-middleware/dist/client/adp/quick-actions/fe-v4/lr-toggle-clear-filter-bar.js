"use strict";

sap.ui.define(["../../../cpe/quick-actions/utils", "../../../utils/core", "./utils", "../simple-quick-action-base"], function (_____cpe_quick_actions_utils, _____utils_core, ___utils, ___simple_quick_action_base) {
  "use strict";

  const pageHasControlId = _____cpe_quick_actions_utils["pageHasControlId"];
  const getControlById = _____utils_core["getControlById"];
  const executeToggleAction = ___utils["executeToggleAction"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const ENABLE_CLEAR_FILTER_BAR_TYPE = 'enable-clear-filter-bar';
  const PROPERTY_NAME = 'showClearButton';
  const PROPERTY_PATH = `controlConfiguration/@com.sap.vocabularies.UI.v1.SelectionFields/${PROPERTY_NAME}`;
  const CONTROL_TYPE = 'sap.fe.macros.controls.FilterBar';

  /**
   * Quick Action for toggling the visibility of "clear filter bar" button in List Report page.
   */
  class ToggleClearFilterBarQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_CLEAR_FILTER_BAR_TYPE, [], '', context);
    }
    forceRefreshAfterExecution = true;
    isClearButtonEnabled = false;
    initialize() {
      const controls = this.context.controlIndex[CONTROL_TYPE] ?? [];
      for (const control of controls) {
        const isActionApplicable = pageHasControlId(this.context.view, control.controlId);
        const filterBar = getControlById(control.controlId);
        if (isActionApplicable && filterBar) {
          this.control = filterBar;
          const value = this.context.changeService.getConfigurationPropertyValue(control.controlId, PROPERTY_NAME);
          this.isClearButtonEnabled = value === undefined ? filterBar.getShowClearButton() : value;
        }
      }
      return Promise.resolve();
    }
    get textKey() {
      return this.isClearButtonEnabled ? 'V4_QUICK_ACTION_LR_DISABLE_CLEAR_FILTER_BAR' : 'V4_QUICK_ACTION_LR_ENABLE_CLEAR_FILTER_BAR';
    }
    async execute() {
      const command = await executeToggleAction(this.context, this.isClearButtonEnabled, CONTROL_TYPE, PROPERTY_PATH);
      if (command.length) {
        this.isClearButtonEnabled = !this.isClearButtonEnabled;
      }
      return command;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_CLEAR_FILTER_BAR_TYPE = ENABLE_CLEAR_FILTER_BAR_TYPE;
  __exports.ToggleClearFilterBarQuickAction = ToggleClearFilterBarQuickAction;
  return __exports;
});
//# sourceMappingURL=lr-toggle-clear-filter-bar.js.map