sap.ui.define([
  "dsag/mealapp/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageToast, MessageBox) {
  "use strict";

  return BaseController.extend("dsag.mealapp.controller.Admin", {
    onInit: function () {
      var oAdminModel = new JSONModel({
        edit: {
          isNew: true,
          ID: "",
          name: "",
          category: "Vegan",
          chefOnly: false,
          imageData: "",
          imageMimeType: "",
          imagePreview: ""
        }
      });
      this.getView().setModel(oAdminModel, "admin");

      this.getRouter().getRoute("Admin").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function () {
      var oSession = this.getSession();
      if (!oSession.getProperty("/auth/isLoggedIn")) {
        this.getRouter().navTo("Login", {}, true);
      }

      // Training Hinweis (Level 1): UI-Guards sind nur UX.
      // Ergänze zusätzliche Anzeigen/Disable-States – aber verlass dich nie darauf.
    },

    onBackToMeals: function () {
      this.getRouter().navTo("Meals");
    },

    formatImageSrc: function (sImageData, sMimeType) {
      if (!sImageData) {
        return "";
      }
      var sType = sMimeType || "image/png";
      return "data:" + sType + ";base64," + sImageData;
    },

    formatChefOnly: function (bVal) {
      // OData V4 liefert Boolean; Switch-Control kann "Yes"/"No" schreiben
      var bIsChef = (bVal === true || bVal === 1 || bVal === "true" || bVal === "Yes");
      return bIsChef ? "Chef Only" : "Standard";
    },

    formatChefOnlyState: function (bVal) {
      var bIsChef = (bVal === true || bVal === 1 || bVal === "true" || bVal === "Yes");
      return bIsChef ? "Warning" : "None";
    },

    onAddMeal: function () {
      this._editContext = null;
      this._setEditModel({
        isNew: true,
        ID: "",
        name: "",
        category: "Vegan",
        chefOnly: false,
        imageData: "",
        imageMimeType: "",
        imagePreview: ""
      });
      this._resetUploader();
      this.byId("mealDialog").open();
    },

    onEditMeal: function (oEvent) {
      var oCtx = oEvent.getSource().getBindingContext();
      if (!oCtx) {
        return;
      }

      this._editContext = oCtx;
      var rawChefOnly = oCtx.getProperty("chefOnly");
      this._setEditModel({
        isNew: false,
        ID: oCtx.getProperty("ID"),
        name: oCtx.getProperty("name"),
        category: oCtx.getProperty("category"),
        chefOnly: (rawChefOnly === true || rawChefOnly === 1 || rawChefOnly === "Yes" || rawChefOnly === "true"),
        imageData: oCtx.getProperty("imageData") || "",
        imageMimeType: oCtx.getProperty("imageMimeType") || "",
        imagePreview: this.formatImageSrc(oCtx.getProperty("imageData"), oCtx.getProperty("imageMimeType"))
      });
      this._resetUploader();
      this.byId("mealDialog").open();
    },

    onDeleteMeal: function (oEvent) {
      var oCtx = oEvent.getSource().getBindingContext();
      if (!oCtx) {
        return;
      }

      var sName = oCtx.getProperty("name") || "";
      MessageBox.confirm("Gericht '" + sName + "' wirklich löschen?", {
        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
        onClose: async function (sAction) {
          if (sAction !== MessageBox.Action.OK) {
            return;
          }
          try {
            await oCtx.delete();
            MessageToast.show("Gericht gelöscht");
          } catch (e) {
            MessageBox.error("Löschen fehlgeschlagen: " + (e && e.message ? e.message : e));
          }
        }
      });
    },

    onFileChange: function (oEvent) {
      var oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
      if (!oFile) {
        return;
      }

      var oReader = new FileReader();
      oReader.onload = function (oLoad) {
        var sDataUrl = oLoad.target.result || "";
        var iIndex = sDataUrl.indexOf(",");
        var sHeader = iIndex >= 0 ? sDataUrl.substring(0, iIndex) : "";
        var sBase64 = iIndex >= 0 ? sDataUrl.substring(iIndex + 1) : "";
        var sMime = "";
        var aMatch = /data:(.*);base64/.exec(sHeader);
        if (aMatch && aMatch[1]) {
          sMime = aMatch[1];
        }

        this._setEditModel({
          imageData: sBase64,
          imageMimeType: sMime,
          imagePreview: sDataUrl
        }, true);
      }.bind(this);
      oReader.readAsDataURL(oFile);
    },

    onRemoveImage: function () {
      this._setEditModel({
        imageData: "",
        imageMimeType: "",
        imagePreview: ""
      }, true);
      this._resetUploader();
    },

    onDialogSave: async function () {
      var oAdminModel = this.getView().getModel("admin");
      var oEdit = oAdminModel.getProperty("/edit");

      if (!oEdit.name || oEdit.name.trim().length < 2) {
        MessageBox.error("Bitte einen gültigen Namen eingeben.");
        return;
      }

      if (!oEdit.category) {
        MessageBox.error("Bitte eine Kategorie auswählen.");
        return;
      }

      try {
        if (oEdit.isNew) {
          var oList = this.getModel().bindList("/Meals");
          var oNewCtx = oList.create({
            name: oEdit.name,
            category: oEdit.category,
            chefOnly: !!oEdit.chefOnly,
            imageData: oEdit.imageData || "",
            imageMimeType: oEdit.imageMimeType || ""
          });
          await oNewCtx.created();
          MessageToast.show("Gericht angelegt");
        } else if (this._editContext) {
          this._editContext.setProperty("name", oEdit.name);
          this._editContext.setProperty("category", oEdit.category);
          this._editContext.setProperty("chefOnly", !!oEdit.chefOnly);
          this._editContext.setProperty("imageData", oEdit.imageData || "");
          this._editContext.setProperty("imageMimeType", oEdit.imageMimeType || "");
          await this._editContext.getModel().submitBatch("$auto");
          MessageToast.show("Gericht aktualisiert");
        }

        this.byId("mealDialog").close();
      } catch (e) {
        MessageBox.error("Speichern fehlgeschlagen: " + (e && e.message ? e.message : e));
      }
    },

    onDialogCancel: function () {
      this.byId("mealDialog").close();
    },

    _setEditModel: function (oData, bMerge) {
      var oAdminModel = this.getView().getModel("admin");
      if (!bMerge) {
        oAdminModel.setProperty("/edit", oData);
        return;
      }

      var oCurrent = oAdminModel.getProperty("/edit") || {};
      oAdminModel.setProperty("/edit", Object.assign({}, oCurrent, oData));
    },

    _resetUploader: function () {
      var oUploader = this.byId("mealImageUploader");
      if (oUploader && oUploader.clear) {
        oUploader.clear();
      }
    }
  });
});
