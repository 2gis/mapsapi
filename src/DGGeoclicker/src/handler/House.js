/*global FirmCard */
DG.Geoclicker.Handler.House = DG.Geoclicker.Handler.Default.extend({

    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,

    options: {
        'showBooklet': true,
        'showPhotos': true,
        'showRouteSearch': true
    },

    handle: function(results) { // (Object) -> Promise
        if (!results.building) {
            return false;
        }

        // initialization setup
        this.firmCard = null;
        this._page = 1;
        this._houseObject = null;
        this._firmList = null;
        this._firmListObject = null;
        this._firmCardObject = null;
        this._onScroll = false;
        this._isFirmlistOpen = false;

        this._id = results.building.id;
        this._totalPages = 1;
        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._initedPopupClose = false;
        this._directionsUrl = this._getDirectionsUrl(results.building.name);
        this._firmListLoader = this._view.initLoader(true);

        this._houseObject = this._fillHouseObject(results.building);

        return Promise.resolve(this._houseObject);
    },

    _isRouteSearchAllowed: function() { //() -> Boolean
        var project = this._controller.getMap().projectDetector.getProject();
        return project.transport || project.roads;
    },

    _firmCardSetup: function() { //() -> Object
        var project = this._controller.getMap().projectDetector.getProject();
        return {
            render: this._view.renderTemplate,
            lang: this._map.getLang(),
            domain: project ? project.domain : 'ru',
            ajax: DG.bind(this._api.getFirmInfo, this._api),
            timezoneOffset: project ? project.timeOffset : 0,
            map: this._map,
            popup: this._popup,
            isMobile: DG.Browser.mobile,
            showEntrance: DG.Entrance,
            gotoUrl: this._directionsUrl,
            onFirmReady: DG.bind(this._onFirmReady, this),
            onToggle: DG.bind(this._popup.resize, this._popup),
            showBooklet: this.options.showBooklet,
            showPhotos: this.options.showPhotos,
            showRouteSearch: this.options.showRouteSearch && this._isRouteSearchAllowed(),
            t: DG.bind(this.t, this)
        };
    },

    // init single firm card in case of poi
    _fillFirmCardObject: function(firmId) {
        var options = this._firmCardSetup();

        this.firmCard = new FirmCard(firmId, options);
        this._initPopupClose();
        return this.firmCard.getContainer();
    },

    _firmListSetup: function() {
        var options = this._firmCardSetup();

        DG.extend(options, {
            backBtn: DG.bind(this._showHousePopup, this),
            onFirmClick: DG.bind(this._onFirmListClick, this),
            onShowLess: DG.bind(this._showHousePopup, this),
            pasteLoader: DG.bind(this._pasteLoader, this)
        });

        return {
            firmCard: options,
            firmlistItemTmpl: 'firmlistItem',
            onListReady: DG.bind(this._renderFirmList, this)
        };
    },

    _initShortFirmList: function(firms) { //(Object) -> DOMElement
        var options = this._firmListSetup();

        this._shortFirmList = new FirmCard.List(firms, options);

        return this._shortFirmList.renderList();
    },

    _initFirmList: function(res) { //(Object) -> Promise
        if (!res) { return false; }

        var results = res.result.items,
            options = this._firmListSetup();

        options.firmCard.backBtn = DG.bind(this._showListPopup, this);

        if (this._shortFirmList) {
            this._shortFirmList._toggleEventHandlers(true);
        }

        this._firmList = new FirmCard.List(results, options);

        this._firmListObject = this._fillFirmListObject(this._firmList.renderList());
        this._clearAndRenderPopup(this._firmListObject);
    },

    _fillFirmListObject: function(firmList) { //(DOMElement) -> Object
        var self = this;

        return {
            tmpl: firmList,
            header: this._header,
            footer: this._view.render({
                tmpl: 'popupFooterBtns',
                data: {
                    btns: [
                        {
                            name: 'back',
                            label: this.t('back_button'),
                            icon: true
                        }
                    ]
                }
            }),
            afterRender: function() {
                self._initPopupClose();

                if (self._totalPages > 1 && self._firmListLoader) {
                    // "this" here is self._firmListObject
                    this.tmpl.parentNode.appendChild(self._firmListLoader);
                }
            }
        };
    },

    _onFirmReady: function(firmContentObject) {
        var self = this;
        firmContentObject.afterRender = function() {
            var headerTitle = self._popup._popupStructure.header.firstChild;
            if (!DG.Browser.ielt9) {
                if (headerTitle.offsetHeight > 72) { //TODO: magic number
                    DG.DomUtil.addClass(headerTitle, 'dg-popup__header-teaser');
                    if (!DG.Browser.webkit) {
                        DG.Geoclicker.clampHelper(headerTitle, 3);
                    }
                }
            }
        };
        this._clearAndRenderPopup(firmContentObject);
    },

    _showHousePopup: function() {
        this._popup.off('scroll', this._onScroll);
        this._clearAndRenderPopup(this._houseObject);
        if (this._shortFirmList) {
            this._shortFirmList._toggleEventHandlers();
        }
    },

    _onFirmListClick: function() {
        this._popup.off('scroll', this._onScroll);
    },

    _pasteLoader: function() {
        var loaderWrapper  = DG.DomUtil.create('div', 'dg-map-geoclicker__preloader-wrapper'),
            loader = this._view.initLoader();

        loaderWrapper.insertBefore(loader, loaderWrapper.firstChild);
        loaderWrapper.style.height = this._popup._contentNode.offsetHeight - 1 + 'px'; // MAGIC
        loaderWrapper.style.width = this._popup._contentNode.offsetWidth + 'px';
        this._clearAndRenderPopup({tmpl: loaderWrapper});
    },

    _initPopupClose: function() {
        if (this._initedPopupClose) { return; }

        this._controller.getMap().once('popupclose', DG.bind(this._onPopupClose, this));
        this._initedPopupClose = true;
    },

    _showListPopup: function() {
        var firmList = this._firmListObject;

        this._pasteLoader();

        if (!firmList) {
            firmList = this._api.firmsInHouse(this._id).then(DG.bind(this._initFirmList, this));
        } else {
            this._clearAndRenderPopup(firmList);
            this._firmList._toggleEventHandlers();
        }

        if (!this._onScroll) {
            this._onScroll = DG.Util.throttle(this._handlePopupScroll, this._scrollThrottleInterval, this);
        }

        this._popup.on('scroll', this._onScroll);
    },

    _renderFirmList: function() {
        if (!this._isFirmlistOpen) {
            this._popup.resize();
            this._isFirmlistOpen = true;
        }
    },

    _onPopupClose: function() {
        this._initedPopupClose = false;
        if (this._firmList) {
            this._firmList.clearList();
            this._firmList = null;
            this._popup.off('scroll', this._onScroll);
        }
        this._firmId = null;
        if (this.firmCard) {
            this.firmCard._toggleEventHandlers(true);
            this.firmCard = null;
        }
        this._firmListLoader = null;
        this._page = 1;
        this._clearEventHandlers();
    },

    _initShowMore: function() {
        var link = this._popup.findElement('.dg-popup__button_name_all');

        if (link) {
            this._addEventHandler('dg-popup__button_name_all', DG.bind(this._showListPopup, this));
        }
    },

    _clearAndRenderPopup: function(popupObject) {
        this._clearEventHandlers();
        this._popup.clear('header', 'footer');
        this._view.renderPopup(popupObject);
    },

    _appendFirmList: function(res) { // (Object)
        this._firmList.addFirms(res.result.items);
        this._popup._updateScrollPosition();
    },

    _handlePopupScroll: function(e) {
        var scroller = e.originalEvent.target || e.target._scroller;

        DG.DomEvent.stop(e);

        if (this._totalPages <= 1) { return; }
        if (scroller && scroller.scrollHeight <= scroller.scrollTop + scroller.offsetHeight + this._scrollHeightReserve) {
            this._handlePaging();
        }
    },

    _handlePaging: function() {
        this._page++;

        if (this._totalPages && this._page <= this._totalPages) {
            this._api.firmsInHouse(this._id, {page: this._page}).then(DG.bind(this._appendFirmList, this));
        }

        if (this._page === this._totalPages) {
            var loader = this._firmListLoader;

            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }

            this._popup.off('scroll', this._onScroll);
        }
    }
});
