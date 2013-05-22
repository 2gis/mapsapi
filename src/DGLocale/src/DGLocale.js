/**
 * Provides a localization functionality for another plugins
 */
L.DG = L.DG || {};
L.DG.Locale = {
    t: function (msg, argument) { // (String, Number) -> String
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
    setLang: function (lang) { // (String)
        if (lang && Object.prototype.toString.call(lang) === "[object String]") {
            this.options.currentLang = lang;
            this.fire("dgLangChange", {"lang": lang});
        }
    },

    getLang: function () { // -> String
        return this.options.currentLang;
    }
});