/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"athcm./timerebooking/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
