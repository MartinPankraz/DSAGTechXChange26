"use strict";

sap.ui.define(["sap/ui/dt/OverlayRegistry", "../../../utils/core", "../../dialog-factory", "../control-types", "../table-quick-action-base", "../dialog-enablement-validator", "open/ux/preview/client/thirdparty/@sap-ux-private/control-property-editor-common", "../../../utils/info-center-message"], function (OverlayRegistry, _____utils_core, ____dialog_factory, ___control_types, ___table_quick_action_base, ___dialog_enablement_validator, ___sap_ux_private_control_property_editor_common, _____utils_info_center_message) {
  "use strict";

  const getControlById = _____utils_core["getControlById"];
  const isA = _____utils_core["isA"];
  const DialogNames = ____dialog_factory["DialogNames"];
  const DialogFactory = ____dialog_factory["DialogFactory"];
  const ANALYTICAL_TABLE_TYPE = ___control_types["ANALYTICAL_TABLE_TYPE"];
  const GRID_TABLE_TYPE = ___control_types["GRID_TABLE_TYPE"];
  const M_TABLE_TYPE = ___control_types["M_TABLE_TYPE"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const TREE_TABLE_TYPE = ___control_types["TREE_TABLE_TYPE"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const MessageBarType = ___sap_ux_private_control_property_editor_common["MessageBarType"];
  const sendInfoCenterMessage = _____utils_info_center_message["sendInfoCenterMessage"];
  const CREATE_TABLE_CUSTOM_COLUMN = 'create-table-custom-column';
  const CONTROL_TYPES = [SMART_TABLE_TYPE, M_TABLE_TYPE, TREE_TABLE_TYPE, GRID_TABLE_TYPE];

  /**
   * Reusable function which performs some preparation steps before table action execution
   *
   * @param table - table element
   * @param sectionInfo - section data
   * @param iconTabBar - icon tab bar element
   * @param iconTabBarFilterKey - tab bar key to select a tab
   */
  function preprocessActionExecution(table, sectionInfo, iconTabBar, iconTabBarFilterKey) {
    if (sectionInfo) {
      const {
        layout,
        section,
        subSection
      } = sectionInfo;
      layout?.setSelectedSection(section);
      section.setSelectedSubSection(subSection);
    } else {
      getControlById(table.getId())?.getDomRef()?.scrollIntoView();
    }
    if (iconTabBar && iconTabBarFilterKey) {
      iconTabBar.setSelectedKey(iconTabBarFilterKey);
    }
  }
  class AddTableCustomColumnQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(CREATE_TABLE_CUSTOM_COLUMN, CONTROL_TYPES, 'QUICK_ACTION_ADD_CUSTOM_TABLE_COLUMN', context, {
        areTableRowsRequired: true
      }, [DIALOG_ENABLEMENT_VALIDATOR]);
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
      preprocessActionExecution(table, sectionInfo, this.iconTabBar, iconTabBarFilterKey);
      this.selectOverlay(table);
      let tableInternal = table;
      if (isA(SMART_TABLE_TYPE, table)) {
        const itemsAggregation = table.getAggregation('items');
        tableInternal = itemsAggregation.find(item => {
          return [M_TABLE_TYPE, TREE_TABLE_TYPE, ANALYTICAL_TABLE_TYPE, GRID_TABLE_TYPE].some(tType => isA(tType, item));
        });
        if (!tableInternal) {
          return [];
        }
      }
      const overlay = OverlayRegistry.getOverlay(tableInternal) || [];
      if (!overlay) {
        return [];
      }
      if (isA(M_TABLE_TYPE, tableInternal) && tableInternal.getAggregation('items').length === 0) {
        await sendInfoCenterMessage({
          title: {
            key: 'ADP_CREATE_XML_FRAGMENT_TITLE'
          },
          description: {
            key: 'TABLE_ROWS_NEEDED_TO_CREATE_CUSTOM_COLUMN'
          },
          type: MessageBarType.error
        });
        return [];
      }
      const dialog = [TREE_TABLE_TYPE, ANALYTICAL_TABLE_TYPE, GRID_TABLE_TYPE].some(type => isA(type, tableInternal)) ? DialogNames.ADD_FRAGMENT : DialogNames.ADD_TABLE_COLUMN_FRAGMENTS;
      await DialogFactory.createDialog(overlay, this.context.rta, dialog, undefined, {
        aggregation: 'columns',
        title: 'QUICK_ACTION_ADD_CUSTOM_TABLE_COLUMN'
      }, {
        actionName: this.type,
        telemetryEventIdentifier: this.getTelemetryIdentifier()
      });
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.CREATE_TABLE_CUSTOM_COLUMN = CREATE_TABLE_CUSTOM_COLUMN;
  __exports.preprocessActionExecution = preprocessActionExecution;
  __exports.AddTableCustomColumnQuickAction = AddTableCustomColumnQuickAction;
  return __exports;
});
//# sourceMappingURL=create-table-custom-column.js.map