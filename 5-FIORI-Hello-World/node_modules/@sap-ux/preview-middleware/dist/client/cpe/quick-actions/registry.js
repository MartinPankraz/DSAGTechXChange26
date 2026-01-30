"use strict";

sap.ui.define(["sap/m/NavContainer", "sap/f/FlexibleColumnLayout", "sap/f/library", "sap/base/Log", "sap/ui/core/ComponentContainer", "../../utils/core", "../utils"], function (NavContainer, FlexibleColumnLayout, sap_f_library, Log, ComponentContainer, ____utils_core, ___utils) {
  "use strict";

  const LayoutType = sap_f_library["LayoutType"];
  const getControlById = ____utils_core["getControlById"];
  const getRootControlFromComponentContainer = ___utils["getRootControlFromComponentContainer"];
  const NAV_CONTAINER_CONTROL_TYPE = 'sap.m.NavContainer';
  const FLEXIBLE_COLUMN_LAYOUT_CONTROL_TYPE = 'sap.f.FlexibleColumnLayout';
  /**
   * Base class for Quick Action definition providers.
   *
   */
  class QuickActionDefinitionRegistry {
    /**
     * Mapping of page view name to page type name.
     */
    PAGE_NAME_MAP = {};

    /**
     * Provides a list of Quick Action definitions that are applicable for the given context.
     *
     * @param _context - Activation context.
     */
    getDefinitions(_context) {
      throw new Error('Not implemented!');
    }

    /**
     * Finds component container from the page control.
     *
     * @param page - Page control provided by containers.
     * @returns ComponentContainer control.
     */
    getComponentContainerFromPage(page) {
      if (page instanceof ComponentContainer) {
        return page;
      }
      return undefined;
    }

    /**
     * Returns a list of Active pages based on the provided control index.
     *
     * @param controlIndex - Control tree index.
     * @returns A list of Active pages.
     */
    getActivePageContent(controlIndex) {
      const views = this.getActiveViews(controlIndex);
      const pages = [];
      for (const view of views) {
        const name = view.getViewName();
        const pageName = this.PAGE_NAME_MAP[name];
        if (pageName) {
          pages.push({
            name: pageName,
            view
          });
        } else {
          Log.warning(`Could not find matching page for view of type "${name}".`);
        }
      }
      return pages;
    }

    /**
     * Get all the root views of currently active pages.
     *
     * @param controlIndex - Control index.
     * @returns List of page root views.
     */
    getActiveViews(controlIndex) {
      const pages = this.getActivePages(controlIndex);
      const views = [];
      for (const page of pages) {
        if (page) {
          const container = this.getComponentContainerFromPage(page);
          const rootControl = getRootControlFromComponentContainer(container);
          if (rootControl) {
            views.push(rootControl);
          }
        }
      }
      return views;
    }

    /**
     * Finds active page controls from the control tree index.
     *
     * @param controlIndex - Control tree index.
     * @returns A list of page controls.
     */
    getActivePages(controlIndex) {
      const navContainerNode = controlIndex[NAV_CONTAINER_CONTROL_TYPE]?.[0];
      if (navContainerNode) {
        const control = getControlById(navContainerNode.controlId);
        if (control instanceof NavContainer) {
          return [control.getCurrentPage()];
        }
      }
      const flexibleLayoutNode = controlIndex[FLEXIBLE_COLUMN_LAYOUT_CONTROL_TYPE]?.[0];
      if (flexibleLayoutNode) {
        const control = getControlById(flexibleLayoutNode.controlId);
        if (control instanceof FlexibleColumnLayout) {
          return this.getVisibleFlexibleColumnLayoutPages(control);
        }
      }
      return [];
    }

    /**
     * Finds the visible Flexible Column Layout pages.
     *
     * @param control - Flexible Column Layout control.
     * @returns A list of visible pages.
     */
    getVisibleFlexibleColumnLayoutPages(control) {
      const layout = control.getLayout();
      switch (layout) {
        case LayoutType.OneColumn:
          return [control.getCurrentBeginColumnPage()];
        case LayoutType.MidColumnFullScreen:
          return [control.getCurrentMidColumnPage()];
        case LayoutType.EndColumnFullScreen:
          return [control.getCurrentEndColumnPage()];
        case LayoutType.ThreeColumnsBeginExpandedEndHidden:
        case LayoutType.ThreeColumnsMidExpanded:
        case LayoutType.ThreeColumnsMidExpandedEndHidden:
        case LayoutType.ThreeColumnsEndExpanded:
          return [control.getCurrentBeginColumnPage(), control.getCurrentMidColumnPage(), control.getCurrentEndColumnPage()];
        case LayoutType.TwoColumnsMidExpanded:
        case LayoutType.TwoColumnsBeginExpanded:
          return [control.getCurrentBeginColumnPage(), control.getCurrentMidColumnPage()];
      }
      return [];
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.QuickActionDefinitionRegistry = QuickActionDefinitionRegistry;
  return __exports;
});
//# sourceMappingURL=registry.js.map