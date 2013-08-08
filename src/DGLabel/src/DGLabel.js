L.DG = L.DG || {};

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

L.Marker.include({
	
	bindLabel: function (content, options) {

		if (this._label) {
			this._label.setContent(content);
		} else {
			options = L.extend({ offset: new L.Point(5, 5) }, options);
			this._label = L.DG.label(content, options);
			this.once('remove', this.unbindLabel);
			if (options.static) {
				this.showLabel();
			} else {
				this.once('mouseover', this._mouseOverLabel)
			}
		}

		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this
				.hideLabel()
				.off( 'mouseout', this._mouseOutLabel )
				.off( 'mouseover', this._mouseOverLabel )
				.off( 'remove', this.unbindLabel);
			this._label = null;
		}
		return this;
	},

	showLabel : function(){
		if (this._label) {
			this
				.on('move', this._updatePosition)
				._map.addLayer( this._label.setPosition( this.getLatLng() ) );
		}
		return this;
	},

	hideLabel : function(){
		if (this._label) {
			this
				.off('move', this._updatePosition)
				._map.removeLayer( this._label );
		}
		return this;
	},

	getLabel: function () {
		return this._label ? this._label : null;
	},

	_updatePosition : function(){
		this._label.setPosition( this.getLatLng() );
	},

	_mouseOverLabel: function(){
		this
			.showLabel()
			.once('mouseout', this._mouseOutLabel);
	},

	_mouseOutLabel: function(){
		this
			.hideLabel()
			.once('mouseover', this._mouseOverLabel );
	}

});

L.Marker.addInitHook(function (){
	if (typeof this.options.label !== 'undefined') {
		this.bindLabel( this.options.label );
	}
});

L.Path.include({
	bindLabel: function (content, options) {
		
		if (!this._label) {
			this._label = L.DG.label(content, options);
			this.on(this._labelEvents, this);
		} else {
			this._label.setContent(content);
		}
		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this._labelEvents['mouseout remove'].call(this);
			this._label = null;
			this.off(this._labelEvents, this);
		}
		return this;
	},

	getLabel: function () {
		return this._label ? this._label : null;
	},

	_labelEvents : {
		'mouseover': function (event) {
			this._map.addLayer( this._label.setPosition( event.latlng ) );
		},
		'mousemove': function (event) {
			this._label.setPosition( event.latlng )
		},
		'mouseout remove': function () {
			this._map.removeLayer( this._label );
		}
	}
});

L.Path.addInitHook(function (){
	if (typeof this.options.label !== 'undefined') {
		this.bindLabel( this.options.label );
	}
});
