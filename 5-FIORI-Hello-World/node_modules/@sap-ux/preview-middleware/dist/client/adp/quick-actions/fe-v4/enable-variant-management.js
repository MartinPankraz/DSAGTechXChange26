"use strict";

sap.ui.define(["../simple-quick-action-base", "sap/ui/core/Component", "../../../utils/version", "../../../utils/fe-v4"], function (___simple_quick_action_base, Component, _____utils_version, _____utils_fe_v4) {
  "use strict";

  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const createManifestPropertyChange = _____utils_fe_v4["createManifestPropertyChange"];
  const ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = 'enable-variant-management-in-tables-charts';

  // sap.f.DynamicPage for list report and sap.uxap.ObjectPageLayout for object page.
  const CONTROL_TYPES = ['sap.f.DynamicPage', 'sap.uxap.ObjectPageLayout'];

  /**
   * Quick Action for enabling table filtering using table personalization settings.
   */
  class EnableVariantManagementQuickAction extends SimpleQuickActionDefinitionBase {
    pageSmartVariantManagementMode = '';
    constructor(context) {
      super(ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLES_AND_CHARTS_VARIANT_MANAGEMENT', context, [{
        run: () => {
          if (this.control) {
            if (this.pageSmartVariantManagementMode === 'Control') {
              return {
                type: 'error',
                message: this.context.resourceBundle.getText('VARIANT_MANAGEMENT_FOR_PAGE_CONTROLS_IS_ALREADY_ENABLED')
              };
            }
          }
          return undefined;
        }
      }]);
    }
    forceRefreshAfterExecution = true;
    async initialize() {
      const version = await getUi5Version();
      if (isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 131
      })) {
        return;
      }
      await super.initialize();
      if (this.control) {
        this.ownerComponent = Component.getOwnerComponentFor(this.control);
        if (!this.ownerComponent?.isA('sap.fe.templates.ListReport.Component') && !this.ownerComponent?.isA('sap.fe.templates.ObjectPage.Component') && !this.ownerComponent?.isA('sap.fe.templates.AnalyticalListPage.Component')) {
          this.control = undefined;
        } else {
          const id = this.control.getId();
          if (typeof id !== 'string') {
            throw new Error('Could not retrieve configuration property because control id is not valid!');
          }
          const value = this.context.changeService.getConfigurationPropertyValue(id, 'variantManagement');
          this.pageSmartVariantManagementMode = value === undefined ? this.ownerComponent.getVariantManagement() : value;
        }
      }
    }
    async execute() {
      if (!this.control) {
        return [];
      }
      const {
        flexSettings
      } = this.context;
      const command = await createManifestPropertyChange(this.control, flexSettings, {
        variantManagement: 'Control'
      });
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
  __exports.ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS;
  __exports.EnableVariantManagementQuickAction = EnableVariantManagementQuickAction;
  return __exports;
});
//# sourceMappingURL=enable-variant-management.js.map