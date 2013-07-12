L.Path.include({

    onAdd: function (map) {
       this.animations = {};
       this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._updatePath();
        this._addAnimations();

        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }

        this.fire('add');

        map.on({
            'viewreset': this.projectLatlngs,
            'zoomstart': this._removeAnimations,
            'zoomend':  this._addAnimations,
            'moveend': this._updatePath
        }, this);
    },

    runAnimation: function (name) {
        if (this.animations[name]) {
            this.animations[name].beginElement();
        }
        return this;
    },

    stopAnimation: function (name) {
        if (this.animations[name]) {
            this.animations[name].endElement();
        }
        return this;
    },

    onRemove: function (map) {
        map._pathRoot.removeChild(this._container);
        // Need to fire remove event before we set _map to null as the event hooks might need the object
        this.fire('remove');
        this._map = null;
        this.animations = {};

        if (L.Browser.vml) {
            this._container = null;
            this._stroke = null;
            this._fill = null;
        }

        map.off({
            'viewreset': this.projectLatlngs,
            'zoomstart': this._removeAnimations,
            'zoomend': this._addAnimations,
            'moveend': this._updatePath
        }, this);
    },

    _addAnimations: function () {
        var animation = this.options.animation;
        if (animation && this._originalPoints.length > 0) {
            for (var i = 0, len = animation.length; i < len; i++) {
                this._addAnimation(animation[i], this._originalPoints);
            }
        }
    },

    _addAnimation: function (options, points) { // (Object, Array)
        if (options.getValues) {
          //calculate values if attributeName: 'd' was used to animate
          options.values = options.getValues(points);
        }
        var animation = this._createElement('animate', options);
        this._path.appendChild(animation);
        this.animations[options.id] = animation;
    },

    _createElement: function (type, options) {
        var options = options || {},
            object = {},
            key;

        object = document.createElementNS(L.Path.SVG_NS, type);
        for (key in options) {
            if (Object.prototype.toString.call(options[key]) !== '[object Function]') {
                object.setAttribute(key, options[key]);
            }
        }

        return object;
    },

    _removeAnimations: function () {
        var animations = this.animations;
        for(var animation in animations) {
            if (animations.hasOwnProperty(animation)) {
                //for correct geometry presentation while zooming
                this._path.removeChild(animations[animation]);
            }
        }
        this.animations = {};
    }
});
