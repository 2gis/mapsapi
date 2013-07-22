L.Path.ANIMATION_AVAILABLE =
    L.Browser.svg &&
    navigator.userAgent.toLowerCase().indexOf('presto') === -1 &&
    Object.prototype.toString.call(
        document.createElementNS(L.Path.SVG_NS, 'animate').beginElement) === '[object Function]';

if (L.Path.ANIMATION_AVAILABLE) {

    //Fix animation for safari, it needs svg element in DOM on page load
    L.Map.addInitHook(function () {
        this._initPathRoot();
    });
    L.Path.include({

        _animationEl: null,

        onAdd: function (map) { // (L.Map)
            this._map = map;

            if (!this._container) {
                this._initElements();
                this._initEvents();
            }

            this.projectLatlngs();
            this._updatePath();

            if (this._container) {
                this._map._pathRoot.appendChild(this._container);
            }

            this.fire('add');

            map.on({
                'viewreset': this.projectLatlngs,
                'moveend': this._updatePath
                'movestart': this._removeAnimation
            }, this);

        },

        runAnimation: function () {
            var res, delay, self = this;

            this._addAnimation();

            if (this._animationEl) {
                this._animationEl.beginElement();
                delay = (this._animationEl.getAttribute('dur')).replace('s', '') * 1000;
                window.setTimeout(function() {
                    self._removeAnimation;
                }, delay);
            }

            return this;
        },

        stopAnimation: function (name) { // (String) -> L.Path
            if (this.animations[name]) {
                this.animations[name].endElement();
            }
            return this;
        },

        onRemove: function (map) { // (L.Map)
            map._pathRoot.removeChild(this._container);
            // Need to fire remove event before we set _map to null as the event hooks might need the object
            this.fire('remove');
            this._map = null;

            if (L.Browser.vml) {
                this._container = null;
                this._stroke = null;
                this._fill = null;
            }

            map.off({
                'viewreset': this.projectLatlngs,
                'moveend': this._updatePath
            }, this);

            this._removeAnimation();
        },

        _addAnimation: function () {
            var animOptions = this.options.animation,
                points = this._originalPoints;

            if (animOptions && points.length > 0) {
                this._animationEl = this._createElement('animate');

                //calculate values if attributeName: 'd' was used to animate
                if (animOptions.getValues) {
                    animOptions.values = animOptions.getValues(points);
                }

                for (var key in animOptions) {
                    if (animOptions.hasOwnProperty(key) && {}.toString.call(animOptions[key]) !== '[object Function]') {
                        this._animationEl.setAttribute(key, animOptions[key]);
                    }
                }

                this._path.appendChild(this._animationEl);
            }
        },

        _removeAnimation: function () {
            if (this._animationEl) {
                this._path.removeChild(this._animationEl);
                this._animationEl = null;
            }
        }
    });
}
