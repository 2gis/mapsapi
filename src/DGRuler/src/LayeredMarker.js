L.DG.Ruler.LayeredMarker = L.Marker.extend({

    options: {
        draggable: true,
        keyboard: false,
        eventTransparent: true
    },

    statics: {
        _pointerEventsSupported : (function () {
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:none';
            return element.style.pointerEvents === 'none';
        })()
    },

    addTo : function (map, layers) {
        L.Util.invokeEach(this._layers, function (name, layer) {
            if (layers.hasOwnProperty(name)) {
                layers[name].addLayer(this._layers[name]);
            }
        }, this);

        this._viewport = layers;
        return this.on('move', this._onMove).super.addTo.call(this, map);
    },

    onRemove : function (map) {
        L.Util.invokeEach(this._layers, function (name, layer) {
            if (this._viewport.hasOwnProperty(name)) {
                this._viewport[name].removeLayer(this._layers[name]);
            }
        }, this);
        this.off('move', this._onMove);
        this._viewport = null;
        return this.super.onRemove.call(this, map);
    },

    setText : function (text) {
        if (this._iconCollapsed) {
            this.expand();
        }
        this._iconNodes.label.innerHTML = text;
        return this;
    },

    setPointStyle : function (styles) {
        L.Util.invokeEach(styles, function (name, style) {
            if (this._layers.hasOwnProperty(name)) {
                this._layers[name].setStyle(style);
            }
        }, this);
        if (styles.hasOwnProperty('icon')) {
            this.setIcon(styles.icon);
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

    _onMove : function (event) {
        var latlng = event.latlng;
        L.Util.invokeEach(this._layers, function (name, layer) {
            layer.setLatLng(latlng);
        });
    },

    _initIcon : function () {
        this.super._initIcon.call(this);
        this._iconCollapsed = false;
        this._iconNodes = {
            label : this._icon.querySelector('.dg-ruler-label-distance'),
            spacer : this._icon.querySelector('.dg-ruler-label-spacer'),
            container : this._icon.querySelector('.dg-ruler-label-inner')
        };
        if (this.options.eventTransparent) {
            if (this.constructor._pointerEventsSupported) {
                this._icon.style.pointerEvents = 'none';
            } else {
                L.DomEvent.addListener( this._icon, 'mousemove', this._explorerEventTransit, this);
            }
        }
    },

    _explorerEventTransit : function (event) {
        var underneathElem,
            eventObject = document.createEventObject();

        this._icon.style.display = 'none';
        underneathElem = document.elementFromPoint(event.clientX, event.clientY);
        this._icon.style.display = '';
        L.extend(eventObject, event);
        eventObject.target = underneathElem;
        underneathElem.fireEvent('onMouseMove', eventObject);
    },

    _afterInit : function () {
        this.super = this.constructor.__super__;
        this._layers = this.options.layers || null;
        this.options.icon = L.divIcon({
            className: 'dg-ruler-label',
            iconSize: [26, 26],
            iconAnchor: [13, 13],
            html: '<img class="dg-ruler-label-spacer" src="__BASE_URL__/img/spacer.gif" width="26" height="26" /><div class="dg-ruler-label-inner"><div class="dg-ruler-label-point"></div><span class="dg-ruler-label-distance">0 км</span></div>'
        });
    }

});

L.DG.Ruler.LayeredMarker.addInitHook('_afterInit');

L.DG.Ruler.layeredMarker = function (latlng, options) {
    return new L.DG.Ruler.LayeredMarker(latlng, options);
};
