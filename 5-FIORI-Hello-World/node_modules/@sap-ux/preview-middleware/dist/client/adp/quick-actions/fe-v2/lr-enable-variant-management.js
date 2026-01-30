"use strict";

sap.ui.define(["./utils", "../simple-quick-action-base", "sap/ui/core/Component"], function (___utils, ___simple_quick_action_base, Component) {
  "use strict";

  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const prepareManifestChange = ___utils["prepareManifestChange"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = 'enable-variant-management-in-tables-charts';
  const CONTROL_TYPES = ['sap.f.DynamicPage'];

  /**
   * Quick Action for enabling table filtering using table personalization settings.
   */
  class EnableListReportVariantManagementQuickAction extends SimpleQuickActionDefinitionBase {
    isPageSmartVariantManagementEnabled = false;
    forceRefreshAfterExecution = true;
    constructor(context) {
      super(ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS, CONTROL_TYPES, 'QUICK_ACTION_ENABLE_TABLES_AND_CHARTS_VARIANT_MANAGEMENT', context, [{
        run: () => {
          if (this.ownerComponent) {
            if (!this.isPageSmartVariantManagementEnabled) {
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
    async initialize() {
      const manifestChangesSupported = await areManifestChangesSupported(this.context.manifest);
      if (!manifestChangesSupported) {
        return;
      }
      await super.initialize();
      if (this.control) {
        this.ownerComponent = Component.getOwnerComponentFor(this.control);
        if (!this.ownerComponent?.isA('sap.suite.ui.generic.template.ListReport.Component') && !this.ownerComponent?.isA('sap.suite.ui.generic.template.AnalyticalListPage.Component')) {
          this.control = undefined;
        } else {
          const id = this.control.getId();
          if (typeof id !== 'string') {
            throw new Error('Could not retrieve configuration property because control id is not valid!');
          }
          const value = this.context.changeService.getConfigurationPropertyValue(id, 'smartVariantManagement');
          this.isPageSmartVariantManagementEnabled = value === undefined ? this.ownerComponent.getSmartVariantManagement() : value;
        }
      }
    }
    async execute() {
      if (!this.control) {
        return [];
      }
      const entitySet = this.ownerComponent.getEntitySet();
      const command = await prepareManifestChange(this.context, 'component/settings', this.control, this.ownerComponent.getMetadata().getComponentName(), entitySet, {
        smartVariantManagement: !this.isPageSmartVariantManagementEnabled
      });
      return command;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS = ENABLE_VARIANT_MANAGEMENT_IN_TABLES_CHARTS;
  __exports.EnableListReportVariantManagementQuickAction = EnableListReportVariantManagementQuickAction;
  return __exports;
});
//# sourceMappingURL=lr-enable-variant-management.js.map