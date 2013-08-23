L.DG.Geoclicker.Controller = L.Class.extend({

    options: {
        // if handler worked successfully, it should return rendering object that will be processed in View , otherwise it should return false
        // default handler always should return rendering object
        "handlersSequence": {

            "house": L.DG.Geoclicker.Handler.House,

            "street": L.DG.Geoclicker.Handler.CityArea,
            "district": L.DG.Geoclicker.Handler.CityArea,
            "city": L.DG.Geoclicker.Handler.CityArea,

            "default": L.DG.Geoclicker.Handler.Default

//            station_platform
//            project
//            sight
//            place
//            station
//            crossbroad
//            metro
        }
    },

    initialize: function (map) { // (Object)
        this._handlers = {};
        this._catalogApi = new L.DG.Geoclicker.Provider.CatalogApi(map);
        this._map = map;
        this._view = new L.DG.Geoclicker.View(map);
    },

    handlePopupClose: function (popup) { // (Object)
        if (popup == this._view.getPopup()) {
            this._catalogApi.cancelLastRequest();
        }
    },

    handleClick: function (latlng, zoom, extra) { // (Object, Number)
        var self = this;

        this._catalogApi.getLocations({
            latlng: latlng,
            zoom: zoom,
            callback: function(){
                extra = 'extra';
                Array.prototype.push.call(arguments, extra);
                self.handleResponse.apply(self, arguments);
            },
            showLoaderAndPopup: function() {
                self._view.showLoader();
                self._view.showPopup(latlng);
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
        if (result.error && result.error == 'no type') {
            return;
        }
        while (type = this.findHandler(result)) {
            if (this._runHandler(type, result)) {
                return;
            }
            delete result[type];
        }

        this._runHandler('default');
    },

    findHandler: function (result) { // (Object) -> String|Null
        var i;

        for (i in this.options.handlersSequence) {
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

    _runHandler: function(type, data) { // (String, Object) -> Boolean
        data = data || {};
        this._ensureHandlerIsInit(type);
        var result = this._handlers[type].handle(data, type);
        if (result) {
            this._view.renderPopup(result);
            return true;
        }

        return false;
    },

    _ensureHandlerIsInit: function (type) { // (String)
        if (!this._handlers[type]) {
            this._handlers[type] = new this.options.handlersSequence[type](this, this._view, this._map);
        }
    }

});
