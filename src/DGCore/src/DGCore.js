// DG inheritance
var oldDG = window.DG;
DG = new (
    (function () {
        var DgApi = function () {},
            DgApiCore = function () {};

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

DG.Map.addInitHook((function () {
    var inited = false;

    // Analytics inited once
    return function () {
        if (!inited) {
            /*eslint-disable */
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script',DG.config.protocol+DG.config.googleAnalytics,'ga');
            /*eslint-enable */

            inited = true;
        }

        /*eslint-disable */
        ga('create', DG.config.gaCode, 'none', {name: 'mapsapi2gis'});
        ga('mapsapi2gis.send', 'pageview');
        /*eslint-enable */

        var newImg = new Image();
        newImg.src = DG.config.protocol + DG.config.analytics + '?' +
            'sr=' + window.screen.width + 'x' + window.screen.height + '&' +
            'v=' + DG.version;
    };
})());

// Improve IHandler
DG.Map.include({
    addHandler: function (name, HandlerClass) {
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
DG.Map.addInitHook(function () {
    if (!DG.Browser.touch) {
        DG.DomUtil.addClass(this._container, 'no-touch');
    }
});
