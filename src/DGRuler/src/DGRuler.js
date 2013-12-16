L.DG.Ruler = L.DG.RoundControl.extend({

    options: {
        position: 'topright',
        iconClass: 'ruler'
    },

    statics: {
        Dictionary: {}
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        L.extend(this, {
            _active: false,
            _drawingHelper: null,
            _geoclickerNeedRestore: false
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function () {
            var self = this;
            this._drawingHelper = new L.DG.Ruler.DrawingHelper(this._map, {
                translate : function (word) {
                    return self.t(word);
                }
            });
        },
        click: function () {
            if (this._active = !this._active) {
                this.setState('active')._drawingHelper.startDrawing();
                if (this._geoclickerNeedRestore = this._map.dgGeoclicker.enabled()) {
                    this._map.dgGeoclicker.disable();
                }
            } else {
                this.setState('')._drawingHelper.finishDrawing();
                if (this._geoclickerNeedRestore) {
                    this._map.dgGeoclicker.enable();
                }
            }
        },
        remove: function () {
            this.off(this._controlEvents, this);
            if (this._active) {
                this._drawingHelper.finishDrawing();
                this._active = false;
            }
            this._drawingHelper = null;
        }
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
        if (this._active) {
            this._drawingHelper.renderTranslation();
        }
    }
});

L.DG.ruler = function (options) {
    return new L.DG.Ruler(options);
};

L.Map.mergeOptions({
    rulerControl: false
});

L.Map.addInitHook(function () {
    if (this.options.rulerControl) {
        this.addControl(this.rulerControl = L.DG.ruler(this.options.rulerControl));
    }
});