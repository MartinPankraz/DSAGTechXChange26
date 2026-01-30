"use strict";

sap.ui.define(["sap/ui/rta/plugin/AddXMLAtExtensionPoint", "sap/ui/rta/command/CommandFactory", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "./utils", "./dialog-factory", "../cpe/communication-service"], function (AddXMLAtExtensionPoint, CommandFactory, ___sap_ux_private_control_property_editor_common, ___utils, ___dialog_factory, ___cpe_communication_service) {
  "use strict";

  const addExtensionPoint = ___sap_ux_private_control_property_editor_common["addExtensionPoint"];
  const createDeferred = ___utils["createDeferred"];
  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DialogNames = ___dialog_factory["DialogNames"];
  const CommunicationService = ___cpe_communication_service["CommunicationService"];
  class ExtensionPointService {
    actionId = 'CTX_ADDXML_AT_EXTENSIONPOINT';
    /**
     * @param rta Runtime Authoring
     */
    constructor(rta) {
      this.rta = rta;
    }

    /**
     * Initializes communication with CPE, and the extension point plugin.
     *
     */
    init() {
      this.initPlugin();
      CommunicationService.subscribe(async action => {
        if (addExtensionPoint.match(action)) {
          try {
            const {
              controlId,
              name
            } = action.payload;
            const suffix = `--${name}`;
            const baseControlId = controlId.endsWith(suffix) ? controlId.slice(0, -suffix.length) : controlId;
            const service = await this.rta.getService('action');
            service.execute(baseControlId, this.actionId);
            this.selectedExtensionPointName = name;
          } catch {
            throw new Error(`Failed to execute service with actionId: ${this.actionId}`);
          }
        }
      });
    }

    /**
     * Initializes Add XML at Extension Point plugin and adds it to the default RTA plugins.
     */
    initPlugin() {
      const flexSettings = this.rta.getFlexSettings();
      const commandFactory = new CommandFactory({
        flexSettings
      });
      const plugin = new AddXMLAtExtensionPoint({
        commandFactory,
        fragmentHandler: async (overlay, info) => await this.fragmentHandler(overlay, info)
      });
      const plugins = this.rta.getPlugins();
      plugins.addXMLAtExtensionPoint = plugin;
      this.rta.setPlugins(plugins);
    }

    /**
     * Handler function for AddXMLAtExtensionPoint plugin.
     *
     * @param overlay UI5 Element overlay
     * @param info Extension point data from the plugin
     * @returns Deferred extension point data that is provided to the plugin
     */
    async fragmentHandler(overlay, info) {
      const deferred = createDeferred();
      const name = this.selectedExtensionPointName;
      await DialogFactory.createDialog(overlay, this.rta, DialogNames.ADD_FRAGMENT_AT_EXTENSION_POINT, {
        name,
        info,
        deferred
      });
      this.selectedExtensionPointName = '';
      return deferred.promise;
    }
  }
  return ExtensionPointService;
});
//# sourceMappingURL=extension-point.js.map