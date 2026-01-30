"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * Represents the status for a healthy OData service.
   */
  class ODataUpStatus {
    /**
     * Creates an instance representing a healthy OData service.
     *
     * @param serviceUrl The service url.
     */
    constructor(serviceUrl) {
      this.serviceUrl = serviceUrl;
    }
  }

  /**
   * Represents the status for an unhealthy OData service.
   */
  class ODataDownStatus {
    /**
     * Creates an instance representing an unhealthy OData service.
     *
     * @param serviceUrl The service url.
     * @param reason The provided reason for the failure.
     */
    constructor(serviceUrl, reason) {
      this.serviceUrl = serviceUrl;
      this.reason = reason;
      this.errorMessage = this.formatReason(reason);
    }

    /**
     * Formats the reason.
     *
     * @param reason The provided reason for the failure.
     * @returns Formatted reason as string.
     */
    formatReason(reason) {
      if (reason instanceof Error) {
        return reason.message;
      }
      if (typeof reason === 'string') {
        return reason;
      }
      try {
        return JSON.stringify(reason);
      } catch {
        return String(reason);
      }
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ODataUpStatus = ODataUpStatus;
  __exports.ODataDownStatus = ODataDownStatus;
  return __exports;
});
//# sourceMappingURL=odata-health-status.js.map