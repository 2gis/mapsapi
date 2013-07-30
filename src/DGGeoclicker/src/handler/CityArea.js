L.DG.Geoclicker.Handler.CityArea = L.DG.Geoclicker.Handler.Default.extend({

	statics: {
        Dictionary: {}
    },

	_polylineStyles : {
	    9 : {
            fillColor: '#ff9387', 
            fillOpacity: 0.18,
            strokeColor: '#ff9387',
            strokeWidth: 1,
            clickable: false
        },
        13 : {
            fillColor: '#ff9387', 
            fillOpacity: 0.12,
            strokeColor: '#ff9387',
            strokeWidth: 1,
            clickable: false
        },
        14 : {
            fillColor: '#ff9387', 
            fillOpacity: 0.08,
            strokeColor: '#ff9387',
            strokeWidth: 2,
            clickable: false
        },
        18 : {
            fillColor: '#ff9387', 
            fillOpacity: 0,
            strokeColor: '#ff9387',
            strokeWidth: 3,
            clickable: false
        }
    },
	_wktParser : L.DG.wkt(),

    handle: function (results, type) { // (Object, String) -> Object|Boolean
    	if (!results[type]) {
            return false;
        }

        this._geometry = this._readWKT( results[type].selection );
		this._geometryStyle = this._getPolyStyle(this._map.getZoom());

        this._geometry.setStyle(this._geometryStyle).addTo(this._map);

        this._map
        		.once('popupclose', this._onPopupClose, this)
				.on('zoomend', this._onZoomChange, this);

        return {
            tmpl: this.t(type) + ': ' + (results[type].short_name == '' ? this.t('noname') : results[type].short_name)
        };
    },

    _readWKT : function(selection) {
		this._wktParser.read(selection);
		return this._wktParser.toObject();
    },

    _getPolyStyle: function(zoom) {
    	var i;

        for (i in this._polylineStyles) if (this._polylineStyles.hasOwnProperty(i)) {
            if (zoom <= i) {
            	return this._polylineStyles[i];
            }
        }
        return false;
    },

    _onZoomChange: function() {
    	var newStyle = this._getPolyStyle(this._map.getZoom());

    	if (newStyle != this._geometryStyle) {
    		this._geometryStyle = newStyle;
    		this._geometry.setStyle( newStyle );
    	}
    },

    _onPopupClose: function() {
    	this._map
    			.removeLayer(this._geometry)
    			.off('zoomend', this._onZoomChange, this);
    }

});