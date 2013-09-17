L.DG.PoiStorage = L.Class.extend({

    _pois: {},
    _tilesPoi: {},
    _wkt: new L.DG.Wkt(),

    getPoi: function (id) { //(String) -> Object|Null
        return this._pois[id] || null;
    },

    getTilePoiIds: function (tileId, callback) { //(String) -> Object|Null

        if (!this._tilesPoi.hasOwnProperty(tileId)) {
            this._askByTile(tileId, callback);
        } else {
            callback(this._tilesPoi[tileId]);
        }
    },

    _addPoisToTile: function (tileId, poi) { //(String, String)
        this._tilesPoi[tileId] ? null : this._tilesPoi[tileId] = [];

        for (var i = 0, len = poi.length; i < len; i++) {
            var poiId = poi[i].id;

            this._tilesPoi[tileId].push(poiId);
            this._addPoi(poiId, poi[i]);
        }
    },

    _addPoi: function (poiId, poiInfo) { //(String, Object)
        var randomPoiLink = poiInfo.links[Math.floor(Math.random() * poiInfo.links.length)];

        poiInfo.linked = {};
        for (var prop in randomPoiLink) {
            if (randomPoiLink.hasOwnProperty(prop)) {
                poiInfo.linked[prop] = randomPoiLink[prop];
            }
        }

        poiInfo.links.length = 0;
        delete poiInfo.links;

        poiInfo = this._wktToVert(poiInfo);

        this._pois[poiId] = poiInfo;
    },

    _wktToVert: function (poi) { //(Object)
        var vert = this._wkt.read(poi.hover);
        poi.vertices = this._wkt.toObject(vert)._latlngs;
        delete poi.hover;

        return poi;
    },

    _askByTile: function (tileId, callback) { //(String)
        var xyz = tileId.split(','),
            self = this;

        L.DG.ajax(
            L.Util.template('__HIGHLIGHT_POI_SERVER__', {
                z: xyz[2],
                x: xyz[0],
                y: xyz[1]
            }),
            {
                type: 'get',
                dataType: 'json',
                crossDomain: true,
                success : function (data) {
                    if (!data.poi) return;
                    self._addPoisToTile(tileId, data.poi);
                    if (callback) {
                        callback(self._tilesPoi[tileId]);
                    }
                }
            }
        );
    }
});
