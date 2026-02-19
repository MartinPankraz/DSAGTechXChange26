/*
  Reset der lokalen SQLite DB.

  Warum als Script?
  - Für Trainings ist es praktisch, jederzeit wieder „bei Null“ zu starten.
  - Wir löschen *nur* die lokale Datei db.sqlite und deployen das Modell neu.

  Achtung:
  - Das löscht alle gespeicherten Präferenzen.
*/

const fs = require('fs');
const { execSync } = require('child_process');

const DB_FILE = 'db.sqlite';

if (fs.existsSync(DB_FILE)) {
  fs.rmSync(DB_FILE);
  console.log(`[reset-db] Deleted ${DB_FILE}`);
} else {
  console.log(`[reset-db] ${DB_FILE} does not exist – nothing to delete`);
}

console.log('[reset-db] Deploying CDS model to SQLite...');
execSync('npx cds deploy --to sqlite:db.sqlite', { stdio: 'inherit' });

console.log('[reset-db] Done.');
