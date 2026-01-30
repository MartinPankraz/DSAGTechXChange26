"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const jwt_helper_1 = require("../../src/apis/jwt-helper");
describe("jwt helpers", () => {
    const dummyToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo";
    const dummyNoExpToken = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImlhdCI6MTcyODY3NTM1NX0.6plE3Za2OY6AaRVrci-jxhrzERNvgXUWfGB5pPp0-tU";
    describe("timeUntilJwtExpires", () => {
        it("timeUntilJwtExpires, expired", () => {
            const jwt = dummyToken;
            (0, chai_1.expect)((0, jwt_helper_1.timeUntilJwtExpires)(jwt)).to.be.lt(0);
        });
        it("timeUntilJwtExpires, `exp` not defined", () => {
            const jwt = dummyNoExpToken;
            (0, chai_1.expect)((0, jwt_helper_1.timeUntilJwtExpires)(jwt)).to.be.lt(0);
        });
        it("isJwtExpires be truly", () => {
            const jwt = dummyToken;
            (0, chai_1.expect)((0, jwt_helper_1.isJwtExpired)(jwt)).to.be.true;
        });
    });
});
//# sourceMappingURL=jwt-helpers.spec.js.map