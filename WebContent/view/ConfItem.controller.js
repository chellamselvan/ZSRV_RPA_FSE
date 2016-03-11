jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
sap.ui.core.mvc.Controller.extend("ZSRV_RPA_FSE.view.ConfItem", {
	
	
		onInit: function() {
			var view = this.getView();
			/*
			this.oRouter.attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "taskDetail") {
			var context = new sap.ui.model.Context(view.getModel(), '/' + 
			oEvent.getParameter("arguments").contextPath);
			view.setBindingContext(context);
			}
			}, this);*/
			
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//  this._oRouter.attachRouteMatched(this._handleRouteMatched,this);
			
			var bus = sap.ui.getCore().getEventBus();
			bus.subscribe("nav", "to", this.navToHandler, this);
			var idNew, idItem;
			
	},
	
	navToHandler : function(channelId, eventId, data) {
		if (data && data.viewId) {
			var oBindingContext = data.data.bindingContext;
			this.getView().setBindingContext(oBindingContext);
			// var oViewData = sap.ui.view();
		}

	},

	
	
	handleNavButtonPress : function(evt) {
		this._oRouter.navTo("ConfMaster", {id:1}, false);
      //  this.nav.back("Detail");
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

	},
	
	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("ZSRV_RPA_FSE.view.ConfMaster", context);
	},
});	