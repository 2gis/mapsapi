DG.Meta.Origin = DG.Class.extend({

    options: {
        subdomains: '0123',
        dataFilter: null
    },

    _url: false,

    initialize: function (url, options) { // (String, Object)
        this._url = url;
        this._requests = {};

        this._tileStorage = {};
        this._dataStorage = {};

        options = DG.setOptions(this, options);

        if (typeof options.subdomains === 'string') {
            options.subdomains = options.subdomains.split('');
        }
    },

    getTileData: function (coord) { // (Object) -> Object
        var tileKey = this.getTileKey(coord),
            self = this;

        if (typeof this._tileStorage[tileKey] === 'undefined' && typeof this._requests[tileKey] === 'undefined') {
            this._tileStorage[tileKey] = false;
            this._requests[tileKey] = this._requestData(coord).then(function (data) {
                self.setTileData(tileKey, self.options.dataFilter ? self.options.dataFilter(data, coord) : data);
                delete self._requests[tileKey];
            });
        }

        if (this._tileStorage[tileKey].constructor === Object) {
            return Object.keys(this._tileStorage[tileKey]).map(function (id) {
                return DG.extend({geometry: this._tileStorage[tileKey][id]}, this._dataStorage[id]);
            }, this);
        }

        return this._tileStorage[tileKey];
    },

    setTileData: function (key, data) { // (Object/String, Object) -> Object
        if (typeof key !== 'string') {
            key = this.getTileKey(key);
        }

        data.forEach(function (entity) {
            if (entity.geometry.constructor !== Object) {
                entity.geometry = DG.Wkt.toGeoJSON(entity.geometry);
            }
            if (!this._tileStorage[key]) {
                this._tileStorage[key] = {};
            }
            this._tileStorage[key][entity.id] = entity.geometry;
            delete entity.geometry;
            this._dataStorage[entity.id] = entity;
        }, this);

        return this;
    },

    flush: function () { // () -> Object
        this._tileStorage = {};
        this._dataStorage = {};
        Object.keys(this._requests).forEach(function (tileKey) {
            if (this[tileKey].abort) {
                this[tileKey].abort();
            }
        }, this._requests);

        return this;
    },

    setURL: function (url, flush) { // (String, Boolean) -> Object
        this._url = url;
        if (flush) {
            this.flush();
        }

        return this;
    },

    getTileKey: function (coord) { // (Object)-> String
        return [coord.x, coord.y, coord.z, coord.key].join(':');
    },

    _requestData: function (key) { // (String)
        if (this._url) {
            return this._performRequest(key);
        } else {
            return Promise.resolve([]);
        }
    },

    _performRequest: function (coords) { // (Object) -> Promise
        return DG.ajax(this._prepareURL(coords), {
            type: 'get',
            dataType: 'json'
        });
    },

    _prepareURL: function (coords) { // (Object) -> String
        return DG.Util.template(this._url, {
            x: coords.x,
            y: coords.y,
            z: coords.z,
            s: this._getSubdomain(coords)
        });
    },

    _getSubdomain: DG.TileLayer.prototype._getSubdomain

});

DG.Meta.origin = function (source, options) {
    return new DG.Meta.Origin(source, options);
};
