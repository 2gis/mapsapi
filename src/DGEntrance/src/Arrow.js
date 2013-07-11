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
        this._marker = this._createElement('marker', {
            id: 'arrow-marker' + L.Util.stamp(this),
            viewBox: '0 0 23 22',
            refX: '12',
            refY: '11',
            markerUnits: 'userSpaceOnUse',
            markerWidth: '23',
            markerHeight: '22',
            orient: 'auto'
        });
        this._path.parentNode.appendChild(this._marker);
    },

    _initMarkerPath: function () {
        this._markerPath = this._createElement('path');

        // Это path-а контура стрелки из прототипа:
        // this._markerPath.setAttribute('d', 'M23,11.001c0-1.139-0.643-2.174-1.658-2.686l-16-7.998C4.188-0.261,2.792-0.034,1.879,0.88 l-1,1C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.12L4,9.244v3.515L0.879,15.88C0.293,16.466,0,17.231,0,18.001 c0,0.768,0.293,1.534,0.879,2.12l1,1c0.913,0.913,2.309,1.142,3.463,0.563l16-8C22.357,13.176,23,12.14,23,11.001L23,11.001z');
        
        this._markerPath.setAttribute('d', 'M20,11 L4,3 3,4 7,8 7,14 3,18 4,19z');
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
    },

    _initStyle: function () {
        L.Polyline.prototype._initStyle.call(this);

        if (this.options.stroke) {
            this._markerPath.setAttribute('stroke-linejoin', 'round');
            this._markerPath.setAttribute('stroke-linecap', 'round');
        }
        if (this.options.fill) {
            this._markerPath.setAttribute('fill-rule', 'evenodd');
        }
        if (this.options.pointerEvents) {
            this._markerPath.setAttribute('pointer-events', this.options.pointerEvents);
        }
        if (!this.options.clickable && !this.options.pointerEvents) {
            this._markerPath.setAttribute('pointer-events', 'none');
        }
        this._updateStyle();
    },

    _updateStyle: function () {
        L.Polyline.prototype._updateStyle.call(this);

        if (this.options.stroke) {
            this._markerPath.setAttribute('stroke', this.options.color);
            this._markerPath.setAttribute('stroke-opacity', this.options.opacity);
            this._markerPath.setAttribute('stroke-width', this.options.weight);
            if (this.options.dashArray) {
                this._markerPath.setAttribute('stroke-dasharray', this.options.dashArray);
            } else {
                this._markerPath.removeAttribute('stroke-dasharray');
            }
        } else {
            this._markerPath.setAttribute('stroke', 'none');
        }
        if (this.options.fill) {
            this._markerPath.setAttribute('fill', this.options.fillColor || this.options.color);
            this._markerPath.setAttribute('fill-opacity', this.options.fillOpacity);
        } else {
            this._markerPath.setAttribute('fill', 'none');
        }
    }

});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
