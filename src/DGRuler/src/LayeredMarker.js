DG.Ruler.LayeredMarker = DG.Marker.extend({
    options: {
        draggable: false,
        keyboard: false,
        riseOnHover: true,
        pane: 'rulerMarkerPane',
        textDirection: 'auto', // 'auto' | 'ltr' | 'rtl'
        iconHTML: [
            '<img class="dg-ruler__label-spacer" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="26" height="26" />',
            '<div class="dg-ruler__label-container">',
            '    <div class="dg-ruler__point"></div>',
            '    <span class="dg-ruler__label-distance">0 км</span>',
            '    <span class="dg-ruler__label-remove-link"></span>',
            '    <div class="dg-ruler__remove-link-overlay"></div>',
            '</div>'
        ].join('\n')
    },

    statics: {
        domClass : 'dg-ruler__label'
    },

    addTo : function(map, layers) {
        Object.keys(this._layers).forEach(function(name) {
            layers[name].addLayer(this._layers[name]);
        }, this);

        this._viewport = layers;
        return DG.Marker.prototype.addTo.call(this.on('move', this._onMove), map);
    },

    onRemove : function(map) {
        Object.keys(this._layers).forEach(function(name) {
            this._viewport[name].removeLayer(this._layers[name]);
        }, this);
        this.off('move', this._onMove);
        this._viewport = null;
        this._style = null;
        return DG.Marker.prototype.onRemove.call(this, map);
    },

    setText : function(text) {
        if (this._iconCollapsed) {
            this.expand();
        }
        this._iconNodes.label.innerHTML = text;
        this._iconNodes.label.setAttribute('dir', this.options.textDirection);
        return this;
    },

    setPointStyle : function(style) {
        if (this._style !== style) {
            Object.keys(this._style = style).forEach(function(name) {
                this._layers[name].setStyle(style[name]);
            }, this);
        }
        return this;
    },

    expand : function() {
        this._iconCollapsed = false;
        this._iconNodes.container.style.display = 'block';
        this._iconNodes.spacer.style.display = 'none';
        return this;
    },

    collapse : function() {
        this._iconCollapsed = true;
        this._iconNodes.container.style.display = 'none';
        this._iconNodes.spacer.style.display = 'block';
        return this;
    },

    querySelector : function(selector) {
        return this._icon.querySelector('.' + DG.Ruler.LayeredMarker.domClass + '-' + selector);
    },

    _onMove : function(event) {
        var latlng = event.latlng;
        Object.keys(this._layers).forEach(function(name) {
            this._layers[name].setLatLng(latlng);
        }, this);
    },

    _initIcon : function() {
        DG.Marker.prototype._initIcon.call(this);
        this._iconCollapsed = true;
        this._icon.style.width = '';
        this._iconNodes = {
            label : this.querySelector('distance'),
            spacer : this.querySelector('spacer'),
            container : this.querySelector('container')
        };
    },

    // don't change icon zIndex
    _setPos: function(pos) {
        L.DomUtil.setPosition(this._icon, pos);

        if (this._shadow) {
            L.DomUtil.setPosition(this._shadow, pos);
        }
    },

    _afterInit : function() {
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

DG.Ruler.layeredMarker = function(latlng, options) {
    return new DG.Ruler.LayeredMarker(latlng, options);
};
