"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../cpe/communication-service", "../i18n"], function (___sap_ux_private_control_property_editor_common, ___cpe_communication_service, ___i18n) {
  "use strict";

  const showInfoCenterMessage = ___sap_ux_private_control_property_editor_common["showInfoCenterMessage"];
  const CommunicationService = ___cpe_communication_service["CommunicationService"];
  const getTextBundle = ___i18n["getTextBundle"];
  /**
   * Localization key interface for defining message keys and optional parameters.
   */
  /**
   * InfoCenterMessage interface for defining the structure of an Info center message.
   * It includes title, description, optional details, and type.
   */
  /**
   * Shows a localized/plain string message in the Info center.
   *
   * @param {InfoCenterMessage} message - The message object containing title, description,
   * details and type for the message. Each text in the message can be localized or
   * left as a plain string.
   */
  async function sendInfoCenterMessage({
    title,
    description,
    details,
    type
  }) {
    CommunicationService.sendAction(showInfoCenterMessage({
      title: await getTranslation(title),
      description: await getTranslation(description),
      details: await getTranslation(details),
      type
    }));
  }

  /**
   * Util function which returns translation for a localization key or a plain string.
   * If the value is undefined, it returns undefined.
   *
   * @param {LocalizationKey | string | undefined} value - The localization key, plain string or undefined.
   * @returns {Promise<string>} A promise that resolves to the translated string.
   */
  async function getTranslation(value) {
    if (value === undefined) {
      return undefined;
    }
    if (typeof value === 'string') {
      return value;
    }
    const bundle = await getTextBundle();
    return bundle.getText(value.key, value.params);
  }
  var __exports = {
    __esModule: true
  };
  __exports.sendInfoCenterMessage = sendInfoCenterMessage;
  return __exports;
});
//# sourceMappingURL=info-center-message.js.map