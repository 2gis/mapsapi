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
	}
};

L.DG.GeoclickerHandlers.default = function() {
	console.log("DEFAULT");
};

L.DG.GeoclickerHandlers.handler1 = function(result) {
	console.log("Handler1", result);
};

L.DG.GeoclickerHandlers.handler2 = function(result) {
	console.log("Handler2", result);
};

L.DG.GeoclickerHandlers.handler3 = function(result) {
	console.log("Handler3", result);
};
L.DG.GeoclickerHandlers.station_platform = function(result) {
	console.log("Station_platform", result);
};


