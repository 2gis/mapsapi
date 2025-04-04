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

    var apiKey = this.options.key;

    this.isErrorWasShown = false;
    function handleTileError() {
        var errorMessage = DG.DomUtil.create('div', 'dg-error-message');
        if (!this.isErrorWasShown) {
            errorMessage.innerHTML = 'Your MapAPI key is invalid. Please contact api@2gis.com to get MapAPI key.';

            var mapContainer = document.getElementById('map');

            if (mapContainer) {
                mapContainer.appendChild(errorMessage);
            } else {
                console.warn('Map container with id "map" not found.');
            }

            this.isErrorWasShown = true;
        }
    }

    var tileUrl = DG.config.secureProtocol + (DG.Browser.retina ? DG.config.retinaTileServer : DG.config.tileServer);
    var arabicTileUrl = DG.config.secureProtocol +
        (DG.Browser.retina ? DG.config.arabicRetinaTileServer : DG.config.arabicTileServer);

    var previewTileUrl = DG.config.secureProtocol +
        (DG.Browser.retina ? DG.config.previewRetinaTileServer : DG.config.previewTileServer);
    var arabicPreviewTileUrl = DG.config.secureProtocol +
        (DG.Browser.retina ? DG.config.arabicPreviewRetinaTileServer : DG.config.arabicPreviewTileServer);

    this.baseLayer = new BaseLayer(tileUrl, {
        subdomains: '0123',
        errorTileUrl: this.getLang() === 'ru' ? errorRuUrl : errorUrl,
        detectRetina: DG.config.detectRetina,
        maxZoom: 19,
        maxNativeZoom: 19,
        zIndex: 0,
        updateWhenIdle: false, // it's okay with preview tiles
        previewUrl: previewTileUrl,
        key: apiKey,
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
            this.baseLayer.setUrl(arabicTileUrl);
            if (this.baseLayer.setPreviewUrl) {
                this.baseLayer.setPreviewUrl(arabicPreviewTileUrl);
            }

        } else if (currentTilesLang === 'ar' && (lang !== 'ar' || (!project || project.country_code !== 'ae'))) {
            currentTilesLang = '';
            this.baseLayer.setUrl(tileUrl);
            if (this.baseLayer.setPreviewUrl) {
                this.baseLayer.setPreviewUrl(previewTileUrl);
            }
        }
    }

    this.baseLayer.on('tileerror', handleTileError);

    updateTileUrl.call(this);

    this.baseLayer.addTo(this);

    this.on({
        langchange: updateTileUrl,
        projectchange: updateTileUrl,
        projectleave: updateTileUrl
    }, this);
});
