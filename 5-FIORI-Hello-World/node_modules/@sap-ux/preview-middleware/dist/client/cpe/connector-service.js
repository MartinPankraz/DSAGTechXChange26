"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../utils/version"], function (___sap_ux_private_control_property_editor_common, ___utils_version) {
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
  const reloadApplication = ___sap_ux_private_control_property_editor_common["reloadApplication"];
  const storageFileChanged = ___sap_ux_private_control_property_editor_common["storageFileChanged"];
  const getUi5Version = ___utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = ___utils_version["isLowerThanMinimalUi5Version"];
  /**
   * A Class of WorkspaceConnectorService
   */
  class WorkspaceConnectorService {
    /**
     * When save and reload is triggered, we do not need special handling for changes that are not directly visible in preview.
     */
    isReloadPending = false;
    /**
     * Initializes connector service.
     *
     * @param sendAction action sender function
     * @param subscribe subscriber function
     */
    async init(sendAction, subscribe) {
      this.sendAction = sendAction;
      subscribe(action => {
        if (reloadApplication.match(action)) {
          this.isReloadPending = true;
        }
      });
      const ui5Version = await getUi5Version();
      if (isLowerThanMinimalUi5Version(ui5Version, {
        major: 1,
        minor: 84
      })) {
        if (ui5Version.isCdn) {
          const FakeLrepConnector = (await __ui5_require_async('sap/ui/fl/FakeLrepConnector')).default;
          FakeLrepConnector.fileChangeRequestNotifier = this.onChangeSaved.bind(this);
        } else {
          // For UI5 versions below 1.84 served from npmjs, we do not support any connector service
          return;
        }
      } else {
        const connector = (await __ui5_require_async('open/ux/preview/client/flp/WorkspaceConnector')).default;
        // hook the file deletion listener to the UI5 workspace connector
        connector.storage.fileChangeRequestNotifier = this.onChangeSaved.bind(this);
      }
    }
    onChangeSaved(fileName, kind, change = {}, additionalChangeInfo = {}) {
      const {
        changeType,
        content
      } = change;
      if (changeType && !['appdescr_fe_changePageConfiguration', 'appdescr_ui_generic_app_changePageConfiguration'].includes(changeType) || kind === 'delete' || this.isReloadPending) {
        this.sendAction(storageFileChanged(fileName?.replace('sap.ui.fl.', '')));
      }
      if (changeType === 'addXML' && additionalChangeInfo?.templateName && content?.fragmentPath) {
        // If there is template available, then we save and reload right away,
        // so we should ignore the first file change event that comes for the fragment.
        // (We don't want to show "Reload" button)
        this.sendAction(storageFileChanged(content.fragmentPath));
      }
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.WorkspaceConnectorService = WorkspaceConnectorService;
  return __exports;
});
//# sourceMappingURL=connector-service.js.map