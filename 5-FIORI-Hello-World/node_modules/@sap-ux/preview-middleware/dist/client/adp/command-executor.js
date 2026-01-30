"use strict";

sap.ui.define(["open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "sap/ui/rta/command/CommandFactory", "../utils/error", "../utils/info-center-message"], function (___sap_ux_private_control_property_editor_common, CommandFactory, ___utils_error, ___utils_info_center_message) {
  "use strict";

  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const getError = ___utils_error["getError"];
  const sendInfoCenterMessage = ___utils_info_center_message["sendInfoCenterMessage"];
  /**
   * Class responsible for handling rta calls
   */
  class CommandExecutor {
    /**
     *
     * @param rta Runtime Authoring
     */
    constructor(rta) {
      this.rta = rta;
    }

    /**
     * Generates command based on given values
     *
     * @param runtimeControl Managed object
     * @param commandName Command name
     * @param modifiedValue Modified value/s
     * @param flexSettings Additional flex settings
     * @param designMetadata Design time metadata
     */
    async getCommand(runtimeControl, commandName, modifiedValue, flexSettings, designMetadata) {
      try {
        return await CommandFactory.getCommandFor(runtimeControl, commandName, modifiedValue, designMetadata, flexSettings);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_GET_COMMAND_FAILURE_TITLE'
          },
          description: {
            key: 'ADP_GET_COMMAND_FAILURE_DESCRIPTION',
            params: [commandName, error.message]
          },
          type: MessageBarType.error
        });
        error.message = `Could not get command for '${commandName}'. ${error.message}`;
        throw error;
      }
    }

    /**
     * Creates composite command without nested commands
     *
     * @param runtimeControl Managed object
     */
    async createCompositeCommand(runtimeControl) {
      try {
        return await CommandFactory.getCommandFor(runtimeControl, 'composite');
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_GET_COMMAND_FAILURE_TITLE'
          },
          description: {
            key: 'ADP_GET_COMPOSITE_COMMAND_FAILURE_DESCRIPTION',
            params: [error.message]
          },
          type: MessageBarType.error
        });
        throw error;
      }
    }

    /**
     * Pushed and executes the provided command
     *
     * @param command Command
     */
    async pushAndExecuteCommand(command) {
      try {
        /**
         * The change will have pending state and will only be saved to the workspace when the user clicks save icon
         */
        await this.rta.getCommandStack().pushAndExecute(command);
      } catch (e) {
        const error = getError(e);
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_RUN_COMMAND_FAILED_TITLE'
          },
          description: error.message,
          type: MessageBarType.error
        });
        throw error;
      }
    }
  }
  return CommandExecutor;
});
//# sourceMappingURL=command-executor.js.map