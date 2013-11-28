L.DG.Location = L.DG.RoundControl.extend({

    options: {
        iconClass: 'locate',
        drawCircle: true,
        follow: true,  // follow with zoom and pan the user's location
        stopFollowingOnDrag: false, // if follow is true, stop following when map is dragged
        metric: true,
        onLocationError: function (/*err*/) {
            // this event is called in case of any location error
            // that is not a time out error.
            // console.log(err.message);
        },
        onLocationOutsideMapBounds: function (/*context*/) {
            // this event is repeatedly called when the location changes
            // console.log(context.t('outsideMapBoundsMsg'));
        },
        locateOptions: {}
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);

        if (!navigator.geolocation) {
            this._disable = true;
            return;
        }

        this._event = undefined;

        this._locateOptions = {
            watch: true,  // if you overwrite this, visualization cannot be updated
            setView: false
        };
        L.extend(this._locateOptions, this.options.locateOptions);

        this._resetVariables();

        this.on({
            'click': this._handleLocate,
            'add': this._initLocate
        });
    },

    _initLocate: function () {
        this._layer = new L.LayerGroup();
        this._layer.addTo(this._map);

        // event hooks
        this._map.on({
            'locationfound': this._onLocationFound,
            'locationerror': this._onLocationError
        }, this);
    },

    _handleLocate: function () {
        if (this._active && this._event && (this._map.getBounds().contains(this._event.latlng) ||
            this._isOutsideMapBounds())) {
            this._stopLocate();
        } else {
            this._locateOnNextLocationFound = true;

            if (!this._active) {
                this._map.locate(this._locateOptions);
            }

            this._active = true;

            if (this.options.follow) {
                this._startFollowing();
            }

            this._clearError();

            if (this._event) {
                this._visualizeLocation();
            } else {
                this.setState('requesting');
            }
        }
    },

    _onLocationFound: function (e) {
        // no need to do anything if the location has not changed
        if (this._event &&
            (this._event.latlng.lat === e.latlng.lat &&
             this._event.latlng.lng === e.latlng.lng &&
             this._event.accuracy === e.accuracy)) {
            return;
        }

        if (!this._active) {
            return;
        }

        this._event = e;

        if (this.options.follow && this._following) {
            this._locateOnNextLocationFound = true;
        }

        this._visualizeLocation();
    },

    _startFollowing: function () {
        this._following = true;
        if (this.options.stopFollowingOnDrag) {
            this._map.on('dragstart', this._stopFollowing);
        }
    },

    _stopFollowing: function () {
        this._following = false;
        if (this.options.stopFollowingOnDrag) {
            this._map.off('dragstart', this._stopFollowing);
        }
        this._visualizeLocation();
    },

    _isOutsideMapBounds: function () {
        if (this._event === undefined) {
            return false;
        }
        return this._map.options.maxBounds &&
            !this._map.options.maxBounds.contains(this._event.latlng);
    },

    _visualizeLocation: function () {
        if (this._event.accuracy === undefined) {
            this._event.accuracy = 0;
        }

        var radius = this._event.accuracy;

        if (this._locateOnNextLocationFound) {
            if (this._isOutsideMapBounds()) {
                this.options.onLocationOutsideMapBounds(this);
            } else {
                /* global __PROJECT_LEAVE_MAX_ZOOM__:false*/
                this._map.setView(this._event.latlng, __PROJECT_LEAVE_MAX_ZOOM__);
                var zoom = this._map.dgProjectDetector.getProject().max_zoom_level || __PROJECT_LEAVE_MAX_ZOOM__;
                this._map.setZoom(zoom);
            }
            this._locateOnNextLocationFound = false;
        }

        // circle with the radius of the location's accuracy
        var style = {
            color: '#FFF',
            fillColor: '#FFF',
            fillOpacity: 0.4,
            weight: 0,
            opacity: 0.3
        };
        if (this.options.drawCircle) {
            if (!this._circle) {
                this._circle = L.circle(this._event.latlng, radius, style)
                    .addTo(this._layer);
            } else {
                this._circle.setLatLng(this._event.latlng).setRadius(radius);
            }
        }

        var distance, unit;
        if (this.options.metric) {
            distance = radius.toFixed(0);
            unit = 'meters';
        } else {
            distance = (radius * 3.2808399).toFixed(0);
            unit = 'feet';
        }

        // small inner marker
        var m = {
            icon: L.divIcon({
                className: 'dg-locate-pin',
                iconSize: [20, 20]
            })
        };

        if (!this._marker) {
            this._marker = L.marker(this._event.latlng, m)
                .bindLabel(this.t('you_are_here'))
                .addTo(this._layer);
        } else {
            this._marker.setLatLng(this._event.latlng);
        }

        L.DomEvent.on(this._marker, 'click', function () {
            this._map.fireEvent('dgLocateClick');
        });

        if (!this._container) {
            return;
        }

        this.setState('active');
    },

    _resetVariables: function () {
        this._active = false;
        this._following = false;
    },


    _stopLocate: function () {
        this._map.stopLocate();
        this._map.off('dragstart', this._stopFollowing);

        this.setState();
        this._resetVariables();

        this._layer.clearLayers();
        this._marker = undefined;
        this._circle = undefined;
        this._event = undefined;
    },

    _onLocationError: function (err) {
        // ignore time out error if the location is watched
        if (err.code === 3 && this._locateOptions.watch) {
            return;
        }

        this._stopLocate();
        this._error = L.DomUtil.create('div', 'dg-label dg-label_location-error', this._container);
        this._errorText = L.DomUtil.create('div', 'dg-label__content', this._error);
        this._errorText.innerHTML = this.t('cant_find');

        var self = this;
        setTimeout(function () {
            self._clearError();
        }, 3000);

        //show location error
        this.options.onLocationError(err);
    },

    _clearError: function () {
        if (this._error) {
            this._container.removeChild(this._error);
            this._error = undefined;
            this._errorText = undefined;
        }
    },

    _renderTranslation: function () {
        if (this._link) {
            this._link.title = this.t('button_title');
        }
        if (this._marker) {
            this._marker.bindLabel(this.t('you_are_here'));
        }
    }
});

L.DG.locate = function (options) {
    return new L.DG.Location(options);
};
