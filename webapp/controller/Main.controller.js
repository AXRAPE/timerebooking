sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	"at/hcm/timerebooking/utils/formatter"
], function (e, t, i, r, o) {
	"use strict";
	return e.extend("at.hcm.timerebooking.controller.Main", {
		formatter: o,
		onInit: function () {
            this._sEmployeeNumber = null;
            this.oEmployeeModel = new t({

            });
            this.oConfigurationModel = new t({
                
            })
            this.oComponent = this.getOwnerComponent();
            this.oODataModel = this.oComponent.getModel();
            this.getRouter().getRoute("main").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (E) {
            this.oODataModel.metadataLoaded().then(function () {
                var A = this.getOwnerComponent().getAssignmentPromise();
                A.then(function (s) {
                    this._initMainModelBinding(s);
                }.bind(this));
            }.bind(this));
        },
        _initMainModelBinding: function(E){
            if (this._sEmployeeNumber !== E) {
                this.getView().unbindElement();
                this._sEmployeeNumber = E;
                this._readEmployeeData(E);
                this._readConfiguration(E);
                this._readEntitlements(E);
            }
        },
        _readEntitlements: function(E){
            this._oEntitlementColumListItemTemplate = this._oEntitlementColumListItemTemplate ? this._oEntitlementColumListItemTemplate.clone() :
                this.getView().byId("entitlementColumnListItem");
 			this.getView().byId("idTimeRebookingRequest").bindItems({
				path: "/TimeReBookingRequestSet",
				template: this._oEntitlementColumListItemTemplate,
			});
        },
        _readEmployeeData: function(E){
            var a = this.oODataModel.createKey("EmployeeSet", {
                EmployeeNumber: E
            });
            var path = "/" + a;
            this.getView().bindElement({
                path: path
            });
        },
        _readConfiguration: function(E){
            var lclCntrl = this;
            this.oODataModel.read("/ConfigurationSet",{
                filters: [new i("EmployeeNumber", "EQ", E)],
                success: function (R) {
                    
                }.bind(this),
                error: function(o){
                    lclCntrl._showErrorMessageBox(o.message);
                }.bind(this)
            });
        },
        onCreateRequest: function(e){

        },
		_showErrorMessageBox: function (e) {
			var t = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.error(e, {
				styleClass: t ? "sapUiSizeCompact" : "",
				onClose: function (e) {
					this.setBusy(false)
				}
			})
        },
		_handleODataError: function (e) {
			var t = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var a = e.headers["Content-Type"];
			var o = this;
			if (a && a.indexOf("application/json") !== -1) {
				if (e.responseText.indexOf("/IWBEP/CX_MGW_BUSI_EXCEPTION") !== -1) {
					var n = JSON.parse(e.responseText).error.message.value;
					sap.m.MessageBox.error(n, {
						styleClass: t ? "sapUiSizeCompact" : "",
						onClose: function (e) {
							o.setBusy(false)
						}
					})
				}
			}
		},        

    });
});