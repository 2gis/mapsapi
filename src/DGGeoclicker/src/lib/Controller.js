/**
 *
 *
 */


L.DG.Geoclicker.Controller = L.Class.extend({

    options: {
        // if handler worked successfully, it should return true
        // default handler always should return true
        handlersSequence: {

            house: L.DG.Geoclicker.Handlers.handlerExample,
            district: L.DG.Geoclicker.Handlers.handlerExample,
            city: L.DG.Geoclicker.Handlers.handlerExample,

            default: L.DG.Geoclicker.Handlers.default
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
        this._geoCoder = new L.DG.Geoclicker.GeoCoder();
        this._map = map;
    },

    handle: function (lat, lng, zoom) {

        var callback = L.bind(this._handleResponse, this);

        this._showPopup(lat, lng);
        this._popup.showLoader();
        this._geoCoder.getLocations(lat, lng, zoom, callback);

    },

    _handleResponse: function (result) {

        var type, handler;

        this._popup.hideLoader();

        if (!result) {
            this.options.handlersSequence.default(this._popup, this._map);
            return;
        }

        while (type = this._findHandler(result)) {

            handler = this.options.handlersSequence[type];
            if (handler(result, type, this._popup, this._map)) {
                return;
            } else {
                delete result[type];
            }
        }

        this.options.handlersSequence.default(this._popup, this._map);
    },

    _findHandler: function (result) {
        var i;
        for (i in this.options.handlersSequence) {
            if (result[i]) {
                return i;
            }
        }
    },

    _showLoader: function () {
        //@todo should this function be moved to GeoClicker View?
        var i = 1,
            popup = this._popup;

        function showLoader() {
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


    _showPopup: function (lat, lng) {

        if (!this._popup) {
            this._popup = L.popup();
            this._popup.hideLoader = L.bind(this._hideLoader, this);
            this._popup.showLoader = L.bind(this._showLoader, this);
        }

        this._popup.setLatLng([lat, lng])
            .openOn(this._map);
    }

})
;


