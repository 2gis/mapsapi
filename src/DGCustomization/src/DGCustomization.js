//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo;

DG.Control.include({
    addTo: function (map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

// Add some browser detection
DG.Browser.safari51 = DG.Browser.safari && navigator.userAgent.indexOf('Version/5.1') !== -1;

// Fix bug with tileLayer minZoom
// https://github.com/2gis/mapsapi/pull/13
DG.GridLayer.include({
    _update: function () {

        if (!this._map) { return; }

        var bounds = this._map.getPixelBounds(),
            zoom = this._map.getZoom(),
            tileSize = this._getTileSize();

        if (zoom > this.options.maxZoom ||
            zoom < this.options.minZoom) {
            this._clearBgBuffer();
            return;
        }

        // tile coordinates range for the current view
        var tileBounds = L.bounds(
            bounds.min.divideBy(tileSize).floor(),
            bounds.max.divideBy(tileSize).floor());

        this._addTiles(tileBounds);

        if (this.options.unloadInvisibleTiles) {
            this._removeOtherTiles(tileBounds);
        }
    }
});

// Fix for https://github.com/2gis/mapsapi/issues/111 , remove on the next leaflet version
L.Draggable.include({
    _onMove: function (e) {
        if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
        }

        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
            newPoint = new L.Point(first.clientX, first.clientY),
            offset = newPoint.subtract(this._startPoint);

        if (!offset.x && !offset.y) { return; }
        if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

        L.DomEvent.preventDefault(e);

        if (!this._moved) {
            this.fire('dragstart');

            this._moved = true;
            this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

            L.DomUtil.addClass(document.body, 'leaflet-dragging');

            this._lastTarget = e.target || e.srcElement;
            L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
        }

        this._newPos = this._startPos.add(offset);
        this._moving = true;

        L.Util.cancelAnimFrame(this._animRequest);
        this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
    },
    _onUp: function () {
        L.DomUtil.removeClass(document.body, 'leaflet-dragging');

        if (this._lastTarget) {
            L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
            this._lastTarget = null;
        }

        for (var i in L.Draggable.MOVE) {
            L.DomEvent
                .off(document, L.Draggable.MOVE[i], this._onMove, this)
                .off(document, L.Draggable.END[i], this._onUp, this);
        }

        L.DomUtil.enableImageDrag();
        L.DomUtil.enableTextSelection();

        if (this._moved && this._moving) {
            // ensure drag is not fired after dragend
            L.Util.cancelAnimFrame(this._animRequest);

            this.fire('dragend', {
                distance: this._newPos.distanceTo(this._startPos)
            });
        }

        this._moving = false;
    }
});
