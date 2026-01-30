"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * Determines application type based on the manifest.json.
   *
   * @param manifest - Application Manifest.
   * @returns Application type.
   */
  function getApplicationType(manifest) {
    if (manifest['sap.ui.generic.app'] || manifest['sap.ovp']) {
      return 'fe-v2';
    } else if (manifest['sap.ui5']?.routing?.targets) {
      let hasV4pPages = false;
      Object.keys(manifest?.['sap.ui5']?.routing?.targets ?? []).forEach(target => {
        if (manifest?.['sap.ui5']?.routing?.targets?.[target]?.name?.startsWith('sap.fe.templates.')) {
          hasV4pPages = true;
        }
      });
      if (hasV4pPages) {
        return 'fe-v4';
      }
    }
    return 'freestyle';
  }
  var __exports = {
    __esModule: true
  };
  __exports.getApplicationType = getApplicationType;
  return __exports;
});
//# sourceMappingURL=application.js.map