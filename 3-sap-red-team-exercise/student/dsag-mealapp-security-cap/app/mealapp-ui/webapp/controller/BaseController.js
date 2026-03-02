sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  /**
   * BaseController für wiederverwendbare Helper.
   *
   * Warum?
   * - reduziert Duplikate (Router/Model Zugriff)
   * - erleichtert Einsteigern den Einstieg (ein Ort für Basics)
   */
  return Controller.extend("dsag.mealapp.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    getModel: function (sName) {
      return this.getOwnerComponent().getModel(sName);
    },

    /**
     * SessionModel (JSONModel) aus dem manifest.json
     */
    getSession: function () {
      return this.getModel("session");
    }
  });
});
