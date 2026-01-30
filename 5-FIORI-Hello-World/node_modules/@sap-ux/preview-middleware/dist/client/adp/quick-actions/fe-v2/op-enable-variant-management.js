"use strict";

sap.ui.define(["../table-quick-action-base", "../control-types", "./utils", "./create-table-custom-column"], function (___table_quick_action_base, ___control_types, ___utils, ___create_table_custom_column) {
  "use strict";

  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const prepareManifestChange = ___utils["prepareManifestChange"];
  const preprocessActionExecution = ___create_table_custom_column["preprocessActionExecution"];
  const ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = 'enable-variant-management-in-tables-charts';
  const CONTROL_TYPES = [SMART_TABLE_TYPE];
  const OBJECT_PAGE_COMPONENT_NAME = 'sap.suite.ui.generic.template.ObjectPage';
  class EnableObjectPageVariantManagementQuickAction extends TableQuickActionDefinitionBase {
    forceRefreshAfterExecution = true;
    constructor(context) {
      super(ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLES_AND_VARIANT_MANAGEMENT', context);
    }
    async initialize() {
      if (!(await areManifestChangesSupported(this.context.manifest))) {
        this.isApplicable = false;
        return;
      }
      await super.initialize();
      const processChild = (child, mapKey) => {
        const alreadyEnabledTooltip = this.context.resourceBundle.getText('VARIANT_MANAGEMENT_FOR_TABLE_CONTROLS_IS_ALREADY_ENABLED', [child.label]);
        const vmSetupNotSupported = this.context.resourceBundle.getText('VARIANT_MANAGEMENT_FOR_CUSTOM_TABLES_NOT_SUPPORTED', [child.label]);
        const table = this.tableMap[mapKey]?.table;
        if (table) {
          const id = table.getId();
          if (typeof id !== 'string') {
            throw new Error('Could not retrieve configuration property because control id is not valid!');
          }
          let value = this.context.changeService.getConfigurationPropertyValue(id, 'variantManagement');
          if (value === undefined) {
            value = !!table.getVariantManagement();
          }
          const sectionId = table.data('sectionId');
          let tooltip;
          if (!sectionId) {
            tooltip = vmSetupNotSupported;
          } else if (value) {
            tooltip = alreadyEnabledTooltip;
          }
          if (value || !sectionId) {
            child.enabled = false;
            child.tooltip = tooltip;
          }
        }
        child.children.forEach((nestedChild, idx) => processChild(nestedChild, `${mapKey}/${idx.toFixed(0)}`));
      };
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
      const entitySet = this.context.view.getParent()?.getProperty('entitySet');
      if (!entitySet) {
        throw Error('Internal error. Object Page entity set not found');
      }
      const sectionId = table.data('sectionId');
      if (!sectionId) {
        throw Error('Internal error. Table sectionId property not found');
      }
      preprocessActionExecution(table, sectionInfo, this.iconTabBar, iconTabBarFilterKey);
      this.selectOverlay(table);
      const commands = await prepareManifestChange(this.context, `component/settings/sections/${sectionId}/tableSettings`, table, OBJECT_PAGE_COMPONENT_NAME, entitySet, {
        'variantManagement': true
      });
      return commands ?? [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS;
  __exports.EnableObjectPageVariantManagementQuickAction = EnableObjectPageVariantManagementQuickAction;
  return __exports;
});
//# sourceMappingURL=op-enable-variant-management.js.map