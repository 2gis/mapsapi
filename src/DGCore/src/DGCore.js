require('leaflet');
require('html5shiv');

// DG inheritance
var oldDG = window.DG;
var DG = new (
    (function() {
        var DgApi = function() {},
            DgApiCore = function() {};

        DgApiCore.prototype = L;
        DgApi.prototype = new DgApiCore();

        return DgApi;
    })()
)();

for (var prop in oldDG) {
    if (oldDG.hasOwnProperty(prop) && typeof DG[prop] === 'undefined') {
        DG[prop] = oldDG[prop];
    }
}

window.__dgApi__ = window.__dgApi__ || {};
DG.version = window.__dgApi__.version;
DG.Icon.Default.imagePath  = '../img/vendors/leaflet';

DG.Map.addInitHook((function() {
    var inited = false;

    // Analytics inited once
    return function() {
        if (!inited) {
            /*eslint-disable */
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script',DG.config.googleAnalytics,'ga');
            /*eslint-enable */

            inited = true;
        }

        /*eslint-disable */
        ga('create', DG.config.gaCode, {
            storage: 'none', // don't store and use cookies thanks GDPR
            name: DG.config.gaName,
            sampleRate: 50
        });
        ga(DG.config.gaName + '.set', 'anonymizeIp', true);
        ga(DG.config.gaName + '.send', 'pageview');
        /*eslint-enable */
    };
})());

// Improve IHandler
DG.Map.include({
    addHandler: function(name, HandlerClass) {
        if (!HandlerClass) { return this; }

        var options = this.options[name],
            param = (options === Object(options)) ? options : null,
            handler = this[name] = new HandlerClass(this, param);

        this._handlers.push(handler);

        if (options) {
            handler.enable();
        }

        return this;
    }
});

// Apply class to map container for detect when we dont need hover effects
DG.Map.addInitHook(function() {
    if (!DG.Browser.touchEnabled) {
        DG.DomUtil.addClass(this._container, 'no-touch');
    }
});

window.DG = DG;
module.exports = DG;
