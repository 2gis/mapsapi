DG.Entrance2 = DG.FeatureGroup.extend({

    options: {
        vectors: [],

        fillColor: '#0085a0',
        strokeColor: '#fff',

        enableAnimation: true,
        interactive: false,

        autoClose: true
    },

    initialize: function (options) {
        DG.setOptions(this, options);

        DG.FeatureGroup.prototype.initialize.call(this);
        
        this._animations = {
            bounce: DG.animation(DG.Entrance.BOUNCE_ANIMATION),
            path: DG.animation(DG.Entrance.PATH_ANIMATION)
        };

        this._initArrows();
    },

    onAdd: function (map) {
        DG.FeatureGroup.prototype.onAdd.call(this, map);

        this._map = map;
        if (this.options.autoClose) {
            map.on('layeradd', this._removeEntrance, this);
        }
        if (this.options.enableAnimation) {
            map.on('zoomend', this._animate, this);
        }

        this._isShown = false;

        this.show(false);
    },

    onRemove: function (map) {
        this._map.off('zoomend', this._animate, this);
        this._map.off('layeradd', this._removeEntrance, this);
        DG.FeatureGroup.prototype.onRemove.call(this, map);

        this._isShown = false;
        this._map.fire('entrancehide');
        this._map = null;
    },

    show: function (fitBounds) {
        if (this._layers) {
            // if (fitBounds !== false) {
            //     this.fitBounds();
            // }
            if (!this._isShown) {
                this._isShown = true;
                this.eachLayer(function (arrow) {
                    arrow.setVisibility(true);
                });
                this._map.fire('entranceshow');
            }
            this._animate();
        }

        return this;
    },

    hide: function () {
        if (this._layers && this._isShown) {
            this._isShown = false;
            this.eachLayer(function (arrow) {
                arrow.setVisibility(false);
            });
            this._map.fire('entrancehide');
        }

        return this;
    },

    isShown: function () {
        return this._isShown;
    },

    setFillColor: function (color) {
        this.eachLayer(function (arrow) {
            arrow.setStyle({fillColor: color});
        });
    },

    setStrokeColor: function (color) {
        this.eachLayer(function (arrow) {
            arrow.setStyle({color: color});
        });
    },

    _initArrows: function () {
        var options = {
            color: this.options.strokeColor,
            fillColor: this.options.fillColor,
            shape: DG.Entrance.Arrow.SHAPE,
            animation: null
        };

        this.options.vectors
            .map(function (vector) {
                return DG.Wkt.toLatLngs(vector);
            })
            .forEach(function (latlngs) {
                if (this.options.enableAnimation) {
                    options.animation = latlngs.length > 2
                        ? this._animations.bounce
                        : this._animations.path;
                } else {
                    options.animation = null;
                }
                this.addLayer(DG.Entrance.arrow2(latlngs, options));
            }, this);
    },

    _getFitZoom: function () {
        return this._map.projectDetector.getProject().maxZoom || DG.Entrance.SHOW_FROM_ZOOM;
    },

    fitBounds: function () {
        var map = this._map,
            fitZoom,
            bounds = this.getBounds();

        if (!map.getBounds().contains(bounds) || !this._isAllowedZoom()) {
            fitZoom = this._getFitZoom();
            if (!map.projectDetector.getProject()) {
                map.once('moveend', function () {
                    map.setZoom(this._getFitZoom());
                }, this);
            }
            map.setView(bounds.getCenter(), fitZoom, {
                animate: true
            });
        }

        return this;
    },

    _isAllowedZoom: function () {
        return this._map.getZoom() >= DG.Entrance.SHOW_FROM_ZOOM;
    },

    _removeEntrance: function (e) {
        if (e.layer instanceof DG.Popup ||
            (e.layer instanceof DG.Entrance && e.layer !== this)) {

            this.remove();
        }
    },

    _animate: function (e) {
        if (this._isShown) {
            this._animations.bounce.start();
            this._animations.path.start();
        }
    }
});

DG.entrance2 = function (options) {
    return new DG.Entrance2(options);
};

DG.Entrance.SHOW_FROM_ZOOM = 16;
DG.Entrance.PATH_ANIMATION = {
    animation: {
        function: DG.Animation.EASE,
        duration: 2 * 1000
    }
};
DG.Entrance.BOUNCE_ANIMATION = {
    animation: {
        function: DG.Animation.EASE,
        duration: 2 * 1000
    }
};

