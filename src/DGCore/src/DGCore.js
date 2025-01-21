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
