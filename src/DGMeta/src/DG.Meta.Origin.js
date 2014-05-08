DG.Meta.Origin = DG.Class.extend({
    
    options : {
        subdomains : 'abc',
        dataFilter : null
    },

    _url : false,

    initialize: function (url, options) {
        this._url = url;
        this._storage = {};

        options = L.setOptions(this, options);

        if (typeof options.subdomains === 'string') {
            options.subdomains = options.subdomains.split('');
        }
    },

    get: function (coord) {
        var key = [coord.x, coord.y, coord.z].join(':'),
            self = this;

        if (DG.Util.isArray(this._storage[key])) {
            return this._storage[key];
        }

        if (typeof this._storage[key] === 'undefined') {
            this._storage[key] = this._requestData(coord).then(function (data) {
                self._storage[key] = self.options.dataFilter ? self.options.dataFilter(data, coord) : data;
            });
        }
        return false;
    },

    flush: function () {
        this._storage = {};
    },

    setURL: function (url) {
        this._url = url;
    },

    _requestData: function (key) {
        if (this._url) {
            return this._performRequest(key);
        } else {
            return DG.when([]);
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
            x : coords.x,
            y : coords.y,
            z : coords.z,
            s : this._getSubdomain(coords)
        });
    },

    _getSubdomain: DG.TileLayer.prototype._getSubdomain

});

DG.Meta.origin = function (source, options) {
    if (source instanceof DG.Meta.Origin) {
        return source;
    }
    return new DG.Meta.Origin(source, options);
};