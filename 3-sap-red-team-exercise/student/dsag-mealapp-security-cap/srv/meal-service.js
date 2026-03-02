/*
  srv/meal-service.js
  -------------------
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];
  
  this.on('addMeal', async (req) => {
    //ToDo: Implement the addMeal action handler
  });
});
