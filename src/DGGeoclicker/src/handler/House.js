L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    statics: {
        Dictionary: {}
    },

    _page : 1,
    _isListOpenNow: false,
    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _scrollHeightReserve: 60,
    _hideIndex: false,

    handle: function (results) { // (Object) -> Object
        var self = this;

        if (!results.house) {
            return false;
        }

        this._id = results.house.id;
        this._filialsCount = 0;

        this.houseObj = this._fillHouseObject(results.house);
        this.houseObj.afterRender = function() {
            self._initShowMore();
            self._initPopupClose();
        };

        return this.houseObj;
    },

    _fillHouseObject: function (house) { // (Object) -> Object
        var attrs = house.attributes,
            data = {
                address: '',
                purpose: '',
                elevation: '',
                link: '',
                buildingname: ''
            };

        if (attrs.postal_code) {
            data.address += attrs.postal_code + ', ';
        }

        if (house.name) {
            house.name = house.name.split(", ").slice(1);
            data.address += house.name.join(", ");
        }

        if (attrs.building_name) {
            data.buildingname = attrs.building_name;
        }

        if (attrs.building_description) {
            data.purpose = attrs.building_description;
        }

        if (attrs.floors_count) {
            data.elevation = this.t("{n} floors", + attrs.floors_count);
        }
        if (this._filialsCount = attrs.filials_count > 0) {
            this._totalPages = Math.ceil(attrs.filials_count / this._firmsOnPage);
            data.link = this._view.render({
                tmplFile: "showMoreLink",
                data: {
                    showMoreText: this.t("Show organization in the building"),
                    firmsCount: attrs.filials_count
                }
            });
        }
        return {
            tmpl: this._view.getTemplate("house"),
            data: data
        };
    },

    _initScrollEvents: function() {
        var scrollerBar,
            self = this,
            throttledHandler,
            map = this._controller.getMap(),
            isTouch = L.Browser.touch;
        this._scroller = document.getElementById('scroller');

        if (this._scroller) {
            throttledHandler = L.Util.limitExecByInterval(L.bind(this._handleMouseWheel, this), this._scrollThrottleInterval);
            this._addEventHandler("DgBaronMouseWheel", this._scroller, !isTouch ? 'mousewheel' : 'touchmove', throttledHandler);
            scrollerBar = document.getElementById('scroller__bar');
            this._scroller.onselectstart = function() { return false; };
            L.DomUtil.addClass(this._scroller, 'scroller-with-header');
            L.DomUtil.addClass(L.DomUtil.get('scroller__bar-wrapper'), 'scroller__bar-wrapper-with-header')
        }

        if (scrollerBar) {
            this._addEventHandler("DgBaronMouseDown", scrollerBar, !isTouch ? 'mousedown' : 'touchstart', function() {
                self._addEventHandler("DgBaronMouseMove", map, !isTouch ? 'mousemove' : 'touchmove', throttledHandler);
            });
            this._addEventHandler("DgBaronMouseUp", map, !isTouch ? 'mouseup' : 'touchend', function(e) {
                self._removeEventHandler("DgBaronMouseMove");
                L.DomEvent.preventDefault(e);
            });
        }
    },

    _initPopupClose: function() {
        this._controller.getMap().on('popupclose', L.bind(this._onPopupClose, this));
    },

    _onPopupClose: function() {
        FirmList.clearList();
        this._page = 1;
        this._isListOpenNow = false;
        this._view.getPopup().clearHeaderFooter();
        this._clearEventHandlers();
        this._scroller = undefined;
    },

    _initShowMore: function () {
        var eventType = 'click';

        if (this._filialsCount) {
            this._addEventHandler("DgShowMoreClick", L.DomUtil.get('dg-showmorehouse'), eventType, L.bind(this._showMoreClick, this));
        }
    },

    _showMoreClick: function () {
        this._view.showLoader();
        this._hideIndex = true;

        if (FirmList.isListCached()) {
            this._handleFirmList();
        } else {
            this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._handleFirmList, this));
        }
    },

    _initShowLess: function () {
        var link = L.DomUtil.get('dg-showlesshouse');

        if (link) {
            this._addEventHandler("DgShowLessClick", link, 'click', L.bind(this._showLessClick, this));
        }
    },

    _showLessClick: function () {
        this._hideIndex = false;
        this._isListOpenNow = false;
        this._view.getPopup().clearHeaderFooter();
        this._clearEventHandlers();
        this._view.render(this.houseObj);
    },

    _initFirmList: function (results) {
        FirmList.init(
            results, {
                        tmpls: {
                            loader: this._view.getTemplate("loader"),
                            shortFirm: this._view.getTemplate("shortFirm"),
                            fullFirm: this._view.getTemplate("fullFirm")
                        },
                        render: L.DG.Template
                    }

        );
    },

    _handleMouseWheel: function() {
        var scroller = this._scroller;

        if (scroller && scroller.scrollHeight <= scroller.scrollTop + scroller.offsetHeight + this._scrollHeightReserve) {
            this._handlePaging();
        }
    },

    _handlePaging: function () {
        this._page++;

        if (this._totalPages && this._page <= this._totalPages) {
            this._view.showLoader();
            this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._handleFirmList, this), this._page);
        }
    },

    _handleFirmList: function (results) { // (Object)
        var shouldAppendContent = false,
            popupData = {},
            self = this,
            content;

        if (!this._isListOpenNow) {
            this._initFirmList(results);
            content = this._domToHtml(FirmList.renderList());
            popupData.header = this._renderHeader();
            popupData.footer = this._renderFooter();
            popupData.afterRender = function () {
                self._initShowLess();
                self._initScrollEvents();
                FirmList.initEventHandlers();
            }
            this._isListOpenNow = true;
            content += this._view.getTemplate("loader");
        } else {
            FirmList.addFirms(results);
            content = FirmList.renderFirms();
            shouldAppendContent = true;
            popupData.updateScrollPosition = true;
        }

        popupData.tmpl = content;
        popupData.append = shouldAppendContent;

        this._view.renderPopup(popupData);
        this._view.hideLoader();
    },

    // TODO Remove it!
    _domToHtml: function (dom) {
        var wrap = document.createElement('div');
        wrap.appendChild(dom.cloneNode(true));

        return wrap.innerHTML;
    },

    _renderHeader: function() { // () -> String
        var address = this.houseObj.data.address,
            header = this._view.render({
                tmplFile: "popupHeader",
                data: {
                    address: !this._hideIndex ? address : address.split(", ").slice(1).join(", ")
                }
            });

        return header;
    },

    _renderFooter: function() { // () -> String
        var footer  = this._view.render({
                tmplFile: "popupFooter",
                data: {
                    hideFirmsText: this.t("Hide organization in the building")
                }
            });

        return footer;
    }
});
