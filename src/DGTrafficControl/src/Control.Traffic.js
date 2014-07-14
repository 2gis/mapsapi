/* global __TRAFFIC_LAYER_MIN_ZOOM__ */

DG.Control.Traffic = DG.RoundControl.extend({

    options: {
        position: DG.Browser.touch ? 'topright' : 'topright',
        iconClass: 'traffic'
    },

    statics: {
        Dictionary: {},
        scoreUrl: '__TRAFFIC_SCORE_SERVER__',
        trafficMinZoom: __TRAFFIC_LAYER_MIN_ZOOM__
    },

    initialize: function (options) {
        this._trafficClass = 'dg-traffic-control';

        DG.setOptions(this, options);
        DG.extend(this, {
            _active: false,
            _trafficLayer: null
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function () {
            this._trafficLayer = DG.traffic();
            this._map.on('zoomend', this._onZoomEnd, this);
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
            this._map.off('zoomend', this._onZoomEnd, this);
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
            var a = this._link;

            score = parseInt(score, 10); // sometimes webapi returns something like '5,+'

            self._scoreRate = self._getTrafficColor(score);
            self._map.addLayer(self._trafficLayer);

            a.innerHTML = score;
            DG.DomUtil.addClass(a, self._trafficClass);
            DG.DomUtil.addClass(a, self._trafficClass + '_color_' + self._scoreRate);
        });
    },

    _hideTraffic: function () { // ()
        var a = this._link;

        a.innerHTML = '';
        DG.DomUtil.removeClass(a, this._trafficClass);
        DG.DomUtil.removeClass(a, this._trafficClass + '_color_' + this._scoreRate);
        this._map.removeLayer(this._trafficLayer);
    },

    _onZoomEnd: function () { // ()
        var project = this._map.projectDetector.getProject();

        if ((this._map.getZoom() < DG.Control.Traffic.trafficMinZoom) ||
            (project && !!project.traffic === false)) {
            this._container.style.display = 'none';
        } else {
            this._container.style.display = 'block';
        }
    },

    _getTrafficColor: function (score) { // (Number) -> String
        var result = 'green';

        if (score > 7) {
            result = 'red';
        } else if (score > 4) {
            result = 'yellow';
        }

        return result;
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
