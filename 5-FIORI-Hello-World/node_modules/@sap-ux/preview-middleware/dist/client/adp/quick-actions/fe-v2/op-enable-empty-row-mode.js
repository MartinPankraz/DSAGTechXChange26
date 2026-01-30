"use strict";

sap.ui.define(["../table-quick-action-base", "../control-types", "./utils", "../../../utils/version", "../../../utils/core", "../common/utils", "./create-table-custom-column"], function (___table_quick_action_base, ___control_types, ___utils, _____utils_version, _____utils_core, ___common_utils, ___create_table_custom_column) {
  "use strict";

  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const ANALYTICAL_TABLE_TYPE = ___control_types["ANALYTICAL_TABLE_TYPE"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const TREE_TABLE_TYPE = ___control_types["TREE_TABLE_TYPE"];
  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const prepareManifestChange = ___utils["prepareManifestChange"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const isA = _____utils_core["isA"];
  const getTooltipsForTableEmptyRowModeAction = ___common_utils["getTooltipsForTableEmptyRowModeAction"];
  const preprocessActionExecution = ___create_table_custom_column["preprocessActionExecution"];
  const ENABLE_TABLE_EMPTY_ROW_MODE = 'enable-table-empty-row-mode';
  const CONTROL_TYPES = [SMART_TABLE_TYPE];
  const UNSUPPORTED_TABLES = [ANALYTICAL_TABLE_TYPE, TREE_TABLE_TYPE];
  const CREATION_ROWS_MODE = 'creationRows';
  const OBJECT_PAGE_COMPONENT_NAME = 'sap.suite.ui.generic.template.ObjectPage';
  class EnableTableEmptyRowModeQuickAction extends TableQuickActionDefinitionBase {
    forceRefreshAfterExecution = true;
    constructor(context) {
      super(ENABLE_TABLE_EMPTY_ROW_MODE, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLE_EMPTY_ROW_MODE', context);
    }
    async initialize() {
      const version = await getUi5Version();
      if (!(await areManifestChangesSupported(this.context.manifest))) {
        return;
      }
      if (isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 120,
        patch: 23
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
          const innerTable = this.getInternalTable(table);
          if (innerTable) {
            if (UNSUPPORTED_TABLES.some(t => isA(t, innerTable))) {
              child.enabled = false;
              child.tooltip = unsupportedCreationRowsTooltip;
            } else if (table.data('creationMode') === CREATION_ROWS_MODE) {
              child.enabled = false;
              child.tooltip = alreadyEnabledTooltip;
            }
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
        table,
        sectionInfo,
        iconTabBarFilterKey
      } = this.tableMap[path];
      if (!table) {
        throw Error('Internal error. Table element not found');
      }
      const sectionId = table.data('sectionId');
      if (!sectionId) {
        throw Error('Internal error. Table sectionId property not found');
      }
      const entitySet = this.context.view.getParent()?.getProperty('entitySet');
      if (!entitySet) {
        throw Error('Internal error. Object Page entity set not found');
      }
      preprocessActionExecution(table, sectionInfo, this.iconTabBar, iconTabBarFilterKey);
      this.selectOverlay(table);
      const commands = await prepareManifestChange(this.context, `component/settings/sections/${sectionId}/createMode`, table, OBJECT_PAGE_COMPONENT_NAME, entitySet, CREATION_ROWS_MODE);
      return commands ?? [];
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