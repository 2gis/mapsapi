/**
 *
 *
 */


L.DG.Geoclicker.Controller = L.Class.extend({

    options: {
        // if handler worked successfully, it should return true
        // default handler always should return true
        handlersSequence: {

            house: L.DG.Geoclicker.Handlers.House,

            district: L.DG.Geoclicker.Handlers.HandlerExample,
            city: L.DG.Geoclicker.Handlers.HandlerExample,

            default: L.DG.Geoclicker.Handlers.Default
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

    initialize: function (map) {
        this._webApi = new L.DG.Geoclicker.WebApi(map);
        this._geoCoder = new L.DG.Geoclicker.GeoCoder(this._webApi);
        this._map = map;

        this._initPopup();

        this._handlers = {};
    },

    _initPopup: function () {

        this._popup = L.popup();
        this._popup.hideLoader = L.bind(this._hideLoader, this);
        this._popup.showLoader = L.bind(this._showLoader, this);

        this._map.on('popupclose', function (e) {
            if (e.popup == this._popup) {
                this._handlePopupClose();
            }
        }, this)

    },

    _handlePopupClose: function () {
        this._webApi.cancelLastRequest();
    },

    handleClick: function (latlng, zoom) {

        var callback = L.bind(this._handleResponse, this);

        this._showPopup(latlng);
        this._popup.showLoader();
        this._geoCoder.getLocations(latlng, zoom, callback);

    },

    _handleResponse: function (result) {

        var type, handler;

        this._popup.hideLoader();

        if (!result) {
            this._ensureHandlerIsInit('default');
            this._handlers.default.handle();
            return;
        }

        while (type = this._findHandler(result)) {
            this._ensureHandlerIsInit(type);
            handler = this._handlers[type];
            if (handler.handle(result, type)) {
                return;
            } else {
                delete result[type];
            }
        }

        this._ensureHandlerIsInit('default');
        this._handlers.default.handle();
    },

    _findHandler: function (result) {
        var i;
        for (i in this.options.handlersSequence) {

            if (result[i]) {
                return i;
            }
        }
    },

    _ensureHandlerIsInit: function (type) {
        if (!this._handlers[type]) {
            this._handlers[type] = new this.options.handlersSequence[type](this, this._popup, this._map);
        }
    },

    _showLoader: function () {

        this._hideLoader();
        //@todo should this function be moved to kind of Geoclicker View?
        var i = 1,
            popup = this._popup;

        function showLoader() {
            //@todo this is temporary loader, should be replaced by original
            var str = 'loading.';
            if (i > 1) {
                str += i > 2 ? '..' : '.';
            }
            popup.setContent(str);
            i = i > 2 ? 1 : i + 1;
        }

        this._loaderTimer = setInterval(showLoader, 400);
        showLoader();
    },

    _hideLoader: function () {
        clearInterval(this._loaderTimer);
    },


    _showPopup: function (latlng) {

        this._popup.setLatLng(latlng)
            .openOn(this._map);
    }

})
;


