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
        var container = L.DomUtil.create('div', 'dg-control-round');
        this._activeCLass = 'dg-control-round__active';
        this._activeIconCLass = 'dg-control-round_icon__active';

        this._link = L.DomUtil.create('a', 'dg-control-round_icon dg-control-round_icon__' + this.options.iconClass, container);
        this._link.href = '#';
        this._renderTranslation();

        this._map = map;

        L.DomEvent.on(this._link, 'click', this._toggleControl, this);

        return container;
    },

    onRemove: function () {
        L.DomEvent.off(this._link, 'click', this._toggleControl);
    },

    _toggleControl: function (e) {
        L.DomEvent.stop(e);
        this.fireEvent('click');
    },

    enableControl: function () {
        L.DomUtil.addClass(this._container, this._activeCLass);
        L.DomUtil.addClass(this._link, this._activeIconCLass);
        return this;
    },

    disableControl: function () {
        L.DomUtil.removeClass(this._container, this._activeCLass);
        L.DomUtil.removeClass(this._link, this._activeIconCLass);
        return this;
    }
});

L.DG.Control.include(L.DG.Locale);

L.DG.control = function (options) {
    return new L.DG.Control(options);
};