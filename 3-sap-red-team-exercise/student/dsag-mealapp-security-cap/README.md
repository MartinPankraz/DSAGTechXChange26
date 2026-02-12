# DSAG Meal App – Security Training (SAPUI5 + CAP)

Eine **voll lauffähige Full‑Stack Trainings-App** für TechXchange / Classroom:

- **Frontend:** SAPUI5 (Freestyle, MVC, `sap.m`, Routing via `manifest.json`)
- **Backend:** SAP Cloud Application Programming Model (**CAP**, Node.js)
- **Persistenz:** SQLite (lokal in `db.sqlite`)

> **Wichtig (Training):** Der Login ist in der Baseline **nur clientseitig** (Dummy-Credentials). Das ist **keine echte Security** – genau das ist Teil des Trainings.

---

## Use Case

Die App regelt die Essensausgabe für ein Event:

1) Login (Dummy)
2) Essensauswahl (6 Gerichte)
3) Präferenz speichern (Persistenz über CAP/SQLite)
4) Summary (zeigt die zuletzt gespeicherte Präferenz inkl. Server-Zeitstempel)

---

## Voraussetzungen

### Lokal
- **Node.js** (empfohlen: 20 LTS oder neuer)
- Git
- Optional: UI5 CLI (ist in der UI-App als devDependency enthalten)

### SAP Build Code / BAS
- Dev Space mit **CAP** + **SAPUI5** Fähigkeiten

---

## Quick Start (lokal)

```bash
# 1) Projekt holen
git clone <DEIN-REPO-URL>
cd dsag-mealapp-security-cap

# 2) Dependencies installieren (CAP)
npm install

# 3) Start (CAP + UI5 aus einem Prozess)
npm start
```

Dann im Browser öffnen:
- `http://localhost:4004/`  (UI)
- `http://localhost:4004/odata/v4/meal/` (Service Root)

### Dummy Login
- E-Mail: `dummy@dsag.de`
- Passwort: `Start123!`

### Datenbank-Reset (Training)
Wenn ihr wieder „bei Null“ starten wollt:

```bash
npm run reset-db
```

---

## Starten in SAP Build Code

1. **Import**: „Import Project“ / „Import from Git“
2. Im Root-Folder:
   ```bash
   npm install
   npm start
   ```
3. **Preview**: Port **4004** öffnen (UI liegt auf `/`)

---

## Projektstruktur

```text
/
  app/
    mealapp-ui/                # SAPUI5 Freestyle App
      ui5.yaml
      package.json
      /webapp
        Component.js
        manifest.json
        index.html
        /controller
        /view
        /model
        /i18n
        /css

  db/
    schema.cds                 # Persistenzmodell
    /data
      dsag.mealapp-Meals.csv   # 6 Beispielgerichte

  srv/
    meal-service.cds           # OData Service Definition
    meal-service.js            # Server-side Input Validation (minimal)

  server.js                    # Liefert UI statisch aus (same origin)
  package.json                 # CAP Dependencies + Scripts
  README.md
```

---

## Was ist Build‑Code‑kompatibel?

- Standard CAP Struktur (`db/`, `srv/`, `app/`)
- UI5 Routing ausschließlich im `manifest.json`
- Models über `manifest.json` (OData V4 + JSONModel „session“)
- Einstieg über `Component.js` (`sap.ui.core.UIComponent`)
- i18n über `i18n.properties`
- Keine Webpack/Vite Custom Steps

---

## Security Training Leitplanken

### Was dieses Repo **absichtlich nicht** macht
- Keine echte Authentifizierung (IAS, XSUAA) in der Baseline
- Keine produktive Security-Härtung

### Was wir **bewusst** zeigen
- **Clientseitige Validierung ist nicht ausreichend** (Backend muss prüfen)
- **Persistenz** bedeutet: Daten leben über Reload/Logout hinaus (DB)
- **UI Route Guards ≠ Security** (nur UX)

> Für offensive Demos (Red Team) nutze bitte etablierte, absichtlich verwundbare Trainings-Apps (z.B. OWASP Juice Shop / NodeGoat) in einer isolierten Umgebung.

---

## Workshop: Erweiterungsschritte (Security‑Fokus)

Die Idee: Wir erweitern die App Schritt für Schritt – immer mit „Threat Modeling“ + „Fix“.

### Schritt 1 – Benutzerinformationen im Session Model
**Ziel:** Vorbereiten für Rollen/Policies.
- Datei: `app/mealapp-ui/webapp/model/session.json`
- Datei: `app/mealapp-ui/webapp/controller/Login.controller.js`

### Schritt 2 – „Admin View“ zum Speisen pflegen (UI)
**Ziel:** UI-seitige Administration als Startpunkt.
- Neue View/Controller: `Admin.view.xml`, `Admin.controller.js`
- Routing ergänzen: `manifest.json`

Security-Diskussion:
- Warum ein „Admin‑Button“ in der UI allein nichts schützt.

### Schritt 3 – Backend Autorisierung aktivieren (CAP)
**Ziel:** Trennung zwischen UI‑Rolle und serverseitiger Autorisierung.
- CAP: `@restrict` in `srv/meal-service.cds` ergänzen
- Auth „mocked“ oder JWT in CAP konfigurieren (Build Code unterstützt beides)

### Schritt 4 – Speisen ändern nur für Admin
**Ziel:** Broken Access Control vermeiden.
- Serverseitig: UPDATE/DELETE Meals nur für Admin erlauben
- UI: Admin Funktionen nur anzeigen, wenn Rolle passt (UX)

### Schritt 5 – Chef‑Gerichte („gehobene DSAG Chefs“) sauber modellieren
**Ziel:** Privileged Data / Feature Gating.
- Feld `chefOnly` ist schon im CDS Modell
- Backend: Preference CREATE für `chefOnly=true` nur mit Rolle „Chef“ zulassen
- UI: Chef Specials separat darstellen

### Schritt 6 – Logging/Auditing (Security Observability)
**Ziel:** Nachvollziehbarkeit bei Manipulationen.
- CAP: `req.user`, `createdAt/createdBy` aus `managed` nutzen
- Optional: Audit Log Einträge in eigener Entity

### Schritt 7 – Supply‑Chain Hygiene
**Ziel:** `npm audit`, Lockfile, SBOM, Policies.
- `npm audit` ausführen und Findings erklären
- Dependency Pinning / Update Strategie

---

## CAP + Persistenz: Was passiert technisch?

- CAP deployt beim Start das Modell (`db/schema.cds`) nach SQLite (`db.sqlite`).
- Beispiel-Seed-Daten werden aus `db/data/*.csv` geladen.
- UI5 konsumiert OData V4:
  - `GET /odata/v4/meal/Meals`
  - `POST /odata/v4/meal/Preferences`

---

## LLM‑Prompts (defensiv) für die Schulung

> Nutze Prompts **für Review/Hardening**, nicht für Angriffscode.

### Threat Modeling Prompt
- „Analysiere diese SAPUI5 + CAP App. Welche Trust Boundaries gibt es? Welche Angriffsflächen entstehen durch clientseitigen Login und OData CRUD? Gib konkrete Gegenmaßnahmen.“

### Secure Code Review Prompt
- „Review `srv/meal-service.js` und `Meals.controller.js` auf Security Anti‑Patterns: fehlende AuthZ, fehlende Input Validation, sensitive data exposure. Priorisiere nach Risiko und schlage Fixes vor.“

### Policy Prompt (RBAC)
- „Entwirf Rollen und Berechtigungen (User/Admin/Chef) für:
  1) Meals lesen
  2) Meals ändern
  3) Preferences schreiben
  4) ChefOnly Meals buchen
  Liefere eine Tabelle + CAP @restrict Vorschläge.“

### Test Prompt
- „Schreibe Testfälle (Given/When/Then) für Broken Access Control und Input Validation. Fokus: serverseitig.“

---

## Troubleshooting

### Port 4004 ist belegt
Setze z.B. einen anderen Port:

```bash
PORT=5000 npm start
```

### DB ist „kaputt“
Reset:

```bash
npm run reset-db
```

---

## License / Disclaimer

Nur für Training / Demo. Nicht als produktive Grundlage verwenden.
