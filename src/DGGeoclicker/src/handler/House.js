/* global
    FirmCard: false
*/
L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    _page : 1,
    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,

    handle: function (results) { // (Object, String) -> Promise
        if (!results.house) {
            return false;
        }

        // initialization setup
        this._firmList = null;
        this._shortFirmList = null;
        this._houseObject = null;
        this._firmListObject = null;
        this._shortFirmListObject = null;
        this._shortListContainer = null;
        this._isFirmlistOpen = false;

        this._id = results.house.id;
        this._totalPages = 1;
        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._initedPopupClose = false;
        this._gotoUrl = this._getGotoUrl(results.house.name);


        this._defaultFirm = /*'141265771576530';*/  results.extra && results.extra.poiId ? results.extra.poiId : null;
        // this._defaultFirm = 141265771742807;

        if (this._defaultFirm) {
            this._fillFirmCardObject();
        } else {
            this._fillHouseObject(results.house);
        }

        return L.DG.when(this._houseObject);
    },

    _firmCardSetup: function () {
        return {
            tmpls: {
                loader: this._view.getTemplate('loader'),
                firmlistItem: this._view.getTemplate('firmlistItem'),
                header: this._view.getTemplate('firmCardHeader'),
                body: this._view.getTemplate('fullFirm'),
                addr: this._view.getTemplate('firmCardAddr'),
                contacts: this._view.getTemplate('firmCardContacts'),
                schedule: this._view.getTemplate('firmCardSchedule'),
                rubrics: this._view.getTemplate('firmCardRubric'),
                footer: this._view.getTemplate('popupFooterBtns')
            },
            render: L.DG.template,
            lang: this._map.getLang(),
            ajax: L.bind(this._api.getFirmInfo, this._api),
            timezoneOffset: this._controller.getMap().dgProjectDetector.getProject().time_zone_as_offset,
            //firm card options
            map: this._map,
            showEntrance: L.DG.Entrance,
            gotoUrl: this._gotoUrl,
            onFirmReady: L.bind(this._clearAndRenderPopup, this)
        };
    },

    _renderFirm: function (firmObject) {
        this._clearAndRenderPopup(firmObject);
    },

    // init single firm card
    _fillFirmCardObject: function () {
        var options = this._firmCardSetup();

        this._firmCard = new FirmCard(this._defaultFirm, options);
    },

    _initFirmListContainer: function () {
        var container = L.DomUtil.create('ul', 'building-callout__list');
        return container;
    },

    _initShortFirmListContainer: function () {
        if (!this._shortListContainer) {
            this._shortListContainer = L.DomUtil.create('ul', 'building-callout__list');
        }
        return this._shortListContainer;
    },

    _fillShortFirmListObject: function () {
        var content = this._initShortFirmListContainer();

        if (!this._shortFirmListObject) {
            this._shortFirmListObject = {
                tmpl: content,
                firmListContainer: content
            };

            this._api.firmsInHouse(this._id, {page: 1, pageSize: 3}).then(
                L.bind(this._initShortFirmList, this)
            );
        }

        this._view._popup._popupStructure.body.appendChild(content);
    },

    _initShortFirmList: function (res) {
        var results = res.result.data,
            options = this._firmCardSetup();

        options.tmpls.firmlistItem = this._view.getTemplate('firmlistItem');
        options.backBtn = L.bind(this._showHousePopup, this);
        options.container = this._shortFirmListObject.firmListContainer;

        this._shortFirmList = new FirmCard.List(results, options);
    },

    _fillFirmListObject: function () {
        var self = this,
            content = this._initFirmListContainer();

        this._firmListObject = {
            tmpl: content,
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
                /*if (self._loader) {
                    this.firmListContainer.parentNode.appendChild(self._loader);  // "this" here is self._firmListObject
                }*/
            },
            firmListContainer: content
        };

        this._loader = this._view.initLoader();
        this._api.firmsInHouse(this._id).then(L.bind(this._initFirmList, this));
    },

    _initFirmList: function (res) {
        var results = res.result.data,
            options = this._firmCardSetup();

        options.tmpls.firmlistItem = this._view.getTemplate('firmlistItem');
        options.backBtn = L.bind(this._showListPopup, this);
        options.container = this._firmListObject.firmListContainer;
        options.onListReady = L.bind(this._renderFirmList, this);

        this._firmList = new FirmCard.List(results, options);
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
        this._loader = null;
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
        if (!this._firmListObject) {
            this._fillFirmListObject();
        } //else {
        this._clearAndRenderPopup(this._firmListObject);
        //}
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
            this._popup._resize();
            this._isFirmlistOpen = true;
        }
        /*this._clearAndRenderPopup(this._firmListObject);

        if (this._totalPages === 1) {
            this._loader && this._view.hideLoader(this._loader);
        }

        this._firmList.renderList();*/
        this._onScroll = L.Util.limitExecByInterval(this._handlePopupScroll, this._scrollThrottleInterval, this);
        this._popup.on('dgScroll', this._onScroll);
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
            if (this._loader) {
                this._view.hideLoader(this._loader);
            }
            this._popup.off('dgScroll', this._onScroll);
        }
    }
});
