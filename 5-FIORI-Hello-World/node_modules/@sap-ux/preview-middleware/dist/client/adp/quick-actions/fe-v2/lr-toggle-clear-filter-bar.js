"use strict";

sap.ui.define(["sap/ui/rta/command/CommandFactory", "../../../cpe/quick-actions/utils", "../../../utils/core", "../simple-quick-action-base"], function (CommandFactory, _____cpe_quick_actions_utils, _____utils_core, ___simple_quick_action_base) {
  "use strict";

  const pageHasControlId = _____cpe_quick_actions_utils["pageHasControlId"];
  const getControlById = _____utils_core["getControlById"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const ENABLE_CLEAR_FILTER_BAR_TYPE = 'enable-clear-filter-bar';
  const PROPERTY_NAME = 'showClearOnFB';
  const CONTROL_TYPE_LR = 'sap.ui.comp.smartfilterbar.SmartFilterBar';
  const CONTROL_TYPE_ALP = 'sap.suite.ui.generic.template.AnalyticalListPage.control.SmartFilterBarExt';

  /**
   * Quick Action for toggling the visibility of "clear filter bar" button in List Report page.
   */
  class ToggleClearFilterBarQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_CLEAR_FILTER_BAR_TYPE, [], '', context);
    }
    isClearButtonEnabled = false;
    initialize() {
      const controls = [...(this.context.controlIndex[CONTROL_TYPE_LR] ?? []), ...(this.context.controlIndex[CONTROL_TYPE_ALP] ?? [])];
      for (const control of controls) {
        const isActionApplicable = pageHasControlId(this.context.view, control.controlId);
        const modifiedControl = getControlById(control.controlId);
        if (isActionApplicable && modifiedControl) {
          this.isClearButtonEnabled = modifiedControl.getShowClearOnFB();
          this.control = modifiedControl;
        }
      }
      return Promise.resolve();
    }
    get textKey() {
      return this.isClearButtonEnabled ? 'V2_QUICK_ACTION_LR_DISABLE_CLEAR_FILTER_BAR' : 'V2_QUICK_ACTION_LR_ENABLE_CLEAR_FILTER_BAR';
    }
    async execute() {
      if (this.control) {
        const {
          flexSettings
        } = this.context;
        const modifiedValue = {
          generator: flexSettings.generator,
          propertyName: PROPERTY_NAME,
          newValue: !this.isClearButtonEnabled
        };
        const command = await CommandFactory.getCommandFor(this.control, 'Property', modifiedValue, null, flexSettings);
        this.isClearButtonEnabled = !this.isClearButtonEnabled;
        return [command];
      }
      return [];
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