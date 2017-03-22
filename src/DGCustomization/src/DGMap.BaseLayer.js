DG.Map.addInitHook(function () {
    var errorUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX28t5R0k5UAAAAH0lEQVR4Xu3AAQkAAADCMPunNsdhWxwAAAAAAAAAwAEhAAABg2UP5AAAAABJRU5ErkJggg==';
    var errorRuUrl = DG.config.protocol + DG.config.baseUrl + '/img/nomap_ru.png';

    var TileLayer = DG.Browser.mobile ? DG.MobileTileLayer : DG.TileLayer;

    var BaseLayer = TileLayer.extend({
        initialize: function (url, options) {
            this._isDg = true;
            TileLayer.prototype.initialize.call(this, url, options);
        },

        getTiles: function () {
            return this._tiles;
        }
    });

    var tileUrl = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaTileServer : DG.config.tileServer);

    this.baseLayer = new BaseLayer(tileUrl, {
        subdomains: '0123',
        errorTileUrl: this.getLang() === 'ru' ? errorRuUrl : errorUrl,
        detectRetina: DG.config.detectRetina,
        maxZoom: 19,
        maxNativeZoom: 19,
        zIndex: 0
    }).addTo(this);

    function updateErrorTileUrl () {
        var lang = this.getLang();
        var project = this.projectDetector && this.projectDetector.getProject();

        if (lang === 'ru' && !project) {
            this.baseLayer.options.errorTileUrl = errorRuUrl;
        } else {
            this.baseLayer.options.errorTileUrl = errorUrl;
        }
    }

    this.on({
        langchange: updateErrorTileUrl,
        projectchange: updateErrorTileUrl,
        projectleave: updateErrorTileUrl
    }, this);
});
