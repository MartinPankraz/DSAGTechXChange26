"use strict";

sap.ui.define(["../../../utils/fe-v4", "../../../utils/version", "../control-types", "../table-quick-action-base", "../../../utils/core", "../common/utils", "../fe-v2/create-table-custom-column"], function (_____utils_fe_v4, _____utils_version, ___control_types, ___table_quick_action_base, _____utils_core, ___common_utils, ___fe_v2_create_table_custom_column) {
  "use strict";

  const createManifestPropertyChange = _____utils_fe_v4["createManifestPropertyChange"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const ANALYTICAL_TABLE_TYPE = ___control_types["ANALYTICAL_TABLE_TYPE"];
  const GRID_TABLE_TYPE = ___control_types["GRID_TABLE_TYPE"];
  const MDC_TABLE_TYPE = ___control_types["MDC_TABLE_TYPE"];
  const TREE_TABLE_TYPE = ___control_types["TREE_TABLE_TYPE"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const isA = _____utils_core["isA"];
  const getTooltipsForTableEmptyRowModeAction = ___common_utils["getTooltipsForTableEmptyRowModeAction"];
  const preprocessActionExecution = ___fe_v2_create_table_custom_column["preprocessActionExecution"];
  const ENABLE_TABLE_EMPTY_ROW_MODE = 'enable-table-empty-row-mode';
  const CONTROL_TYPES = [MDC_TABLE_TYPE, GRID_TABLE_TYPE, ANALYTICAL_TABLE_TYPE, TREE_TABLE_TYPE];
  const UNSUPPORTED_TABLES = [ANALYTICAL_TABLE_TYPE, TREE_TABLE_TYPE];
  const INLINE_CREATION_ROWS_MODE = 'InlineCreationRows';
  /**
   * Quick Action for enabling table filtering using table personalization settings.
   */
  class EnableTableEmptyRowModeQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_TABLE_EMPTY_ROW_MODE, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLE_EMPTY_ROW_MODE', context);
    }
    forceRefreshAfterExecution = true;
    async initialize() {
      const version = await getUi5Version();
      if (isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 131
      })) {
        this.isApplicable = false;
        return;
      }
      const {
        alreadyEnabledTooltip,
        unsupportedCreationRowsTooltip
      } = getTooltipsForTableEmptyRowModeAction(this.context.resourceBundle);
      const processChild = (child, mapKey) => {
        const table = this.tableMap[mapKey]?.table;
        if (table) {
          if (UNSUPPORTED_TABLES.some(t => isA(t, table))) {
            child.enabled = false;
            child.tooltip = unsupportedCreationRowsTooltip;
          } else if (table.data('creationMode') === INLINE_CREATION_ROWS_MODE) {
            child.enabled = false;
            child.tooltip = alreadyEnabledTooltip;
          }
        }
        child.children.forEach((nestedChild, idx) => processChild(nestedChild, `${mapKey}/${idx.toFixed(0)}`));
      };
      await super.initialize();

      // disable nested actions based on conditions
      this.children.forEach((nestedChild, idx) => processChild(nestedChild, `${idx.toFixed(0)}`));
    }
    async execute(path) {
      const {
        flexSettings
      } = this.context;
      const {
        table,
        sectionInfo,
        iconTabBarFilterKey
      } = this.tableMap[path];
      if (!table) {
        return [];
      }
      preprocessActionExecution(table, sectionInfo, this.iconTabBar, iconTabBarFilterKey);
      this.selectOverlay(table);
      const command = await createManifestPropertyChange(table, flexSettings, {
        name: INLINE_CREATION_ROWS_MODE
      }, ['creationMode']);
      if (command) {
        return [command];
      } else {
        return [];
      }
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_TABLE_EMPTY_ROW_MODE = ENABLE_TABLE_EMPTY_ROW_MODE;
  __exports.EnableTableEmptyRowModeQuickAction = EnableTableEmptyRowModeQuickAction;
  return __exports;
});
//# sourceMappingURL=op-enable-empty-row-mode.js.map