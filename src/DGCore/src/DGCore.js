//DG inheritance
DG = new (
    (function () {
        var DgApi = function () {},
            DgApiCore = function () {};

        DgApiCore.prototype = L;
        DgApi.prototype = new DgApiCore();

        return DgApi;
    })()
)();
window.__dgApi__ = window.__dgApi__ || {};
DG.version = window.__dgApi__.version;
DG.debug = window.__dgApi__.debug;
DG.Icon.Default.imagePath  = '../img/vendors/leaflet';

/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','__GOOGLE_ANALYTICS__','ga');
/* jshint ignore:end */

/*global ga:false*/
ga('create', '__GA_CODE__', 'none');
ga('send', 'pageview');

//track statistics
var newImg = new Image();
newImg.src = '__ANALYTICS__?' +
            'sr=' + window.screen.width + 'x' + window.screen.height + '&' +
            'v=' + DG.version;

// Improve IHandler
DG.Map.include({
    addHandler: function (name, HandlerClass) {
        if (!HandlerClass) { return; }

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
    !DG.Browser.touch && DG.DomUtil.addClass(this._container, 'no-touch');
});
