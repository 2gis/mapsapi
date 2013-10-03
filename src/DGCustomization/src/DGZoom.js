L.Control.Zoom.include(L.DG.Locale);
L.Control.Zoom.Dictionary = {};

L.Control.Zoom.include({
    // Sets default zoom position from current theme
    options: {
        position: L.DG.configTheme.controls.zoom.position
    },

    // TODO: think about pull request to leaflet with zoom control button's titles as options
    onAdd: function (map) {
        var zoomName = 'dg-zoom',
            container = L.DomUtil.create('div', zoomName),
            projectLeaveMaxZoom = '__PROJECT_LEAVE_MAX_ZOOM__';

        this._map = map;
        this._zoomInButton = this._createButton('+', this.t('zoom-in'), zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton('-', this.t('zoom-out'), zoomName + '__out', container, this._zoomOut, this);

        map.on('zoomend zoomlevelschange', this._updateDisabled, this);
        map.on('dgProjectLeave', function () {
            map.setMaxZoom(projectLeaveMaxZoom);
            if (map.getZoom() > projectLeaveMaxZoom) {
                map.setZoom(projectLeaveMaxZoom);
            }
        });

        map.on('dgProjectChange', function (project) {
            var projectInfo = project.getProject();
            if (projectInfo) {
                map.setMaxZoom(projectInfo.max_zoom_level);
            }
        });

        return container;
    },

    _renderTranslation: function () {
        this._zoomInButton.title = this.t('zoom-in');
        this._zoomOutButton.title = this.t('zoom-out');
    }
});