DG.Meta.Origin = DG.Class.extend({

    options: {
        subdomains: '0123',
        dataFilter: null
    },

    _url: false,

    initialize: function(url, options) { // (String, Object)
        this._url = url;
        this._requests = {};

        this._tileStorage = {};

        options = DG.setOptions(this, options);

        if (typeof options.subdomains === 'string') {
            options.subdomains = options.subdomains.split('');
        }
    },

    getTileData: function(coord) { // (Object) -> Object
        var tileKey = this.getTileKey(coord),
            self = this;
        return new Promise(function(resolve) {
            if (typeof self._tileStorage[tileKey] === 'undefined' && typeof self._requests[tileKey] === 'undefined') {
                self._tileStorage[tileKey] = false;
                self._requests[tileKey] = self._requestData(coord).then(function(data) {
                    self.setTileData(tileKey, self.options.dataFilter ? self.options.dataFilter(data, coord) : data);
                    delete self._requests[tileKey];

                    resolve(self._tileStorage[tileKey]);
                });
                return;
            }

            resolve(self._tileStorage[tileKey]);
        });
    },

    setTileData: function(key, data) { // (Object/String, Object) -> Object
        if (typeof key !== 'string') {
            key = this.getTileKey(key);
        }

        data.forEach(function(entity) {
            if (entity.geometry.constructor !== Object) {
                entity.geometry = DG.Wkt.toGeoJSON(entity.geometry);
            }
            if (!this._tileStorage[key]) {
                this._tileStorage[key] = [];
            }
            this._tileStorage[key].push(entity);
        }, this);

        return this;
    },

    flush: function() { // () -> Object
        this._tileStorage = {};
        Object.keys(this._requests).forEach(function(tileKey) {
            if (this[tileKey].abort) {
                this[tileKey].abort();
            }
        }, this._requests);

        return this;
    },

    setURL: function(url, flush) { // (String, Boolean) -> Object
        this._url = url;
        if (flush) {
            this.flush();
        }

        return this;
    },

    getTileKey: function(coord) { // (Object)-> String
        return [coord.x, coord.y, coord.z, coord.key].join(':');
    },

    _requestData: function(key) { // (String)
        if (this._url) {
            return this._performRequest(key);
        } else {
            return Promise.resolve([]);
        }
    },

    _performRequest: function(coords) { // (Object) -> Promise
        return DG.ajax(this._prepareURL(coords), {
            type: 'get',
            dataType: 'json'
        });
    },

    _prepareURL: function(coords) { // (Object) -> String
        return DG.Util.template(this._url, {
            x: coords.x,
            y: coords.y,
            z: coords.z,
            s: this._getSubdomain(coords)
        });
    },

    _getSubdomain: DG.TileLayer.prototype._getSubdomain

});

DG.Meta.origin = function(source, options) {
    return new DG.Meta.Origin(source, options);
};
