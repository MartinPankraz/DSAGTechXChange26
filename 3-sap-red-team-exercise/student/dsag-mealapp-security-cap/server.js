/*
  server.js
  ---------
  CAP startet standardmäßig einen Express-Server.

  Warum gibt es diese Datei?
  - Wir wollen in einem Full-Stack Training *ohne* Approuter starten können.
  - Daher serven wir die UI5 Freestyle App als statische Dateien direkt aus dem CAP Server.
  - UI und OData Service laufen damit unter *derselben Origin* (Port 4004) -> kein CORS / Proxy nötig.

  Hinweis:
  - Das ist für Trainingszwecke super praktisch.
  - In produktiven Setups würde man oft einen Approuter / Managed Approuter nutzen.
*/

const cds = require('@sap/cds');
const express = require('express');
const path = require('path');

// UI5 App (Freestyle) statisch ausliefern
cds.on('bootstrap', (app) => {
  const uiPath = path.join(__dirname, 'app', 'mealapp-ui', 'webapp');

  // 1) Statische Files (index.html, Component.js, controller/, view/, ...)
  app.use('/', express.static(uiPath));

  // 2) Komfort: '/' -> index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(uiPath, 'index.html'));
  });
});

module.exports = cds.server;
