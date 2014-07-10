DG.Control.Traffic = DG.RoundControl.extend({

    options: {
        position: DG.Browser.touch ? 'topright' : 'topright',
        iconClass: 'traffic'
    },

    statics: {
        Dictionary: {}
    },

    initialize: function (options) {
        DG.setOptions(this, options);
        DG.extend(this, {
            _active: false,
            _trafficLayer: null
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function () {
            this._trafficLayer = DG.traffic();
        },
        click: function () {
            if (this._active = !this._active) { // jshint ignore:line
                this.setState('active');
                this._showTraffic();
            } else {
                this.setState('');
                this._hideTraffic();
            }
        },
        remove: function () {
            this.off(this._controlEvents, this);
            if (this._active) {
                this._map.removeLayer(this._trafficLayer);
                this._active = false;
            }
            this._trafficLayer = null;
        }
    },

    _showTraffic: function () { // ()
        this._map.addLayer(this._trafficLayer);
    },

    _hideTraffic: function () { // ()
        this._map.removeLayer(this._trafficLayer);
    },

    _renderTranslation: function () { // ()
        this._link.title = this.t('button_title');
    }
});

DG.control.traffic = function (options) {
    return new DG.Control.Traffic(options);
};
