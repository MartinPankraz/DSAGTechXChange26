"use strict";

sap.ui.define([], function () {
  "use strict";

  const OBJECT_PAGE_COMPONENT_NAME = 'sap.suite.ui.generic.template.ObjectPage';

  /**
   * Returns application object page definitions found in manifest
   *
   * @param manifest - manifest object
   * @returns array with page descriptors
   */
  function getV2ApplicationPages(manifest) {
    // do we need to distinguish both navigation source and target entitySets to differentiate alternative routes?
    const rootEntry = manifest['sap.ui.generic.app'] || manifest['sap.ovp'];
    if (rootEntry) {
      const result = [];
      const collectPageData = (pagesDefinitions, idPrefix) => {
        if (!pagesDefinitions) {
          return;
        }
        if (Array.isArray(pagesDefinitions)) {
          pagesDefinitions.forEach((entry, idx) => {
            const id = `${idPrefix}-${idx}`;
            if (entry.component.name === OBJECT_PAGE_COMPONENT_NAME) {
              result.push({
                id,
                entitySet: entry.entitySet
              });
            }
            collectPageData(entry.pages, id);
          });
        } else {
          const pageIds = Object.keys(pagesDefinitions);
          for (const pageId of pageIds) {
            if (pagesDefinitions[pageId].component.name === OBJECT_PAGE_COMPONENT_NAME) {
              result.push({
                id: pageId,
                entitySet: pagesDefinitions[pageId].entitySet
              });
            }
            collectPageData(pagesDefinitions[pageId].pages, idPrefix);
          }
        }
      };
      collectPageData(rootEntry.pages, 'page');
      return result;
    }
    return [];
  }
  var __exports = {
    __esModule: true
  };
  __exports.getV2ApplicationPages = getV2ApplicationPages;
  return __exports;
});
//# sourceMappingURL=fe-v2.js.map