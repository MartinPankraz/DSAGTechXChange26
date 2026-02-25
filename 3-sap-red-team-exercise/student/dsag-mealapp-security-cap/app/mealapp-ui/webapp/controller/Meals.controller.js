sap.ui.define([
  "dsag/mealapp/controller/BaseController",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter"
], function (BaseController, MessageToast, MessageBox, Filter, FilterOperator, Sorter) {
  "use strict";

  return BaseController.extend("dsag.mealapp.controller.Meals", {

    onInit: function () {
      this.getRouter().getRoute("Meals").attachPatternMatched(this._onRouteMatched, this);
      // Also check on every view rendering (for browser back)
      this.getView().addEventDelegate({
        onBeforeShow: function() {
          var oSession = this.getSession();
            var oList = this.getView().byId("mealsList");
            if (!oSession.getProperty("/auth/isLoggedIn")) {
              this.getRouter().navTo("Login", {}, true);
              if (oList) oList.setVisible(false);
            } else {
              if (oList) oList.setVisible(true);
            }
        }.bind(this)
      });
    },

    _onRouteMatched: async function () {
      var oSession = this.getSession();

      // Einfacher Route-Guard (rein UI-seitig)
      if (!oSession.getProperty("/auth/isLoggedIn")) {
        this.getRouter().navTo("Login", {}, true);
        return;
      }

      // Sobald die Meals-Liste Daten hat, können wir eine gespeicherte Auswahl "selektieren".
      var oList = this.byId("mealsList");
      oList.detachUpdateFinished(this._onMealsListUpdateFinished, this);
      oList.attachUpdateFinished(this._onMealsListUpdateFinished, this);

      // Persistenz Demo:
      // Beim Eintritt in die View laden wir die letzte gespeicherte Präferenz aus CAP (SQLite)
      // und selektieren das entsprechende Gericht.
      try {
        await this._loadLatestPreferenceFromBackend();
        this._applySelectionFromModel();
      } catch (e) {
        // Fürs Training: wir blockieren die App nicht, wenn der Call fehlschlägt.
        // In echten Apps würdest du hier gezielter reagieren.
        // eslint-disable-next-line no-console
        console.warn("Could not load preference:", e);
      }
    },

    _onMealsListUpdateFinished: function () {
      // Wenn die List Items neu gerendert wurden (z.B. nach OData Load), Selection erneut anwenden.
      var oList = this.byId("mealsList");
      if (oList && oList.getItems().length === 0) {
        this.getRouter().navTo("Login", {}, true);
        return;
      }
      this._applySelectionFromModel();
    },

    _loadLatestPreferenceFromBackend: async function () {
      var oSession = this.getSession();
      var sEmail = oSession.getProperty("/auth/user/email");

      if (!sEmail) {
        return;
      }

      var oModel = this.getModel(); // Default OData V4 Model

      // OData Query:
      // - filter: nur Preferences dieses Users
      // - order: neueste zuerst
      // - top: 1
      // - expand: Meal-Daten gleich mitladen
      var oListBinding = oModel.bindList(
        "/Preferences",
        null,
        [new Sorter("createdAt", true)],
        [new Filter("userEmail", FilterOperator.EQ, sEmail)],
        { $top: 1, $expand: "meal" }
      );

      var aContexts = await oListBinding.requestContexts(0, 1);
      if (!aContexts || aContexts.length === 0) {
        return;
      }

      var oPref = await aContexts[0].requestObject();
      if (oPref && oPref.meal_ID) {
        oSession.setProperty("/preference/selectedMealId", oPref.meal_ID);
      }
    },

    _applySelectionFromModel: function () {
      var oSession = this.getSession();
      var sSelectedId = oSession.getProperty("/preference/selectedMealId");

      var oList = this.byId("mealsList");
      oList.removeSelections(true);

      if (!sSelectedId) {
        return;
      }

      // OData Binding Context -> Property Name ist "ID" (CAP cuid)
      oList.getItems().forEach(function (oItem) {
        var oCtx = oItem.getBindingContext();
        if (oCtx && oCtx.getProperty("ID") === sSelectedId) {
          oList.setSelectedItem(oItem, true);
        }
      });
    },

    onSelectionChange: function (oEvent) {
      var oSelectedItem = oEvent.getParameter("listItem");
      var oCtx = oSelectedItem && oSelectedItem.getBindingContext();

      if (!oCtx) {
        return;
      }

      this.getSession().setProperty("/preference/selectedMealId", oCtx.getProperty("ID"));
    },

    onSavePreference: async function () {
      var oBundle = this.getModel("i18n").getResourceBundle();
      var oSession = this.getSession();

      var sMealId = oSession.getProperty("/preference/selectedMealId");
      var sEmail = oSession.getProperty("/auth/user/email");

      if (!sMealId) {
        MessageToast.show(oBundle.getText("noMealSelected"));
        return;
      }
      if (!sEmail) {
        this.getRouter().navTo("Login", {}, true);
        return;
      }

      // Prompt for allergy input using sap.m.Dialog
      var that = this;
      var oDialog = new sap.m.Dialog({
        title: "Allergie-Info (optional)",
        content: [
          new sap.m.Label({ text: "Gibt es Allergien die wir wissen müssen?", labelFor: "allergyInput" }),
          new sap.m.Input("allergyInput", { placeholder: "Optional" })
        ],
        beginButton: new sap.m.Button({
          text: "Speichern",
          type: "Emphasized",
          press: async function () {
            var sAllergy = sap.ui.getCore().byId("allergyInput").getValue();
            try {
              var oModel = that.getModel();
              var oPrefList = oModel.bindList("/Preferences");
              var oNewCtx = oPrefList.create({
                userEmail: sEmail,
                meal_ID: sMealId,
                allergy: sAllergy
              });
              await oNewCtx.created();
              MessageToast.show(oBundle.getText("preferenceSaved"));
              oDialog.close();
              that.getRouter().navTo("Summary");
            } catch (err) {
              MessageBox.error("Speichern fehlgeschlagen. Details: " + (err && err.message ? err.message : err));
            }
          }
        }),
        endButton: new sap.m.Button({
          text: "Abbrechen",
          press: function () {
            oDialog.close();
          }
        }),
        afterClose: function () {
          oDialog.destroy();
        }
      });
      oDialog.open();
    },

    onLogout: function () {
      var oSession = this.getSession();

      // Logout = Session reset (UI-seitig)
      oSession.setProperty("/auth/isLoggedIn", false);
      oSession.setProperty("/auth/user/email", "");
      oSession.setProperty("/auth/user/role", "user");
      oSession.setProperty("/preference/selectedMealId", "");

      this.getRouter().navTo("Login", {}, true);
    },

    onOpenAdmin: function () {
      this.getRouter().navTo("Admin");
    }
  });
});
