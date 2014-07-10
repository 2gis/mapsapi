DG.Control.Traffic = DG.RoundControl.extend({

    options: {
        position: DG.Browser.touch ? 'topright' : 'topright',
        iconClass: 'traffic'
    },

    statics: {
        Dictionary: {},
        scoreUrl: '__TRAFFIC_SCORE_SERVER__'
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
        var self = this;

        this._getTrafficScore().then(function (score) {
            console.log('traffic score: %s', score);
            self._map.addLayer(self._trafficLayer);
        });
    },

    _hideTraffic: function () { // ()
        this._map.removeLayer(this._trafficLayer);
    },

    _getTrafficScore: function () { // () -> Promise
        var url = DG.Util.template(DG.Control.Traffic.scoreUrl,
                                    {
                                        s: this._trafficLayer.getSubdomain(),
                                        projectCode: this._map.projectDetector.getProject().code
                                    });

        return DG.ajax(url, {type: 'get' });
    },

    _renderTranslation: function () { // ()
        this._link.title = this.t('button_title');
    }
});

DG.control.traffic = function (options) {
    return new DG.Control.Traffic(options);
};
