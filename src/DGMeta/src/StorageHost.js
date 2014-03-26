DG.Meta.Host = DG.Class.extend({
    _subdomains: '0123456789',

    initialize: function (map, meta) {
        this._map = map;
        this._meta = meta;
        this._buildingStorage = new DG.Meta.BuildingStorage();
        this._trafficStorage = new DG.Meta.TrafficStorage();
        this._poiStorage = new DG.Meta.PoiStorage();
    },

    getTileData: function (tileId) { //(String) -> Promise
        var availablePoi = this._poiStorage.getTileData(tileId),
            availableBuildings = this._buildingStorage.getTileData(tileId),
            availableTraffic = this._trafficStorage.getTileData(tileId);

        if (availablePoi && availableBuildings && availableTraffic) {
            return DG.when({
                buildings: availableBuildings,
                poi: availablePoi,
                traffic: availableTraffic
            });
        } else {
            return this._askAndStoreTileData(tileId);
        }
    },

    _askAndStoreTileData: function (tileId) { //(String) -> Promise
        var self = this;

        return DG.when.all([
            this._askByTile(tileId, '__HIGHLIGHT_POI_SERVER__'),
            this._askByTile(tileId, '__TRAFFIC_META_SERVER__')
        ], function (data) {
            var code = +data[0].status,
                result = data[0].result;

            if (code === 204) {
                result = {
                    buildings: [],
                    poi: []
                };
            }

            result.traffic = (data[1].status === 204) ? [] : data[1];

            return {
                poi: self._poiStorage.addDataToTile(tileId, result.poi),
                buildings: self._buildingStorage.addDataToTile(tileId, result.buildings),
                traffic: self._trafficStorage.addDataToTile(tileId, result.traffic)
            };
        }, function () {
            return false;
        });
    },

    _askByTile: function (tileId, url) { //(String) -> Promise
        var xyz = tileId.split(',');

        return DG.ajax(
            DG.Util.template(url, {
                s: this._getSubdomain(xyz),
                projectCode: this._map.projectDetector.getProject().code,
                z: xyz[2],
                x: xyz[0],
                y: xyz[1]
            }), {
                type: 'get',
                dataType: 'json'
            }
        );
    },

    _getSubdomain: function (xyz) {
        var index = Math.abs(xyz[1] + xyz[2]) % this._subdomains.length;
        return this._subdomains[index];
    }
});
