L.DG.Meta.BuildingStorage = L.DG.Meta.Storage.extend({

	_addEntity: function (id, entity) { //(String, Object)
        entity.geometry = this._wkt.toObject(this._wkt.read(entity.hover));
        delete entity.hover;
        this._data[id] = entity;
    }

});
