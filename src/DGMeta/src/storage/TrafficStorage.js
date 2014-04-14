DG.Meta.TrafficStorage = DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    addDataToTile: function (tileId, tileData) { //(String, Array)
        if (!tileData.length) { return []; }

        var speeds = tileData[1].reduce(function (obj, item) {
            obj[item.graph_id] = item.speed_text;
            return obj;
        }, {});

        this._tilesData[tileId] = [].concat(this._tilesData[tileId] || [],
            tileData[0]
                .filter(function (item) {
                    return speeds[item.graph_id];
                })
                .map(function (item) {
                    return {
                        'hover': item.geometry[0].object,
                        'speed': speeds[item.graph_id],
                        'id': item.graph_id
                    };
                })
                .map(function (item) {
                    var id = item.id,
                        zoom = tileId.split(',')[2];

                    this._addEntity(id, item, zoom);
                    return id;
                }, this)
        );

        return this.getTileData(tileId);
    },

    _addEntity: function (id, entity, zoom) { //(String, Object)
        entity.geometry = DG.geoJsonLayer(entity.hover);
        entity = this._formatWKT(entity, zoom, 'vertices');

        this._data[id] = DG.extend(this._data[id] || {}, entity);
    }

});
