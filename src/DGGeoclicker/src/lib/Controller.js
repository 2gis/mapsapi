/**
 *
 *
 */


L.DG.Geoclicker.Controller = L.Class.extend({

    options: {
        // if handler worked successfully, it should return true
        // default handler always should return true
        handlersSequense: {

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

        this._createPopup(lat, lng);
        this._popup.showLoader();
        this._geoCoder.getLocations(lat, lng, zoom, callback);

    },

    _handleResponse: function (result) {


        var type, handler;

        this._popup.hideLoader();

        if (!result) {
            this.options.handlersSequense.default(this._popup, this._map);
            return;
        }

        while (type = this._selectHandler(result)) {
            console.log('while')
            handler = this.options.handlersSequense[type];
            if (handler(result[type], this._popup, this._map, type, result)) {
                return;
            } else {
                delete result[type];
            }
        }

        this.options.handlersSequense.default(this._popup, this._map);
    },

    _selectHandler: function (result) {
        var i;
        for (i in this.options.handlersSequense) {
            if (result[i]) {
                return i;
            }
        }
        console.log('_selectHandler, NOT found')
    },

    _showLoader: function () {
        var i = 1;

        this._loaderTimer = setInterval(L.bind(function () {
            var str = 'loading.';
            if (i > 1) {
                str += i > 2 ? '..' : '.';
            }
            this._popup.setContent(str);
            i = i > 2 ? 1 : i + 1;

        }, this), 400);
    },

    _hideLoader: function () {
        clearInterval(this._loaderTimer);
    },


    _createPopup: function (lat, lng) {
        this._popup = L.popup()
            .setLatLng([lat, lng])
            .openOn(this._map);

        this._popup.hideLoader = L.bind(this._hideLoader, this);
        this._popup.showLoader = L.bind(this._showLoader, this);
    }

})
;


