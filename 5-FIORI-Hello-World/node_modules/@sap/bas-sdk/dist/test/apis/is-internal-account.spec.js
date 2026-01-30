"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const index_1 = require("../../src/index");
const { isInternalAccount } = index_1.core;
describe("is-internal-account", () => {
    describe("isInternalAccount", () => {
        afterEach(() => {
            sinon_1.default.restore();
        });
        it("return false when the H2O_URL env value not includes the INTERNAL_ACCOUNT_PREFIX", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: "fake" });
            (0, chai_1.expect)(isInternalAccount()).to.be.false;
        });
        it("throw error when env variable does not exist", async () => {
            const ENV_VAR_NAME_VALUE = "asdasdasdas/int.applicationstudio.cloud.sap/dasasdsad";
            (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: ENV_VAR_NAME_VALUE });
            (0, chai_1.expect)(isInternalAccount()).to.be.true;
        });
    });
});
//# sourceMappingURL=is-internal-account.spec.js.map