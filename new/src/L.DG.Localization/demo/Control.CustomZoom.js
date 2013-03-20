/**
 * Demo plugin for testing localization.
 * Overrides L.Control.Zoom
 */

L.Control.CustomZoom = L.Control.Zoom.extend({
    options:{
        position:'topleft'
    },

    initialize:function (option) {
        L.Control.prototype.initialize.call(option);
        this._useLocalization();
    },

    onAdd:function (map) {
        var zoomName = 'leaflet-control-zoom',
            container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

        this._map = map;

        this._zoomInButton = this._createButton(
            '+', this._("Zoom in"), zoomName + '-in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(
            '-', this._("Zoom out"), zoomName + '-out', container, this._zoomOut, this);

        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        map.on('langchange zoomend', this._updateLocale, this);

        return container;
    },

    _useLocalization:function () {
        this._ = L.Util.bind(L.DG.Localization.prototype._, this);
        this.Dictionary = L.extend(L.Control.CustomZoom.Dictionary);
    },

    _updateLocale:function () {
        this._zoomInButton.title = this._("Zoom in");
        this._zoomOutButton.title = this._("Zoom out");
        this._updateDisabled();
    }
});

L.Map.mergeOptions({
    zoomControl:true
});

L.control.zoom = function (options) {
    return new L.Control.CustomZoom(options);
};



