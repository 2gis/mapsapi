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
                'moveend': this._updatePath,
                'movestart': this._removeAnimations
            }, this);

        },

        runAnimation: function (name, once) { // (String, Boolean) -> L.Path
            var res, delay, self = this;
            //TODO Add only one animation wich you wanna run. Delete addAnimations.
            this._addAnimations();

            if (this.animations[name]) {
                this.animations[name].beginElement();

                if (once) {
                    delay = (this.animations[name].getAttribute('dur')).replace('s', '') * 1000;
                    window.setTimeout(function() {
                        self._removeAnimation(name);
                    }, delay);
                }
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

            this._removeAnimations();
        },

        _addAnimations: function () {
            this.animations = {};

            var animation = this.options.animation;
            if (animation && this._originalPoints.length > 0) {
                for (var i = 0, len = animation.length; i < len; i++) {
                    this._addAnimation(animation[i], this._originalPoints);
                }
            }
        },

        _addAnimation: function (options, points) { // (Object, Array)
            var animation = this._createElement('animate');

            //calculate values if attributeName: 'd' was used to animate
            if (options.getValues) {
                options.values = options.getValues(points);
            }

            for (var key in options) {
                if (options.hasOwnProperty(key) && {}.toString.call(options[key]) !== '[object Function]') {
                    animation.setAttribute(key, options[key]);
                }
            }

            this._path.appendChild(animation);
            this.animations[options.id] = animation;
        },

        _removeAnimations: function () {
            var animations = this.animations;
            for(var animation in animations) {
                if (animations.hasOwnProperty(animation)) {
                    //for correct geometry presentation while zooming
                    this._removeAnimation(animation);
                }
            }
        },

        _removeAnimation: function (name) { // (String)
            if (this.animations[name]) {
                this._path.removeChild(this.animations[name]);
                delete this.animations[name];
            }
        }
    });
}
