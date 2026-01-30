"use strict";

sap.ui.define(["../../../utils/fe-v4", "../add-new-subpage-quick-action-base", "../../../utils/core", "../../../utils/version"], function (_____utils_fe_v4, ___add_new_subpage_quick_action_base, _____utils_core, _____utils_version) {
  "use strict";

  const getV4AppComponent = _____utils_fe_v4["getV4AppComponent"];
  const getV4ApplicationPages = _____utils_fe_v4["getV4ApplicationPages"];
  const AddNewSubpageBase = ___add_new_subpage_quick_action_base["AddNewSubpageBase"];
  const isA = _____utils_core["isA"];
  const getUi5Version = _____utils_version["getUi5Version"];
  const isLowerThanMinimalUi5Version = _____utils_version["isLowerThanMinimalUi5Version"];
  const OBJECT_PAGE_COMPONENT_NAME_V4 = 'sap.fe.templates.ObjectPage.ObjectPage';
  /**
   * Quick Action for adding a custom page action.
   */
  class AddNewSubpage extends AddNewSubpageBase {
    get currentPageDescriptor() {
      if (!this.pageId) {
        throw new Error('pageId is not defined');
      }
      if (!this.routePattern) {
        throw new Error('routePattern is not defined');
      }
      if (!this.appComponent) {
        throw new Error('appComponent is not defined');
      }
      return {
        appType: 'fe-v4',
        appComponent: this.appComponent,
        pageId: this.pageId,
        routePattern: this.routePattern
      };
    }
    getApplicationPages() {
      return getV4ApplicationPages(this.context.manifest);
    }
    async resolveContextPathTargetName(contextPath, metaModel) {
      let result;
      const segments = contextPath.split('/').filter(s => !!s);
      if (segments.length === 1) {
        // one segment - assumed it is the direct name of entitySet
        result = segments[0];
      } else {
        // resolve segment by segment
        let targetObject = await metaModel.requestObject(`/${segments[0]}`); // NO SONAR;

        let idx = 1;
        let targetSetName = '';
        while (targetObject && idx < segments.length) {
          const navProp = segments[idx];
          targetSetName = targetObject.$NavigationPropertyBinding[navProp];
          if (!targetSetName) {
            targetObject = undefined;
          } else {
            targetObject = await metaModel.requestObject(`/${targetSetName}`); // NO SONAR;
            idx++;
          }
        }
        if (targetObject) {
          result = targetSetName;
        }
      }
      return result;
    }
    async isPageExists(targetEntitySet, metaModel) {
      let pageFound = false;
      let entitySetName;
      for (const page of this.existingPages) {
        if (page.contextPath) {
          // resolve contextPath to target entitySet
          entitySetName = await this.resolveContextPathTargetName(page.contextPath, metaModel);
        } else {
          entitySetName = page.entitySet;
        }
        if (entitySetName === targetEntitySet) {
          pageFound = true;
          break;
        }
      }
      return pageFound;
    }
    isCurrentObjectPage() {
      return this.pageType === OBJECT_PAGE_COMPONENT_NAME_V4;
    }
    getODataMetaModel() {
      return this.context.rta.getRootControlInstance().getModel()?.getMetaModel();
    }
    async getEntitySetNameFromPageComponent(component, metaModel) {
      if (!isA('sap.fe.templates.ListReport.Component', component) && !isA('sap.fe.templates.ObjectPage.Component', component)) {
        throw new Error('Unexpected type of page owner component');
      }
      let entitySet = component.getEntitySet();
      const contextPath = component.getContextPath();
      if (contextPath) {
        entitySet = await this.resolveContextPathTargetName(contextPath, metaModel);
      }
      return entitySet;
    }
    async prepareNavigationData(metaModel) {
      const entitySet = await metaModel.requestObject(`/${this.entitySet}`); // NO SONAR;
      if (!entitySet) {
        return;
      }
      const entityTypePath = entitySet.$Type;
      const entitySetNavigationKeys = Object.keys(entitySet.$NavigationPropertyBinding);
      for (const navigationProperty of entitySetNavigationKeys) {
        const associationEnd = await metaModel.requestObject(`/${entityTypePath}/${navigationProperty}`);
        if (associationEnd?.$isCollection) {
          const targetEntitySet = entitySet.$NavigationPropertyBinding[navigationProperty];
          await this.addNavigationOptionIfAvailable(metaModel, targetEntitySet, navigationProperty);
        }
      }
    }
    async initialize() {
      const version = await getUi5Version();
      if (isLowerThanMinimalUi5Version(version, {
        major: 1,
        minor: 135
      })) {
        return;
      }
      await super.initialize();
      this.appComponent = getV4AppComponent(this.context.view);
      this.pageId = this.context.view.getViewData()?.stableId.split('::').pop();
      // remember current page route pattern (used in dialog controller for new page change)
      const currentPageRoute = (this.context.manifest['sap.ui5'].routing?.routes ?? []).find(r => r.name === this.pageId);
      if (!currentPageRoute) {
        throw new Error('Current page navigation route not found in manifest');
      }
      this.routePattern = currentPageRoute.pattern;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.OBJECT_PAGE_COMPONENT_NAME_V4 = OBJECT_PAGE_COMPONENT_NAME_V4;
  __exports.AddNewSubpage = AddNewSubpage;
  return __exports;
});
//# sourceMappingURL=add-new-subpage.js.map