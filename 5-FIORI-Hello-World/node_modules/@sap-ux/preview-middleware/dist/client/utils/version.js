"use strict";

sap.ui.define(["sap/ui/VersionInfo", "sap/base/Log", "./info-center-message", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common"], function (VersionInfo, Log, ___info_center_message, ___sap_ux_private_control_property_editor_common) {
  "use strict";

  const sendInfoCenterMessage = ___info_center_message["sendInfoCenterMessage"];
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  /**
   * Default minimal supported UI5 version
   */
  const minVersionInfo = {
    major: 1,
    minor: 71
  };

  /**
   * Check if the given version info is valid.
   *
   * @param versionInfo to check
   * @throws Error if the version info is invalid
   */
  function checkVersionInfo(versionInfo) {
    if (Number.isNaN(versionInfo.major) || Number.isNaN(versionInfo.minor) || Number.isNaN(versionInfo.patch ?? 0)) {
      void sendInfoCenterMessage({
        title: {
          key: 'FLP_UI_VERSION_RETRIEVAL_FAILURE_TITLE'
        },
        description: {
          key: 'FLP_UI_INVALID_UI5_VERSION_DESCRIPTION'
        },
        type: MessageBarType.error
      });
      throw new Error('Invalid version info');
    }
  }

  /**
   * Retrieve the UI5 version.
   * If no library is given, the version from 'sap.ui.core' will be retrieved.
   * Note that the patch version of actual SAPUI5 version might differ from the lib that has been used for the version request (e.g. SAPUI5 1.96.38 contains sap.ui.core 1.96.36).
   * For details see the patch info of the respective SAPUI5 version (e.g. https://ui5.sap.com/1.96.38/patchinfo.html).
   *
   * @param library - (optional) specific library name to get the version from, e.g. 'sap.m'
   * @returns Ui5VersionInfo
   */
  async function getUi5Version(library = 'sap.ui.core') {
    const versionInfo = await VersionInfo.load();
    let version = versionInfo?.libraries?.find(lib => lib.name === library)?.version;
    const isCdn = versionInfo?.name === 'SAPUI5 Distribution';
    if (!version) {
      Log.error('Could not get UI5 version of application. Using version: 1.130.9 as fallback.');
      version = '1.130.9';
      await sendInfoCenterMessage({
        title: {
          key: 'FLP_UI_VERSION_RETRIEVAL_FAILURE_TITLE'
        },
        description: {
          key: 'FLP_UI_VERSION_RETRIEVAL_FAILURE_DESCRIPTION',
          params: [version]
        },
        type: MessageBarType.error
      });
    }
    const [major, minor, patch] = version.split('.').map(versionPart => Number.parseInt(versionPart, 10));
    const label = version.split(/-(.*)/s)?.[1];
    return {
      major,
      minor,
      patch,
      label,
      isCdn
    };
  }

  /**
   * Checks if the given version is lower than the required minimal version.
   * Note that the patch version of actual SAPUI5 version might differ from the lib that has been used for the version request (e.g. SAPUI5 1.96.38 contains sap.ui.core 1.96.36).
   * For details see the patch info of the respective SAPUI5 version (e.g. https://ui5.sap.com/1.96.38/patchinfo.html).
   *
   * @param ui5VersionInfo to check
   * @param minUi5VersionInfo to check against (default is 1.71)
   * @throws Error if the version info is invalid
   * @returns boolean
   */
  function isLowerThanMinimalUi5Version(ui5VersionInfo, minUi5VersionInfo = minVersionInfo) {
    checkVersionInfo(ui5VersionInfo);
    checkVersionInfo(minUi5VersionInfo);
    return ui5VersionInfo.major < minUi5VersionInfo.major || ui5VersionInfo.major === minUi5VersionInfo.major && ui5VersionInfo.minor < minUi5VersionInfo.minor || ui5VersionInfo.major === minUi5VersionInfo.major && ui5VersionInfo.minor === minUi5VersionInfo.minor && (ui5VersionInfo?.patch ?? 0) < (minUi5VersionInfo?.patch ?? 0);
  }

  /**
   * Checks if the given version is equal to the specified version.
   * Note that the patch version of actual SAPUI5 version might differ from the lib that has been used for the version request (e.g. SAPUI5 1.96.38 contains sap.ui.core 1.96.36).
   * For details see the patch info of the respective SAPUI5 version (e.g. https://ui5.sap.com/1.96.38/patchinfo.html).
   *
   * @param ui5VersionInfo to check
   * @param targetUi5VersionInfo to check against (default is 1.71)
   * @throws Error if the version info is invalid
   * @returns boolean
   */
  function isVersionEqualOrHasNewerPatch(ui5VersionInfo, targetUi5VersionInfo = minVersionInfo) {
    checkVersionInfo(ui5VersionInfo);
    checkVersionInfo(targetUi5VersionInfo);
    return ui5VersionInfo.major === targetUi5VersionInfo.major && ui5VersionInfo.minor === targetUi5VersionInfo.minor && (ui5VersionInfo?.patch ?? 0) >= (targetUi5VersionInfo?.patch ?? 0);
  }

  /**
   * Returns the fully qualified UI5 version string - major and minor version concatenated.
   *
   * @param {Ui5VersionInfo} ui5VersionInfo - The ui5 version info object containing major and minor version.
   * @returns {string} The fully qualified UI5 version string.
   */
  function getFullyQualifiedUi5Version(ui5VersionInfo) {
    return `${ui5VersionInfo.major}.${ui5VersionInfo.minor}`;
  }
  var __exports = {
    __esModule: true
  };
  __exports.minVersionInfo = minVersionInfo;
  __exports.getUi5Version = getUi5Version;
  __exports.isLowerThanMinimalUi5Version = isLowerThanMinimalUi5Version;
  __exports.isVersionEqualOrHasNewerPatch = isVersionEqualOrHasNewerPatch;
  __exports.getFullyQualifiedUi5Version = getFullyQualifiedUi5Version;
  return __exports;
});
//# sourceMappingURL=version.js.map