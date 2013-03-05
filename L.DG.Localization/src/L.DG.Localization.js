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

    _:function (msg) { // (String) || (String, args...)
        var result,
            tmpl,
            lang = this._map.locale.getLang(),
            args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;

        if (args) {
            result = this.Dictionary[lang][msg];
            for (var i = 0, len = args.length; i < len; i++) {
                if (Object.prototype.toString.call(args[i]) === '[object Number]') {
                    var n = args[i];
                    result = this.Dictionary[lang][msg][n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
                }
                if (Object.prototype.toString.call(args[i]) === '[object Object]') {
                    tmpl = args[i];
                }
            }
            result = tmpl ? L.Util.template(result, tmpl) : result;
        } else {
            result = this.Dictionary[lang][msg];
        }

        return result ? result : msg;
    },

    setLang:function (lang) {
        if (lang) {
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