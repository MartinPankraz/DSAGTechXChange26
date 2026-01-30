"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const url_1 = require("url");
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const sinon_1 = __importDefault(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const index_1 = require("../../src/index");
const { createDestination } = index_1.destinations;
const EXPECTED_URL = "https://host.com";
(0, chai_1.use)(chai_as_promised_1.default);
describe("index-create-destination", () => {
    const expectedDestinationInfo = {
        name: "DestinationTest",
        url: new url_1.URL(EXPECTED_URL),
        type: "HTTP",
        credentials: {
            authentication: "BasicAuthentication",
            basicAuthentication: {
                userName: "testUser",
                userPassword: "123",
            },
        },
        proxyType: "OnPremise",
        description: "This is the description to unit test destination",
        basProperties: {
            usage: "some usage",
            additionalData: "additional",
            sapClient: "001",
            productName: "product",
        },
    };
    function mockDestReply(status) {
        mockAxios.onPost(/api\/createDestination/).reply(status);
    }
    const WS_BASE_URL = "WS-BASE-VALUE"; //flag that specify application studio environment
    const H2O_URL = "https://h2o.cfapps.test.hana.ondemand.com";
    let mockAxios;
    before(() => {
        mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    });
    after(() => {
        mockAxios.restore();
    });
    beforeEach(() => {
        (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: H2O_URL, WS_BASE_URL: WS_BASE_URL });
    });
    afterEach(() => {
        mockAxios.reset();
        // TODO: why reset stubs in a global brute force manner?
        sinon_1.default.restore();
    });
    describe("createDestination", () => {
        it("create new destination", async () => {
            mockDestReply(200);
            await (0, chai_1.expect)(createDestination(expectedDestinationInfo)).to.be.fulfilled;
        });
        it("create new destination fail because there is already a destination with the same name (409)", async () => {
            mockDestReply(409);
            await (0, chai_1.expect)(createDestination(expectedDestinationInfo)).to.be.rejectedWith("Couldn't create the destination from the (https://h2o.cfapps.test.hana.ondemand.com/api/createDestination) URL because of the following error: Request failed with status code 409. Error code=409");
        });
        it("create new destination fail because body data is empty or other server issue", async () => {
            mockDestReply(500);
            await (0, chai_1.expect)(createDestination(expectedDestinationInfo)).to.be.rejectedWith("Couldn't create the destination from the (https://h2o.cfapps.test.hana.ondemand.com/api/createDestination) URL because of the following error: Request failed with status code 500. Error code=500");
        });
        it("throw exception when H2O_URL is not defined", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: undefined });
            await (0, chai_1.expect)(createDestination(expectedDestinationInfo)).to.be.rejectedWith("The H2O_URL environment variable is missing.");
        });
    });
});
//# sourceMappingURL=create-destination.spec.js.map