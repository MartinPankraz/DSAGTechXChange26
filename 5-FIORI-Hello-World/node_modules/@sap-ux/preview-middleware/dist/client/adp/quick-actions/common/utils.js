"use strict";

sap.ui.define([], function () {
  "use strict";

  function getTooltipsForTableEmptyRowModeAction(resourceBundle) {
    const alreadyEnabledTooltip = resourceBundle.getText('EMPTY_ROW_MODE_IS_ALREADY_ENABLED');
    const unsupportedCreationRowsTooltip = resourceBundle.getText('EMPTY_ROW_MODE_IS_NOT_SUPPORTED');
    return {
      alreadyEnabledTooltip,
      unsupportedCreationRowsTooltip
    };
  }
  var __exports = {
    __esModule: true
  };
  __exports.getTooltipsForTableEmptyRowModeAction = getTooltipsForTableEmptyRowModeAction;
  return __exports;
});
//# sourceMappingURL=utils.js.map