"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../cpe/quick-actions/utils", "./quick-action-base"], function (___sap_ux_private_control_property_editor_common, ____cpe_quick_actions_utils, ___quick_action_base) {
  "use strict";

  const SIMPLE_QUICK_ACTION_KIND = ___sap_ux_private_control_property_editor_common["SIMPLE_QUICK_ACTION_KIND"];
  const getRelevantControlFromActivePage = ____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const QuickActionDefinitionBase = ___quick_action_base["QuickActionDefinitionBase"];
  /**
   * Base class for all simple quick actions.
   */
  class SimpleQuickActionDefinitionBase extends QuickActionDefinitionBase {
    get isApplicable() {
      return this.control !== undefined;
    }
    constructor(type, controlTypes, defaultTextKey, context, enablementValidators = []) {
      super(type, SIMPLE_QUICK_ACTION_KIND, defaultTextKey, context, enablementValidators);
      this.type = type;
      this.controlTypes = controlTypes;
      this.defaultTextKey = defaultTextKey;
      this.context = context;
      this.enablementValidators = enablementValidators;
    }
    initialize() {
      this.control = getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, this.controlTypes)[0];
      return Promise.resolve();
    }
    getActionObject() {
      return {
        kind: SIMPLE_QUICK_ACTION_KIND,
        id: this.id,
        enabled: !this.isDisabled,
        tooltip: this.tooltip,
        title: this.context.resourceBundle.getText(this.textKey)
      };
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.SimpleQuickActionDefinitionBase = SimpleQuickActionDefinitionBase;
  return __exports;
});
//# sourceMappingURL=simple-quick-action-base.js.map