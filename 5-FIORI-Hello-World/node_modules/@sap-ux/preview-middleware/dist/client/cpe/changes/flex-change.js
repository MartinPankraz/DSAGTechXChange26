"use strict";

sap.ui.define(["sap/ui/rta/command/CommandFactory", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "./validator", "../../utils/fe-v4"], function (CommandFactory, ___sap_ux_private_control_property_editor_common, ___validator, ____utils_fe_v4) {
  "use strict";

  const PropertyType = ___sap_ux_private_control_property_editor_common["PropertyType"];
  const validateBindingModel = ___validator["validateBindingModel"];
  const createManifestPropertyChange = ____utils_fe_v4["createManifestPropertyChange"];
  /**
   * Function to check a give value is a binding expression.
   *
   * @param value value to be checked.
   * @returns boolean
   */
  function isBindingExpression(value) {
    return value.includes('{') && value.includes('}') && value.indexOf('{') < value.indexOf('}');
  }

  /**
   *
   * @param options UI5 adaptation options
   * @param change changed property/app descriptor property  of a control
   */
  async function applyChange(options, change) {
    const {
      rta
    } = options;
    const isBindingString = typeof change.value === 'string' && isBindingExpression(change.value);
    const flexSettings = rta.getFlexSettings();
    const modifiedControl = sap.ui.getCore().byId(change.controlId);
    if (!modifiedControl) {
      return;
    }
    if (change.propertyType === PropertyType.ControlProperty) {
      const modifiedControlModifiedProperties = modifiedControl.getMetadata().getAllProperties()[change.propertyName];
      const isBindingModel = isBindingString && modifiedControlModifiedProperties?.type === 'string';
      const changeType = isBindingString ? 'BindProperty' : 'Property';
      if (isBindingModel) {
        await validateBindingModel(modifiedControl, change.value);
      }
      const property = isBindingString ? 'newBinding' : 'newValue';
      const modifiedValue = {
        generator: flexSettings.generator,
        propertyName: change.propertyName,
        [property]: change.value
      };
      const command = await CommandFactory.getCommandFor(modifiedControl, changeType, modifiedValue, null, flexSettings);
      await rta.getCommandStack().pushAndExecute(command);
    } else if (change.propertyType === PropertyType.Configuration) {
      const command = await createManifestPropertyChange(modifiedControl, flexSettings, {
        [change.propertyName]: change.value
      });
      if (command) {
        await rta.getCommandStack().pushAndExecute(command);
      } else {
        return;
      }
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.applyChange = applyChange;
  return __exports;
});
//# sourceMappingURL=flex-change.js.map