"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const index_1 = require("../../src/index");
const { getCFEndpoint } = index_1.cfendpoint;
describe("index-get-cf-endpoint", () => {
    describe("cfendpoint", () => {
        it("environment variables does not exist - should return empty string", async () => {
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("");
        });
        it("TENANT_LANDSCAPE_LABEL variable is empty, CF_API_ENDPOINT does not exist - should return empty string", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("");
        });
        it("TENANT_LANDSCAPE_LABEL variable is empty, CF_API_ENDPOINT exists - should return CF_API_ENDPOINT", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "" });
            (0, bas_sdk_sinon_helper_1.stubEnv)({ CF_API_ENDPOINT: "https://api.cf.sap.hana.ondemand.com" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.sap.hana.ondemand.com");
        });
        it("TENANT_LANDSCAPE_LABEL variable is n/a, CF_API_ENDPOINT exists - should return CF_API_ENDPOINT", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "n/a" });
            (0, bas_sdk_sinon_helper_1.stubEnv)({ CF_API_ENDPOINT: "https://api.cf.sap.hana.ondemand.com" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.sap.hana.ondemand.com");
        });
        it("canary region - should return sap endpoint", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "cf-eu10-canary" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.sap.hana.ondemand.com");
        });
        it("prod region - should return eu10 in the endpoint", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "cf-eu10" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.eu10.hana.ondemand.com");
        });
        it("prod region - with sufix after the eu10 in the endpoint", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "cf-eu10-002" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.eu10-002.hana.ondemand.com");
        });
        it("prod region - with sufix after the eu10 in the endpoint", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "cf-us10-002-hotfix" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.us10-002-hotfix.hanavlab.ondemand.com");
        });
        it("prod region - with sufix after the eu10 in the endpoint", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ TENANT_LANDSCAPE_LABEL: "cf-us10-hotfix" });
            const res = await getCFEndpoint();
            (0, chai_1.expect)(res).to.be.equals("https://api.cf.hotfixaws.hanavlab.ondemand.com");
        });
    });
});
//# sourceMappingURL=get-cf-endpoint.spec.js.map