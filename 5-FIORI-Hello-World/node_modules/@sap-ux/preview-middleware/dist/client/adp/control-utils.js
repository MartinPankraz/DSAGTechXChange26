"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * Handles calling control specific functions for retrieving control data
   */
  class ControlUtils {
    /**
     * Returns ManagedObject runtime control
     *
     * @param overlayControl Overlay
     * @returns {ManagedObject} Managed Object instance
     */
    static getRuntimeControl(overlayControl) {
      let runtimeControl;
      if (overlayControl.getElementInstance) {
        runtimeControl = overlayControl.getElementInstance();
      } else {
        runtimeControl = overlayControl.getElement();
      }
      return runtimeControl;
    }

    /**
     * Returns control aggregation names in an array
     *
     * @param control Managed Object runtime control
     * @param name Aggregation name
     * @returns Array of control aggregations
     */
    static getControlAggregationByName(control, name) {
      let result = [];
      const aggregation = (control ? control.getMetadata().getAllAggregations() : {})[name];
      if (aggregation) {
        // This executes a _sGetter function that can vary from control to control (_sGetter can be: getContent, getItems, etc)
        const names = aggregation._sGetter && control[aggregation._sGetter]() || [];
        result = Array.isArray(names) ? names : [names];
      }
      return result;
    }
  }
  return ControlUtils;
});
//# sourceMappingURL=control-utils.js.map