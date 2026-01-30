"use strict";

sap.ui.define(["sap/base/Log", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../utils/error", "./nodes"], function (Log, ___sap_ux_private_control_property_editor_common, ____utils_error, ___nodes) {
  "use strict";

  const outlineChanged = ___sap_ux_private_control_property_editor_common["outlineChanged"];
  const getError = ____utils_error["getError"];
  const transformNodes = ___nodes["transformNodes"];
  const OUTLINE_CHANGE_EVENT = 'OUTLINE_CHANGED';
  /**
   * A Class of WorkspaceConnectorService
   */
  class OutlineService extends EventTarget {
    constructor(rta, changeService) {
      super();
      this.rta = rta;
      this.changeService = changeService;
    }

    /**
     * Initializes connector service.
     *
     * @param sendAction action sender function
     */
    async init(sendAction) {
      const outline = await this.rta.getService('outline');
      const {
        scenario
      } = this.rta.getFlexSettings();
      const syncOutline = async () => {
        try {
          const viewNodes = await outline.get();
          const controlIndex = {};
          const configPropertyIdMap = new Map();
          const outlineNodes = await transformNodes(viewNodes, scenario, controlIndex, this.changeService, configPropertyIdMap);
          const event = new CustomEvent(OUTLINE_CHANGE_EVENT, {
            detail: {
              controlIndex
            }
          });
          this.dispatchEvent(event);
          sendAction(outlineChanged(outlineNodes));
          await this.changeService.updateConfigurationProps(configPropertyIdMap);
        } catch (error) {
          Log.error('Outline sync failed!', getError(error));
        }
      };
      await syncOutline();
      outline.attachEvent('update', syncOutline);
    }
    onOutlineChange(handler) {
      this.addEventListener(OUTLINE_CHANGE_EVENT, handler);
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.OUTLINE_CHANGE_EVENT = OUTLINE_CHANGE_EVENT;
  __exports.OutlineService = OutlineService;
  return __exports;
});
//# sourceMappingURL=service.js.map