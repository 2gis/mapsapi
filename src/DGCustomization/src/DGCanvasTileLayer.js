DG.CanvasTileLayer = DG.Layer.extend({
  options: {
    tileSize: 256,

    // @option updateInterval: Number = 200
    // Tiles will not update more than once every `updateInterval` milliseconds when panning.
    updateInterval: 200,

    zIndex: 1,

    // @option bounds: LatLngBounds = undefined
    // If set, tiles will only be loaded inside the set `LatLngBounds`.
    bounds: null,

    minZoom: 0,
    maxZoom: 10,
    maxNativeZoom: null,
    subdomains: 'abc',
    errorTileUrl: '',
    zoomOffset: 0,

    // @option noWrap: Boolean = false
    // Whether the layer is wrapped around the antimeridian. If `true`, the
    // GridLayer will only be displayed once at low zoom levels. Has no
    // effect when the [map CRS](#map-crs) doesn't wrap around.
    noWrap: false,

    // @option pane: String = 'tilePane'
    // `Map pane` where the grid layer will be added.
    pane: 'tilePane',

    // @option keepBuffer: Number = 2
    // When panning the map, keep this many rows and columns of tiles before unloading them.
    keepBuffer: 2,
  },

  initialize: function (url, options) {
    this._url = url;

    options = L.setOptions(this, options);

    if (typeof options.subdomains === 'string') {
      options.subdomains = options.subdomains.split('');
    }

    // for https://github.com/Leaflet/Leaflet/issues/137
    if (!L.Browser.android) {
      this.on('tileunload', this._onTileRemove);
    }

    this._retinaFactor = L.Browser.retina ? 2 : 1;
  },

  onAdd: function () {
    this._initContainer();

    this._tiles = {};

    // this._origin = this._map.getPixelOrigin();

    this._resetView();
    this._update();
    // this._render();
  },

  beforeAdd: function (map) {
    map._addZoomLimit(this);
  },

  getEvents: function () {
    var events = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,
      zoom: this._resetView,
      moveend: this._onMoveEnd,
      zoomanim: this._animateZoom
    };

    return events;
  },

  createTile: function (coords, done) {
    var tile = document.createElement('img');

    L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
    L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

    /*
     Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
     http://www.w3.org/TR/WCAG20-TECHS/H67
    */
    tile.alt = '';

    tile.src = this.getTileUrl(coords);

    return tile;
  },

  getTileSize: function () {
    var s = this.options.tileSize;
    return s instanceof L.Point ? s : new L.Point(s, s);
  },

  // @section Extension methods
  // @uninheritable
  // Layers extending `TileLayer` might reimplement the following method.
  // @method getTileUrl(coords: Object): String
  // Called only internally, returns the URL for a tile given its coordinates.
  // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
  getTileUrl: function (coords) {
    var data = {
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl()
    };

    return L.Util.template(this._url, L.extend(data, this.options));
  },

  _onMoveEnd: function () {
    if (!this._map || this._map._animatingZoom) { return; }

    this._update();
    this._render();
  },

  _getZoomForUrl: function () {
    var options = this.options,
        zoom = this._tileZoom;

    zoom += options.zoomOffset;

    return options.maxNativeZoom !== null ? Math.min(zoom, options.maxNativeZoom) : zoom;
  },

  _tileOnLoad: function (done, tile) {
    // For https://github.com/Leaflet/Leaflet/issues/3332
    if (L.Browser.ielt9) {
      setTimeout(L.bind(done, this, null, tile), 0);
    } else {
      done(null, tile);
    }
  },

  _tileOnError: function (done, tile, e) {
    var errorUrl = this.options.errorTileUrl;
    if (errorUrl) {
      tile.src = errorUrl;
    }
    done(e, tile);
  },

  _resetView: function (e) {
    var animating = e && (e.pinch || e.flyTo);
    this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
  },

  _animateZoom: function (e) {
    this._setView(e.center, e.zoom, true, e.noUpdate, true);
  },

  _invalidateAll: function () {
    this._removeAllTiles();

    this._tileZoom = null;
  },

  _setView: function (center, zoom, noPrune, noUpdate) {
    var tileZoom = Math.round(zoom);
    if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
        (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
      tileZoom = undefined;
    }

    if (!noUpdate) {

      this._tileZoom = tileZoom;

      if (this._abortLoading) {
        this._abortLoading();
      }

      this._resetGrid();

      if (tileZoom !== undefined) {
        this._update(center);
      }

      if (!noPrune) {
        this._pruneTiles();
      }

      // Flag to prevent _updateOpacity from pruning tiles during
      // a zoom anim or a pinch gesture
      this._noPrune = !!noPrune;
    }

    this._setZoomTransform(center, zoom);
  },

  _setZoomTransform: function (center, zoom) {
    if (!this._origin) {
      return;
    }

    var scale = this._map.getZoomScale(zoom, this._zoom);
    var or = this._map._getNewPixelOrigin(center, zoom);

    var translate = this._origin.add(this._pixelOffset).multiplyBy(scale).subtract(or).round();

    if (L.Browser.any3d) {
      L.DomUtil.setTransform(this._container, translate, scale);
    } else {
      L.DomUtil.setPosition(this._container, translate);
    }
  },

  // stops loading all tiles in the background layer
  _abortLoading: function () {
    var i, tile;
    for (i in this._tiles) {
      if (this._tiles[i].coords.z !== this._tileZoom) {
        tile = this._tiles[i].el;

        tile.onload = L.Util.falseFn;
        tile.onerror = L.Util.falseFn;

        if (!tile.complete) {
          tile.src = L.Util.emptyImageUrl;
        }
      }
    }
  },

  // Private method to load tiles in the grid's active zoom level according to map bounds
  _update: function (center) {
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
    queue.sort(function (a, b) {
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
        this._addTile(queue[i]);
      }
    }
  },

  _render: function () {
    this._pixelOffset = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._container, this._pixelOffset);

    var size = this._map.getSize();
    this._origin = this._map.getPixelOrigin();
    var tiles = this._tiles;

    this._ctx.clearRect(0, 0, size.x * this._retinaFactor, size.y * this._retinaFactor);

    for (var key in tiles) {
      this._renderTile(tiles[key]);
    }
    
    this._zoom = this._map.getZoom();
  },

  _renderTile: function (tile) {
    if (!tile.current) {
      return;
    }

    var retinaFactor = this._retinaFactor;
    var tileSize = this.getTileSize();
    var tilePos = this._getTilePos(tile.coords, this._origin);
    var offset = tilePos.subtract(this._pixelOffset);

    this._ctx.drawImage(
      tile.el,
      0,
      0,
      tileSize.x * retinaFactor,
      tileSize.y * retinaFactor,

      offset.x * retinaFactor,
      offset.y * retinaFactor,
      tileSize.x * retinaFactor,
      tileSize.y * retinaFactor
    );

    // this._ctx.beginPath();
    // this._ctx.rect(
    //   offset.x * retinaFactor,
    //   offset.y * retinaFactor,
    //   tileSize.x * retinaFactor,
    //   tileSize.y * retinaFactor
    // );
    // this._ctx.stroke();
  },

  _getTilePos: function (coords, origin) {
    return coords.scaleBy(this.getTileSize()).subtract(origin);
  },

  _addTile: function (coords) {
    var key = this._tileCoordsToKey(coords);

    var tile = this.createTile(this._wrapCoords(coords), L.bind(this._tileReady, this, coords));

    // save tile in cache
    this._tiles[key] = {
      el: tile,
      coords: coords,
      current: true
    };

    // @event tileloadstart: TileEvent
    // Fired when a tile is requested and starts loading.
    this.fire('tileloadstart', {
      tile: tile,
      coords: coords
    });
  },

  _tileReady: function (coords, err, tile) {
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

    tile.loaded = +new Date();
    tile.active = true;
    this._pruneTiles();

    if (!err) {
      // @event tileload: TileEvent
      // Fired when a tile loads.
      this.fire('tileload', {
        tile: tile.el,
        coords: coords
      });

      this._renderTile(tile);
    }

    if (this._noTilesToLoad()) {
      this._loading = false;
      // @event load: Event
      // Fired when the grid layer loaded all visible tiles.
      this.fire('load');

      L.Util.requestAnimFrame(this._pruneTiles, this);
    }
  },

  _onTileRemove: function (e) {
    e.tile.onload = null;
  },

  _noTilesToLoad: function () {
    for (var key in this._tiles) {
      if (!this._tiles[key].loaded) { return false; }
    }
    return true;
  },

  _pruneTiles: function () {
    if (!this._map) {
      return;
    }

    var key, tile;

    var zoom = this._map.getZoom();
    if (zoom > this.options.maxZoom ||
      zoom < this.options.minZoom) {
      this._removeAllTiles();
      return;
    }

    for (key in this._tiles) {
      tile = this._tiles[key];
      tile.retain = tile.current;
    }

    for (key in this._tiles) {
      tile = this._tiles[key];
      if (tile.current && !tile.active) {
        var coords = tile.coords;
        if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
          this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
        }
      }
    }

    for (key in this._tiles) {
      if (!this._tiles[key].retain) {
        this._removeTile(key);
      }
    }
  },

  _retainParent: function (x, y, z, minZoom) {
    var x2 = Math.floor(x / 2),
        y2 = Math.floor(y / 2),
        z2 = z - 1,
        coords2 = new L.Point(+x2, +y2);
    coords2.z = +z2;

    var key = this._tileCoordsToKey(coords2),
        tile = this._tiles[key];

    if (tile && tile.active) {
      tile.retain = true;
      return true;

    } else if (tile && tile.loaded) {
      tile.retain = true;
    }

    if (z2 > minZoom) {
      return this._retainParent(x2, y2, z2, minZoom);
    }

    return false;
  },

  _retainChildren: function (x, y, z, maxZoom) {

    for (var i = 2 * x; i < 2 * x + 2; i++) {
      for (var j = 2 * y; j < 2 * y + 2; j++) {

        var coords = new L.Point(i, j);
        coords.z = z + 1;

        var key = this._tileCoordsToKey(coords),
            tile = this._tiles[key];

        if (tile && tile.active) {
          tile.retain = true;
          continue;

        } else if (tile && tile.loaded) {
          tile.retain = true;
        }

        if (z + 1 < maxZoom) {
          this._retainChildren(i, j, z + 1, maxZoom);
        }
      }
    }
  },

  _isValidTile: function (coords) {
    var crs = this._map.options.crs;

    if (!crs.infinite) {
      // don't load tile if it's out of bounds and not wrapped
      var bounds = this._globalTileRange;
      if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
          (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
    }

    if (!this.options.bounds) { return true; }

    // don't load tile if it doesn't intersect the bounds in options
    var tileBounds = this._tileCoordsToBounds(coords);
    return L.latLngBounds(this.options.bounds).overlaps(tileBounds);
  },

  _initContainer: function () {
    if (this._container) { return; }

    this._container = L.DomUtil.create('canvas', 'leaflet-layer leaflet-tile-container leaflet-zoom-animated');
    this._ctx = this._container.getContext('2d');

    const size = this._map.getSize();

    this._container.width = this._retinaFactor * size.x;
    this._container.height = this._retinaFactor * size.y;
    this._container.style.width = size.x + 'px';
    this._container.style.height = size.y + 'px';

    this._updateZIndex();

    this.getPane().appendChild(this._container);
  },

  _updateZIndex: function () {
    if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
      this._container.style.zIndex = this.options.zIndex;
    }
  },

  _removeAllTiles: function () {
    for (var key in this._tiles) {
      this._removeTile(key);
    }
  },

  _removeTile: function (key) {
    var tile = this._tiles[key];
    if (!tile) { return; }

    delete this._tiles[key];

    // @event tileunload: TileEvent
    // Fired when a tile is removed (e.g. when a tile goes off the screen).
    this.fire('tileunload', {
      tile: tile.el,
      coords: this._keyToTileCoords(key)
    });
  },

  // converts tile cache key to coordinates
  _keyToTileCoords: function (key) {
    var k = key.split(':'),
        coords = new L.Point(+k[0], +k[1]);
    coords.z = +k[2];
    return coords;
  },

  _resetGrid: function () {
    var map = this._map,
        crs = map.options.crs,
        tileSize = this._tileSize = this.getTileSize(),
        tileZoom = this._tileZoom;

    var bounds = this._map.getPixelWorldBounds(this._tileZoom);
    if (bounds) {
      this._globalTileRange = this._pxBoundsToTileRange(bounds);
    }

    this._wrapX = crs.wrapLng && !this.options.noWrap && [
      Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
      Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
    ];
    this._wrapY = crs.wrapLat && !this.options.noWrap && [
      Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
      Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
    ];
  },

  _wrapCoords: function (coords) {
    var newCoords = new L.Point(
      this._wrapX ? L.Util.wrapNum(coords.x, this._wrapX) : coords.x,
      this._wrapY ? L.Util.wrapNum(coords.y, this._wrapY) : coords.y);
    newCoords.z = coords.z;
    return newCoords;
  },

  _getSubdomain: function (tilePoint) {
    var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
    return this.options.subdomains[index];
  },

  _pxBoundsToTileRange: function (bounds) {
    var tileSize = this.getTileSize();
    return new L.Bounds(
      bounds.min.unscaleBy(tileSize).floor(),
      bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
  },

  _getTiledPixelBounds: function (center) {
    var map = this._map,
        mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
        scale = map.getZoomScale(mapZoom, this._tileZoom),
        pixelCenter = map.project(center, this._tileZoom).floor(),
        halfSize = map.getSize().divideBy(scale * 2);

    return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
  },

  // converts tile coordinates to key for the tile cache
  _tileCoordsToKey: function (coords) {
    return coords.x + ':' + coords.y + ':' + coords.z;
  },
});
