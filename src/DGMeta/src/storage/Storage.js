DG.Meta.Storage = DG.Class.extend({

    _data: {},
    _tilesData: {},

    getTileData: function (tileId) { //(String) -> Array|false
        if (!this._tilesData.hasOwnProperty(tileId)) { return false; }

        return this._tilesData[tileId]
            .map(function (id) {
                return this._data[id];
            }, this);
    },

    addDataToTile: function (tileId, tileData) { //(String, Array)
        this._tilesData[tileId] = [].concat(this._tilesData[tileId] || [],
            tileData.map(function (data) {
                var id = data.id,
                    zoom = tileId.split(',')[2];

                this._addEntity(id, data, zoom);
                return id;
            }, this)
        );

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
