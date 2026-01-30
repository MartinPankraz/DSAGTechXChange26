"use strict";

sap.ui.define(["sap/ui/core/library", "sap/ui/core/mvc/Controller", "../utils", "../../utils/core", "../control-utils", "sap/ui/dt/OverlayRegistry", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "sap/base/Log"], function (sap_ui_core_library, Controller, ___utils, ____utils_core, __ControlUtils, OverlayRegistry, ___sap_ux_private_control_property_editor_common, Log) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ValueState = sap_ui_core_library["ValueState"];
  const checkForExistingChange = ___utils["checkForExistingChange"];
  const getControlById = ____utils_core["getControlById"];
  const ControlUtils = _interopRequireDefault(__ControlUtils);
  const reportTelemetry = ___sap_ux_private_control_property_editor_common["reportTelemetry"];
  /**
   * @namespace open.ux.preview.client.adp.controllers
   */
  const BaseDialog = Controller.extend("open.ux.preview.client.adp.controllers.BaseDialog", {
    constructor: function _constructor(name, telemetryData) {
      Controller.prototype.constructor.call(this, name);
      this.telemetryData = telemetryData;
    },
    onCreateBtnPressHandler: async function _onCreateBtnPressHandler() {
      try {
        await reportTelemetry({
          category: 'Dialog',
          dialogName: this.dialog.getId(),
          ...this.telemetryData
        });
      } catch (error) {
        Log.error('Error in reporting Telemetry:', error);
      }
    },
    getRuntimeControl: function _getRuntimeControl() {
      if (!this._runtimeControl && this.overlays) {
        const selectorId = this.overlays.getId();
        const overlayControl = getControlById(selectorId);
        if (!overlayControl) {
          throw new Error('Cannot get overlay control');
        }
        this._runtimeControl = ControlUtils.getRuntimeControl(overlayControl);
      }
      return this._runtimeControl;
    },
    /**
     * Method is used in add fragment dialog controllers to get current control metadata which are needed on the dialog
     *
     * @returns control metadata and target aggregations
     */
    getControlMetadata: function _getControlMetadata() {
      const controlMetadata = this.getRuntimeControl().getMetadata();
      if (!controlMetadata) {
        throw new Error('Cannot get control metadata');
      }
      const allAggregations = Object.keys(controlMetadata.getAllAggregations());
      const hiddenAggregations = ['customData', 'layoutData', 'dependents'];
      const targetAggregation = allAggregations.filter(item => {
        if (hiddenAggregations.indexOf(item) === -1) {
          return item;
        }
        return false;
      });
      return {
        controlMetadata,
        targetAggregation
      };
    },
    /**
     * Fills indexArray from selected control children
     *
     * @param selectedControlChildren Array of numbers
     * @returns Array of key value pairs
     */
    fillIndexArray: function _fillIndexArray(selectedControlChildren) {
      let indexArray = [];
      if (selectedControlChildren.length === 0) {
        indexArray.push({
          key: 0,
          value: 0
        });
      } else {
        indexArray = selectedControlChildren.map((elem, index) => {
          return {
            key: index + 1,
            value: elem + 1
          };
        });
        indexArray.unshift({
          key: 0,
          value: 0
        });
        indexArray.push({
          key: selectedControlChildren.length + 1,
          value: selectedControlChildren.length + 1
        });
      }
      return indexArray;
    },
    /**
     * Handles fragment name input change
     *
     * @param event Event
     */
    onFragmentNameInputChange: function _onFragmentNameInputChange(event) {
      const input = event.getSource();
      const beginBtn = this.dialog.getBeginButton();
      const fragmentName = input.getValue();
      const fragmentList = this.model.getProperty('/fragmentList');
      const updateDialogState = (valueState, valueStateText = '') => {
        input.setValueState(valueState).setValueStateText(valueStateText);
        beginBtn.setEnabled(valueState === ValueState.Success);
      };
      if (fragmentName.length <= 0) {
        updateDialogState(ValueState.None);
        this.model.setProperty('/newFragmentName', null);
        return;
      }
      const fileExists = fragmentList.some(f => f.fragmentName === `${fragmentName}.fragment.xml`);
      if (fileExists) {
        updateDialogState(ValueState.Error, 'Enter a different name. The fragment name that you entered already exists in your project.');
        return;
      }
      const isValidName = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(fragmentName);
      if (!isValidName) {
        updateDialogState(ValueState.Error, 'The fragment name cannot contain white spaces or special characters.');
        return;
      }
      if (fragmentName.length > 64) {
        updateDialogState(ValueState.Error, 'A fragment file name cannot contain more than 64 characters.');
        return;
      }
      const changeExists = checkForExistingChange(this.rta, 'addXMLAtExtensionPoint', 'content.fragmentPath', `${fragmentName}.fragment.xml`);
      if (changeExists) {
        updateDialogState(ValueState.Error, 'Enter a different name. The fragment name entered matches the name of an unsaved fragment.');
        return;
      }
      // 'changes.fragments' is the current folder structure where fragment changes are written.
      // following value is subjected to change if the folder structure changes
      const template = `${this.rta.getFlexSettings()?.projectId}.changes.fragments.${fragmentName}`;
      const v4CustomXMLChange = checkForExistingChange(this.rta, 'appdescr_fe_changePageConfiguration', 'content.entityPropertyChange.propertyValue.template', template);
      if (v4CustomXMLChange) {
        updateDialogState(ValueState.Error, 'Enter a different name. The fragment name entered matches the name of an unsaved fragment.');
        return;
      }
      updateDialogState(ValueState.Success);
      this.model.setProperty('/newFragmentName', fragmentName);
    },
    /**
     * Sets custom function that fires when user presses escape key.
     */
    setEscapeHandler: function _setEscapeHandler() {
      this.dialog.setEscapeHandler(({
        resolve
      }) => {
        this.handleDialogClose();
        resolve();
      });
    },
    /**
     * Handles the dialog closing and destruction of it.
     */
    handleDialogClose: function _handleDialogClose() {
      this.dialog.close();
      this.dialog.destroy();
    },
    /**
     * Handles the index field whenever a specific aggregation is chosen
     *
     * @param specialIndexAggregation string | number
     */
    specialIndexHandling: function _specialIndexHandling(specialIndexAggregation) {
      const overlay = OverlayRegistry.getOverlay(this.getRuntimeControl());
      const aggregations = overlay.getDesignTimeMetadata().getData().aggregations;
      if (specialIndexAggregation in aggregations && 'specialIndexHandling' in aggregations[specialIndexAggregation]) {
        const controlType = this.getRuntimeControl().getMetadata().getName();
        this.model.setProperty('/indexHandlingFlag', false);
        this.model.setProperty('/specialIndexHandlingIcon', true);
        this.model.setProperty('/iconTooltip', `Index is defined by special logic of ${controlType} and can't be set here`);
      } else {
        this.model.setProperty('/indexHandlingFlag', true);
        this.model.setProperty('/specialIndexHandlingIcon', false);
        this.model.setProperty('/specialIndexHandlingIconPressed', false);
      }
    }
  });
  return BaseDialog;
});
//# sourceMappingURL=BaseDialog.controller.js.map