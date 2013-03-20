/**
 * Leaflet DG Localization
 * The plugin to provide localization.
 *
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.Localization = L.Class.extend({

    initialize: function (map) {
        this._map = map;
    },

    t: function (msg, argument) { // (String) || (String, argument...)
        var result,
            lang = this._map.getLang();

        if (!this.Dictionary[lang]) {
            throw new Error('No provided current language  ' + lang);
        }

        if (argument) {
            result = this.Dictionary[lang][msg];

            if (Object.prototype.toString.call(argument) === '[object Number]') {
                var exp = this.Dictionary[lang].pluralRules(argument);
                result = this.Dictionary[lang][msg][exp];
                result = L.Util.template(result, {n: argument});
            }
            if (Object.prototype.toString.call(argument) === '[object Object]') {
                result = L.Util.template(result, argument);
            }
        }
        else {
            result = this.Dictionary[lang][msg];
        }
        return result ? result : msg;
    }

});

L.Map.mergeOptions({
    currentLang: "ru"
});

L.Map.include({

    setLang: function (lang) {
        if (lang) {
            this.options.currentLang = lang;
            this.fire("langchange", {"lang": lang});
        }
    },

    getLang: function () {
        return this.options.currentLang;
    }

});

L.Map.addInitHook(function () {
    if (this.options.currentLang) {
        this.locale = new L.DG.Localization(this);
    }
});