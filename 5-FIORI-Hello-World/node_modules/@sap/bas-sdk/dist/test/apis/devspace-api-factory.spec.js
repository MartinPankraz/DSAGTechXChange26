"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line eslint-comments/disable-enable-pair -- ignore for testing scope
/* eslint-disable @typescript-eslint/no-explicit-any -- ignore for testing scope */
const chai_1 = require("chai");
const ws_1 = require("ws");
const assert_1 = require("assert");
const index_1 = require("../../src/index");
const { devspaceApiFactory } = index_1.devspaceApi;
describe("index-devspace-api", () => {
    describe("devspaceApiFactory", () => {
        let wss;
        let wsMockServer;
        let wsMockHandler;
        const prompt = `$ [6n`;
        beforeEach(() => {
            wss = new ws_1.WebSocketServer({ port: 8989 });
            wss.on("connection", function connection(ws) {
                wsMockServer = ws;
                wsMockServer.on("message", wsMockHandler);
            });
        });
        afterEach(() => {
            wss.close();
        });
        it("execute command without connect command", function () {
            (0, chai_1.expect)(devspaceApiFactory("ws://localhost:8991").execute({
                command: "ls",
                args: ["-la"],
            })).to.be.undefined;
        });
        it("create devspace API", function () {
            // prep the mock
            wsMockHandler = (data) => {
                console.log("received: %s", data);
                wsMockServer.send("lala");
            };
            const host1 = "ws://localhost:8989";
            const host2 = "ws://localhost:9090";
            // create devspace api
            const devspaceApi = devspaceApiFactory(host1);
            const devspaceApi2 = devspaceApiFactory(host1);
            const devspaceApi3 = devspaceApiFactory(host2);
            // assert that only diferent ws urls create diferent instances.
            (0, chai_1.expect)(devspaceApi).to.not.be.equals(devspaceApi2);
            (0, chai_1.expect)(devspaceApi).to.not.be.equals(devspaceApi3);
        });
        it("execute command on the devspace API", function (done) {
            // prep the mock
            wsMockHandler = (data) => {
                console.log("received: %s", data.toString());
                wsMockServer.send(`/home/usr/ ${prompt}`);
                wsMockServer.send(`lala/home/bin/ ${prompt}`);
            };
            // create devspace api
            const devspaceApi = devspaceApiFactory("ws://localhost:8989");
            // register
            devspaceApi.onMessage((value) => {
                // assert we recived from server the valid response for the "ls -la" we execute later
                devspaceApi.disconnect();
                (0, chai_1.expect)(value).to.equals("lala");
                done();
            });
            devspaceApi.connect("jwt").then(() => {
                devspaceApi.execute({ command: "ls", args: ["-la"] });
            });
        });
        it("execute command - server close connection", function (done) {
            // prep the mock
            wsMockHandler = (data) => {
                console.log("received: %s", data.toString());
                wsMockServer.send(`/home/bin/ ${prompt}`);
                wsMockServer.send(`lala`);
                wsMockServer.send(`bye!`);
            };
            // create devspace api
            const devspaceApi = devspaceApiFactory("ws://localhost:8989");
            // register
            devspaceApi.onMessage((value) => {
                // assert we received from server the valid response for the "ls -la" we execute later
                devspaceApi.disconnect();
                (0, chai_1.expect)(value).to.equals("lala - connection interrupted...");
            });
            devspaceApi.connect("jwt").then(async () => {
                (0, chai_1.expect)(devspaceApi.connectionOpen).to.be.true;
                devspaceApi.execute({ command: "ls" });
                await new Promise((resolve) => setTimeout(() => resolve(""), 1000)); // 2 sec
                (0, chai_1.expect)(devspaceApi.connectionOpen).to.be.false;
                done();
            });
        });
        it("execute command on the devspace API - connection closed", function () {
            // create devspace api
            const devspaceApi = devspaceApiFactory("ws://localhost:8990");
            devspaceApi
                .connect("jwt")
                .then(() => {
                (0, assert_1.fail)("should fail");
            })
                .catch((e) => {
                (0, chai_1.expect)(e.code).to.contain("ECONNREFUSED");
            });
        });
        it("swapCallback 'error' listener - connection closed", function () {
            // create devspace api
            const devspaceApi = devspaceApiFactory("ws://localhost:8990");
            const cb = () => undefined;
            devspaceApi["swapCallback"]("error", "callbackOnError", cb);
            (0, chai_1.expect)(devspaceApi["callbackOnError"]).to.equal(cb);
            const other = () => "undefined";
            devspaceApi["swapCallback"]("error", "callbackOnError", other);
            (0, chai_1.expect)(devspaceApi["callbackOnError"]).to.be.equal(other);
        });
        it("swapCallback 'close' listener", function (done) {
            // create devspace api
            const devspaceApi = devspaceApiFactory("ws://localhost:8989");
            devspaceApi.connect("jwt").then(() => {
                let onCloseOut;
                const closeText = "conn closed";
                // eslint-disable-next-line @typescript-eslint/no-unused-vars -- test scope
                const cb = () => {
                    onCloseOut = closeText;
                    return;
                };
                devspaceApi["swapCallback"]("close", "callbackOnClose", cb);
                (0, chai_1.expect)(devspaceApi["callbackOnClose"]).to.equal(cb);
                devspaceApi.disconnect();
                setTimeout(() => {
                    (0, chai_1.expect)(onCloseOut).to.be.equals(closeText);
                    done();
                }, 1000);
            });
        });
        it("disconnect when no connection", function () {
            const devspaceApi = devspaceApiFactory("ws://localhost:8989");
            devspaceApi.disconnect();
        });
    });
});
//# sourceMappingURL=devspace-api-factory.spec.js.map