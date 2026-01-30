"use strict";

sap.ui.define(["sap/base/Log"], function (Log) {
  "use strict";

  function getString(message) {
    if (typeof message === 'object') {
      return JSON.stringify(message).toString();
    }
    return message;
  }
  const logger = {
    info: message => {
      Log.info(getString(message));
    },
    debug: message => {
      Log.debug(getString(message));
    },
    warn: message => {
      Log.warning(getString(message));
    },
    error: message => {
      Log.error(getString(message));
    }
  };
  var __exports = {
    __esModule: true
  };
  __exports.logger = logger;
  return __exports;
});
//# sourceMappingURL=logger.js.map