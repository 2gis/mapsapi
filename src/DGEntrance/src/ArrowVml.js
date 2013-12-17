// Extends L.DG.Entrance.Arrow with VML-specific rendering code
if (L.Browser.vml) {

    L.DG.Entrance.Arrow.include({

        _endArrowStroke: null,

        onAdd: function (map) { // (L.Map)
            L.Polyline.prototype.onAdd.call(this, map);

            map.on({'zoomend': this._updateEndArrow}, this);
            map.on({'zoomend': this._updateStyle}, this);
        },

        onRemove: function (map) { // (L.Map)
            L.Polyline.prototype.onRemove.call(this, map);

            map.off({'zoomend': this._updateEndArrow}, this);
            map.off({'zoomend': this._updateStyle}, this);
        },

        _initElements: function () {
            this._map._initPathRoot();
            this._initPath();
            this._initEndArrow();
            this._initStyle();
        },

        _initEndArrow: function () {
            this._endArrowStroke = this._createElement('stroke');
            this._updateEndArrow();
            this._container.appendChild(this._endArrowStroke);
        },

        _updateEndArrow: function () {
            var byZoom = this.options.byZoom,
                zoom = this._map.getZoom();

            if (typeof byZoom[zoom] !== 'undefined' &&
                typeof byZoom[zoom].vmlEndArrow !== 'undefined') {

                this._endArrowStroke.endarrow = byZoom[zoom].vmlEndArrow;
            }
            else {
                this._endArrowStroke.endarrow = 'classic';
            }
        },

        _updateStyle: function () {
            var optionsByZoom =  this.options.byZoom,
                zoom = this._map.getZoom();

            L.Polyline.prototype._updateStyle.call(this);

            if (typeof optionsByZoom[zoom] !== 'undefined' &&
                typeof optionsByZoom[zoom].weight !== 'undefined') {
                this._stroke.weight = optionsByZoom[zoom].weight + 'px';
            }

            if (typeof this.options.visibility !== 'undefined') {
                this._container.style.visibility = this.options.visibility;
            }
        }

    });

}