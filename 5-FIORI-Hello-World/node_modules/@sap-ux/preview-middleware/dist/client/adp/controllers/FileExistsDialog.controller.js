"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "./BaseDialog.controller", "../../i18n"], function (JSONModel, __BaseDialog, ____i18n) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseDialog = _interopRequireDefault(__BaseDialog);
  const getResourceModel = ____i18n["getResourceModel"];
  /**
   * @namespace open.ux.preview.client.adp.controllers
   */
  const FileExistsDialog = BaseDialog.extend("open.ux.preview.client.adp.controllers.FileExistsDialog", {
    constructor: function _constructor(name, options) {
      BaseDialog.prototype.constructor.call(this, name);
      this.model = new JSONModel();
      this.options = options;
    },
    /**
     * Setups the Dialog and the JSON Model
     *
     * @param {Dialog} dialog - Dialog instance
     */
    setup: async function _setup(dialog) {
      this.dialog = dialog;
      this.setEscapeHandler();
      this.model.setProperty('/filePath', this.options.filePath);
      this.model.setProperty('/filePathFromRoot', this.options.fileName);
      this.model.setProperty('/isRunningInBAS', this.options.isRunningInBAS);
      this.buildDialogData();
      const resourceModel = await getResourceModel();
      this.dialog.setModel(this.model);
      this.dialog.setModel(resourceModel, 'i18n');
      this.dialog.open();
    },
    /**
     * Handles create button press
     *
     * @param _event Event
     */
    onShowFileInVscodeBtn: function _onShowFileInVscodeBtn(_event) {
      const annotationPath = this.model.getProperty('/filePath');
      window.open(`vscode://file${annotationPath}`);
      this.handleDialogClose();
    },
    /**
     * Builds data that is used in the dialog.
     */
    buildDialogData: function _buildDialogData() {
      const content = this.dialog.getContent();
      const messageForm = content[0];
      messageForm.setVisible(true);
      const isRunningInBAS = this.model.getProperty('/isRunningInBAS');
      if (isRunningInBAS) {
        this.dialog.getBeginButton().setVisible(false);
      }
    },
    /**
     * Handles create button press
     *
     * @param _event Event
     */
    onCreateBtnPress: function _onCreateBtnPress(_event) {}
  });
  return FileExistsDialog;
});
//# sourceMappingURL=FileExistsDialog.controller.js.map