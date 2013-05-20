/**
 * Leaflet DG GeoclickerHandlers
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Alexey Lubchuk
 */
L.DG = L.DG || {};

L.DG.GeoclickerHandlers = {
	mappings: {
		handler1: ["city", "street", "district", "project"],
		handler2: ["house", "sight", "place"],
		handler3: ["station", "crossbroad", "metro"]
	},
	getMappingHandler: function(type) {
		for (var handler in this.mappings) {
			if (this.mappings[handler].indexOf(type) !== -1 && L.DG.GeoclickerHandlers[handler]) {
				return L.DG.GeoclickerHandlers[handler];
			}
		}
		return null;
	},
	default : function() {
		console.log("DEFAULT");
		return 'default';
	},
	handler1 : function(result) {
		console.log("Handler1", result);
		return "handler1";
	},
	handler2 : function(result) {
		console.log("Handler2", result);
		return "handler2";
	},
	handler3 : function(result) {
		console.log("Handler3", result);
		return "handler3";
	},
	station_platform : function(result) {
		console.log("Station_platform", result);
		return "station_platform";
	}
};