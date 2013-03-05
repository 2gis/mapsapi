/**
 * Demo plugin for testing localization.
 * Overrides L.Control.Zoom
 */
"use strict";
L.Control.CustomZoom = L.Control.extend({
    options:{
        position:'topleft'
    },

    initialize:function (option) {
        L.Control.prototype.initialize.call(option);
        this._ = L.Util.bind(L.DG.Localization.prototype._, this);
        this.Dictionary =  L.extend(L.Control.CustomZoom.Dictionary);
    },

    onAdd:function (map) {
        var zoomName = 'leaflet-control-zoom',
            container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

        this._map = map;

        this._zoomInButton  = this._createButton(
            '+', this._("Zoom in",null,{msg: "(" + this._("Current Zoom") + ": " + this._map.getZoom() + ")"}),  zoomName + '-in',  container, this._zoomIn,  this);
        this._zoomOutButton = this._createButton(
            '-', this._("Zoom out"), zoomName + '-out', container, this._zoomOut, this);

        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        map.on('langchange', this._updateLocale, this);

        return container;
    },

    onRemove:function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn:function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut:function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _createButton:function (html, title, className, container, fn, context) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        var stop = L.DomEvent.stopPropagation;

        L.DomEvent
            .on(link, 'click', stop)
            .on(link, 'mousedown', stop)
            .on(link, 'dblclick', stop)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, context);

        return link;
    },

    _updateDisabled:function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
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



