"use strict";

sap.ui.define(["sap/base/Log", "sap/ui/core/Element", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../utils/error", "../utils/info-center-message", "../utils/version"], function (Log, Element, ___sap_ux_private_control_property_editor_common, ___utils_error, ___utils_info_center_message, ___utils_version) {
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
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const getError = ___utils_error["getError"];
  const sendInfoCenterMessage = ___utils_info_center_message["sendInfoCenterMessage"];
  const isLowerThanMinimalUi5Version = ___utils_version["isLowerThanMinimalUi5Version"];
  const syncViews = new Set();
  let warningShown = false;

  /**
   * Get Ids for all sync views
   *
   * @param ui5VersionInfo UI5 Version Information
   *
   * @returns array of Ids for application sync views
   */
  async function updateSyncViewsIds(ui5VersionInfo) {
    try {
      if (isLowerThanMinimalUi5Version(ui5VersionInfo, {
        major: 1,
        minor: 120,
        patch: 2
      })) {
        const elements = Element.registry.filter(() => true);
        elements.forEach(ui5Element => {
          if (isSyncView(ui5Element)) {
            syncViews.add(ui5Element.getId());
          }
        });
      } else {
        const ElementRegistry = (await __ui5_require_async('sap/ui/core/ElementRegistry')).default;
        const elements = ElementRegistry.all();
        Object.entries(elements).forEach(([key, ui5Element]) => {
          if (isSyncView(ui5Element)) {
            syncViews.add(key);
          }
        });
      }
    } catch (error) {
      Log.error('Could not get application sync views', getError(error));
    }
  }

  /**
   * Show warning message if there are sync views in the application and the warning has not been shown yet.
   */
  async function showSyncViewsWarning() {
    if (warningShown) {
      return;
    }
    if (!syncViews.size) {
      return;
    }
    warningShown = true;
    await sendInfoCenterMessage({
      title: {
        key: 'ADP_SYNC_VIEWS_TITLE'
      },
      description: {
        key: 'ADP_SYNC_VIEWS_MESSAGE'
      },
      type: MessageBarType.warning
    });
  }

  /**
   * Check if element is sync view
   *
   * @param element Design time Element
   * @returns boolean if element is sync view or not
   */
  function isSyncView(element) {
    return element?.getMetadata()?.getName()?.includes('XMLView') && element?.oAsyncState === undefined;
  }

  /**
   * Retrieves the set of synchronious view IDs.
   *
   * @returns Cached set containing the IDs of all synchronious views.
   */
  function getSyncViewIds() {
    return syncViews;
  }

  /**
   * Resets the cached synchronious views and warning state.
   * Needed for testing purposes to ensure a clean state.
   */
  function resetSyncViews() {
    syncViews.clear();
    warningShown = false;
  }
  var __exports = {
    __esModule: true
  };
  __exports.updateSyncViewsIds = updateSyncViewsIds;
  __exports.showSyncViewsWarning = showSyncViewsWarning;
  __exports.isSyncView = isSyncView;
  __exports.getSyncViewIds = getSyncViewIds;
  __exports.resetSyncViews = resetSyncViews;
  return __exports;
});
//# sourceMappingURL=sync-views-utils.js.map