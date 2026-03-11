// webapp/controller/Employees.controller.js
// Sample UI5 controller – demonstrates where the MCP server will detect
// audit-relevant events and redirect them to the CAP backend.

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("sample.app.controller.Employees", {

    onInit: function () {
      // Route initialisation
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("employees").attachRouteMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function () {
      this.getView().getModel().read("/Employees", {
        success: function (oData) {
          // Missing: backend audit log for READ of personal data
        },
        error: function (oErr) {
          // Missing: APP_LOG for read failure
          MessageToast.show("Failed to load employees.");
        }
      });
    },

    onSave: function () {
      // Saves employee data via OData V2 submitChanges
      // The AUDIT_LOG for this mutation MUST be written in srv/employee-service.js
      this.getView().getModel().submitChanges({
        success: function () {
          MessageToast.show("Saved successfully.");
        },
        error: function (oErr) {
          // Missing: APP_LOG for save failure
          MessageToast.show("Save failed.");
        }
      });
    },

    onDelete: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      // Triggers OData DELETE – AUDIT_LOG belongs in CAP handler
      oContext.delete();
    },

    onExport: function () {
      // Triggers backend exportEmployees action
      // AUDIT_LOG (HIGH) must fire in the CAP action handler
      this.getView().getModel().callFunction("/exportEmployees", {
        method: "POST",
        success: function (oData) {
          const url = window.URL.createObjectURL(new Blob([oData.result]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "employees.csv";
          a.click();
        }
      });
    },

    onSearch: function (oEvent) {
      const query = oEvent.getParameter("query");
      this.getView().getModel().read("/Employees", {
        filters: [new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query)],
        success: function (oData) {
          // Missing: backend audit log for search-driven READ
        }
      });
    }

  });
});
