"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../../src/index");
const { isAppStudio } = index_1.core;
describe("index-core-is-app-studio", () => {
    describe("isAppStudio", () => {
        it("return false when WS_BASE_URL is not defined", async () => {
            (0, chai_1.expect)(await isAppStudio()).to.equals(false);
        });
    });
});
//# sourceMappingURL=is-app-studio.spec.js.map