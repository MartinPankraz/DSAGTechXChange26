"use strict";

sap.ui.define(["sap/ui/rta/command/CommandFactory", "../../../utils/version", "sap/ui/core/Component"], function (CommandFactory, _____utils_version, Component) {
  "use strict";

  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const isVersionEqualOrHasNewerPatch = _____utils_version["isVersionEqualOrHasNewerPatch"];
  /**
   * Gets app component of a v2 project.
   *
   * @param control - ManagedObject.
   * @returns AppComponent.
   */
  function getV2AppComponent(control) {
    const ownerComponent = Component.getOwnerComponentFor(control);
    let result;
    if (ownerComponent?.isA('sap.suite.ui.generic.template.lib.TemplateComponent')) {
      result = ownerComponent.getAppComponent();
    }
    return result;
  }

  /**
   * Prepares the change for the manifest setting.
   *
   * @param context - The context object containing flexSettings.
   * @param propertyPath - The path of the property in the manifest.
   * @param control - The UI5 element representing the control.
   * @param component - component name e.g list report or object page.
   * @param entitySet - Entity Set name.
   * @param propertyValue - The value to be set for the property.
   *
   * @returns  A Promise resolving to an array of FlexCommand objects.
   */
  async function prepareManifestChange(context, propertyPath, control, component, entitySet, propertyValue) {
    const {
      flexSettings
    } = context;
    const appComponent = getV2AppComponent(control);
    const modifiedValue = {
      changeType: 'appdescr_ui_generic_app_changePageConfiguration',
      reference: flexSettings.projectId,
      appComponent,
      parameters: {
        parentPage: {
          component,
          entitySet
        },
        entityPropertyChange: {
          propertyPath: propertyPath,
          operation: 'UPSERT',
          propertyValue: propertyValue
        }
      }
    };
    const command = await CommandFactory.getCommandFor(control, 'appDescriptor', modifiedValue, null, flexSettings);
    return [command];
  }

  /**
   * Checks whether the manifest has array structured page definitions
   * @param manifest - manifest object
   * @returns true if pages are defined as array, false if defined as object
   */
  function isManifestArrayStructured(manifest) {
    return Array.isArray(manifest['sap.ui.generic.app']?.pages);
  }

  /**
   * Checks if the current UI5 version and manifest structure is supported in v2 applications.
   *
   * @param manifest - manifest changes of the current application.
   *
   * Returns `false`
   *
   *  - If the manifest is structured is an array and is below version 1.134
   *  - If the UI5 version is not supported
   * Otherwise, returns `true`.
   *
   */
  async function areManifestChangesSupported(manifest) {
    const version = await getUi5Version();
    if (isLowerThanMinimalUi5Version(version, {
      major: 1,
      minor: 134
    }) && isManifestArrayStructured(manifest)) {
      return false;
    }
    const isAboveOrEqualMinimalVersion = !isLowerThanMinimalUi5Version(version, {
      major: 1,
      minor: 128
    });
    const isSupportedPatchVersion = isVersionEqualOrHasNewerPatch(version, {
      major: 1,
      minor: 96,
      patch: 35
    }) || isVersionEqualOrHasNewerPatch(version, {
      major: 1,
      minor: 108,
      patch: 38
    }) || isVersionEqualOrHasNewerPatch(version, {
      major: 1,
      minor: 120,
      patch: 23
    });
    return isAboveOrEqualMinimalVersion || isSupportedPatchVersion;
  }
  function isVariantManagementEnabledOPPage(context, control) {
    const ownerComponent = Component.getOwnerComponentFor(control);
    if (ownerComponent?.isA('sap.suite.ui.generic.template.ObjectPage.Component')) {
      const id = control.getId();
      if (typeof id !== 'string') {
        throw new Error('Could not retrieve configuration property because control id is not valid!');
      }
      if (!control.isA('sap.ui.comp.smarttable.SmartTable')) {
        // variant management is only supported by SmartTable
        return false;
      }
      let value = context.changeService.getConfigurationPropertyValue(id, 'variantManagement');
      if (value === undefined) {
        value = !!control.getVariantManagement();
      }
      return value;
    }
    return undefined;
  }
  var __exports = {
    __esModule: true
  };
  __exports.getV2AppComponent = getV2AppComponent;
  __exports.prepareManifestChange = prepareManifestChange;
  __exports.isManifestArrayStructured = isManifestArrayStructured;
  __exports.areManifestChangesSupported = areManifestChangesSupported;
  __exports.isVariantManagementEnabledOPPage = isVariantManagementEnabledOPPage;
  return __exports;
});
//# sourceMappingURL=utils.js.map