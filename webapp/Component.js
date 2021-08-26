(function () {
	jQuery.sap.registerModulePath("hcm.fab.lib.common", "/sap/bc/ui5_ui5/sap/hcmfab_common/");
}());
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "at/hcm/timerebooking/model/models",
    "sap/ui/model/json/JSONModel",
    "hcm/fab/lib/common/util/CommonModelManager"
], function (t, e, s, J, C) {
	"use strict";

	return t.extend("at.hcm.timerebooking.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			t.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(s.createDeviceModel(), "device");

			this.setModel(new J({
                sEmployeeNumber: null,
                sOnBehalfEnabled: false,
                sIsManager: false,
			}), "global");
        },
        destroy: function () {
            this._oErrorHandler.destroy();
            t.prototype.destroy.apply(this, arguments);
        },
        getContentDensityClass: function () {
            if (this._sContentDensityClass === undefined) {
                if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                    this._sContentDensityClass = "";
                } else if (!e.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        },
        getAssignmentPromise: function (n) {
            var g = this.getModel("global"),
                e = g.getProperty("/sEmployeeNumber"),
                A = function (o) {
                    g.setProperty("/sEmployeeNumber", o.EmployeeId);
                    g.setProperty("/sOnBehalfEnabled", o.IsOnBehalfEnabled);
                    g.setProperty("/sIsManager", o.IsManager);
                    return o.EmployeeId;
                }.bind(this);
            if (n) {
                return C.getAssignmentInformation(n, "TIMEREBOOKING").then(A);
            }
            if (!e){
                return C.getDefaultAssignment("TIMEREBOOKING").then(A);
            }
            return Promise.resolve(e);
        }
	});
});
