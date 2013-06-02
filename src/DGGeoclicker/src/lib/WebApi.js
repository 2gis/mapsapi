L.DG.Geoclicker.WebApi = L.Class.extend({

    options: {
        urlGeo: '__WEB_API_SERVER__/geo/search',
        urlAdvanced: '__WEB_API_SERVER__/advanced',
        data: {
            key: '__WEB_API_KEY__',
            key: 'ruxlih0718',
            version: '__WEB_API_VERSION__',
            lang: '__DEFAULT_LANG__', //@todo add i18n support
            output: 'jsonp'
        },

        timeoutMs: 5000
    },

    geoSearch: function (q, types, zoomlevel, callback) {
        var params = {
            q: q,
            types: types,
            zoomlevel: zoomlevel
        };

        this.cancelLastRequest();

        this._performRequest(params, this.options.urlGeo, callback, function () {
            callback()
        });
    },

    firmsInHouse: function (houseId, callback, page) {

        page = page || 1;
        var params = L.extend(this.options.data, {
            criteria: JSON.stringify({//@todo use cross-browser JSON.stringify
                what: {
                    id: houseId,
                    type: "house"
                },
                types: ["firm"],
                sort: "relevance",
                page: page
            })
        });

        this.cancelLastRequest();

        function responseHandler(res) {
            if (res && res.response_code == 200 && res.results && res.results.firm && res.results.firm.results && res.results.firm.results.length) {
                callback(res.results.firm.results)
            } else {
                callback();
            }
        }

        this._performRequest(params, this.options.urlAdvanced, responseHandler, responseHandler);
    },

    _performRequest: function (params, url, callback, failback) {
        var source = this.options.data,
            data = L.extend({
                key: source.key,
                version: source.version,
                lang: source.lang,
                output: source.output
            }, params);

        this._lastRequest = L.DG.Jsonp({
            url: url,
            data: data,
            timeout: this.options.timeoutMs,
            success: callback,
            error: failback
        })
    },

    cancelLastRequest: function () {
        if (this._lastRequest) {
            this._lastRequest.cancel();
        }
    }
});