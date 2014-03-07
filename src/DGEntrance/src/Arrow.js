DG.Entrance.Arrow = DG.Polyline.extend({

    // initialize: function (latlngs, options) { // (Array, Object)
    //     DG.Polyline.prototype.initialize.call(this, latlngs, options);
    // },

    projectLatlngs: function () {
        DG.Polyline.prototype.projectLatlngs.call(this);
        this._offsetLastPathPoint();
    },

    _offsetLastPathPoint: function () {
        var lastSegmentInPercents,
            offsetVector,
            offsetTo = {},
            origPoints = this._originalPoints,
            pointsLen = origPoints.length,
            byZoom = this.options.byZoom,
            zoom = this._map.getZoom(),

            lastPoint = origPoints[pointsLen - 1],
            lastByOnePoint = origPoints[pointsLen - 2],
            lastSegmentLen = lastPoint.distanceTo(lastByOnePoint);

        if (typeof byZoom[zoom] !== 'undefined') {
            lastSegmentInPercents = Math.abs((byZoom[zoom].lastPointOffset * 100) / lastSegmentLen);

            offsetVector = {
                x: origPoints[pointsLen - 1].x - origPoints[pointsLen - 2].x,
                y: origPoints[pointsLen - 1].y - origPoints[pointsLen - 2].y
            };

            offsetTo.x = Math.round(offsetVector.x * lastSegmentInPercents / 100);
            offsetTo.y = Math.round(offsetVector.y * lastSegmentInPercents / 100);

            // move last point forward/back by offsetVector direction
            if (byZoom[zoom].lastPointOffset > 0) {
                origPoints[pointsLen - 1].x += offsetTo.x;
                origPoints[pointsLen - 1].y += offsetTo.y;
            }
            else {
                origPoints[pointsLen - 1].x -= offsetTo.x;
                origPoints[pointsLen - 1].y -= offsetTo.y;
            }
        }
    }
});

DG.Entrance.arrow = function (latlngs, options) {
    return new DG.Entrance.Arrow(latlngs, options);
};
