"use strict";

sap.ui.define([], function () {
  "use strict";

  const CHANGES_API_PATH = '/preview/api/changes';

  /**
   * Retrieves Flex settings from a 'sap-ui-bootstrap' element's data attribute.
   * Parses the 'data-open-ux-preview-flex-settings' attribute as JSON.
   *
   * @returns {FlexSettings | undefined} The parsed Flex settings if available, otherwise undefined.
   */
  function getFlexSettings() {
    let result;
    const bootstrapConfig = document.getElementById('sap-ui-bootstrap');
    const flexSetting = bootstrapConfig?.dataset.openUxPreviewFlexSettings;
    if (flexSetting) {
      result = JSON.parse(flexSetting);
    }
    return result;
  }
  var __exports = {
    __esModule: true
  };
  __exports.CHANGES_API_PATH = CHANGES_API_PATH;
  __exports.getFlexSettings = getFlexSettings;
  return __exports;
});
//# sourceMappingURL=common.js.map