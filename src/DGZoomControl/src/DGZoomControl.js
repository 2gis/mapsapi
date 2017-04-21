DG.Control.Zoom.include(DG.Locale);
DG.Control.Zoom.Dictionary = {};

DG.Control.Zoom.include({
    onAdd: function(map) {
        var zoomName = 'dg-zoom',
            buttonTemplate = '<div class="dg-control-round__icon ' + zoomName + '__control ' + zoomName + '__button ' + zoomName + '__button_type_{type}"></div>',
            container = DG.DomUtil.create('div', zoomName);

        this._map = map;

        this._zoomInButton = this._createButton(DG.Util.template(buttonTemplate, {type : 'in'}), this.t('zoom_in'), 'dg-control-round ' + zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(DG.Util.template(buttonTemplate, {type : 'out'}), this.t('zoom_out'), 'dg-control-round ' + zoomName + '__out', container, this._zoomOut, this);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },

    _originalCreateButton: DG.Control.Zoom.prototype._createButton,

    // set active state control on mobile devices
    _createButton: function() {
        var args = Array.prototype.slice.call(arguments);
        var link = this._originalCreateButton.apply(this, args);

        var icon = link.children[0];
        var linkActiveClass = 'dg-control-round_state_active';
        var iconActiveClass = 'dg-control-round__icon_state_active';

        DG.DomEvent
            .on(link, 'touchstart', function() {
                DG.DomUtil.addClass(link, linkActiveClass);
                DG.DomUtil.addClass(icon, iconActiveClass);
            })
            .on(link, 'touchend touchcancel', function() {
                DG.DomUtil.removeClass(link, linkActiveClass);
                DG.DomUtil.removeClass(icon, iconActiveClass);
            });

        return link;
    },

    _renderTranslation: function() {
        if (!this._zoomInButton || !this._zoomOutButton) {
            return;
        }

        this._zoomInButton.title = this.t('zoom_in');
        this._zoomOutButton.title = this.t('zoom_out');
    }
});
