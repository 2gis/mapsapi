DG.Ruler.LayeredMarker = DG.Marker.extend({

    /*global __DGRuler_TMPL__:false */

    options: {
        draggable: false,
        keyboard: false,
        riseOnHover: true,
        iconHTML: DG.template(__DGRuler_TMPL__.RulerLayeredMarker, {
            blankgif : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        })
    },

    statics: {
        domClass : 'dg-ruler-label'
    },

    addTo : function (map, layers) {
        Object.keys(this._layers).forEach(function (name) {
            layers[name].addLayer(this._layers[name]);
        }, this);

        this._viewport = layers;
        return DG.Marker.prototype.addTo.call(this.on('move', this._onMove), map);
    },

    onRemove : function (map) {
        Object.keys(this._layers).forEach(function (name) {
            this._viewport[name].removeLayer(this._layers[name]);
        }, this);
        this.off('move', this._onMove);
        this._viewport = null;
        this._style = null;
        return DG.Marker.prototype.onRemove.call(this, map);
    },

    setText : function (text) {
        if (this._iconCollapsed) {
            this.expand();
        }
        this._iconNodes.label.innerHTML = text;
        return this;
    },

    setPointStyle : function (style) {
        if (this._style !== style) {
            Object.keys(this._style = style).forEach(function (name) {
                this._layers[name].setStyle(style[name]);
            }, this);
        }
        return this;
    },

    expand : function () {
        this._iconCollapsed = false;
        this._iconNodes.container.style.display = 'block';
        this._iconNodes.spacer.style.display = 'none';
        return this;
    },

    collapse : function () {
        this._iconCollapsed = true;
        this._iconNodes.container.style.display = 'none';
        this._iconNodes.spacer.style.display = 'block';
        return this;
    },

    querySelector : function (selector) {
        return this._icon.querySelector('.' + DG.Ruler.LayeredMarker.domClass + '__' + selector);
    },

    _onMove : function (event) {
        var latlng = event.latlng;
        Object.keys(this._layers).forEach(function (name) {
            this._layers[name].setLatLng(latlng);
        }, this);
    },

    _initIcon : function () {
        DG.Marker.prototype._initIcon.call(this);
        this._iconCollapsed = true;
        this._icon.style.width = '';
        this._iconNodes = {
            label : this.querySelector('distance'),
            spacer : this.querySelector('spacer'),
            container : this.querySelector('inner')
        };
    },

    _afterInit : function () {
        this._layers = this.options.layers || null;
        this.options.icon = DG.divIcon({
            className: DG.Ruler.LayeredMarker.domClass,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
            html: this.options.iconHTML
        });
    }

});

DG.Ruler.LayeredMarker.addInitHook('_afterInit');

DG.Ruler.layeredMarker = function (latlng, options) {
    return new DG.Ruler.LayeredMarker(latlng, options);
};
