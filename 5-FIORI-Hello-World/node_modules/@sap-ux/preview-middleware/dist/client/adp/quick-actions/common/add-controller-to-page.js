"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../../utils/version", "../../utils", "../../../cpe/quick-actions/utils", "../../../i18n", "../../api-handler", "../../dialog-factory", "../../init-dialogs", "../dialog-enablement-validator", "../simple-quick-action-base"], function (OverlayRegistry, _____utils_version, ____utils, _____cpe_quick_actions_utils, _____i18n, ____api_handler, ____dialog_factory, ____init_dialogs, ___dialog_enablement_validator, ___simple_quick_action_base) {
  "use strict";

  const getUi5Version = _____utils_version["getUi5Version"];
  const getControllerInfoForControl = ____utils["getControllerInfoForControl"];
  const getReuseComponentChecker = ____utils["getReuseComponentChecker"];
  const checkForExistingChange = ____utils["checkForExistingChange"];
  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const getTextBundle = _____i18n["getTextBundle"];
  const getExistingController = ____api_handler["getExistingController"];
  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const isControllerExtensionEnabledForControl = ____init_dialogs["isControllerExtensionEnabledForControl"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const ADD_CONTROLLER_TO_PAGE_TYPE = 'add-controller-to-page';
  const CONTROL_TYPES = ['sap.f.DynamicPage', 'sap.uxap.ObjectPageLayout'];

  /**
   * Quick Action for adding controller to a page.
   */
  class AddControllerToPageQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ADD_CONTROLLER_TO_PAGE_TYPE, CONTROL_TYPES, '', context, [DIALOG_ENABLEMENT_VALIDATOR, {
        run: async () => {
          const controllerName = getControllerInfoForControl(this.context.view).controllerName;
          const i18n = await getTextBundle();
          if (checkForExistingChange(this.context.rta, 'codeExt', 'selector.controllerName', controllerName)) {
            return {
              type: 'error',
              message: i18n.getText('ADP_QUICK_ACTION_CONTROLLER_PENDING_CHANGE_EXISTS')
            };
          }
        }
      }]);
    }
    controllerExists = false;
    forceRefreshAfterExecution = true;
    async initialize() {
      const version = await getUi5Version();
      const isReuseComponent = await getReuseComponentChecker(version);
      const control = getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, CONTROL_TYPES)[0];
      if (control) {
        const controlInfo = getControllerInfoForControl(control);
        const data = await getExistingController(controlInfo.controllerName);
        this.controllerExists = data?.controllerExists;
        const isActiveAction = isControllerExtensionEnabledForControl(control, isReuseComponent, this.context.flexSettings.isCloud);
        this.control = isActiveAction ? control : undefined;
      }
    }
    get textKey() {
      return this.controllerExists ? 'QUICK_ACTION_SHOW_PAGE_CONTROLLER' : 'QUICK_ACTION_ADD_PAGE_CONTROLLER';
    }
    async execute() {
      if (this.control) {
        const overlay = OverlayRegistry.getOverlay(this.control) || [];
        await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.CONTROLLER_EXTENSION, undefined, {}, {
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
  __exports.ADD_CONTROLLER_TO_PAGE_TYPE = ADD_CONTROLLER_TO_PAGE_TYPE;
  __exports.AddControllerToPageQuickAction = AddControllerToPageQuickAction;
  return __exports;
});
//# sourceMappingURL=add-controller-to-page.js.map