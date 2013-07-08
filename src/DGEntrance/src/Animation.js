L.Path.mergeOptions({
    animate: {}
});

L.Path.include({

    onAdd: function () {

       console.log(this.options);
       this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._updatePath();
        this._createAnimation();

        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }

        this.fire('add');

        map.on({
            'viewreset': this.projectLatlngs,
            'moveend': this._updatePath
        }, this);
    },

    _createElement: function (type, options, id) {
        var options = options || {};
        if(id) {
            options.id = id;
        }
        var object = document.createElementNS(L.Path.SVG_NS, type);
        for (var key in options) {
            object.setAttribute(key, options[key]);
        }
        return object;
    },

    animateArrowGeom: {
        attributeName: 'opacity',
        attributeType: "CSS",
        values: "0;1",
        fill: 'freeze',
        calcMode: 'linear',
        dur: '1.2s',
        begin: 'indefinite'
    },

    _createAnimation: function () {
        this._animate = this._createElement('animate', this.animateArrowGeom, 'arrowAnimate'),
        this._container.appendChild(this._animate);
    }
});
