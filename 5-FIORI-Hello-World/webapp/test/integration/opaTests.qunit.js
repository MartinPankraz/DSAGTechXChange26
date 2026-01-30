/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["hello/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
