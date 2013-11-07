L.DG.Ruler = L.Control.extend({
    includes: L.DG.Locale,

    statics: {
        Dictionary: {},
        _tmpl: __DGRuler_TMPL__
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
        } else {
            helper.finishDrawing();
        }
        L.DomUtil[this._active ? 'addClass' : 'removeClass'](this._container, 'leaflet-control-ruler-active');
    },

    _drawingHelperEvents : {
        // startChange : function (event) {
        //     event.marker.bindLabel(L.DG.template(this.constructor._tmpl.mainLabel, { distanceUnit : this.t('distanceUnit') }), {
        //         static: true,
        //         className: 'dg-ruler-label',
        //         offset: new L.Point(-15, -40)
        //     });

        //     var labelNode = this._map.getContainer().querySelector('.dg-ruler-label');
        //     this._labelDistanceNode = labelNode.querySelector('.dg-ruler-label-distance');
        //     this._labelDeleteNode = labelNode.querySelector('.dg-ruler-label-close');

        //     L.DomEvent.addListener(this._labelDeleteNode, 'click', this._drawingHelper.deleteFirstPoint, this._drawingHelper);
        // },
        // change : function (event) {
        //     this._labelDistanceNode.innerHTML = this._formatDistance(event.distance);
        // },
        // hover : function (event) {
        //     this._label = L.DG.label(L.DG.template(this.constructor._tmpl.hoverLabel), {
        //         static: true,
        //         className: 'dg-ruler-label',
        //         offset: new L.Point(-15, -15)
        //     });
        //     event.layerGroup.addLayer(this._label);
        // },
        // mousemove : function (event) {
        //     this._label
        //             .setPosition(event.latlng)
        //             .setContent(this._formatDistance(event.distance) + this.t('distanceUnit'));
        // }
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
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