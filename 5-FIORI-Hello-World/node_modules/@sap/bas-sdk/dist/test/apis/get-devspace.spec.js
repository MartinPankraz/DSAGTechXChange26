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
const axios_1 = __importDefault(require("axios"));
const proxyquire_1 = __importDefault(require("proxyquire"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const get_devspace_1 = require("../../src/apis/get-devspace");
const generatorsInstallationStatus = __importStar(require("../../src/apis/get-generators-installation-status"));
const devspaceUtils = __importStar(require("../../src/utils/devspace-utils"));
const sinon_1 = __importDefault(require("sinon"));
describe("get-devspace module scope", () => {
    describe("Test for getDevspaceInfo()", () => {
        let mockAxios;
        const getMockResponse = () => ({
            devSpaceOriginLabel: "dev_space_origin_label",
            config: {
                id: "ws-anyw",
                username: "mail@me.net",
                labels: {
                    controllerID: "workspace-controller-1-23456789-987654",
                    "workspace.devx.sap.com/persistence-pvc": "true",
                    "ws-manager.devx.sap.com/deleted": "false",
                    "ws-manager.devx.sap.com/displayname": "dev_space_name",
                    "ws-manager.devx.sap.com/origin": "0a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e ",
                    "ws-manager.devx.sap.com/providerTenantId": "0a1b2c3d-1a2b-9876-a1b2-9f8e7d6c5b4a",
                    "ws-manager.devx.sap.com/username": "a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
                    "ws-manager.devx.sap.com/zoneid": "98765432-abcd-1234-fedc-01234567890a",
                    "ws-manager.devx.sap.com/LCAP": "LCAP",
                },
                annotations: {
                    optionalExtensions: "[]",
                    pack: devspaceUtils.PackName.BASIC,
                    packTagline: "Basic Tag Line",
                    technicalExtensions: "['one/one','two/two','and-three/and-three']",
                    "workspace.devx.sap.com/lastOnlineTime": "2022-09-02T17:03:20Z",
                    "workspace.devx.sap.com/ownerFullName": "First Last",
                    "workspace.devx.sap.com/plan": "standard-edition",
                    "workspace.devx.sap.com/ws-controller-processed-gen": "22",
                    "ws-manager.devx.sap.com/startedAt": "2022-09-02T17:02:34Z",
                },
                creationtimestamp: "2022-09-02T17:02:34Z",
                encrypted: true,
            },
            runtime: {
                status: devspaceUtils.DevSpaceStatus.RUNNING,
                baseUrl: "https://any.host/",
                statusLastUpdateTime: "2022-09-02T17:33:01Z",
                statusLastUpdateGeneration: 12,
                backendReadiness: [
                    { name: "brOne", readiness: false },
                    { name: "brTwo", readiness: true },
                ],
            },
            diskusage: {
                used: 111111,
                free: 2222222,
                iused: 33333,
                ifree: 444444,
                timestamp: "2022-09-02T17:33:00.993856769Z",
            },
        });
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
        });
        it("Should return devspace info when options are not provided", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet("http://any.host.net/ws-manager/api/v1/workspace/ws-anyw")
                .reply(200, getMockResponse());
            // Test execution
            const devspaceInfo = await (0, get_devspace_1.getDevspaceInfo)();
            // Results check
            (0, chai_1.expect)(devspaceInfo).to.deep.equal({
                devspaceDisplayName: "dev_space_name",
                devspaceOrigin: "dev_space_origin_label",
                pack: devspaceUtils.PackName.BASIC,
                packDisplayName: "Basic Tag Line",
                id: "ws-anyw",
                optionalExtensions: "[]",
                technicalExtensions: "['one/one','two/two','and-three/and-three']",
                url: "https://any.host/",
                sshEnabled: false,
                status: devspaceUtils.DevSpaceStatus.RUNNING,
            });
        });
        it("Should return devspace info, origin name from 'ws-manager.devx.sap.com/LCAP'", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            const mockResponse = getMockResponse();
            delete mockResponse.devSpaceOriginLabel;
            mockAxios
                .onGet("http://any.host.net/ws-manager/api/v1/workspace/ws-anyw")
                .reply(200, mockResponse);
            // Test execution
            const devspaceInfo = await (0, get_devspace_1.getDevspaceInfo)();
            // Results check
            (0, chai_1.expect)(devspaceInfo).to.deep.equal({
                devspaceDisplayName: "dev_space_name",
                devspaceOrigin: "LCAP",
                pack: devspaceUtils.PackName.BASIC,
                packDisplayName: "Basic Tag Line",
                id: "ws-anyw",
                optionalExtensions: "[]",
                technicalExtensions: "['one/one','two/two','and-three/and-three']",
                url: "https://any.host/",
                sshEnabled: false,
                status: devspaceUtils.DevSpaceStatus.RUNNING,
            });
        });
        it("Should throw an error if HTTP call throws an error with details", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet("http://any.host.net/ws-manager/api/v1/workspace/ws-anyw")
                .networkError();
            try {
                // Test execution
                await (0, get_devspace_1.getDevspaceInfo)();
                chai_1.expect.fail("Call to function getDevspaceInfo() should have thrown error but did not.");
            }
            catch (error) {
                // Results check
                (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.toString().toLowerCase()).to.contain("network");
            }
        });
        it("Should throw an error if HTTP call throws an error without further details", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet("http://any.host.net/ws-manager/api/v1/workspace/ws-anyw")
                .reply(() => {
                throw "Error";
            });
            try {
                // Test execution
                await (0, get_devspace_1.getDevspaceInfo)();
                chai_1.expect.fail("Call to function getDevspaceInfo() should have thrown error but did not.");
            }
            catch (error) {
                // Results check
                (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.toString()).to.contain("ws-anyw");
            }
        });
        it("Should return devspace generators installation status completed", async () => {
            const devspaceUtilsProxy = (0, proxyquire_1.default)("../../src/utils/devspace-utils", {
                "fs-extra": {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- test
                    readJson: async (path) => {
                        return { InstallationCompleted: true };
                    },
                    "@noCallThru": true,
                },
                "@noCallThru": true,
            });
            const generatorsInstallationStatusProxy = (0, proxyquire_1.default)("../../src/apis/get-generators-installation-status", {
                "../utils/devspace-utils": devspaceUtilsProxy,
                "@noCallThru": true,
            });
            (0, chai_1.expect)(await generatorsInstallationStatusProxy.didBASGeneratorsFinishInstallation()).to.be.true;
        });
        it("Should return devspace generators installation status NOT completed", async () => {
            const devspaceUtilsProxy = (0, proxyquire_1.default)("../../src/utils/devspace-utils", {
                "fs-extra": {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- test
                    readJson: async (path) => {
                        return { InstallationCompleted: false };
                    },
                    "@noCallThru": true,
                },
                "@noCallThru": true,
            });
            const generatorsInstallationStatusProxy = (0, proxyquire_1.default)("../../src/apis/get-generators-installation-status", {
                "../utils/devspace-utils": devspaceUtilsProxy,
                "@noCallThru": true,
            });
            (0, chai_1.expect)(await generatorsInstallationStatusProxy.didBASGeneratorsFinishInstallation()).to.be.false;
        });
        it("Should throw an error when devspace generators installation file is NOT found", async () => {
            const filePath = "/extbin/extensionsInstallationCompletion/extensionsInstallationCompletion.json";
            try {
                await generatorsInstallationStatus.didBASGeneratorsFinishInstallation();
            }
            catch (error) {
                if (error instanceof Error) {
                    (0, chai_1.expect)(error.message).equals(`The ${filePath} file is missing.`);
                }
            }
        });
        it("Should return devspace info when options are provided", async () => {
            const options = {
                landscapeUrl: "http://any.host.net",
                jwt: "jwtjfsdkfsdl",
                wsId: "ws-12343",
            };
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet(`http://any.host.net/ws-manager/api/v1/workspace/${options.wsId}`)
                .reply(200, getMockResponse());
            // Test execution
            const devspaceInfo = await (0, get_devspace_1.getDevspaceInfo)(options);
            // Results check
            (0, chai_1.expect)(devspaceInfo).to.deep.equal({
                devspaceDisplayName: "dev_space_name",
                devspaceOrigin: "dev_space_origin_label",
                pack: devspaceUtils.PackName.BASIC,
                packDisplayName: "Basic Tag Line",
                id: "ws-anyw",
                optionalExtensions: "[]",
                technicalExtensions: "['one/one','two/two','and-three/and-three']",
                url: "https://any.host/",
                sshEnabled: false,
                status: devspaceUtils.DevSpaceStatus.RUNNING,
            });
        });
    });
    describe("Test for getDevSpaces()", () => {
        let mockAxios;
        const getMockResponse = () => [
            {
                devSpaceOriginLabel: "dev_space_origin_label",
                config: {
                    id: "ws-anyw",
                    username: "mail@me.net",
                    labels: {
                        controllerID: "workspace-controller-1-23456789-987654",
                        "workspace.devx.sap.com/persistence-pvc": "true",
                        "ws-manager.devx.sap.com/deleted": "false",
                        "ws-manager.devx.sap.com/displayname": "dev_space_name",
                        "ws-manager.devx.sap.com/origin": "0a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e ",
                        "ws-manager.devx.sap.com/providerTenantId": "0a1b2c3d-1a2b-9876-a1b2-9f8e7d6c5b4a",
                        "ws-manager.devx.sap.com/username": "a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
                        "ws-manager.devx.sap.com/zoneid": "98765432-abcd-1234-fedc-01234567890a",
                        "ws-manager.devx.sap.com/LCAP": "LCAP",
                    },
                    annotations: {
                        optionalExtensions: "[]",
                        pack: devspaceUtils.PackName.BASIC,
                        packTagline: "Basic Tag Line",
                        technicalExtensions: "['one/one','two/two','and-three/and-three']",
                        "workspace.devx.sap.com/lastOnlineTime": "2022-09-02T17:03:20Z",
                        "workspace.devx.sap.com/ownerFullName": "First Last",
                        "workspace.devx.sap.com/plan": "standard-edition",
                        "workspace.devx.sap.com/ws-controller-processed-gen": "22",
                        "ws-manager.devx.sap.com/startedAt": "2022-09-02T17:02:34Z",
                    },
                    creationtimestamp: "2022-09-02T17:02:34Z",
                    encrypted: true,
                },
                runtime: {
                    status: devspaceUtils.DevSpaceStatus.RUNNING,
                    baseUrl: "https://any.host/",
                    statusLastUpdateTime: "2022-09-02T17:33:01Z",
                    statusLastUpdateGeneration: 12,
                    backendReadiness: [
                        { name: "brOne", readiness: false },
                        { name: "brTwo", readiness: true },
                    ],
                },
                diskusage: {
                    used: 111111,
                    free: 2222222,
                    iused: 33333,
                    ifree: 444444,
                    timestamp: "2022-09-02T17:33:00.993856769Z",
                },
            },
            {
                devSpaceOriginLabel: "dev_space_origin_label2",
                config: {
                    id: "ws-anyw2",
                    username: "mail2@me.net",
                    labels: {
                        controllerID: "workspace-controller-1-23456789-987654",
                        "workspace.devx.sap.com/persistence-pvc": "true",
                        "ws-manager.devx.sap.com/deleted": "false",
                        "ws-manager.devx.sap.com/displayname": "dev_space_name",
                        "ws-manager.devx.sap.com/origin": "0a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e ",
                        "ws-manager.devx.sap.com/providerTenantId": "0a1b2c3d-1a2b-9876-a1b2-9f8e7d6c5b4a",
                        "ws-manager.devx.sap.com/username": "a1b2c3d4e5f6a7b8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
                        "ws-manager.devx.sap.com/zoneid": "98765432-abcd-1234-fedc-01234567890a",
                        "ws-manager.devx.sap.com/LCAP": "LCAP",
                    },
                    annotations: {
                        optionalExtensions: "[]",
                        pack: devspaceUtils.PackName.BASIC,
                        packTagline: "Basic Tag Line2",
                        technicalExtensions: "['one/one','two/two','and-three/and-three']",
                        "workspace.devx.sap.com/lastOnlineTime": "2022-09-02T17:03:20Z",
                        "workspace.devx.sap.com/ownerFullName": "First Last",
                        "workspace.devx.sap.com/plan": "standard-edition",
                        "workspace.devx.sap.com/ws-controller-processed-gen": "22",
                        "ws-manager.devx.sap.com/startedAt": "2022-09-02T17:02:34Z",
                    },
                    creationtimestamp: "2022-09-02T17:02:34Z",
                    encrypted: true,
                },
                runtime: {
                    status: devspaceUtils.DevSpaceStatus.RUNNING,
                    baseUrl: "https://any.host/",
                    statusLastUpdateTime: "2022-09-02T17:33:01Z",
                    statusLastUpdateGeneration: 12,
                    backendReadiness: [
                        { name: "brOne", readiness: false },
                        { name: "brTwo", readiness: true },
                    ],
                },
                diskusage: {
                    used: 111111,
                    free: 2222222,
                    iused: 33333,
                    ifree: 444444,
                    timestamp: "2022-09-02T17:33:00.993856769Z",
                },
            },
        ];
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
        });
        it("Should return list of dev spaces information", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet("http://any.host.net/ws-manager/api/v1/workspace")
                .reply(200, getMockResponse());
            // Test execution
            const devspaceInfo = await (0, get_devspace_1.getDevSpaces)("http://any.host.net", "jwtblabla");
            // Results check
            (0, chai_1.expect)(devspaceInfo).to.have.length(2);
            (0, chai_1.expect)(devspaceInfo[0]).to.deep.equal({
                devspaceDisplayName: "dev_space_name",
                devspaceOrigin: "dev_space_origin_label",
                pack: devspaceUtils.PackName.BASIC,
                packDisplayName: "Basic Tag Line",
                id: "ws-anyw",
                optionalExtensions: "[]",
                technicalExtensions: "['one/one','two/two','and-three/and-three']",
                url: "https://any.host/",
                sshEnabled: false,
                status: devspaceUtils.DevSpaceStatus.RUNNING,
            });
        });
    });
    describe("Test for deleteDevSpace()", () => {
        let mockAxios;
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
            sinon_1.default.restore();
        });
        it("Should delete a dev space successfully", async () => {
            const wsid = "ws-blabla";
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onDelete(`http://any.host.net/ws-manager/api/v1/workspace/${wsid}`)
                .reply(204);
            const onDeleteSpy = sinon_1.default.spy(devspaceUtils, "deleteDevSpace");
            // Test execution
            await (0, get_devspace_1.deleteDevSpace)("http://any.host.net", "jwtblabla", wsid);
            // Results check
            (0, chai_1.expect)(onDeleteSpy.called).to.be.true;
        });
    });
    describe("Test for updateDevSpace()", () => {
        let mockAxios;
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
            sinon_1.default.restore();
        });
        it("Should update a dev space successfully", async () => {
            const wsid = "ws-blabla";
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onPut(`http://any.host.net/ws-manager/api/v1/workspace/${wsid}`)
                .reply(204);
            const onUpdateDevSpaceSpy = sinon_1.default.spy(devspaceUtils, "updateDevSpace");
            // Test execution
            const devSpaceUpdate = {
                Suspended: true,
                WorkspaceDisplayName: "hello",
            };
            await (0, get_devspace_1.updateDevSpace)("http://any.host.net", "jwtblabla", wsid, devSpaceUpdate);
            // Results check
            (0, chai_1.expect)(onUpdateDevSpaceSpy.called).to.be.true;
        });
    });
    describe("Test for getDevSpacesSpec()", () => {
        let mockAxios;
        const getMockResponse = () => ({
            extensions: [
                {
                    name: "hana-tools",
                    namespace: "ext-hrtt-appstudio",
                    versions: [
                        {
                            version: "0.2.1-20220622070416+1c7ebb78a04247b827c26572f78f30e3c2b9c0fe",
                            extendedInfo: "",
                        },
                        {
                            version: "0.2.1-20220622083007+1c7ebb78a04247b827c26572f78f30e3c2b9c0fe",
                            extendedInfo: "",
                        },
                    ],
                    description: "Allows you to develop native SAP HANA applications. The extension includes tools such as enhanced graphical and text-based editors, project generators, and productivity tools.",
                    tagline: "SAP HANA Tools",
                    thumbnail: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOTBweCIgaGVpZ2h0PSI5MHB4IiB2aWV3Qm94PSIwIDAgOTAgOTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+U0FQIEhBTkEgVG9vbHM8L3RpdGxlPgogICAgPGcgaWQ9IlNBUC1IQU5BLVRvb2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTAuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC04Ij4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00Ni43MTI5MDk4LDQxLjczMTY1NzMgTDU5LDM0Ljg2MTQ2NzQgTDU5LDQ4LjcyNTg0MjMgTDQ2LjcxMjkwOTgsNTUuNzIwODgyNSBMNDYuNzEyOTA5OCw0MS43MzE2NTczIFogTTU5LDE2LjI4NzgzOTkgTDU5LDMwLjE0OTY0OTQgTDQ2LjcxMjkwOTgsMzcuMTQ1NTQ0NyBMNDYuNzEyOTA5OCwyMy4yNzYwMzkgTDM0LjQyOTQ1MDYsMTYuMjgwMTQzNyBMNDYuNzEyOTA5OCw5LjI4NDI0ODMzIEw1OSwxNi4yODc4Mzk5IFogTTI5LjU2NjcxODUsNTEuMTM1NjI1MSBMNDEuODUyOTAwOSw0NC4xMzk3Mjk4IEw0MS44NTI5MDA5LDU4LjAwMzI0OTUgTDI5LjU2NDkwMyw2NSBMMTcuMTQ5ODIyMyw1Ny45OTgxMTg3IEwxNy4xNDk4MjIzLDQ0LjEzOTcyOTggTDI5LjU2NjcxODUsNTEuMTM1NjI1MSBaIE0yOS41NjY3MTg1LDE4LjU3MzYyNzUgTDQxLjg1NDcxNjQsMjUuNDQzODE3MyBMNDEuODU0NzE2NCwzOS40Mjc5MTE3IEwyOS41NjY3MTg1LDQ2LjI5NjM5MTMgTDE3LjE0OTgyMjMsMzkuNDI3OTExNyBMMTcuMTQ5ODIyMywyNS40Mzc4MzE0IEwyOS41NjY3MTg1LDE4LjU3MzYyNzUgWiBNMjkuNTY2NzE4NSwxMy44NjI2NjQ2IEwxNy4xNDk4MjIzLDYuOTk1ODk1MzMgTDI5LjU3MzA3MjYsMCBMNDEuODYxMDcwNSw2Ljk5NTg5NTMzIEwyOS41NjY3MTg1LDEzLjg2MjY2NDYgWiBNMCwzNC44NDg2NDAzIEwxMi4yODQzNjcsNDEuNzE3OTc1IEwxMi4yODQzNjcsNTUuNzA4OTEwNiBMMCw0OC43MTIxNjAxIEwwLDM0Ljg0ODY0MDMgWiBNMjQuNTcxNDU3MSwxNi4xNTE4NzI4IEwxMi4yODQzNjcsMjMuMjc2MDM5IEwxMi4yODQzNjcsMzcuMTM3ODQ4NSBMMCwzMC4xNDE5NTMxIEwwLDE2LjI4MDE0MzcgTDEyLjI4NDM2Nyw5LjI4NDI0ODMzIEwyNC41NzE0NTcxLDE2LjE1MTg3MjggWiIgaWQ9IkZpbGwtMSIgZmlsbD0iIzkxQkNFQyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ2LjcxMjkwOTgsNDEuNzMxNjU3MyBMNTksMzQuODYxNDY3NCBMNTksNDguNzI1ODQyMyBMNDYuNzEyOTA5OCw1NS43MjA4ODI1IEw0Ni43MTI5MDk4LDQxLjczMTY1NzMgWiBNNTksMTYuMjg3ODM5OSBMNTksMzAuMTQ5NjQ5NCBMNDYuNzEyOTA5OCwzNy4xNDU1NDQ3IEw0Ni43MTI5MDk4LDIzLjI3NjAzOSBMMzQuNDI5NDUwNiwxNi4yODAxNDM3IEw0Ni43MTI5MDk4LDkuMjg0MjQ4MzMgTDU5LDE2LjI4NzgzOTkgWiBNMjkuNTY2NzE4NSw1MS4xMzU2MjUxIEw0MS44NTI5MDA5LDQ0LjEzOTcyOTggTDQxLjg1MjkwMDksNTguMDAzMjQ5NSBMMjkuNTY0OTAzLDY1IEwxNy4xNDk4MjIzLDU3Ljk5ODExODcgTDE3LjE0OTgyMjMsNDQuMTM5NzI5OCBMMjkuNTY2NzE4NSw1MS4xMzU2MjUxIFogTTI5LjU2NjcxODUsMTguNTczNjI3NSBMNDEuODU0NzE2NCwyNS40NDM4MTczIEw0MS44NTQ3MTY0LDM5LjQyNzkxMTcgTDI5LjU2NjcxODUsNDYuMjk2MzkxMyBMMTcuMTQ5ODIyMywzOS40Mjc5MTE3IEwxNy4xNDk4MjIzLDI1LjQzNzgzMTQgTDI5LjU2NjcxODUsMTguNTczNjI3NSBaIE0yOS41NjY3MTg1LDEzLjg2MjY2NDYgTDE3LjE0OTgyMjMsNi45OTU4OTUzMyBMMjkuNTczMDcyNiwwIEw0MS44NjEwNzA1LDYuOTk1ODk1MzMgTDI5LjU2NjcxODUsMTMuODYyNjY0NiBaIE0wLDM0Ljg0ODY0MDMgTDEyLjI4NDM2Nyw0MS43MTc5NzUgTDEyLjI4NDM2Nyw1NS43MDg5MTA2IEwwLDQ4LjcxMjE2MDEgTDAsMzQuODQ4NjQwMyBaIE0yNC41NzE0NTcxLDE2LjE1MTg3MjggTDEyLjI4NDM2NywyMy4yNzYwMzkgTDEyLjI4NDM2NywzNy4xMzc4NDg1IEwwLDMwLjE0MTk1MzEgTDAsMTYuMjgwMTQzNyBMMTIuMjg0MzY3LDkuMjg0MjQ4MzMgTDI0LjU3MTQ1NzEsMTYuMTUxODcyOCBaIiBpZD0iU3Ryb2tlLTIiIHN0cm9rZT0iIzEzMUYzNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC03IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS4wMDAwMDAsIDI1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjguMzA0Nzc3LCAyMi45MTcxMjgpIHJvdGF0ZSgtNjcuMDAwMDAwKSB0cmFuc2xhdGUoLTI4LjMwNDc3NywgLTIyLjkxNzEyOCkgdHJhbnNsYXRlKDE0LjMwNDc3NywgLTEuNTgyODcyKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNy42MzczOTgsMTQuMzUyNjY5OCBMOS41MjE4MTE3OSwzNS4xMzM3NjQyIE02LjM0ODAxODY5LDQzLjI2MDMzMDIgQzUuMDgzODgwNzYsNDIuNzc3OTE1MSA0LjQ1NDUwMTQ1LDQxLjM3MjM0OTEgNC45NDMxMjIxNCw0MC4xMjE5NzE3IEM1LjQzMTc0MjgzLDM4Ljg3MTU5NDQgNi44NTI3NzczMSwzOC4yNDkwNjYxIDguMTE2OTE1MjQsMzguNzMyMzY3OSBDOS4zODEwNTMxNywzOS4yMTU2Njk4IDEwLjAwOTUzNTksNDAuNjIxMjM1OSA5LjUyMDkxNTI0LDQxLjg3MTYxMzIgQzkuMDMzMTkxMSw0My4xMjE5OTA2IDcuNjEyMTU2NjIsNDMuNzQzNjMyMSA2LjM0ODAxODY5LDQzLjI2MDMzMDIgTTEyLjY3NDA4NzcsMzguMTM0NjY5OCBMMjIuNDQ3Mzk4LDEzLjEwNzYxMzIgQzIyLjY2Nzk0OTcsMTMuMDMzMTIyNyAyMi44OTIwODc3LDEyLjk3ODE0MTUgMjMuMTA5MDUzMiwxMi44NzcwNDcyIEMyNi4yNjg1MDE0LDExLjQxMTE3OTMgMjcuNjI3NjczOSw3LjY4ODQyNDU1IDI2LjE0Mzg4MDgsNC41NjI0ODExNiBDMjUuNzU1NjczOSwzLjc0Mzk3MTcyIDI1LjIwNDI5NDYsMy4wNTU4MjA3OCAyNC41NTQyOTQ2LDIuNDk4OTE1MTIgQzI0LjUzMDA4NzcsMi42NDc4OTYyNSAyNC40OTI0MzI1LDIuNzk1OTkwNTkgMjQuNDM1OTQ5NywyLjk0MTQyNDU1IEwyMi42NDM3NDI4LDcuNTMyMzQ5MDggQzIyLjIxMDcwODMsOC42NDA4Mzk2NSAyMC45MzkzOTgsOS4xOTc3NDUzMSAxOS44MTc4MTE4LDguNzY5NDI0NTUgQzE4LjY5NzEyMjEsOC4zNDExMDM4IDE4LjEzNDA4NzcsNy4wODM2MzIxIDE4LjU2NzEyMjEsNS45NzQyNTQ3NCBMMjAuMzU5MzI5LDEuMzgzMzMwMjEgQzIwLjQxNDAxODcsMS4yNDQxMDM4IDIwLjQ4MjE1NjYsMS4xMTM3NDUzMSAyMC41NjEwNTMyLDAuOTkzMTQxNTM0IEMxOS42MTUxOTExLDAuOTcxODU4NTE1IDE4LjY1MzE5MTEsMS4xMzU5MTUxMiAxNy43Mzc4MTE4LDEuNTU5ODAxOTEgQzE0LjU3ODM2MzUsMy4wMjY1NTY2MyAxMy4yMTkxOTExLDYuNzQ5MzExMzUgMTQuNzAyOTg0Miw5Ljg3NDM2Nzk1IEMxNC44NTA5MTUyLDEwLjE4NjUxODkgMTUuMDM2NTAxNCwxMC40NjY3NDUzIDE1LjIyNzQ2NywxMC43NDE2NTEgTDUuNzI2NzA4MzUsMzUuMDY4MTQxNSBDNS4zMDcxMjIxNCwzNS4xNjU2ODg3IDQuODkyMDE4NjksMzUuMzA0MDI4MyA0LjQ4Njc3NzMxLDM1LjQ5MjkxNTEgQzEuMzI3MzI5MDQsMzYuOTU5NjY5OCAtMC4wMzI3Mzk5Mjk4LDQwLjY4MjQyNDYgMS40NTAxNTY2Miw0My44MDc0ODEyIEMyLjkzMzk0OTczLDQ2LjkzMzQyNDYgNi42OTY3NzczMSw0OC4yNzY5MTUxIDkuODU2MjI1NTksNDYuODEwMTYwNCBDMTMuMDE2NTcwNCw0NS4zNDQyOTI1IDE0LjM3NTc0MjgsNDEuNjIxNTM3OCAxMi44OTI4NDYzLDM4LjQ5NTU5NDQgQzEyLjgzMDk4NDIsMzguMzY2MTIyNyAxMi43NDMxMjIxLDM4LjI1ODgyMDggMTIuNjc0MDg3NywzOC4xMzQ2Njk4IiBpZD0iRmlsbC0zIiBmaWxsPSIjRjJCMDc2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC4wMjgxMjkxLDE1LjI3MzE3NDcgTDkuOTEyNTQyOTIsMzYuMDU0MjY5IEwxOC4wMjgxMjkxLDE1LjI3MzE3NDcgWiBNNi43Mzg3NDk4Miw0NC4xODA4MzUxIEM1LjQ3NDYxMTg5LDQzLjY5ODQyIDQuODQ1MjMyNTgsNDIuMjkyODUzOSA1LjMzMzg1MzI3LDQxLjA0MjQ3NjYgQzUuODIyNDczOTYsMzkuNzkyMDk5MiA3LjI0MzUwODQ0LDM5LjE2OTU3MDkgOC41MDc2NDYzNywzOS42NTI4NzI4IEM5Ljc3MTc4NDMsNDAuMTM2MTc0NyAxMC40MDAyNjcxLDQxLjU0MTc0MDcgOS45MTE2NDYzNyw0Mi43OTIxMTgxIEM5LjQyMzkyMjIzLDQ0LjA0MjQ5NTQgOC4wMDI4ODc3NSw0NC42NjQxMzcgNi43Mzg3NDk4Miw0NC4xODA4MzUxIFogTTEzLjA2NDgxODgsMzkuMDU1MTc0NyBMMjIuODM4MTI5MSwxNC4wMjgxMTgxIEMyMy4wNTg2ODA5LDEzLjk1MzYyNzUgMjMuMjgyODE4OCwxMy44OTg2NDY0IDIzLjQ5OTc4NDMsMTMuNzk3NTUyIEMyNi42NTkyMzI2LDEyLjMzMTY4NDEgMjguMDE4NDA1LDguNjA4OTI5NDEgMjYuNTM0NjExOSw1LjQ4Mjk4NjAxIEMyNi4xNDY0MDUsNC42NjQ0NzY1OCAyNS41OTUwMjU3LDMuOTc2MzI1NjMgMjQuOTQ1MDI1NywzLjQxOTQxOTk3IEMyNC45MjA4MTg4LDMuNTY4NDAxMSAyNC44ODMxNjM2LDMuNzE2NDk1NDQgMjQuODI2NjgwOSwzLjg2MTkyOTQxIEwyMy4wMzQ0NzQsOC40NTI4NTM5MyBDMjIuNjAxNDM5NSw5LjU2MTM0NDUgMjEuMzMwMTI5MSwxMC4xMTgyNTAyIDIwLjIwODU0MjksOS42ODk5Mjk0MSBDMTkuMDg3ODUzMyw5LjI2MTYwODY1IDE4LjUyNDgxODgsOC4wMDQxMzY5NSAxOC45NTc4NTMzLDYuODk0NzU5NiBMMjAuNzUwMDYwMiwyLjMwMzgzNTA3IEMyMC44MDQ3NDk4LDIuMTY0NjA4NjUgMjAuODcyODg3OCwyLjAzNDI1MDE2IDIwLjk1MTc4NDMsMS45MTM2NDYzOSBDMjAuMDA1OTIyMiwxLjg5MjM2MzM3IDE5LjA0MzkyMjIsMi4wNTY0MTk5NyAxOC4xMjg1NDI5LDIuNDgwMzA2NzYgQzE0Ljk2OTA5NDYsMy45NDcwNjE0OCAxMy42MDk5MjIyLDcuNjY5ODE2MiAxNS4wOTM3MTUzLDEwLjc5NDg3MjggQzE1LjI0MTY0NjQsMTEuMTA3MDIzNyAxNS40MjcyMzI2LDExLjM4NzI1MDIgMTUuNjE4MTk4MSwxMS42NjIxNTU4IEw2LjExNzQzOTQ3LDM1Ljk4ODY0NjQgQzUuNjk3ODUzMjcsMzYuMDg2MTkzNiA1LjI4Mjc0OTgyLDM2LjIyNDUzMzIgNC44Nzc1MDg0NCwzNi40MTM0MiBDMS43MTgwNjAxNiwzNy44ODAxNzQ3IDAuMzU3OTkxMTk5LDQxLjYwMjkyOTQgMS44NDA4ODc3NSw0NC43Mjc5ODYgQzMuMzI0NjgwODUsNDcuODUzOTI5NCA3LjA4NzUwODQ0LDQ5LjE5NzQyIDEwLjI0Njk1NjcsNDcuNzMwNjY1MyBDMTMuNDA3MzAxNSw0Ni4yNjQ3OTczIDE0Ljc2NjQ3NCw0Mi41NDIwNDI2IDEzLjI4MzU3NzQsMzkuNDE2MDk5MiBDMTMuMjIxNzE1MywzOS4yODY2Mjc1IDEzLjEzMzg1MzMsMzkuMTc5MzI1NiAxMy4wNjQ4MTg4LDM5LjA1NTE3NDcgWiIgaWQ9IlN0cm9rZS01IiBzdHJva2U9IiMxMjIwMzQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIGlkPSJQZW5jZWlsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NS41MDAwMDAsIDQ4LjAwMDAwMCkgcm90YXRlKC0yLjAwMDAwMCkgdHJhbnNsYXRlKC01NS41MDAwMDAsIC00OC4wMDAwMDApIHRyYW5zbGF0ZSgzMS4wMDAwMDAsIDI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlBlbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuNTAwMDAwLCAyMC4wMDAwMDApIHJvdGF0ZSg1Mi4wMDAwMDApIHRyYW5zbGF0ZSgtMjQuNTAwMDAwLCAtMjAuMDAwMDAwKSB0cmFuc2xhdGUoMjEuMDAwMDAwLCAtOC4wMDAwMDApIiBzdHJva2U9IiMxMzFGMzQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzc1QkVGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy41MDAwMDAsIDMwLjUwMDAwMCkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zLjUwMDAwMCwgLTMwLjUwMDAwMCkgIiB4PSItMTYiIHk9IjI3IiB3aWR0aD0iMzkiIGhlaWdodD0iNyI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGQzVEMzUiIHg9Ii0xLjgxODk4OTRlLTEyIiB5PSI1MCIgd2lkdGg9IjciIGhlaWdodD0iNiIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iVHJpYW5nbGUiIGZpbGw9IiNGMUM3OTUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iMy41IDAgNyAxMCAtMS44MTg5ODk0ZS0xMiAxMCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoLTEyIiBmaWxsPSIjNzVCRUZGIiBwb2ludHM9IjM1LjU4MTEzNjYgOC4xODM0ODA2OSAzNi4zNjY1OTY5IDcuNjA2MDMwNzEgMzkuNTE1NTUwNiAxMS41MjE1NDc0IDM4LjUzMTExMDQgMTIuMjAwNDU3MyAzNS40MDQwMTc1IDguMzI0NzkyNDEiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGxpbmUgeDE9IjM4LjUiIHkxPSI2MS41IiB4Mj0iNjguNSIgeTI9IjM2LjUiIGlkPSJQYXRoLTciIHN0cm9rZT0iIzEzMUYzNCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
                    mode: "none",
                    standalone: false,
                    tenantSpecific: false,
                },
            ],
            packs: [
                {
                    name: "SAP Fiori",
                    tagline: "SAP Fiori",
                    author: "SAP(CA-WNG)",
                    description: "Develop, test, build, and deploy SAP Fiori freestyle or SAP Fiori elements applications to SAP Business Technology Platform.",
                    thumbnail: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDY5LjUxIDY4Ljg1Ij48ZGVmcz48c3R5bGU+LmR7ZmlsbDojMmM2YWIzO30uZXtmaWxsOiMxODNjNmI7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJhIi8+PGcgaWQ9ImIiPjxnIGlkPSJjIj48cGF0aCBjbGFzcz0iZSIgZD0iTTcuODgsNDcuODdjLTIuMjksMC00LjE1LTEuODMtNC4xNS00LjA4VjE3LjFjMC0yLjI1LDEuODYtNC4wOCw0LjE1LTQuMDhINjEuNjNjMi4yOSwwLDQuMTUsMS44Miw0LjE1LDQuMDh2MS42N2gzLjczVjcuNzZjMC00LjI4LTMuNDctNy43Ni03Ljc2LTcuNzZINy43NkMzLjQ3LDAsMCwzLjQ3LDAsNy43NlY0My45NWMwLDQuMjgsMy40Nyw3Ljc2LDcuNzYsNy43NmgzLjI2di0zLjgzaC0zLjEzWk0yNC4zNyw0LjEyYzEuMywwLDIuMzUsMS4wNSwyLjM1LDIuMzVzLTEuMDUsMi4zNS0yLjM1LDIuMzUtMi4zNS0xLjA1LTIuMzUtMi4zNSwxLjA1LTIuMzUsMi4zNS0yLjM1Wm0tNy44NSwwYzEuMywwLDIuMzUsMS4wNSwyLjM1LDIuMzVzLTEuMDUsMi4zNS0yLjM1LDIuMzUtMi4zNS0xLjA1LTIuMzUtMi4zNSwxLjA1LTIuMzUsMi4zNS0yLjM1Wm0tNy44NSwwYzEuMywwLDIuMzUsMS4wNSwyLjM1LDIuMzVzLTEuMDUsMi4zNS0yLjM1LDIuMzUtMi4zNS0xLjA1LTIuMzUtMi4zNSwxLjA1LTIuMzUsMi4zNS0yLjM1WiIvPjxnPjxwYXRoIGNsYXNzPSJkIiBkPSJNNjguMjUsMjkuMTJjLS4zNi0uNDYtLjkxLS43My0xLjUtLjczLS40MiwwLS44MywuMTQtMS4xNywuNC00LjEzLDMuMzItNy4wMyw3LjkxLTguMjUsMTMuMDQtOC43OC0xNS43OS0zMS4zNC0xNy40OC0zMS41OC0xNy41aC0uMTJjLS45NSwwLTEuNzYsLjcxLTEuODgsMS42NC0uMDQsLjI2LTIuOTgsMjUuNTksMTQuOTQsMzQuMjMtNi4wOCwxLjMtMTAuMjgsMy4xMy0xMi40OSw1LjQ2LS43MiwuNzUtLjY5LDEuOTYsLjA3LDIuNjcsLjM1LC4zNCwuODIsLjUyLDEuMywuNTIsLjUyLDAsMS4wMi0uMjIsMS4zNy0uNTksMi4zMi0yLjQzLDguMS00LjI3LDE3LjE5LTUuNDYsMS4yOC0uMTcsMi43My0uMzYsMi43NS0yLjA0LS4wMS0uOTUtLjctMS43NS0xLjY0LTEuODktMTkuNzItMy4wNC0yMC4zMS0yMy40OS0xOS45MS0zMC41NSw2LjUxLC45MSwyNS4yNiw0Ljk3LDI4Ljk5LDIxLjQ4LC4yLC45MSwxLjAyLDEuNTYsMS45NCwxLjU2aC4xYy43Ny0uMDcsMS42OS0uNTMsMS43Ni0yLjI5LC4yOS03LjU5LDIuOTgtMTMuNTcsNy43NS0xNy4yOSwuODItLjY0LC45Ny0xLjgzLC4zMy0yLjY1WiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNNTMuNjcsMzEuNDJoLjAzYy4yLDAsLjQtLjAzLC42LS4xLC45OC0uMzQsMS41MS0xLjQyLDEuMTctMi40MS0uNy0yLjA0LTEuMTctNS40NC0uMTgtNi4yNywuMTItLjEsLjQyLS4yNywxLjA2LS4yNywuOTYsMCwyLjgyLC4zOSw2LjE4LDIuMjMsLjI4LC4xNSwuNTksLjIzLC45LC4yMywuNjksMCwxLjMzLS4zOCwxLjY2LS45OCwuNS0uOTEsLjE3LTIuMDctLjc1LTIuNTctMy4zMS0xLjgyLTUuOTUtMi43LTguMDUtMi43LTEuMzgsMC0yLjU0LC4zOS0zLjQ2LDEuMTctMy4zNCwyLjgyLTEuMzgsOS4xNi0uOTUsMTAuNCwuMjYsLjc2LC45OCwxLjI3LDEuNzgsMS4yN1oiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTIzLDQ4Ljg4Yy0uMTksMC0uMzcsLjAzLS41NiwuMDgtNS45MiwxLjgzLTguOSw0LjE5LTkuMSw3LjItLjMsNC40OCw2LjA5LDcuNTcsNi44Miw3LjkxLC4yNSwuMTIsLjUyLC4xOCwuOCwuMThoMGMuNzMsMCwxLjQxLS40MywxLjcxLTEuMDksLjIxLS40NiwuMjQtLjk3LC4wNi0xLjQ1LS4xNy0uNDctLjUyLS44NS0uOTgtMS4wNy0yLS45NC00LjczLTIuOTItNC42NC00LjIzLC4wMi0uMzIsLjQzLTEuOTgsNi40NS0zLjg0LC40OC0uMTUsLjg4LS40OCwxLjExLS45M3MuMjgtLjk2LC4xMy0xLjQ0Yy0uMjUtLjgtLjk3LTEuMzMtMS44MS0xLjMzWiIvPjwvZz48L2c+PC9nPjwvc3ZnPgo=",
                    extensions: [
                        {
                            name: "fiori-tools",
                            namespace: "fiori-tools",
                            versionRange: "latest",
                        },
                        {
                            name: "w5g-wing",
                            namespace: "w5g-wing",
                            versionRange: "latest",
                        },
                    ],
                },
            ],
        });
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
            sinon_1.default.restore();
        });
        it("Should get a dev space spec successfully", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet(`http://any.host.net/ws-manager/api/v1/extension/rel`)
                .reply(200, getMockResponse());
            const onGetDevSpacesSpecSpy = sinon_1.default.spy(devspaceUtils, "getDevSpacesSpec");
            // Test execution
            await (0, get_devspace_1.getDevSpacesSpec)("http://any.host.net", "jwtblabla");
            // Results check
            (0, chai_1.expect)(onGetDevSpacesSpecSpy.called).to.be.true;
        });
    });
    describe("Test for getExtensionPacks()", () => {
        let mockAxios;
        const getMockResponse = () => ({
            packs: [
                {
                    name: "SAP Fiori",
                    description: "Develop, test, build, and deploy SAP Fiori freestyle or SAP Fiori elements applications to SAP Business Technology Platform.",
                },
                {
                    name: "LCAP",
                    description: "Easily develop, test, build, and deploy apps using high productivity tools.",
                },
            ],
        });
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
            sinon_1.default.restore();
        });
        it("Should return extension packs successfully", async () => {
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onGet(`http://any.host.net/ws-manager/api/v1/extension/all`)
                .reply(200, getMockResponse());
            // Test execution
            const extensionPacks = await (0, get_devspace_1.getExtensionPacks)("http://any.host.net", "jwtblabla");
            // Results check
            (0, chai_1.expect)(extensionPacks).to.have.length(2);
            (0, chai_1.expect)(extensionPacks[0]).to.deep.equal({
                name: "SAP Fiori",
                description: "Develop, test, build, and deploy SAP Fiori freestyle or SAP Fiori elements applications to SAP Business Technology Platform.",
            });
        });
    });
    describe("Test for createDevSpace()", () => {
        let mockAxios;
        before(() => {
            mockAxios = new axios_mock_adapter_1.default(axios_1.default);
        });
        after(() => {
            mockAxios.restore();
            sinon_1.default.restore();
        });
        it("Should create a dev space successfully", async () => {
            const wsid = "ws-111";
            // Mock setup
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                H2O_URL: "http://any.host.net",
                WORKSPACE_ID: "workspaces-ws-anyw",
            });
            mockAxios
                .onPost(`http://any.host.net/ws-manager/api/v1/workspace`)
                .reply(204);
            const oCreateDevSpaceSpy = sinon_1.default.spy(devspaceUtils, "createDevSpace");
            // Test execution
            const devSpace = {
                id: wsid,
                memoryLimitBytes: 3000,
                extensions: [],
                annotations: {
                    pack: devspaceUtils.PackName.LCAP,
                    packTagline: "LCAP",
                    optionalExtensions: "",
                    technicalExtensions: "",
                },
                workspacedisplayname: "",
            };
            await (0, get_devspace_1.createDevSpace)("http://any.host.net", "jwtblabla", devSpace);
            // Results check
            (0, chai_1.expect)(oCreateDevSpaceSpy.called).to.be.true;
        });
    });
    describe("Test for isBuildCode()", () => {
        let envStub;
        beforeEach(() => {
            // Stubbing process.env
            envStub = sinon_1.default.stub(process, "env").value({});
        });
        afterEach(() => {
            // Restoring the stubbed process.env to its original state
            envStub.restore();
        });
        it("return true when BAS plan is 'build-code-free' and build code plan is 'free'.", () => {
            envStub.value({
                [get_devspace_1.BUILD_CODE_PLAN]: "free",
                [get_devspace_1.BAS_PLAN]: "build-code-free",
            });
            (0, chai_1.expect)((0, get_devspace_1.isBuildCode)()).to.be.true;
        });
        it("return true when BAS plan is 'build-code' and build code plan is 'standard'.", async () => {
            envStub.value({
                [get_devspace_1.BUILD_CODE_PLAN]: "standard",
                [get_devspace_1.BAS_PLAN]: "build-code",
            });
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)()).to.be.true;
        });
        it("return true when BAS plan is 'trial' and build code plan is 'free'.", async () => {
            envStub.value({
                [get_devspace_1.BUILD_CODE_PLAN]: "free",
                [get_devspace_1.BAS_PLAN]: "trial",
            });
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)()).to.be.true;
        });
        it("return false when there is no env", async () => {
            envStub.value({});
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)()).to.be.false;
        });
        it("return false in any other case", async () => {
            envStub.value({
                [get_devspace_1.BUILD_CODE_PLAN]: "asdsad",
                [get_devspace_1.BAS_PLAN]: "dasds",
            });
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)()).to.be.false;
        });
    });
    describe("Test for isBuildCode() with parameters", () => {
        let envStub;
        beforeEach(() => {
            envStub = sinon_1.default.stub(process, "env").value({});
        });
        afterEach(() => {
            envStub.restore();
        });
        it("both 'buildCodePlan' and 'wsPaln' are existing", async () => {
            const wsPlan = "build-code";
            const buildCodePlan = "standard";
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)({ buildCodePlan, wsPlan })).to.be.true;
        });
        it("the only 'swPlan' is providing", async () => {
            envStub.value({
                [get_devspace_1.BUILD_CODE_PLAN]: "asdsad",
            });
            (0, chai_1.expect)(await (0, get_devspace_1.isBuildCode)({ wsPlan: "standard" })).to.be.false;
        });
    });
    //isBuild tests
    describe("Test for isBuild()", () => {
        it("should return true when isBuildCode() returns true", async () => {
            const result = (0, get_devspace_1.isBuild)({
                buildCodePlan: "standard",
                wsPlan: "build-code",
            });
            (0, chai_1.expect)(result).to.be.true;
        });
        it("should return true when getBasMode() returns BUILD_STANDARD", async () => {
            const result = (0, get_devspace_1.isBuild)({ wsPlan: "build-default" });
            (0, chai_1.expect)(result).to.be.true;
        });
        it("should return false when isBuildCode() returns false and getBasMode() returns not BUILD_STANDARD", async () => {
            const result = (0, get_devspace_1.isBuild)({ buildCodePlan: "free", wsPlan: "build-code" });
            (0, chai_1.expect)(result).to.be.false;
        });
    });
    describe("Test for getTenantMetadata", () => {
        let devspaceUtilsStub;
        afterEach(() => {
            devspaceUtilsStub.restore();
        });
        it("getTenantMatadata succeded", async () => {
            const options = {
                landscape: "http://landscape-1",
                jwt: "valid-jwt",
            };
            const data = {
                buildCodePlan: "free",
                wsPlan: "build-code",
                host: "http://result-url",
            };
            devspaceUtilsStub = sinon_1.default
                .stub(devspaceUtils, "getTenantMetadata")
                .resolves({
                data,
            });
            (0, chai_1.expect)(await (0, get_devspace_1.getTenantMetadata)(options)).to.be.deep.equal(data);
        });
        it("getTenantMatadata succeded, but required attributes are not populated", async () => {
            const options = {
                landscape: "http://landscape-2",
                jwt: "valid-jwt",
            };
            devspaceUtilsStub = sinon_1.default
                .stub(devspaceUtils, "getTenantMetadata")
                .resolves({
                data: {},
            });
            (0, chai_1.expect)(await (0, get_devspace_1.getTenantMetadata)(options)).to.be.deep.equal({
                buildCodePlan: "",
                wsPlan: "",
                host: "",
            });
        });
        it("getTenantMatadata succeded, but data attribute not exists", async () => {
            const options = {
                landscape: "http://landscape-2",
                jwt: "valid-jwt",
            };
            devspaceUtilsStub = sinon_1.default
                .stub(devspaceUtils, "getTenantMetadata")
                .resolves({});
            (0, chai_1.expect)(await (0, get_devspace_1.getTenantMetadata)(options)).to.be.deep.equal({
                buildCodePlan: "",
                wsPlan: "",
                host: "",
            });
        });
    });
    describe("Test for GET_BAS_MODE()", () => {
        it("returns standard when BAS_PLAN build-default", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "build-default",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("buildStandard");
        });
        it("returns standard when BAS_PLAN standard", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "standard",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("standard");
        });
        it("returns free when BAS_PLAN free", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "free",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("free");
        });
        it("returns	buildCodeFree when BAS_PLAN trial and BUILD_CODE_PLAN free", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "trial",
                [get_devspace_1.BUILD_CODE_PLAN]: "free",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("buildCodeFree");
        });
        it("returns	buildCodeFree when use opts wsPlan trial and buildCodePlan free", () => {
            const opts = {
                buildCodePlan: "free",
                wsPlan: "trial",
            };
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)(opts)).to.be.equal("buildCodeFree");
        });
        it("returns free when BAS_PLAN trial and BUILD_CODE_PLAN NOT free", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "trial",
                [get_devspace_1.BUILD_CODE_PLAN]: "dadacas",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("free");
        });
        it("returns	buildCodeFree when BAS_PLAN build-code-free and BUILD_CODE_PLAN free", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "build-code-free",
                [get_devspace_1.BUILD_CODE_PLAN]: "free",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("buildCodeFree");
        });
        it("returns free when BAS_PLAN build-code-free and BUILD_CODE_PLAN NOT free", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "build-code-free",
                [get_devspace_1.BUILD_CODE_PLAN]: "dadacas",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("free");
        });
        it("returns	buildCodeStandard when BAS_PLAN build-code and BUILD_CODE_PLAN standard", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "build-code",
                [get_devspace_1.BUILD_CODE_PLAN]: "standard",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("buildCodeStandard");
        });
        it("returns standard when BAS_PLAN build-code and BUILD_CODE_PLAN NOT standard", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "build-code",
                [get_devspace_1.BUILD_CODE_PLAN]: "dadacas",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("standard");
        });
        it("returns standard when there is no envs", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({});
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("standard");
        });
        it("returns standard in all other options", () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({
                [get_devspace_1.BAS_PLAN]: "dadacas",
            });
            (0, chai_1.expect)((0, get_devspace_1.getBasMode)()).to.be.equal("standard");
        });
    });
    describe("Calculate app url by port sync", () => {
        //---------------------------------calculateAppURL-----------------------------------//
        it("workspace url not defined - returns empty string", () => {
            process.env.WS_BASE_URL = "";
            process.env.VSCODE_HYBRID = "false";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(5566)).to.be.equal("http://port5566-localhost:3000/");
        });
        it("Should find URL based host ", () => {
            process.env.WS_BASE_URL =
                "https://workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(3778)).to.equal("https://port3778-workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/");
        });
        it('Should find URL based path not ends with "/"', () => {
            process.env.WS_BASE_URL =
                "https://workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(6654)).to.equal("https://port6654-workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/");
        });
        it('Should build url with portssl "/"', () => {
            process.env.WS_BASE_URL =
                "https://workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(6654, "https")).to.equal("https://portssl6654-workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/");
        });
        it('Should build url with portssl "/"', () => {
            process.env.WS_BASE_URL =
                "https://workspaces-ws-m6mnd1.stable-aws-01.dev1.sapwebide.net.sap/";
            process.env.VSCODE_HYBRID = "true";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(6654, "https")).to.equal("https://localhost:6654");
        });
        it("workspace url not defined - returns invalid string", () => {
            process.env.WS_BASE_URL = "invalid";
            process.env.VSCODE_HYBRID = "false";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(111)).to.be.equal("");
        });
        it("workspace url not defined - returns invalid string - no protocol", () => {
            process.env.WS_BASE_URL = "example.com";
            process.env.VSCODE_HYBRID = "false";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(111)).to.be.equal("");
        });
        it("workspace url not defined - returns invalid string - no host", () => {
            process.env.WS_BASE_URL = "http://";
            process.env.VSCODE_HYBRID = "false";
            (0, chai_1.expect)((0, get_devspace_1.calculateAppURLByPort)(111)).to.be.equal("");
        });
    });
    describe("Test for getAppExternalUri()", () => {
        let envStub;
        beforeEach(() => {
            // Stubbing process.env
            envStub = sinon_1.default.stub(process, "env").value({});
        });
        afterEach(() => {
            // Restoring the stubbed process.env to its original state
            envStub.restore();
        });
        it("Should concatenate app URL with path and encode", () => {
            envStub.value({
                ["WS_BASE_URL"]: "https://workspaces-ws-w6rpp.cry10.int.applicationstudio.cloud.sap/",
                ["H2O_URL"]: "https://bas-extensions.cry10cf.int.applicationstudio.cloud.sap",
            });
            const url = "http://localhost:8080/test/flpSandbox.html?sap-ui-xx-viewCache=false#project1-display";
            const expectedExternalUri = "https://bas-extensions.cry10cf.int.applicationstudio.cloud.sap/login?e=https%3A%2F%2Fport8080-workspaces-ws-w6rpp.cry10.int.applicationstudio.cloud.sap%2Ftest%2FflpSandbox.html%3Fsap-ui-xx-viewCache%3Dfalse%23project1-display";
            const result = (0, get_devspace_1.getAppExternalUri)(url);
            (0, chai_1.expect)(result).to.equal(expectedExternalUri);
        });
        it("Should concatenate app URL with path and encode - no port", () => {
            envStub.value({
                ["WS_BASE_URL"]: "https://workspaces-ws-w6rpp.cry10.int.applicationstudio.cloud.sap/",
                ["H2O_URL"]: "https://bas-extensions.cry10cf.int.applicationstudio.cloud.sap",
            });
            const url = "http://localhost/test/flpSandbox.html?sap-ui-xx-viewCache=false#project1-display";
            const expectedExternalUri = "https://bas-extensions.cry10cf.int.applicationstudio.cloud.sap/login?e=https%3A%2F%2Fport80-workspaces-ws-w6rpp.cry10.int.applicationstudio.cloud.sap%2Ftest%2FflpSandbox.html%3Fsap-ui-xx-viewCache%3Dfalse%23project1-display";
            const result = (0, get_devspace_1.getAppExternalUri)(url);
            (0, chai_1.expect)(result).to.equal(expectedExternalUri);
        });
        it("empty internal url", () => {
            envStub.value({
                ["WS_BASE_URL"]: "https://workspaces-ws-w6rpp.cry10.int.applicationstudio.cloud.sap/",
            });
            const url = "";
            try {
                // Test execution
                (0, get_devspace_1.getAppExternalUri)(url);
            }
            catch (error) {
                // Results check
                (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.toString().toLowerCase()).to.contain("internal uri is not provided");
            }
        });
    });
});
//# sourceMappingURL=get-devspace.spec.js.map