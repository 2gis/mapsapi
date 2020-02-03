DG.Geoclicker.Handler.Default = DG.Class.extend({

    includes: DG.Locale,

    statics: {
        Dictionary: {}
    },

    _eventHandlers: {},

    initialize: function(controller, view, map) { // (Object, Object, Object)
        this._controller = controller;
        this._view = view;
        this._map = map;
    },

    handle: function() { // () -> Promise
        return Promise.resolve({
            tmpl: 'popupHeader',
            data: {'title': this.t('we_have_not')}
        });
    },

    addClickEvent: function() {
        this._view._popup.on('click', this._runEventHandlers, this);
        this._map.once('popupclose', this._removeClickEvent, this);
    },

    _removeClickEvent: function() {
        this._view._popup.off('click', this._runEventHandlers, this);
    },

    _addEventHandler: function(el, handler) { // (String, Function)
        this._eventHandlers[el] = handler;
    },

    _runEventHandlers: function(e) {
        var target = e.originalEvent.target;

        for (var eventClass in this._eventHandlers) {
            if (this._eventHandlers.hasOwnProperty(eventClass) && target.className.indexOf(eventClass) > -1) {
                DG.DomEvent.preventDefault(e.originalEvent);
                this._eventHandlers[eventClass].call(this, target);
                return;
            }
        }
    },

    _clearEventHandlers: function() {
        this._eventHandlers = {};
    },

    _getDirectionsUrl: function(name) {
        var project = this._map.projectDetector.getProject();
        if (!project) {
            return '';
        }

        return DG.Util.template(DG.config.ppnotLink, {
            'domain': project.domain,
            'projectCode': project.code,
            'center': this._map.getCenter().lng + ',' + this._map.getCenter().lat,
            'zoom': this._map.getZoom(),
            'name': encodeURIComponent(name),
            'rsType': project.transport ? 'bus' : 'car',
            'point': this._popup._latlng.lng + ',' + this._popup._latlng.lat
        });
    },

    _getDrilldown: function(object) {
        var admDivs = [],
            result;

        if (object.adm_div) {
            admDivs = object.adm_div
                .reduce(function(admDivs, admDiv) {
                    if (admDiv.name) {
                        admDivs.push(admDiv.name);
                    }

                    return admDivs;
                }, [])
                .reverse();
        }

        if (admDivs.length && object.address && object.address.postcode) {
            admDivs.push(object.address.postcode);
        }

        result = admDivs.join(', ');

        return result;
    }

});


DG.Geoclicker.Handler.HandlerExample = DG.Geoclicker.Handler.Default.extend({

    handle: function(results, type) { // (Object, String) -> Promise
        return Promise.resolve({
            tmpl: type + ':<br/>' + results[type].id
        });
    }
});
