"use strict";

sap.ui.define(["sap/ui/dt/OverlayUtil", "../../../utils/core", "../table-quick-action-base", "../control-types", "../../../cpe/quick-actions/utils", "../fe-v2/create-table-custom-column", "../dialog-enablement-validator"], function (OverlayUtil, _____utils_core, ___table_quick_action_base, ___control_types, _____cpe_quick_actions_utils, ___fe_v2_create_table_custom_column, ___dialog_enablement_validator) {
  "use strict";

  const getControlById = _____utils_core["getControlById"];
  const findNestedElements = _____utils_core["findNestedElements"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const MDC_ACTION_TOOLBAR_TYPE = ___control_types["MDC_ACTION_TOOLBAR_TYPE"];
  const MDC_TABLE_TYPE = ___control_types["MDC_TABLE_TYPE"];
  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const preprocessActionExecution = ___fe_v2_create_table_custom_column["preprocessActionExecution"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const CHANGE_TABLE_ACTIONS = 'change-table-actions';
  const ACTION_ID = 'CTX_SETTINGS';

  /**
   * Quick Action for changing table columns.
   */
  class ChangeTableActionsQuickAction extends TableQuickActionDefinitionBase {
    toolbarsMap = {};
    constructor(context) {
      super(CHANGE_TABLE_ACTIONS, [MDC_TABLE_TYPE], 'V4_QUICK_ACTION_CHANGE_TABLE_ACTIONS', context, undefined, [DIALOG_ENABLEMENT_VALIDATOR]);
    }
    async initialize() {
      const toolbars = getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, [MDC_ACTION_TOOLBAR_TYPE]);
      const processChild = async (child, mapKey) => {
        const mapEntry = this.tableMap[mapKey];
        if (mapEntry) {
          const tableToolbar = findNestedElements(mapEntry.table, toolbars)[0];
          this.toolbarsMap[mapKey] = tableToolbar;
          const actions = tableToolbar ? await this.context.actionService.get(tableToolbar.getId()) : [];
          const changeToolbarContentAction = actions.find(action => action.id === ACTION_ID);
          child.enabled = !!changeToolbarContentAction?.enabled;
          let tooltip;
          if (!tableToolbar) {
            tooltip = this.context.resourceBundle.getText('TABLE_HEADER_TOOLBAR_NOT_AVAILABLE');
          } else if (!child.enabled) {
            tooltip = this.context.resourceBundle.getText('TABLE_HEADER_TOOLBAR_NOT_CHANGEABLE');
          }
          child.tooltip = tooltip ?? child.tooltip;
        }
        for (let idx = 0; idx < child.children.length; idx++) {
          await processChild(child.children[idx], `${mapKey}/${idx}`);
        }
      };
      await super.initialize();

      // disable nested actions based on conditions
      for (let idx = 0; idx < this.children.length; idx++) {
        await processChild(this.children[idx], `${idx}`);
      }
    }
    async execute(path) {
      const {
        table,
        sectionInfo,
        iconTabBarFilterKey
      } = this.tableMap[path];
      const toolbar = this.toolbarsMap[path];
      if (!table || !toolbar) {
        return [];
      }
      preprocessActionExecution(table, sectionInfo, this.iconTabBar, iconTabBarFilterKey);
      const toolbarControl = getControlById(toolbar.getId());
      const controlOverlay = OverlayUtil.getClosestOverlayFor(toolbarControl);
      if (controlOverlay) {
        controlOverlay.setSelected(true);
        await this.context.actionService.execute(toolbar.getId(), ACTION_ID);
      }
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.CHANGE_TABLE_ACTIONS = CHANGE_TABLE_ACTIONS;
  __exports.ChangeTableActionsQuickAction = ChangeTableActionsQuickAction;
  return __exports;
});
//# sourceMappingURL=change-table-actions.js.map