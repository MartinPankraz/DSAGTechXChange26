"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const chai_1 = require("chai");
const assert_1 = require("assert");
const getOpenProjectInVSCodeURI = index_1.core.getOpenProjectInVSCodeURI;
describe("index-get-open-project-in-code-uri", () => {
    it("should generate the correct URI with provided parameters", () => {
        const landscapeUrl = "https://example.com";
        const wsId = "workspaces-ws-jtrdw";
        const folderPath = "/path/to/folder";
        const expectedURI = `vscode://SAPOSS.app-studio-toolkit/open?landscape=example.com&devspaceid=ws-jtrdw&folderpath=${folderPath}`;
        const actualURI = getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
        (0, chai_1.expect)(actualURI).to.equal(expectedURI);
    });
    it("should generate the correct URI with provided parameters assuming workspace id has no workspace prefix", () => {
        const landscapeUrl = "https://example.com";
        const wsId = "ws-jtrdw";
        const folderPath = "/path/to/folder";
        const expectedURI = `vscode://SAPOSS.app-studio-toolkit/open?landscape=example.com&devspaceid=ws-jtrdw&folderpath=${folderPath}`;
        const actualURI = getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
        (0, chai_1.expect)(actualURI).to.equal(expectedURI);
    });
    it("should handle empty landscapeUrl parameter", () => {
        const landscapeUrl = "";
        const wsId = "workspaces-ws-jtrdw";
        const folderPath = "/path/to/folder";
        try {
            getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
            (0, assert_1.fail)("should fail");
        }
        catch (e) {
            (0, chai_1.expect)(e).to.exist;
        }
    });
    it("should handle invalid landscapeUrl parameter", () => {
        const landscapeUrl = "http://";
        const wsId = "workspaces-ws-jtrdw";
        const folderPath = "/path/to/folder";
        try {
            getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
            (0, assert_1.fail)("should fail");
        }
        catch (e) {
            (0, chai_1.expect)(e).to.exist;
        }
    });
    it("should handle empty wsId parameter", () => {
        const landscapeUrl = "https://example.com";
        const wsId = "";
        const folderPath = "/path/to/folder";
        try {
            getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
            (0, assert_1.fail)("should fail");
        }
        catch (e) {
            (0, chai_1.expect)(e).to.exist;
        }
    });
    it("should handle empty folderPath parameter", () => {
        const landscapeUrl = "https://example.com";
        const wsId = "workspaces-ws-jtrdw";
        const folderPath = "";
        try {
            getOpenProjectInVSCodeURI(landscapeUrl, wsId, folderPath);
            (0, assert_1.fail)("should fail");
        }
        catch (e) {
            (0, chai_1.expect)(e).to.exist;
        }
    });
});
//# sourceMappingURL=get-open-project-in-vscode-uri.spec.js.map