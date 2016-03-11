jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");

sap.ui.core.mvc.Controller
		.extend(
				"ZSRV_RPA_FSE.view.ConfMaster",
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
						//console.log("Entered Conf Master");
						this._oRouter = sap.ui.core.UIComponent
								.getRouterFor(this);
						// this._oRouter.attachRouteMatched(this._handleRouteMatched,this);

					//	this.defaultValues();
						// this.navToHandler(channelId, eventId, data);

						// console.log("Entered Handler");
						// if (data && data.viewId) {
						// console.log("Entered Data");
						var oBindingContext;
						// = data.data.bindingContext;
						// this.getView().setBindingContext(oBindingContext);						
						var oModelJson = new sap.ui.model.json.JSONModel();
						var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";						
						// set data model
						var m = new sap.ui.model.odata.ODataModel(sServiceUrl,
								true);
						oView = this.getView();
						// var i = data.data.bindingContext.sPath.substr(14);
						// console.log(i);
						// var id =
						// data.data.bindingContext.oModel.oData.Data.results[i].Demandid;
					//	console.log("Default COnf");
						var bus = sap.ui.getCore().getEventBus();
						bus.subscribe("nav", "to", this.navToHandler, this);
						var idNew, id, idItem,idSrvOrd;
						

						var id = "8000000763";
					//	this.defaultValues();
					//	console.log(id);
						var idNew = id;
						
						var query1 = "Demandid='" + idNew + "',Username=''";
						var query = "/HeaderDetailsSet(" + query1
								+ ")/HeaderToCategory";
						m.read(query, null, null, null, function(oData,
								oResponse) {
							var value = [];
							value = oData.results;
						//	console.log(value);

							var count = value.length;

					//		console.log(count);
							deviceModel1.setData({
								datacat : value
							});
							oModelJson.setData({
								Datacat : oData
							});
							

							oView.setBindingContext(oBindingContext);
							sap.ui.getCore().setModel(deviceModelCat);
							var oCategory = oView.byId("category1");
							oCategory.setModel(deviceModel1);
						}, null);

						var oCategory2 = oView.byId("category2");
						var oCategory3 = oView.byId("category3");
						var oCategory4 = oView.byId("category4");
						oCategory2.setEnabled(false);
						oCategory3.setEnabled(false);
						oCategory4.setEnabled(false);

						var oTable = oView.byId("itemdet");
						model = deviceModelItem;
						oTable.setModel(model);
						this.handleFetchSurvey();
					},
					
					defaultValues : function(channelId, eventId, data) {
						//var i = data.data.bindingContext.sPath.substr(14);
//						console.log("defaulkt");
					//	console.log(evt);
						console.log(data);
					},
					navToHandler : function(channelId, eventId, data) {
//						console.log("Entered Handler");
						
						if (data && data.viewId) {
		//					console.log("Entered Data");
							var oBindingContext = data.data.bindingContext;
							this.getView().setBindingContext(oBindingContext);

							var oModelJson = new sap.ui.model.json.JSONModel();
							var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
							// set data model
							var m = new sap.ui.model.odata.ODataModel(
									sServiceUrl, true);
							oView = this.getView();
							var i = data.data.bindingContext.sPath.substr(14);
							oView.setBindingContext(data.data.bindingContext);
				//			console.log("New"+i);
							var id = data.data.bindingContext.oModel.oData.Data.results[i].Demandid;
			//				console.log("Test"+id);
							idSrvOrd = id;
							id = "8000000763";
							idNew = id;
							var query1 = "Demandid='" + id + "',Username=''";
							var query = "/HeaderDetailsSet(" + query1
									+ ")/HeaderToCategory";
							m.read(query, null, null, null, function(oData,
									oResponse) {
								var value = [];
								value = oData.results;
						//		console.log(value);

								var count = value.length;

					//			console.log(count);
								deviceModel2.setData({
									datacat : value
								});
								oModelJson.setData({
									Datacat : oData
								});

								oView.setBindingContext(oBindingContext);
								sap.ui.getCore().setModel(deviceModel2);
								var oCategory = oView.byId("category1");
								oCategory.setModel(deviceModel2);

							}, null);
						}

					},

					onCreateItem : function(evt) {

						// Navigating to a new view.Use Cases for Extending the
						// UI of SAP Fiori Apps

						var context = evt.getSource("list").getBindingContext();

						this._oRouter.navTo("ConfItems", {
							id : "ConfItems"
						}, false);
					},

					onSelectCat : function(evt) {
						// Fetching the selected Category
						var category1 = this.getView().byId("category1");
						var category2 = this.getView().byId("category2");
						category2.setEnabled(true);
						selectedcat = evt.mParameters.selectedItem.getKey();
						this.onFetchCat2();
						// var oTable = oView.byId("itemdet");
						// oTable.setModel(model);
					},

					onFetchCat2 : function(evt) {
						// Fetching the selected Category
						var category1 = this.getView().byId("category1");
						// selectedcat = evt.mParameters.selectedItem.getKey();

						var oModelJson = new sap.ui.model.json.JSONModel();
						var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
						// set data model
						var m = new sap.ui.model.odata.ODataModel(sServiceUrl,
								true);
						oView = this.getView();
						// var i = data.data.bindingContext.sPath.substr(14);
						// console.log(i);
						// var id =
						// data.data.bindingContext.oModel.oData.Data.results[i].Demandid;
						// console.log(id);
						// idNew = id;
						var query1 = "CatId='" + selectedcat
								+ "',IvObjectId='"+ idNew + "'";
						var query = "/EtCat1Set(" + query1 + ")/CategoryToCat2";
						m.read(query, null, null, null, function(oData,
								oResponse) {
							var value = [];
							value = oData.results;
							//console.log(value);

							var count = value.length;

						//	console.log(count);
							deviceModel3.setData({
								datacat2 : value
							});
							oModelJson.setData({
								Datacat2 : oData
							});

							// oView.setBindingContext(oBindingContext);
							// sap.ui.getCore().setModel(deviceModel1);
							var oCategory2 = oView.byId("category2");
							oCategory2.setModel(deviceModel3);
							var oCategory1 = oView.byId("category1");
							oCategory1.setSelectedItem(selectedcat);
						}, null);

					},

					handleNavButtonPress : function(evt) {
						this._oRouter.navTo("Detail", {
							id : 1
						}, false);
						// this.nav.back("Detail");
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
						
						this._oRouter.navTo("Detail", {
							id : 1
						}, false);
						// var oListItem = oEvent.getParameter("listItem");

						// trigger routing to BindingPath of this ListItem -
						// this will update the data on the detail page
						// sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
						// //{from: "master", contextPath: "/Data/results/11"}
						// {from: "master", contextPath:
						// oListItem.getBindingContext().getPath().substr(1)}
						// );

						/*
						 * var sPath = oListItem.getBindingContext().getPath();
						 * var oObject =
						 * this.getView().getModel().getProperty(sPath);
						 * sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
						 * {contectPath: sPath});
						 * 
						 * var context = oEvent.getSource().getBindingContext();
						 * this.nav.to("Detail", context);
						 */

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
						this.nav.to("ZSRV_RPA_FSE.view.Detail", context);
					},

					handleApprove : function() {						
						var serviceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV";
						var oModel1 = new sap.ui.model.odata.ODataModel(
								serviceUrl, true, "GUJERSEY", "gss888");

						// var desc = "'"+ desc.value +"'";
						// var type = "'"+ type.value +"'";
						// var profile = "'"+ profile.value +"'";
						// var code;
	
						
					//	var desc = 'Testing Fiori Create conf';
					//	var type = 'ZCSV';
					//	var profile = 'ZSO';
					//	var code = 'CDM';

						
						var desc,type,profile,code; 
						// var desc,type,profile,code;
						var urlParams, urlItems;

					/*	urlParams = "Description eq '" + desc
								+ "',ProcessType eq '" + type
								+ "',Profile eq '" + profile + "',Code eq '"
								+ code + "',RefOrdNumber eq '8000000562'"; */ 
						
						urlParams = "Description='" + desc
						+ "',ProcessType='" + type
						+ "',Profile='" + profile + "',Code='"
						+ code + "',RefOrdNumber='8000000562',NumberInt='10',OrderedProd='SRV',Quantity=1.000m,Serailnumber='101',ProcessQtyUnit='EA'";

						urlItems = ",NumberInt='10',OrderedProd='SRV',Quantity=1.00m,Serailnumber='101',ProcessQtyUnit='EA'";

						var oPayload = {
							"Description" : '123',
							"ProcessType" : 'ZCSV'
						};
						var oEntry = oPayload;

						var user = "GUJERSEY";
						var password = "gss888";

						var headers = {
							"Content-Type" : "application/json",
							Accept : "application/json"
						};
						var method = "GET";
						var url = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/HeaderDetailsSet?$filter=Username eq 'FSE01'";
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
										function(data, response) {

											var header_xcsrf_token = response.headers['x-csrf-token'];
											var header_content_type = response.headers['Content-Type'];
						//					console.log("header_xcsrf_token>>"
						//							+ header_xcsrf_token);
						//					console.log("Content-Type>>"
							//						+ header_content_type);

											var newData = {

												"odata.type" : "CreateConfSet",
												"Description" : 'Testing Fioir',
												"ProcessType" : 'ZCSV',
												"Profile" : 'ZSO',
												"Code" : 'CDM',
												"RefOrdNumber" : '8000000562',
												"NumberInt": '10',
												"OrderedProd":'SRV',
												"Quantity":'1',
												"Serailnumber":'101',
												"ProcessQtyUnit":'EA'

											};

											var method = "POST";
											// var url =
											// "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/ZRPA_UPDATESet(IvDate=datetime'2000-12-12T12:00',IvDemandid='123',IvItem='10',IvStatus='Approve',IvTimeS='100909',Line='Testing')";
											var url1 = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/CreateConfSet";
											var url2 = ")";
											
											// var url = url1+urlParams+url2;
//											var url = url1 + urlParams+url2;
											
											var url = url1;
											// var url =
											// "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/ZRPA_UPDATESet("
											// + urlParams + ")";
											var itemlen = model.oData.dataitem.length;
											
											var itemval,itemprd,itemqty;
											
											if(itemlen == '1'){
												
												itemval = model.oData.dataitem[0].Item;
												itemprd = model.oData.dataitem[0].OrderedProd;
												itemqty = model.oData.dataitem[0].Quantity;
												
												if (itemqty == ''){
													itemqty = "1";	
												}
												
												//itemqty = itemqty+'m';
												
											}
											
											itemqty = model.oData.dataitem[0].Quantity;
											
											desc = oView.byId("desc").getValue();
											 var desc1 = "'"+ desc +"'";
//											 var type = "'"+ type.value +"'";
											 profile = oView.byId("profile").getValue();
											 var profile1 = "'"+ profile +"'";
											 var code;
											 
											 var cnotes = oView.byId("cNotes").getValue();
											// var code = oView.byId("category2").getSelectedItem().getKey();
										//	 var code1 = "'"+ code +"'";
											 /*
											 var items = oView.byId("soItems");
											 var itemval = items.getTitle();
											 var itemval1 = "'"+ itemval +"'";
											 var itemprd = items.getText();
											 var itemprd1 = "'"+ itemprd +"'";
											 var itmqty = oView.byId("itmQty").getText();
											 var itmqty1 = "'"+ itmqty +"'";
											 
											*/ 
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

													// "IvDate"
													// :'2013-12-05T00:00:00',datetime’2000-12-12T12:00′
													
													"Description" : desc,
													"Txtnotes" : cnotes,
													"ProcessType" : 'ZCSV',
													"Profile" : 'Zso',
													"Code" : code,
													"RefOrdNumber" :idSrvOrd, //idNew,
													"NumberInt": itemval,
													"OrderedProd": itemprd,
													"Quantity": itemqty,
													"Serailnumber":'101',
													"ProcessQtyUnit":'EA'

												// "Itemdata/NumberInt":'10',
												// "Itemdata/NumberInt":'10',
												// "Itemdata/NumberInt":'10',
												// "Itemdata/NumberInt":'10',
												// "Itemdata/NumberInt":'10'

												},// newData,
												user : user,
												password : password
											};

											OData.request(requestObj, function(
													data, response) {
												alert("Confirmation " + data.EvObjectId + " Created");																								
											});											
										});

						/*
						 * var desc_val =
						 * this.getView().byId("desc").getValue(); var type_val =
						 * this.getView().byId("type").getValue(); var
						 * profile_val =
						 * this.getView().byId("profile").getValue(); var
						 * code_val = 'test';// =
						 * this.getView().byId("category2").getValue();
						 * 
						 * var desc = desc_val ; var type = type_val ; var
						 * profile = profile_val ; var code = code_val ;
						 * 
						 * 
						 * 
						 * //var desc,type,profile,code; var urlParams,urlItems;
						 * 
						 * urlParams = "(Description='" + desc +
						 * "',ProcessType='" + type + "',Profile='" + profile +
						 * "',Code='" + code + "',RefOrdNumber='" + idNew +
						 * "')";
						 * 
						 * 
						 * var serviceUrl =
						 * "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV";
						 * var oModel1 = new
						 * sap.ui.model.odata.ODataModel(serviceUrl, true,
						 * "GUJERSEY", "gss888");
						 * 
						 * var url1 =
						 * "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/CreateConfSet?$filter=";
						 * 
						 * var query =
						 * "(Description='Testing',ProcessType='ZCSV',Profile='ZSO',Code='ZSA',RefOrdNumber='8000000522')";
						 * oModel1.read("/CreateConfSet" + urlParams, null,
						 * null, null, function(oData, oResponse) {
						 * alert("Creted"); }, null);
						 * 
						 * 
						 */
					},

					handleFetchSurvey : function() {
						
						var sServiceUrl = "https://gsswd.globalsoftsolutions.net:7105/sap/opu/odata/sap/ZRPA_ASSIGNMENT_SRV/";
						// set data model
						var m = new sap.ui.model.odata.ODataModel(sServiceUrl,
								true);
						var query = "/ConfSurveySet";
						oView = this.getView();						
						var frmTitle = oView.byId("Conffeedback");
						var lblQ1 = oView.byId("Q1");
						var rbQ1_1 = oView.byId("Q1-1");
						var rbQ2_1 = oView.byId("Q1-2");
						var rbQ3_1 = oView.byId("Q1-3");
						var rbQ4_1 = oView.byId("Q1-4");

						var lblQ2 = oView.byId("Q2");
						var rbQ1_2 = oView.byId("Q2-1");
						var rbQ2_2 = oView.byId("Q2-2");
						var rbQ3_2 = oView.byId("Q2-3");

						var lblQ3 = oView.byId("Q3");
						var rbQ1_3 = oView.byId("Q3-1");
						var rbQ2_3 = oView.byId("Q3-2");
						var rbQ3_3 = oView.byId("Q3-3");
						var rbQ4_3 = oView.byId("Q3-4");
						var rbQ5_3 = oView.byId("Q3-5");

						// var frmSection = oView.byId("Section");

						var j;
						m.read(query, null, null, null, function(oData,
								oResponse) {
							var value = [];
							value = oData.results;
						
						
							frmTitle.setTitle(value[0].TitleData.EvTitle);
							// frmSection.setTitle(value[0].TitleData.EvSection);
							// var count = value.length;
							var q1;
							for (j = 0; j <= value.length; j++) {							
								if ((value[j].Type == "Q")
										&& (value[j].Qno == "   1"))
									
								{
									q1 = "1." + value[j].Question;
									lblQ1.setText(q1);
								}

								if ((value[j].Type == "A1")
										&& (value[j].Qno == "   1"))

								{
									rbQ1_1.setText(value[j].Answer);
								}

								if ((value[j].Type == "A2")
										&& (value[j].Qno == "   1"))

								{
									rbQ2_1.setText(value[j].Answer);
								}

								if ((value[j].Type == "A3")
										&& (value[j].Qno == "   1"))

								{
									rbQ3_1.setText(value[j].Answer);
								}

								if ((value[j].Type == "A4")
										&& (value[j].Qno == "   1"))

								{
									rbQ4_1.setText(value[j].Answer);
								}

								if ((value[j].Type == "Q")
										&& (value[j].Qno == "   2"))

								{
									q2 = "2." + value[j].Question;
									lblQ2.setText(q2);
								}

								if ((value[j].Type == "A1")
										&& (value[j].Qno == "   2"))

								{
									rbQ1_2.setText(value[j].Answer);
								}

								if ((value[j].Type == "A2")
										&& (value[j].Qno == "   2"))

								{
									rbQ2_2.setText(value[j].Answer);
								}

								if ((value[j].Type == "A3")
										&& (value[j].Qno == "   2"))

								{
									rbQ3_2.setText(value[j].Answer);
								}

								// Q3

								if ((value[j].Type == "Q")
										&& (value[j].Qno == "   3"))

								{
									q3 = "3." + value[j].Question;
									lblQ3.setText(q3);
								}

								if ((value[j].Type == "A1")
										&& (value[j].Qno == "   3"))

								{
									rbQ1_3.setText(value[j].Answer);
								}

								if ((value[j].Type == "A2")
										&& (value[j].Qno == "   3"))

								{
									rbQ2_3.setText(value[j].Answer);
								}

								if ((value[j].Type == "A3")
										&& (value[j].Qno == "   3"))

								{
									rbQ3_3.setText(value[j].Answer);
								}

								if ((value[j].Type == "A4")
										&& (value[j].Qno == "   3"))

								{
									rbQ4_3.setText(value[j].Answer);
								}

								if ((value[j].Type == "A5")
										&& (value[j].Qno == "   3"))

								{
									rbQ5_3.setText(value[j].Answer);
								}
							}							
							// console.log(count);
							confSurvey.setData({
								dataconsur : value
							});
							// oModelJson.setData({
							// Datacat : oData

							sap.ui.getCore().setModel(confSurvey);
							oView.setModel(confSurvey);
							// frmSection.setModel(confSurvey);
							alert("End");
						});

					},
				});