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

            'default': DG.Geoclicker.Handler.Default

//            station_platform
//            project
//            station
//            crossbroad
//            metro
        }
    },

    initialize: function (map, options) { // (Object, Object)
        this._options = options;
        this._handlers = {};
        this._catalogApi = new DG.Geoclicker.Provider.CatalogApi(map);
        this._map = map;
        this._view = new DG.Geoclicker.View(map);

        this._renderHandlerResult = DG.bind(this._renderHandlerResult, this);
        this._lastHandleClickArguments = null;
    },

    handlePopupClose: function (popup) { // (Object)
        if (popup === this._view.getPopup()) {
            this._lastHandleClickArguments = null;
            this._catalogApi.cancelLastRequest();
        }
    },

    handleClick: function (latlng, zoom) { // (Object, Number)
        var self = this,
            args = Array.prototype.slice.call(arguments, 0);

        this._catalogApi.getLocations({
            latlng: latlng,
            zoom: zoom,
            callback: function (result) {
                self.handleResponse(result);
            },
            beforeRequest: function () {
                var loader = self._view.initLoader();
                self._view._popup.clear();
                self._view.showPopup(latlng, loader);
                self._lastHandleClickArguments = args;
            }
        });
    },

    handleResponse: function (result) { // (Object)
        var type;

        this._view.hideLoader();

        if (!result) {
            this._runHandler('default');
            return;
        }
        if (result.error && result.error === 'no type') {
            return;
        }
        while (type = this.findHandler(result)) { // jshint ignore:line
            if (this._runHandler(type, result)) {
                return;
            }
            delete result[type];
        }
        this._runHandler('default');
    },

    findHandler: function (result) { // (Object) -> String|Null
        for (var i in this.options.handlersSequence) {
            if (result[i]) {
                return i;
            }
        }

        return null;
    },

    getCatalogApi: function () { // () -> Object
        return this._catalogApi;
    },

    getMap: function () {
        return this._map;
    },

    reinvokeHandler: function () {
        if (this._lastHandleClickArguments) {
            this.handleClick.apply(this, this._lastHandleClickArguments);
        }
    },

    _runHandler: function (type, data) { // (String, Object) -> Boolean
        data = data || {};
        this._initHandlerOnce(type);
        this._handlers[type].addClickEvent();

        var handlerResult = this._handlers[type].handle(data, type);

        return handlerResult ? handlerResult.then(this._renderHandlerResult) : false;
    },

    _renderHandlerResult: function (result) {
        this._view.renderPopup(result);
    },

    _initHandlerOnce: function (type) { // (String)
        if (!this._handlers[type]) {
            this._handlers[type] = new this.options.handlersSequence[type](this, this._view, this._map, this._options);
        }
    }
});
