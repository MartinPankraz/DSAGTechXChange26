"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../../utils/core", "../../dialog-factory", "../table-quick-action-base", "../dialog-enablement-validator", "../control-types"], function (OverlayRegistry, _____utils_core, ____dialog_factory, ___table_quick_action_base, ___dialog_enablement_validator, ___control_types) {
  "use strict";

  const getControlById = _____utils_core["getControlById"];
  const isA = _____utils_core["isA"];
  const DialogFactory = ____dialog_factory["DialogFactory"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const GRID_TABLE_TYPE = ___control_types["GRID_TABLE_TYPE"];
  const M_TABLE_TYPE = ___control_types["M_TABLE_TYPE"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const TREE_TABLE_TYPE = ___control_types["TREE_TABLE_TYPE"];
  const CREATE_TABLE_ACTION = 'create-table-action';
  // maintain order if action id

  const CONTROL_TYPES = [SMART_TABLE_TYPE, M_TABLE_TYPE, TREE_TABLE_TYPE, GRID_TABLE_TYPE];
  class AddTableActionQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(CREATE_TABLE_ACTION, CONTROL_TYPES, 'QUICK_ACTION_ADD_CUSTOM_TABLE_ACTION', context, undefined, [DIALOG_ENABLEMENT_VALIDATOR]);
    }
    async initialize() {
      const processChild = (child, mapKey) => {
        const table = this.tableMap[mapKey]?.table;
        if (table) {
          const headerToolbar = this.getHeaderToolbar(table);
          if (!headerToolbar) {
            child.enabled = false;
            child.tooltip = this.context.resourceBundle.getText('NO_TABLE_HEADER_TOOLBAR');
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
        iconTabBarFilterKey,
        sectionInfo
      } = this.tableMap[path];
      if (!table) {
        return [];
      }
      if (sectionInfo) {
        const {
          layout,
          section,
          subSection
        } = sectionInfo;
        layout?.setSelectedSection(section);
        section.setSelectedSubSection(subSection);
        this.selectOverlay(table);
      } else {
        getControlById(table.getId())?.getDomRef()?.scrollIntoView();
        this.selectOverlay(table);
      }
      if (this.iconTabBar && iconTabBarFilterKey) {
        this.iconTabBar.setSelectedKey(iconTabBarFilterKey);
      }
      const headerToolbar = this.getHeaderToolbar(table);

      // open dialogBox to add, and content is selected ByDefault
      if (headerToolbar) {
        const overlay = OverlayRegistry.getOverlay(headerToolbar) || [];
        await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_FRAGMENT, undefined, {
          aggregation: 'content',
          title: 'QUICK_ACTION_ADD_CUSTOM_TABLE_ACTION',
          defaultAggregationArrayIndex: 1
        }, {
          actionName: this.type,
          telemetryEventIdentifier: this.getTelemetryIdentifier()
        });
      }
      return [];
    }
    getHeaderToolbar(table) {
      let headerToolbar;
      if (isA(SMART_TABLE_TYPE, table)) {
        for (const item of table.getAggregation('items')) {
          if (item.getAggregation('headerToolbar')) {
            headerToolbar = item.getAggregation('headerToolbar');
            break;
          }
          if (isA('sap.m.OverflowToolbar', item)) {
            headerToolbar = item;
            break;
          }
        }
        if (!headerToolbar) {
          headerToolbar = table.getToolbar();
        }
      } else if (isA(M_TABLE_TYPE, table)) {
        headerToolbar = table.getAggregation('headerToolbar');
      }
      return headerToolbar;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.CREATE_TABLE_ACTION = CREATE_TABLE_ACTION;
  __exports.AddTableActionQuickAction = AddTableActionQuickAction;
  return __exports;
});
//# sourceMappingURL=create-table-action.js.map