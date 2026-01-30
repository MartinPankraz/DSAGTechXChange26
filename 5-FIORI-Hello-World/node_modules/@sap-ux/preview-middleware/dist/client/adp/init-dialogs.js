"use strict";

sap.ui.define(["sap/ui/rta/util/hasStableId", "sap/ui/fl/Utils", "./dialog-factory", "../i18n", "./utils", "./sync-views-utils"], function (hasStableId, FlUtils, ___dialog_factory, ___i18n, ___utils, ___sync_views_utils) {
  "use strict";

  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DialogNames = ___dialog_factory["DialogNames"];
  const getTextBundle = ___i18n["getTextBundle"];
  const getReuseComponentChecker = ___utils["getReuseComponentChecker"];
  const getSyncViewIds = ___sync_views_utils["getSyncViewIds"];
  /**
   * Handler for enablement of Extend With Controller context menu entry
   *
   * @param control UI5 control.
   * @param isReuseComponent Function to check if the control is a reuse component.
   * @param isCloud Whether the application is running in the cloud
   * @returns boolean whether menu item is enabled or not
   */
  function isControllerExtensionEnabledForControl(control, isReuseComponent, isCloud) {
    const viewId = FlUtils.getViewForControl(control).getId();
    const syncViewsIds = getSyncViewIds();
    const isControlInSyncView = syncViewsIds.has(viewId);
    if (isCloud) {
      const isClickedControlReuseComponent = isReuseComponent(control.getId());
      return !isControlInSyncView && !isClickedControlReuseComponent;
    }
    return !isControlInSyncView;
  }

  /**
   * Handler for enablement of Extend With Controller context menu entry
   *
   * @param overlays Control overlays
   * @param isReuseComponent Function to check if the control is a reuse component.
   * @param isCloud Whether the application is running in the cloud
   * @returns boolean whether menu item is enabled or not
   */
  const isControllerExtensionEnabled = (overlays, isReuseComponent, isCloud) => {
    if (overlays.length === 0 || overlays.length > 1) {
      return false;
    }
    return isControllerExtensionEnabledForControl(overlays[0].getElement(), isReuseComponent, isCloud);
  };

  /**
   * Determines whether the fragment command should be enabled based on the provided overlays.
   *
   * @param {ElementOverlay[]} overlays - An array of ElementOverlay objects representing the UI overlays.
   * @param {isReuseComponentApi} isReuseComponent - Function to check if the control is a reuse component.
   * @param {boolean} isCloud - Whether the application is running in the cloud.
   * @returns {boolean} True if the fragment command is enabled, false otherwise.
   */
  const isFragmentCommandEnabled = (overlays, isReuseComponent, isCloud) => {
    if (overlays.length === 0 || overlays.length > 1) {
      return false;
    }
    const control = overlays[0].getElement();
    const stableId = hasStableId(overlays[0]);
    if (isCloud) {
      return stableId && !isReuseComponent(control.getId());
    }
    return stableId;
  };

  /**
   * Determines the text that should be displayed for the Add Fragment context menu item.
   *
   * @param {ElementOverlay} overlay - An ElementOverlay object representing the UI overlay.
   * @param {isReuseComponentApi} isReuseComponentChecker - Function to check if the control is a reuse component.
   * @param {boolean} isCloud - Whether the application is running in the cloud.
   * @param {TextBundle} resources - The text bundle.
   * @returns {string} The text of the Add Fragment context menu item.
   */
  const getAddFragmentItemText = (overlay, isReuseComponentChecker, isCloud, resources) => {
    if (isCloud && isReuseComponentChecker(overlay.getElement().getId())) {
      return resources.getText('ADP_ADD_FRAGMENT_MENU_ITEM_REUSE_COMPONENT');
    }
    if (!hasStableId(overlay)) {
      return resources.getText('ADP_ADD_FRAGMENT_MENU_ITEM_UNSTABLE_ID');
    }
    return resources.getText('ADP_ADD_FRAGMENT_MENU_ITEM');
  };

  /**
   * Determines the text that should be displayed for Controller Extension context menu item.
   *
   * @param {ElementOverlay} overlay - An ElementOverlay object representing the UI overlay.
   * @param {isReuseComponentApi} isReuseComponentChecker - Function to check if the control is a reuse component.
   * @param {boolean} isCloud - Whether the application is running in the cloud.
   * @param {TextBundle} resources - The text bundle.
   * @returns {string} The text of the Add Fragment context menu item.
   */
  const getExtendControllerItemText = (overlay, isReuseComponentChecker, isCloud, resources) => {
    const viewId = FlUtils.getViewForControl(overlay.getElement()).getId();
    const syncViewsIds = getSyncViewIds();
    if (syncViewsIds.has(viewId)) {
      return resources.getText('ADP_ADD_CONTROLLER_EXTENSION_MENU_ITEM_SYNC_VIEW');
    }
    if (isCloud && isReuseComponentChecker(overlay.getElement().getId())) {
      return resources.getText('ADP_ADD_CONTROLLER_EXTENSION_MENU_ITEM_REUSE_COMPONENT');
    }
    return resources.getText('ADP_ADD_CONTROLLER_EXTENSION_MENU_ITEM');
  };

  /**
   * Adds a new item to the context menu
   *
   * @param rta Runtime Authoring
   * @param ui5VersionInfo UI5 version information
   */
  const initDialogs = async (rta, ui5VersionInfo) => {
    const contextMenu = rta.getDefaultPlugins().contextMenu;
    const isCloud = rta.getFlexSettings().isCloud;
    const resources = await getTextBundle();
    const isReuseComponentChecker = await getReuseComponentChecker(ui5VersionInfo);
    contextMenu.addMenuItem({
      id: 'ADD_FRAGMENT',
      text: overlay => getAddFragmentItemText(overlay, isReuseComponentChecker, isCloud, resources),
      handler: async overlays => await DialogFactory.createDialog(overlays[0], rta, DialogNames.ADD_FRAGMENT),
      icon: 'sap-icon://attachment-html',
      enabled: overlays => isFragmentCommandEnabled(overlays, isReuseComponentChecker, isCloud)
    });
    contextMenu.addMenuItem({
      id: 'EXTEND_CONTROLLER',
      text: overlay => getExtendControllerItemText(overlay, isReuseComponentChecker, isCloud, resources),
      handler: async overlays => await DialogFactory.createDialog(overlays[0], rta, DialogNames.CONTROLLER_EXTENSION),
      icon: 'sap-icon://create-form',
      enabled: overlays => isControllerExtensionEnabled(overlays, isReuseComponentChecker, isCloud)
    });
  };
  var __exports = {
    __esModule: true
  };
  __exports.isControllerExtensionEnabledForControl = isControllerExtensionEnabledForControl;
  __exports.isControllerExtensionEnabled = isControllerExtensionEnabled;
  __exports.isFragmentCommandEnabled = isFragmentCommandEnabled;
  __exports.getAddFragmentItemText = getAddFragmentItemText;
  __exports.getExtendControllerItemText = getExtendControllerItemText;
  __exports.initDialogs = initDialogs;
  return __exports;
});
//# sourceMappingURL=init-dialogs.js.map