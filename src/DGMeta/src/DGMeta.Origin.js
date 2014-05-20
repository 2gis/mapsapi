DG.Meta.Origin = DG.Class.extend({

    options: {
        subdomains: '012345679',
        dataFilter: null
    },

    _url: false,

    initialize: function (url, options) {
        this._url = url;
        this._requests = {};

        this._tileStorage = {};
        this._dataStorage = {};

        options = L.setOptions(this, options);

        if (typeof options.subdomains === 'string') {
            options.subdomains = options.subdomains.split('');
        }
    },

    getTileData: function (coord) {
        var key = this.getTileKey(coord),
            self = this;

        if (typeof this._tileStorage[key] === 'undefined' && typeof this._requests[key] === 'undefined') {
            this._tileStorage[key] = false;
            this._requests[key] = this._requestData(coord).then(function (data) {
                self.setTileData(coord, self.options.dataFilter ? self.options.dataFilter(data, coord) : data);
                delete self._requests[key];
            });
        }

        if (this._tileStorage[key].constructor === Object) {
            return Object.keys(this._tileStorage[key]).map(function (id) {
                return DG.extend({ geometry: this._tileStorage[key][id]}, this._dataStorage[id]);
            }, this);
        }

        return this._tileStorage[key];
    },

    setTileData: function (coord, data) {
        var key = this.getTileKey(coord);

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

    flush: function () {
        this._tileStorage = {};
        this._dataStorage = {};
        Object.keys(this._requests).forEach(function (id) {
            this[id].abort && this[id].abort();
        }, this._requests);
        return this;
    },

    setURL: function (url, flush) {
        this._url = url;
        if (flush) {
            this.flush();
        }
        return this;
    },

    getTileKey: function (coord) {
        return [coord.x, coord.y, coord.z].join(':');
    },

    _requestData: function (key) {
        if (this._url) {
            return this._performRequest(key);
        } else {
            return Promise.resolve([]);
        }
    },

    _performRequest: function (coords) { // (String) -> Promise
        var url = this._prepareURL(coords),
            request = DG.ajax(url, {
                type: 'get',
                dataType: 'json'
            });

        return request;
    },

    _prepareURL: function (coords) {
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
