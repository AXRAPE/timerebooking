sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/core/LocaleData",
    "sap/ui/core/ValueState",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "sap/ui/core/format/FileSizeFormat"
], function (e, t, r, i, a, n, s) {
	"use strict";
	return {
		formatObjectTitle: function (e, t) {
			if (sap.ui.Device.system.desktop && t) {
				return e + " (" + t + ")"
			}
			return e
        }
    }
});        