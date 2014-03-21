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
            item.geometry = item.geometry[0].object;
            return item;
        })
        .forEach(function (item) {
            var id = item.graph_id;

            this._tilesData[tileId].push(id);
            this._addEntity(id, item);
        }, this);
    },

    _addEntity: function (id, entity) { //(String, Object)
        var verts = this._wkt.read(entity.geometry);
        entity.geometry = this._wkt.toObject(verts);

        if (entity.geometry instanceof DG.Path) {
            entity.vertices = entity.geometry._latlngs;
        } else {
            entity.verticesArray = [];
            entity.geometry.eachLayer(function (layer) {
                entity.verticesArray.push(layer._latlngs);
            });
        }
        
        this._data[id] = entity;
    }

    // _addEntity: function (id, results) { //(String, Object)
    //     // console.log(results);
    //     var geometry = results
    //         .map(function (obj) {
    //             return this._wkt.read(obj.geometry[0].object[0]);
    //         }, this)
    //         .map(function (verts) {
    //             return this._wkt.toObject(verts);
    //         }, this)
    //         .map(function (layer) {
    //             return layer._latlngs;
    //         }, this);

    //     // console.log(geometry);
    //     // var verts = this._wkt.read(entity.hover);
    //     // entity.geometry = this._wkt.toObject(verts);

    //     // if (entity.geometry instanceof DG.Path) {
    //     //     entity.vertices = entity.geometry._latlngs;
    //     // } else {
    //     //     entity.verticesArray = [];
    //     //     entity.geometry.eachLayer(function (layer) {
    //     //         entity.verticesArray.push(layer._latlngs);
    //     //     });
    //     // }

    //     // delete entity.hover;
    //     // this._data[id] = entity;
    // }

});
