/**
 *
 *
 */

L.DG.Geoclicker.Handlers = {};

L.DG.Geoclicker.Handlers.Default = L.Class.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {
            ru: {"We haven't collected info about this place": 'Мы ещё не собрали информацию об этом месте'},
            it: {"We haven't collected info about this place": 'Non disponiamo ancora di informazioni su questo posto'}
        }
    },

    initialize: function (controller, popup, map) {
        this._popup = popup;
        this._controller = controller;
        this._map = map;
    },

    handle: function (results) {
        this._popup.setContent(this.t("We haven't collected info about this place"));
        return true;
    }

});


L.DG.Geoclicker.Handlers.HandlerExample = L.DG.Geoclicker.Handlers.Default.extend({

    handle: function (results, type) {
        this._popup.setContent(type + ':<br/>' + results[type].id);
        return true;
    }
});
/*
 station_platform
 city
 street
 district
 project
 house
 sight
 place
 station
 crossbroad
 metro
 */