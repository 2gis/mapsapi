DG.Label = DG.Layer.extend({

    options: {
        offset: new DG.Point(12, 15),
        className: 'dg-label',
        zIndexOffset: 0,
        textDirection: 'auto' // 'auto' | 'ltr' | 'rtl
    },

    _typeOfString : Object.prototype.toString.call('s'),
    _defaultZIndex: 100,

    initialize: function(content, options) {
        DG.Util.setOptions(this, options);

        this._animated = DG.Browser.any3d;
        this._content = content;
    },

    onAdd: function(map) {
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

    onRemove: function(map) {
        map
            .off('viewreset', this._onViewReset, this)
            .off('zoomanim', this._onZoomAnimation, this);

        this._visible = false;

        this._el.removeChild(this._container);
        DG.Util.falseFn(this._container.offsetWidth); // we need reflow here
        this._container = null;

        map.getPanes().tooltipPane.removeChild(this._el);
        this._el = null;
    },

    _initDOM: function() {
        this._el = DG.DomUtil.create(
            'div',
            this.options.className + ' leaflet-zoom-' + (this._animated ? 'animated' : 'hide'),
            this._map.getPanes().tooltipPane);
        this._el.style.zIndex = this._defaultZIndex + this.options.zIndexOffset;

        this._container = DG.DomUtil.create('div', this.options.className + '__content', this._el);
        this._container.setAttribute('dir', this.options.textDirection);

        DG.DomEvent
            .disableClickPropagation(this._el)
            .on(this._container, 'mousewheel', DG.DomEvent.stopPropagation)
            .on(this._container, 'contextmenu', DG.DomEvent.stopPropagation);
    },

    _onViewReset: function() {
        if (this._visible && this._latlng) {
            DG.DomUtil.setPosition(this._el, this._map.latLngToLayerPoint(this._latlng).add(this.options.offset), DG.Browser.ie);
        }
    },

    _onZoomAnimation: function(opt) {
        if (this._latlng) {
            DG.DomUtil.setPosition(this._el, this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).add(this.options.offset));
        }
    },

    setOffset: function(point) {
        if (point instanceof DG.Point) {
            this.options.offset = point;
            this._onViewReset();
        }
        return this;
    },

    setZIndexOffset: function(zIndex) {
        if (!isNaN(+zIndex)) {
            this.options.zIndexOffset = +zIndex;
            if (this._visible) {
                this._el.style.zIndex = this._defaultZIndex + this.options.zIndexOffset;
            }
        }
        return this;
    },

    setContent: function(content) {
        if (Object.prototype.toString.call(content) !== this._typeOfString) {
            return this;
        }
        this._content = content;
        if (this._visible) {
            this._container.innerHTML = content;
        }
        return this;
    },

    setPosition: function(latlng) {
        if (!(latlng instanceof DG.LatLng)) {
            return this;
        }

        this._latlng = latlng;
        this._onViewReset();
        return this;
    }
});

DG.label = function(content, options) {
    return new DG.Label(content, options);
};
