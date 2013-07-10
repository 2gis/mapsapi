L.Path.mergeOptions({
    animation: false
});

L.Path.include({

    onAdd: function () {

       this.animations = {};
       this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._addAnimations();


        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }

        this.fire('add');

        map.on({
            'viewreset': this.projectLatlngs,
            'zoomstart': this._removeAnimations,
            'moveend':  this._addAnimations
        }, this);
    },

    runAnimation: function (name) {
        this.animations[name].beginElement();
        return this;
    },

    stopAnimation: function (name) {
        this.animations[name].endElement();
        return this;
    },

    _addAnimations: function () {
        this._updatePath();

        var animation = this.options.animation;
        if (animation) {
            for (var i = 0, len = animation.length; i < len; i++) {
                this._addAnimation(animation[i], this._parts[0]);
            }
        }
    },

    _addAnimation: function (options, points) {
        if (options._getValues) {
          options.values = options._getValues(points);
        }
        var animation = this._createElement('animate', options);
        this._path.appendChild(animation);

        //store references to added animation
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
                this._path.removeChild(animations[animation]);
            }
        }
    }
});
