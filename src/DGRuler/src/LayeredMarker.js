L.DG.Ruler.LayeredMarker = L.Marker.extend({

    options: {
        draggable: true,
        keyboard: false,
        eventTransparent: true,
        iconHTML: '<img class="dg-ruler-label-spacer" src="__BASE_URL__/img/spacer.gif" width="26" height="26" /><div class="dg-ruler-label-inner"><div class="dg-ruler-label-point"></div><span class="dg-ruler-label-distance">0 км</span><a class="dg-ruler-label-delete" href="#"></a></div>'
    },

    statics: {
        _pointerEventsSupported : (function () {
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:none';
            return element.style.pointerEvents === 'none';
        })()
    },

    addTo : function (map, layers) {
        Object.keys(this._layers).forEach(function (name) {
            layers[name].addLayer(this._layers[name]);
        }, this);

        this._viewport = layers;
        return L.Marker.prototype.addTo.call(this.on('move', this._onMove), map);
    },

    onRemove : function (map) {
        Object.keys(this._layers).forEach(function (name) {
            this._viewport[name].removeLayer(this._layers[name]);
        }, this);
        this.off('move', this._onMove);
        this._viewport = null;
        return L.Marker.prototype.onRemove.call(this, map);
    },

    setText : function (text) {
        if (this._iconCollapsed) {
            this.expand();
        }
        this._iconNodes.label.innerHTML = text;
        return this;
    },

    setPointStyle : function (styles) {
        Object.keys(styles).forEach(function (name) {
            this._layers[name].setStyle(styles[name]);
        }, this);
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
        return this._icon.querySelector(selector);
    },

    _onMove : function (event) {
        var latlng = event.latlng;
        Object.keys(this._layers).forEach(function (name) {
            this._layers[name].setLatLng(latlng);
        }, this);
    },

    _createOn : function ( root, name, attrs ) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', name);
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) el.setAttribute(attr,attrs[attr]);
        }
        return root.appendChild(el);
    },

    _initIcon : function () {
        L.Marker.prototype._initIcon.call(this);
        this._iconCollapsed = true;
        this._icon.style.width = '';
        this._iconNodes = {
            label : this.querySelector('.dg-ruler-label-distance'),
            spacer : this.querySelector('.dg-ruler-label-spacer'),
            container : this.querySelector('.dg-ruler-label-inner')
        };

        if (this.options.eventTransparent) {
            if (this.constructor._pointerEventsSupported) {
                this._icon.style.pointerEvents = 'none';
            } else {
                L.DomEvent.addListener(this._icon, 'mousemove', this._explorerEventTransit, this);
            }
        }
    },

    _explorerEventTransit : function (event) {
        var underneathElem,
            eventObject = document.createEventObject(event);

        this._icon.style.display = 'none';
        underneathElem = document.elementFromPoint(event.clientX, event.clientY);
        this._icon.style.display = '';
        eventObject.target = underneathElem;
        underneathElem.fireEvent('onMouseMove', eventObject);
    },

    _afterInit : function () {
        this._layers = this.options.layers || null;
        this.options.icon = L.divIcon({
            className: 'dg-ruler-label',
            iconSize: [26, 26],
            iconAnchor: [13, 13],
            html: this.options.iconHTML
        });
    }

});

L.DG.Ruler.LayeredMarker.addInitHook('_afterInit');

L.DG.Ruler.layeredMarker = function (latlng, options) {
    return new L.DG.Ruler.LayeredMarker(latlng, options);
};
