"use strict";

sap.ui.define(["../../utils/core"], function (____utils_core) {
  "use strict";

  const getControlById = ____utils_core["getControlById"];
  const isA = ____utils_core["isA"];
  /**
   * Checks if control is visible in the page.
   *
   * @param page - Page control.
   * @param controlId - UI5 control id.
   * @returns True if control is visible in the page.
   */
  function pageHasControlId(page, controlId) {
    const controlDomElement = getControlById(controlId)?.getDomRef();
    return !!controlDomElement && !!page?.getDomRef()?.contains(controlDomElement);
  }

  /**
   * Checks if control is a child element of the rootControl.
   *
   * @param control - UI5 Control to be tested.
   * @param rootControl - UI5 root control.
   * @returns True if control is the child of the specified rootControl.
   */
  function isDescendantOfPage(control, rootControl) {
    let currentControl = control;
    while (currentControl) {
      if (currentControl === rootControl) {
        return true;
      }
      // if parent is a reusable component, use oContainer to find the parent
      if (isA('sap.ui.core.Component', currentControl) && currentControl?.oContainer) {
        currentControl = currentControl.oContainer.getParent();
      } else {
        currentControl = currentControl.getParent();
      }
    }
    return false;
  }

  /**
   * Find all controls in page that match the provided types.
   *
   * @param controlIndex - Control tree index.
   * @param activePage - Active page control.
   * @param controlTypes - Relevant control types.
   * @returns A list of UI5 controls.
   */
  function getRelevantControlFromActivePage(controlIndex, activePage, controlTypes) {
    const relevantControls = [];
    for (const type of controlTypes) {
      const controls = controlIndex[type] ?? [];
      for (const control of controls) {
        const ui5Control = getControlById(control.controlId);
        const parent = ui5Control?.getParent();
        const isActionApplicable = isDescendantOfPage(parent, activePage);
        if (isActionApplicable && ui5Control) {
          // if parent control added, discard adding child control.
          // Relevant for cases where wrapper exists eg: sap.m.Table exist in sap.ui.comp.smarttable.SmartTable
          const parentFound = relevantControls.findIndex(relevantControl => relevantControl.getId() === ui5Control.getParent()?.getId());
          if (parentFound === -1) {
            relevantControls.push(ui5Control);
          }
        }
      }
    }
    return relevantControls;
  }
  function getParentContainer(control, type) {
    let currentControl = control;
    while (currentControl) {
      if (isA(type, currentControl)) {
        return currentControl;
      }
      // if parent is a reusable component, use oContainer to find the parent
      if (isA('sap.ui.core.Component', currentControl) && currentControl?.oContainer) {
        currentControl = currentControl.oContainer.getParent();
      } else {
        currentControl = currentControl.getParent();
      }
    }
    return undefined;
  }
  var __exports = {
    __esModule: true
  };
  __exports.pageHasControlId = pageHasControlId;
  __exports.getRelevantControlFromActivePage = getRelevantControlFromActivePage;
  __exports.getParentContainer = getParentContainer;
  return __exports;
});
//# sourceMappingURL=utils.js.map