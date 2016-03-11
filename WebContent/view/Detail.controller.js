jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");

sap.ui
		.define(
				[ 'jquery.sap.global', 'sap/ui/core/Fragment',
						'sap/ui/core/mvc/Controller',
						'sap/ui/model/json/JSONModel' ],
				function(jQuery, Fragment, Controller, JSONModel) {
					"use strict";

					sap.ui.core.mvc.Controller
							.extend(
									"ZSRV_RPA_FSE.view.Detail",
									{

										onInit : function() {
											var view = this.getView();

											this._oRouter = sap.ui.core.UIComponent
													.getRouterFor(this);
											this._oRouter.attachRouteMatched(
													this._handleRouteMatched,
													this);

											var bus = sap.ui.getCore()
													.getEventBus();
											bus.subscribe("nav", "to",
													this.navToHandler, this);
											var idNew, idItem, count, item;
											sap.ui.getCore().setModel(
													deviceModel1, "device");
											this.getView().setModel(
													deviceModel1);
											// this.onFetchConf();
										},

										navToHandler : function(channelId,
												eventId, data) {
											if (data && data.viewId) {
												var oBindingContext = data.data.bindingContext;
												// this.getView().setBindingContext(oBindingContext);
												// var oViewData =
												// sap.ui.view();
												var oModelJsonItem = new sap.ui.model.json.JSONModel();
												var oModelJsonConf = new sap.ui.model.json.JSONModel();
												// var sServiceUrl =
												// data.data.bindingContext.oModel.oData.Data.results[1].OrderToPartner.__deferred.uri;
												var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
												// set data model
												var item;
												var items = new sap.ui.model.odata.ODataModel(
														sServiceUrl, true);
												var oView = this.getView();
												// var id =
												// oView.byId("Txtobj");
												var i = data.data.bindingContext.sPath
														.substr(14);
												this.oView
														.setBindingContext(data.data.bindingContext);
												// console.log(i);
												var headerValue = data.data.bindingContext.oModel.oData.Data.results[i];
												var id = data.data.bindingContext.oModel.oData.Data.results[i].Demandid;
												// console.log(id);
												var soItem = data.data.bindingContext.oModel.oData.Data.results[i].Item;
												var idNew;
												idNew = id;

												var reqstdate = oView
														.byId("reqstdate");
												reqstdate
														.setText(headerValue.ReqStart);
												var reqenddate = oView
														.byId("reqenddate");
												reqenddate
														.setText(headerValue.ReqEnd);

												var header = oView
														.byId("header");
												header
														.setTitle(headerValue.DemandidItem);
												header
														.setNumber(headerValue.Description);
												// header.setNumberUnit(headerValue.MaintType);

												var customer = oView
														.byId("Customer");
												var region = headerValue.Region;
												var customer1 = headerValue.CustomerName
														+ "/"
														+ headerValue.City
														+ region;
												customer.setText(customer1);

												// equipId.setText(value[0].EquipId);

												/*
												 * var query1 = "Demandid='" +
												 * id + "',Username='SCHAUHAN'";
												 * var query =
												 * "/HeaderDetailsSet(" + query1 +
												 * ")/HeaderToItem";
												 */

												var query1 = "IvObjectid eq '"
														+ id + "' and Item eq '" + soItem + "'";
												var query = "/AssignmentsItemSet?$filter="
														+ query1;

												if (item == null) {

													item = 'X';
													items
															.read(
																	query,
																	null,
																	null,
																	null,
																	function(
																			oData,
																			oResponse) {

																		var value = [];
																		value = oData.results;
																		console
																				.log(value);

																		deviceModelItem
																				.setData({
																					dataitem : value
																				});
																		oModelJsonItem
																				.setData({
																					Data : oData
																				});

																		var demandItem = oView
																				.byId("demandItem");
																		demandItem
																				.setText(value[0].DemandidItem);
																		var equipId = oView
																				.byId("equipId");
																		equipId
																				.setText(value[0].EquipId);
																		var equipDesc = oView
																				.byId("equipDesc");
																		equipDesc
																				.setText(value[0].EquipDesc);
																		/*var jobType = oView
																				.byId("jobType");
																		jobType
																				.setText(value[0].JobType);*/

																		var iBase = oView
																				.byId("iBase");
																		iBase
																				.setText(value[0].IbaseId);

																		var iBasedesc = oView
																				.byId("iBasedesc");
																		iBasedesc
																				.setText(value[0].IbaseDesc);

																		var cntNo = oView
																				.byId("cntNo");
																		cntNo
																				.setText(value[0].ContractNo);

																		var cntDesc = oView
																				.byId("cntDesc");
																		cntDesc
																				.setText(value[0].ContractDesc);
																		
																		var cntstdate = oView
																		.byId("cntstdate");
																cntstdate
																		.setText(value[0].ContStartDate);
																
																var cntenddate = oView
																.byId("cntenddate");
														cntenddate
																.setText(value[0].ContEndDate);
																		
																		var apptStatus = oView
																				.byId("apptStatus");
																		apptStatus
																				.setText(value[0].ApptStatus);

																		var itNotes = oView
																				.byId("itNotes");
																		itNotes
																				.setText(value[0].Notes);
																		sap.ui
																				.getCore()
																				.setModel(
																						deviceModelItem,
																						"device");
																		oView
																				.setBindingContext(oBindingContext);

																		var queryconf1 = "IvObjectid eq '"
																				+ id
																				+ "' and IvItemNo eq '" 
																				+ soItem + "'" ;
																		var queryconf = "/SrvConfDetailsSet?$filter="
																				+ queryconf1;

																		var conf = new sap.ui.model.odata.ODataModel(
																				sServiceUrl,
																				true);

																		conf
																				.read(
																						queryconf,
																						null,
																						null,
																						null,
																						function(
																								oData,
																								oResponse) {

																							var value1 = [];
																							value1 = oData.results;
																							deviceModelConf
																									.setData({
																										dataConf : value1
																									});
																							oModelJsonConf
																									.setData({
																										DataConf : oData
																									});

																							sap.ui
																									.getCore()
																									.setModel(
																											deviceModelConf);

																							var oTable = oView
																									.byId("Confirmation1");
																							oTable
																									.setModel(deviceModelConf);

																							oView
																									.setModel(deviceModelConf);
																							oView
																									.setModel(deviceModel1);

																						},
																						null);


																	}, null);
												}

											}
										},

										onCreateConf : function(evt) {

											var oView = this.getView();

											var refNo = oView.byId("header");
											var idNew1 = refNo.getTitle();
											idNew1 = idNew1.split("/");
											var idNew = idNew1[0];
											this._oRouter.navTo("ConfMaster", {
												id : idNew
											}, false);

											var oBindingContext = this
													.getView()
													.getBindingContext(),

											sViewId1 = "taskDetail" + idNew;

											sap.ui
													.getCore()
													.getEventBus()
													.publish(
															"nav",
															"to",
															{
																viewName : "ZSRV_RPA_FSE.view.ConfMaster",
																viewId : sViewId1,
																data : {
																	bindingContext : oBindingContext
																}
															});

										},

										_handleRouteMatched : function(evt) {
											if (evt.getParameter("name") !== "detail") {
												return;
											}
											this._contextPath = evt
													.getParameter("arguments").contextPath;
											var oModel = this.getView()
													.getModel();

											var sPath = '/'
													+ oEvent
															.getParameter("arguments").contextPath;
											var oContext = new sap.ui.model.Context(
													oModel, sPath);
											this.getView().setBindingContext(
													oContext);
											sap.ui
													.getCore()
													.getEventBus()
													.publish(
															"app",
															"RefreshDetail",
															{
																context : oContext
															});
										},

										openActionSheet : function() {

											if (!this._oActionSheet) {
												this._oActionSheet = new sap.m.ActionSheet(
														{
															buttons : new sap.ushell.ui.footerbar.AddBookmarkButton()
														});
												this._oActionSheet
														.setShowCancelButton(true);
												this._oActionSheet
														.setPlacement(sap.m.PlacementType.Top);
											}

											this._oActionSheet.openBy(this
													.getView().byId(
															"actionButton"));
										},

										onExit : function() {
											if (this._oActionSheet) {
												this._oActionSheet.destroy();
												this._oActionSheet = null;
											}
										},

										handleViewSettingsDialogButtonPressed : function(
												oEvent) {
											if (!this._oDialog) {
												this._oDialog = sap.ui
														.xmlfragment(
																"ZSRV_RPA_FSE.view.Dialog",
																this);
											}
											// toggle compact style
											jQuery.sap.syncStyleClass(
													"sapUiSizeCompact", this
															.getView(),
													this._oDialog);
											this._oDialog.open();
										},

										handleApprove : function(evt) {
											this
													._showApproveRejectDialog("approve");
										},

										handleReject : function(evt) {
											this
													._showApproveRejectDialog("reject");
										},

										handleReschedule : function(evt) {
											var view = this.getView();

											var serviceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_UPDATE_SRV";

											var oModel = new sap.ui.model.odata.ODataModel(
													serviceUrl, true,
													"GUJERSEY", "gss888");
											view
													.setModel(oModel,
															"modelUpdate");

											this
													._showRescheduleDialog("reschedule");

										},

										/**
										 * Shows the approve or reject dialog
										 * 
										 * @param {String}
										 *            [mode] Allows to differ
										 *            between APPROVE and REJECT
										 *            mode
										 */
										_showApproveRejectDialog : function(
												mode, forwardRecipientName) {

											var buttontxt, dialogTitle, textval, successMsg;
											var oView = this.getView();

											var refNo = oView.byId("header");
											var txtRefno = refNo.getTitle();

											txtRefno = txtRefno.split("/");
											txtRefno = txtRefno[0];

											var txtNotes;
											var txtItem = oView.byId(
													"demandItem").getText()
													.substr(11);

											if (mode == "approve") {
												buttontxt = "Accept";
												dialogTitle = "Accept Assignment";
												// textval = "Accept RPA by
												// login user ?";
												successMsg = "Accepted";
												var txtStatus = "E0008";
											} else if (mode == "reject") {
												buttontxt = "Reject";
												dialogTitle = "Reject Assignment";
												// textval = "Reject RPA by
												// login user ?";
												successMsg = "Rejected";
												var txtStatus = "E0001";
											}
											// create dialog
											var that = this;

											/* Notes field declarion */

											var txtNotes = new sap.m.TextArea(
													{
														rows : 4,
														width : "100%",
														placeholder : "Add note (Optional)"
													});

											var dialog = new sap.m.Dialog(
													{
														title : dialogTitle,
														content : [
																new sap.m.Text(
																		{
																			text : textval
																		// text
																		// :
																		// confirmMsg
																		})
																		.addStyleClass("sapUiSmallMarginBottom"),
																txtNotes, ],
														contentWidth : "30rem",
														leftButton : new sap.m.Button(
																{

																	text : buttontxt, // "Approve",
																	// text :
																	// confirmButtonText,
																	press : function() {
																		dialog
																				.close();
																		var serviceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV";
																		var oModel1 = new sap.ui.model.odata.ODataModel(
																				serviceUrl,
																				true,
																				"GUJERSEY",
																				"gss888");


																		var oSelectedDate, timeVal;

																		var urlParams;
																		var txtNotes1 = txtNotes.getValue();																		
																		
																		urlParams = "IvRefNo='"
																				+ txtRefno
																				+ "',IvStatus='"
																				+ txtStatus
																				+ "',Tdline='"
																				+ txtNotes1
																				+ "',IvItemNo='"
																				+ txtItem
																				+ "'";

																		var oPayload = {
																			"IvRefNo" : txtRefno,
																			"IvStatus" : txtStatus,
																			"Tdline" : txtNotes1,
																			"IvItemNo" : txtItem
																		};
																		var oEntry = oPayload;

																		var user = "GUJERSEY";
																		var password = "gss888";

																		var headers = {
																			"Content-Type" : "application/json",
																			Accept : "application/json"
																		};
																		var method = "GET";
																		var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/HeaderDetailsSet?$filter=Username eq 'SCHAUHAN'";
																		var requestObj = {

																			requestUri : url,
																			method : method,
																			headers : {
																				"X-Requested-With" : "XMLHttpRequest",
																				"Content-Type" : "application/atom+xml",
																				"DataServiceVersion" : "2.0",
																				"MaxDataServiceVersion" : "3.0",
																				"Accept" : "application/atom+xml",// ;charset=utf-8"
																				"X-CSRF-Token" : "FETCH"
																			},

																			// headers:headers,

																			user : user,
																			password : password

																		}

																		OData
																				.request(
																						requestObj,
																						function(
																								data,
																								response) {

																							var header_xcsrf_token = response.headers['x-csrf-token'];
																							var header_content_type = response.headers['Content-Type'];

																							var newData = {

																								"odata.type" : "UpdSoStatusSet",
																								"IvRefNo" : txtRefno,
																								"IvStatus" : txtStatus,
																								"Tdline" : txtNotes1,
																								"IvItemNo" : txtItem

																							};

																							var method = "PUT";
																							var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/UpdSoStatusSet("
																									+ urlParams
																									+ ")";

																							var requestObj = {

																								requestUri : url,
																								method : method,
																								headers : {
																									"X-Requested-With" : "XMLHttpRequest",
																									"Content-Type" : header_content_type, // "text/plain;odata=minimalmetadata",
																									"DataServiceVersion" : "1.0",
																									"MaxDataServiceVersion" : "3.0",
																									"Accept" : "application/atom+xml,application/atomsvc+xml,application/xml",// "text/plain;odata=minimalmetadata;charset=utf-8",
																									"X-CSRF-Token" : header_xcsrf_token
																								},

																								data : {

																									"IvRefNo" : txtRefno,
																									"IvStatus" : txtStatus,
																									"Tdline" : txtNotes1,
																									"IvItemNo" : txtItem
																								},
																								user : user,
																								password : password
																							};

																							OData
																									.request(
																											requestObj,
																											function(
																													data,
																													response) {
																												alert("update");
																											});

																						});
																	}
																}),
														rightButton : new sap.m.Button(
																{
																	text : "Cancel",
																	// text :
																	// bundle.getText("dialogCancelAction"),
																	press : function() {
																		dialog
																				.close();
																	}
																}),

													});

											// open dialog
											dialog.open();
										},

										_showRescheduleDialog : function(mode,
												forwardRecipientName) {



											var oView = this.getView();

											var refNo = oView.byId("header");
											var txtRefno = refNo.getTitle();

											txtRefno = txtRefno.split("/");
											txtRefno = txtRefno[0];

											var txtNotes;
											var txtItem = oView.byId(
													"demandItem").getText()
													.substr(11);

											// remove detail from model

											var buttontxt, dialogTitle, textval, busyTitle, successMsg;
											if (mode == "reschedule") {
												buttontxt = "Reschedule";
												dialogTitle = "Reschedule RPA";
												textval = "Reschedule RPA by login user ?";
												busyTitle = "Decision";
												successMsg = "Rescheduled";
												var txtStatus = "E0001";
											}

											// create dialog
											var that = this;

											var oSelectedDate, oSelectedTime;

											/* Date Picker */
											var inputDate = new sap.m.DateTimeInput(
													{
														path : "/dateval",
														width : "99%",
														type : "DateTime",
														displayFormat : new sap.ui.model.type.DateTime(
																{
																	style : "medium"
																})
																.getOutputPattern(),
														// dateValue : new
														// Date(2012, 4, 29, 19,
														// 14, 0),
														// valueState :
														// "Warning",
														valueFormat : "YYYY-MM-ddThh:mm:ss",
														change : function() {
															console
																	.log(
																			"String - ",
																			inputDate
																					.toString(),
																			"Value format-",
																			inputDate
																					.getValueFormat(),
																			"Date",
																			inputDate
																					.getDateValue(),
																			"Value =",
																			inputDate
																					.getValue());
															oSelectedDate = inputDate
																	.getValue();
															oSelectedTime = oSelectedDate
																	.substring(11);

														},
													});

											/* Notes field declarion */

											var txtNotes = new sap.m.TextArea(
													{
														rows : 4,
														width : "100%",
														placeholder : "Add note (Optional)"
													});

											var dialog = new sap.m.Dialog(
													{
														title : dialogTitle,
														content : [
																new sap.m.Text(
																		{
																			text : textval
																		// text
																		// :
																		// confirmMsg
																		})
																		.addStyleClass("sapUiSmallMarginBottom"),

																		/* inputDate will display the date time picker */
																		inputDate, // Date Picker

																		/* txtNotes will display text area to display notes */
																		txtNotes, // Text Area Displayer

														],
														contentWidth : "30rem",
														leftButton : new sap.m.Button(
																{
																	text : buttontxt, // "Approve",
																	// text :
																	// confirmButtonText,
																	press : function() {
																		dialog
																				.close();

																		var serviceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV";
																		var oModel1 = new sap.ui.model.odata.ODataModel(
																				serviceUrl,
																				true,
																				"GUJERSEY",
																				"gss888");
																		
																		var txtNotesdate = oSelectedDate;
																		
																		var txtNotes1 = txtNotes.getValue();
																		
																		txtNotes1 = txtNotesdate + " " + txtNotes1;  
																		
																		var dateValue = "datetime'"
																				+ oSelectedDate
																				+ "'";
																		var textVal = "'"
																				+ txtNotes._lastValue
																				+ "'";
																		var timeVal = "'"
																				+ oSelectedTime
																				+ "'";

																		var urlParams;

																		urlParams = "IvRefNo='"
																			+ txtRefno
																			+ "',IvStatus='"
																			+ txtStatus
																			+ "',Tdline='"
																			+ txtNotes1
																			+ "',IvItemNo='"
																			+ txtItem
																			+ "'";

																	var oPayload = {
																		"IvRefNo" : txtRefno,
																		"IvStatus" : txtStatus,
																		"Tdline" : txtNotes1,
																		"IvItemNo" : txtItem
																	};

																		var oEntry = oPayload;

																		var user = "GUJERSEY";
																		var password = "gss888";

																		var headers = {
																			"Content-Type" : "application/json",
																			Accept : "application/json"
																		};
																		var method = "GET";
																		var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/HeaderDetailsSet?$filter=Username eq 'SCHAUHAN'";
																		var requestObj = {

																			requestUri : url,
																			method : method,
																			headers : {
																				"X-Requested-With" : "XMLHttpRequest",
																				"Content-Type" : "application/atom+xml",
																				"DataServiceVersion" : "2.0",
																				"MaxDataServiceVersion" : "3.0",
																				"Accept" : "application/atom+xml",// ;charset=utf-8"
																				"X-CSRF-Token" : "FETCH"
																			},

																			// headers:headers,

																			user : user,
																			password : password

																		}

																		OData
																				.request(
																						requestObj,
																						function(
																								data,
																								response) {
																							var header_xcsrf_token = response.headers['x-csrf-token'];
																							var header_content_type = response.headers['Content-Type'];
																							console
																									.log("header_xcsrf_token>>"
																											+ header_xcsrf_token);
																							console
																									.log("Content-Type>>"
																											+ header_content_type);

																							var newData = {

																									"odata.type" : "UpdSoStatusSet",
																									"IvRefNo" : txtRefno,
																									"IvStatus" : txtStatus,
																									"Tdline" : txtNotes1,
																									"IvItemNo" : txtItem

																								};

																							var method = "PUT";
																							var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/UpdSoStatusSet("
																								+ urlParams
																								+ ")";

																							var requestObj = {

																								requestUri : url,
																								method : method,
																								headers : {
																									"X-Requested-With" : "XMLHttpRequest",
																									"Content-Type" : header_content_type, // "text/plain;odata=minimalmetadata",
																									"DataServiceVersion" : "1.0",
																									"MaxDataServiceVersion" : "3.0",
																									"Accept" : "application/atom+xml,application/atomsvc+xml,application/xml",// "text/plain;odata=minimalmetadata;charset=utf-8",
																									"X-CSRF-Token" : header_xcsrf_token
																								},

																								data : {

																									"IvRefNo" : txtRefno,
																									"IvStatus" : txtStatus,
																									"Tdline" : txtNotes1,
																									"IvItemNo" : txtItem
																								},// newData,
																								user : user,
																								password : password
																							};

																							OData
																									.request(
																											requestObj,
																											function() {
																												alert("update");
																											});

																						});

																	}
																}),
														rightButton : new sap.m.Button(
																{
																	text : "Cancel",
																	// text :
																	// bundle.getText("dialogCancelAction"),
																	press : function() {
																		dialog
																				.close();
																	}
																}),

														// });

														afterClose : function(
																evt) {
															// open busy dialog
															// if confirmed
															var pressedButton = evt
																	.getParameter("origin");
															if (pressedButton === this
																	.getBeginButton()) {
																// open busy
																// dialog
																var busyDialog = new sap.m.BusyDialog(
																		{
																			showCancelButton : false,
																			title : busyTitle,
																			close : function() {


																				setTimeout(
																						function() {
																							sap.m.MessageToast
																									.show(successMsg);
																						},
																						200);
																			}
																		});
																busyDialog
																		.open();
																// close busy
																// dialog after
																// some
																// delay
																setTimeout(
																		jQuery
																				.proxy(
																						function() {
																							busyDialog
																									.close();
																							busyDialog
																									.destroy();
																						},
																						this),
																		2000);
															}
															// clean up
															dialog.destroy();
														}
													});

											// open dialog
											dialog.open();
										},
										handleLeft : function(evt) {
											dialog.close();

										},

										handleCustomer : function(oEvent,
												oModel, data) {
											// this.createPopover();
											var oCtx = oEvent.getSource()
													.getBindingContext();

											var oView = this.getView();
											if (!this._oQuickView) {

												this._oQuickView = sap.ui
														.xmlfragment(
																"popoverNavCon",
																"ZSRV_RPA_FSE.view.Detail",
																this);
												this._oQuickView.setModel(
														deviceModel1, "detail");
												this.getView().addDependent(
														this._oQuickView);
												sap.ui.getCore().setModel(
														deviceModel1, "device");

												// this._oQuickView.openBy(customer);
											}
											// delay because addDependent will
											// do a async
											// rerendering and the actionSheet
											// will immediately
											// close without it.
											var oButton = oEvent.getSource();
											jQuery.sap
													.delayedCall(
															0,
															this,
															function() {
																var oDetailPage = Fragment
																		.byId(
																				"popoverNavCon",
																				"detail");
																// oDetailPage.bindElement(oCtx.getPath());
																this._oQuickView
																		.openBy(oButton);
															});
										},

										createPopover : function() {
											if (!this._oQuickView) {
												// this._oQuickView =
												// sap.ui.xmlfragment("ZSRV_RPA_FSE.view.Detail",
												// this);

												this._oQuickView = sap.ca.ui.quickoverview
														.EmployeeLaunch(
																"ZSRV_RPA_FSE.view.Detail",
																this);
												this.getView().addDependent(
														this._oQuickView);
												// this._oQuickView.openBy(customer);
											}
										},

										/* Update Service order status */

										handleUpdate : function(evt) {

											var serviceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV";
											var oModel1 = new sap.ui.model.odata.ODataModel(
													serviceUrl, true,
													"GUJERSEY", "gss888");

											var urlParams;

											var oView = this.getView();

											var refNo = oView.byId("header");
											var txtRefno = refNo.getTitle();

											txtRefno = txtRefno.split("/");
											txtRefno = txtRefno[0];
											var status = oView.byId("soStatus");
											var txtStatus = status
													.getSelectedKey();

											var notes = oView.byId("soNotes");
											var txtNotes = notes.getValue();

											var txtItem = oView.byId(
													"demandItem").getText()
													.substr(11);

											urlParams = "IvRefNo='" + txtRefno
													+ "',IvStatus='"
													+ txtStatus + "',Tdline='"
													+ txtNotes + "',IvItemNo='"
													+ txtItem + "'";

											// urlParams =
											// "IvRefNo='8000000619',IvStatus='E0002',Tdline='reschedule',IvItemNo='10'";

											var oPayload = {
												"IvRefNo" : txtRefno,
												"IvStatus" : txtStatus,
												"Tdline" : txtNotes,
												"IvItemNo" : txtItem
											};
											var oEntry = oPayload;

											var user = "GUJERSEY";
											var password = "gss888";

											var headers = {
												"Content-Type" : "application/json",
												Accept : "application/json"
											};
											var method = "GET";
											var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/HeaderDetailsSet?$filter=Username eq 'SCHAUHAN'";
											var requestObj = {

												requestUri : url,
												method : method,
												headers : {
													"X-Requested-With" : "XMLHttpRequest",
													"Content-Type" : "application/atom+xml",
													"DataServiceVersion" : "2.0",
													"MaxDataServiceVersion" : "3.0",
													"Accept" : "application/atom+xml",// ;charset=utf-8"
													"X-CSRF-Token" : "FETCH"
												},

												// headers:headers,

												user : user,
												password : password

											}

											OData
													.request(
															requestObj,
															function(data,
																	response) {
																var header_xcsrf_token = response.headers['x-csrf-token'];
																var header_content_type = response.headers['Content-Type'];


																var newData = {

																	"odata.type" : "UpdSoStatusSet",
																	"IvRefNo" : txtRefno,
																	"IvStatus" : txtStatus,
																	"Tdline" : txtNotes,
																	"IvItemNo" : txtItem

																};

																var method = "PUT";
																// var url =
																// "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/UpdSoStatusSet(IvRefNo='8000000619',IvStatus='E0002',Tdline='reschedule',IvItemNo='10')";
																var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/UpdSoStatusSet("
																		+ urlParams
																		+ ")";
																var requestObj = {

																	requestUri : url,
																	method : method,
																	headers : {
																		"X-Requested-With" : "XMLHttpRequest",
																		"Content-Type" : header_content_type, // "text/plain;odata=minimalmetadata",
																		"DataServiceVersion" : "1.0",
																		"MaxDataServiceVersion" : "3.0",
																		"Accept" : "application/atom+xml,application/atomsvc+xml,application/xml",// "text/plain;odata=minimalmetadata;charset=utf-8",
																		"X-CSRF-Token" : header_xcsrf_token
																	},

																	data : {

																		"IvRefNo" : txtRefno,
																		"IvStatus" : txtStatus,
																		"Tdline" : txtNotes,
																		"IvItemNo" : txtItem
																	},
																	user : user,
																	password : password
																};

																OData
																		.request(
																				requestObj,
																				function(
																						data,
																						response) {
																					// sap.ui.getCore().byId("masterPage").getModel().refresh(true);
																					alert("Order Status updated");
																					deviceModel1
																							.refresh(true);
																				});

															});

										},
										
										
										map: null,
										geocoder: null,

										

										selectTab: function (oEvent) {
											var selItem = oEvent.getParameters().selectedItem;
											if (selItem.sId === "__filter2") {
												this.initialize_map();
											};
										},
										
										initialize_map : function () {
											var mapDiv = this.getView().byId("map_canvas");
											mapDiv.addStyleClass("myMap");
											geocoder = new google.maps.Geocoder();
										        var mapOptions = {  
										            center: new google.maps.LatLng(-12.04637, -77.04279),  
										            zoom: 14,  
										            mapTypeId: google.maps.MapTypeId.ROADMAP  
									        	};  
										        var mapRef = mapDiv.getDomRef();
										        map = new google.maps.Map(mapRef, mapOptions);
										        this.codeAddress();
										},
										
										codeAddress : function () {
											geocoder.geocode({
												'address' : this.getLocationName()
											}, function(results, status) {
												if (status == google.maps.GeocoderStatus.OK) {
													map.setCenter(results[0].geometry.location);
													var marker = new google.maps.Marker({
														map : map,
														position : results[0].geometry.location
													});
												} else {
													alert("Geocode was not successful for the following reason: "
															+ status);
												}
											});
										},
										
										getLocationName : function() {
											var region = "Chennai";
											var city = "Chennai";
											var country = "India";
											var view = this.getView();
											var context = view.getBindingContext();
											var place = context.getProperty('Place');
											
											if ( place !== null) {
												return city + " " + region + " " + country + " " + place;
											} else {
												return city + " " + country + " " + region;
											}
										}	
										

									});

				});
