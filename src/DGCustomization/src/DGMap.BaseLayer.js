DG.Map.addInitHook(function() {
    var errorUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX28t5R0k5UAAAAH0lEQVR4Xu3AAQkAAADCMPunNsdhWxwAAAAAAAAAwAEhAAABg2UP5AAAAABJRU5ErkJggg==';
    var errorRuUrl = DG.config.protocol + DG.config.baseUrl + '/img/nomap_ru.png';

    var TileLayer = DG.Browser.mobile ? DG.MobileTileLayer : DG.TileLayer;

    var BaseLayer = TileLayer.extend({
        initialize: function(url, options) {
            this._isDg = true;
            TileLayer.prototype.initialize.call(this, url, options);
        },

        getTiles: function() {
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
        zIndex: 0,
        updateWhenIdle: false // it's okay with preview tiles
    });

    var currentTilesLang = ''; // 'ar' | ''

    function updateTileUrl() {
        var lang = this.getLang();
        var project = this.projectDetector && this.projectDetector.getProject();

        if (lang === 'ru' && !project) {
            this.baseLayer.options.errorTileUrl = errorRuUrl;
        } else {
            this.baseLayer.options.errorTileUrl = errorUrl;
        }

        // Change 2GIS tiles for Arabic language in Dubai project
        if (currentTilesLang === '' && lang === 'ar' && project && project.country_code === 'ae') {
            currentTilesLang = 'ar';
            var arabicParameter = DG.Browser.retina ? '&ts=webapi_tileset_ar.hd' : '&ts=webapi_tileset_ar';
            this.baseLayer.setUrl(tileUrl + arabicParameter);

        } else if (currentTilesLang === 'ar' && (lang !== 'ar' || (!project || project.country_code !== 'ae'))) {
            currentTilesLang = '';
            this.baseLayer.setUrl(tileUrl);
        }
    }

    updateTileUrl.call(this);

    this.baseLayer.addTo(this);

    this.on({
        langchange: updateTileUrl,
        projectchange: updateTileUrl,
        projectleave: updateTileUrl
    }, this);
});
