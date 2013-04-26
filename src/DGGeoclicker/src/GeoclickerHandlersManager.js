/**
 * Leaflet DG GeoclickerHandlersManager
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Alexey Lubchuk
 */

L.DG = L.DG || {};

L.DG.GeoclickerHandlersManager = L.Class.extend({
	handle: function(options) {
		if (!options || !options.response) {
			L.DG.GeoclickerHandlers.default();	
			return;
		} 
		if (options.response.error_code && options.response.error_message) {
			L.DG.GeoclickerHandlers.default();	
			return;
		}
		if (!options.response.result || !options.response.result.length) {
			L.DG.GeoclickerHandlers.default();	
			return;	
		}
		var handled = false;
		var result = options.response.result;
		
		for (var i = 0, count = result.length; i < count; i++) {
			//check whether returned types are in valid list of those that we requested
			if (!options.allowedTypes || options.allowedTypes.indexOf(result[i].type) === -1) {
				break;
			}
			//check maybe we have mapping handler for this type of geoobjects
			var mappingHandler = L.DG.GeoclickerHandlers.getMappingHandler(result[i].type);
			if (mappingHandler) {
				mappingHandler(result[i]);
				handled = true;
				continue;
			}
			//if there is no mapping, check in geoclicker handlers list
			var handler = L.DG.GeoclickerHandlers[result[i].type];
			if (handler) {
				handled = true;
				handler(result[i]);
			}
		}
		//if no handler was found, then launch the default one
		if (!handled) {
			L.DG.GeoclickerHandlers.default();	
		}
	}
});


