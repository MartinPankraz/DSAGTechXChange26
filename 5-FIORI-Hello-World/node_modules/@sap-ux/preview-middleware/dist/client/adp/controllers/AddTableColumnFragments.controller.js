"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/dt/OverlayRegistry", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../cpe/communication-service", "../../i18n", "sap/ui/core/library", "../../utils/additional-change-info", "../../utils/error", "../../utils/info-center-message", "../api-handler", "../command-executor", "../control-utils", "./BaseDialog.controller"], function (JSONModel, OverlayRegistry, ___sap_ux_private_control_property_editor_common, ____cpe_communication_service, ____i18n, sap_ui_core_library, ____utils_additional_change_info, ____utils_error, ____utils_info_center_message, ___api_handler, __CommandExecutor, __ControlUtils, __BaseDialog) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const setApplicationRequiresReload = ___sap_ux_private_control_property_editor_common["setApplicationRequiresReload"];
  const CommunicationService = ____cpe_communication_service["CommunicationService"];
  const getResourceModel = ____i18n["getResourceModel"];
  const ValueState = sap_ui_core_library["ValueState"];
  const setAdditionalChangeInfoForChangeFile = ____utils_additional_change_info["setAdditionalChangeInfoForChangeFile"];
  const getError = ____utils_error["getError"];
  const sendInfoCenterMessage = ____utils_info_center_message["sendInfoCenterMessage"];
  const getFragments = ___api_handler["getFragments"];
  const CommandExecutor = _interopRequireDefault(__CommandExecutor);
  const ControlUtils = _interopRequireDefault(__ControlUtils);
  const BaseDialog = _interopRequireDefault(__BaseDialog);
  const radix = 10;
  const COLUMNS_AGGREGATION = 'columns';
  const ITEMS_AGGREGATION = 'items';
  const CELLS_AGGREGATION = 'cells';
  /**
   * @namespace open.ux.preview.client.adp.controllers
   */
  const AddTableColumnFragments = BaseDialog.extend("open.ux.preview.client.adp.controllers.AddTableColumnFragments", {
    constructor: function _constructor(name, overlays, rta, options, telemetryData) {
      BaseDialog.prototype.constructor.call(this, name, telemetryData);
      this.options = options;
      this.rta = rta;
      this.overlays = overlays;
      this.model = new JSONModel({
        title: options.title
      });
      this.commandExecutor = new CommandExecutor(this.rta);
    },
    /**
     * Setups the Dialog and the JSON Model
     *
     * @param {Dialog} dialog - Dialog instance
     */
    setup: async function _setup(dialog) {
      this.dialog = dialog;
      this.setEscapeHandler();
      await this.buildDialogData();
      const resourceModel = await getResourceModel('open.ux.preview.client');
      this.dialog.setModel(resourceModel, 'i18n');
      this.dialog.setModel(this.model);
      this.dialog.open();
    },
    /**
     * Handles create button press
     *
     * @param event Event
     */
    onCreateBtnPress: async function _onCreateBtnPress(event) {
      const source = event.getSource();
      source.setEnabled(false);
      await BaseDialog.prototype.onCreateBtnPressHandler.call(this);
      const columnFragmentName = this.model.getProperty('/newColumnFragmentName');
      const cellFragmentName = this.model.getProperty('/newCellFragmentName');
      const index = this.model.getProperty('/selectedIndex');
      const fragmentData = {
        index,
        fragments: [{
          fragmentName: columnFragmentName,
          targetAggregation: this.model.getProperty('/selectedColumnsAggregation')
        }, {
          fragmentName: cellFragmentName,
          targetAggregation: this.model.getProperty('/selectedItemsAggregation')
        }]
      };
      await this.createFragmentChange(fragmentData);
      await sendInfoCenterMessage({
        title: {
          key: 'ADP_CREATE_XML_FRAGMENT_TITLE'
        },
        description: {
          key: 'ADP_ADD_TWO_FRAGMENTS_WITH_TEMPLATE_NOTIFICATION',
          params: [columnFragmentName, cellFragmentName]
        },
        type: MessageBarType.info
      });
      this.handleDialogClose();
    },
    /**
     * Builds data that is used in the dialog
     */
    buildDialogData: async function _buildDialogData() {
      const {
        controlMetadata,
        targetAggregation
      } = this.getControlMetadata();
      const defaultAggregation = this.options.aggregation ?? controlMetadata.getDefaultAggregationName();
      const selectedControlName = controlMetadata.getName();
      let selectedControlChildren = Object.keys(ControlUtils.getControlAggregationByName(this.getRuntimeControl(), defaultAggregation));
      selectedControlChildren = selectedControlChildren.map(key => {
        return Number.parseInt(key, radix);
      });
      this.model.setProperty('/selectedControlName', selectedControlName);
      const indexArray = this.fillIndexArray(selectedControlChildren);
      if (!targetAggregation.includes(COLUMNS_AGGREGATION)) {
        throw new Error(`Selected control does not have "${COLUMNS_AGGREGATION}" aggregation`);
      }
      this.model.setProperty('/selectedColumnsAggregation', COLUMNS_AGGREGATION);
      this.specialIndexHandling(COLUMNS_AGGREGATION);
      if (!targetAggregation.includes(ITEMS_AGGREGATION)) {
        throw new Error(`Selected control does not have "${ITEMS_AGGREGATION}" aggregation`);
      }
      this.model.setProperty('/selectedItemsAggregation', ITEMS_AGGREGATION);
      try {
        const {
          fragments
        } = await getFragments();
        this.model.setProperty('/fragmentList', fragments);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_GET_FRAGMENTS_FAILURE_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        throw error;
      }
      this.model.setProperty('/index', indexArray);
      this.model.setProperty('/selectedIndex', indexArray.length - 1);
    },
    /**
     * Checks input values for duplicates and updates confirmation button state based on input validation states
     */
    updateFormState: function _updateFormState() {
      const form = this.dialog.getContent()[0];
      const formContent = form.getContent();
      const inputs = formContent.filter(item => item.isA('sap.m.Input'));
      const value1 = inputs[0].getValue();
      const value2 = inputs[1].getValue();
      // check duplicating fragment names
      if (value1 === value2 && value1.length) {
        inputs.forEach(input => {
          if (input.getValueState() === ValueState.Success) {
            // if there is no other validation error
            input.setValueState(ValueState.Error).setValueStateText('Duplicate name');
          }
        });
      } else {
        // clear duplicates error
        inputs.forEach(input => {
          if (input.getValueState() === ValueState.Error && input.getValueStateText() === 'Duplicate name') {
            input.setValueState(ValueState.Success);
          }
        });
      }
      const beginBtn = this.dialog.getBeginButton();
      beginBtn.setEnabled(inputs.every(input => input.getValueState() === ValueState.Success));
    },
    /**
     * Handles column fragment name input change
     *
     * @param event Event
     */
    onColumnFragmentNameInputChange: function _onColumnFragmentNameInputChange(event) {
      // call parent method to update control state and show warning messages
      BaseDialog.prototype.onFragmentNameInputChange.call(this, event);

      // update model value
      const input = event.getSource();
      let modelValue = input.getValue();
      if (modelValue.length < 1) {
        modelValue = null;
      }
      this.model.setProperty('/newColumnFragmentName', modelValue);
      this.updateFormState();
    },
    /**
     * Handles cell fragment name input change
     *
     * @param event Event
     */
    onCellFragmentNameInputChange: function _onCellFragmentNameInputChange(event) {
      // call parent method to update control state and show warning messages
      BaseDialog.prototype.onFragmentNameInputChange.call(this, event);

      // update model value
      const input = event.getSource();
      let modelValue = input.getValue();
      if (input.getValue().length < 1) {
        modelValue = null;
      }
      this.model.setProperty('/newCellFragmentName', modelValue);
      this.updateFormState();
    },
    /**
     * Creates an addXML fragment command and pushes it to the command stack
     *
     * @param fragmentData Fragment Data
     */
    createFragmentChange: async function _createFragmentChange(fragmentData) {
      const {
        fragments,
        index
      } = fragmentData;
      const flexSettings = this.rta.getFlexSettings();
      const overlay = OverlayRegistry.getOverlay(this.getRuntimeControl());
      const designMetadata = overlay.getDesignTimeMetadata();
      const compositeCommand = await this.commandExecutor.createCompositeCommand(this.getRuntimeControl());
      for (const fragment of fragments) {
        const modifiedValue = {
          fragment: `<core:FragmentDefinition xmlns:core='sap.ui.core'></core:FragmentDefinition>`,
          fragmentPath: `fragments/${fragment.fragmentName}.fragment.xml`,
          index: index ?? 0,
          targetAggregation: fragment.targetAggregation === ITEMS_AGGREGATION ? CELLS_AGGREGATION : fragment.targetAggregation
        };
        const targetObject = fragment.targetAggregation === COLUMNS_AGGREGATION ? this.getRuntimeControl() : this.getRuntimeControl().getAggregation(ITEMS_AGGREGATION)[0];
        const command = await this.commandExecutor.getCommand(targetObject, 'addXML', modifiedValue, flexSettings, designMetadata);
        const templateName = fragment.targetAggregation === COLUMNS_AGGREGATION ? `V2_SMART_TABLE_COLUMN` : 'V2_SMART_TABLE_CELL';
        const preparedChange = command.getPreparedChange();
        setAdditionalChangeInfoForChangeFile(preparedChange.getDefinition().fileName, {
          templateName
        });
        compositeCommand.addCommand(command, false);
      }
      await this.commandExecutor.pushAndExecuteCommand(compositeCommand);
      CommunicationService.sendAction(setApplicationRequiresReload(true));
    }
  });
  return AddTableColumnFragments;
});
//# sourceMappingURL=AddTableColumnFragments.controller.js.map