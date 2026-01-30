"use strict";

sap.ui.define(["sap/ui/core/library", "sap/ui/model/json/JSONModel", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../i18n", "../../utils/core", "../../utils/error", "../../utils/info-center-message", "../../utils/version", "../api-handler", "../command-executor", "../utils", "./BaseDialog.controller"], function (sap_ui_core_library, JSONModel, ___sap_ux_private_control_property_editor_common, ____i18n, ____utils_core, ____utils_error, ____utils_info_center_message, ____utils_version, ___api_handler, __CommandExecutor, ___utils, __BaseDialog) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  /** sap.m */
  /** sap.ui.core */
  const ValueState = sap_ui_core_library["ValueState"];
  /** sap.ui.base */
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const getResourceModel = ____i18n["getResourceModel"];
  const getTextBundle = ____i18n["getTextBundle"];
  const getControlById = ____utils_core["getControlById"];
  const getError = ____utils_error["getError"];
  const sendInfoCenterMessage = ____utils_info_center_message["sendInfoCenterMessage"];
  const getUi5Version = ____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = ____utils_version["isLowerThanMinimalUi5Version"];
  const getExistingController = ___api_handler["getExistingController"];
  const readControllers = ___api_handler["readControllers"];
  const writeChange = ___api_handler["writeChange"];
  const writeController = ___api_handler["writeController"];
  const CommandExecutor = _interopRequireDefault(__CommandExecutor);
  const checkForExistingChange = ___utils["checkForExistingChange"];
  const getControllerInfo = ___utils["getControllerInfo"];
  const BaseDialog = _interopRequireDefault(__BaseDialog);
  /**
   * @namespace open.ux.preview.client.adp.controllers
   */
  const ControllerExtension = BaseDialog.extend("open.ux.preview.client.adp.controllers.ControllerExtension", {
    constructor: function _constructor(name, overlays, rta, data, telemetryData) {
      BaseDialog.prototype.constructor.call(this, name, telemetryData);
      this.rta = rta;
      this.overlays = overlays;
      this.model = new JSONModel();
      this.data = data;
    },
    /**
     * Setups the Dialog and the JSON Model
     *
     * @param {Dialog} dialog - Dialog instance
     */
    setup: async function _setup(dialog) {
      this.dialog = dialog;
      this.setEscapeHandler();
      const resourceModel = await getResourceModel('open.ux.preview.client');
      this.bundle = await getTextBundle();
      await this.buildDialogData();
      this.dialog.setModel(resourceModel, 'i18n');
      this.dialog.setModel(this.model);
      this.dialog.open();
    },
    /**
     * Handles fragment name input change
     *
     * @param event Event
     */
    onControllerNameInputChange: function _onControllerNameInputChange(event) {
      const input = event.getSource();
      const beginBtn = this.dialog.getBeginButton();
      const controllerName = input.getValue();
      const controllerList = this.model.getProperty('/controllersList');
      const updateDialogState = (valueState, valueStateText = '') => {
        input.setValueState(valueState).setValueStateText(valueStateText);
        beginBtn.setEnabled(valueState === ValueState.Success);
      };
      if (controllerName.length <= 0) {
        updateDialogState(ValueState.None);
        this.model.setProperty('/newControllerName', null);
        return;
      }
      const fileExists = controllerList.some(f => f.controllerName === controllerName);
      const pendingChangeExists = checkForExistingChange(this.rta, 'codeExt', 'content.codeRef', `${controllerName}.js`);
      if (fileExists) {
        updateDialogState(ValueState.Error, 'Enter a different name. The controller name that you entered already exists in your project.');
        return;
      }
      if (pendingChangeExists) {
        updateDialogState(ValueState.Error, 'Enter a different name. The controller name that you entered already exists as a pending change.');
        return;
      }
      const isValidName = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(controllerName);
      if (!isValidName) {
        updateDialogState(ValueState.Error, 'The controller name cannot contain white spaces or special characters.');
        return;
      }
      if (controllerName.length > 64) {
        updateDialogState(ValueState.Error, 'A controller file name cannot contain more than 64 characters.');
        return;
      }
      updateDialogState(ValueState.Success);
      this.model.setProperty('/newControllerName', controllerName);
    },
    /**
     * Handles create button press
     *
     * @param event Event
     */
    onCreateBtnPress: async function _onCreateBtnPress(event) {
      const source = event.getSource();
      await BaseDialog.prototype.onCreateBtnPressHandler.call(this);
      const controllerExists = this.model.getProperty('/controllerExists');
      if (!controllerExists) {
        source.setEnabled(false);
        const controllerName = this.model.getProperty('/newControllerName');
        const viewId = this.model.getProperty('/viewId');
        const controllerRef = {
          codeRef: `coding/${controllerName}.js`,
          viewId
        };
        if (this.data) {
          this.data.deferred.resolve(controllerRef);
        } else {
          await this.createNewController(controllerName, controllerRef);
        }
        if (this.data && (await this.isControllerExtensionSupported())) {
          await sendInfoCenterMessage({
            title: {
              key: 'ADP_CREATE_CONTROLLER_EXTENSION_TITLE'
            },
            description: {
              key: 'ADP_CREATE_CONTROLLER_EXTENSION',
              params: [controllerName]
            },
            type: MessageBarType.info
          });
        }
      } else {
        const controllerPath = this.model.getProperty('/controllerPath');
        window.open(`vscode://file${controllerPath}`);
      }
      this.handleDialogClose();
    },
    /**
     * Builds data that is used in the dialog.
     */
    buildDialogData: async function _buildDialogData() {
      const selectorId = this.overlays.getId();
      const overlayControl = sap.ui.getCore().byId(selectorId);
      const {
        controllerName,
        viewId
      } = getControllerInfo(overlayControl);
      const data = await this.getExistingController(controllerName);
      const hasPendingChangeForView = checkForExistingChange(this.rta, 'codeExt', 'selector.controllerName', controllerName);
      if (data) {
        if (hasPendingChangeForView) {
          this.updateModelForExistingPendingChange();
        } else if (data?.controllerExists) {
          this.updateModelForExistingController(data);
        } else {
          this.updateModelForNewController(viewId, data.isTsSupported);
          await this.getControllers();
        }
      }
    },
    /**
     * Updates the model properties for an existing controller.
     *
     * @param {CodeExtResponse} data - Existing controller data from the server.
     */
    updateModelForExistingController: function _updateModelForExistingController(data) {
      const {
        controllerExists,
        controllerPath,
        controllerPathFromRoot,
        isRunningInBAS
      } = data;
      this.model.setProperty('/controllerExists', controllerExists);
      this.model.setProperty('/controllerPath', controllerPath);
      this.model.setProperty('/controllerPathFromRoot', controllerPathFromRoot);
      this.model.setProperty('/inputFormVisibility', false);
      this.model.setProperty('/pendingChangeFormVisibility', false);
      this.model.setProperty('/existingControllerFormVisibility', true);
      if (isRunningInBAS) {
        this.dialog.getBeginButton().setVisible(false);
      } else {
        this.dialog.getBeginButton().setText('Open in VS Code').setEnabled(true);
      }
      this.dialog.getEndButton().setText('Close');
    },
    /**
     * Updates the model properties for an existing controller in a pending change.
     */
    updateModelForExistingPendingChange: function _updateModelForExistingPendingChange() {
      this.model.setProperty('/inputFormVisibility', false);
      this.model.setProperty('/existingControllerFormVisibility', false);
      this.model.setProperty('/pendingChangeFormVisibility', true);
      this.dialog.getBeginButton().setVisible(false);
      this.dialog.getEndButton().setText('Close');
    },
    /**
     * Updates the model property for a new controller.
     *
     * @param {string} viewId - The view ID.
     * @param {boolean} isTsSupported - Whether TypeScript supported for the current project.
     */
    updateModelForNewController: function _updateModelForNewController(viewId, isTsSupported) {
      this.model.setProperty('/viewId', viewId);
      this.model.setProperty('/controllerExtension', isTsSupported ? '.ts' : '.js');
      this.model.setProperty('/existingControllerFormVisibility', false);
      this.model.setProperty('/pendingChangeFormVisibility', false);
      this.model.setProperty('/inputFormVisibility', true);
    },
    /**
     * Retrieves existing controller data if found in the project's workspace.
     *
     * @param controllerName Controller name that exists in the view.
     * @returns Returns existing controller data.
     */
    getExistingController: async function _getExistingController(controllerName) {
      let data;
      try {
        data = await getExistingController(controllerName);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_CONTROLLER_ERROR_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        throw error;
      }
      return data;
    },
    /**
     * Retrieves controller files and fills the model with data
     */
    getControllers: async function _getControllers() {
      try {
        const {
          controllers
        } = await readControllers();
        this.model.setProperty('/controllersList', controllers);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_CONTROLLER_ERROR_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        throw error;
      }
    },
    /**
     * Creates a new fragment for the specified control
     *
     * @param controllerName Controller Name
     * @param controllerRef Controller reference
     */
    createNewController: async function _createNewController(controllerName, controllerRef) {
      if (await this.isControllerExtensionSupported()) {
        await this.createControllerCommand(controllerName, controllerRef);
        return;
      }
      try {
        await writeController({
          controllerName
        });
        const service = await this.rta.getService('controllerExtension');
        const change = await service.add(controllerRef.codeRef, controllerRef.viewId);
        change.creation = new Date().toISOString();
        await writeChange(change);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_CREATE_CONTROLLER_EXTENSION_TITLE'
          },
          description: {
            key: 'ADP_CREATE_CONTROLLER_EXTENSION_DESCRIPTION',
            params: [controllerName]
          },
          type: MessageBarType.info
        });
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_CONTROLLER_ERROR_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        // We want to update the model incase we have already created a controller file but failed when creating a change file,
        // so when the user types the same controller name again he does not get 409 from the server, instead an error is shown in the UI
        await this.getControllers();
        throw error;
      }
    },
    /**
     * Creates a controller command and executes it.
     *
     * @param controllerName Controller name
     * @param controllerRef Controller reference
     */
    createControllerCommand: async function _createControllerCommand(controllerName, controllerRef) {
      const flexSettings = this.rta.getFlexSettings();
      const commandExecutor = new CommandExecutor(this.rta);
      const view = getControlById(controllerRef.viewId);
      const command = await commandExecutor.getCommand(view, 'codeExt', controllerRef, flexSettings);
      await commandExecutor.pushAndExecuteCommand(command);
      await sendInfoCenterMessage({
        title: {
          key: 'ADP_CREATE_CONTROLLER_EXTENSION_TITLE'
        },
        description: {
          key: 'ADP_CREATE_CONTROLLER_EXTENSION',
          params: [controllerName]
        },
        type: MessageBarType.info
      });
    },
    isControllerExtensionSupported: async function _isControllerExtensionSupported() {
      const ui5Version = await getUi5Version();
      return !isLowerThanMinimalUi5Version(ui5Version, ControllerExtension.CONTROLLER_EXT_MIN_UI5_VERSION);
    }
  });
  /* The minimum version of UI5 framework which supports controller extensions. */
  ControllerExtension.CONTROLLER_EXT_MIN_UI5_VERSION = {
    major: 1,
    minor: 135
  };
  return ControllerExtension;
});
//# sourceMappingURL=ControllerExtension.controller.js.map