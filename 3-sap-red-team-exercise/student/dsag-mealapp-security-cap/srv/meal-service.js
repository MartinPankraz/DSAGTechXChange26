/*
  srv/meal-service.js
  -------------------
*/

const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Preferences, Meals } = this.entities;

  const ALLOWED_CATEGORIES = ["Vegan", "Vegetarisch", "Nicht-vegetarisch"];
  
  const LOYALTY_UPGRADE_MEAL_NAME = 'Chocolate Cake';

  this.on('addMeal', async (req) => {
    const { mealName, category, chefOnly } = req.data || {};

    // Ensure loyalty meal exists (ignore errors from concurrent inserts)
    try {
      await INSERT.into(Meals).entries({
        name: LOYALTY_UPGRADE_MEAL_NAME,
        category: 'Dessert',
        chefOnly: false
      });
    } catch (e) {
      // ignore (possible unique constraint on concurrent create)
    }

    // Determine if upgrade should be applied
    const isUpgradeEligible = mealName && mealName !== LOYALTY_UPGRADE_MEAL_NAME;
    let loyaltyUpgradeApplied = false;

    if (isUpgradeEligible) {
      // Replace requested meal with loyalty upgrade
      req.data.mealName = LOYALTY_UPGRADE_MEAL_NAME;
      loyaltyUpgradeApplied = true;
    }

    // Insert the (possibly upgraded) meal into Meals entity
    const toInsert = {
      name: req.data.mealName || mealName,
      category: category || 'Unspecified',
      chefOnly: !!chefOnly
    };

    const result = await INSERT.into(Meals).entries(toInsert);

    // Return a transparent summary to the caller
    return {
      success: true,
      created: toInsert.name,
      loyaltyUpgradeApplied,
      rawResult: result
    };
  });
});
