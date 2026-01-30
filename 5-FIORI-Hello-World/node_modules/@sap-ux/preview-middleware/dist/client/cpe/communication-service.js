"use strict";

sap.ui.define(["sap/base/Log", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../utils/error"], function (Log, ___sap_ux_private_control_property_editor_common, ___utils_error) {
  "use strict";

  const startPostMessageCommunication = ___sap_ux_private_control_property_editor_common["startPostMessageCommunication"];
  const getError = ___utils_error["getError"];
  class CommunicationService {
    /**
     * Sends an action to the CPE.
     */

    static actionHandlers = [];
    static {
      const {
        sendAction
      } = startPostMessageCommunication(window.parent, async action => {
        for (const handler of this.actionHandlers) {
          try {
            await handler(action);
          } catch (error) {
            Log.error('Handler Failed: ', getError(error));
          }
        }
      });
      this.sendAction = sendAction;
    }

    /**
     * Creates a listener to receive actions from the CPE.
     *
     * @param handler - Action handler.
     */
    static subscribe(handler) {
      this.actionHandlers.push(handler);
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.CommunicationService = CommunicationService;
  return __exports;
});
//# sourceMappingURL=communication-service.js.map