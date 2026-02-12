sap.ui.define([
  "sap/ui/core/UIComponent"
], function (UIComponent) {
  "use strict";

  return UIComponent.extend("dsag.mealapp.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // UIComponent.init() initialisiert u.a. Models aus dem manifest.json.
      UIComponent.prototype.init.apply(this, arguments);

      // Wichtiger Hinweis (Security Mindset):
      // Route Guards in der UI sind *nur UX*. Sie ersetzen *keine* serverseitige Autorisierung.
      const oRouter = this.getRouter();
      oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

      // Routing wird ausschließlich im manifest.json konfiguriert.
      // Hier wird der Router nur gestartet.
      oRouter.initialize();
    },

    _onBeforeRouteMatched: function (oEvent) {
      const sRouteName = oEvent.getParameter("name");
      const oSession = this.getModel("session");
      const bLoggedIn = !!oSession.getProperty("/auth/isLoggedIn");

      // Wenn jemand deep-linkt (z.B. #/meals) ohne "Login" -> zurück zum Login.
      if (sRouteName !== "Login" && !bLoggedIn) {
        this.getRouter().navTo("Login", {}, true);
        return;
      }

      // UX: Wenn jemand zurück auf Login navigiert, obwohl schon eingeloggt -> weiter.
      if (sRouteName === "Login" && bLoggedIn) {
        this.getRouter().navTo("Meals", {}, true);
      }
    }
  });
});
