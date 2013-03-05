/**
 * Leaflet DG Localization
 * The plugin to provide localization.
 *
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */
"use strict";

L.DG = L.DG || {};
L.DG.Localization = L.Class.extend({
    options:{
        position:'topleft',
        currentLang:"ru"
    },

    initialize:function (map) {
        this._map = map;
    },

    _:function (msg, n, templ) {
        var result,
            lang = this._map.locale.getLang();

        if(Object.prototype.toString.call(n) === '[object Number]') {
           result = this.Dictionary[lang][msg][n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
        } else {
            result = this.Dictionary[lang][msg];
        }

        if (templ){
            result = L.Util.template(result, templ);
        }
        return result ? result : msg;
    },

    setLang:function (lang) {
        if(lang){
            this._map.options.currentLang = lang;
            this._map.fire("langchange", {"lang":lang});
        }
    },

    getLang:function () {
        return this._map.options.currentLang;
    }
});

L.Map.mergeOptions({
    currentLang:"ru"
});

L.Map.addInitHook(function () {
    if (this.options.currentLang) {
        this.locale = new L.DG.Localization(this);
    }
});