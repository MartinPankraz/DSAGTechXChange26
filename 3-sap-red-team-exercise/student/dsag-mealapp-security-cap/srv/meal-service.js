/*
  srv/meal-service.js
  -------------------
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];
  const LOYALTY_UPGRADE_MEAL_NAME = 'Chocolate Cake';

  //Quest 1------------------------------------//
  this.on('addMeal', async (req) => {
    const { mealName } = req.data;

    // Ensure loyalty meal exists: create it directly (concurrent inserts are ignored)
    try {
      await INSERT.into(Meals).entries({
        name: LOYALTY_UPGRADE_MEAL_NAME,
        category: 'Dessert',
        chefOnly: false
      });
    } catch (e) {
      // Ignore errors (e.g., unique constraint from concurrent create)
    }

    // Apply upgrade unconditionally if eligible
    const isUpgradeEligible = mealName !== LOYALTY_UPGRADE_MEAL_NAME;
    let loyaltyUpgradeApplied = false;

    if (isUpgradeEligible) {
      req.data.mealName = LOYALTY_UPGRADE_MEAL_NAME;
      loyaltyUpgradeApplied = true;
    }

    // Attach upgrade info to the request for use in the after hook
    req.data.loyaltyUpgradeApplied = loyaltyUpgradeApplied;
  });
  //Quest 1------------------------------------//

  //Quest 3------------------------------------//
  this.before('CREATE', 'Preferences', async (req) => {
    //Quest 3 -> TODO: Implement this validation using GPT-5 mini model and the provided prompt.
  });
  //Quest 3------------------------------------//
});
