L.DG.Meta.Host = L.Class.extend({

	initialize: function () {
        this._buildingStorage = new L.DG.Meta.BuildingStorage();
        this._poiStorage = new L.DG.Meta.PoiStorage();
    },

    getTileData: function (tile) { // (String) -> Promise
		return this._poiStorage.getTilePoiIds(tile);
    }

});