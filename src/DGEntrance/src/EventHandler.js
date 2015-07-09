DG.Entrance.EventHandler = DG.Handler.extend({
    options: {
        autoClose: true
    },

    initialize: function (map, entrance, options) { // (DG.Map, DG.Entrance)
        DG.Util.setOptions(this, options);

        this._map = map;
        this._entrance = entrance;
    },

    addHooks: function () {
        this._map.on({
            zoomend: this._showOrHideEntrance,
            projectleave: this._showOrHideEntrance
        }, this);

        if (this.options.autoClose) {
            this._map.on('layeradd', this._removeEntrance, this);
        }
    },

    removeHooks: function () {
        this._map.off({
            zoomend: this._showOrHideEntrance,
            projectleave: this._showOrHideEntrance
        }, this);

        if (this.options.autoClose) {
            this._map.off('layeradd', this._removeEntrance, this);
        }
    },

    _showOrHideEntrance: function () { // (DG.Event)
        if (this._map.getZoom() >= DG.Entrance.SHOW_FROM_ZOOM) {
            this._entrance.show(false);
        } else {
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
