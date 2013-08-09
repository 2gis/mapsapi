L.DG.Label = L.Class.extend({

	options: {
		offset: new L.Point(12, 15),
		className: 'dg-label'
	},

	_typeOfString : Object.prototype.toString.call('s'),

	initialize: function (content, options) {
		L.Util.setOptions(this, options);

		this._animated = L.Browser.any3d;
		this._content = content;
	},

	onAdd: function (map) {
        this._map = map;
        
        if (!this._el) {
			this._initDOM();
        }

        this._visible = true;

        this
        	.setContent(this._content)
			._onViewReset();

        map
        	.on('viewreset', this._onViewReset, this)
        	.on('zoomanim', this._onZoomAnimation, this);
    },

    onRemove: function (map) {
    	map
    		.off('viewreset', this._onViewReset, this)
    		.off('zoomanim', this._onZoomAnimation, this);

    	this._visible = false;

    	this._el.removeChild(this._container);
    	L.Util.falseFn(this._container.offsetWidth); // we need reflow here
    	this._container = null;

        map.getPanes().popupPane.removeChild(this._el);
        this._el = null;
    },

	_initDOM: function(){
		this._el = L.DomUtil.create(
						'div',
						this.options.className + ' leaflet-zoom-' + (this._animated ? 'animated' : 'hide'),
						this._map.getPanes().popupPane);

        this._container = L.DomUtil.create('div', '', this._el);
        L.DomUtil.disableTextSelection(this._container);
        L.DomEvent
        	.disableClickPropagation(this._el)
			.on(this._container, 'mousewheel', L.DomEvent.stopPropagation)
			.on(this._container, 'contextmenu', L.DomEvent.stopPropagation);
	},

    _onViewReset: function(){
    	if (this._latlng) {
    		L.DomUtil.setPosition( this._el, this._map.latLngToLayerPoint(this._latlng).add(this.options.offset) );
    	}
    },

    _onZoomAnimation: function (opt) {
    	if (this._latlng) {
			L.DomUtil.setPosition( this._el, this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).add(this.options.offset) );
		}
	},

	setContent: function (content) {
		if (Object.prototype.toString.call(content) !== this._typeOfString) {
            return this;
        }
        this._content = content;
		if (this._visible) {
			this._container.innerHTML = content;
		}
		return this;
	},

	setPosition: function (latlng) {
		if (!(latlng instanceof L.LatLng)) return this;
		this._latlng = latlng;
		if (this._visible) {
			this._onViewReset();
		}
		return this;
	}
});

L.DG.label = function(content, options){
	return new L.DG.Label(content, options);
}
