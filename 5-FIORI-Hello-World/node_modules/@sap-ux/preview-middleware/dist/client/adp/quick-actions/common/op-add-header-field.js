"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../dialog-factory", "../../../utils/core", "../simple-quick-action-base", "../dialog-enablement-validator", "../../../i18n"], function (OverlayRegistry, ____dialog_factory, _____utils_core, ___simple_quick_action_base, ___dialog_enablement_validator, _____i18n) {
  "use strict";

  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const isA = _____utils_core["isA"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const getTextBundle = _____i18n["getTextBundle"];
  const OP_ADD_HEADER_FIELD_TYPE = 'op-add-header-field';
  const CONTROL_TYPES = ['sap.uxap.ObjectPageLayout'];

  /**
   * Quick Action for adding a Header Field to an Object Page.
   */
  class AddHeaderFieldQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(OP_ADD_HEADER_FIELD_TYPE, CONTROL_TYPES, 'QUICK_ACTION_OP_ADD_HEADER_FIELD', context, [DIALOG_ENABLEMENT_VALIDATOR, {
        run: async () => {
          const i18n = await getTextBundle();
          if (!this.control?.getShowHeaderContent()) {
            return {
              type: 'error',
              message: i18n.getText('DISABLE_SHOW_HEADER_CONTENT')
            };
          }
          return undefined;
        }
      }]);
    }
    async execute() {
      if (!this.control) {
        return [];
      }
      const headerContent = this.control.getHeaderContent();

      // check if only flex box exist in the headerContent.
      if (headerContent.length === 1 && isA('sap.m.FlexBox', headerContent[0])) {
        const overlay = OverlayRegistry.getOverlay(headerContent[0]) || [];
        await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_FRAGMENT, undefined, {
          aggregation: 'items',
          title: 'QUICK_ACTION_OP_ADD_HEADER_FIELD'
        }, {
          actionName: this.type,
          telemetryEventIdentifier: this.getTelemetryIdentifier()
        });
      } else if (this.control) {
        const overlay = OverlayRegistry.getOverlay(this.control) || [];
        await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_FRAGMENT, undefined, {
          aggregation: 'headerContent',
          title: 'QUICK_ACTION_OP_ADD_HEADER_FIELD'
        }, {
          actionName: this.type,
          telemetryEventIdentifier: this.getTelemetryIdentifier()
        });
      }
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.OP_ADD_HEADER_FIELD_TYPE = OP_ADD_HEADER_FIELD_TYPE;
  __exports.AddHeaderFieldQuickAction = AddHeaderFieldQuickAction;
  return __exports;
});
//# sourceMappingURL=op-add-header-field.js.map