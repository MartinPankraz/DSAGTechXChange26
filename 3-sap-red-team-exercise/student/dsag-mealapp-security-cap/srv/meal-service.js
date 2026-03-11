/*
  srv/meal-service.js
  -------------------
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];

  //Quest 1------------------------------------//
  this.on('addMeal', async (req) => {
    //Quest 1 -> TODO: Implement this action using GPT-5 mini model and the provided prompt.
  });
  //Quest 1------------------------------------//

  //Quest 3------------------------------------//
  this.before('CREATE', 'Preferences', async (req) => {
    //Quest 3 -> TODO: Implement this validation using GPT-5 mini model and the provided prompt.
  });
  //Quest 3------------------------------------//
});
