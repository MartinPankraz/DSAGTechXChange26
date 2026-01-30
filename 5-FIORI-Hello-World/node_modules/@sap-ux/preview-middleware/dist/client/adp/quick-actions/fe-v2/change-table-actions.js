"use strict";

sap.ui.define(["../../../utils/core", "../table-quick-action-base", "../control-types", "../dialog-enablement-validator"], function (_____utils_core, ___table_quick_action_base, ___control_types, ___dialog_enablement_validator) {
  "use strict";

  const getControlById = _____utils_core["getControlById"];
  const TableQuickActionDefinitionBase = ___table_quick_action_base["TableQuickActionDefinitionBase"];
  const SMART_TABLE_TYPE = ___control_types["SMART_TABLE_TYPE"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const CHANGE_TABLE_ACTIONS = 'change-table-actions';
  const CONTROL_TYPES = [SMART_TABLE_TYPE];
  class ChangeTableActionsQuickAction extends TableQuickActionDefinitionBase {
    constructor(context) {
      super(CHANGE_TABLE_ACTIONS, CONTROL_TYPES, 'V2_QUICK_ACTION_CHANGE_TABLE_ACTIONS', context, {
        includeServiceAction: true
      }, [DIALOG_ENABLEMENT_VALIDATOR]);
    }
    async initialize() {
      const processChild = (child, mapKey) => {
        const tableAction = this.tableMap[mapKey]?.changeToolbarContentAction;
        child.enabled = !!tableAction?.enabled;
        child.tooltip = child.enabled ? undefined : this.context.resourceBundle.getText('TABLE_HEADER_TOOLBAR_NOT_CHANGEABLE');
        child.children.forEach((nestedChild, idx) => processChild(nestedChild, `${mapKey}/${idx}`));
      };
      await super.initialize();

      // disable nested actions based on conditions
      this.children.forEach((nestedChild, idx) => processChild(nestedChild, `${idx}`));
    }
    async execute(path) {
      const {
        table,
        iconTabBarFilterKey,
        changeToolbarContentAction,
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
      if (changeToolbarContentAction) {
        await this.context.actionService.execute(table.getId(), changeToolbarContentAction.id);
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