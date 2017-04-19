DG.Control.Ruler = DG.RoundControl.extend({

    options: {
        position: 'topright',
        iconClass: 'ruler'
    },

    statics: {
        Dictionary: {}
    },

    initialize: function(options) {
        DG.setOptions(this, options);
        DG.extend(this, {
            _active: false,
            _drawingHelper: null,
            _geoclickerNeedRestore: false
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function() {
            this._drawingHelper = DG.ruler([]);
        },
        click: function() {
            this._active = !this._active;

            if (this._active) {
                this.setState('active');
                this._startDrawing();
            } else {
                this.setState('');
                this._finishDrawing();
            }
        },
        remove: function() {
            this.off(this._controlEvents, this);
            if (this._active) {
                this._map.removeLayer(this._drawingHelper);
                this._active = false;
            }
            this._drawingHelper = null;
        }
    },

    _startDrawing: function() { // ()
        this._map
            .addLayer(this._drawingHelper)
            .on('click', this._handleMapClick, this);

        this._map.fire('rulerstart');
    },

    _finishDrawing: function() { // ()
        this._map
            .off('click', this._handleMapClick, this)
            .removeLayer(this._drawingHelper);

        this._drawingHelper.setLatLngs([]);

        this._map.fire('rulerend');
    },

    _handleMapClick: function(event) { // (MouseEvents)
        this._drawingHelper.addLatLng(event.latlng);
    },

    _renderTranslation: function() { // ()
        this._link.title = this.t('button_title');
    }
});

DG.control.ruler = function(options) {
    return new DG.Control.Ruler(options);
};

DG.Map.mergeOptions({
    rulerControl: false
});

DG.Map.addInitHook(function() {
    if (this.options.rulerControl) {
        this.rulerControl = DG.control.ruler(this.options.rulerControl);
        this.addControl(this.rulerControl);
    }
});
