/*
Copyright (c) 2013 Dominik Moritz

This file is part of the leaflet locate control. It is licensed under the MIT license.
You can find the project at: https://github.com/domoritz/leaflet-locatecontrol
*/
L.DG.LocationControl = L.Control.extend({

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topleft',
        drawCircle: true,
        follow: true,  // follow with zoom and pan the user's location
        stopFollowingOnDrag: false, // if follow is true, stop following when map is dragged
        metric: true,
        onLocationError: function (err) {
            // this event is called in case of any location error
            // that is not a time out error.
            // console.log(err.message);
        },
        onLocationOutsideMapBounds: function (context) {
            // this event is repeatedly called when the location changes
            // console.log(context.t('outsideMapBoundsMsg'));
        },
        locateOptions: {}
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-locate leaflet-bar');

        if (!navigator.geolocation) {
            return container;
        }

        var self = this;
        this._layer = new L.LayerGroup();
        this._layer.addTo(map);
        this._event = undefined;

        this._locateOptions = {
            watch: true,  // if you overwrite this, visualization cannot be updated
            setView: true
        };
        // console.log(map.dgProjectDetector.getProject());
        L.extend(this._locateOptions, this.options.locateOptions);

        this._link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
        this._link.href = '#';
        this._link.title = this.t('button_title');

        L.DomEvent
            .on(this._link, 'click', L.DomEvent.stopPropagation)
            .on(this._link, 'click', L.DomEvent.preventDefault)
            .on(this._link, 'click', function () {
                if (self._active && self._event && (map.getBounds().contains(self._event.latlng) ||
                    isOutsideMapBounds())) {
                    stopLocate();
                } else {
                    L.extend(self._locateOptions, {
                        maxZoom: map.dgProjectDetector.getProject().max_zoom_level || 13
                    });

                    self._locateOnNextLocationFound = true;

                    if (!self._active) {
                        map.locate(self._locateOptions);
                    }

                    self._active = true;

                    if (self.options.follow) {
                        startFollowing();
                    }

                    clearError();

                    if (self._event) {
                        visualizeLocation();
                    } else {
                        L.DomUtil.addClass(self._container, 'requesting');
                        L.DomUtil.removeClass(self._container, 'active');
                    }
                }
            })
            .on(this._link, 'dblclick', L.DomEvent.stopPropagation);

        var onLocationFound = function (e) {
            // no need to do anything if the location has not changed
            if (self._event &&
                (self._event.latlng.lat === e.latlng.lat &&
                 self._event.latlng.lng === e.latlng.lng &&
                 self._event.accuracy === e.accuracy)) {
                return;
            }

            if (!self._active) {
                return;
            }

            self._event = e;

            if (self.options.follow && self._following) {
                self._locateOnNextLocationFound = true;
            }

            visualizeLocation();
        };

        var startFollowing = function () {
            self._following = true;
            if (self.options.stopFollowingOnDrag) {
                map.on('dragstart', stopFollowing);
            }
        };

        var stopFollowing = function () {
            self._following = false;
            if (self.options.stopFollowingOnDrag) {
                map.off('dragstart', stopFollowing);
            }
            visualizeLocation();
        };

        var isOutsideMapBounds = function () {
            if (self._event === undefined) {
                return false;
            }
            return map.options.maxBounds &&
                !map.options.maxBounds.contains(self._event.latlng);
        };

        var visualizeLocation = function () {
            if (self._event.accuracy === undefined) {
                self._event.accuracy = 0;
            }

            var radius = self._event.accuracy;

            // circle with the radius of the location's accuracy
            var style = {
                color: '#FFF',
                fillColor: '#FFF',
                fillOpacity: 0.4,
                weight: 0,
                opacity: 0.3
            };
            if (self.options.drawCircle) {
                if (!self._circle) {
                    self._circle = L.circle(self._event.latlng, radius, style)
                        .addTo(self._layer);
                } else {
                    self._circle.setLatLng(self._event.latlng).setRadius(radius);
                }
            }

            var distance, unit;
            if (self.options.metric) {
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

            if (!self._marker) {
                self._marker = L.marker(self._event.latlng, m)
                    .bindLabel(self.t('you_are_here'))
                    .addTo(self._layer);
            } else {
                self._marker.setLatLng(self._event.latlng);
            }

            L.DomEvent.on(self._marker, 'click', function () {
                map.fireEvent('dgLocateClick');
            });

            if (!self._container) {
                return;
            }

            L.DomUtil.removeClass(self._container, 'requesting');
            L.DomUtil.addClass(self._container, 'active');
        };

        var resetVariables = function () {
            self._active = false;
            self._following = false;
        };

        resetVariables();

        var stopLocate = function () {
            map.stopLocate();
            map.off('dragstart', stopFollowing);

            L.DomUtil.removeClass(self._container, 'requesting');
            L.DomUtil.removeClass(self._container, 'active');
            resetVariables();

            self._layer.clearLayers();
            self._marker = undefined;
            self._circle = undefined;
            self._event = undefined;
        };

        var onLocationError = function (err) {
            // ignore time out error if the location is watched
            if (err.code === 3 && this._locateOptions.watch) {
                return;
            }

            stopLocate();
            self._error = L.DomUtil.create('div', 'location-error', self._container);
            self._error.innerHTML = this.t('cant_find');
            setTimeout(function () {
                clearError();
            }, 3000);

            //show location error
            self.options.onLocationError(err);
        };

        var clearError = function () {
            if (self._error) {
                self._container.removeChild(self._error);
                self._error = undefined;
            }
        };

        // event hooks
        map.on('locationfound', onLocationFound, self);
        map.on('locationerror', onLocationError, self);

        return container;
    },

    _refreshTitles: function () {
        this._link.title = this.t('button_title');
    }
});

L.DG.locate = function (options) {
    return new L.DG.LocationControl(options);
};