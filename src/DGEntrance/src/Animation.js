L.Path.mergeOptions({
    animation: false
});

L.Path.include({

    onAdd: function () {

       var animation = this.options.animation;
       this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._updatePath();

        if (animation) {
            for (var i = 0, len = animation.length; i < len; i++) {
                if (!animation[i].id) throw new Error('Animation object should specify Id property');
                this._addAnimation(animation[i], this._parts[0]);
            }
        }

        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }

        this.fire('add');

        map.on({
            'viewreset': this.projectLatlngs,
            'moveend': this._updatePath
        }, this);
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

    _addAnimation: function (options, points) {
        if (options._getValues) {
          options.values = options._getValues(points);
        }
        var animation = this._createElement('animate', options);
        this._path.appendChild(animation);
        this[options.id] = animation;
    },

    runAnimation: function (name) {
        this[name].beginElement();
        return this;
    },

    stopAnimation: function (name) {
        this[name].endElement();
        return this;
    }
});
