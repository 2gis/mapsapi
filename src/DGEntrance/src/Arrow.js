L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // (Array, Object)
        console.log(options);
        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    projectLatlngs: function () {
        L.Polyline.prototype.projectLatlngs.call(this);
        this._offsetLastPathPoint();
    },

    _offsetLastPathPoint: function () {
        var origPoints = this._originalPoints,
            pointsLen = origPoints.length,
            byZoom = this.options.byZoom,
            zoom = this._map.getZoom(),
            offsetVector,
            offsetPercents,
            offsetTo;

        if (typeof byZoom[zoom] !== 'undefined') {
            offsetVector = {
                x: origPoints[pointsLen - 1].x - origPoints[pointsLen - 2].x,
                y: origPoints[pointsLen - 1].y - origPoints[pointsLen - 2].y
            };

            offsetPercents = { // lastPointOffset = N % of offsetVector
                x: Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.x),
                y: Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.y)
            };

            offsetTo = { // lastPointOffset less than offsetVector N times
                x: parseInt(offsetVector.x / (100 / offsetPercents.x)),
                y: parseInt(offsetVector.y / (100 / offsetPercents.y))
            };

            // move last point back by offsetVector direction
            origPoints[pointsLen - 1].x -= offsetTo.x;
            origPoints[pointsLen - 1].y -= offsetTo.y;
        }
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
