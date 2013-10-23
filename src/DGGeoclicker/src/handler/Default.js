L.DG.Geoclicker.Handler.Default = L.Class.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    _eventHandlers: {},

    initialize: function (controller, view, map) { // (Object, Object, Object)
        this._controller = controller;
        this._view = view;
        this._map = map;
    },

    handle: function () { // (Object, String) -> Promise
        return L.DG.when({
            tmpl: this._view.getTemplate('popupHeader'),
            data: {'title': this.t('We haven\'t collected info about this place')}
        });
    },

    _removeEventHandler: function (name) { // (String)
        var handlers = this._eventHandlers,
            handler,
            handlerName;

        for (handlerName in handlers) {
            handler = handlers[handlerName];
            if (handlerName === name) {
                L.DomEvent.off(handler.el, handler.event, handler.handler);
                delete handlers[handlerName];
            }
        }
    },

    _addEventHandler: function (name, el, event, handler) { // (String, HTMLElement, String, Function)
        L.DomEvent.on(el, event, handler);
        this._eventHandlers[name] = {
            el: el,
            event: event,
            handler: handler
        };
    },

    _clearEventHandlers: function () {
        var handlers = this._eventHandlers,
            i;

        for (i in handlers) {
            L.DomEvent.off(handlers[i].el, handlers[i].event, handlers[i].handler);
        }

        this._eventHandlers = {};
    },

    _getDirectionsUrl: function (name) {
        return L.Util.template('__PPNOT_LINK__', {
            'code': this._map.dgProjectDetector.getProject().code,
            'name': encodeURIComponent(name),
            'point': 'POINT(' + this._popup._latlng.lng + ' ' + this._popup._latlng.lat + ')'
        });
    },

});


L.DG.Geoclicker.Handler.HandlerExample = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results, type) { // (Object, String) -> Promise
        return L.DG.when({
            tmpl: type + ':<br/>' + results[type].id
        });
    }
});
