L.DG.Control = L.Control.extend({
    includes: L.Mixin.Events,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright',
        iconClass: 'default'
    },

    onAdd: function (map) {
        var controlClass = this._controlCLass = 'dg-control-round',
            controlIconClass = this._controlIconCLass = this._controlCLass + '_icon',
            container = L.DomUtil.create('div', controlClass);

        this._link = L.DomUtil.create('a', controlIconClass + ' ' + controlIconClass + '__' + this.options.iconClass, container);
        this._link.href = '#';
        this._renderTranslation();

        this._map = map;

        L.DomEvent
            .on(container, 'click', this._toggleControl, this)
            .on(container, 'dblclick', L.DomEvent.stopPropagation);

        return container;
    },

    onRemove: function () {
        L.DomEvent.off(this._link, 'click', this._toggleControl);
    },

    _toggleControl: function (e) {
        L.DomEvent.stop(e);
        this.fireEvent('click');
    },

    setState: function (state) {
        if (this._state) {
            L.DomUtil.removeClass(this._container, this._controlCLass + '__' + this._state);
            L.DomUtil.removeClass(this._link, this._controlIconCLass + '__' + this._state);
        }

        if (!state) {
            return this;
        }

        this._state = state;

        L.DomUtil.addClass(this._container, this._controlCLass + '__' + this._state);
        L.DomUtil.addClass(this._link, this._controlIconCLass + '__' + this._state);

        return this;
    }
});

L.DG.Control.include(L.DG.Locale);

L.DG.control = function (options) {
    return new L.DG.Control(options);
};