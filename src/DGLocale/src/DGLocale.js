/**
 * Provides a localization functionality for another plugins
 */
L.DG = L.DG || {};
L.DG.Locale = {
    /**
     * @param {String} msg
     * @param {Number} argument
     * @return {String}
     */
    t: function (msg, argument) {
        var result,
            lang = this._map.getLang(),
            langIsset = false,
            msgIsset = false,
            dictionaryMsg,
            isNumeric,
            exp;

        if(typeof this.constructor.Dictionary[lang] !== 'undefined') {
            langIsset = true;
        }
        if (langIsset) {
            dictionaryMsg = this.constructor.Dictionary[lang][msg];
            msgIsset = typeof dictionaryMsg !== 'undefined';
            if (!msgIsset) {
                return msg;
            }
        }
        result = langIsset && msgIsset ? dictionaryMsg : msg;
        
        if (argument) {
            isNumeric = Object.prototype.toString.call(argument) === '[object Number]';
            if (!isNumeric) {
                argument = 0;
            }
            if (langIsset) {
                exp = this.constructor.Dictionary[lang].pluralRules(argument);
                result = dictionaryMsg[exp];
            }
        }
        
        
        result = L.Util.template(result, {n: argument});
        return result ? result : msg;
    }
};

L.Map.mergeOptions({
    currentLang: "ru"
});

L.Map.include({
    /**
     * @param {String} lang
     */
    setLang: function (lang) {
        if (lang && Object.prototype.toString.call(lang) === "[object String]") {
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