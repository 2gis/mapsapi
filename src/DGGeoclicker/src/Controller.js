L.DG.Geoclicker.Controller = L.Class.extend({

    options: {
        // if handler worked successfully, it should return rendering object that will be processed in View , otherwise it should return false
        // default handler always should return rendering object
        "handlersSequence": {

            "house": L.DG.Geoclicker.Handler.House,

            "district": L.DG.Geoclicker.Handler.HandlerExample,
            "city": L.DG.Geoclicker.Handler.HandlerExample,

            "default": L.DG.Geoclicker.Handler.Default
//            station_platform
//
//            street
//            district
//            project
//            house
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

    handleClick: function (latlng, zoom) { // (Object, Number)
        var callback = L.bind(this.handleResponse, this),
            self = this;

        this._catalogApi.getLocations({
            latlng: latlng,
            zoom: zoom,
            callback: callback,
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


