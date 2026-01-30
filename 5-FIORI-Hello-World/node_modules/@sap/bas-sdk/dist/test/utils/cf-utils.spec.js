"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cf_utils_1 = require("../../src/utils/cf-utils");
const chai_1 = require("chai");
describe("index", () => {
    const CF_API_ENDPOINT_URL = "https://api.cf.from-cf.hana.ondemand.com";
    describe("getCfDomain", () => {
        it(`returns the host without the "api.cf" prefix`, () => {
            (0, chai_1.expect)((0, cf_utils_1.getCfDomain)(CF_API_ENDPOINT_URL)).to.equal("from-cf.hana.ondemand.com");
        });
        const failureUseCases = [
            {
                desc: "failes when endpoint is empty",
                endPoint: "",
                expMsg: "endpoint is missing",
            },
            {
                desc: "failes when URL cannot be parsed",
                endPoint: " ",
                expMsg: /Could not parse the following/,
            },
            {
                desc: `failes when the schema is not https`,
                endPoint: "http://api.cf.from-cf.hana.ondemand.com",
                expMsg: `The endpoint 'http://api.cf.from-cf.hana.ondemand.com' URL is not an https schema`,
            },
            {
                desc: `failes when the endpoint URL does't start with "api.cf." prefix" `,
                endPoint: "https://api-not-cf.from-cf.hana.ondemand.com",
                expMsg: `The endpoint 'https://api-not-cf.from-cf.hana.ondemand.com' URL doesn't start with "api.cf."`,
            },
        ];
        //go through all the failure use cases
        failureUseCases.forEach(function (useCase) {
            it(useCase.desc, function () {
                (0, chai_1.expect)(() => {
                    (0, cf_utils_1.getCfDomain)(useCase.endPoint);
                }).to.throw(Error, useCase.expMsg);
            });
        });
    });
});
//# sourceMappingURL=cf-utils.spec.js.map