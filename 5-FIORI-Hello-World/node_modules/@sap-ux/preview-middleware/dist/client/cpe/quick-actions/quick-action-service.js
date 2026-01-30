"use strict";

sap.ui.define(["sap/base/Log", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../i18n", "../../adp/dialog-factory", "../../utils/application", "../../utils/version"], function (Log, ___sap_ux_private_control_property_editor_common, ____i18n, ____adp_dialog_factory, ____utils_application, ____utils_version) {
  "use strict";

  const executeQuickAction = ___sap_ux_private_control_property_editor_common["executeQuickAction"];
  const quickActionListChanged = ___sap_ux_private_control_property_editor_common["quickActionListChanged"];
  const SIMPLE_QUICK_ACTION_KIND = ___sap_ux_private_control_property_editor_common["SIMPLE_QUICK_ACTION_KIND"];
  const NESTED_QUICK_ACTION_KIND = ___sap_ux_private_control_property_editor_common["NESTED_QUICK_ACTION_KIND"];
  const updateQuickAction = ___sap_ux_private_control_property_editor_common["updateQuickAction"];
  const externalFileChange = ___sap_ux_private_control_property_editor_common["externalFileChange"];
  const reportTelemetry = ___sap_ux_private_control_property_editor_common["reportTelemetry"];
  const getTextBundle = ____i18n["getTextBundle"];
  const DialogFactory = ____adp_dialog_factory["DialogFactory"];
  const getApplicationType = ____utils_application["getApplicationType"];
  const getUi5Version = ____utils_version["getUi5Version"];
  /**
   * Service providing Quick Actions.
   */
  class QuickActionService {
    sendAction = () => {};
    actions = [];
    /**
     * Quick action service constructor.
     *
     * @param rta - RTA object.
     * @param outlineService - Outline service instance.
     * @param registries - Quick action registries.
     * @param changeService
     */
    constructor(rta, outlineService, registries, changeService) {
      this.rta = rta;
      this.outlineService = outlineService;
      this.registries = registries;
      this.changeService = changeService;
    }

    /**
     * Initialize selection service.
     *
     * @param sendAction - Action sender function.
     * @param subscribe - Subscriber function.
     */
    async init(sendAction, subscribe) {
      this.sendAction = sendAction;
      this.actionService = await this.rta.getService('action');
      this.texts = await getTextBundle();
      subscribe(async action => {
        if (executeQuickAction.match(action)) {
          const actionInstance = this.actions.findLast(quickActionDefinition => quickActionDefinition.id === action.payload.id);
          if (!actionInstance) {
            return;
          }
          const commands = await this.executeAction(actionInstance, action.payload);
          for (const command of commands) {
            await this.rta.getCommandStack().pushAndExecute(command);
          }
          if (actionInstance.forceRefreshAfterExecution) {
            this.sendAction(updateQuickAction(actionInstance.getActionObject()));
          }
        }
        if (externalFileChange.match(action)) {
          await this.reloadQuickActions(this.controlTreeIndex);
        }
      });
      this.outlineService.onOutlineChange(async event => {
        this.controlTreeIndex = event.detail.controlIndex;
        await this.reloadQuickActions(event.detail.controlIndex);
      });
      this.changeService.onStackChange(async () => {
        await this.reloadQuickActions(this.controlTreeIndex);
      });
      DialogFactory.onOpenDialogStatusChange(async () => {
        await this.reloadQuickActions(this.controlTreeIndex);
      });
    }

    /**
     * Prepares a list of currently applicable Quick Actions and sends them to the UI.
     *
     * @param controlIndex - Control tree index.
     */
    async reloadQuickActions(controlIndex) {
      const context = {
        controlIndex,
        manifest: this.rta.getRootControlInstance().getManifest(),
        actionService: this.actionService
      };
      const groups = [];
      for (const registry of this.registries) {
        for (const {
          title,
          definitions,
          view,
          key
        } of registry.getDefinitions(context)) {
          const group = {
            title,
            actions: []
          };
          const actionContext = {
            ...context,
            view,
            key,
            rta: this.rta,
            flexSettings: this.rta.getFlexSettings(),
            resourceBundle: this.texts,
            changeService: this.changeService
          };
          for (const Definition of definitions) {
            try {
              const instance = new Definition(actionContext);
              await instance.initialize();
              await this.addAction(group, instance);
            } catch {
              Log.warning(`Failed to initialize ${Definition.name} quick action.`);
            }
          }
          groups.push(group);
        }
      }
      this.sendAction(quickActionListChanged(groups));
    }
    async addAction(group, instance) {
      if (instance.isApplicable) {
        await instance.runEnablementValidators();
        const quickAction = instance.getActionObject();
        group.actions.push(quickAction);
        this.actions.push(instance);
      }
    }
    async executeAction(actionInstance, payload) {
      try {
        const versionInfo = await getUi5Version();
        await reportTelemetry({
          category: 'QuickAction',
          actionName: actionInstance.type,
          telemetryEventIdentifier: actionInstance.getTelemetryIdentifier(true),
          quickActionSteps: actionInstance.quickActionSteps,
          appType: getApplicationType(this.rta.getRootControlInstance().getManifest()),
          ui5Version: `${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`
        });
      } catch (error) {
        Log.error('Error in reporting Telemetry:', error);
      }
      if (payload.kind === SIMPLE_QUICK_ACTION_KIND && actionInstance.kind === SIMPLE_QUICK_ACTION_KIND) {
        return actionInstance.execute();
      }
      if (payload.kind === NESTED_QUICK_ACTION_KIND && actionInstance.kind === NESTED_QUICK_ACTION_KIND) {
        return actionInstance.execute(payload.path);
      }
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.QuickActionService = QuickActionService;
  return __exports;
});
//# sourceMappingURL=quick-action-service.js.map