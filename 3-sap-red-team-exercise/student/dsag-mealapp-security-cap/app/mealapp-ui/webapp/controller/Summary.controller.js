sap.ui.define([
  "dsag/mealapp/controller/BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter"
], function (BaseController, Filter, FilterOperator, Sorter) {
  "use strict";

  return BaseController.extend("dsag.mealapp.controller.Summary", {

    onInit: function () {
      this.getRouter().getRoute("Summary").attachPatternMatched(this._onRouteMatched, this);
      // Also check on every view rendering (for browser back)
      this.getView().addEventDelegate({
        onBeforeShow: function() {
          var oSession = this.getSession();
          if (!oSession.getProperty("/auth/isLoggedIn")) {
            this.getRouter().navTo("Login", {}, true);
          }
        }.bind(this)
      });
    },

    _onRouteMatched: async function () {
      var oSession = this.getSession();

      // Guard: ohne Login zurück zum Login-Screen
      if (!oSession.getProperty("/auth/isLoggedIn")) {
        this.getRouter().navTo("Login", {}, true);
        return;
      }

      // Neueste Preference aus dem Backend laden und View an den Context binden.
      var oPrefContext = await this._getLatestPreferenceContext();
      if (!oPrefContext) {
        // Wenn noch keine Preference existiert -> zurück zur Auswahl
        this.getRouter().navTo("Meals", {}, true);
        return;
      }

      // View Binding Context setzen (default model)
      this.getView().setBindingContext(oPrefContext);
    },

    _getLatestPreferenceContext: async function () {
      var oSession = this.getSession();
      var sEmail = oSession.getProperty("/auth/user/email");

      if (!sEmail) {
        return null;
      }

      var oModel = this.getModel();
      var oListBinding = oModel.bindList(
        "/Preferences",
        null,
        [new Sorter("createdAt", true)],
        [new Filter("userEmail", FilterOperator.EQ, sEmail)],
        { $expand: "meal" }
      );

      var aContexts = await oListBinding.requestContexts(0, 1);
      if (!aContexts || aContexts.length === 0) {
        return null;
      }

      return aContexts[0];
    },

    onBackToMeals: function () {
      this.getRouter().navTo("Meals");
    },

    onLogout: function () {
      var oSession = this.getSession();

      oSession.setProperty("/auth/isLoggedIn", false);
      oSession.setProperty("/auth/user/email", "");
      oSession.setProperty("/auth/user/role", "user");
      oSession.setProperty("/preference/selectedMealId", "");

      this.getRouter().navTo("Login", {}, true);
    }
  });
});
