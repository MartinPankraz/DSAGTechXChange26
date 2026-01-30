/*global QUnit*/

sap.ui.define([
	"hello/controller/HelloWorld.controller"
], function (Controller) {
	"use strict";

	QUnit.module("HelloWorld Controller");

	QUnit.test("I should test the HelloWorld controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
