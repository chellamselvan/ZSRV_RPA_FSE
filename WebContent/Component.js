jQuery.sap.declare("ZSRV_RPA_FSE.Component");

jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.History");

jQuery.sap.require("sap.ui.core.routing.Router");

sap.ui.core.UIComponent.extend("ZSRV_RPA_FSE.Component", {
	metadata : {
		"name" : "Master Detail Sample",
		"version" : "1.0",
		"includes" : [],
		"dependencies" : {
			"libs" : [ "sap.m", "sap.me", "sap.ushell" ],
			"components" : []
		},

		"config" : {
			"resourceBundle" : "i18n/messageBundle.properties",
			"titleResource" : "SHELL_TITLE",

			"serviceConfig" : {
				name : "ZRPA_ASSIGNMENT_SRV",
				// serviceUrl:
				// http://gssusnj5.globalsoftsolutions.net:8002/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/
				serviceUrl : "/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/"
			}
		},

		routing: {
			config: {
				viewType : "XML",
				viewPath: "ZSRV_RPA_FSE.view",  // common prefix
				targetAggregation: "detailPages",
				clearTarget: false
			},
			routes:
				[{
					name : "master",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl: "fioriContent",
					subroutes : [
									{
										pattern : "detail/{contextPath}", // will be the url and from has to be provided in the data
										view : "Detail",
										viewType: "XML",
										name : "detail" // name used for listening or navigating to this route
											
									},
									
									{
										pattern : "ConfMaster/{id}",
										name : "ConfMaster",
										view : "ConfMaster"
									},

									{
										pattern : "ConfItems/{id}",
										name : "ConfItems",
										view : "ConfItems"
									},

									{
										pattern : ":all*:", // catchall
										view : "Detail",
										name : "catchall", // name used for listening or navigating
															// to this route				

									} ]	
									
								
									
									
									
									
								
				}]
		}
	},

	init : function() {		
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this
				.getRouter());
		// this component should automatically initialize the router
		this.getRouter().initialize();

		var oServiceConfig = this.getMetadata().getConfig()["serviceConfig"];
		var sServiceUrl = oServiceConfig.serviceUrl;
		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("ZSRV_RPA_FSE");

		// if proxy needs to be used for local testing...
		var sProxyOn = jQuery.sap.getUriParameters().get("proxyOn");
		var bUseProxy = ("true" === sProxyOn);
		if (bUseProxy) {
			sServiceUrl = rootPath + "/proxy" + sServiceUrl;
		}

		// start mock server if required
		var responderOn = jQuery.sap.getUriParameters().get("responderOn");
		// var bUseMockData = ("true" === responderOn);
		var bUseMockData = false;
		if (bUseMockData) {
			jQuery.sap.require("sap.ui.app.MockServer");
			var oMockServer = new sap.ui.app.MockServer({
				rootUri : sServiceUrl
			});
			oMockServer.simulate(rootPath + "/model/metadata.xml", rootPath
					+ "/model/");
			oMockServer.start();

			var msg = "Running in demo mode with mock data."; // not
																// translated
																// because only
																// for
																// development
																// scenario
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				duration : 4000
			});
		}

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : rootPath + "/i18n/messageBundle.properties"
		});
		this.setModel(i18nModel, "i18n");

	},

	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function() {		
		var oServiceConfig = this.getMetadata().getConfig()["serviceConfig"];
		var sServiceUrl = oServiceConfig.serviceUrl;
		var oViewData = sap.ui.view({
			id : "app",
			viewName : "ZSRV_RPA_FSE.view.App",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : {
				component : this
			}
		});

		// set data model
		var m = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		var idNew;
		// this.setModel(m);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel(
				{
					isTouch : sap.ui.Device.support.touch,
					isNoTouch : !sap.ui.Device.support.touch,
					isPhone : jQuery.device.is.phone,
					isNoPhone : !jQuery.device.is.phone,
					listMode : (jQuery.device.is.phone) ? "None"
							: "SingleSelectMaster",
					listItemType : (jQuery.device.is.phone) ? "Active"
							: "Inactive"
				});

		deviceModel1 = new sap.ui.model.json.JSONModel();
		deviceModelItem = new sap.ui.model.json.JSONModel(
				{
					isTouch : sap.ui.Device.support.touch,
					isNoTouch : !sap.ui.Device.support.touch,
					isPhone : jQuery.device.is.phone,
					isNoPhone : !jQuery.device.is.phone,
					listMode : (jQuery.device.is.phone) ? "None"
							: "SingleSelectMaster",
					listItemType : (jQuery.device.is.phone) ? "Active"
							: "Inactive"
				});
		deviceModelCat = new sap.ui.model.json.JSONModel(
				{
					isTouch : sap.ui.Device.support.touch,
					isNoTouch : !sap.ui.Device.support.touch,
					isPhone : jQuery.device.is.phone,
					isNoPhone : !jQuery.device.is.phone,
					listMode : (jQuery.device.is.phone) ? "None"
							: "SingleSelectMaster",
					listItemType : (jQuery.device.is.phone) ? "Active"
							: "Inactive"
				});
		deviceModelConf = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		deviceModel2 = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		deviceModel3 = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		prdModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		model = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		confSurvey = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None"
					: "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active"
					: "Inactive"
		});
		var myArray1 = [];

		deviceModel.setDefaultBindingMode("TwoWay");

		var oModelJson = new sap.ui.model.json.JSONModel();

		var filters = new Array();
		var filtercust = new sap.ui.model.Filter("IvUsername",
				sap.ui.model.FilterOperator.EQ, "GUJERSEY");
		// /filters.push(filtercust);

		var filter1 = [ new sap.ui.model.odata.Filter("IvUsername", [ {
			operator : "eq",
			value1 : "'FSE01'"
		} ]) ];
		filters.push(filter1);

		var query = "IvUsername eq 'FSE01'";
		m.read("/AssignmentDetailsSet?$filter=" + query, null, null, null,
				function(oData, oResponse) {
					// m.read("/ServiceOrderSet", null, null, filters,
					// function(oData, oResponse){
					deviceModel1.setData({
						Data : oData
					});
					oModelJson.setData({
						Data : oData
					});
					// this.setModel(deviceModel1, "device");
					sap.ui.getCore().setModel(deviceModel);
				}, null);
		
	
	
		// this.setModel(deviceModel, "device");

		oViewData.setModel(deviceModel, "device");

		oViewData.setModel(oModelJson);
		/*
		 * return sap.ui.view({ viewName : "ZSRV_RPA_FSE.view.App", type :
		 * sap.ui.core.mvc.ViewType.XML, viewData : oViewData });
		 */
		return oViewData;
	}
});
