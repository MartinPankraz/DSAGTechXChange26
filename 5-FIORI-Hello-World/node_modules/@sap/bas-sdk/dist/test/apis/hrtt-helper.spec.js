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
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const sinon_1 = __importStar(require("sinon"));
const bas_sdk_sinon_helper_1 = require("@sap/bas-sdk-sinon-helper");
const dest = __importStar(require("../../src/apis/get-destinations"));
const index_1 = require("../../src/index");
const { createHrttHelper } = index_1.hrtt;
(0, chai_1.use)(chai_as_promised_1.default);
describe("index", () => {
    const CF_API_ENDPOINT_URL = "https://api.cf.from-cf.hana.ondemand.com";
    afterEach(() => {
        // TODO: why brute-force sinon resets?
        sinon_1.default.restore();
    });
    describe("HrttHelper", () => {
        let hrttHelper;
        beforeEach(() => {
            hrttHelper = createHrttHelper();
            (0, chai_1.expect)(hrttHelper).to.be.not.undefined;
        });
        describe("getUrl", () => {
            const EXPECTED_HRTT_URL_FROM_DEST = "https://hana-cockpit.cfapps.from-dest.hana.ondemand.com";
            const EXPECTED_HRTT_URL_FROM_ENV = "https://hana-cockpit.cfapps.from-env.hana.ondemand.com";
            const EXPECTED_HRTT_URL_FROM_CF = "https://hana-cockpit-cf.cfapps.from.hana.ondemand.com";
            const expectedDestinations = [
                {
                    name: "hrtt-host",
                    host: EXPECTED_HRTT_URL_FROM_DEST,
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                },
                {
                    name: "dest1",
                    host: EXPECTED_HRTT_URL_FROM_DEST,
                    type: "HTTP",
                    credentials: {
                        authentication: "NoAuthentication",
                    },
                    proxyType: "OnPremise",
                    description: "HRTT Host description",
                },
            ];
            it(`return the "HRTT_URL" from the "host" field within hrtt-host destinations`, async () => {
                (0, sinon_1.stub)(dest, "getDestinations").returns(Promise.resolve(expectedDestinations));
                (0, chai_1.expect)(await hrttHelper.getUrl(EXPECTED_HRTT_URL_FROM_DEST)).to.equal(EXPECTED_HRTT_URL_FROM_DEST);
            });
            it(`return the "HRTT_URL" from the "host" field within hrtt-host destinations using the cache`, async () => {
                (0, sinon_1.stub)(dest, "getDestinations").returns(Promise.resolve(expectedDestinations));
                (0, chai_1.expect)(await hrttHelper.getUrl(EXPECTED_HRTT_URL_FROM_DEST)).to.equal(EXPECTED_HRTT_URL_FROM_DEST);
                //get the host from the destination cache
                (0, chai_1.expect)(await hrttHelper.getUrl(EXPECTED_HRTT_URL_FROM_DEST)).to.equal(EXPECTED_HRTT_URL_FROM_DEST);
            });
            it(`returns the "HRTT_URL" environment variable when there is no "hrtt-host" destination`, async () => {
                (0, bas_sdk_sinon_helper_1.stubEnv)({ HRTT_URL: EXPECTED_HRTT_URL_FROM_ENV });
                (0, sinon_1.stub)(dest, "getDestinations").returns(Promise.resolve([]));
                (0, chai_1.expect)(await hrttHelper.getUrl(CF_API_ENDPOINT_URL)).to.equal(EXPECTED_HRTT_URL_FROM_ENV);
            });
            it(`returns the "HRTT_URL" environment variable when destinations cannot be fetched`, async () => {
                (0, bas_sdk_sinon_helper_1.stubEnv)({ HRTT_URL: EXPECTED_HRTT_URL_FROM_ENV });
                (0, sinon_1.stub)(dest, "getDestinations").returns(Promise.resolve(undefined));
                (0, chai_1.expect)(await hrttHelper.getUrl(CF_API_ENDPOINT_URL)).to.equal(EXPECTED_HRTT_URL_FROM_ENV);
            });
            it(`returns the "HRTT_URL" environment variable when destinations return undefined`, async () => {
                (0, bas_sdk_sinon_helper_1.stubEnv)({ HRTT_URL: EXPECTED_HRTT_URL_FROM_ENV });
                (0, sinon_1.stub)(dest, "getDestinations").throwsException("failed to retrieve destination");
                (0, chai_1.expect)(await hrttHelper.getUrl(CF_API_ENDPOINT_URL)).to.equal(EXPECTED_HRTT_URL_FROM_ENV);
            });
            it(`returns the URL based on the endpoint parameter when there are no destinations or HRTT_URL env var`, async () => {
                (0, sinon_1.stub)(dest, "getDestinations").throwsException("failed to retrieve destination");
                (0, chai_1.expect)(await hrttHelper.getUrl(CF_API_ENDPOINT_URL)).to.equal(EXPECTED_HRTT_URL_FROM_CF);
            });
            it("fails to get HRTT URL when there are no destinations and environment is not configured and CF enpoint is missing", async () => {
                (0, bas_sdk_sinon_helper_1.stubEnv)({ HRTT_URL: "" });
                (0, sinon_1.stub)(dest, "getDestinations").returns(Promise.resolve([]));
                await (0, chai_1.expect)(hrttHelper.getUrl("")).to.be.rejectedWith("endpoint is missing");
            });
        });
    });
});
describe("index", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("HrttHelper", () => {
        let hrttHelper;
        beforeEach(() => {
            hrttHelper = createHrttHelper();
            (0, chai_1.expect)(hrttHelper).to.be.not.undefined;
        });
        describe("getUrlFromCFendpoint-checkUrl", () => {
            const hrttUrlEndpointUseCases = [
                {
                    desc: "check standrat cf url(without cf landscape extension)",
                    cfUrl: "https://api.cf.eu10.hana.ondemand.com",
                    expectedHrrtUrl: "https://hana-cockpit.cfapps.eu10.hana.ondemand.com",
                },
                {
                    desc: "check standrat cf url(with cf landscape extension)",
                    cfUrl: "https://api.cf.eu10-100.hana.ondemand.com",
                    expectedHrrtUrl: "https://hana-cockpit-100.cfapps.eu10.hana.ondemand.com",
                },
                {
                    desc: "check cf url(with cf landscape extension)",
                    cfUrl: "https://api.cf.eu10-100-255-333.hana.ondemand.com",
                    expectedHrrtUrl: "https://hana-cockpit-100-255-333.cfapps.eu10.hana.ondemand.com",
                },
                {
                    desc: "check standrat cf url(without cf landscape extension)",
                    cfUrl: "https://api.cf.eu11312.hana-335.ondemand.com",
                    expectedHrrtUrl: "https://hana-cockpit.cfapps.eu11312.hana-335.ondemand.com",
                },
            ];
            //go through all the failure use cases
            hrttUrlEndpointUseCases.forEach(function (useCase) {
                it(useCase.desc, async function () {
                    (0, chai_1.expect)(await hrttHelper.getUrl(useCase.cfUrl)).to.equal(useCase.expectedHrrtUrl);
                });
            });
        });
        const checkInvalidUrl = "heck invalid url, url does not contain dot in url address";
        describe("getUrlFromCFendpoint - check invalid url that throw exception", () => {
            const hrttUrlEndpointUseCases = [
                {
                    desc: checkInvalidUrl,
                    cfUrl: "https://api.cf.eu10hanaondemandcom",
                    expMsg: `Invalid URL, could not find "." in CF domain 'eu10hanaondemandcom' url`,
                },
                {
                    desc: checkInvalidUrl,
                    cfUrl: "https://api.cf.eu10-100hanaondemandcom",
                    expMsg: `Invalid URL, could not find "." in CF domain 'eu10-100hanaondemandcom' url`,
                },
                {
                    desc: checkInvalidUrl,
                    cfUrl: "https://api.cf.eu10-100-255-333hanaondemandcom",
                    expMsg: `Invalid URL, could not find "." in CF domain 'eu10-100-255-333hanaondemandcom' url`,
                },
                {
                    desc: checkInvalidUrl,
                    cfUrl: "https://api.cf.eu11312hana-335ondemandcom",
                    expMsg: `Invalid URL, could not find "." in CF domain 'eu11312hana-335ondemandcom' url`,
                },
            ];
            //go through all the failure use cases
            hrttUrlEndpointUseCases.forEach(function (useCase) {
                it(useCase.desc, async function () {
                    hrttHelper = createHrttHelper();
                    await (0, chai_1.expect)(hrttHelper.getUrl(useCase.cfUrl)).to.be.rejectedWith(useCase.expMsg);
                });
            });
        });
    });
});
//# sourceMappingURL=hrtt-helper.spec.js.map