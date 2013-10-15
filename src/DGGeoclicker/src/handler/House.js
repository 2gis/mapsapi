L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    _page : 1,
    _isListOpenNow: false,
    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,

    handle: function (results) { // (Object, String) -> Promise
        if (!results.house) {
            return false;
        }

        this._firmList = null;
        this._houseObject = null;
        this._firmListObject = null;
        this._id = results.house.id;
        this._totalPages = 1;
        this._defaultFirm = results.extra && results.extra.poiId ? results.extra.poiId : null;

        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._fillHouseObject(results.house);

        this._initedPopupClose = false;

        return L.DG.when(this._defaultFirm ? this._fillFirmListObject() : this._houseObject);
    },

    _fillHouseObject: function (house) { // (Object)
        var attrs = house.attributes,
            data = {
                address: '',
                addressWithoutIndex: '',
                title: '',
                purpose: '',
                elevation: '',
                link: '',
                buildingname: '',
                firmsCount: attrs.filials_count
            },
            self = this;

        if (attrs.postal_code) {
            data.address += attrs.postal_code + ', ';
        }

        if (house.name) {
            house.name = data.title = data.addressWithoutIndex = house.name.split(", ").slice(1).join(", ");
            data.address += house.name;
        }

        if (attrs.building_name) {
            data.buildingname = attrs.building_name;
        }

        if (attrs.building_description) {
            data.purpose = attrs.building_description;
        }

        if (attrs.floors_count) {
            data.elevation = this.t('{n} floors', + attrs.floors_count);
        }

        if (attrs.filials_count > 0) {
            this._totalPages = Math.ceil(attrs.filials_count / this._firmsOnPage);
            data.showMoreText = this.t('Show organization in the building');
        }

        this._houseObject = {
            tmpl: this._view.getTemplate('house'),
            data: data,
            afterRender: function () {
                self._initShowMore();
                self._initPopupClose();
            }
        };
    },

    _fillFirmListObject: function () {
        var self = this,
            content = document.createElement('div');

        this._firmListObject = {
            tmpl: content,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: this._houseObject.data
            }),
            footer: this._view.render({
                tmpl: this._view.getTemplate('popupFooter'),
                data: {
                    hideFirmsText: this.t('Hide organization in the building')
                }
            }),
            afterRender: function () {
                self._initShowLess();
                self._initPopupClose();
                if (self._loader) {
                    this.firmListContainer.parentNode.appendChild(self._loader);  // "this" here is self._firmListObject
                }
            },
            firmListContainer: content
        };

        this._loader = this._view.initLoader();
        this._api.firmsInHouse(this._id, L.bind(this._initFirmList, this));
    },

    _initPopupClose: function () {
        if (this._initedPopupClose) return;

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
        this._isListOpenNow = false;
        this._popup.clear('header', 'footer');
        this._clearEventHandlers();
    },

    _initShowMore: function () {
        var link = this._popup.findElement('#dg-showmorehouse');

        if (link) {
            this._addEventHandler('DgShowMoreClick', link, 'click', L.bind(this._showListPopup, this));
        }
    },

    _showListPopup: function () {
        if (!this._firmListObject) {
            this._fillFirmListObject();
            this._popup.showLoader();
        } else {
            this._clearAndRenderPopup(this._firmListObject);
        }
    },

    _initShowLess: function () {
        var link = this._popup.findElement('#dg-showlesshouse');

        if (link) {
            this._addEventHandler('DgShowLessClick', link, 'click', L.bind(this._showHousePopup, this));
        }
    },

    _showHousePopup: function () {
        this._isListOpenNow = false;
        this._clearAndRenderPopup(this._houseObject);
    },

    _clearAndRenderPopup: function (popupObject) {
        this._clearEventHandlers();
        this._popup.clear('header', 'footer');
        this._view.renderPopup(popupObject);
    },

    _initFirmList: function (results) {
        this._firmList = new FirmCard.List({
                tmpls: {
                    loader: this._view.getTemplate('loader'),
                    shortFirm: this._view.getTemplate('shortFirm'),
                    fullFirm: this._view.getTemplate('fullFirm')
                },
                container: this._firmListObject.firmListContainer,
                render: L.DG.template,
                defaultFirm: this._defaultFirm,
                lang: this._map.getLang(),
                ajax: L.bind(this._api.getFirmInfo, this._api),
                onReady: L.bind(this._renderFirmList, this),
                timezoneOffset: this._controller.getMap().dgProjectDetector.getProject().time_zone_as_offset,
                onToggleCard: L.bind(this._onFirmlistToggleCard, this)
            }, results
        );
    },

    _renderFirmList: function () {
        if (this._isListOpenNow) return;
        this._isListOpenNow = true;
        this._clearAndRenderPopup(this._firmListObject);

        if (this._totalPages === 1) {
            this._loader && this._view.hideLoader(this._loader);
        }

        this._firmList.renderList();
        this._popup._resize();
        this._onScroll = L.Util.limitExecByInterval(this._handlePopupScroll, this._scrollThrottleInterval, this);
        this._popup.on('dgScroll', this._onScroll);
    },

    _appendFirmList: function (results) { // (Object)
        this._firmList.addFirms(results);
        this._firmList.renderList();
        this._popup._updateScrollPosition();
    },

    _onFirmlistToggleCard: function (cardContainer, cardExpanded) {
        this._popup._resize();

        if (cardExpanded && this._popup._scroller) {
            this._popup.scrollTo(cardContainer.offsetTop - cardContainer.parentNode.offsetTop);
        }
    },

    _handlePopupScroll: function (event) {
        var scroller = event.originalEvent.target || event.target._scroller;

        if (this._totalPages <= 1) return;
        if (scroller && scroller.scrollHeight <= scroller.scrollTop + scroller.offsetHeight + this._scrollHeightReserve) {
            this._handlePaging();
        }
    },

    _handlePaging: function () {
        this._page++;

        if (this._totalPages && this._page <= this._totalPages) {
            this._api.firmsInHouse(this._id, L.bind(this._appendFirmList, this), this._page);
        }
        if (this._page === this._totalPages) {
            this._loader && this._view.hideLoader(this._loader);
        }
    }
});
