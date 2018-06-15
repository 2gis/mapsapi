var ie9 = (function() {
    var div = document.createElement('div');
    var all = div.getElementsByTagName('i');
    div.innerHTML = '<!--[if IE 9]><i></i><![endif]-->';
    return Boolean(all[0]);
})();

var safari51 = DG.Browser.safari && navigator.userAgent.indexOf('Version/5.1') !== -1;

var wasPreviouslyDisabled = false;

// Old Safari throws error when localStorage.getItem is called in private mode
try {
    wasPreviouslyDisabled = localStorage.getItem('DGMuseum') === 'false';
} catch (err) {
    // do nothing
}

DG.Map.mergeOptions({
    museum: !wasPreviouslyDisabled && (DG.Browser.ielt9 || ie9 || DG.Browser.opera12 || safari51)
});

DG.Map.Museum = DG.Handler.extend({
    statics: {
        Dictionary: {
            ar: {
                wearesorry: 'لا نضمن لك تشغيل ثابت للتطبيق على متصفحك. حاول التحديث:'
            },
            cs: {
                wearesorry: 'Nezaručujeme stabilní fungování aplikace ve Vašem prohlížeči. Zkuste provést aktualizaci:'
            },
            en: {
                wearesorry: 'We do not guarantee stable operation of the application in your browser. Try updating:'
            },
            es: {
                wearesorry: 'No garantizamos un funcionamiento estable de la aplicación en su buscador. Intente actualizarlo:'
            },
            it: {
                wearesorry: 'Non garantiamo il funzionamento stabile dell\'applicazione nel tuo browser. Prova ad aggiornare:'
            },
            ru: {
                wearesorry: 'Мы не гарантируем стабильную работу приложения в вашем браузере. Попробуйте обновиться:'
            }
        }
    },

    includes: [DG.Locale],

    initialize: function(map) {
        this._map = map;

        this._element = document.createElement('div');
        this._element.className = 'dg-museum';
        this._element.innerHTML = '<span></span>' +
            '<a class="dg-museum-browser dg-museum__chrome" target="_blank" href="https://www.google.com/chrome/"></a>' +
            '<a class="dg-museum-browser dg-museum__firefox" target="_blank" href="https://www.mozilla.org/firefox/new/"></a>' +
            '<a class="dg-museum-browser dg-museum__safari" target="_blank" href="https://support.apple.com/downloads/safari"></a>' +
            '<a class="dg-museum-browser dg-museum__opera" target="_blank" href="https://www.opera.com/"></a>' +
            '<a class="dg-museum-browser dg-museum__ie" target="_blank" href="https://windows.microsoft.com/internet-explorer/download-ie"></a>';

        this._text = this._element.children[0];

        this._closeButton = document.createElement('span');
        this._closeButton.className = 'dg-museum__close';
        this._element.appendChild(this._closeButton);

        this._renderTranslation();
    },

    addHooks: function() {
        this._map.getContainer().appendChild(this._element);
        this._map.on('langchange', this._renderTranslation, this);
        DG.DomEvent.on(this._closeButton, 'click', this._onCloseButtonClick, this);
    },

    removeHooks: function() {
        this._map.getContainer().removeChild(this._element);
        this._map.off('langchange', this._renderTranslation, this);
        DG.DomEvent.off(this._closeButton, 'click', this._onCloseButtonClick, this);
    },

    _onCloseButtonClick: function(e) {
        DG.DomEvent.stop(e);

        // Old Safari throws error when localStorage.getItem is called in private mode
        try {
            localStorage.setItem('DGMuseum', 'false');
        } catch (err) {
            // do nothing
        }

        this.disable();
    },

    _renderTranslation: function() {
        var lang = this._map.getLang();
        this._text.innerHTML = this.t('wearesorry');
        this._element.setAttribute('dir', lang === 'ar' ? 'rtl': 'ltr');
    }
});

DG.Map.addInitHook('addHandler', 'museum', DG.Map.Museum);
