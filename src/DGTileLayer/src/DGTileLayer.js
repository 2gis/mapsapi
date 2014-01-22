DG.Map.addInitHook(function () {
    if (!this._copyright) {
        DG.control.attribution().addTo(this);
    }

    this.baseLayer = new (DG.TileLayer.extend({
        onRemove: function (map) {
            map.projectDetector.disable();
            DG.TileLayer.prototype.onRemove.call(this, map);
        }
    })
    )('__TILE_SERVER__', {
            subdomains: '0123',
            errorTileUrl: '__ERROR_TILE_URL__',
            detectRetina: true,
            maxNativeZoom: 18,
            uid: 'dgTileLayer'
        }
    ).addTo(this);
});
