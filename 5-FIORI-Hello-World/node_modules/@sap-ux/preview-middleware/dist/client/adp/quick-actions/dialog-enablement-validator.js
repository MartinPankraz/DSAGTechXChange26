"use strict";

sap.ui.define(["../../i18n", "../dialog-factory"], function (____i18n, ___dialog_factory) {
  "use strict";

  const getTextBundle = ____i18n["getTextBundle"];
  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DIALOG_ENABLEMENT_VALIDATOR = {
    run: async () => {
      const i18n = await getTextBundle();
      if (!DialogFactory.canOpenDialog) {
        return {
          type: 'error',
          message: i18n.getText('ADP_QUICK_ACTION_DIALOG_OPEN_MESSAGE')
        };
      }
      return undefined;
    }
  };
  var __exports = {
    __esModule: true
  };
  __exports.DIALOG_ENABLEMENT_VALIDATOR = DIALOG_ENABLEMENT_VALIDATOR;
  return __exports;
});
//# sourceMappingURL=dialog-enablement-validator.js.map