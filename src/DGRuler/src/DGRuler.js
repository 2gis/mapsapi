L.DG.Ruler = L.Control.extend({
    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright'
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        L.extend(this, {
            _active: false,
            _drawingHelper: null,

            _label: null,
            _labelDistanceNode: null,
            _labelDeleteNode: null
        });
    },

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
        var helper = this._drawingHelper;
        L.DomEvent.stop(event);
        if (this._active = !this._active) {
            helper.startDrawing();
            if (!this.options.disableLabel) {
                helper.on(this._drawingHelperEvents, this);
            }
        } else {
            helper.finishDrawing()
            if (!this.options.disableLabel) {
                helper.off(this._drawingHelperEvents, this);
            }
        }
        L.DomUtil[this._active ? 'addClass' : 'removeClass']( this._container, 'leaflet-control-ruler-active' )
    },

    _drawingHelperEvents : {
        dgRulerAddLabel : function (event) {
            event.marker.bindLabel('<span class="dg-ruler-label-distance">0</span> км<a href="#" class="dg-ruler-label-close">X</a>', {
                static: true,
                className: 'dg-ruler-label',
                offset: new L.Point(-15, -40)
            });

            var labelNode = this._map.getContainer().querySelector('.dg-ruler-label');

            this._labelDistanceNode = labelNode.querySelector('.dg-ruler-label-distance');
            this._labelDeleteNode = labelNode.querySelector('.dg-ruler-label-close');

            L.DomEvent.addListener(this._labelDeleteNode, 'click', this._drawingHelper.deleteFirstPoint, this._drawingHelper);
        },
        dgRulerUpdateDistance : function (event) {
            var distance = event.distance;
            if (distance) {
                distance = distance.toFixed(2).split('.').join(',');
            }
            this._labelDistanceNode.innerHTML = distance;
        }
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
        this.addControl(this.rulerControl = L.DG.ruler(this.options.rulerControl));
    }
});