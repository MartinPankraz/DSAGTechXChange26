"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../../src/index");
const { runCommand } = index_1.core;
describe("index-core-runCommand", () => {
    describe("runCommand", () => {
        it("return the string of the command executed", async () => {
            const res = await runCommand("node", ["--version"]); // Run node version
            const isVersion = /^^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(res); // Check that the result is a valid version (example - v15.5.2)
            (0, chai_1.expect)(isVersion).to.be.true;
        });
        it("throw error when command does not exist", async () => {
            await (0, chai_1.expect)(runCommand("cmd_fake", [])).to.be.rejectedWith("spawn cmd_fake ENOENT");
        });
        it("throw error when command fails", async () => {
            await (0, chai_1.expect)(runCommand("node", ["--a"])).to.be.rejectedWith();
        });
    });
});
//# sourceMappingURL=run-command.spec.js.map