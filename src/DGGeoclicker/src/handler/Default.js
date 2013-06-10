L.DG.Geoclicker.Handler.Default = L.Class.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    initialize: function (controller, popup, map) { // (Object, Object, Object)
        this._popup = popup;
        this._controller = controller;
        this._map = map;
    },

    handle: function (results) { // (Object) -> Boolean
        this._popup.setContent(this.t("We haven't collected info about this place"));
        return true;
    }

});


L.DG.Geoclicker.Handler.HandlerExample = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results, type) { // (Object, String) -> Boolean
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