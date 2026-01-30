"use strict";

sap.ui.define(["sap/ui/core/mvc/XMLView", "sap/ui/core/ComponentContainer", "../../../cpe/quick-actions/registry", "../common/add-controller-to-page", "./lr-toggle-clear-filter-bar", "./change-table-columns", "../common/op-add-header-field", "../common/op-add-custom-section", "../fe-v2/create-table-action", "./create-table-custom-column", "../common/create-page-action", "./lr-enable-table-filtering", "./lr-enable-semantic-date-range-filter-bar", "./op-enable-empty-row-mode", "../common/add-new-annotation-file", "./op-enable-variant-management", "./lr-enable-variant-management", "../fe-v2/add-new-subpage", "./change-table-actions"], function (XMLView, ComponentContainer, _____cpe_quick_actions_registry, ___common_add_controller_to_page, ___lr_toggle_clear_filter_bar, ___change_table_columns, ___common_op_add_header_field, ___common_op_add_custom_section, ___fe_v2_create_table_action, ___create_table_custom_column, ___common_create_page_action, ___lr_enable_table_filtering, ___lr_enable_semantic_date_range_filter_bar, ___op_enable_empty_row_mode, ___common_add_new_annotation_file, ___op_enable_variant_management, ___lr_enable_variant_management, ___fe_v2_add_new_subpage, ___change_table_actions) {
  "use strict";

  const QuickActionDefinitionRegistry = _____cpe_quick_actions_registry["QuickActionDefinitionRegistry"];
  const AddControllerToPageQuickAction = ___common_add_controller_to_page["AddControllerToPageQuickAction"];
  const ToggleClearFilterBarQuickAction = ___lr_toggle_clear_filter_bar["ToggleClearFilterBarQuickAction"];
  const ChangeTableColumnsQuickAction = ___change_table_columns["ChangeTableColumnsQuickAction"];
  const AddHeaderFieldQuickAction = ___common_op_add_header_field["AddHeaderFieldQuickAction"];
  const AddCustomSectionQuickAction = ___common_op_add_custom_section["AddCustomSectionQuickAction"];
  const AddTableActionQuickAction = ___fe_v2_create_table_action["AddTableActionQuickAction"];
  const AddTableCustomColumnQuickAction = ___create_table_custom_column["AddTableCustomColumnQuickAction"];
  const AddPageActionQuickAction = ___common_create_page_action["AddPageActionQuickAction"];
  const EnableTableFilteringQuickAction = ___lr_enable_table_filtering["EnableTableFilteringQuickAction"];
  const ToggleSemanticDateRangeFilterBar = ___lr_enable_semantic_date_range_filter_bar["ToggleSemanticDateRangeFilterBar"];
  const EnableTableEmptyRowModeQuickAction = ___op_enable_empty_row_mode["EnableTableEmptyRowModeQuickAction"];
  const AddNewAnnotationFile = ___common_add_new_annotation_file["AddNewAnnotationFile"];
  const EnableObjectPageVariantManagementQuickAction = ___op_enable_variant_management["EnableObjectPageVariantManagementQuickAction"];
  const EnableListReportVariantManagementQuickAction = ___lr_enable_variant_management["EnableListReportVariantManagementQuickAction"];
  const AddNewSubpage = ___fe_v2_add_new_subpage["AddNewSubpage"];
  const ChangeTableActionsQuickAction = ___change_table_actions["ChangeTableActionsQuickAction"];
  const OBJECT_PAGE_TYPE = 'sap.suite.ui.generic.template.ObjectPage.view.Details';
  const LIST_REPORT_TYPE = 'sap.suite.ui.generic.template.ListReport.view.ListReport';
  const ANALYTICAL_LIST_PAGE_TYPE = 'sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage';
  /**
   * Quick Action provider for SAP Fiori Elements V2 applications.
   */
  class FEV2QuickActionRegistry extends QuickActionDefinitionRegistry {
    PAGE_NAME_MAP = {
      [LIST_REPORT_TYPE]: 'listReport',
      [OBJECT_PAGE_TYPE]: 'objectPage',
      [ANALYTICAL_LIST_PAGE_TYPE]: 'analyticalListPage'
    };
    getDefinitions(context) {
      const activePages = this.getActivePageContent(context.controlIndex);
      const definitionGroups = [];
      for (let index = 0; index < activePages.length; index++) {
        const {
          name,
          view
        } = activePages[index];
        if (name === 'listReport') {
          definitionGroups.push({
            title: 'LIST REPORT',
            definitions: [AddControllerToPageQuickAction, AddPageActionQuickAction, ToggleClearFilterBarQuickAction, ToggleSemanticDateRangeFilterBar, EnableListReportVariantManagementQuickAction, ChangeTableActionsQuickAction, ChangeTableColumnsQuickAction, AddTableActionQuickAction, AddTableCustomColumnQuickAction, EnableTableFilteringQuickAction, AddNewAnnotationFile, AddNewSubpage],
            view,
            key: name + index
          });
        } else if (name === 'objectPage') {
          definitionGroups.push({
            title: 'OBJECT PAGE',
            definitions: [AddControllerToPageQuickAction, AddPageActionQuickAction, AddHeaderFieldQuickAction, AddCustomSectionQuickAction, EnableObjectPageVariantManagementQuickAction, ChangeTableActionsQuickAction, ChangeTableColumnsQuickAction, AddTableActionQuickAction, AddTableCustomColumnQuickAction, EnableTableEmptyRowModeQuickAction, AddNewAnnotationFile, AddNewSubpage],
            view,
            key: name + index
          });
        } else if (name === 'analyticalListPage') {
          definitionGroups.push({
            title: 'ANALYTICAL LIST PAGE',
            definitions: [AddControllerToPageQuickAction, AddPageActionQuickAction, ToggleClearFilterBarQuickAction, ToggleSemanticDateRangeFilterBar, EnableListReportVariantManagementQuickAction, ChangeTableActionsQuickAction, ChangeTableColumnsQuickAction, AddTableActionQuickAction, AddTableCustomColumnQuickAction, EnableTableFilteringQuickAction, AddNewAnnotationFile, AddNewSubpage],
            view,
            key: name + index
          });
        }
      }
      return definitionGroups;
    }
    getComponentContainerFromPage(page) {
      // in ui5 version 1.71 there is no XMLView wrapper around ComponentContainer
      const componentContainer = page instanceof XMLView ? page.getContent()[0] : page;
      if (componentContainer instanceof ComponentContainer) {
        return componentContainer;
      }
      return undefined;
    }
  }
  return FEV2QuickActionRegistry;
});
//# sourceMappingURL=registry.js.map