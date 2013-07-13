// Extends L.DG.Entrance.Arrow with VML-specific rendering code
if (L.Browser.vml) {

    L.DG.Entrance.Arrow.include({

        _initElements: function () {
            this._map._initPathRoot();
            this._initPath();
            this._initEndArrow();
            this._initStyle();
        },

        _initEndArrow: function () {
            var byZoom = this.options.byZoom,
                zoom = this._map.getZoom(),
                stroke = this._createElement('stroke');

            if (typeof byZoom[zoom] !== 'undefined' &&
                typeof byZoom[zoom].vmlEndArrow !== 'undefined') {
                
                stroke.endarrow = byZoom[zoom].vmlEndArrow;
            }
            else {
                stroke.endarrow = 'classic';
            }
            
            this._container.appendChild(stroke);
        }

    });

};