/*
  srv/meal-service.js
  -------------------
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];

  // Audit logging for Preferences is handled automatically by @cap-js/audit-logging
  // via the @PersonalData annotations in db/schema.cds

  //Quest 1------------------------------------//
  this.on('addMeal', async (req) => {
    //Quest 1 -> TODO: Implement this action using GPT-5 mini model and the provided prompt.
  });
  //Quest 1------------------------------------//
});
