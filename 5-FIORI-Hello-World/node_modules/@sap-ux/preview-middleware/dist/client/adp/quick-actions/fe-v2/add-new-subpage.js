"use strict";

sap.ui.define(["../../../utils/fe-v2", "../add-new-subpage-quick-action-base", "../../../utils/core", "./utils"], function (_____utils_fe_v2, ___add_new_subpage_quick_action_base, _____utils_core, ___utils) {
  "use strict";

  const getV2ApplicationPages = _____utils_fe_v2["getV2ApplicationPages"];
  const AddNewSubpageBase = ___add_new_subpage_quick_action_base["AddNewSubpageBase"];
  const isA = _____utils_core["isA"];
  const areManifestChangesSupported = ___utils["areManifestChangesSupported"];
  const getV2AppComponent = ___utils["getV2AppComponent"];
  const OBJECT_PAGE_COMPONENT_NAME_V2 = 'sap.suite.ui.generic.template.ObjectPage';

  /**
   * Quick Action for adding a custom page action.
   */
  class AddNewSubpage extends AddNewSubpageBase {
    get currentPageDescriptor() {
      if (!this.entitySet) {
        throw new Error('entitySet is not defined');
      }
      if (!this.pageType) {
        throw new Error('pageType is not defined');
      }
      if (!this.appComponent) {
        throw new Error('appComponent is not defined');
      }
      return {
        appType: 'fe-v2',
        appComponent: this.appComponent,
        entitySet: this.entitySet,
        pageType: this.pageType
      };
    }
    getApplicationPages() {
      return getV2ApplicationPages(this.context.manifest);
    }
    isPageExists(targetEntitySet) {
      return this.existingPages.some(page => page.entitySet === targetEntitySet);
    }
    isCurrentObjectPage() {
      return this.pageType === OBJECT_PAGE_COMPONENT_NAME_V2;
    }
    getODataMetaModel() {
      return this.context.rta.getRootControlInstance().getModel()?.getMetaModel();
    }
    getEntitySetNameFromPageComponent(component) {
      if (!isA('sap.suite.ui.generic.template.lib.TemplateComponent', component)) {
        throw new Error('Unexpected type of page owner component');
      }
      return Promise.resolve(component.getEntitySet());
    }
    async prepareNavigationData(metaModel) {
      const entitySet = metaModel.getODataEntitySet(this.entitySet);
      const entityType = metaModel.getODataEntityType(entitySet.entityType);
      for (const navProp of entityType?.navigationProperty ?? []) {
        const associationEnd = metaModel.getODataAssociationEnd(entityType, navProp.name);
        if (associationEnd?.multiplicity !== '*') {
          continue;
        }
        const entityContainer = metaModel.getODataEntityContainer();
        if (!entityContainer?.entitySet?.length) {
          continue;
        }
        const targetEntitySet = entityContainer.entitySet.find(item => item.entityType === associationEnd.type);
        await this.addNavigationOptionIfAvailable(metaModel, targetEntitySet?.name, navProp.name);
      }
    }
    async initialize() {
      if (!(await areManifestChangesSupported(this.context.manifest))) {
        return;
      }
      this.appComponent = getV2AppComponent(this.context.view);
      return super.initialize();
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.AddNewSubpage = AddNewSubpage;
  return __exports;
});
//# sourceMappingURL=add-new-subpage.js.map