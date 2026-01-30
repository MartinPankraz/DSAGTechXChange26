"use strict";

sap.ui.define(["../table-quick-action-base", "../../../cpe/quick-actions/utils", "../../../utils/fe-v4", "../../../utils/version", "../control-types"], function (___table_quick_action_base, _____cpe_quick_actions_utils, _____utils_fe_v4, _____utils_version, ___control_types) {
  "use strict";

  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const createManifestPropertyChange = _____utils_fe_v4["createManifestPropertyChange"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const MDC_TABLE_TYPE = ___control_types["MDC_TABLE_TYPE"];
  const ENABLE_TABLE_FILTERING = 'enable-table-filtering';
  /**
   * Quick Action for enabling table filtering using table personalization settings.
   */
  class EnableTableFilteringQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_TABLE_FILTERING, [MDC_TABLE_TYPE], 'QUICK_ACTION_ENABLE_TABLE_FILTERING', context);
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
      const tooltipText = this.context.resourceBundle.getText('TABLE_FILTERING_CHANGE_HAS_ALREADY_BEEN_MADE');
      for (const smartTable of getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, [MDC_TABLE_TYPE])) {
        const personalizationData = smartTable.getP13nMode();
        const value = this.context.changeService.getConfigurationPropertyValue(smartTable.getId(), 'personalization');
        const isFilterEnabled = value?.filter === undefined ? personalizationData.includes('Filter') : value.filter;
        const path = this.children.length.toString();
        this.children.push({
          path,
          label: `'${smartTable.getHeader()}' table`,
          enabled: !isFilterEnabled,
          tooltip: isFilterEnabled ? tooltipText : undefined,
          children: []
        });
        this.tableMap[path] = {
          table: smartTable,
          tableUpdateEventAttachedOnce: false
        };
      }
      if (this.children.length > 0) {
        this.isApplicable = true;
      }
    }
    async execute(path) {
      const {
        flexSettings
      } = this.context;
      const {
        table
      } = this.tableMap[path];
      if (!table) {
        return [];
      }
      const propertyChange = {
        personalization: {
          sort: true,
          column: true,
          filter: true,
          group: true,
          aggregate: true
        }
      };
      const command = await createManifestPropertyChange(table, flexSettings, propertyChange);
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
  __exports.ENABLE_TABLE_FILTERING = ENABLE_TABLE_FILTERING;
  __exports.EnableTableFilteringQuickAction = EnableTableFilteringQuickAction;
  return __exports;
});
//# sourceMappingURL=lr-enable-table-filtering.js.map