"use strict";

sap.ui.define(["../../i18n"], function (____i18n) {
  "use strict";

  const getTextBundle = ____i18n["getTextBundle"];
  /**
   * Function to validate if a given value is a valid binding model.
   *
   * @param modifiedControl control to be modified.
   * @param value value to be checked.
   */
  async function validateBindingModel(modifiedControl, value) {
    const textBundle = await getTextBundle();
    const bindingValue = value.replace(/[{}]/gi, '').trim();
    const bindingParts = bindingValue.split('>').filter(el => el !== '');
    if (!bindingParts.length) {
      throw new SyntaxError(textBundle.getText('INVALID_BINDING_STRING'));
    }
    if (bindingParts.length === 2) {
      const bindingModel = bindingParts[0];
      const resourceKey = bindingParts[1].trim();
      const resourceModel = modifiedControl.getModel(bindingModel);
      if (!resourceModel) {
        throw new SyntaxError(textBundle.getText('INVALID_BINDING_MODEL'));
      }
      const resourceBundle = resourceModel.getResourceBundle();
      if (!resourceBundle.getText(resourceKey, undefined, true)) {
        throw new SyntaxError(textBundle.getText('INVALID_BINDING_MODEL_KEY'));
      }
    } else {
      throw new SyntaxError(textBundle.getText('INVALID_BINDING_STRING_FORMAT'));
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.validateBindingModel = validateBindingModel;
  return __exports;
});
//# sourceMappingURL=validator.js.map