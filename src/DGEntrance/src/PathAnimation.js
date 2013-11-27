L.Path.ANIMATION_AVAILABLE =
    L.Browser.svg &&
    navigator.userAgent.toLowerCase().indexOf('presto') === -1 &&
    Object.prototype.toString.call(
        document.createElementNS(L.Path.SVG_NS, 'animate').beginElement) === '[object Function]';

if (L.Path.ANIMATION_AVAILABLE) {

    L.Map.include({
        _initPathRoot: function () {
            if (!this._pathRoot) {
                this._pathRoot = L.Path.prototype._createElement('svg');
                this._panes.overlayPane.appendChild(this._pathRoot);
            }
            if (this.options.zoomAnimation && L.Browser.any3d) {
                this._pathRoot.setAttribute('class', ' leaflet-zoom-animated');

                this.on({
                    'zoomanim': this._animatePathZoom,
                    'zoomend': this._endPathZoom
                });
            } else {
                this._pathRoot.setAttribute('class', ' leaflet-zoom-hide');
            }

            this.on('moveend', this._updateSvgViewport);
            this._updateSvgViewport();
        }
    });

    //Fix animation for safari, it needs svg element in DOM on page load
    L.Map.addInitHook(function () {
        this._pathRoot = L.Path.prototype._createElement('svg');
        this._panes.overlayPane.appendChild(this._pathRoot);
    });

    L.Path.include({

        runAnimation: function () {
            var animationEl = this._animationEl = this._addAnimation();

            if (animationEl) {
                animationEl.beginElement();
                this._removeAnimation(animationEl);
            }

            return this;
        },

        stopAnimation: function (name) { // (String) -> L.Path
            if (this.animations[name]) {
                this.animations[name].endElement();
            }
            return this;
        },

        _addAnimation: function () { // () -> SVGAnimateElement|null
            var animOptions = this.options.animation,
                points = this._originalPoints,
                animationEl = null;

            if (animOptions && points.length > 0) {
                animationEl = this._createElement('animate');

                //calculate values if attributeName: 'd' was used to animate
                if (animOptions.getValues) {
                    animOptions.values = animOptions.getValues(points);
                }

                for (var key in animOptions) {
                    if (animOptions.hasOwnProperty(key) && {}.toString.call(animOptions[key]) !== '[object Function]') {
                        animationEl.setAttribute(key, animOptions[key]);
                    }
                }

                this._path.appendChild(animationEl);
            }

            return animationEl;
        },

        _removeAnimation: function (animationEl) {
            var self = this;
            this._map.once('zoomstart', function () {
                if (animationEl) {
                    self._path.removeChild(animationEl);
                }
                self._animationEl = null;
            });
        }
    });
}
