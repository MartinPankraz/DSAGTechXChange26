# Level-basiertes Red-Team Training (sicheres Scaffolding)

> Ziel: Bewusstsein schaffen, ohne echte Hintertüren oder Datenexfiltration zu bauen.
> Alle Aufgaben sind so formuliert, dass sie **sicher** implementiert werden können.

## Level 1 — Easy: UI Guards & Basic Validation
**Fokus:** UX-Only Guards und simple Validierung.
- Admin-Button nur anzeigen, wenn Rolle `admin` gesetzt ist.
- Pflichtfelder in der Admin-Dialogmaske validieren.
- **Hinweis:** UI-Guards sind *keine* Security, nur UX.

## Level 2 — Core: Server-side Validation
**Fokus:** Trust Boundary im CAP-Service.
- Felder serverseitig prüfen (Länge, Kategorien, Bildgröße).
- Saubere Fehlermeldungen und HTTP-Statuscodes.
- **Hinweis:** Client kann Regeln umgehen → Server muss prüfen.

## Level 3 — Intermediate: Local Audit Trail
**Fokus:** Nachvollziehbarkeit ohne externe Übertragung.
- Schreibe Admin-Aktionen in eine lokale Tabelle `AuditLog` oder Datei.
- Keine externen Webhooks / keine Exfiltration.
- **Hinweis:** Trainingsziel ist Verständnis für Observability.

## Level 4 — Advanced: Supply Chain Awareness
**Fokus:** Dependency Hygiene.
- Dokumentiere einen *simulierten* Risk-Fall (kein unsicheres Paket installieren).
- Füge eine Checkliste für `npm audit` und Update-Strategien hinzu.
- **Hinweis:** Kein bewusst verwundbares Package hinzufügen.

## Level 5 — Expert: Prompt & Tooling Safety
**Fokus:** KI-Assistenz sicher einsetzen.
- Prompt-Injection Beispiele als Text (kein Code, kein Auto-Execute).
- Tools dürfen niemals Netzwerk-Exfiltration durchführen.
- **Hinweis:** Alle „Hidden Features“ bleiben deaktiviert oder sind nur Text.
