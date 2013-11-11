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

        this._link = L.DomUtil.create('a', 'dg-control-round_icon dg-control-round_icon__' + this.options.iconClass, container);
        this._link.href = '#';
        this._renderTranslation();
        this._resetState();

        this._map = map;

        L.DomEvent
            .disableClickPropagation(this._link)
            .on(this._link, 'click', this._toggleControl, this);

        return container;
    },

    onRemove: function () {
        L.DomEvent.off(this._link, 'click', this._toggleControl);
        this._resetState();
    },

    _resetState: function () {
        this._active = false;
    },

    _toggleControl: function (event) {
        L.DomEvent.stop(event);
        if (this._active = !this._active) {
            console.log('enable');
            this.fireEvent('enable');
        } else {
            console.log('disable');
            this.fireEvent('disable');
        }
        this.fireEvent('update');
        L.DomUtil[this._active ? 'addClass' : 'removeClass'](this._container, 'dg-control-round__active');
    },

    _renderTranslation: function () {
        // this._link.title = this.t('button_title');
    }
});

L.DG.control = function (options) {
    return new L.DG.Control(options);
};