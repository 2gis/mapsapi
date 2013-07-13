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
            var stroke = this._createElement('stroke');
            stroke.endarrow = 'classic';
            this._container.appendChild(stroke);
        }

    });

};