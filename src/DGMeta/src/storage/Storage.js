L.DG.Meta.Storage = L.Class.extend({

    _data: {},
    _tilesData: {},
    _wkt: new L.DG.Wkt(),

    getTileData: function (tileId) { //(String) -> Array|false
        if (!this._tilesData.hasOwnProperty(tileId)) {
            return false;
        }
        for (var result = [], i = 0, len = this._tilesData[tileId].length; i < len; i++) {
            result.push(this._data[this._tilesData[tileId][i]]);
        }

        return result;
    },

    addDataToTile: function (tileId, tileData) { //(String, Array)
        if (!this._tilesData[tileId]) {
            this._tilesData[tileId] = [];
        }

        for (var i = 0, len = tileData.length; i < len; i++) {
            var id = tileData[i].id,
                zoom = tileId.split(',')[2];

            this._tilesData[tileId].push(id);
            this._addEntity(id, tileData[i], zoom);
        }
    },

    _addEntity: function (id, entity) { //(String, Object)
        this._data[id] = entity;
    },

    _wktToVert: function (entity, zoom) { //(Object)
        var vert = this._wkt.read(entity.hover),
            key = zoom ? zoom + 'vertices' : 'vertices';

        entity[key] = this._wkt.toObject(vert)._latlngs;
        delete entity.hover;

        return entity;
    }

});
