// srv/employee-service.js
// Sample CAP service implementation for demo purposes.
// This file deliberately lacks audit logging so the MCP server can detect and suggest it.

"use strict";

const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {

  // ── READ: Fetch employees ─────────────────────────────────────────────────
  // Missing: AUDIT_LOG for personal data access (GDPR Art. 30)
  this.on("READ", "Employees", async (req) => {
    const employees = await SELECT.from("Employees").where(req.query.SELECT.where ?? {});
    return employees;
  });

  // ── CREATE: Add a new employee ────────────────────────────────────────────
  // Missing: AUDIT_LOG for personal data creation
  this.on("CREATE", "Employees", async (req) => {
    const data = req.data;
    const result = await INSERT.into("Employees").entries(data);
    return result;
  });

  // ── UPDATE: Modify employee record ────────────────────────────────────────
  // Missing: AUDIT_LOG for personal data mutation
  this.on("UPDATE", "Employees", async (req) => {
    const { ID, ...changes } = req.data;
    await UPDATE("Employees").set(changes).where({ ID });
    return req.data;
  });

  // ── DELETE: Remove employee record ────────────────────────────────────────
  // Missing: AUDIT_LOG (HIGH) for data deletion
  this.on("DELETE", "Employees", async (req) => {
    const [id] = req.params;
    await DELETE.from("Employees").where({ ID: id });
  });

  // ── EXPORT: Download employee data ────────────────────────────────────────
  // Missing: AUDIT_LOG (HIGH) for data export/download
  this.on("exportEmployees", async (req) => {
    const allEmployees = await SELECT.from("Employees");
    // Return as CSV (simplified)
    return allEmployees.map((e) => `${e.ID},${e.name},${e.department}`).join("\n");
  });

  // ── Role change action ─────────────────────────────────────────────────────
  // Missing: AUDIT_LOG (HIGH) for authorization change
  this.on("assignRole", async (req) => {
    const { employeeId, role } = req.data;
    await UPDATE("Employees").set({ role }).where({ ID: employeeId });
    return { success: true };
  });

  // ── Error handler (no logging) ─────────────────────────────────────────────
  this.on("error", (err, req) => {
    // Missing: APP_LOG for error visibility
    try {
      throw err;
    } catch (e) {
      // Swallowed silently – should at least log to cds.log
    }
  });
});
