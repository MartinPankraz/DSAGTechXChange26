"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../utils/error", "../../utils/info-center-message", "../api-handler", "./BaseDialog.controller"], function (JSONModel, ___sap_ux_private_control_property_editor_common, ____utils_error, ____utils_info_center_message, ___api_handler, __BaseDialog) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const getError = ____utils_error["getError"];
  const sendInfoCenterMessage = ____utils_info_center_message["sendInfoCenterMessage"];
  const getFragments = ___api_handler["getFragments"];
  const BaseDialog = _interopRequireDefault(__BaseDialog);
  /**
   * @namespace open.ux.preview.client.adp.controllers
   */
  const ExtensionPoint = BaseDialog.extend("open.ux.preview.client.adp.controllers.ExtensionPoint", {
    constructor: function _constructor(name, _overlays, rta, data) {
      BaseDialog.prototype.constructor.call(this, name);
      this.model = new JSONModel();
      this.data = data;
      this.rta = rta;
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
      const fragmentName = this.model.getProperty('/newFragmentName');
      this.createExtensionPointFragmentChange(fragmentName);
      await sendInfoCenterMessage({
        title: {
          key: 'ADP_CREATE_XML_FRAGMENT_TITLE'
        },
        description: {
          key: 'ADP_CREATE_XML_FRAGMENT_DESCRIPTION',
          params: [fragmentName]
        },
        type: MessageBarType.info
      });
      this.handleDialogClose();
    },
    /**
     * Handler for extension point select control
     *
     * @param event Select control change event
     */
    onExtensionPointHandler: function _onExtensionPointHandler(event) {
      const source = event.getSource();
      const selectedItem = source.getSelectedItem();
      let extensionPointName = '';
      if (selectedItem) {
        extensionPointName = selectedItem.getText();
      }
      this.model.setProperty('/extensionPointName', extensionPointName);
      const hasDefaultContent = this.hasDefaultContentForName(extensionPointName);
      this.model.setProperty('/hasDefaultContent', hasDefaultContent);
    },
    /**
     * Determines whether there is default content associated with the given name.
     *
     * @param {string} name - The name to check for associated default content.
     * @returns {boolean} - True if there is non-empty default content associated with the name, false otherwise.
     */
    hasDefaultContentForName: function _hasDefaultContentForName(name) {
      const defaultContent = this.data?.info.find(v => v.name === name)?.defaultContent;
      return defaultContent ? defaultContent.length > 0 : false;
    },
    /**
     * Builds data that is used in the dialog
     */
    buildDialogData: async function _buildDialogData() {
      const name = this.data?.name;
      if (name) {
        const hasDefaultContent = this.hasDefaultContentForName(name);
        const extensionPointList = [{
          key: 0,
          value: name
        }];
        this.updateModel(name, 0, extensionPointList, false, hasDefaultContent);
      } else {
        // In this case we are selecting from the application. There can be many extension points under one control.
        const extensionPointList = this.data.info.map((v, idx) => {
          return {
            key: idx,
            value: v.name
          };
        });
        const firstElName = extensionPointList[0].value;
        const enabled = extensionPointList.length > 1;
        const hasDefaultContent = this.hasDefaultContentForName(firstElName);
        this.updateModel(firstElName, 0, extensionPointList, enabled, hasDefaultContent);
      }
      try {
        const {
          fragments
        } = await getFragments();
        this.model.setProperty('/fragmentList', fragments);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_EXTENSION_POINT_ERROR_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        throw error;
      }
    },
    /**
     * Updates the Select control according to provided values
     *
     * @param name Extension point name
     * @param key Selected extension point key
     * @param list All of the extension points that are under a view
     * @param enabled Enables the select control
     * @param hasDefaultContent Whether there is default content associated with the extension name
     */
    updateModel: function _updateModel(name, key, list, enabled, hasDefaultContent) {
      this.model.setProperty('/extensionPointName', name);
      this.model.setProperty('/extensionPointKey', key);
      this.model.setProperty('/extensionPointList', list);
      this.model.setProperty('/extensionListEnabled', enabled);
      this.model.setProperty('/hasDefaultContent', hasDefaultContent);
    },
    /**
     * Creates add xml at extension point changes
     *
     * @param fragmentName Fragment name
     */
    createExtensionPointFragmentChange: function _createExtensionPointFragmentChange(fragmentName) {
      const extensionPointName = this.model.getProperty('/extensionPointName');
      const modifiedValue = {
        fragment: `<core:FragmentDefinition xmlns:core='sap.ui.core'></core:FragmentDefinition>`,
        fragmentPath: `fragments/${fragmentName}.fragment.xml`,
        extensionPointName
      };
      this.data.deferred.resolve(modifiedValue);
    }
  });
  return ExtensionPoint;
});
//# sourceMappingURL=ExtensionPoint.controller.js.map