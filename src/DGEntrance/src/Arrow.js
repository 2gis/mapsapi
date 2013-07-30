L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // (Array, Object)
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
            offsetPercents = {},
            offsetTo = {};

        if (typeof byZoom[zoom] !== 'undefined') {
            offsetVector = {
                x: origPoints[pointsLen - 1].x - origPoints[pointsLen - 2].x,
                y: origPoints[pointsLen - 1].y - origPoints[pointsLen - 2].y
            }
            
            if (offsetVector.x !== 0) {
                // lastPointOffset = N % of offsetVector
                offsetPercents.x = Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.x);
                // lastPointOffset less than offsetVector N times
                offsetTo.x = parseInt(offsetVector.x / (100 / offsetPercents.x));                
            }
            else {
                offsetTo.x = 0;
            }

            if (offsetVector.y !== 0) {
                offsetPercents.y = Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.y);
                offsetTo.y = parseInt(offsetVector.y / (100 / offsetPercents.y));
            }
            else {
                offsetTo.y = 0;
            }

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

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
