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

    handle: function (results, extra) { // (Object, ?Object) -> Object
        var self = this;

        if (!results.house) {
            return false;
        }

        this._firmList = null;
        this._id = results.house.id;
        this._filialsCount = 0;
        this._defaultFirm = extra && extra.poiId ? extra.poiId : null;
        // this._defaultFirm = 141265771962688; // TODO Remove this mock

        this._popup = this._view.getPopup();
        this._houseObject = this._fillHouseObject(results.house);
        if (this._defaultFirm) {
            return this._fillFirmListObject();
        } else {
            return this._houseObject;
        }
    },

    _fillHouseObject: function (house) { // (Object) -> Object
        var attrs = house.attributes,
            data = {
                address: '',
                purpose: '',
                elevation: '',
                link: '',
                buildingname: ''
            },
            self = this;

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
            data: data,
            afterRender: function(){
                self._initShowMore();
                self._initPopupClose();
            }
        };
    },

    _fillFirmListObject: function(){
        var self = this,
            content = document.createElement('div');

        this._hideIndex = true;
        this._firmListObject = {
            tmpl: content,
            header: this._renderHeader(),
            footer: this._renderFooter(),
            afterRender: function(){
                self._initShowLess();
            },
            firmListContainer: content
        };
        this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._initFirmList, this));
        return this._firmListObject;
    },

    _initPopupClose: function() {
        this._controller.getMap().on('popupclose', L.bind(this._onPopupClose, this));
    },

    _onPopupClose: function() {
        if (this._firmList) {
            this._firmList.clearList();
            this._firmList = null;
        }
        this._page = 1;
        this._isListOpenNow = false;
        this._popup.clearHeaderFooter();
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
        this._clearEventHandlers();
        if (!this._firmListObject) {
            this._fillFirmListObject();
        }
        this._popup.clearHeaderFooter();
        this._view.renderPopup(this._firmListObject);
    },

    _initShowLess: function() {
        var link =  this._popup._contentNode.querySelector('#dg-showlesshouse');

        if (link) {
            this._addEventHandler('DgShowLessClick', link, 'click', L.bind(this._showLessClick, this));
        }
    },

    _showLessClick: function () {
        this._hideIndex = false;
        this._isListOpenNow = false;
        this._clearEventHandlers();
        this._popup.clearHeaderFooter();
        this._view.renderPopup(this._houseObject);
    },

    _initFirmList: function (results) {
        var self = this;

        this._firmList = new FirmCard.List({
                tmpls: {
                    loader: this._view.getTemplate("loader"),
                    shortFirm: this._view.getTemplate("shortFirm"),
                    fullFirm: this._view.getTemplate("fullFirm")
                },
                container : this._firmListObject.firmListContainer,
                render: L.DG.Template,
                defaultFirm: this._defaultFirm,
                ajax: function(id, callback) {
                    self._controller.getCatalogApi().getFirmInfo(id, callback);
                },
                onReady: L.bind(this._handleFirmList, this),
                onToggleCard: L.bind(this._onFirmlistToggleCard, this)
            }, results
        );
    },

    _onFirmlistToggleCard: function(cardContainer, cardExpanded){
        // console.log(cardContainer, cardExpanded);
        if (cardExpanded) {
            // L.DomEvent.addListener( this._scroller, 'scroll', function(){
            //     console.log('scroll');
            //     console.log(this._scroller.scrollHeight, cardContainer.offsetTop - cardContainer.parentNode.offsetTop);
            //     this._scroller.scrollTop = cardContainer.offsetTop - cardContainer.parentNode.offsetTop;
            //     console.log(this._scroller.scrollTop);
            // }, this );
            console.log(this._scroller.scrollHeight, cardContainer.offsetTop - cardContainer.parentNode.offsetTop);
            this._scroller.scrollTop = cardContainer.offsetTop - cardContainer.parentNode.offsetTop;
            console.log(this._scroller.scrollTop);
            this._handleMouseWheel();
        }
    },

    _initLazyLoading: function() {
        if (this._scroller = this._popup._scroller) {
            L.DomEvent.addListener( this._scroller, 'scroll', L.Util.limitExecByInterval(L.bind(this._handleMouseWheel, this), this._scrollThrottleInterval) );
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
            this._controller.getCatalogApi().firmsInHouse(this._id, L.bind(this._handleFirmList, this), this._page);
        }
    },

    _handleFirmList: function (results) { // (Object)

        if (!this._isListOpenNow) {
            this._isListOpenNow = true;
            this._firmList.renderList();
            this._firmList.initEventHandlers();
            this._popup._resize();
            this._initLazyLoading();
            // content.appendChild(this._view._initLoader());
        } else {
            this._firmList.addFirms(results);
            this._firmList.renderList();
            this._view.hideLoader();
            // this._popup._baron.update();
        }

        return;
    },

    _renderHeader: function() { // () -> String
        var address = this._houseObject.data.address,
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
