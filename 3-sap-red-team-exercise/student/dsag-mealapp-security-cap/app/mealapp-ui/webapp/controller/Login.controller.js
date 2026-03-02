sap.ui.define([
  "dsag/mealapp/controller/BaseController",
  "sap/m/MessageBox"
], function (BaseController, MessageBox) {
  "use strict";

  // Trainings-Login (rein clientseitig)
  // Security Note:
  // - Hardcoded Credentials sind in echten Apps ein Anti-Pattern.
  // - Für die Schulung nutzen wir das als Startpunkt.
  var VALID_USERS = [
    { email: "dummy@dsag.de", password: "Start123!", role: "user" },
    { email: "admin@dsag.de", password: "Start123!", role: "admin" }
  ];

  return BaseController.extend("dsag.mealapp.controller.Login", {

    onInit: function () {
      this.getRouter().getRoute("Login").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function () {
      var oSession = this.getSession();

      // UX: Wenn schon eingeloggt, direkt weiter.
      if (oSession.getProperty("/auth/isLoggedIn")) {
        this.getRouter().navTo("Meals", {}, true);
        return;
      }

      // Eingabefelder beim Betreten der View zurücksetzen
      this.byId("emailInput").setValue("");
      this.byId("passwordInput").setValue("");
      this.byId("emailInput").setValueState("None");
      this.byId("passwordInput").setValueState("None");
    },

    onLogin: function () {
      var oBundle = this.getModel("i18n").getResourceBundle();
      var oSession = this.getSession();

      var sEmail = (this.byId("emailInput").getValue() || "").trim();
      var sPassword = this.byId("passwordInput").getValue() || "";

      // Einfache, rein clientseitige Validierung (Training)
      this.byId("emailInput").setValueState("None");
      this.byId("passwordInput").setValueState("None");

      var bHasError = false;

      if (!sEmail) {
        this.byId("emailInput").setValueState("Error");
        bHasError = true;
      }

      if (!sPassword) {
        this.byId("passwordInput").setValueState("Error");
        bHasError = true;
      }

      if (bHasError) {
        MessageBox.error(oBundle.getText("loginInvalid"));
        return;
      }

      // Check gegen fixe Demo-Credentials
      var oUser = VALID_USERS.find(function (oEntry) {
        return oEntry.email === sEmail.toLowerCase() && oEntry.password === sPassword;
      });
      if (!oUser) {
        MessageBox.error(oBundle.getText("loginInvalid"));
        return;
      }

      // Login State im Session Model (JSONModel)
      // Wichtig: Das ist keine echte Security. Backend-Auth kommt später im Workshop.
      oSession.setProperty("/auth/isLoggedIn", true);
      oSession.setProperty("/auth/user/email", sEmail);
  oSession.setProperty("/auth/user/role", oUser.role || "user");

      // Auswahl zurücksetzen (wird in Meals ggf. aus der DB geladen)
      oSession.setProperty("/preference/selectedMealId", "");

      this.getRouter().navTo("Meals");
    }
  });
});
