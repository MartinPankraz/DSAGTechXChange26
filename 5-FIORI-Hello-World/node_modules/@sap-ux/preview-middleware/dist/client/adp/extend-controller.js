"use strict";

sap.ui.define(["sap/ui/rta/command/CommandFactory", "./utils", "./dialog-factory", "sap/ui/rta/plugin/ExtendControllerPlugin"], function (CommandFactory, ___utils, ___dialog_factory, ExtendController) {
  "use strict";

  const createDeferred = ___utils["createDeferred"];
  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DialogNames = ___dialog_factory["DialogNames"];
  /**
   * Initializes the ExtendControllerPlugin and includes it in the Runtime Authoring (RTA) plugins.
   *
   * @param rta Runtime Authoring instance
   */
  function initExtendControllerPlugin(rta) {
    const flexSettings = rta.getFlexSettings();
    const commandFactory = new CommandFactory({
      flexSettings
    });
    const plugin = new ExtendController({
      commandFactory,
      handlerFunction: async overlay => await handlerFunction(rta, overlay)
    });
    const plugins = rta.getPlugins();
    plugins.extendControllerPlugin = plugin;
    rta.setPlugins(plugins);
  }

  /**
   * Handles the creation of a controller extension by opening a dialog and resolving the deferred data.
   *
   * @param rta Runtime Authoring instance
   * @param overlay UI5 Element overlay
   * @returns A promise that resolves with DeferredXmlFragmentData
   */
  async function handlerFunction(rta, overlay) {
    const deferred = createDeferred();
    await DialogFactory.createDialog(overlay, rta, DialogNames.CONTROLLER_EXTENSION, {
      deferred
    });
    return deferred.promise;
  }
  var __exports = {
    __esModule: true
  };
  __exports.initExtendControllerPlugin = initExtendControllerPlugin;
  return __exports;
});
//# sourceMappingURL=extend-controller.js.map