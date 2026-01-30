"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const headers_helper_1 = require("../../src/apis/headers-helper");
const coreUtils = __importStar(require("../../src/utils/core-utils"));
describe("index-headers-helper", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("getDestinationHeaders", () => {
        it("return headers without a change when the environment is application studio", () => {
            sinon_1.default.stub(coreUtils, "isAppStudio").returns(true);
            const headers = {
                "Content-Type": "application/json",
            };
            const expectedHeaders = {
                "Content-Type": "application/json",
            };
            (0, chai_1.expect)((0, headers_helper_1.addJwtHeader)(headers)).deep.equals(expectedHeaders);
        });
        it("return headers with JWT_VALUE when the environment is not application studio", () => {
            sinon_1.default.stub(coreUtils, "isAppStudio").returns(false);
            sinon_1.default.stub(coreUtils, "getEnvValue").returns("H2O_JWT_VALUE");
            const headers = {
                "Content-Type": "application/json",
            };
            const expectedHeaders = {
                "Content-Type": "application/json",
                "x-approuter-authorization": `Bearer H2O_JWT_VALUE`,
            };
            (0, chai_1.expect)((0, headers_helper_1.addJwtHeader)(headers)).deep.equals(expectedHeaders);
        });
        it("throw exception when the environment is not is not application studio and the the H2O_JWT environement variable is missing", () => {
            (0, chai_1.expect)(() => {
                const headers = {
                    "Content-Type": "application/json",
                };
                (0, chai_1.expect)((0, headers_helper_1.addJwtHeader)(headers)).deep.equals({});
            }).to.throw(Error, `The H2O_JWT environment variable is missing.`);
        });
    });
});
//# sourceMappingURL=headers-helper.spec.js.map