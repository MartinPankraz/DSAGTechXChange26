"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../dialog-factory", "../../../cpe/quick-actions/utils", "../simple-quick-action-base", "../dialog-enablement-validator"], function (OverlayRegistry, ____dialog_factory, _____cpe_quick_actions_utils, ___simple_quick_action_base, ___dialog_enablement_validator) {
  "use strict";

  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const OP_ADD_CUSTOM_SECTION = 'op-add-custom-section';
  const CONTROL_TYPES = ['sap.uxap.ObjectPageLayout'];

  /**
   * Quick Action for adding a Header Field to an Object Page.
   */
  class AddCustomSectionQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(OP_ADD_CUSTOM_SECTION, CONTROL_TYPES, 'QUICK_ACTION_OP_ADD_CUSTOM_SECTION', context, [DIALOG_ENABLEMENT_VALIDATOR]);
    }
    async execute() {
      const objectPageLayout = getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, CONTROL_TYPES)[0];
      const overlay = OverlayRegistry.getOverlay(objectPageLayout) || [];
      await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_FRAGMENT, undefined, {
        aggregation: 'sections',
        title: 'QUICK_ACTION_OP_ADD_CUSTOM_SECTION'
      }, {
        actionName: this.type,
        telemetryEventIdentifier: this.getTelemetryIdentifier()
      });
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.OP_ADD_CUSTOM_SECTION = OP_ADD_CUSTOM_SECTION;
  __exports.AddCustomSectionQuickAction = AddCustomSectionQuickAction;
  return __exports;
});
//# sourceMappingURL=op-add-custom-section.js.map