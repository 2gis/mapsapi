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

        // initialization setup
        this._firmList = null;
        this._houseObject = null;
        this._firmListObject = null;
        this._id = results.house.id;
        this._totalPages = 1;
        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._initedPopupClose = false;
        this._gotoUrl = this._getGotoUrl('__PPNOT_LINK__', results.house.name);

        this._defaultFirm = /*'141265771576530'; */  results.extra && results.extra.poiId ? results.extra.poiId : null;

        // TODO: refactor it
        if (this._defaultFirm) {
            this._fillFirmCardObject();
        } else {
            this._fillHouseObject(results.house);
        }

        return L.DG.when(this._defaultFirm ? this._fillFirmListObject() : this._houseObject);
    },

    _fillHouseObject: function (house) { // (Object)
        var attrs = house.attributes,
            data = {
                title: '',
                purpose: '',
                elevation: '',
                buildingname: '',
            },
            header = {},
            self = this,
            btns = [];

        if (attrs.postal_code) {
            data.address = attrs.district + ' ' + this.t('district') + ', ' + attrs.city + ', ' +  attrs.postal_code;
        }

        if (house.name) {
            data.title = header.title = house.name.split(', ').slice(1).join(', ');
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
            btns.push({
                name: 'all',
                label: this.t('Show organization in the building', attrs.filials_count)
            });
        }

        btns.push({
            name: 'goto',
            label: this.t('goto'),
            icon: true,
            href: this._gotoUrl
        });

        this._houseObject = {
            tmpl: this._view.getTemplate('house'),
            data: data,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: header
            }),
            footer: this._view.render({
                tmpl: this._view.getTemplate('popupFooterBtns'),
                data: {
                    'btns': btns
                }
            }),
            afterRender: function () {
                self._initShowMore();
                self._initPopupClose();
            }
        };
    },

    _getGotoUrl: function (url, name) {
        return L.Util.template(url, {
            'code': this._map.dgProjectDetector.getProject().code,
            'name': encodeURIComponent(name),
            'point': 'POINT(' + this._popup._latlng.lng + ' ' + this._popup._latlng.lat + ')'
        });
    },

    // init single firm card
    _fillFirmCardObject: function () {
        var addOptions = {
                tmpls: {
                    loader: this._view.getTemplate('loader'),
                    header: this._view.getTemplate('firmCardHeader'),
                    body: this._view.getTemplate('fullFirm'),
                    footer: this._view.getTemplate('popupFooterBtns')
                },
                render: L.DG.template,
                map: this._map,
                showEntrance: L.DG.Entrance,
                lang: this._map.getLang(),
                gotoUrl: this._gotoUrl,
                ajax: L.bind(this._api.getFirmInfo, this._api),
                backBtn: L.bind(this._showListPopup, this),//L.bind(this._showHousePopup, this),
                callback: L.bind(function (firmObject) {
                    this._clearAndRenderPopup(firmObject);
                }, this),
                timezoneOffset: this._controller.getMap().dgProjectDetector.getProject().time_zone_as_offset
            };

        this._firmCard = new FirmCard (this._defaultFirm, addOptions);
    },

    _fillFirmListObject: function () {
        var self = this,
            content = document.createElement('div');
        this._firmListObject = {
            tmpl: content,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: {'title': this._houseObject.data.title }
            }),
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
        this._api.firmsInHouse(this._id, L.bind(this._initFirmList, this));
    },

    _initFirmList: function (results) {
        this._fillFirmCardObject();

        this._firmList = new FirmCard.List({
                tmpls: {
                    loader: this._view.getTemplate('loader'),
                    fullFirm: this._view.getTemplate('fullFirm'),
                    firmlistItem: this._view.getTemplate('firmlistItem')
                },
                container: this._firmListObject.firmListContainer,
                render: L.DG.template,
                defaultFirm: this._defaultFirm,
                lang: this._map.getLang(),
                ajax: L.bind(this._api.getFirmInfo, this._api),
                onReady: L.bind(this._renderFirmList, this),
                timezoneOffset: this._controller.getMap().dgProjectDetector.getProject().time_zone_as_offset,
                firmCard: this._firmCard
                //onToggleCard: L.bind(this._onFirmlistToggleCard, this)
            }, results
        );
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
        this._isListOpenNow = false;
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
        this._isListOpenNow = false;
        this._clearAndRenderPopup(this._houseObject);
    },

    _clearAndRenderPopup: function (popupObject) {
        this._clearEventHandlers();
        this._popup.clear('header', 'footer');
        this._view.renderPopup(popupObject);
    },

    _renderFirmList: function () {
        if (this._isListOpenNow) { return; }
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
