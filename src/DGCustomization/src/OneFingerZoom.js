/**
 * Проблемы: слишком много контролов пересекаются с логикой one finger zoom
 * 1. Драг
 * 2. Даблклик
 * 3. Зум по даблклик
 */

L.Map.mergeOptions({
    oneFingerZoom: true
});

/* eslint-disable */
L.OneFingerZoom = L.Handler.extend({
    initialize: function(map) {
        L.Handler.prototype.initialize.call(this, map);

        this._state = 'null'; // first, second, zooming
        this._touchPoint = null;
        this._touchTimer = null;

        this._delay = 250;

        this._timePassed = L.bind(this._timePassed, this);
    },

    addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._map._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._map._container, 'touchmove', this._onTouchMove, this);
    },

    removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.off(this._map._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._map._container, 'touchmove', this._onTouchMove, this);
    },

    _onTouchStart: function (e) {
        switch (this._state) {
            case 'null':
                this._state = 'first';
                this._touchPoint = this._map.mouseEventToContainerPoint(e.touches[0]);
                this._touchTimer = setTimeout(this._timePassed, this._delay);
                break;
            case 'first':
                this._state = 'null';
                this._touchPoint = null;
                clearTimeout(this._touchTimer);
                this._touchTimer = null;
                break;
            case 'second':
                this._state = 'zooming';
                this._touchPoint = this._map.mouseEventToContainerPoint(e.touches[0]);
                clearTimeout(this._touchTimer);
                this._touchTimer = null;
		        this._startZoom = this._map.getZoom();
                break;
            case 'zooming':
                this._state = 'null';
                this._touchPoint = null;
                this._moved = false;
		        this._map._stop();
		        L.Util.cancelAnimFrame(this._animRequest);
		        // L.DomEvent.preventDefault(e);
                break;
        }
        console.log(this._state);
    },

    _onTouchEnd: function () {
        switch (this._state) {
            case 'null':
                break;
            case 'first':
                this._state = 'second';
                this._touchPoint = null;
                clearTimeout(this._touchTimer);
                this._touchTimer = setTimeout(this._timePassed, this._delay);
                break;
            case 'second':
                break;
            case 'zooming':
                this._state = 'null';
                this._touchPoint = null;
                clearTimeout(this._touchTimer);
                this._touchTimer = null;
		        L.Util.cancelAnimFrame(this._animRequest);
                break;
        }
        console.log(this._state);
    },

    _onTouchMove: function (e) {
        switch (this._state) {
            case 'null':
            case 'first':
            case 'second':
                break;
            case 'zooming':
                this._changeZoom(e);
                break;
        }
    },

    _timePassed: function () {
        switch (this._state) {
            case 'null':
                break;
            case 'first':
            case 'second':
                this._state = 'null';
                this._touchPoint = null;
                clearTimeout(this._touchTimer);
                this._touchTimer = null;
                break;
            case 'zooming':
                break;
        }
        console.log(this._state);
    },

    _changeZoom: function (e) {
        var point = this._map.mouseEventToContainerPoint(e.touches[0]);
        var map = this._map;
        var delta = (this._touchPoint.y - point.y) / 100;
        this._zoom = this._startZoom + delta;
        if (this._zoom === Infinity || this._zoom === NaN) {
            debugger;
        }

        if (!map.options.bounceAtZoomLimits && (
            (this._zoom < map.getMinZoom() && delta < 0) ||
            (this._zoom > map.getMaxZoom() && delta > 0))) {
            this._zoom = map._limitZoom(this._zoom);
        }

		if (!this._moved) {
			map._moveStart(true);
			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);

		var moveFn = L.bind(map._move, map, map.getCenter(), this._zoom, {pinch: true, round: false});
		this._animRequest = L.Util.requestAnimFrame(moveFn, this, true);

        L.DomEvent.preventDefault(e);
    }
});

L.Map.addInitHook('addHandler', 'oneFingerZoom', L.OneFingerZoom);
