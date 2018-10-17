DG.Control.Traffic = DG.RoundControl.extend({
    options: {
        position: 'topright',
        iconClass: 'traffic'
    },

    statics: {
        Dictionary: {}
    },

    initialize: function(options) {
        this._trafficClass = 'dg-traffic-control';
        this._controlHideClass = 'dg-control-round_is-hidden_true';

        DG.setOptions(this, options);
        DG.extend(this, {
            _active: false,
            _trafficLayer: null
        }).on(this._controlEvents, this);
    },

    _controlEvents: {
        add: function() {
            this._trafficLayer = DG.traffic();
            this._map.on('zoomend projectchange projectleave', this._updateControlVisibility, this);
        },
        click: function() {
            this._active = !this._active;

            if (this._active) {
                this.setState('active');
                this._showTraffic();
            } else {
                this.setState('');
                this._hideTraffic();
            }
        },
        remove: function() {
            this.off(this._controlEvents, this);
            this._map.off('zoomend projectchange projectleave', this._updateControlVisibility, this);
            if (this._active) {
                this._map.removeLayer(this._trafficLayer);
                this._active = false;
            }
            this._trafficLayer = null;
        }
    },

    _showTraffic: function() { // ()
        this._updateTrafficScore();
        this._map.addLayer(this._trafficLayer);
    },

    _hideTraffic: function() { // ()
        this._handleDom('remove');
        this._map.removeLayer(this._trafficLayer);
    },

    _handleDom: function(method, score) {
        var a = this._link;

        a.innerHTML = isNaN(score) ? '' : score;
        DG.DomUtil[method + 'Class'](a, this._trafficClass);
        DG.DomUtil[method + 'Class'](a, this._trafficClass + '_color_' + this._scoreRate);
    },

    _getTrafficColor: function(score) { // (Number) -> String
        var result = 'green';

        if (score > 7) {
            result = 'red';
        } else if (score > 4) {
            result = 'yellow';
        }

        return result;
    },

    _updateControlVisibility: function() {
        var project = this._map.projectDetector.getProject(),
            projectHasTraffic = project && project.traffic,
            method = ((this._map.getZoom() < DG.config.trafficLayerMinZoom) ||
            (!projectHasTraffic)) ? 'addClass' : 'removeClass';

        DG.DomUtil[method](this._container, this._controlHideClass);
        if (this._active && projectHasTraffic) {
            this._updateTrafficScore();
        }
    },

    _updateTrafficScore: function() {
        var self = this;

        this._getTrafficScore().then(function(score) {
            score = parseInt(score, 10); // sometimes webapi returns something like '5,+'

            self._scoreRate = self._getTrafficColor(score);
            self._handleDom('add', score);
        });
    },

    _getTrafficScore: function() { // () -> Promise
        var url = DG.Util.template(
            DG.config.protocol + DG.config.trafficScoreServer,
            {
                s: this._trafficLayer.getSubdomain(),
                projectCode: this._map.projectDetector.getProject().code
            }
        );

        return DG.ajax(url, {type: 'get'});
    },

    _renderTranslation: function() { // ()
        this._link.title = this.t('button_title');
    }
});

DG.control.traffic = function(options) {
    return new DG.Control.Traffic(options);
};

DG.Map.mergeOptions({
    trafficControl: false
});

DG.Map.addInitHook(function() {
    if (this.options.trafficControl) {
        this.trafficControl = DG.control.traffic(this.options.trafficControl);
        this.addControl(this.trafficControl);
    }
});
