L.DG.Entrance.EventHandler = L.Handler.extend({

    initialize: function (map, entrance) { // (L.Map, L.DG.Entrance)
        this._map = map;
        this._entrance = entrance;

        this._map.addEventListener({
            'popupopen': this._entrance.onRemove,
            'zoomend': this._showOrHideEntrance,
            'layeradd': this._removeEntrance
        });
    },

    this._showOrHideEntrance: function (e) { // (L.Event)
        // this._entrance.shouldBeShown?
        // hide or show entrance
    },

    this._removeEntrance: function (e) { // (L.LayerEvent)
        // layer type is L.DG.Entrance?
        // remove entrance
    },

    this.remove: function () {
        // cleanup
    }

});