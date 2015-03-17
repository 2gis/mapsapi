(function () {
    var errorUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX28t5R0k5UAAAAH0lEQVR4Xu3AAQkAAADCMPunNsdhWxwAAAAAAAAAwAEhAAABg2UP5AAAAABJRU5ErkJggg==';
    var errorRuUrl = '__BASE_URL__/img/nomap_ru.png';

    var BaseLayer = DG.TileLayer.extend({
        initialize: function (url, options) {
            this._isDg = true;
            DG.TileLayer.prototype.initialize.call(this, url, options);
        }
    });

    DG.Map.addInitHook(function () {
        this.baseLayer = new BaseLayer('__TILE_SERVER__', {
                subdomains: '0123',
                errorTileUrl: this.getLang() == 'ru' ? errorRuUrl : errorUrl,
                detectRetina: __DETECT_RETINA__,
                maxZoom: 19,
                maxNativeZoom: 19
            }
        ).addTo(this);

        this.on('langchange', function(ev) {
            if (ev.lang == 'ru') {
                this.baseLayer.options.errorTileUrl = errorRuUrl;
            } else {
                this.baseLayer.options.errorTileUrl = errorUrl;
            }
        });
    });
})();
