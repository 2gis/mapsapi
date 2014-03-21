DG.Meta.Host = DG.Class.extend({

    initialize: function (map, meta) {
        this._map = map;
        this._meta = meta;
        this._buildingStorage = new DG.Meta.BuildingStorage();
        this._trafficStorage = new DG.Meta.TrafficStorage();
        this._poiStorage = new DG.Meta.PoiStorage();
    },

    getTileData: function (tileId) { //(String) -> Promise
        //var meta = this._meta;
        //this._getUrls(meta._listenPoi, meta._listenBuildings, meta._listenTraffic);
        var availablePoi = this._poiStorage.getTileData(tileId),
            availableBuildings = this._buildingStorage.getTileData(tileId),
            availableTraffic = this._trafficStorage.getTileData(tileId);
        // console.log(availableTraffic);
        if (/*availablePoi && availableBuildings &&*/ availableTraffic) {
            return DG.when({
                /*buildings: availableBuildings,
                poi: availablePoi,*/
                traffic: availableTraffic
            });
        } else {
            return this._askAndStoreTileData(tileId);
        }
    },

    _getUrls: function () {
        console.log(arguments);
    },

    _askAndStoreTileData: function (tileId) { //(String) -> Promise
        var self = this;

        return DG.when.all([
            this._askByTile(tileId, '__TRAFFIC_META_SERVER__'),
            this._askByTile(tileId, '__HIGHLIGHT_POI_SERVER__')
        ], function (data) {
            self._poiStorage.addDataToTile(tileId, data[1].result.poi);
            self._buildingStorage.addDataToTile(tileId, data[1].result.buildings);
            self._trafficStorage.addDataToTile(tileId, data[0]);

            return false;
        });
        /*return this._askByTile(tileId).then(
            function (result) {
                // console.log(result);

                self._trafficStorage.addDataToTile(tileId, result);
                return false;
            }
            // function (tileData) {
            //     var code = +tileData.response.code,
            //         result;

            //     switch (code) {
            //         case 200:
            //             result = tileData.result;
            //             break;
            //         case 204:
            //             result = {
            //                 buildings: [],
            //                 poi: []
            //             };
            //             break;
            //         default:
            //             return false;
            //     }

            //     self._poiStorage.addDataToTile(tileId, result.poi);
            //     self._buildingStorage.addDataToTile(tileId, result.buildings);

            //     return result;
            // }
        );*/
    },

    _askByTile: function (tileId, url) { //(String) -> Promise
        var xyz = tileId.split(',');

        return DG.ajax(
            DG.Util.template(url, {
                s: '0',
                projectCode: this._map.projectDetector.getProject().code,
                z: xyz[2],
                x: xyz[0],
                y: xyz[1]
            }), {
                type: 'get',
                dataType: 'json'
            }
        );
    }
    // _askByTile: function (tileId) { //(String) -> Promise
    //     var xyz = tileId.split(',');

    //     return DG.ajax(
    //         DG.Util.template('__HIGHLIGHT_POI_SERVER__', {
    //             z: xyz[2],
    //             x: xyz[0],
    //             y: xyz[1]
    //         }), {
    //             type: 'get',
    //             dataType: 'json'
    //         }
    //     );
    // }

});
