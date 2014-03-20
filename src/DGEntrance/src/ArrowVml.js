// Extends DG.Entrance.Arrow with VML-specific rendering code
if (DG.Browser.vml) {

    DG.Entrance.Arrow.include({

        _endArrowStroke: null,

        // onAdd: function (map) { // (DG.Map)
        //     DG.Polyline.prototype.onAdd.call(this, map);

        //     map.on({'zoomend': this._updateEndArrow}, this);
        //     // map.on({'zoomend': this._updateStyle}, this);

        //     this._initEndArrow();
        // },

        // onRemove: function (map) { // (DG.Map)
        //     DG.Polyline.prototype.onRemove.call(this, map);

        //     map.off({'zoomend': this._updateEndArrow}, this);
        //     // map.off({'zoomend': this._updateStyle}, this);
        // },

        // _initElements: function () {
        //     this._map._initPathRoot();
        //     // this._initPath();
        //     this._initEndArrow();
        //     // this._initStyle();
        // },

        _initMarkers: function () {
            this._endArrowStroke = L.SVG.create('stroke');
            this._updateMarker();
            this._container.appendChild(this._endArrowStroke);
            // console.log(this._endArrowStroke);
        },

        _updateMarker: function () {
            var byZoom = this.options.byZoom,
                zoom = this._map.getZoom();

            this._endArrowStroke.endarrow = 
                (byZoom[zoom] && byZoom[zoom].vmlEndArrow) ? byZoom[zoom].vmlEndArrow : 'classic';

            // if (typeof byZoom[zoom] !== 'undefined' &&
            //     typeof byZoom[zoom].vmlEndArrow !== 'undefined') {

            //     this._endArrowStroke.endarrow = byZoom[zoom].vmlEndArrow;
            // }
            // else {
            //     this._endArrowStroke.endarrow = 'classic';
            //     console.log(this._endArrowStroke.endarrow);
            // }
        },

        _updateStyle: function () {
            var optionsByZoom =  this.options.byZoom,
                zoom = this._map.getZoom();

            // DG.Polyline.prototype._updateStyle.call(this);

            if (typeof optionsByZoom[zoom] !== 'undefined' &&
                typeof optionsByZoom[zoom].weight !== 'undefined') {
                this._stroke.weight = optionsByZoom[zoom].weight + 'px';
            }
            console.log(optionsByZoom[zoom].weight, this.options.weight);

            if (typeof this.options.visibility !== 'undefined') {
                this.getContainer().style.visibility = this.options.visibility;
            }
        }

        // _updateStyle: function (layer) {
        //     var stroke = layer._stroke,
        //         fill = layer._fill,
        //         options = layer.options,
        //         container = layer._container;

        //     container.stroked = !!options.stroke;
        //     container.filled = !!options.fill;

        //     if (options.stroke) {
        //         if (!stroke) {
        //             stroke = layer._stroke = L.SVG.create('stroke');
        //             container.appendChild(stroke);
        //         }
        //         stroke.weight = options.weight + 'px';
        //         stroke.color = options.color;
        //         stroke.opacity = options.opacity;

        //         if (options.dashArray) {
        //             stroke.dashStyle = L.Util.isArray(options.dashArray) ?
        //                 options.dashArray.join(' ') :
        //                 options.dashArray.replace(/( *, *)/g, ' ');
        //         } else {
        //             stroke.dashStyle = '';
        //         }
        //         stroke.endcap = options.lineCap.replace('butt', 'flat');
        //         stroke.joinstyle = options.lineJoin;

        //     } else if (stroke) {
        //         container.removeChild(stroke);
        //         layer._stroke = null;
        //     }

        //     if (options.fill) {
        //         if (!fill) {
        //             fill = layer._fill = L.SVG.create('fill');
        //             container.appendChild(fill);
        //         }
        //         fill.color = options.fillColor || options.color;
        //         fill.opacity = options.fillOpacity;

        //     } else if (fill) {
        //         container.removeChild(fill);
        //         layer._fill = null;
        //     }

        //     if (options.visibility) {
        //         layer.getContainer().style.visibility = options.visibility;
        //     }
        // }

    });

}