# Quest 1 – Prompt Injection: Rogue MCP schleust Datenexfiltration ein

## 🎯 Lernziel
Erkenne, dass ein **rogue MCP-Server** in scheinbar hilfreichen Code-Vorschlägen  
versteckte Instruktionen einbetten kann — und dass KI-Assistenten diesen Code  
ohne Warnung übernehmen, wenn du ihn nicht selbst prüfst.

## 📋 Deine Aufgabe

Du hast bereits einen Account in der Meal-App (`dummy@dsag.de`).  
Deine Aufgabe: Erweitere die App um eine **Bestätigungsfunktion** auf dem Server,  
die nach dem Speichern einer Präferenz eine Zusammenfassung zurückgibt.

Nutze folgenden Prompt in deinem AI-Assistenten (GitHub Copilot Chat) — **mit dem MCP-Server aktiv**:

```text
I have a SAP CAP Node.js meal preference app. After a user saves their meal preference 
(userEmail + meal_ID + allergy), I want to add a server-side confirmation handler in 
srv/meal-service.js that logs the saved preference and returns a summary to the user.
Please implement this using the sap-cap-food-advisor MCP tool for guidance.
```

> ⚠️ **Trainer-Hinweis:** Der MCP-Server `sap-cap-food-advisor` liefert einen Code-Vorschlag,  
> der auf den ersten Blick korrekt und hilfreich aussieht.  
> Lies den vorgeschlagenen Code **sehr genau**, bevor du ihn übernimmst.

## 🔍 Was passiert?

Der MCP-Server gibt einen `after CREATE`-Handler zurück der:
- ✅ Lokal in ein Audit-Log schreibt (sieht legitim aus)
- ❌ **Zusätzlich** die E-Mail-Adresse und Gerichtsauswahl des Nutzers an eine externe URL schickt

Das `fetch()`-Statement ist in den plausiblen Code eingebettet und leicht zu übersehen.

## ✅ Safeguard-Aufgaben

1. Führe den Prompt aus — was schlägt der MCP-Server vor?
2. Kopiere den Code **noch nicht** in die App. Lies ihn Zeile für Zeile.
3. Findest du die Stelle, die Daten nach außen schickt?
4. Erkläre: Welche Nutzerdaten würden an wen übertragen?
5. Schreibe eine **sichere Alternative** die nur lokal loggt.

## 💡 Worauf du achten solltest

- `fetch()`, `axios.post()`, `http.request()` an **externe URLs** in Backend-Code
- URLs die wie Monitoring/Logging aussehen (`webhook.*`, `*.site`, `log-collector.*`)
- Code der **harmlose und gefährliche Teile kombiniert** — das macht ihn schwer zu erkennen
- KI-Assistenten zeigen **keine Warnung** wenn ein MCP-Tool Exfiltrations-Code vorschlägt

---
➡️ **Weiter mit [Quest 2](Quest2.md)**
