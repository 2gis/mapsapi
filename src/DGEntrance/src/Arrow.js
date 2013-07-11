L.DG.Entrance.Arrow = L.Polyline.extend({

    _marker: null,
    _markerPath: null,

    initialize: function (latlngs, options) { // (Array, Object)
        var options = options || {},
            animation = this.getArrowAnimation(latlngs.length);

        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    _initElements: function () {
        this._map._initPathRoot();
        this._initPath();
        this._initMarker();
        this._initMarkerPath();
        this._initStyle();
    },

    _initMarker: function () {
        this._marker = this._createElement('marker', this.options.marker[18].attr);
        this._marker.id = 'arrow-marker-' + L.Util.stamp(this);
        this._path.parentNode.appendChild(this._marker);
    },

    _initMarkerPath: function () {
        this._markerPath = this._createElement('path', this.options.marker[18].path);
        this._marker.appendChild(this._markerPath);
        this._path.setAttribute('marker-end', 'url(#' + this._marker.id + ')');

        // TODO:
        /**
         * 1. Атрибут "d" надо устанавливать как-то динамически, исходя из того какую стрелку мы инитим - фоновую или основную, после этого включить фоновую стрелку в L.DG.Entrance
         * 2. При zoomOut-е наконечник становится адово большим, видимо опять дело в "d" и его надо динамически пересчитывать при масштабировании карты
         * 3. Надо разобраться, в какую сторону все же должна смотреть стрелка. Написал Денису Телюху из WAPI вопрос о том, с какой стороны начало стрелки и с какой конец в прилетающем WKT
         * 4. Надо чтоб стрелка не смещалась от входа при анимации
         * 5. Надо разобраться, почему падают тесты и пофиксить баги, если нужно
         * 6. Надо подумать, что еще не покрыто тестами и стоит покрыть
         * 7. С L.DG.Entrance.EventHandler так и не успел разобраться, это тоже надо
         */
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
