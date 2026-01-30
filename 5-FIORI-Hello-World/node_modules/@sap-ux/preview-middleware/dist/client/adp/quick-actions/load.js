"use strict";

sap.ui.define([], function () {
  "use strict";

  function __ui5_require_async(path) {
    return new Promise(function (resolve, reject) {
      sap.ui.require([path], function (module) {
        if (!(module && module.__esModule)) {
          module = module === null || !(typeof module === "object" && path.endsWith("/library")) ? {
            default: module
          } : module;
          Object.defineProperty(module, "__esModule", {
            value: true
          });
        }
        resolve(module);
      }, function (err) {
        reject(err);
      });
    });
  }
  /**
   * Loads the appropriate Quick Action registries for the given application type.
   *
   * @param appType - Application type.
   * @returns Quick Action registries.
   */
  async function loadDefinitions(appType) {
    if (appType === 'fe-v2') {
      const FEV2QuickActionRegistry = (await __ui5_require_async('open/ux/preview/client/adp/quick-actions/fe-v2/registry')).default;
      return [new FEV2QuickActionRegistry()];
    }
    if (appType === 'fe-v4') {
      const FEV4QuickActionRegistry = (await __ui5_require_async('open/ux/preview/client/adp/quick-actions/fe-v4/registry')).default;
      return [new FEV4QuickActionRegistry()];
    }
    return [];
  }
  var __exports = {
    __esModule: true
  };
  __exports.loadDefinitions = loadDefinitions;
  return __exports;
});
//# sourceMappingURL=load.js.map