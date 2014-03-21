DG.Meta.TrafficStorage = DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    addDataToTile: function (tileId, tileData) { //(String, Array)
        this._tilesData[tileId] = this._tilesData[tileId] || [];

        var speeds = tileData[1].reduce(function (obj, item) {
            obj[item.graph_id] = item.speed_text;
            return obj;
        }, {});

        var entitys = tileData[0].map(function (item) {
            if (speeds[item.graph_id]) {
                item.speed = speeds[item.graph_id];
            }
            return item;
        });

        // console.log(DG.extend(obj1, obj2));
        console.log(entitys);

        // for (var i = 0, len = tileData.length; i < len; i++) {
        //     var id = tileData[i].id,
        //         zoom = tileId.split(',')[2];

        //     this._tilesData[tileId].push(id);
        //     this._addEntity(id, tileData[i], zoom);
        // }
    },

    _addEntity: function (id, results) { //(String, Object)
        // console.log(results);
        var geometry = results
            .map(function (obj) {
                return this._wkt.read(obj.geometry[0].object[0]);
            }, this)
            .map(function (verts) {
                return this._wkt.toObject(verts);
            }, this)
            .map(function (layer) {
                return layer._latlngs;
            }, this);

        // console.log(geometry);
        // var verts = this._wkt.read(entity.hover);
        // entity.geometry = this._wkt.toObject(verts);

        // if (entity.geometry instanceof DG.Path) {
        //     entity.vertices = entity.geometry._latlngs;
        // } else {
        //     entity.verticesArray = [];
        //     entity.geometry.eachLayer(function (layer) {
        //         entity.verticesArray.push(layer._latlngs);
        //     });
        // }

        // delete entity.hover;
        // this._data[id] = entity;
    }

});
