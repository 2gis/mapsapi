L.Control.Zoom.include(L.DG.Locale);
L.Control.Zoom.Dictionary = {};

L.Control.Zoom.include({
    // Sets default zoom position from current theme
    options: {
        position: L.DG.configTheme.controls.zoom[L.Browser.touch ? 'touchPosition' : 'position']
    },

    // TODO: think about pull request to leaflet with zoom control button's titles as options
    onAdd: function (map) {
        var zoomName = 'dg-zoom',
            buttonTemplate = '<div class="dg-control-round_icon dg-zoom__control dg-zoom__{type}-button"></div>',
            container = L.DomUtil.create('div', zoomName);

        this._map = map;

        this._zoomInButton = this._createButton(L.Util.template(buttonTemplate, { type : 'in' }), this.t('zoom-in'), 'dg-control-round ' + zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(L.Util.template(buttonTemplate, { type : 'out' }), this.t('zoom-out'), 'dg-control-round ' + zoomName + '__out', container, this._zoomOut, this);

        this._eventListeners.zoomend = this._eventListeners.zoomlevelschange = this._updateDisabled;
        this._updateDisabled();
        map.on(this._eventListeners, this);

        return container;
    },

    onRemove: function (map) {
        map.off(this._eventListeners, this);
    },

    _eventListeners : {
        projectleave : function () {
            var projectleaveMaxZoom = '__PROJECT_LEAVE_MAX_ZOOM__';
            this._map.setMaxZoom(projectleaveMaxZoom);
            if (this._map.getZoom() > projectleaveMaxZoom) {
                this._map.setZoom(projectleaveMaxZoom);
            }
        },
        projectchange : function (project) {
            var projectInfo = project.getProject();
            if (projectInfo) {
                this._map.setMaxZoom(projectInfo.max_zoom_level);
            }
        }
    },

    _renderTranslation: function () {
        this._zoomInButton.title = this.t('zoom-in');
        this._zoomOutButton.title = this.t('zoom-out');
    }
});
