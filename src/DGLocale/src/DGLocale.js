DG.Locale = {
    t: function(msg, argument) { // (String, Number) -> String
        var result,
            lang = this._map.getLang(),
            msgIsset = false,
            dictionaryMsg,
            exp;

        if (typeof this.constructor.Dictionary[lang] === 'undefined') {
            if (lang === 'ar') {
                lang = 'en';
            } else {
                lang = DG.config.defaultLang;
            }
        }
        dictionaryMsg = this.constructor.Dictionary[lang][msg];
        msgIsset = typeof dictionaryMsg !== 'undefined';
        if (!msgIsset) {
            return msg;
        }
        result = msgIsset ? dictionaryMsg : msg;

        if (argument !== undefined) {
            argument = parseInt(argument, 10);
            argument = isNaN(argument) ? 0 : argument;
            exp = this.constructor.Dictionary[lang].pluralRules(argument);
            result = dictionaryMsg[exp];
        }

        result = DG.Util.template(result, {n: argument});
        return result;
    }
};

DG.Map.include({
    setLang: function(lang) { // (String)
        if (lang && Object.prototype.toString.call(lang) === '[object String]') {
            this.options.currentLang = lang;
            this.fire('langchange', {'lang': lang});
        }
    },

    getLang: function() { // () -> String
        // If the language hasn't been set before, set it to page language or
        // default language from config
        if (!this.options.currentLang) {
            var root = document.documentElement;
            var lang = root.lang || (root.getAttributeNS && root.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')) || DG.config.defaultLang;

            this.options.currentLang = lang;
        }

        return this.options.currentLang;
    }
});
