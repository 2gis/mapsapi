/**
 * This customization fixes unwanted inertia movement after sudden drag stops
 * See https://github.com/Leaflet/Leaflet/pull/4048.
 * If this PR ever gets merged, this file can be removed.
 */
var onDragEnd = DG.Map.Drag.prototype._onDragEnd;

DG.Map.Drag.include({
    _rememberTimeAndPosition: function() {
        var time = this._lastTime = +new Date(),
            pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

        this._positions.push(pos);
        this._times.push(time);

        // Remove all data points older than 50 ms
        while (time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
        }
    },

    _onDrag: function(e) {
        if (this._map.options.inertia) {
            this._rememberTimeAndPosition();
        }

        this._map
            .fire('move', e)
            .fire('drag', e);
    },

    _onDragEnd: function() {
        if (this._map.options.inertia && !DG.Browser.touch) {
            this._rememberTimeAndPosition();
        }

        onDragEnd.call(this);
    }
});
