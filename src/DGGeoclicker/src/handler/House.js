L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    statics: {
        Dictionary: {}
    },

    _lastPage : 1,
    _cache: '',
    _shouldLoadFromCache: false,
    _firmsOnPage: 20,
    _scrollThrottleInterval: 400,
    _eventHandlers: {},
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

    _initPopupClose: function() {
        this._controller.getMap().on('popupclose', L.bind(this._onPopupClose, this));
    },

    _onPopupClose: function() {
        this._cache = '';
        this._shouldLoadFromCache = false;
        this._lastPage = 1;
        this._wereHeadersInited = false;
        this._clearEventHandlers();
        this._view.getPopup().clearHeaderFooter();
        this._scroller = undefined;
    },

    _initShowMore: function () {
        var eventType = 'click';

        if (this._filialsCount) {
            this._addEventHandler("DgShowMoreClick", L.DomUtil.get('dg-showmorehouse'), eventType, L.bind(this._showMoreClick, this));
        }
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

    _showMoreClick: function () {
        this._view.showLoader();
        this._hideIndex = true;
        if (this._lastPage !== 1) {
            this._page = this._lastPage;
            this._shouldLoadFromCache = true;
            this._handleFirmsLoadingEnd();
        } else {
            this._page = 1;
            this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._handleFirmsLoadingEnd, this));
        }
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
            this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._handleFirmsLoadingEnd, this), this._page);
        }
    },

    _handleFirmsLoadingEnd: function (results) { // (Object)
        var shouldAppendContent = false,
            header = this._renderHeader(),
            footer = this._renderFooter(),
            shouldLoadFromCache = this._shouldLoadFromCache,
            popupData = {},
            content;

        this._wereHeadersInited = true;
        content = shouldLoadFromCache ? this._cache : this._renderFirms(results);

        if (!shouldLoadFromCache) {
            this._cache += content;
        }

        if (this._page === 1 || shouldLoadFromCache) {
            popupData.header = header;
            popupData.footer = footer;
            content += this._view.getTemplate("loader");
        } else {
            shouldAppendContent = true;
            popupData.updateScrollPosition = true;
        }

        popupData.tmpl = content;
        popupData.append = shouldAppendContent;

        this._view.renderPopup(popupData);

        if (this._page == 1 || shouldLoadFromCache) {
            this._initShowLess();
            this._initScrollEvents();
        }

        this._view.hideLoader();

        this._shouldLoadFromCache = false;
    },

    _renderHeader: function() { // () -> String
        var header = '',
            address;

        if (!this._wereHeadersInited) {
            address = this.houseObj.data.address;
            header = this._view.render({
                tmplFile: "popupHeader",
                data: {
                    address: !this._hideIndex ? address : address.split(", ").slice(1).join(", ")
                }
            });
        }

        return header;
    },

    _renderFooter: function() { // () -> String
        var footer = '';

        if (!this._wereHeadersInited) {
            footer = this._view.render({
                tmplFile: "popupFooter",
                data: {
                    hideFirmsText: this.t("Hide organization in the building")
                }
            });
        }

        return footer;
    },

    _renderFirms: function (list) { // (Array) -> String
        var listHtml = '',
            self = this;

        if (!list || !list.length) {
            return listHtml;
        }
        for (var i in list) {
            listHtml += this._view.render(this._fillFirmObject(list[i]));
        }

        return listHtml;
    },

    _initShowLess: function () {
        var link = L.DomUtil.get('dg-showlesshouse');

        if (link) {
            this._addEventHandler("DgShowLessClick", link, 'click', L.bind(this._showLessClick, this));
        }
    },

    _showLessClick: function () {
        this._hideIndex = false;
        this._view.getPopup().clearHeaderFooter();
        this._clearEventHandlers();
        this._wereHeadersInited = false;
        this._lastPage = this._page;
        this._view.render(this.houseObj);
    },

    _fillFirmObject: function ( firm ) { // (Object) -> Object
        // TODO move that to dedicated util
        var params = {
                id: firm.id,
                name: firm.name,
                address: firm.geometry_name ? firm.geometry_name : '',
            };

        return {
            tmpl: this._view.getTemplate("shortFirm"),
            data: params
        };
    },

    _renderFirmContacts: function (contacts) { // (Array) -> String
        var contactsHtml = '';

        if (!contacts || !contacts.length) {
            return contactsHtml;
        }

        for (var i in contacts) {
            var group = contacts[i];
            if (group.name) {
                contactsHtml += '<div>' + group.name + '</div>';
            } else {
                contactsHtml += '<div></div>';
            }

            for (var j in group.contacts) {

                var contact = group.contacts[j];
                contactsHtml += '<div>' + contact.value + '</div>';
            }
        }

        return contactsHtml;
    }
});
