DG.Meta.Storage = DG.Class.extend({

    _data: {},
    _tilesData: {},
    _wkt: new DG.Wkt(),

    getTileData: function (tileId) { //(String) -> Array|false
        if (!this._tilesData.hasOwnProperty(tileId)) { return false; }

        return this._tilesData[tileId]
            .map(function (id) {
                return this._data[id];
            }, this);
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

        return this.getTileData(tileId);
    },

    _addEntity: function (id, entity) { //(String, Object)
        this._data[id] = entity;
    },

    _formatWKT: function (entity, zoom, type) { //(Object)
        var key = (zoom ? zoom : '') + type;

        entity[key] = (type === 'bound') ? DG.geoJsonLayer(entity.hover).getBounds() : DG.readWKT(entity.hover);
        delete entity.hover;

        return entity;
    }

});
