DG.Control.Zoom.include(DG.Locale);
DG.Control.Zoom.Dictionary = {};

DG.Control.Zoom.include({
    // Sets default zoom position from current theme
    options: {
        position: DG.Browser.touch ? 'bottomright' : 'topleft'
    },

    // TODO: think about pull request to leaflet with zoom control button's titles as options
    onAdd: function (map) {
        var zoomName = 'dg-zoom',
            buttonTemplate = '<div class="dg-control-round_icon dg-zoom__control dg-zoom__{type}-button"></div>',
            container = DG.DomUtil.create('div', zoomName);

        this._map = map;

        this._zoomInButton = this._createButton(DG.Util.template(buttonTemplate, { type : 'in' }), this.t('zoom-in'), 'dg-control-round ' + zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(DG.Util.template(buttonTemplate, { type : 'out' }), this.t('zoom-out'), 'dg-control-round ' + zoomName + '__out', container, this._zoomOut, this);

        this._eventListeners = {};
        this._eventListeners.zoomend = this._eventListeners.zoomlevelschange = this._updateDisabled;
        this._updateDisabled();
        map.on(this._eventListeners, this);

        return container;
    },

    onRemove: function (map) {
        map.off(this._eventListeners, this);
    },

    _renderTranslation: function () {
        this._zoomInButton.title = this.t('zoom-in');
        this._zoomOutButton.title = this.t('zoom-out');
    }
});
