sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"at/hcm/timerebooking/model/models"
], function (t, e, s) {
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
        }        
        
	});
});
