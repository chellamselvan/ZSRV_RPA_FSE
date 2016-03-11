jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");

sap.ui.core.mvc.Controller
		.extend(
				"ZSRV_RPA_FSE.view.ConfItems",
				{

					onInit : function() {
						var view = this.getView();
						/*
						 * this.oRouter.attachRouteMatched(function(oEvent) { if
						 * (oEvent.getParameter("name") === "taskDetail") { var
						 * context = new sap.ui.model.Context(view.getModel(),
						 * '/' + oEvent.getParameter("arguments").contextPath);
						 * view.setBindingContext(context); } }, this);
						 */

						this._oRouter = sap.ui.core.UIComponent
								.getRouterFor(this);
						// this._oRouter.attachRouteMatched(this._handleRouteMatched,this);

						var bus = sap.ui.getCore().getEventBus();
						bus.subscribe("nav", "to", this.navToHandler, this);
						var idNew, idItem, selectedItem;
						this.onDefPrd();

					},

					navToHandler : function(channelId, eventId, data) {
						if (data && data.viewId) {
							var oBindingContext = data.data.bindingContext;
							this.getView().setBindingContext(oBindingContext);
							// var oViewData = sap.ui.view();
						}

					},

					onDefPrd : function(evt) {

						var lblqty = this.getView().byId("lbqty");
						var txtqty = this.getView().byId("txtqty");

						var lbldur = this.getView().byId("lbldur");
						var txtdur = this.getView().byId("txtdur");

						var lblstrt = this.getView().byId("lbstrt");
						var txtstrt = this.getView().byId("txtstrt");
						var txttime = this.getView().byId("txttime");

						var lblend = this.getView().byId("lbend");
						var txtend = this.getView().byId("txtend");
						var txtendtime = this.getView().byId("txtendtime");

						lblstrt.setVisible(false);
						txtstrt.setVisible(false);
						txttime.setVisible(false);

						lblend.setVisible(false);
						txtend.setVisible(false);
						txtendtime.setVisible(false);

						lbldur.setVisible(false);
						txtdur.setVisible(false);

						
						var oBindingContext;
						var oModelJson = new sap.ui.model.json.JSONModel();
						var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
						// set data model
						var m = new sap.ui.model.odata.ODataModel(sServiceUrl,
								true);
						oView = this.getView();

						var query1 = "IvPrdType eq '01'";
						var query = "/PrdSrchSet?$filter=" + query1;
						m.read(query, null, null, null, function(oData,
								oResponse) {
							var value = [];
							value = oData.results;
					//		console.log(value);

							var count = value.length;

						//	console.log(count);
							prdModel.setData({
								pData : oData
							});

							oView.setBindingContext(oBindingContext);
							sap.ui.getCore().setModel(prdModel);
							oView.setModel(prdModel);
						}, null); 						
						
						// this.nav.back("Detail");
					},

					onSelectPrd : function(evt) {
						var value = this.getView().byId("prdType");

						console.log(evt.mParameters.selectedItem.getText());

						selectedItem = evt.mParameters.selectedItem.getText();

						
						var oBindingContext;
						var oModelJson = new sap.ui.model.json.JSONModel();
						var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
						// set data model
						var m = new sap.ui.model.odata.ODataModel(sServiceUrl,
								true);
						oView = this.getView();

						
						
						var lblqty = this.getView().byId("lbqty");
						var txtqty = this.getView().byId("txtqty");

						var lblsno = this.getView().byId("lblsno");
						var txtsno = this.getView().byId("txtsno");

						var lbldur = this.getView().byId("lbldur");
						var txtdur = this.getView().byId("txtdur");

						var lblstrt = this.getView().byId("lbstrt");
						var txtstrt = this.getView().byId("txtstrt");
						var txttime = this.getView().byId("txttime");

						var lblend = this.getView().byId("lbend");
						var txtend = this.getView().byId("txtend");
						var txtendtime = this.getView().byId("txtendtime");

						if (selectedItem == 'Service') {
							lblqty.setVisible(false);
							txtqty.setVisible(false);
							lblsno.setVisible(false);
							txtsno.setVisible(false);
							lblstrt.setVisible(true);
							txtstrt.setVisible(true);
							txttime.setVisible(true);
							lblend.setVisible(true);
							txtend.setVisible(true);
							txtendtime.setVisible(true);
							lbldur.setVisible(true);
							txtdur.setVisible(true);
							

							var query1 = "IvPrdType eq '02'";
							var query = "/PrdSrchSet?$filter=" + query1;
							m.read(query, null, null, null, function(oData,
									oResponse) {
								var value = [];
								value = oData.results;
						//		console.log(value);

								var count = value.length;

							//	console.log(count);
								prdModel.setData({
									pData : oData
								});
								
								oView.setBindingContext(oBindingContext);
								sap.ui.getCore().setModel(prdModel);
								oView.setModel(prdModel);
							}, null);	
							
							
						} else {

							lblqty.setVisible(true);
							txtqty.setVisible(true);
							lblsno.setVisible(true);
							txtsno.setVisible(true);
							lblstrt.setVisible(false);
							txtstrt.setVisible(false);
							txttime.setVisible(false);
							lblend.setVisible(false);
							txtend.setVisible(false);
							txtendtime.setVisible(false);
							lbldur.setVisible(false);
							txtdur.setVisible(false);
							
							var query1 = "IvPrdType eq '01'";
							var query = "/PrdSrchSet?$filter=" + query1;
							m.read(query, null, null, null, function(oData,
									oResponse) {
								var value = [];
								value = oData.results;
						//		console.log(value);

								var count = value.length;

							//	console.log(count);
								prdModel.setData({
									pData : oData
								});
								
								oView.setBindingContext(oBindingContext);
								sap.ui.getCore().setModel(prdModel);
								oView.setModel(prdModel);
							}, null);							
						}

						// this.nav.back("Detail");
					},

					handleNavButtonPress : function(evt) {
						this._oRouter.navTo("ConfMaster", {
							id : 1
						}, {
							contextPath : "datavalue"
						});

						// this.nav.back("Detail");
					},

					handleApprove : function(evt) {

						var txtqty = this.getView().byId("txtqty").getValue();
						var txtsno = this.getView().byId("txtsno").getValue();
						var txtprd = this.getView().byId("prddesc").getValue();

						var myArray = [];
						var i, list1, json1, oDataval;

						var len;
						list1 = model.getData();

						oDataval = model.getJSON();
						if (oDataval != "{}") {
							len = list1.dataitem.length;

							for (var i = 0; i < len; i++) {
								var json1 = {
									id : list1.dataitem[i].id,
									qty : list1.dataitem[i].qty,
									sno : list1.dataitem[i].sno,
									prd : list1.dataitem[i].prd,
									unit : list1.dataitem[i].unit
								};
								myArray.push(json1);

							}
						}

						i = myArray.length;

						i = i + 1;
						i = i * 10;
						var json = {
							id : i,
							qty : txtqty,
							sno : txtsno,
							prd : txtprd,
							unit : "EA"
						};
						myArray.push(json);

						var list = {
							dataitem : myArray
						};
						model.setData(list);
						sap.ui.getCore().setModel(model);
						
						
						
						//Navigating to Confirmation Header View
						this._oRouter.navTo("ConfMaster", {
							id : 1
						}, false);
					},

					handleSearch : function() {
						// add filter for search
						var filters = [];
						var searchString = this.getView().byId("searchField")
								.getValue();
						if (searchString && searchString.length > 0) {
							filters = [ new sap.ui.model.Filter("CustomerName",
									sap.ui.model.FilterOperator.Contains,
									searchString) ];
						}

						// update list binding
						var list = this.getView().byId("list");
						var binding = list.getBinding("items");
						binding.filter(filters);
					},

					handleSelect : function(oEvent) {

						var oBindingContext = oEvent.getParameter("listItem")
								.getBindingContext(),

						sViewId = "detail"
								+ oEvent.getParameter("listItem").data(
										"Demandid");

						// Pass event to EventBus
						sap.ui.getCore().getEventBus().publish("nav", "to", {
							viewName : "ZSRV_RPA_FSE.view.Detail",
							viewId : sViewId,
							data : {
								bindingContext : oBindingContext
							}
						});

					},

					handleListSelect : function(evt) {
						var context = evt.getParameter("listItem")
								.getBindingContext();
						this.nav.to("ZSRV_RPA_FSE.view.ConfMaster", context);
					},

					handleValueHelp : function(oController) {
						this.inputId = oController.oSource.sId;
						// create value help dialog
						if (!this._valueHelpDialog) {
							this._valueHelpDialog = sap.ui.xmlfragment(
									"ZSRV_RPA_FSE.view.PrdDialog", this);
							this.getView().addDependent(this._valueHelpDialog);
						}

						// open value help dialog
						this._valueHelpDialog.open();
					},

					_handleValueHelpSearch : function(evt) {
						var sValue = evt.getParameter("value");
						var oFilter = new sap.ui.model.Filter("Name",
								sap.ui.model.FilterOperator.Contains, sValue);
						evt.getSource().getBinding("items").filter([ oFilter ]);
					},

					_handleValueHelpClose : function(evt) {
						var oSelectedItem = evt.getParameter("selectedItem");
						if (oSelectedItem) {
							var productInput = this.getView()
									.byId(this.inputId);
							productInput.setValue(oSelectedItem.getTitle());
						}
						evt.getSource().getBinding("items").filter([]);
					}
				});