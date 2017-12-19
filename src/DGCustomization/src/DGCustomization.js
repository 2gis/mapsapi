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

DG.DomEvent.getEventPath = function(event) {
    if (event.path) {
        return event.path; // chrome
    }
    var path = [];
    var currentElem = event.target || event.srcElement;
    while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
    if (path.indexOf(window) === -1)
        path.push(window);
    return path;
};
