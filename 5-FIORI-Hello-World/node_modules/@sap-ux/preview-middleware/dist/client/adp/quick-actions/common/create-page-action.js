"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../dialog-factory", "../simple-quick-action-base", "../../../utils/application", "../../../utils/version", "../dialog-enablement-validator"], function (OverlayRegistry, ____dialog_factory, ___simple_quick_action_base, _____utils_application, _____utils_version, ___dialog_enablement_validator) {
  "use strict";

  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const getApplicationType = _____utils_application["getApplicationType"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const ADD_PAGE_ACTION = 'add-page-action';
  const CONTROL_TYPES = ['sap.f.DynamicPageTitle', 'sap.uxap.ObjectPageHeader', 'sap.uxap.ObjectPageDynamicHeaderTitle'];

  /**
   * Quick Action for adding a custom page action.
   */
  class AddPageActionQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ADD_PAGE_ACTION, CONTROL_TYPES, 'QUICK_ACTION_ADD_CUSTOM_PAGE_ACTION', context, [DIALOG_ENABLEMENT_VALIDATOR]);
      this.appType = getApplicationType(this.context.rta.getRootControlInstance().getManifest());
    }
    async initialize() {
      const version = await getUi5Version();
      if (this.appType === 'fe-v4' && isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 130
      })) {
        return;
      }
      await super.initialize();
    }
    async execute() {
      if (this.control) {
        const overlay = OverlayRegistry.getOverlay(this.control) || [];
        await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_FRAGMENT, undefined, {
          aggregation: 'actions',
          title: 'QUICK_ACTION_ADD_CUSTOM_PAGE_ACTION',
          defaultAggregationArrayIndex: 1
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
  __exports.ADD_PAGE_ACTION = ADD_PAGE_ACTION;
  __exports.AddPageActionQuickAction = AddPageActionQuickAction;
  return __exports;
});
//# sourceMappingURL=create-page-action.js.map