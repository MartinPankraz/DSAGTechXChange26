"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const sinon_1 = __importDefault(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const index_1 = require("../../src/index");
const { getDestinations } = index_1.destinations;
(0, chai_1.use)(chai_as_promised_1.default);
const HostDescription = "Host description";
describe("index-get-destinations", () => {
    const responseDestinations = [
        {
            Name: "http-OnPromise-dest-name",
            Type: "HTTP",
            Authentication: "NoAuthentication",
            ProxyType: "OnPremise",
            Description: HostDescription,
            Host: "host",
            WebIDEEnabled: "true",
            "HTML5.DynamicDestination": "true",
        },
        {
            Name: "http-BasicAuthentication-dest-name",
            Type: "HTTP",
            Authentication: "BasicAuthentication",
            ProxyType: "Internet",
            Description: HostDescription,
            Host: "host",
            WebIDEEnabled: "true",
            "HTML5.DynamicDestination": "true",
        },
        {
            Name: "ClientCertificateAuthentication-dest-name",
            Type: "HTTP",
            Authentication: "PrivateLink",
            ProxyType: "OnPremise",
            Description: HostDescription,
            Host: "host",
            WebIDEEnabled: "true",
            "HTML5.DynamicDestination": "true",
        },
        {
            Name: "ClientCertificateAuthentication-dest-name",
            Type: "MAIL",
            Authentication: "BasicAuthentication",
            ProxyType: "OnPremise",
            Description: HostDescription,
            Host: "host",
            WebIDEEnabled: "true",
            "HTML5.DynamicDestination": "true",
        },
    ];
    const expectedDestinations = [
        {
            name: "http-OnPromise-dest-name",
            type: "HTTP",
            credentials: {
                authentication: "NoAuthentication",
            },
            proxyType: "OnPremise",
            description: HostDescription,
            host: "host",
            basProperties: {
                html5DynamicDestination: "true",
            },
        },
        {
            name: "http-BasicAuthentication-dest-name",
            type: "HTTP",
            credentials: {
                authentication: "BasicAuthentication",
            },
            proxyType: "Internet",
            description: HostDescription,
            host: "host",
            basProperties: {
                html5DynamicDestination: "true",
            },
        },
    ];
    let mockAxios;
    const WS_BASE_URL = "WS-BASE-VALUE"; //flag that specify application studio environment
    const H2O_URL = "https://h2o.cfapps.test.hana.ondemand.com";
    before(() => {
        mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    });
    after(() => {
        mockAxios.restore();
    });
    beforeEach(() => {
        (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: H2O_URL, HRTT_URL: "", WS_BASE_URL: WS_BASE_URL });
    });
    afterEach(() => {
        mockAxios.reset();
        // TODO: why global brute force handling of stubs?
        sinon_1.default.restore();
    });
    describe("getDestinations", () => {
        function mockDestReply(status, data) {
            mockAxios.onGet(/api\/listDestinations/).reply(status, data);
        }
        it("return http destinations", async () => {
            mockDestReply(200, responseDestinations);
            const result = await getDestinations();
            console.log(JSON.stringify(result));
            (0, chai_1.expect)(await getDestinations()).to.deep.equal(expectedDestinations);
        });
        it("return an empty destinations when the payload is empty", async () => {
            mockDestReply(200, []);
            (0, chai_1.expect)(await getDestinations()).to.deep.equal([]);
        });
        it("doesn't return an destinations which are not objects", async () => {
            const expectedDestinations = [
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
            ];
            //dont use the actual type in purpose in order to make sure we are ignore from not plan object
            const responseDestinations = [
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                "I'm not a plan object",
            ];
            mockDestReply(200, responseDestinations);
            (0, chai_1.expect)(await getDestinations()).to.deep.equal(expectedDestinations);
        });
        it("return empty DestinationListInfo array when one of the filter property does not exist in responseDestination", async () => {
            //dont use the actual type in purpose in order to make sure we are ignore from not plan object
            const responseDestinations = [
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                {
                    Name: "hrtt-host2",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host2",
                },
                "I'm not a plan object",
            ];
            mockDestReply(200, responseDestinations);
            const filter = new Map([["name", ["Tom"]]]);
            (0, chai_1.expect)(await getDestinations(filter)).to.deep.equal([]);
        });
        it("return empty DestinationListInfo array when one of the filter values does not matched to responseDestination values", async () => {
            //dont use the actual type in purpose in order to make sure we are ignore from not plan object
            const responseDestinations = [
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                {
                    Name: "hrtt-host2",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host2",
                },
                "I'm not a plan object",
            ];
            mockDestReply(200, responseDestinations);
            const filter = new Map([
                ["Name", ["hrtt-host", "hrtt-host2"]],
                ["Type", ["HTTP"]],
                ["Host", ["host1"]],
            ]);
            (0, chai_1.expect)(await getDestinations(filter)).to.deep.equal([]);
        });
        it("return only the responseDestinations that match the filter", async () => {
            let expectedDestinations = [
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "OAuth2ClientCredentials",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "OAuth2UserTokenExchange",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
            ];
            //dont use the actual type in purpose in order to make sure we are ignore from not plan object
            const responseDestinations = [
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "OAuth2ClientCredentials",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                {
                    Name: "hrtt-host",
                    Type: "HTTP",
                    Authentication: "OAuth2UserTokenExchange",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host",
                },
                {
                    Name: "hrtt-host2",
                    Type: "HTTP",
                    Authentication: "NoAuthentication",
                    ProxyType: "OnPremise",
                    Description: "HRTT Host description",
                    Host: "host2",
                },
                "I'm not a plan object",
            ];
            mockDestReply(200, responseDestinations);
            let filter = new Map([
                ["Name", ["hrtt-host", "fake1", "fake2"]],
                ["Type", ["HTTP", "HTTP2", "HTTP3"]],
            ]);
            (0, chai_1.expect)(await getDestinations(filter)).to.deep.equal(expectedDestinations);
            expectedDestinations = [
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "OAuth2ClientCredentials",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
                {
                    name: "hrtt-host",
                    type: "HTTP",
                    credentials: {
                        authentication: "OAuth2UserTokenExchange",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host",
                },
                {
                    name: "hrtt-host2",
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                    host: "host2",
                },
            ];
            filter = new Map([
                ["Name", ["hrtt-host", "hrtt-host2", "fake2"]],
                ["Type", ["HTTP", "HTTP2", "HTTP3"]],
            ]);
            (0, chai_1.expect)(await getDestinations(filter)).to.deep.equal(expectedDestinations);
        });
        it("throw exception when H2O_URL is not defined", async () => {
            (0, bas_sdk_sinon_helper_1.stubEnv)({ H2O_URL: undefined });
            await (0, chai_1.expect)(getDestinations()).to.be.rejectedWith("The H2O_URL environment variable is missing.");
        });
        it("fails to retrieve destinations when HTTP request is failed", async () => {
            mockDestReply(500, "failed to retrieve destination");
            await (0, chai_1.expect)(getDestinations()).to.be.rejectedWith("Couldn't retrieve the destination from the (https://h2o.cfapps.test.hana.ondemand.com/api/listDestinations) URL because of the following error: Request failed with status code 500. Error code=500");
        });
        it(`fails to retrieve destinations when the payload is not a JSON array`, async () => {
            mockDestReply(200, `I'M NOT JSON array`);
            await (0, chai_1.expect)(getDestinations()).to.be.rejectedWith("The response data (I'M NOT JSON array) is not an array format");
        });
    });
});
//# sourceMappingURL=get-destinations.spec.js.map