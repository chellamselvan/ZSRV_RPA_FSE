  

sap.ui.define([
          		'jquery.sap.global',
          		'sap/ui/core/Fragment',
          		'sap/ui/core/mvc/Controller',
          		'sap/ui/model/json/JSONModel',
          		'sap/ui/Device'
          	], function(jQuery, Fragment, Controller, JSONModel) {
          	"use strict";

          	
          	
          	
sap.ui.core.mvc.Controller.extend("ZSRV_RPA_FSE.view.Master", {
	
	onInit: function() {
		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "Detail") { 
				
				var oList = view.byId("list"),					aItems = oList.getItems();
				for (var i = 0; i < aItems.length; i++) { 
					if (aItems[i].getBindingContext().getPath() === "/" + oEvent.getParameter("arguments").contextPath) {
						oList.setSelectedItem(aItems[i], true);
						break;
					}
				}
			}
		}, this);
		

	},
	
	
	
	handleSearch: function() {
		// add filter for search
		var filters = [];
		var searchString = this.getView().byId("searchField").getValue();
		if (searchString && searchString.length > 0) {
			filters = [ new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, searchString) ];
		}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
	handleSelect: function(oEvent) {
	//	var oListItem = oEvent.getParameter("listItem"); 
		
		
		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
	//	sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", 
	//			//{from: "master", contextPath: "/Data/results/11"}
	//			{from: "master", contextPath: oListItem.getBindingContext().getPath().substr(1)}
//		);
		
	/*	var sPath = oListItem.getBindingContext().getPath();
		var oObject = this.getView().getModel().getProperty(sPath);
		sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {contectPath: sPath});
		
		var context = oEvent.getSource().getBindingContext();
		this.nav.to("Detail", context);*/
		
		
		var oBindingContext = 
	        oEvent.getParameter(
	            "listItem"
	            ).getBindingContext(),

	        sViewId = "detail" + 
	                   oEvent.getParameter(
	                   "listItem").data("Demandid");

	    // Pass event to EventBus
	    sap.ui.getCore().getEventBus().publish(
	        "nav", 
	        "to", {
	          viewName: "ZSRV_RPA_FSE.view.Detail",
	          viewId: sViewId,
	          data: {
	             bindingContext: oBindingContext
	        }
	    });
	    
		var oBindingContext = 
	        oEvent.getParameter(
	            "listItem"
	            ).getBindingContext(),

	        sViewId1 = "taskDetail" + 
	                   oEvent.getParameter(
	                   "listItem").data("Demandid");

	    
	    sap.ui.getCore().getEventBus().publish(
		        "nav", 
		        "to", {
		          viewName: "ZSRV_RPA_FSE.view.ConfMaster",
		          viewId: sViewId1,
		          data: {
		             bindingContext: oBindingContext
		        }
		    }); 
	},
	
	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("ZSRV_RPA_FSE.view.Detail", context);
	},
});	

});	