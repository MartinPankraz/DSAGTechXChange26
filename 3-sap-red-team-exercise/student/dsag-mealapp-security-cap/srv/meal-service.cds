using { dsag.mealapp as my } from '../db/schema';

/**
 * MealService
 * ----------
 * OData V4 Service, consumed by the SAPUI5 Freestyle app.
 *
 * Endpoint (default CAP prefix):
 *   /odata/v4/meal/
 */
@path: 'meal'
service MealService {
  entity Meals       as projection on my.Meals;
  entity Preferences as projection on my.Preferences {
    ID,
    allergy,
    userEmail,
    meal,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy
  };

  action addMeal(
    name         : String(80),
    category     : String(20),
    imageData    : LargeString,
    imageMimeType: String(50),
    chefOnly     : Boolean
  ) returns Meals;
}
