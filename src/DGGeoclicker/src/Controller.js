DG.Geoclicker.Controller = DG.Class.extend({

    options: {
        // if handler worked successfully, it should return rendering object that will be processed in View , otherwise it should return false
        // default handler always should return rendering object
        'handlersSequence': {
            'poi': DG.Geoclicker.Handler.Poi,
            'attraction': DG.Geoclicker.Handler.Sight,
            'building': DG.Geoclicker.Handler.House,
            'street': DG.Geoclicker.Handler.CityArea,
            'adm_div.place': DG.Geoclicker.Handler.CityArea,
            'adm_div.district': DG.Geoclicker.Handler.CityArea,
            'adm_div.division': DG.Geoclicker.Handler.CityArea,
            'adm_div.settlement': DG.Geoclicker.Handler.CityArea,
            'adm_div.city': DG.Geoclicker.Handler.CityArea,

            'default': DG.Geoclicker.Handler.Default,

            'apiError': DG.Geoclicker.Handler.ApiError

            // station_platform
            // project
            // station
            // crossbroad
            // metro
        }
    },

    initialize: function(map, options) { // (Object, Object)
        this._options = options;
        this._handlers = {};
        this._catalogApi = new DG.Geoclicker.Provider.CatalogApi(map);
        this._map = map;
        this._view = new DG.Geoclicker.View(map);

        this._renderHandlerResult = DG.bind(this._renderHandlerResult, this);
        this._lastHandleClickArguments = null;
    },

    handlePopupClose: function(popup) { // (Object)
        if (popup === this._view.getPopup()) {
            this._lastHandleClickArguments = null;
            this._catalogApi.cancelLastRequest();
        }
    },

    handleClick: function(latlng, zoom, meta) { // (Object, Number, Object)
        var self = this,
            args = Array.prototype.slice.call(arguments, 0);


        // Monitor geoclicker user usage statistics
        // TODO: remove after successful research
        if (typeof ga !== undefined) {
            // eslint-disable-next-line no-undef
            ga(DG.config.gaName + '.send', 'event', 'Geoclicker', 'Use');
        }

        function beforeRequest() {
            var loader = self._view.initLoader();
            self._view._popup.clear();
            self._view.showPopup(latlng, loader);
            self._lastHandleClickArguments = args;
        }

        if (meta && meta.linked && meta.linked.type != 'sight' && meta.linked.type != 'attraction') {
            if (meta.linked.type != 'branch' && meta.linked.type != 'building') {
                return;
            }

            beforeRequest();
            self.handleResponse({
                poi: {
                    reference: meta.linked
                }
            });
        } else {
            this._catalogApi.getLocations({
                latlng: latlng,
                zoom: zoom,
                beforeRequest: beforeRequest
            }).then(function(result) {
                self.handleResponse(result);
            }, function(error) {
                self.handleResponse(error);
            });
        }
    },

    handleResponse: function(result) { // (Object)
        var type;

        if (!result) {
            this._runHandler('default');
            return;
        }

        if (result === 'no type') {
            return;
        }

        if (result === 'aborted') {
            this._runHandler('apiError');
            return;
        }

        type = this.findHandler(result);

        while (type) {
            if (this._runHandler(type, result)) {
                return;
            }
            delete result[type];

            type = this.findHandler(result);
        }
        this._runHandler('default');
    },

    findHandler: function(result) { // (Object) -> String|Null
        for (var i in this.options.handlersSequence) {
            if (result[i]) {
                return i;
            }
        }

        return null;
    },

    getCatalogApi: function() { // () -> Object
        return this._catalogApi;
    },

    getMap: function() {
        return this._map;
    },

    reinvokeHandler: function() {
        if (this._lastHandleClickArguments) {
            this.handleClick.apply(this, this._lastHandleClickArguments);
        }
    },

    _runHandler: function(type, data) { // (String, Object) -> Boolean
        data = data || {};
        this._initHandlerOnce(type);
        this._handlers[type].addClickEvent();

        var handlerResult = this._handlers[type].handle(data, type);

        return handlerResult && handlerResult.then ?
            handlerResult.then(this._renderHandlerResult) :
            handlerResult;
    },

    _renderHandlerResult: function(result) {
        this._view.renderPopup(result);
    },

    _initHandlerOnce: function(type) { // (String)
        if (!this._handlers[type]) {
            this._handlers[type] = new this.options.handlersSequence[type](this, this._view, this._map, this._options);
        }
    }
});
