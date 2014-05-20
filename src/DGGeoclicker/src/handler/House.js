/* global
    FirmCard: false
*/
DG.Geoclicker.Handler.House = DG.Geoclicker.Handler.Default.extend({

    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,

    options: {
        'showBooklet': true,
        'showPhotos': true
    },

    initialize: function (controller, view, map, options) { // (Object, Object, Object, Object)
        DG.setOptions(this, options);

        this._controller = controller;
        this._view = view;
        this._map = map;
    },

    handle: function (results) { // (Object) -> Promise
        if (!results.house) {
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

        this._id = results.house.id;
        this._totalPages = 1;
        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._initedPopupClose = false;
        this._directionsUrl = this._getDirectionsUrl(results.house.name);
        this._firmListLoader = this._view.initLoader(true);

        this._houseObject = this._fillHouseObject(results.house);

        return Promise.resolve(this._houseObject);
    },

    _firmCardSetup: function () { //() -> Object
        return {
            render: this._view._templates,
            lang: this._map.getLang(),
            ajax: DG.bind(this._api.getFirmInfo, this._api),
            timezoneOffset: this._controller.getMap().projectDetector.getProject().timeOffset,
            map: this._map,
            isMobile: DG.Browser.mobile,
            showEntrance: DG.Entrance,
            gotoUrl: this._directionsUrl,
            onFirmReady: DG.bind(this._onFirmReady, this),
            onToggle: DG.bind(this._popup.resize, this._popup),
            showBooklet: this.options.showBooklet,
            showPhotos: this.options.showPhotos
        };
    },

    _onFirmReady: function (firmContentObject) {
        var self = this;
        firmContentObject.afterRender = function () {
            var headerTitle = self._popup._popupStructure.header.firstChild;
            if (!DG.Browser.ielt9) {
                if (headerTitle.offsetHeight > 72) { //TODO: magic number
                    DG.DomUtil.addClass(headerTitle, 'dg-popup-header-title__firmcard__teaser');
                    if (!DG.Browser.webkit) {
                        DG.Geoclicker.clampHelper(headerTitle, 3);
                    }
                }
            }
        };
        this._clearAndRenderPopup(firmContentObject);
    },

    // init single firm card in case of poi
    _fillFirmCardObject: function (firmId) {
        var options = this._firmCardSetup(),
            firmCard;

        this.firmCard = new FirmCard(firmId, options);
        return firmCard.getContainer();
    },

    _initShortFirmList: function (firms) { //(Object) -> DOMElement
        var options = this._firmCardSetup(),
            shortFirmList;

        DG.extend(options, {
            backBtn: DG.bind(this._showHousePopup, this),
            onFirmClick: DG.bind(this._onFirmListClick, this),
            pasteLoader: DG.bind(this._pasteLoader, this)
        });

        shortFirmList = new FirmCard.List(firms, {
            firmCard: options,
            firmlistItemTmpl: 'firmlistItem'
        });

        return shortFirmList.renderList();
    },

    _fillFirmListObject: function (firmList) { //(DOMElement) -> Object
        var self = this;

        return {
            tmpl: firmList,
            header: this._header,
            footer: this._view.render({
                tmpl: 'popupFooterBtns',
                data: {
                    btns: [
                        {
                            name: 'firmList-back',
                            label: this.t('back_button'),
                            icon: true
                        }
                    ]
                }
            }),
            afterRender: function () {
                self._initShowLess();
                self._initPopupClose();
                if (self._firmListLoader) {
                    this.tmpl.parentNode.appendChild(self._firmListLoader);  // "this" here is self._firmListObject
                }
            }
        };
    },

    _initFirmList: function (res) { //(Object) -> Promise
        var results = res.result.data,
            options = this._firmCardSetup();

        DG.extend(options, {
            backBtn: DG.bind(function () {
                this._popup.on('scroll', this._onScroll);
                this._showListPopup();
            }, this),
            onFirmClick: DG.bind(this._onFirmListClick, this),
            pasteLoader: DG.bind(this._pasteLoader, this)
        });

        this._firmList = new FirmCard.List(results, {
            firmCard: options,
            firmlistItemTmpl: 'firmlistItem',
            onListReady: DG.bind(this._renderFirmList, this)
        });

        this._firmListObject = this._fillFirmListObject(this._firmList.renderList());
        this._clearAndRenderPopup(this._firmListObject);
    },

    _pasteLoader: function () {
        var loaderWrapper  = DG.DomUtil.create('div', 'loader-wrapper'),
            loader = this._view.initLoader();

        loaderWrapper.appendChild(loader);
        loaderWrapper.style.height = this._popup._contentNode.offsetHeight - 1 + 'px'; // MAGIC
        loaderWrapper.style.width = this._popup._contentNode.offsetWidth + 'px';
        this._clearAndRenderPopup({tmpl: loaderWrapper});
    },

    _onFirmListClick: function (e) {
        this._popup.off('scroll', this._onScroll);
        DG.DomEvent.stop(e);
    },

    _initPopupClose: function () {
        if (this._initedPopupClose) { return; }

        this._controller.getMap().once('popupclose', DG.bind(this._onPopupClose, this));
        this._initedPopupClose = true;
    },

    _onPopupClose: function () {
        this._initedPopupClose = false;
        if (this._firmList) {
            this._firmList.clearList();
            this._firmList = null;
            this._popup.off('scroll', this._onScroll);
        }
        this._firmListLoader = null;
        this._page = 1;
        this._popup.clear();
        this._clearEventHandlers();
    },

    _initShowMore: function () {
        var link = this._popup.findElement('#popup-btn-all');

        if (link) {
            this._addEventHandler('DgShowMoreClick', link, 'click', DG.bind(this._showListPopup, this));
        }
    },

    _showListPopup: function () {
        var firmList = this._firmListObject;

        this._pasteLoader();

        if (!firmList) {
            firmList = this._api.firmsInHouse(this._id).then(DG.bind(this._initFirmList, this));
        } else {
            this._clearAndRenderPopup(firmList);
        }
    },

    _initShowLess: function () {
        var link = this._popup.findElement('#popup-btn-firmList-back');

        if (link) {
            this._addEventHandler('DgShowLessClick', link, 'click', DG.bind(this._showHousePopup, this));
        }
    },

    _showHousePopup: function () {
        this._clearAndRenderPopup(this._houseObject);
    },

    _clearAndRenderPopup: function (popupObject) {
        this._clearEventHandlers();
        this._popup.clear('header', 'footer');
        this._view.renderPopup(popupObject);
    },

    _renderFirmList: function () {
        if (!this._isFirmlistOpen) {
            this._popup.resize();
            this._isFirmlistOpen = true;

            if (!this._onScroll) {
                this._onScroll = DG.Util.throttle(this._handlePopupScroll, this._scrollThrottleInterval, this);
            }

            this._popup.on('scroll', this._onScroll);
        }

        if (this._totalPages === 1 && this._firmListLoader) {
            this._view.hideLoader(this._firmListLoader);
        }
    },

    _appendFirmList: function (res) { // (Object)
        this._firmList.addFirms(res.result.data);
        this._popup._updateScrollPosition();
    },

    _handlePopupScroll: function (event) {
        var scroller = event.originalEvent.target || event.target._scroller;

        if (this._totalPages <= 1) { return; }
        if (scroller && scroller.scrollHeight <= scroller.scrollTop + scroller.offsetHeight + this._scrollHeightReserve) {
            this._handlePaging();
        }
    },

    _handlePaging: function () {
        this._page++;

        if (this._totalPages && this._page <= this._totalPages) {
            this._api.firmsInHouse(this._id, {page: this._page}).then(DG.bind(this._appendFirmList, this));
        }

        if (this._page === this._totalPages) {
            if (this._firmListLoader) {
                this._view.hideLoader(this._firmListLoader);
            }
            this._popup.off('scroll', this._onScroll);
        }
    }
});
