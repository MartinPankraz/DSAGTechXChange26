"use strict";

sap.ui.define(["sap/ui/core/mvc/XMLView", "sap/ui/core/UIComponent", "../utils/core", "sap/ui/dt/OverlayRegistry", "sap/ui/dt/OverlayUtil"], function (XMLView, UIComponent, ___utils_core, OverlayRegistry, OverlayUtil) {
  "use strict";

  const getComponent = ___utils_core["getComponent"];
  /**
   * Get runtime control.
   *
   * @param overlayControl - element overlay.
   * @returns ManagedObject
   */
  function getRuntimeControl(overlayControl) {
    let runtimeControl;
    if (overlayControl.getElementInstance) {
      runtimeControl = overlayControl.getElementInstance();
    } else {
      runtimeControl = overlayControl.getElement();
    }
    return runtimeControl;
  }

  /**
   * Get library of a control name.
   *
   * @param controlName - name of the ui5 control eg: sap.m.Button.
   * @returns Promise<string>
   */
  async function getLibrary(controlName) {
    return new Promise(resolve => {
      const controlPath = controlName.replace(/\./g, '/');
      sap.ui.require([controlPath], control => {
        const contMetadata = control.getMetadata();
        // getLibraryName method does not exist on events
        if (contMetadata?.getLibraryName) {
          const contLibName = contMetadata.getLibraryName();
          resolve(contLibName);
        } else {
          resolve(''); // return empty for events
        }
      });
    });
  }

  /**
   * Gets the root view of component for the provided ComponentContainer control.
   *
   * @param container ComponentContainer control.
   * @returns XMLView which is the root control of the component if it exists.
   */
  function getRootControlFromComponentContainer(container) {
    if (container) {
      const componentId = container.getComponent();
      const component = getComponent(componentId);
      if (component instanceof UIComponent) {
        const rootControl = component.getRootControl();
        if (rootControl instanceof XMLView) {
          return rootControl;
        }
      }
    }
    return undefined;
  }
  function getManifestProperties(control, changeService, controlOverlay) {
    const overlayData = controlOverlay?.getDesignTimeMetadata().getData();
    if (!controlOverlay || !overlayData?.manifestSettings) {
      return {};
    }
    const manifestPropertiesValue = overlayData?.manifestSettingsValues(overlayData?.manifestSettings(control), control);
    const manifestProperties = overlayData?.manifestSettings(control).reduce((acc, item) => {
      const propertyId = item.path ?? item.id;
      const value = changeService.getConfigurationPropertyValue(control.getId(), propertyId);
      let propertyValue = value === 0 || value === false || value ? value : manifestPropertiesValue[propertyId];
      if (item?.type && ['boolean', 'number', 'string'].includes(item?.type)) {
        if (propertyValue === undefined) {
          propertyValue = item.value; // set default value of property
        }
      }
      if (!acc[propertyId]) {
        acc[propertyId] = {
          ...item,
          defaultValue: item.value,
          configuration: true,
          name: item.id,
          readableName: item.name,
          manifestPropertyPath: `${overlayData?.manifestPropertyPath(control)}/${propertyId}`,
          type: item.type === 'number' ? 'int' : item.type,
          value: propertyValue
        };
      }
      return acc;
    }, {});
    return manifestProperties;
  }
  const getOverlay = control => {
    let controlOverlay = OverlayRegistry.getOverlay(control);
    if (!controlOverlay?.getDomRef()) {
      //look for closest control
      controlOverlay = OverlayUtil.getClosestOverlayFor(control);
    }
    return controlOverlay;
  };
  var __exports = {
    __esModule: true
  };
  __exports.getRuntimeControl = getRuntimeControl;
  __exports.getLibrary = getLibrary;
  __exports.getRootControlFromComponentContainer = getRootControlFromComponentContainer;
  __exports.getManifestProperties = getManifestProperties;
  __exports.getOverlay = getOverlay;
  return __exports;
});
//# sourceMappingURL=utils.js.map