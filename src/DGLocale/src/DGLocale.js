DG.Locale = {
    t: function (msg, argument) { // (String, Number) -> String
        var result,
            lang = this._map.options.currentLang,
            msgIsset = false,
            dictionaryMsg,
            exp;
        if (typeof this.constructor.Dictionary[lang] === 'undefined') {
            lang = DG.config.defaultLang;
            this._map.setLang(lang);
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
        return result ? result : msg;
    }
};

DG.Map.addInitHook(function () {
    var root = document.documentElement,
        lang = root.lang || (root.getAttributeNS && root.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')) || DG.config.defaultLang;

    if (!this.options.currentLang) {
        this.options.currentLang = lang;
    }
});

DG.Map.include({
    setLang: function (lang) { // (String)
        if (lang && Object.prototype.toString.call(lang) === '[object String]') {
            this.options.currentLang = lang;
            this.fire('langchange', {'lang': lang});
        }
    },

    getLang: function () { // () -> String
        return this.options.currentLang;
    }
});
