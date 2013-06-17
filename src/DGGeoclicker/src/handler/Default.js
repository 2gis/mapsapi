L.DG.Geoclicker.Handler.Default = L.Class.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    initialize: function (controller, view, map) { // (Object, Object, Object)
        this._controller = controller;
        this._view = view;
        this._map = map;
    },

    handle: function () {
        return {
            tmpl: this.t("We haven't collected info about this place")
        };
    }

});


L.DG.Geoclicker.Handler.HandlerExample = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results, type) { // (Object, String) -> Object|Boolean
        return {
            tmpl: type + ':<br/>' + results[type].id
        };
    }
});