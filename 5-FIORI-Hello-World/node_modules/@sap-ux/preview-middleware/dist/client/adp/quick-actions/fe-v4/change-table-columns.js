"use strict";

sap.ui.define(["sap/ui/dt/OverlayUtil", "sap/ui/fl/apply/api/FlexRuntimeInfoAPI", "../../../utils/core", "../table-quick-action-base", "../control-types", "../dialog-enablement-validator", "../../../cpe/quick-actions/utils"], function (OverlayUtil, FlexRuntimeInfoAPI, _____utils_core, ___table_quick_action_base, ___control_types, ___dialog_enablement_validator, _____cpe_quick_actions_utils) {
  "use strict";

  const getControlById = _____utils_core["getControlById"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const MDC_TABLE_TYPE = ___control_types["MDC_TABLE_TYPE"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const CHANGE_TABLE_COLUMNS = 'change-table-columns';
  const ACTION_ID = 'CTX_SETTINGS0';

  /**
   * Quick Action for changing table columns.
   */
  class ChangeTableColumnsQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(CHANGE_TABLE_COLUMNS, [MDC_TABLE_TYPE], 'V4_QUICK_ACTION_CHANGE_TABLE_COLUMNS', context, undefined, [DIALOG_ENABLEMENT_VALIDATOR]);
    }
    async initialize() {
      for (const smartTable of getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, this.controlTypes)) {
        const hasVariantManagement = FlexRuntimeInfoAPI.hasVariantManagement({
          element: smartTable
        });
        const path = this.children.length.toString();
        const tableHeader = smartTable.getHeader() || 'Unnamed';
        const tableLabel = `'${tableHeader}' table`;
        if (!hasVariantManagement) {
          this.children.push({
            path,
            label: tableLabel,
            enabled: false,
            tooltip: this.context.resourceBundle.getText('TABLE_ACTION_DISABLED_VARIANT_MANAGEMENT_NOT_AVAILABLE'),
            children: []
          });
          this.tableMap[path] = {
            table: smartTable,
            tableUpdateEventAttachedOnce: false
          };
          continue;
        }
        const actions = await this.context.actionService.get(smartTable.getId());
        const changeColumnAction = actions.find(action => action.id === ACTION_ID);
        if (changeColumnAction) {
          this.children.push({
            path,
            label: tableLabel,
            enabled: true,
            children: []
          });
          this.tableMap[path] = {
            table: smartTable,
            tableUpdateEventAttachedOnce: false
          };
        }
      }
      if (this.children.length > 0) {
        this.isApplicable = true;
      }
    }
    async execute(path) {
      const {
        table
      } = this.tableMap[path];
      if (!table) {
        return [];
      }
      const tableControl = getControlById(table.getId());
      const controlOverlay = OverlayUtil.getClosestOverlayFor(tableControl);
      if (controlOverlay) {
        controlOverlay.setSelected(true);
      }
      const hasVariantManagement = FlexRuntimeInfoAPI.hasVariantManagement({
        element: table
      });
      if (hasVariantManagement) {
        await this.context.actionService.execute(table.getId(), ACTION_ID);
      }
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.CHANGE_TABLE_COLUMNS = CHANGE_TABLE_COLUMNS;
  __exports.ChangeTableColumnsQuickAction = ChangeTableColumnsQuickAction;
  return __exports;
});
//# sourceMappingURL=change-table-columns.js.map