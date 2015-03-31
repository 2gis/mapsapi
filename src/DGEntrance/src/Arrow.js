DG.Entrance.Arrow = DG.Polyline.extend({
    initialize: function (latlngs, options) { // (Array, Object)
        options = options || {};

        this._setLatLngs(latlngs);

        if (DG.Path.ANIMATION_AVAILABLE) {
            options.animation = this.getArrowAnimation(this._convertLatLngs(latlngs));
        }

        this._markers = [];

        L.setOptions(this, options);
    },

    onAdd: function (map) { // (DG.Map)
        var renderer = this._renderer = map.getArrowRenderer();
        renderer._initPath(this);

        // defined in children classes
        this._project();
        this._update();
        this._updateStyleByZoom();

        renderer._addPath(this);
        renderer._initMarkers(this);
    },

    onRemove: function (map) { // (DG.Map)
        DG.Polyline.prototype.onRemove.call(this, map);

        this._renderer._removeMarkers(this);
    },

    getEvents: function () {
        return {
            viewreset: this._project,
            move: this._update,
            zoomend: this._updateStyleByZoom
        };
    },

    _projectLatlngs: function (latlngs, result) {
        DG.Polyline.prototype._projectLatlngs.call(this, latlngs, result);
        this._offsetLastPathPoint();
    },

    _update: function () {
        DG.Polyline.prototype._update.call(this);

        this._renderer._updateMarker(this);
    },

    _updateStyleByZoom: function () {
        var optionsByZoom = this.options.byZoom,
            zoom = this._map.getZoom();

        this.setStyle(optionsByZoom[zoom]);
    },

    _offsetLastPathPoint: function () {
        var origPoints = this._rings[0],
            style = this.options.byZoom[this._map.getZoom()],
            pointsLen = origPoints.length,
            lastSegmentLen = origPoints[pointsLen - 1].distanceTo(origPoints[pointsLen - 2]),
            lastSegmentInPercents,
            offsetVector,
            offsetTo;

        if (style) {
            offsetVector = {
                x: origPoints[pointsLen - 1].x - origPoints[pointsLen - 2].x,
                y: origPoints[pointsLen - 1].y - origPoints[pointsLen - 2].y
            };

            // сравнение длины последнего сегмента пути с размером иконки стрелки
            if (lastSegmentLen > style.iconWidth) {
                lastSegmentInPercents = Math.abs(style.lastPointOffset / lastSegmentLen);

                offsetTo = {
                    x: offsetVector.x * lastSegmentInPercents,
                    y: offsetVector.y * lastSegmentInPercents
                };

                // move last point forward/back by offsetVector direction
                if (style.lastPointOffset > 0) {
                    origPoints[pointsLen - 1].x += offsetTo.x;
                    origPoints[pointsLen - 1].y += offsetTo.y;
                } else {
                    origPoints[pointsLen - 1].x -= offsetTo.x;
                    origPoints[pointsLen - 1].y -= offsetTo.y;
                }
            } else {
                // удлиняем последний участок, если он меньше стрелки
                lastSegmentInPercents = lastSegmentLen / style.iconWidth;

                if (offsetVector.x !== 0) {
                    origPoints[pointsLen - 1].x = origPoints[pointsLen - 2].x + offsetVector.x / lastSegmentInPercents;
                }

                if (offsetVector.y !== 0) {
                    origPoints[pointsLen - 1].y = origPoints[pointsLen - 2].y + offsetVector.y / lastSegmentInPercents;
                }
            }
        }
    }

});

DG.Entrance.arrow = function (latlngs, options) {
    return new DG.Entrance.Arrow(latlngs, options);
};
