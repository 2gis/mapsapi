L.DG.Control.Ruler = L.DG.RoundControl.extend({

    options: {
        position: L.DG.configTheme.controls.ruler.position,
        iconClass: 'ruler'
    },

    statics: {
        Dictionary: {}
    },

    initialize: function (options) {
        L.setOptions(this, options);
        L.extend(this, {
            _active: false,
            _drawingHelper: null,
            _geoclickerNeedRestore: false
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function () {
            window.d = this._drawingHelper = L.DG.ruler();
        },
        click: function () {
            if (this._active = !this._active) { // jshint ignore:line
                this.setState('active');
                this._map.addLayer(this._drawingHelper);
                if (this._geoclickerNeedRestore = this._map.geoclicker.enabled()) { // jshint ignore:line
                    this._map.geoclicker.disable();
                }
            } else {
                this.setState('');
                this._map.removeLayer(this._drawingHelper);
                if (this._geoclickerNeedRestore) {
                    this._map.geoclicker.enable();
                }
            }
        },
        remove: function () {
            this.off(this._controlEvents, this);
            if (this._active) {
                this._map.removeLayer(this._drawingHelper);
                this._active = false;
            }
            this._drawingHelper = null;
        }
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
    }
});

L.DG.Control.ruler = function (options) {
    return new L.DG.Control.Ruler(options);
};

L.Map.mergeOptions({
    rulerControl: false
});

L.Map.addInitHook(function () {
    if (this.options.rulerControl) {
        this.addControl(this.rulerControl = L.DG.Control.ruler(this.options.rulerControl));
    }
});