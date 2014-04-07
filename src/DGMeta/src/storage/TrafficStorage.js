DG.Meta.TrafficStorage = DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    addDataToTile: function (tileId, tileData) { //(String, Array)
        this._tilesData[tileId] = this._tilesData[tileId] || [];

        if (!tileData.length) { return []; }

        var speeds = tileData[1].reduce(function (obj, item) {
            obj[item.graph_id] = item.speed_text;
            return obj;
        }, {});

        tileData[0]
            .map(function (item) {
                if (!speeds[item.graph_id]) { return; }

                item.speed = speeds[item.graph_id];
                item.id = item.graph_id;
                item.hover = item.geometry[0].object;
                delete item.geometry;
                return item;
            })
            .filter(Boolean)
            .forEach(function (item) {
                var id = item.id,
                    zoom = tileId.split(',')[2];

                this._tilesData[tileId].push(id);
                this._addEntity(id, item, zoom);
            }, this);
        // console.log(tileId, tileData);

        return this.getTileData(tileId);
    },

    _addEntity: function (id, entity, zoom) { //(String, Object)
        entity.geometry = DG.geoJsonLayer(entity.hover);
        entity = this._formatWKT(entity, zoom, 'vertices');

        this._data[id] = DG.extend(this._data[id] || {}, entity);
    }

});
