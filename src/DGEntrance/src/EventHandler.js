DG.Entrance.EventHandler = DG.Handler.extend({

    initialize: function (map, entrance) { // (DG.Map, DG.Entrance)
        this._map = map;
        this._entrance = entrance;
    },

    addHooks: function () {
        this._map.on(this._events(), this);
    },

    removeHooks: function () {
        this._map.off(this._events(), this);
    },

    _events: function () {
        return {
            'layeradd': this._removeEntrance,
            'zoomend': this._showOrHideEntrance,
            'projectleave': this._showOrHideEntrance
        };
    },

    _showOrHideEntrance: function () { // (DG.Event)
        if (this._map.getZoom() >= DG.Entrance.SHOW_FROM_ZOOM) {
            this._entrance.show(false);
        }
        else {
            this._entrance.hide();
        }
    },

    _removeEntrance: function (e) { // (DG.LayerEvent)
        if (e.layer instanceof DG.Popup ||
            (e.layer instanceof DG.Entrance && e.layer !== this._entrance)) {

            this._entrance.removeFrom(this._map);
        }
    }
});
