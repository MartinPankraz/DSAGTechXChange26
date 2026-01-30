"use strict";

sap.ui.define(["sap/ui/core/Component", "sap/ui/dt/OverlayRegistry", "../../cpe/quick-actions/utils", "../../utils/core", "../dialog-factory", "../../i18n", "./simple-quick-action-base", "./dialog-enablement-validator"], function (Component, OverlayRegistry, ____cpe_quick_actions_utils, ____utils_core, ___dialog_factory, ____i18n, ___simple_quick_action_base, ___dialog_enablement_validator) {
  "use strict";

  const pageHasControlId = ____cpe_quick_actions_utils["pageHasControlId"];
  const getControlById = ____utils_core["getControlById"];
  const DialogFactory = ___dialog_factory["DialogFactory"];
  const DialogNames = ___dialog_factory["DialogNames"];
  const getTextBundle = ____i18n["getTextBundle"];
  const SimpleQuickActionDefinitionBase = ___simple_quick_action_base["SimpleQuickActionDefinitionBase"];
  const DIALOG_ENABLEMENT_VALIDATOR = ___dialog_enablement_validator["DIALOG_ENABLEMENT_VALIDATOR"];
  const ADD_NEW_OBJECT_PAGE_ACTION = 'add-new-subpage';
  const CONTROL_TYPES = ['sap.f.DynamicPage', 'sap.uxap.ObjectPageLayout'];
  /**
   * Base Quick Action class for adding a custom page action.
   */
  class AddNewSubpageBase extends SimpleQuickActionDefinitionBase {
    constructor(context) {
      super(ADD_NEW_OBJECT_PAGE_ACTION, [], 'QUICK_ACTION_ADD_NEW_SUB_PAGE', context, [{
        run: async () => {
          const i18n = await getTextBundle();
          if (this.navProperties.length === 0) {
            return {
              type: 'error',
              message: i18n.getText('NO_SUB_PAGES_TO_ADD')
            };
          }
          return undefined;
        }
      }, DIALOG_ENABLEMENT_VALIDATOR]);
      this.appReference = context.flexSettings.projectId ?? '';
      this.existingPages = this.getApplicationPages();
    }
    async addNavigationOptionIfAvailable(metaModel, targetEntitySet, navProperty) {
      if (!targetEntitySet) {
        return;
      }
      const pageExists = await this.isPageExists(targetEntitySet, metaModel);
      if (!pageExists) {
        this.navProperties.push({
          entitySet: targetEntitySet,
          navProperty: navProperty ?? targetEntitySet
        });
      }
    }
    async initialize() {
      if (!this.appReference) {
        throw new Error('App reference not defined');
      }
      const allControls = CONTROL_TYPES.flatMap(item => this.context.controlIndex[item] ?? []);
      const control = allControls.find(c => pageHasControlId(this.context.view, c.controlId));
      this.pageType = this.context.view.getViewName().split('.view.')[0];
      const metaModel = this.getODataMetaModel();
      if (!metaModel || !control) {
        return;
      }
      const modifiedControl = getControlById(control.controlId);
      if (!modifiedControl) {
        return;
      }
      const component = Component.getOwnerComponentFor(modifiedControl);
      const entitySetName = await this.getEntitySetNameFromPageComponent(component, metaModel);
      if (!entitySetName) {
        return;
      }
      this.entitySet = entitySetName;
      this.navProperties = [];
      if (!this.isCurrentObjectPage()) {
        await this.addNavigationOptionIfAvailable(metaModel, this.entitySet);
      } else {
        await this.prepareNavigationData(metaModel);
      }
      this.control = modifiedControl;
    }
    async execute() {
      const overlay = OverlayRegistry.getOverlay(this.control);
      await DialogFactory.createDialog(overlay, this.context.rta, DialogNames.ADD_SUBPAGE, undefined, {
        appReference: this.appReference,
        navProperties: this.navProperties,
        title: 'ADD_SUB_PAGE_DIALOG_TITLE',
        pageDescriptor: this.currentPageDescriptor
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
  __exports.ADD_NEW_OBJECT_PAGE_ACTION = ADD_NEW_OBJECT_PAGE_ACTION;
  __exports.AddNewSubpageBase = AddNewSubpageBase;
  return __exports;
});
//# sourceMappingURL=add-new-subpage-quick-action-base.js.map