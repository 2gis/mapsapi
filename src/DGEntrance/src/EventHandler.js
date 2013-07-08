L.DG.Entrance.EventHandler = L.Handler.extend({
    
    _map: null,
    _entrance: null,

    initialize: function (map, entrance) { // (L.Map, L.DG.Entrance)
        this._map = map;
        this._entrance = entrance;

        this._map.on({
            'layeradd': this._removeEntrance,
            'zoomend': this._showOrHideEntrance
        }, this);
    },

    _showOrHideEntrance: function (e) { // (L.Event)
        if (this._map.getZoom() >= L.DG.Entrance.SHOW_FROM_ZOOM) {
            this._entrance.show();
        }
        else {
            this._entrance.hide();
        }
    },

    _removeEntrance: function (e) { // (L.LayerEvent)
        console.log(e.layer instanceof L.Popup);
        if (e.layer instanceof L.Popup) {
            this._entrance.onRemove(this._map);
        }
    },

    remove: function () {
        this._map.off({
            'zoomend': this._showOrHideEntrance,
            'layeradd': this._removeEntrance      
        }, this);
    }

});