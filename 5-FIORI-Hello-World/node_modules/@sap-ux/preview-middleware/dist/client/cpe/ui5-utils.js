"use strict";

sap.ui.define(["sap/ui/core/IconPool"], function (IconPool) {
  "use strict";

  /**
   * Get ui5 icons.
   *
   * @returns IconDetails[]
   */
  function getIcons() {
    return IconPool.getIconNames('undefined').map(icon => {
      const iconInfo = IconPool.getIconInfo(icon);
      return {
        name: icon.toLowerCase(),
        content: iconInfo.content,
        fontFamily: iconInfo.fontFamily
      };
    }).sort((item1, item2) => {
      if (item1.name < item2.name) {
        return -1;
      }
      if (item1.name > item2.name) {
        return 1;
      }
      return 0;
    });
  }
  var __exports = {
    __esModule: true
  };
  __exports.getIcons = getIcons;
  return __exports;
});
//# sourceMappingURL=ui5-utils.js.map