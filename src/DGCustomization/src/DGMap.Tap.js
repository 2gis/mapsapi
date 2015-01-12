DG.Map.Tap.include({
    _onUp: function (e) {
        clearTimeout(this._holdTimeout);

        L.DomEvent.off(document, {
            touchmove: this._onMove,
            touchend: this._onUp
        }, this);

        if (this._fireClick && e && e.changedTouches) {

            var first = e.changedTouches[0],
                el = first.target;

            if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
                L.DomUtil.removeClass(el, 'leaflet-active');
            }

            this._simulateEvent('mouseup', first);

            // simulate click if the touch didn't move too much
            if (this._isTapValid()) {
                // close popup and don't simulate click if popup is open
                // https://github.com/2gis/mapsapi/issues/96
                if (this._map._popup) {
                    this._map.closePopup();
                } else {
                    this._simulateEvent('click', first);
                }
            }
        }
    }
});
