"use strict";

sap.ui.define(["../control-data", "../utils", "sap/ui/dt/OverlayUtil", "sap/ui/dt/OverlayRegistry", "../../utils/core"], function (___control_data, ___utils, OverlayUtil, OverlayRegistry, ____utils_core) {
  "use strict";

  const buildControlData = ___control_data["buildControlData"];
  const getRuntimeControl = ___utils["getRuntimeControl"];
  const getComponent = ____utils_core["getComponent"];
  const isEditable = (changeService, id = '') => {
    let editable = false;
    const control = sap.ui.getCore().byId(id);
    if (!control) {
      const component = getComponent(id);
      if (component) {
        return editable;
      }
    } else {
      let controlOverlay = OverlayRegistry.getOverlay(control);
      if (!controlOverlay?.getDomRef()) {
        //look for closest control
        controlOverlay = OverlayUtil.getClosestOverlayFor(control);
      }
      if (controlOverlay) {
        const runtimeControl = getRuntimeControl(controlOverlay);
        const controlData = buildControlData(runtimeControl, changeService, controlOverlay);
        const prop = controlData.properties.find(item => item.isEnabled === true);
        editable = prop !== undefined;
      }
    }
    return editable;
  };
  var __exports = {
    __esModule: true
  };
  __exports.isEditable = isEditable;
  return __exports;
});
//# sourceMappingURL=editable.js.map