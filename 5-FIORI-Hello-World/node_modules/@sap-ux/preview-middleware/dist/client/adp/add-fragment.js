"use strict";

sap.ui.define(["sap/ui/rta/command/CommandFactory", "./utils", "./dialog-factory", "sap/ui/rta/plugin/AddXMLPlugin"], function (CommandFactory, ___utils, ___dialog_factory, AddXMLPlugin) {
  "use strict";

  const createDeferred = ___utils["createDeferred"];
  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DialogNames = ___dialog_factory["DialogNames"];
  /**
   * Initializes the AddXMLPlugin and includes it in the Runtime Authoring (RTA) plugins.
   *
   * @param rta Runtime Authoring instance
   */
  function initAddXMLPlugin(rta) {
    const flexSettings = rta.getFlexSettings();
    const commandFactory = new CommandFactory({
      flexSettings
    });
    const plugin = new AddXMLPlugin({
      commandFactory,
      fragmentHandler: async overlay => await handleFragmentCreation(rta, overlay)
    });
    const plugins = rta.getPlugins();
    plugins.addXMLPlugin = plugin;
    rta.setPlugins(plugins);
  }

  /**
   * Handles the creation of a fragment by opening a dialog and resolving the deferred data.
   *
   * @param rta Runtime Authoring instance
   * @param overlay UI5 Element overlay
   * @returns A promise that resolves with DeferredXmlFragmentData
   */
  async function handleFragmentCreation(rta, overlay) {
    const deferred = createDeferred();
    await DialogFactory.createDialog(overlay, rta, DialogNames.ADD_FRAGMENT, {
      deferred
    });
    return deferred.promise;
  }
  var __exports = {
    __esModule: true
  };
  __exports.initAddXMLPlugin = initAddXMLPlugin;
  return __exports;
});
//# sourceMappingURL=add-fragment.js.map