DG.RoundControl = DG.Control.extend({
    includes: DG.Mixin.Events,

    options: {
        position: 'topright',
        iconClass: 'default'
    },

    onAdd: function(map) {
        var controlClass = this._controlCLass = 'dg-control-round',
            controlIconClass = this._controlIconCLass = this._controlCLass + '__icon',
            container = DG.DomUtil.create('div', '');

        if (this._disable) {
            return container;
        }
        DG.DomUtil.addClass(container, controlClass);

        var link = this._link = DG.DomUtil.create(
            'a',
            controlIconClass + ' ' + controlIconClass + '_name_' + this.options.iconClass,
            container
        );

        link.href = '#';

        this._renderTranslation();

        this._map = map;

        DG.DomEvent
            .on(container, 'click', this._toggleControl, this)
            .on(container, 'dblclick', DG.DomEvent.stopPropagation)
            .on(link, 'mousedown', DG.DomEvent.stopPropagation);

        this.fireEvent('add');

        return container;
    },

    onRemove: function() {
        this.fireEvent('remove');
        DG.DomEvent.off(this._link, 'click', this._toggleControl);
    },

    setState: function(state) {
        if (!this._link || !this._container) {
            return this;
        }

        if (this._state) {
            DG.DomUtil.removeClass(this._container, this._controlCLass + '_state_' + this._state);
            DG.DomUtil.removeClass(this._link, this._controlIconCLass + '_state_' + this._state);

            this._state = null;
        }

        if (state) {
            this._state = state;

            DG.DomUtil.addClass(this._container, this._controlCLass + '_state_' + this._state);
            DG.DomUtil.addClass(this._link, this._controlIconCLass + '_state_' + this._state);
        }

        return this;
    },

    _toggleControl: function(e) {
        DG.DomEvent.stop(e);
        this.fireEvent('click');
    }
});

DG.RoundControl.include(DG.Locale);

DG.roundControl = function(options) {
    return new DG.RoundControl(options);
};
