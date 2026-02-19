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

    // Security Training Hook:
    // In späteren Schritten könnt ihr hier Rollenprüfungen ergänzen (ChefOnly, Admin, ...)
    // z.B.: if (oMeal.chefOnly && !req.user.is('Chef')) req.reject(403)
  });
});
