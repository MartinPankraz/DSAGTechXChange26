"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const index_1 = require("../../src/index");
const { getEnvValue } = index_1.core;
describe("index-core-get-env-value", () => {
    describe("getEnvValue", () => {
        afterEach(() => {
            sinon_1.default.restore();
        });
        it("return the environment varaiable value for the given name", () => {
            const ENV_VAR_NAME = "ENV_VAR_NAME";
            (0, bas_sdk_sinon_helper_1.stubEnv)({ ENV_VAR_NAME: ENV_VAR_NAME });
            (0, chai_1.expect)(getEnvValue("ENV_VAR_NAME")).equals(ENV_VAR_NAME);
        });
        it("throw error when env variable does not exist", async () => {
            (0, chai_1.expect)(() => {
                getEnvValue("_ENV_DUMMY_");
            }).to.throw(Error, `The _ENV_DUMMY_ environment variable is missing.`);
        });
    });
});
//# sourceMappingURL=get-env-value.spec.js.map