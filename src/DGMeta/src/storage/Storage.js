L.DG.Meta.Storage = L.Class.extend({

    _data: {},
    _tilesData: {},
    _wkt: new L.DG.Wkt(),

    getEntity: function (id) { //(String) -> Object|Null
        return this._data[id] || null;
    },

    getTileDataIds: function (tileId) { //(String) -> Promise
        return this._tilesData.hasOwnProperty(tileId) ? this._tilesData[tileId] : false;
    },

    getTileData: function (tileId) { //(String) -> Promise
        return this._tilesData.hasOwnProperty(tileId) ? this._tilesData[tileId] : false;
    },

    addDataToTile: function (tileId, tileData) { //(String, Array)
        if (!this._tilesData[tileId]) {
            this._tilesData[tileId] = [];
        }

        for (var i = 0, len = tileData.length; i < len; i++) {
            var id = tileData[i].id;

            this._tilesData[tileId].push(id);
            this._addEntity(id, tileData[i]);
        }
    },

    _addEntity: function (id, entity) { //(String, Object)
        this._data[id] = entity;
    },

    _wktToVert: function (entity) { //(Object)
        var vert = this._wkt.read(entity.hover);
        entity.vertices = this._wkt.toObject(vert)._latlngs;
        delete entity.hover;

        return entity;
    }

});
