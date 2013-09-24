L.DG.Meta.BuildingStorage = L.DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    _addEntity: function (id, entity) { //(String, Object)
        var verts = this._wkt.read(entity.hover);
        entity.geometry = this._wkt.toObject(verts);

        if (entity.geometry instanceof L.Path) {
            entity.vertices = entity.geometry._latlngs;
        } else {
            entity.verticesArray = [];
            entity.geometry.eachLayer(function (layer) {
                entity.verticesArray.push(layer._latlngs);
            });
        }

        delete entity.hover;
        this._data[id] = entity;
    }

});
