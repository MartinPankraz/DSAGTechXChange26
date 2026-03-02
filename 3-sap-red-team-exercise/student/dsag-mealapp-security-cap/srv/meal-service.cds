using { dsag.mealapp as my } from '../db/schema';

/**
 * MealService
 * ----------
 * OData V4 Service, consumed by the SAPUI5 Freestyle app.
 *
 * Endpoint (default CAP prefix):
 *   /odata/v4/meal/
 *
 * Security Training Note:
 * - In der Baseline ist absichtlich *keine* Authentifizierung/Autorisierung aktiviert.
 * - In späteren Schritten kann man @restrict Regeln ergänzen und mocked/jwt auth aktivieren.
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
}
