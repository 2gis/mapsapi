DG.Meta.TrafficStorage = DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    addDataToTile: function (tileId, tileData) { //(String, Array)
        this._tilesData[tileId] = this._tilesData[tileId] || [];

        var speeds = tileData[1].reduce(function (obj, item) {
            obj[item.graph_id] = item.speed_text;
            return obj;
        }, {});

        tileData[0].map(function (item) {
            if (speeds[item.graph_id]) {
                item.speed = speeds[item.graph_id];
            }
            item.id = item.graph_id;
            item.hover = item.geometry[0].object;
            return item;
        })
        .forEach(function (item) {
            var id = item.id,
                zoom = tileId.split(',')[2];

            this._tilesData[tileId].push(id);
            this._addEntity(id, item, zoom);
        }, this);

        return this.getTileData(tileId);
    },

    _addEntity: function (id, entity, zoom) { //(String, Object)
        var verts = this._wkt.read(entity.hover);
        entity.geometry = this._wkt.toObject(verts);
        entity = this._wktToVert(entity, zoom);

        this._data[id] = DG.extend(this._data[id] || {}, entity);
    }

});
