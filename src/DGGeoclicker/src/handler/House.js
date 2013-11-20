/* global
    FirmCard: false
*/
L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,

    handle: function (results) { // (Object) -> Promise
        if (!results.house) {
            return false;
        }

        // initialization setup
        this._page = 1;
        this._houseObject = null;
        this._firmList = null;
        this._firmListObject = null;
        this.firmCard = null;
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

        this._defaultFirm = results.extra && results.extra.poiId ? results.extra.poiId : null;

        if (this._defaultFirm) {
            this._firmCardObject = this._fillFirmCardObject();
        } else {
            this._houseObject = this._fillHouseObject(results.house);
        }

        return L.DG.when(this._defaultFirm ? this._firmCardObject : this._houseObject);
    },

    _firmCardTmplsSetup: function () {
        var tmpls = [
                'firmCardHeader',
                'firmCardAddr',
                'firmCardContacts',
                'firmCardSchedule',
                'frimCardPayments',
                'firmCardRubric',
                'popupFooterBtns'
            ],
            getTemplate = L.bind(this._view.getTemplate, this._view);

        return tmpls.reduce(function (obj, item) {
            obj[item] = getTemplate(item);
            return obj;
        }, {});
    },

    _firmCardSetup: function () { //() -> Object
        return {
            firmCard: {
                tmpls: this._firmCardTmplsSetup(),
                render: L.DG.template,
                lang: this._map.getLang(),
                ajax: L.bind(this._api.getFirmInfo, this._api),
                timezoneOffset: this._controller.getMap().dgProjectDetector.getProject().time_zone_as_offset,
                map: this._map,
                isMobile: L.Browser.mobile,
                showEntrance: L.DG.Entrance,
                gotoUrl: this._directionsUrl,
                onFirmReady: L.bind(this._onFirmReady, this),
                onToggle: L.bind(this._popup.resize, this._popup)
            }
        };
    },

    _onFirmReady: function (firmContentObject) {
        var self = this;
        firmContentObject.afterRender = function () {
            var headerTitle = self._popup._popupStructure.header.firstChild;

            if (headerTitle.offsetHeight > 72 && !L.Browser.webkit) { //TODO: magic number
                L.DG.Geoclicker.clampHelper(headerTitle, 3);
            }
        };
        this._clearAndRenderPopup(firmContentObject);
    },

    // init single firm card in case of poi
    _fillFirmCardObject: function () {
        var options = this._firmCardSetup(),
            firmCard;
        this.firmCard = new FirmCard(this._defaultFirm, options.firmCard);

        return firmCard.getContainer();
    },

    _initShortFirmList: function (firms) { //(Object) -> DOMElement
        var options = this._firmCardSetup(),
            shortFirmList;

        L.extend(options.firmCard, {
            backBtn: L.bind(this._showHousePopup, this),
            onFirmClick: L.bind(this._onFirmListClick, this),
            pasteLoader: L.bind(this._pasteLoader, this)
        });

        L.extend(options, {
            firmlistItemTmpl: this._view.getTemplate('firmlistItem')
        });

        shortFirmList = new FirmCard.List(firms, options);

        return shortFirmList.renderList();
    },

    _fillFirmListObject: function (firmList) { //(DOMElement) -> Object
        var self = this;

        return {
            tmpl: firmList,
            header: this._header,
            footer: this._view.render({
                tmpl: this._view.getTemplate('popupFooterBtns'),
                data: {
                    btns: [
                        {
                            name: 'firmList-back',
                            label: this.t('back button'),
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

        L.extend(options.firmCard, {
            backBtn: L.bind(function () {
                this._popup.on('dgScroll', this._onScroll);
                this._showListPopup();
            }, this),
            onFirmClick: L.bind(this._onFirmListClick, this),
            pasteLoader: L.bind(this._pasteLoader, this)
        });

        L.extend(options, {
            firmlistItemTmpl: this._view.getTemplate('firmlistItem'),
            onListReady: L.bind(this._renderFirmList, this),
        });
        this._firmList = new FirmCard.List(results, options);
        this._firmListObject = this._fillFirmListObject(this._firmList.renderList());
        this._clearAndRenderPopup(this._firmListObject);
    },

    _pasteLoader: function () {
        var loaderWrapper  = L.DomUtil.create('div', 'loader-wrapper'),
            loader = this._view.initLoader();

        loaderWrapper.appendChild(loader);
        loaderWrapper.style.height = this._popup._contentNode.offsetHeight - 1 + 'px'; // MAGIC
        loaderWrapper.style.width = this._popup._contentNode.offsetWidth + 'px';
        this._clearAndRenderPopup({tmpl: loaderWrapper});
    },

    _onFirmListClick: function (e) {
        this._popup.off('dgScroll', this._onScroll);
        L.DomEvent.stop(e);
    },

    _initPopupClose: function () {
        if (this._initedPopupClose) { return; }

        this._controller.getMap().once('popupclose', L.bind(this._onPopupClose, this));
        this._initedPopupClose = true;
    },

    _onPopupClose: function () {
        this._initedPopupClose = false;
        if (this._firmList) {
            this._firmList.clearList();
            this._firmList = null;
            this._popup.off('dgScroll', this._onScroll);
        }
        this._firmListLoader = null;
        this._page = 1;
        this._popup.clear();
        this._clearEventHandlers();
    },

    _initShowMore: function () {
        var link = this._popup.findElement('#popup-btn-all');

        if (link) {
            this._addEventHandler('DgShowMoreClick', link, 'click', L.bind(this._showListPopup, this));
        }
    },

    _showListPopup: function () {
        var firmList = this._firmListObject;

        this._pasteLoader();

        if (!firmList) {
            firmList = this._api.firmsInHouse(this._id).then(L.bind(this._initFirmList, this));
        } else {
            this._clearAndRenderPopup(firmList);
        }
    },

    _initShowLess: function () {
        var link = this._popup.findElement('#popup-btn-firmList-back');

        if (link) {
            this._addEventHandler('DgShowLessClick', link, 'click', L.bind(this._showHousePopup, this));
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
                this._onScroll = L.Util.limitExecByInterval(this._handlePopupScroll, this._scrollThrottleInterval, this);
            }

            this._popup.on('dgScroll', this._onScroll);
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
            this._api.firmsInHouse(this._id, {page: this._page}).then(L.bind(this._appendFirmList, this));
        }

        if (this._page === this._totalPages) {
            if (this._firmListLoader) {
                this._view.hideLoader(this._firmListLoader);
            }
            this._popup.off('dgScroll', this._onScroll);
        }
    }
});