/**
 * Provides a localization functionality for another plugins
 */
L.DG.Locale = {
    /**
     * @param {String} msg
     * @param {Number} argument
     * @return {String}
     */
    t: function (msg, argument) {
        var result,
            lang = this._map.getLang(),
            langIsset = false;

        if(typeof this.constructor.Dictionary[lang] !== 'undefined') {
            langIsset = true;
        }

        result = langIsset ? this.constructor.Dictionary[lang][msg] : msg;

        if (argument && Object.prototype.toString.call(argument) === '[object Number]') {
            if (langIsset) {
                var exp = this.constructor.Dictionary[lang].pluralRules(argument);
                result = this.constructor.Dictionary[lang][msg][exp];
            }
            result = L.Util.template(result, {n: argument});
        }

        return result ? result : msg;
    }
};

L.Map.mergeOptions({
    currentLang: L.DG.loader.params.lang || "ru"
});

L.Map.include({
    /**
     * @param {String} lang
     */
    setLang: function (lang) {
        if (lang) {
            this.options.currentLang = lang;
            this.fire("dgLangChange", {"lang": lang});
        }
    },

    /**
     * @return {String}
     */
    getLang: function () {
        return this.options.currentLang;
    }
});