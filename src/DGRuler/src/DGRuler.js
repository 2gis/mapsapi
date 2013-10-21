L.DG.Ruler = L.Control.extend({
    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright'
    },

    _active: false,
    _drawingHelper: null,

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-ruler');

        this._link = L.DomUtil.create('a', '', container);
        this._link.href = '#';
        this._renderTranslation();

        this._drawingHelper = new L.DG.Ruler.DrawingHelper(map);

        L.DomEvent
            .disableClickPropagation(this._link)
            .addListener(this._link, 'click', this._toggleDrawing, this);

        return container;
    },

    onRemove: function () {
        L.DomEvent.removeListener(this._link, 'click', this._toggleDrawing);
        if (this._active) {
            this._drawingHelper.finishDrawing();
        }
        this._active = false;
    },

    _toggleDrawing: function (event) {
        L.DomEvent.stop(event);
        this._drawingHelper[(this._active = !this._active) ? 'startDrawing' : 'finishDrawing']();
        L.DomUtil[this._active ? 'addClass' : 'removeClass']( this._container, 'leaflet-control-ruler-active' )
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
    }
});

L.DG.ruler = function (options) {
    return new L.DG.Ruler(options);
};

L.Map.mergeOptions({
    rulerControl: true
});

L.Map.addInitHook(function () {
    if (this.options.rulerControl) {
        this.addControl(this.rulerControl = L.DG.ruler());
    }
});