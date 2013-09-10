L.DG.LocationControl = L.Control.Locate.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        markerStyle: {
            color: '#0A9BCF',
            fillColor: '#FFFFFF',
            fillOpacity: 0.7,
            weight: 2,
            opacity: 0.9,
            radius: 8
        },
        circleStyle: {
            color: '#FFF',
            fillColor: '#FFF',
            fillOpacity: 0.4,
            weight: 0,
            opacity: 0.3
        },
        onLocationError: function(err) {
            console.log(err);
        }
    },

    _addPreloaders: function() {
        var map = L.DomUtil.get('map');
        this._loader = L.DomUtil.create('div', 'dg-loader', map);
        this._loaderLocate = L.DomUtil.create('div', 'dg-loader-locate', map);
        this._loaderLocateError = L.DomUtil.create('div', 'dg-loader-locate-error', map);
        this._loaderLocateError.innerHTML = this.t('cant_find');
    },
    _showLoad: function() {
        this._loader.style.display = 'block';
        this._loaderLocate.style.display = 'block';
        this._loaderLocateError.style.display = 'none';
    },
    _showLoadError: function() {
        this._loader.style.display = 'none';
        this._loaderLocate.style.display = 'block';
        this._loaderLocateError.style.display = 'block';
    },
    _hideLoad: function() {
        this._loader.style.display = 'none';
        this._loaderLocate.style.display = 'none';
        this._loaderLocateError.style.display = 'none';
    },

    onAdd: function(map) {
        this._addPreloaders();
        var container = L.Control.Locate.prototype.onAdd.call(this, map),
            link = container.firstElementChild || container.firstChild,
            self = this;

        L.DomEvent.on(link, 'click', function() {
            self._showLoad();
        });

        var addControls = function() {
            this._circleMarker.unbindPopup();

            if (!this._circleMarkerPoint){
                this._circleMarkerPoint = L.circleMarker(this._circleMarker.getLatLng(), {
                    color: '#0A9BCF',
                    fillColor: '#0A9BCF',
                    fillOpacity: 1,
                    weight: 0,
                    opacity: 1,
                    radius: 4
                }).addTo(this._layer);
            } else {
                this._circleMarkerPoint.setLatLng(this._circleMarker.getLatLng());
            }

            [this._circleMarker, this._circleMarkerPoint].forEach(function(marker){
                marker.bindLabel(this.t("you_are_here"));

                L.DomEvent.on(marker, 'click', function() {
                    map.fireEvent('dgLocateClick');
                });
            }, this);
        };

        map.on('locationfound', addControls, this);
        map.on('locationfound', this._hideLoad, this);
        map.on('locationerror', this._showLoadError, this);

        return container;
    }
});

L.DG.locate = function(options) {
    return new L.DG.LocationControl(options);
};