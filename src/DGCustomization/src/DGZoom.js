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
            buttonTemplate = '<div class="dg-zoom__control dg-zoom__{type}-button"></div>',
            container = L.DomUtil.create('div', zoomName),
            projectLeaveMaxZoom = '__PROJECT_LEAVE_MAX_ZOOM__';

        this._map = map;

        this._zoomInButton = this._createButton(L.Util.template(buttonTemplate, { type : 'in' }), this.t('zoom-in'), zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(L.Util.template(buttonTemplate, { type : 'out' }), this.t('zoom-out'), zoomName + '__out', container, this._zoomOut, this);

        this._eventListeners.zoomend = this._eventListeners.zoomlevelschange = this._updateDisabled;
        map.on(this._eventListeners, this);

        return container;
    },

    onRemove: function () {
        map.off(this._eventListeners, this);
    },

    _eventListeners : {
        dgProjectLeave : function () {
            map.setMaxZoom(projectLeaveMaxZoom);
            if (map.getZoom() > projectLeaveMaxZoom) {
                map.setZoom(projectLeaveMaxZoom);
            }
        },
        dgProjectChange : function (project) {
            var projectInfo = project.getProject();
            if (projectInfo) {
                map.setMaxZoom(projectInfo.max_zoom_level);
            }
        }
    },

    _renderTranslation: function () {
        this._zoomInButton.title = this.t('zoom-in');
        this._zoomOutButton.title = this.t('zoom-out');
    }
});