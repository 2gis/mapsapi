// Fix a lot of bugs with pinch-zooming
// See https://github.com/2gis/mapsapi/issues/327
DG.Map.mergeOptions({
    bounceAtZoomLimits: false
});

//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo;

DG.Control.include({
    addTo: function(map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function() {}
});

// Just a copy of toPoint function
// https://github.com/Leaflet/Leaflet/blob/e079588573d0b0c649df95c3d6005373e87f323a/src/geometry/Point.js#L198-L222
function toPoint(x, y, round) {
    if (x instanceof DG.Point) {
        return x;
    }
    if (DG.Util.isArray(x)) {
        return new DG.Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
        return x;
    }
    if (typeof x === 'object' && 'x' in x && 'y' in x) {
        return new DG.Point(x.x, x.y);
    }
    return new DG.Point(x, y, round);
}

// Add ability to pass HTMLElement in DG.divIcon html parameter
// See https://github.com/Leaflet/Leaflet/pull/6571
// TODO: Remove it after updating leaflet at least to v1.5.0
DG.DivIcon.include({
    createIcon: function(oldIcon) {
        var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
            options = this.options;

        if (options.html instanceof Element) {
            DG.DomUtil.empty(div);
            div.appendChild(options.html);
        } else {
            div.innerHTML = options.html !== false ? options.html : '';
        }

        if (options.bgPos) {
            var bgPos = toPoint(options.bgPos);
            div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
        }
        this._setIconStyles(div, 'icon');

        return div;
    },
});

// Add some browser detection
DG.Browser.safari51 = DG.Browser.safari && navigator.userAgent.indexOf('Version/5.1') !== -1;

// DG.Browser.touch checks whether touch events supported or not; touchEnabled checks if it's a touch device
var msPointer = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent;
var pointer = (window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints) || msPointer;
var documentTouch = window.DocumentTouch && document instanceof window.DocumentTouch;
DG.Browser.touchEnabled = pointer || 'ontouchstart' in window || documentTouch;

// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

// support old option clickable
var utilSetOptions = DG.Util.setOptions;

DG.setOptions = L.setOptions = DG.Util.setOptions = function(obj, options) {
    if (options && typeof options.clickable !== 'undefined') {
        options.interactive = options.clickable;
    }

    return utilSetOptions.call(this, obj, options);
};

DG.Layer.mergeOptions({
    nonBubblingEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu']
});

L.Canvas.include({
    // overwrite the function without mousemove debounce as it breaks metalayers events
    _initContainer: function() {
        var container = this._container = document.createElement('canvas');

        L.DomEvent
            .on(container, 'mousemove', this._onMouseMove, this)
            .on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this)
            .on(container, 'mouseout', this._handleMouseOut, this);

        this._ctx = container.getContext('2d');
    }
});

// Monitor geometry usage
// TODO: remove after successful research
if (DG.Path) {
    var pathInitialize = DG.Path.prototype.onAdd;
    var loggedGeometryTypes = {};

    DG.Path.include({
        onAdd: function(map) {
            var type = 'Unknown';

            if (DG.Rectangle && this instanceof DG.Rectangle) {
                type = 'Rectangle';
            } else if (DG.Circle && this instanceof DG.Circle) {
                type = 'Circle';
            } else if (DG.CircleMarker && this instanceof DG.CircleMarker) {
                type = 'CircleMarker'
            } else if (DG.Polygon && this instanceof DG.Polygon) {
                type = 'Polygon';
            } else if (DG.Polyline && this instanceof DG.Polyline) {
                type = 'Polyline';
            }

            // Don't send event twice for same type
            if (!loggedGeometryTypes[type]) {
                loggedGeometryTypes[type] = true;

                if (typeof ga !== undefined) {
                    // eslint-disable-next-line no-undef
                    ga(DG.config.gaName + '.send', 'event', 'Geometry', 'Use', type);
                }
            }

            return pathInitialize.call(this, map);
        },
    });
}
