L.DG.Meta.PoiStorage = L.DG.Meta.Storage.extend({

    _addEntity: function (id, entity) { //(String, Object)
        var randomEntityLink = entity.links[Math.floor(Math.random() * entity.links.length)];

        entity.linked = {};
        for (var prop in randomEntityLink) {
            if (randomEntityLink.hasOwnProperty(prop)) {
                entity.linked[prop] = randomEntityLink[prop];
            }
        }

        entity.links.length = 0;
        delete entity.links;

        entity = this._wktToVert(entity);

        this._data[id] = entity;
    }

});
