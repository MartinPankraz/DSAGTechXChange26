"use strict";

sap.ui.define(["sap/ui/fl/Utils", "../utils/core", "../utils/version"], function (FlexUtils, ___utils_core, ___utils_version) {
  "use strict";

  function __ui5_require_async(path) {
    return new Promise(function (resolve, reject) {
      sap.ui.require([path], function (module) {
        if (!(module && module.__esModule)) {
          module = module === null || !(typeof module === "object" && path.endsWith("/library")) ? {
            default: module
          } : module;
          Object.defineProperty(module, "__esModule", {
            value: true
          });
        }
        resolve(module);
      }, function (err) {
        reject(err);
      });
    });
  }
  const getControlById = ___utils_core["getControlById"];
  const isLowerThanMinimalUi5Version = ___utils_version["isLowerThanMinimalUi5Version"];
  let reuseComponentChecker;

  /**
   * Resets the reuse component checker.
   */
  function resetReuseComponentChecker() {
    reuseComponentChecker = undefined;
  }

  /**
   * Defers the resolution of the promise, stores resolve/reject functions so that they can be accessed at a later stage.
   *
   * @description A Deferred object contains an unresolved promise along with the functions to resolve or reject that promise.
   *
   * @returns {Deferred} Deferred object
   */
  function createDeferred() {
    let resolve = null;
    let reject = null;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    if (resolve === null || reject === null) {
      throw new Error('Failed to initialize resolve and reject functions.');
    }
    return {
      promise,
      resolve,
      reject
    };
  }

  /**
   * Checks for the existence of a change associated with a specific fragment name in the RTA command stack.
   *
   * @param {RuntimeAuthoring} rta - The RuntimeAuthoring instance to check for existing changes.
   * @param {string} commandName - The name of the fragment to check for existing changes.
   * @param {string} propertyPath - The path to the property as string separated by dot in the change definition to check.
   * @param {string} propertyValue - The value to match against the specified property.
   * @returns {Promise<boolean>} A promise that resolves to `true` if a matching change is found, otherwise `false`.
   */
  function checkForExistingChange(rta, commandName, propertyPath, propertyValue) {
    const allCommands = rta.getCommandStack().getCommands();
    return allCommands.some(command => {
      if (typeof command.getCommands === 'function') {
        const subCommand = command.getCommands().find(c => c?.getProperty('name') === commandName);
        return subCommand && matchesChangeProperty(subCommand, propertyPath, propertyValue);
      } else {
        return matchesChangeProperty(command, propertyPath, propertyValue);
      }
    });
  }

  /**
   * Retrieves the value of a nested property from an object based on a dot-separated path.
   *
   * @param obj - The object from which to retrieve the nested property.
   * @param path - A dot-separated string representing the path to the desired property.
   *               For example, "a.b.c" will attempt to access `obj.a.b.c`.
   * @returns The value of the nested property if it exists, or `undefined` if any part of the path is invalid.
   */
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, key) => {
      return acc?.[key];
    }, obj);
  }

  /**
   * Checks if a specific property in the command's change matches the given value.
   *
   * @param {FlexCommand} command - The command object containing the prepared change to be examined.
   * @param {string} propertyPath - The path to the property in the change definition to check.
   * @param {string} propertyValue - The value to match against the specified property.
   * @returns {boolean} Returns true if the command's change contains the specified property with the matching value; otherwise, returns false.
   */
  function matchesChangeProperty(command, propertyPath, propertyValue) {
    if (typeof command.getPreparedChange !== 'function') {
      return false;
    }
    const change = command.getPreparedChange()?.getDefinition?.();
    if (!change) {
      return false;
    }
    const nestedProperty = getNestedProperty(change, propertyPath);
    return typeof nestedProperty === 'string' ? nestedProperty.includes(propertyValue) : false;
  }
  /**
   * Gets controller name and view ID for the given UI5 control.
   *
   * @param control UI5 control.
   * @returns The controller name and view ID.
   */
  function getControllerInfoForControl(control) {
    const view = FlexUtils.getViewForControl(control);
    const moduleName = view?.getControllerModuleName?.();
    const controllerName = moduleName ? `module:${moduleName}` : view.getController()?.getMetadata().getName();
    const viewId = view.getId();
    return {
      controllerName,
      viewId
    };
  }

  /**
   * Gets controller name and view ID for the given overlay control.
   *
   * @param overlayControl The overlay control.
   * @returns The controller name and view ID.
   */

  function getControllerInfo(overlayControl) {
    const control = overlayControl.getElement();
    return getControllerInfoForControl(control);
  }

  /**
   * Gets the reuse component checker function.
   *
   * @param ui5VersionInfo UI5 version information.
   * @returns The reuse component checker function.
   */
  async function getReuseComponentChecker(ui5VersionInfo) {
    if (reuseComponentChecker) {
      return reuseComponentChecker;
    }
    let reuseComponentApi;
    if (!isLowerThanMinimalUi5Version(ui5VersionInfo, {
      major: 1,
      minor: 134
    })) {
      reuseComponentApi = (await __ui5_require_async('sap/ui/rta/util/isReuseComponent')).default;
    }
    reuseComponentChecker = function isReuseComponent(controlId) {
      const ui5Control = getControlById(controlId);
      if (!ui5Control) {
        return false;
      }
      const component = FlexUtils.getComponentForControl(ui5Control);
      if (reuseComponentApi) {
        return reuseComponentApi(component);
      }
      if (!component) {
        return false;
      }
      const appComponent = FlexUtils.getAppComponentForControl(component);
      if (!appComponent) {
        return false;
      }
      const manifest = component.getManifest();
      const appManifest = appComponent.getManifest();
      const componentName = manifest?.['sap.app']?.id;

      // Look for component name in component usages of app component manifest
      const componentUsages = appManifest?.['sap.ui5']?.componentUsages;
      return Object.values(componentUsages || {}).some(componentUsage => {
        return componentUsage.name === componentName;
      });
    };
    return reuseComponentChecker;
  }
  var __exports = {
    __esModule: true
  };
  __exports.resetReuseComponentChecker = resetReuseComponentChecker;
  __exports.createDeferred = createDeferred;
  __exports.checkForExistingChange = checkForExistingChange;
  __exports.getNestedProperty = getNestedProperty;
  __exports.matchesChangeProperty = matchesChangeProperty;
  __exports.getControllerInfoForControl = getControllerInfoForControl;
  __exports.getControllerInfo = getControllerInfo;
  __exports.getReuseComponentChecker = getReuseComponentChecker;
  return __exports;
});
//# sourceMappingURL=utils.js.map