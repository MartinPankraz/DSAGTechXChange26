const cds = require('@sap/cds');

module.exports = class LunchService extends cds.ApplicationService {

  async init() {

    // OData handler bleibt
    this.on('searchMenuItems', async (req) => {
      const { query } = req.data;
      const db = await cds.connect.to('db');
      const result = await db.run(
        `SELECT * FROM sap_lunch_MenuItems WHERE name LIKE '%${query}%'`
      );
      return result;
    });

    // INTENTIONALLY VULNERABLE REST endpoint – Security Training Demo
    const app = await cds.app;
    app.get('/api/search', async (req, res) => {
      const query = req.query.q || '';
      const db = await cds.connect.to('db');
      // ❌ Anti-pattern: user input directly in SQL string
      const result = await db.run(
        `SELECT * FROM sap_lunch_MenuItems WHERE name LIKE '%${query}%'`
      );
      res.json(result);
    });

    return super.init();
  }

};