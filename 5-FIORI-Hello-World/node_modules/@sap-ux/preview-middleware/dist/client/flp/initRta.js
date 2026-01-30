"use strict";

sap.ui.define(["sap/base/util/merge", "sap/ui/core/Control", "sap/ui/core/UIComponent", "sap/ui/fl/Utils", "sap/ui/fl/write/api/FeaturesAPI", "sap/ui/rta/RuntimeAuthoring"], function (merge, Control, UIComponent, Utils, FeaturesAPI, RuntimeAuthoring) {
  "use strict";

  const defaultOptions = {
    flexSettings: {
      developerMode: false,
      layer: 'CUSTOMER'
    }
  };
  const layers = {
    BASE: 'BASE',
    CUSTOMER: 'CUSTOMER',
    CUSTOMER_BASE: 'CUSTOMER_BASE',
    PARTNER: 'PARTNER',
    PUBLIC: 'PUBLIC',
    USER: 'USER',
    VENDOR: 'VENDOR'
  };

  /**
   * Checks if the given layer is a valid layer.
   *
   * @param {string} layer - The layer name to be validated.
   * @returns {boolean} Returns true if the layer is valid, otherwise false.
   */
  function isValidLayer(layer) {
    return Object.keys(layers).some(existingLayer => existingLayer === layer);
  }

  /**
   * Validates a given layer and throws an error if it is invalid.
   *
   * @param {string} layer - The layer name to be checked.
   * @throws {Error} Throws an error if the layer is not valid.
   */
  function checkLayer(layer) {
    if (!isValidLayer(layer)) {
      throw new Error('An invalid layer is passed');
    }
  }

  /**
   * Checks if the given root control is an instance of Control or UIComponent.
   *
   * @param {Component} rootControl - The root control to be checked.
   * @throws {Error} Throws an error if the root control is not an instance of Control or UIComponent.
   */
  function checkRootControl(rootControl) {
    if (!(rootControl instanceof Control) && !(rootControl instanceof UIComponent)) {
      throw new Error('An invalid root control was passed');
    }
  }

  /**
   * Checks if key user adaptation is enabled for the specified component.
   * Fiori tools mode is considered a developer scenario where the `flexEnabled` flag should not be evaluated.
   *
   * @param {Component} component - The UI5 control component to check for flex (key user adaptation) enabled status.
   * @throws {Error} Throws an error if key user adaptation is explicitly disabled in the component's manifest.
   */
  function checkFlexEnabled(component) {
    // fiori tools is always a developer scenario where the flexEnabled flag should not be evaluated
    const fioriToolsMode = new URLSearchParams(window.location.search).get('fiori-tools-rta-mode');
    if (!fioriToolsMode || fioriToolsMode === 'false') {
      const manifest = component.getManifest() || {};
      const flexEnabled = manifest['sap.ui5']?.flexEnabled;
      if (flexEnabled === false) {
        throw new Error('This app is not enabled for key user adaptation');
      }
    }
  }

  /**
   * Checks if the current user is a key user for the given layer.
   * Specifically, it checks for key user rights if the layer is the CUSTOMER layer.
   * If the user is not a key user and the layer is CUSTOMER, an error is thrown.
   *
   * Note: The function assumes the presence of 'layers.CUSTOMER'. In case of non-CUSTOMER layers,
   * it simply resolves the promise without any additional checks.
   *
   * @param {string} layer - The layer for which to check key user rights.
   * @returns {Promise<void>} A promise that resolves if the user is a key user or the layer is not CUSTOMER.
   *                          Rejects with an error if the user is not a key user for the CUSTOMER layer.
   * @throws {Error} Throws an error with the message 'No key user rights found' if the user lacks key user rights.
   */
  async function checkKeyUser(layer) {
    if (layers.CUSTOMER === layer) {
      const isKeyUser = await FeaturesAPI.isKeyUser();
      if (!isKeyUser) {
        throw new Error('No key user rights found');
      }
    }
  }

  /**
   * Checks the validity of the specified layer and root control.
   * It ensures that the layer is valid and the root control is an instance of Control or UIComponent.
   * Additionally, it checks key user permissions for the specified layer.
   *
   * @param {Control} rootControl - The root control to be validated.
   * @param {string} layer - The layer name to be validated.
   * @returns {Promise<void>} A promise that resolves when all checks pass without errors.
   * @throws {Error} Throws an error if any of the checks fail.
   */
  async function checkLayerAndControl(rootControl, layer) {
    checkLayer(layer);
    checkRootControl(rootControl);
    await checkKeyUser(layer);
  }

  /**
   * Retrieves the first HTML element with the specified title attribute.
   *
   * @param {string} title - The title attribute value to search for in the HTML elements.
   * @param {Element | null} element - The target element that will be searched.
   * @returns {Element | null} The first HTML element that matches the given title attribute value, or null if no such element is found.
   */
  function getElementByTitle(title, element) {
    const selector = `[title="${title}"]`;
    return element ? element.querySelector(selector) : document.querySelector(selector);
  }

  /**
   * Hides a UI5 Button control with the specified ID.
   *
   * This function attempts to find a UI5 Button control by its ID and then sets its visibility to false.
   *
   * @param {string | undefined} buttonId - The ID of the Button control to hide. If undefined, no action is taken.
   * @returns {void}
   */
  function hideButtonById(buttonId) {
    const button = sap.ui.getCore().byId(buttonId);
    button?.setVisible(false);
  }

  /**
   * Hides specific buttons by ID from the RTA toolbar.
   * This function specifically targets buttons 'Reset' and 'Publish'.
   */
  function removeExtraBtnsFromToolbar() {
    const rtaToolbarEl = document.querySelector('.sapUiRtaToolbar');
    const resetEl = getElementByTitle('Reset', rtaToolbarEl);
    const publishEl = getElementByTitle('Publish', rtaToolbarEl);
    hideButtonById(resetEl?.id);
    hideButtonById(publishEl?.id);
  }

  /**
   * Initializes custom RuntimeAuthoring for UI5 Versions < 1.72 and start UI Adaptation.
   * Ensures that the passed options are valid.
   *
   * @param {RTAOptions} options - Options that are passed to RuntimeAuthoring upon initialization.
   * @param {RTAPlugin} loadPlugins - Script that needs to be executed after rta is initialized.
   * @returns {Promise<void>} A promise that resolves when all the checks have passed and RuntimeAuthoring is started.
   */
  var __exports = async function (options, loadPlugins) {
    options = merge(defaultOptions, options);
    const layer = options.flexSettings.layer;
    const rootControl = options.rootControl;
    await checkLayerAndControl(rootControl, layer);
    options.rootControl = Utils.getAppComponentForControl(rootControl);
    checkFlexEnabled(options.rootControl);
    const rta = new RuntimeAuthoring(options);
    rta.attachEvent('stop', () => rta.destroy());
    if (loadPlugins) {
      await loadPlugins(rta);
    }
    await rta.start();
    removeExtraBtnsFromToolbar();
  };
  __exports.isValidLayer = isValidLayer;
  __exports.checkLayer = checkLayer;
  __exports.checkRootControl = checkRootControl;
  __exports.checkFlexEnabled = checkFlexEnabled;
  __exports.checkKeyUser = checkKeyUser;
  return __exports;
});
//# sourceMappingURL=initRta.js.map