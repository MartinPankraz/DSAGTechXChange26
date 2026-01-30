"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const core_utils_1 = require("../../src/utils/core-utils");
describe("index-core-utils", () => {
    const WS_BASE_URL = "WS-BASE-VALUE";
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("isAppStudio", () => {
        it("return true when WS_BASE_URL is defined", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ WS_BASE_URL: WS_BASE_URL });
            (0, chai_1.expect)((0, core_utils_1.isAppStudio)()).equals(true);
        });
        it("return false when WS_BASE_URL is empty", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ WS_BASE_URL: "" });
            (0, chai_1.expect)((0, core_utils_1.isAppStudio)()).equals(false);
        });
        it("return false when WS_BASE_URL is not defined", () => {
            (0, chai_1.expect)((0, core_utils_1.isAppStudio)()).equals(false);
        });
    });
    describe("validDevPlatform()", () => {
        it("succ when the devplatform is Buisness Application Studio", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ WS_BASE_URL: WS_BASE_URL });
            (0, core_utils_1.validDevPlatform)("mynamespace.myFunction");
        });
        it("failed when the dev-platform is not Buisness Application Studio", () => {
            (0, chai_1.expect)(() => {
                (0, core_utils_1.validDevPlatform)("mynamespace.myFunction");
            }).to.throw(Error, `The 'mynamespace.myFunction' API is supported only in Buisness Application Studio environment`);
        });
    });
    describe("getEnvValue()", () => {
        it("return the environment varaiable value for the given name", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ WS_BASE_URL: WS_BASE_URL });
            (0, chai_1.expect)((0, core_utils_1.getEnvValue)("WS_BASE_URL")).equals(WS_BASE_URL);
        });
        it("throw exception when the environment varaiable not defined", () => {
            (0, chai_1.expect)(() => {
                (0, core_utils_1.getEnvValue)("_ENV_DUMMY_");
            }).to.throw(Error, `The _ENV_DUMMY_ environment variable is missing.`);
        });
    });
    describe("getExtLoginPath()", () => {
        it("return the url of the 'external login' page according to the specified landscape", () => {
            const landscapeUrl = "https://landscape.com";
            (0, chai_1.expect)((0, core_utils_1.getExtLoginPath)(landscapeUrl)).to.contain("https://landscape.com/ext-login.html?cb=");
        });
        it("return the url of the 'external login' page, which is using the vscode protocol push login", () => {
            const landscapeUrl = "https://landscape.com";
            (0, chai_1.expect)((0, core_utils_1.getExtLoginPath)(landscapeUrl, true)).to.contain("https://landscape.com/remote-login.html?cb=");
        });
        it("should throw exception while composing 'external login' when landscape is empty", () => {
            const landscapeUrl = "";
            try {
                (0, core_utils_1.getExtLoginPath)(landscapeUrl);
            }
            catch (err) {
                if (err instanceof Error) {
                    (0, chai_1.expect)(err.toString()).to.contain("Invalid URL");
                }
            }
        });
    });
});
//# sourceMappingURL=core-utils.spec.js.map