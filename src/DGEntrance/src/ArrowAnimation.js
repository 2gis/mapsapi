L.Path.mergeOptions({
    animation: false
});

L.Path.include({

    onAdd: function (map) {
       this.animations = {};
       this._map = map;

        if (!this._container) {
            this._initElements();
            this._initEvents();
        }

        this.projectLatlngs();
        this._addAnimations();
//        this._addMarker();

        if (this._container) {
            this._map._pathRoot.appendChild(this._container);
        }

        this.fire('add');

        map.on({
            'viewreset': this.projectLatlngs,
            'zoomstart': this._removeAnimations,
            'zoomend':  this._addAnimations
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

    onRemove: function (map) {
        map._pathRoot.removeChild(this._container);
        // Need to fire remove event before we set _map to null as the event hooks might need the obje_updatePathct
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
            'zoomend': this._addAnimations
        }, this);
    },

    _addAnimations: function () {
        this._updatePath();

        var animation = this.options.animation,
            points = this._parts[0];
        if (animation && points) {
            for (var i = 0, len = animation.length; i < len; i++) {
                this._addAnimation(animation[i], points);
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

    // TODO: refactor and move out this marker's code from this class!
/*    _markerPath: null,

    _addMarker: function () {
        var marker = this._createElement('marker', {
            id: 'arrow-marker',
            viewBox: '0 0 23 22',
            refX: '12',
            refY: '11',
            markerUnits: 'userSpaceOnUse',
            markerWidth: '23',
            markerHeight: '22',
            orient: 'auto'
        });

        this._markerPath = this._createElement('path');
        
        // Это описание path-а контура стрелки:
        // this._markerPath.setAttribute('d', 'M23,11.001c0-1.139-0.643-2.174-1.658-2.686l-16-7.998C4.188-0.261,2.792-0.034,1.879,0.88 l-1,1C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.12L4,9.244v3.515L0.879,15.88C0.293,16.466,0,17.231,0,18.001 c0,0.768,0.293,1.534,0.879,2.12l1,1c0.913,0.913,2.309,1.142,3.463,0.563l16-8C22.357,13.176,23,12.14,23,11.001L23,11.001z');
        // Это описание path-а самой стрелки:
        this._markerPath.setAttribute('d', 'M20,11 L4,3 3,4 7,8 7,14 3,18 4,19z');

        this._path.parentNode.appendChild(marker);
        marker.appendChild(this._markerPath);
        this._path.setAttribute('marker-end', 'url(#arrow-marker)');
    },

    _updateStyle: function () {
        // leaflet code
        if (this.options.stroke) {
            this._path.setAttribute('stroke', this.options.color);
            this._path.setAttribute('stroke-opacity', this.options.opacity);
            this._path.setAttribute('stroke-width', this.options.weight);
            if (this.options.dashArray) {
                this._path.setAttribute('stroke-dasharray', this.options.dashArray);
            } else {
                this._path.removeAttribute('stroke-dasharray');
            }
        } else {
            this._path.setAttribute('stroke', 'none');
        }
        if (this.options.fill) {
            this._path.setAttribute('fill', this.options.fillColor || this.options.color);
            this._path.setAttribute('fill-opacity', this.options.fillOpacity);
        } else {
            this._path.setAttribute('fill', 'none');
        }

        // marker path update
        if (this._markerPath !== null) {
            /*this._markerPath.setAttribute('stroke', this._path.getAttribute('stroke'));
            this._markerPath.setAttribute('stroke-opacity', this._path.getAttribute('stroke-opacity'));
            this._markerPath.setAttribute('stroke-width', this._path.getAttribute('stroke-width'));
            if (this.options.dashArray) {
                this._markerPath.setAttribute('stroke-dasharray', this._path.getAttribute('stroke-dasharray'));
            }
            else {
                this._markerPath.removeAttribute('stroke-dasharray');
            }*/
            //this._markerPath.setAttribute('fill', '#4b647d' /*this._path.getAttribute('fill')*/);
            /*this._markerPath.setAttribute('fill-opacity', this._path.getAttribute('fill-opacity'));
            this._markerPath.setAttribute('stroke-linejoin', this._path.getAttribute('stroke-linejoin'));
            this._markerPath.setAttribute('stroke-linecap', this._path.getAttribute('stroke-linecap'));*/
/*        };
    },*/
    // END TODO

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
