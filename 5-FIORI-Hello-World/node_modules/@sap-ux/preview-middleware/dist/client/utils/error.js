"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * Returns the Error if the error is an instance of `Error` otherwise a new Error instance with string representation of the error.
   *
   * @param error {unknown} - the error instance
   * @returns {Error} the error
   */
  function getError(error) {
    return error instanceof Error ? error : new Error(JSON.stringify(error));
  }
  class FetchError extends Error {
    constructor(response) {
      super(`Fetch error: ${response.url}, ${response.status} - ${response.statusText}`);
      this.status = response.status;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.getError = getError;
  __exports.FetchError = FetchError;
  return __exports;
});
//# sourceMappingURL=error.js.map