L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    statics: {
        Dictionary: {}
    },

    _lastPage : 1,
    _cache: '',
    _shouldLoadFromCache: false,
    _firmsOnPage: 20,
    _scrollThrottleInterval: 500,

    handle: function (results) { // (Object) -> Object
        var self = this;

        if (!results.house) {
            return false;
        }

        this._id = results.house.id;

        this.houseObj = this._renderHouse(results.house);
        this.houseObj.afterRender = function() {
            self._initShowMore();
            self._initPopupClose();
        };

        return this.houseObj;
    },

    _renderHouse: function (house) { // (Object) -> Object
        var attrs = house.attributes,
            data = {
                address: '',
                purpose: '',
                elevation: '',
                link: '',
                buildingname: ''
            };

        if (attrs.index) {
            data.address += attrs.index + ', ';
        }
        house.name = house.name.split(", ").slice(1);
        data.address += house.name;

        if (attrs.buildingname) {
            data.buildingname = attrs.buildingname;
        }

        if (attrs.purpose) {
            data.purpose = attrs.purpose;
        }

        if (attrs.elevation) {
            data.elevation = this.t("{n} floors", + attrs.elevation);
        }
        if (attrs.firmcount > 0) {
            this._totalPages = Math.ceil(attrs.firmcount / this._firmsOnPage);
            data.link = this._view.render({
                tmplFile: "showMoreLink",
                data: {
                    showMoreText: this.t("Show organization in the building"),
                    firmsCount: attrs.firmcount
                }
            })
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
        this._view.getPopup().clearHeaderFooter();
    },

    _initShowMore: function () {
        var link = L.DomUtil.get('dg-showmorehouse')
        if (link) {
            L.DomEvent.on(link, 'click', this._showMoreClick, this);
        }
    },

    _initScrollEnd: function() {
        var scroller = document.getElementsByClassName('scroller')[0];
        if (scroller) {
            L.DomEvent.on(scroller, 'mousewheel', L.Util.limitExecByInterval(L.bind(this._handleMouseWheel, this), this._scrollThrottleInterval));
        }
    },

    _showMoreClick: function () {
        this._view.showLoader();

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
        var scroller = document.getElementsByClassName('scroller')[0];

        if (scroller.scrollHeight == scroller.scrollTop + scroller.offsetHeight) {
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
        }

        popupData.tmpl = content;
        popupData.append = shouldAppendContent;

        this._view.renderPopup(popupData);

        if (this._page == 1 || shouldLoadFromCache) {
            this._initShowLess();
            this._initScrollEnd();
        }

        this._view.hideLoader();

        this._shouldLoadFromCache = false;
    },

    _renderHeader: function() { // () -> String
        var header = '';

        if (!this._wereHeadersInited) {
            header = this._view.render({
                tmplFile: "popupHeader",
                data: {
                    address: this.houseObj.data.address
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
            this._wereHeadersInited = true;
        }

        return footer;
    },

    _renderFirms: function (list) { // (Array) -> String
        var listHtml = '';

        if (!list || !list.length) {
            return listHtml;
        }
        for (var i in list) {
            listHtml += this._view.render(this._renderFirm(list[i]));
        }

        return listHtml;
    },

    _initShowLess: function () {
        var link = L.DomUtil.get('dg-showlesshouse')

        if (link) {
            L.DomEvent.on(link, 'click', this._showLessClick, this);
        }
    },

    _showLessClick: function () {
        this._view.getPopup().clearHeaderFooter();
        this._wereHeadersInited = false;
        this._lastPage = this._page;
        this._view.render(this.houseObj);
        this._initShowMore();
    },

    _renderFirm: function (firm) { // (Object) -> Object
        // TODO move that to dedicated util
        var params = {
                name: firm.name,
                address: firm.geometry_name ? firm.geometry_name : '',
            };

        return {
            tmpl: this._view.getTemplate("firm"),
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