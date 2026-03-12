namespace dsag.mealapp;

using { cuid, managed } from '@sap/cds/common';

/**
 * Meals
 * -----
 * Stammdaten: der Speisekatalog.
 *
 * Security Training Note:
 * - Stammdatenänderungen (CREATE/UPDATE/DELETE) müssen später serverseitig geschützt werden
 *   (z.B. nur Admin darf Speisen anpassen).
 */
entity Meals : cuid, managed {
  name     : String(80);
  category : String(20);   // Vegan | Vegetarisch | Nicht-vegetarisch

  // Admin Upload: Bilddaten (Base64) + Mime-Type
  imageData     : LargeString;
  imageMimeType : String(50);

  // Für spätere Workshop-Schritte (Chef Specials / privilegierte Gerichte)
  chefOnly : Boolean default false;
}

/**
 * Preferences
 * ----------
 * Transaktionsdaten: welche Nutzer welches Gericht gewählt haben.
 *
 * Hier bewusst als Log (mehrere Einträge pro User möglich), um Persistenz gut sichtbar zu machen.
 * In einem späteren Schritt könnte man auf "1 Preference pro User" umbauen oder History/Days einführen.
 */
@PersonalData: { EntitySemantics: 'DataSubject', DataSubjectRole: 'MealUser' }
entity Preferences : cuid, managed {
  @PersonalData.FieldSemantics: 'DataSubjectID'
  userEmail : String(255);
  meal      : Association to Meals;
  @PersonalData.IsPotentiallyPersonal
  allergy   : String(255); // Optional Allergien-Info
}
