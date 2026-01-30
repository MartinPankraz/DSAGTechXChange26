"use strict";

sap.ui.define(["sap/base/i18n/ResourceBundle", "sap/ui/model/resource/ResourceModel"], function (ResourceBundle, ResourceModel) {
  "use strict";

  const BUNDLE_CACHE = {};
  const MODEL_CACHE = {};
  async function getResourceBundle(key) {
    const cachedBundle = BUNDLE_CACHE[key];
    if (cachedBundle) {
      return cachedBundle;
    }
    const bundle = await ResourceBundle.create({
      bundleUrl: '/preview/client/messagebundle.properties',
      url: '/preview/client/messagebundle.properties',
      supportedLocales: [''],
      locale: '',
      async: true
    });
    BUNDLE_CACHE[key] = bundle;
    return bundle;
  }
  async function getResourceModel(key = 'open.ux.preview.client') {
    const cachedModel = MODEL_CACHE[key];
    if (cachedModel) {
      return cachedModel;
    }
    const bundle = await getResourceBundle(key);
    const model = new ResourceModel({
      bundle
    });
    MODEL_CACHE[key] = model;
    return model;
  }
  class TextBundle {
    constructor(bundle) {
      this.bundle = bundle;
    }
    getText(key, args) {
      return this.bundle.getText(key, args) ?? key;
    }
  }
  async function getTextBundle(key = 'open.ux.preview.client') {
    const bundle = await getResourceBundle(key);
    return new TextBundle(bundle);
  }
  var __exports = {
    __esModule: true
  };
  __exports.getResourceBundle = getResourceBundle;
  __exports.getResourceModel = getResourceModel;
  __exports.TextBundle = TextBundle;
  __exports.getTextBundle = getTextBundle;
  return __exports;
});
//# sourceMappingURL=i18n.js.map