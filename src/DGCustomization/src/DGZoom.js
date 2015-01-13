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
            buttonTemplate = '<div class="dg-control-round__icon ' + zoomName + '__control ' + zoomName + '__button ' + zoomName + '__button_type_{type}"></div>',
            container = DG.DomUtil.create('div', zoomName);

        this._map = map;

        this._zoomInButton = this._createButton(DG.Util.template(buttonTemplate, { type : 'in' }), this.t('zoom_in'), 'dg-control-round ' + zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(DG.Util.template(buttonTemplate, { type : 'out' }), this.t('zoom_out'), 'dg-control-round ' + zoomName + '__out', container, this._zoomOut, this);

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
        this._zoomInButton.title = this.t('zoom_in');
        this._zoomOutButton.title = this.t('zoom_out');
    },

    // add touchend event because tap don't work on controls when popup is open
    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        var clickEvent = DG.Browser.touch ? 'click touchend' : 'click';

        L.DomEvent
            .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, clickEvent, L.DomEvent.stop)
            .on(link, clickEvent, fn, this)
            .on(link, clickEvent, this._refocusOnMap, this);

        return link;
    }
});
