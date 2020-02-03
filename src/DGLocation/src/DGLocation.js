DG.Control.Location = DG.RoundControl.extend({

    statics: {
        Dictionary: {}
    },

    options: {
        iconClass: 'locate',
        position: DG.Browser.mobile ? 'bottomright' : 'topleft',
        drawCircle: true,
        follow: true,  // follow with zoom and pan the user's location
        stopFollowingOnDrag: false, // if follow is true, stop following when map is dragged
        metric: true,
        onLocationError: function(/*err*/) {
            // this event is called in case of any location error
            // that is not a time out error.
            // console.log(err.message);
        },
        onLocationOutsideMapBounds: function(/*context*/) {
            // this event is repeatedly called when the location changes
            // console.log(context.t('outsideMapBoundsMsg'));
        },
        locateOptions: {}
    },

    initialize: function(options) {
        DG.Util.setOptions(this, options);

        if (!navigator.geolocation) {
            this._disable = true;
            return;
        }

        this._event = undefined;

        this._locateOptions = {
            watch: true,  // if you overwrite this, visualization cannot be updated
            setView: true,
            maximumAge: Infinity,
            maxZoom: Infinity
        };
        DG.extend(this._locateOptions, this.options.locateOptions);

        this._resetVariables();

        this.on({
            'click': this._handleLocate,
            'add': this._initLocate
        });
    },

    _initLocate: function() {
        this._layer = new DG.LayerGroup();
        this._layer.addTo(this._map);

        // event hooks
        this._map.on({
            'locationfound': this._onLocationFound,
            'locationerror': this._onLocationError
        }, this);
    },

    _handleLocate: function() {
        if (this._active && (!this._event ||
            (this._map.getBounds().contains(this._event.latlng) ||
            this._isOutsideMapBounds()))) {
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

    _onLocationFound: function(e) {
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

    _startFollowing: function() {
        this._following = true;
        if (this.options.stopFollowingOnDrag) {
            this._map.on('dragstart', this._stopFollowing, this);
        }
    },

    _stopFollowing: function() {
        this._following = false;
        if (this.options.stopFollowingOnDrag) {
            this._map.off('dragstart', this._stopFollowing, this);
        }
        this._visualizeLocation();
    },

    _isOutsideMapBounds: function() {
        if (this._event === undefined) {
            return false;
        }
        return this._map.options.maxBounds &&
            !this._map.options.maxBounds.contains(this._event.latlng);
    },

    _visualizeLocation: function() {
        if (this._event.accuracy === undefined) {
            this._event.accuracy = 0;
        }

        var radius = this._event.accuracy;

        if (this._locateOnNextLocationFound) {
            if (this._isOutsideMapBounds()) {
                this.options.onLocationOutsideMapBounds(this);
            } else if (this._locateOptions.setView) {
                var project = this._map.projectDetector.getProject();
                var zoom = project ? project.maxZoom : DG.config.projectLeaveMaxZoom;
                zoom = Math.min(this._locateOptions.maxZoom, zoom);
                this._map.setView(this._event.latlng, zoom);
            }
            this._locateOnNextLocationFound = false;
        }

        // circle with the radius of the location's accuracy
        var style = {
            clickable: false,
            color: '#FFF',
            fillColor: '#FFF',
            fillOpacity: 0.4,
            weight: 0,
            opacity: 0.3
        };
        if (this.options.drawCircle) {
            if (!this._circle) {
                this._circle = DG.circle(this._event.latlng, radius, style)
                    .addTo(this._layer);
            } else {
                this._circle.setLatLng(this._event.latlng).setRadius(radius);
            }
        }

        var markerClass = 'dg-location__pin';

        markerClass += this._following ? (' ' + markerClass + 'state_following') : '';
        // small inner marker
        var m = {
            icon: DG.divIcon({
                className: markerClass,
                iconSize: [20, 20]
            })
        };

        if (!this._marker) {
            this._marker = DG.marker(this._event.latlng, m)
                .bindLabel(this.t('you_are_here'))
                .addTo(this._layer);
        } else {
            this._marker.setLatLng(this._event.latlng);
        }

        DG.DomEvent.on(this._marker, 'click', function() {
            this._map.fireEvent('dgLocateClick');
        }, this);

        if (!this._container) {
            return;
        }

        this.setState('active');
    },

    _resetVariables: function() {
        this._active = false;
        this._following = false;
    },


    _stopLocate: function() {
        this._map.stopLocate();
        this._map.off('dragstart', this._stopFollowing);

        this.setState();
        this._resetVariables();

        this._layer.clearLayers();
        this._marker = undefined;
        this._circle = undefined;
        this._event = undefined;
    },

    _onLocationError: function(err) {
        // ignore time out error if the location is watched
        if (err.code === 3 && this._locateOptions.watch) {
            return;
        }

        this._stopLocate();
        this._error = DG.DomUtil.create('div', 'dg-label dg-label_name_location-error', this._container);
        this._errorText = DG.DomUtil.create('div', 'dg-label__content', this._error);
        this._errorText.innerHTML = this.t('cant_find');

        var self = this;
        setTimeout(function() {
            self._clearError();
        }, 3000);

        //show location error
        this.options.onLocationError(err);
    },

    _clearError: function() {
        if (this._error) {
            this._container.removeChild(this._error);
            this._error = undefined;
            this._errorText = undefined;
        }
    },

    _renderTranslation: function() {
        if (this._link) {
            this._link.title = this.t('button_title');
        }
        if (this._marker) {
            this._marker.bindLabel(this.t('you_are_here'));
        }
    }
});

DG.control.location = function(options) {
    return new DG.Control.Location(options);
};

DG.Map.addInitHook(function() {
    if (this.options.locationControl) {
        this.locationControl = DG.control.location(this.options.locationControl);
        this.addControl(this.locationControl);
    }
});
