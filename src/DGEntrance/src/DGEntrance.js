/*
 * DG.Entrance is a main class that hosts actual arrow layers
 * It orchestrates animation and provides user space methods like .show() and .hide()
 */

DG.Entrance = DG.FeatureGroup.extend({

    options: {
        vectors: [],

        fillColor: '#0085a0',
        strokeColor: '#fff',

        enableAnimation: true,
        interactive: false,

        autoClose: true
    },

    initialize: function(options) {
        DG.LayerGroup.prototype.initialize.call(this);

        DG.setOptions(this, options);

        this._bounds =
            new DG.LatLngBounds();
        this._animations = {
            bounce: DG.animation(DG.Entrance.BOUNCE_ANIMATION),
            path: DG.animation(DG.Entrance.PATH_ANIMATION)
        };

        this._initArrows();

        this._isShown = false;
    },

    onAdd: function(map) {
        DG.LayerGroup.prototype.onAdd.call(this, map);
        this.show();
    },

    onRemove: function(map) {
        this.hide();
        DG.LayerGroup.prototype.onRemove.call(this, map);
    },

    getEvents: function() {
        var events = {};

        if (this.options.autoClose) {
            events['layeradd'] = this._removeEntrance;  //  eslint-disable-line dot-notation
        }
        if (this.options.enableAnimation) {
            events['zoomend'] = this._animate;          //  eslint-disable-line dot-notation
        }

        return events;
    },

    show: function(fitBounds) {
        if (this._layers) {
            if (fitBounds) {
                this.fitBounds();
            }
            if (!this._isShown) {
                this._isShown = true;
                this.eachLayer(function(arrow) {
                    arrow.setVisibility(true);
                });
                if (this.options.enableAnimation) {
                    this._animate();
                }
                this._map.fire('entranceshow');
            }
        }

        return this;
    },

    hide: function() {
        if (this._layers && this._isShown) {
            this._isShown = false;
            this.eachLayer(function(arrow) {
                arrow.setVisibility(false);
            });
            this._map.fire('entrancehide');
        }

        return this;
    },

    isShown: function() {
        return this._isShown;
    },

    getBounds: function() {
        return this._bounds;
    },

    setFillColor: function(color) {
        this.eachLayer(function(arrow) {
            arrow.setStyle({fillColor: color});
        });
    },

    setStrokeColor: function(color) {
        this.eachLayer(function(arrow) {
            arrow.setStyle({color: color});
        });
    },

    _initArrows: function() {
        var base = {
            color: this.options.strokeColor,
            fillColor: this.options.fillColor,
            interactive: this.options.interactive
        };

        this.options.vectors
            .map(function(vector) {
                return DG.Wkt.toLatLngs(vector);
            })
            .forEach(function(latlngs) {
                var options = DG.Util.create(base),
                    bounds = DG.latLngBounds(latlngs);

                this._bounds.extend(bounds);

                options.latlngs = latlngs;
                options.bounds = bounds;
                if (this.options.enableAnimation) {
                    if (latlngs.length > 2) {
                        options.animation = this._animations.path;
                    } else {
                        options.animation = this._animations.bounce;
                        options.distance = true;
                    }
                }

                this.addLayer(DG.entrance.arrow(options));
            }, this);
    },


    _animate: function() {
        if (this._isShown) {
            this._animations.bounce.start();
            this._animations.path.start();
        }
    },

    //  Current logic of next four methods extracted from original arrow's implementation
    fitBounds: function() {
        var map = this._map, fitZoom,
            bounds = this.getBounds();

        if (!map.getBounds().contains(bounds) || !this._isAllowedZoom()) {
            fitZoom = this._getFitZoom();
            if (!map.projectDetector.getProject()) {
                map.once('moveend', function() {
                    map.setZoom(this._getFitZoom());
                }, this);
            }
            map.setView(bounds.getCenter(), fitZoom, {animate: true});
        }

        return this;
    },

    _getFitZoom: function() {
        var project = this._map.projectDetector.getProject();
        return project ? project.maxZoom : DG.Entrance.SHOW_FROM_ZOOM;
    },

    _isAllowedZoom: function() {
        return this._map.getZoom() >= DG.Entrance.SHOW_FROM_ZOOM;
    },

    _removeEntrance: function(e) {
        if (e.layer instanceof DG.Popup ||
            (e.layer instanceof DG.Entrance && e.layer !== this)) {

            this.remove();
        }
    }
});

DG.entrance = function(options) {
    return new DG.Entrance(options);
};

DG.Entrance.SHOW_FROM_ZOOM = 16;
DG.Entrance.PATH_ANIMATION = {
    animation: {
        'function': DG.Animation.EASE_IN_OUT,
        'duration': 750
    }
};
DG.Entrance.BOUNCE_ANIMATION = {
    animation: [
        {'function': DG.Animation.EASE_IN_OUT, 'duration': 250, 'frames': {'distance': {'from': 0, 'to': 0.6}}},
        {'function': DG.Animation.EASE_IN, 'duration': 135, 'frames': {'distance': {'from': 0.6, 'to': 0}}},
        {'function': DG.Animation.EASE_OUT, 'duration': 135, 'frames': {'distance': {'from': 0, 'to': 0.16}}},
        {'function': DG.Animation.EASE_IN, 'duration': 90, 'frames': {'distance': {'from': 0.16, 'to': 0}}},
        {'function': DG.Animation.EASE_OUT, 'duration': 90, 'frames': {'distance': {'from': 0, 'to': 0.06}}},
        {'function': DG.Animation.EASE_IN, 'duration': 50, 'frames': {'distance': {'from': 0.06, 'to': 0}}}
    ]
};
