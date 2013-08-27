L.DG.PoiStorage = L.Class.extend({

    _pois: {},
    _tilesPoi: {},
    _wkt: new L.DG.Wkt(),

    getPoi: function (id) { //(String) -> Object|Null
        return this._pois[id] || null;
    },

    getTilePoiIds: function (tileId) { //(String) -> Object|Null

        //TODO: provide possibility send callback to async request poi
        if (!this._tilesPoi.hasOwnProperty(tileId)) {
            this._askByTile(tileId);
        }

        return this._tilesPoi[tileId] || null;
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

    _askByTile: function (tileId) { //(String)
        var xyz = tileId.split(',');
        // send request to api http://highlight{0-9}.2gis.ru/{xyz[2]}/{xyz[0]}/{xyz[1]}
        // get:
        var demoPois = {
            def: [
                {
                    "id": "10274906096961615",
                    "linked_id": "10274364931002767",
                    "type": "filial",
                    "hover": "POLYGON((35.9534560522966 51.6468101845176,35.9535042918274 51.6468101845176,35.9535042918274 51.6467801957855,35.9534560522966 51.6467801957855,35.9534560522966 51.6468101845176))",
                    "text": "Продукты, магазин, ИП Костина Т.В."
                },
                {
                    "id": "10274906096961616",
                    "linked_id": "10274364931002814",
                    "type": "filial",
                    "hover": "POLYGON((35.957520030642 51.6518121723409,35.9575682701727 51.6518121723409,35.9575682701727 51.6517821869176,35.957520030642 51.6517821869176,35.957520030642 51.6518121723409))",
                    "text": "Лаванда, продуктовый магазин"
                },
                {
                    "id": "10274906096961624",
                    "linked_id": "10274364931054565",
                    "type": "filial",
                    "hover": "POLYGON((36.1231451145209 51.6455465157316,36.1231933540517 51.6455465157316,36.1231933540517 51.6455165261636,36.1231451145209 51.6455165261636,36.1231451145209 51.6455465157316))",
                    "text": "Закусочная, ИП Косинова Е.В."
                }
            ]
        };

        var result = demoPois.def;
        this._addPoisToTile(tileId, result);
    }
});
