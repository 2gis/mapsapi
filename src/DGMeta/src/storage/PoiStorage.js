DG.Meta.PoiStorage = DG.Meta.Storage.extend({

    _data: {},
    _tilesData: {},

    _addEntity: function (id, entity, zoom) { //(String, Object, String)
        entity.linked = entity.links[Math.floor(Math.random() * entity.links.length)];
        delete entity.links;

        entity = this._formatWKT(entity, zoom, 'bound');

        this._data[id] = DG.extend(this._data[id] || {}, entity);
    }

});
