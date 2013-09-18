L.DG.PoiStorage = L.Class.extend({

    _pois: {},
    _tilesPoi: {},
    _wkt: new L.DG.Wkt(),

    getPoi: function (id) { //(String) -> Object|Null
        return this._pois[id] || null;
    },

    getTilePoiIds: function (tileId, callback) { //(String) -> Object|Null

        //TODO: provide possibility send callback to async request poi
        if (!this._tilesPoi.hasOwnProperty(tileId)) {
            this._askByTile(tileId, callback);
        } else {
            callback(this._tilesPoi[tileId]);
        }
    },

    _addPoisToTile: function (tileId, poi) { //(String, String)
        for (var i = 0, len = poi.length; i < len; i++) {
            var poiId = poi[i].id;
            delete poi[i].id;

            this._tilesPoi[tileId] ? null : this._tilesPoi[tileId] = [];
            this._tilesPoi[tileId].push(poiId);

            this._addPoi(poiId, poi[i]);
        }
    },

    _addPoi: function (poiId, poiInfo) { //(String, Object)
        var poiVert = this._wktToVert(poiInfo);
        this._pois[poiId] = poiVert;
    },

    _wktToVert: function (poi) { //(Object)
        var vert = this._wkt.read(poi.hover);
        poi.vertices = this._wkt.toObject(vert)._latlngs;

        return poi;
    },

    _askByTile: function (tileId, callback) { //(String)
        var xyz = tileId.split(','),
            self = this;

        L.DG.Jsonp({
            url : L.Util.template('__HIGHLIGHT_POI_SERVER__', {
                z: xyz[2],
                x: xyz[0],
                y: xyz[1]
            }),
            success : function (data) {
                if (data.response.code !== 200) {
                    return;
                }
                self._addPoisToTile(tileId, data.result.poi);
                if (callback) {
                    callback(self._tilesPoi[tileId]);
                }
            }
        });
    }
});