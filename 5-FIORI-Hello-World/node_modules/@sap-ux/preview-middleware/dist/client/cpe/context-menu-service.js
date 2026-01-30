"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../adp/dialog-factory", "../i18n", "sap/base/Log", "../utils/core", "../utils/version", "../utils/application"], function (___sap_ux_private_control_property_editor_common, ___adp_dialog_factory, ___i18n, Log, ___utils_core, ___utils_version, ___utils_application) {
  "use strict";

  const executeContextMenuAction = ___sap_ux_private_control_property_editor_common["executeContextMenuAction"];
  const reportTelemetry = ___sap_ux_private_control_property_editor_common["reportTelemetry"];
  const requestControlContextMenu = ___sap_ux_private_control_property_editor_common["requestControlContextMenu"];
  const DialogFactory = ___adp_dialog_factory["DialogFactory"];
  const getTextBundle = ___i18n["getTextBundle"];
  const getControlById = ___utils_core["getControlById"];
  const getUi5Version = ___utils_version["getUi5Version"];
  const getApplicationType = ___utils_application["getApplicationType"];
  /**
   * A Class of ContextMenuService
   */
  class ContextMenuService {
    sendAction = () => {};
    /**
     *
     * @param rta Runtime Authoring instance.
     */
    constructor(rta) {
      this.rta = rta;
    }

    /**
     * Initializes rta service.
     *
     * @param sendAction action sender function
     * @param subscribe subscriber function
     */
    async init(sendAction, subscribe) {
      this.sendAction = sendAction;
      this.actionService = await this.rta.getService('action');
      const resourceBundle = await getTextBundle();
      subscribe(async action => {
        if (executeContextMenuAction.match(action)) {
          const {
            actionName,
            controlId
          } = action.payload;
          await this.actionService.execute(controlId, actionName);
          try {
            const controlName = getControlById(controlId)?.getMetadata().getName();
            const versionInfo = await getUi5Version();
            await reportTelemetry({
              category: 'OutlineContextMenu',
              actionName,
              controlName,
              ui5Version: `${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`,
              appType: getApplicationType(this.rta.getRootControlInstance().getManifest())
            });
          } catch (err) {
            Log.error('Error in reporting Telemetry:', err);
          }
        }
        if (requestControlContextMenu.pending.match(action)) {
          const controlId = action.payload;
          const actions = await this.actionService.get(controlId);
          const responsePayload = {
            controlId: controlId,
            contextMenuItems: (actions ?? []).map(val => {
              let enabled = val.enabled;
              let tooltip;
              if (!DialogFactory.canOpenDialog) {
                enabled = false;
                tooltip = resourceBundle.getText('ADP_QUICK_ACTION_DIALOG_OPEN_MESSAGE');
              }
              return {
                id: val.id,
                title: val.text,
                enabled,
                tooltip
              };
            })
          };
          const requestControlActions = requestControlContextMenu.fulfilled(responsePayload);
          this.sendAction(requestControlActions);
        }
      });
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ContextMenuService = ContextMenuService;
  return __exports;
});
//# sourceMappingURL=context-menu-service.js.map