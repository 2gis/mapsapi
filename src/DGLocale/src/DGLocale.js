L.DG = L.DG || {};

L.DG.Locale = {
    t: function (msg, argument) { // (String, Number) -> String
        var result,
            lang = this._map.getLang(),
            msgIsset = false,
            dictionaryMsg,
            isNumeric,
            exp;
        if (typeof this.constructor.Dictionary[lang] === 'undefined') {
            lang = "ru";
            this._map.setLang("ru");
        }
        dictionaryMsg = this.constructor.Dictionary[lang][msg];
        msgIsset = typeof dictionaryMsg !== 'undefined';
        if (!msgIsset) {
            return msg;
        }
        result = msgIsset ? dictionaryMsg : msg;

        if (argument) {
            argument = parseInt(argument, 10);
            argument = isNaN(argument) ? 0 : argument;
            exp = this.constructor.Dictionary[lang].pluralRules(argument);
            result = dictionaryMsg[exp];
        }

        result = L.Util.template(result, {n: argument});
        return result ? result : msg;
    }
};

L.Map.mergeOptions({
    currentLang: L.DG.loaderParams && L.DG.loaderParams.lang || "__DEFAULT_LANG__"
});

L.Map.include({

    setLang: function (lang) { // (String)
        if (lang && Object.prototype.toString.call(lang) === "[object String]") {
            this.options.currentLang = lang;
            this.fire("dgLangChange", {"lang": lang});
        }
    },

    getLang: function () { // () -> String
        return this.options.currentLang;
    }
});
