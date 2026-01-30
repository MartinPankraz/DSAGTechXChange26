"use strict";

sap.ui.define(["../../../cpe/quick-actions/utils", "../control-types", "./utils", "../simple-quick-action-base", "../../../utils/core"], function (_____cpe_quick_actions_utils, ___control_types, ___utils, ___simple_quick_action_base, _____utils_core) {
  "use strict";

  const getRelevantControlFromActivePage = _____cpe_quick_actions_utils["getRelevantControlFromActivePage"];
  const pageHasControlId = _____cpe_quick_actions_utils["pageHasControlId"];
  const GRID_TABLE_TYPE = ___control_types["GRID_TABLE_TYPE"];
  const M_TABLE_TYPE = ___control_types["M_TABLE_TYPE"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const TREE_TABLE_TYPE = ___control_types["TREE_TABLE_TYPE"];
  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const prepareManifestChange = ___utils["prepareManifestChange"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const isA = _____utils_core["isA"];
  const COMPONENT = 'sap.suite.ui.generic.template.ListReport';
  const ENABLE_TABLE_FILTERING = 'enable-table-filtering';
  const CONTROL_TYPES = [SMART_TABLE_TYPE, M_TABLE_TYPE, TREE_TABLE_TYPE, GRID_TABLE_TYPE];

  /**
   * Quick Action for enabling table filtering using table personalization settings.
   */
  class EnableTableFilteringQuickAction extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ENABLE_TABLE_FILTERING, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLE_FILTERING', context, [{
        run: () => {
          if (this.control) {
            const id = this.control.getProperty('persistencyKey') ?? this.control.getId();
            if (typeof id !== 'string') {
              throw new Error('Could not retrieve configuration property because control id is not valid!');
            }
            const value = this.context.changeService.getConfigurationPropertyValue(id, 'enableTableFilterInPageVariant');
            const isFilterEnabled = value === undefined ? this.control.data('p13nDialogSettings')?.filter?.visible : value;
            if (isFilterEnabled) {
              return {
                type: 'error',
                message: this.context.resourceBundle.getText('TABLE_FILTERING_CHANGE_HAS_ALREADY_BEEN_MADE')
              };
            }
          }
          return undefined;
        }
      }]);
    }
    forceRefreshAfterExecution = true;
    async initialize() {
      const manifestChangesSupported = await areManifestChangesSupported(this.context.manifest);
      if (!manifestChangesSupported) {
        return;
      }
      for (const table of getRelevantControlFromActivePage(this.context.controlIndex, this.context.view, CONTROL_TYPES)) {
        if (table) {
          const isActionApplicable = pageHasControlId(this.context.view, table.getId());
          if (isActionApplicable) {
            this.control = table;
            break;
          }
        }
      }
    }
    async execute() {
      if (!this.control) {
        return [];
      }
      const entitySet = isA(SMART_TABLE_TYPE, this.control) ? this.control.getEntitySet() : undefined;
      const command = await prepareManifestChange(this.context, 'component/settings', this.control, COMPONENT, entitySet, {
        enableTableFilterInPageVariant: !this.isDisabled
      });
      return command;
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