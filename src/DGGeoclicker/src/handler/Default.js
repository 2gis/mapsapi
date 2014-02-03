DG.Geoclicker.Handler.Default = DG.Class.extend({

    includes: DG.Locale,

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
        return DG.when({
            tmpl: this._view.getTemplate('popupHeader'),
            data: {'title': this.t('We haven\'t collected info about this place')}
        });
    },

    _removeEventHandler: function (name) { // (String)
        var handlers = this._eventHandlers,
            handler,
            handlerName;

        for (handlerName in handlers) {
            if (handlers.hasOwnProperty(handlerName)) {
                handler = handlers[handlerName];
                if (handlerName === name) {
                    DG.DomEvent.off(handler.el, handler.event, handler.handler);
                    delete handlers[handlerName];
                }
            }
        }
    },

    _addEventHandler: function (name, el, event, handler) { // (String, HTMLElement, String, Function)
        DG.DomEvent.on(el, event, handler);
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
            if (handlers.hasOwnProperty(i)) {
                DG.DomEvent.off(handlers[i].el, handlers[i].event, handlers[i].handler);
            }
        }

        this._eventHandlers = {};
    },

    _getDirectionsUrl: function (name) {
        return DG.Util.template('__PPNOT_LINK__', {
            'code': this._map.projectDetector.getProject().code,
            'name': encodeURIComponent(name),
            'point': 'POINT(' + this._popup._latlng.lng + ' ' + this._popup._latlng.lat + ')'
        });
    },

});


DG.Geoclicker.Handler.HandlerExample = DG.Geoclicker.Handler.Default.extend({

    handle: function (results, type) { // (Object, String) -> Promise
        return DG.when({
            tmpl: type + ':<br/>' + results[type].id
        });
    }
});
