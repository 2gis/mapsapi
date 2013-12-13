L.DG.Meta.Host = L.Class.extend({

    initialize: function () {
        this._buildingStorage = new L.DG.Meta.BuildingStorage();
        this._poiStorage = new L.DG.Meta.PoiStorage();
    },

    getTileData: function (tileId) { //(String) -> Promise
        var availablePoi = this._poiStorage.getTileData(tileId),
            availableBuildings = this._buildingStorage.getTileData(tileId);

        if (availablePoi && availableBuildings) {
            return L.DG.when({
                buildings: availableBuildings,
                poi: availablePoi
            });
        } else {
            return this._askAndStoreTileData(tileId);
        }
    },

    _askAndStoreTileData: function (tileId) { //(String) -> Promise
        var self = this;

        return this._askByTile(tileId).then(
            function (tileData) {
                var code = +tileData.response.code,
                    result;

                switch (code) {
                    case 200:
                        result = tileData.result;
                        break;
                    case 204:
                        result = {
                            buildings: [],
                            poi: []
                        };
                        break;
                    default:
                        return false;
                }

                self._poiStorage.addDataToTile(tileId, result.poi);
                self._buildingStorage.addDataToTile(tileId, result.buildings);

                return result;
            }
        );
    },

    _askByTile: function (tileId) { //(String) -> Promise
        var xyz = tileId.split(',');

        return L.DG.ajax(
            L.Util.template('__HIGHLIGHT_POI_SERVER__', {
                z: xyz[2],
                x: xyz[0],
                y: xyz[1]
            }), {
                type: 'get',
                dataType: 'json'
            }
        );
    }

});
