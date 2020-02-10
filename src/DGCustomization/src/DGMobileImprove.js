/**
 * В файле содежатся изменения для ускорения лифлета на мобильных девайсах
 */

if (DG.Browser.mobile) {
    (function() {
        /**
         * Хакаем addClass и removeClass, чтобы они не работали для определённых классов
         * Сделано так, чтобы не менять кучу методов в кишках лифлета
         *
         * leaflet-dragging и leaflet-drag-target вызывает длинный recalculate style
         */
        var addClass = L.DomUtil.addClass;
        L.DomUtil.addClass = function(el, name) {
            if (name === 'leaflet-dragging' ||
                name === 'leaflet-drag-target'
            ) {
                return;
            }

            addClass(el, name);
        };

        var removeClass = L.DomUtil.removeClass;
        L.DomUtil.removeClass = function(el, name) {
            if (name === 'leaflet-dragging' ||
                name === 'leaflet-drag-target'
            ) {
                return;
            }

            removeClass(el, name);
        }

        L.Draggable.include({
            /**
             * Добавлено округление позиции this._startPos.add(offset)._round()
             * И сравнение с предудыщей if (this._newPos && this._newPos.x == pos.x && this._newPos.y == pos.y) {
             * Чтобы обновление dom происходило только при реальном изменении
             * Убраны классы leaflet-dragging и leaflet-drag-target
             */
            _onMove: function(e) {
                // Ignore simulated events, since we handle both touch and
                // mouse explicitly; otherwise we risk getting duplicates of
                // touch events, see #4315.
                // Also ignore the event if disabled; this happens in IE11
                // under some circumstances, see #3666.
                if (e._simulated || !this._enabled) { return; }

                if (e.touches && e.touches.length > 1) {
                    this._moved = true;
                    return;
                }

                var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
                    newPoint = new L.Point(first.clientX, first.clientY),
                    offset = newPoint.subtract(this._startPoint);

                if (!offset.x && !offset.y) { return; }
                if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

                L.DomEvent.preventDefault(e);

                if (!this._moved) {
                    // @event dragstart: Event
                    // Fired when a drag starts
                    this.fire('dragstart');

                    this._moved = true;
                    this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

                    this._lastTarget = e.target || e.srcElement;
                    // IE and Edge do not give the <use> element, so fetch it
                    // if necessary
                    if ((window.SVGElementInstance) && (this._lastTarget instanceof window.SVGElementInstance)) {
                        this._lastTarget = this._lastTarget.correspondingUseElement;
                    }
                }

                var pos = this._startPos.add(offset)._round();
                this._moving = true;

                L.Util.cancelAnimFrame(this._animRequest);
                this._lastEvent = e;

                if (this._newPos && this._newPos.x == pos.x && this._newPos.y == pos.y) {
                    return;
                }

                this._newPos = pos;
                this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true);
            }
        });

        /**
         * Длительность всех инерций при движении карты теперь 1 секунда
         */
        L.Map.Drag.include({
            _onDragEnd: function(e) {
                var map = this._map,
                    options = map.options,

                    noInertia = !options.inertia || this._times.length < 2;

                map.fire('dragend', e);

                if (noInertia) {
                    map.fire('moveend');

                } else {

                    var direction = this._lastPos.subtract(this._positions[0]),
                        duration = (this._lastTime - this._times[0]) / 1000,
                        ease = options.easeLinearity,

                        speedVector = direction.multiplyBy(ease / duration),
                        speed = speedVector.distanceTo([0, 0]),

                        limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
                        limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

                        decelerationDuration = 1, // limitedSpeed / (options.inertiaDeceleration * ease),
                        offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

                    if (!offset.x && !offset.y) {
                        map.fire('moveend');

                    } else {
                        offset = map._limitOffset(offset, map.options.maxBounds);

                        L.Util.requestAnimFrame(function() {
                            map.panBy(offset, {
                                duration: decelerationDuration,
                                easeLinearity: ease,
                                noMoveStart: true,
                                animate: true
                            });
                        });
                    }
                }
            }
        })
    })();
}

L.MobileTileLayer = L.TileLayer.extend({
    initialize: function(url, options) {
        L.TileLayer.prototype.initialize.call(this, url, options);

        this._previewUrl = options.previewUrl;
    },

    setPreviewUrl: function(url) {
        this._previewUrl = url;
        this.redraw();
    },

    /**
     * Быстрое навешивание событий, вместо L.DomUtil.on используем простое присваивание
     */
    createTile: function(coords, done, url) {
        var tile = document.createElement('img');
        tile.onload = L.bind(this._tileOnLoad, this, done, tile);
        tile.onerror = L.bind(this._tileOnError, this, done, tile);

        if (this.options.crossOrigin) {
            tile.crossOrigin = '';
        }

        /*
         Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
         http://www.w3.org/TR/WCAG20-TECHS/H67
        */
        tile.alt = '';
        tile.src = this.getTileUrl(coords, url);

        return tile;
    },

    /**
     * Убран класс leaflet-tile
     * Добавлен хак для превью тайлов
     */
    _initTile: function(tile) {
        tile.style.position = 'absolute';

        var tileSize = this.getTileSize();
        tile.style.width = tileSize.x + 'px';
        tile.style.height = tileSize.y + 'px';

        tile.style.visibility = 'hidden';
        tile.style.pointerEvents = 'none';

        tile.onselectstart = L.Util.falseFn;
        tile.onmousemove = L.Util.falseFn;

        // without this hack, tiles disappear after zoom on Chrome for Android
        // https://github.com/Leaflet/Leaflet/issues/2078
        if (L.Browser.android && !L.Browser.android23) {
            tile.style.WebkitBackfaceVisibility = 'hidden';
        }

        return tile;
    },

    /**
     * Убран класс leaflet-tile-container
     */
    _updateLevels: function() {

        var zoom = this._tileZoom,
            maxZoom = this.options.maxZoom;

        if (zoom === undefined) { return undefined; }

        for (var z in this._levels) {
            if (this._levels[z].el.children.length || z === zoom) {
                this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
            } else {
                L.DomUtil.remove(this._levels[z].el);
                this._removeTilesAtZoom(z);
                delete this._levels[z];
            }
        }

        var level = this._levels[zoom],
            map = this._map;

        if (!level) {
            level = this._levels[zoom] = {};

            level.el = L.DomUtil.create('div', 'leaflet-zoom-animated', this._container);

            level.el.style.zIndex = maxZoom;

            level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
            level.zoom = zoom;

            this._setZoomTransform(level, map.getCenter(), map.getZoom());

            // force the browser to consider the newly added element for transition
            L.Util.falseFn(level.el.offsetWidth);
        }

        this._level = level;

        return level;
    },

    /**
     * Убрано добавление тайлов через documentFragment
     */
    _update: function(center) {
        var map = this._map;
        if (!map) { return; }
        var zoom = map.getZoom();

        if (center === undefined) { center = map.getCenter(); }
        if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

        var pixelBounds = this._getTiledPixelBounds(center),
            tileRange = this._pxBoundsToTileRange(pixelBounds),
            tileCenter = tileRange.getCenter(),
            queue = [],
            margin = this.options.keepBuffer,
            noPruneRange = new L.Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
                tileRange.getTopRight().add([margin, -margin]));

        for (var key in this._tiles) {
            var c = this._tiles[key].coords;
            if (c.z !== this._tileZoom || !noPruneRange.contains(L.point(c.x, c.y))) {
                this._tiles[key].current = false;
            }
        }

        // _update just loads more tiles. If the tile zoom level differs too much
        // from the map's, let _setView reset levels and prune old tiles.
        if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

        // create a queue of coordinates to load tiles from
        for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                var coords = new L.Point(i, j);
                coords.z = this._tileZoom;

                if (!this._isValidTile(coords)) { continue; }

                var tile = this._tiles[this._tileCoordsToKey(coords)];
                if (tile) {
                    tile.current = true;
                } else {
                    queue.push(coords);
                }
            }
        }

        // sort tile queue to load tiles in order of their distance to center
        queue.sort(function(a, b) {
            return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
        });

        if (queue.length !== 0) {
            // if it's the first batch of tiles to load
            if (!this._loading) {
                this._loading = true;
                // @event loading: Event
                // Fired when the grid layer starts loading tiles.
                this.fire('loading');
            }

            for (i = 0; i < queue.length; i++) {
                this._addTile(queue[i], this._level.el);
            }
        }
    },

    /**
     * We don't load preview tile:
     * - after zoom-in if a tile from a lower zoom is already shown
     * - after zoom-out if four tiles from a higher zoom is already shown
     */
    _needPreviewTile: function(coords) {
        if (this._tileZoom - this._map.getZoom() > 0) {
            // zoom in
            return !this._existTileFromLowerZoom(coords);
        } else {
            // zoom out
            return !this._existTilesFromHigherZoom(coords);
        }
    },

    _existTileFromLowerZoom: function(coords) {
        var coords2 = L.point(coords.x / 2, coords.y / 2)._floor();

        coords2.z = coords.z - 1;

        var key = this._tileCoordsToKey(coords2);
        var tile = this._tiles[key];
        return tile && !tile.preview;
    },

    _existTilesFromHigherZoom: function(coords) {
        var x = coords.x;
        var y = coords.y;

        for (var i = 2 * x; i < 2 * x + 2; i++) {
            for (var j = 2 * y; j < 2 * y + 2; j++) {
                var c = new L.Point(i, j);
                c.z = coords.z + 1;
                var key = this._tileCoordsToKey(c);
                if (!this._tiles[key]) {
                    return false;
                }
            }
        }

        return true;
    },

    /**
     * Добавлена логика с превью тайлами
     */
    _addTile: function(coords, container) {
        var tilePos = this._getTilePos(coords),
            key = this._tileCoordsToKey(coords);

        var wrapCoords = this._wrapCoords(coords);
        var needPreview = this._needPreviewTile(wrapCoords);

        var url = needPreview ? this._previewUrl : this._url;
        var tile = this.createTile(wrapCoords, L.bind(this._tileReady, this, coords), url);

        this._initTile(tile);

        L.DomUtil.setPosition(tile, tilePos);

        // save tile in cache
        this._tiles[key] = {
            el: tile,
            preview: needPreview,
            coords: coords,
            current: true
        };

        container.appendChild(tile);
        // @event tileloadstart: TileEvent
        // Fired when a tile is requested and starts loading.
        this.fire('tileloadstart', {
            tile: tile,
            coords: coords
        });
    },

    /**
     * Убран fadeAnimated и класс leaflet-tile-loaded
     */
    _tileReady: function(coords, err, tile) {
        if (!this._map) { return; }

        if (err) {
            // @event tileerror: TileErrorEvent
            // Fired when there is an error loading a tile.
            this.fire('tileerror', {
                error: err,
                tile: tile,
                coords: coords
            });
        }

        var key = this._tileCoordsToKey(coords);

        tile = this._tiles[key];
        if (!tile) { return; }

        // Если у тайла уже есть оригинальная (не пожатая) картинка,
        // то заменим превью на нее
        if (tile.originalEl && tile.el.parentNode) {
            tile.el.parentNode.replaceChild(tile.originalEl, tile.el);
            tile.el = tile.originalEl;

            tile.originalEl = null;
            tile.preview = false;

        // Если у тайла есть только превью, то добавим его на карту
        // И начнем грузить оригинальный
        } else if (tile.preview) {
            tile.originalEl = this.createTile(this._wrapCoords(coords), L.bind(this._tileReady, this, coords), this._url);
            this._initTile(tile.originalEl);
            L.DomUtil.setPosition(tile.originalEl, this._getTilePos(coords));
        }

        tile.loaded = +new Date();
        tile.active = true;
        this._pruneTiles();

        if (!err) {
            tile.el.style.visibility = '';

            // @event tileload: TileEvent
            // Fired when a tile loads.
            this.fire('tileload', {
                tile: tile.el,
                preview: tile.preview,
                coords: coords
            });
        }

        if (this._noTilesToLoad()) {
            this._loading = false;
            // @event load: Event
            // Fired when the grid layer loaded all visible tiles.
            this.fire('load');

            if (L.Browser.ielt9 || !this._map._fadeAnimated) {
                L.Util.requestAnimFrame(this._pruneTiles, this);
            } else {
                // Wait a bit more than 0.2 secs (the duration of the tile fade-in)
                // to trigger a pruning.
                setTimeout(L.bind(this._pruneTiles, this), 250);
            }
        }
    },

    /**
     * В отличие от оригинального метода, здесь url прокидывается параметром
     */
    getTileUrl: function(coords, url) {
        var data = {
            r: L.Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        return L.Util.template(url, L.extend(data, this.options));
    },
});
