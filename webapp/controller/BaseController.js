sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library"
], function (e, t, n) {
	"use strict";
	return e.extend("at.hcm.timerebooking.controller.BaseController", {
		getRouter: function () {
			return t.getRouterFor(this);
		},
		getModel: function (e) {
			return this.getView().getModel(e);
		},
		setModel: function (e, t) {
			return this.getView().setModel(e, t);
		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		getResourceText: function (e, t) {
			return this.getView().getModel("i18n").getResourceBundle().getText(e, t);
		},
		addHistoryEntry: function () {
			var e = [];
			return function (t, n) {
				if (n) {
					e = [];
				}
				var r = e.some(function (e) {
					return e.intent === t.intent;
				});
				if (!r) {
					e.push(t);
					this.getOwnerComponent().getService("ShellUIService").then(function (t) {
						t.setHierarchy(e);
					});
				}
			};
		},
		setBusy: function (e) {
			this.getModel("appView").setProperty("/busy", e);
		}
	});
});