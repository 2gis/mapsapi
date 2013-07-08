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

                this._hidePath();
                this._addAnimation(animation[i]);
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
        var options = options || {};

        var object = document.createElementNS(L.Path.SVG_NS, type);
        for (var key in options) {
            object.setAttribute(key, options[key]);
        }
        return object;
    },

    _hidePath: function () {
        this.setStyle({opacity: 0});
        return this;
    },

    _addAnimation: function (options, i) {
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
