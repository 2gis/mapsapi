/**
 *
 */

L.DG.Geoclicker.Handler.House = L.DG.Geoclicker.Handler.Default.extend({

    statics: {
        Dictionary: {}
    },

    handle: function (results) { // (Object) -> Boolean
        var self = this;

        if (!results.house) {
            return false;
        }

        this._id = results.house.id;

        //this._houseContent = this._renderHouse(results.house);
        this.houseObj = this._renderHouse(results.house);
        //this._popup.setContent(this._houseContent);
        this.houseObj.afterRender = function() {
            self._initShowMore();
            self._initPaging();
        };

        return this.houseObj;
    },

    _renderHouse: function (house) { // (Object) -> Object
        var attrs = house.attributes,
        // @todo добавить инициализацию всех свойств
            data = {
                address: '',
                purpose: '',
                elevation: '',
                link: ''
            };

        if (attrs.index) {
            data.address += attrs.index + ' ';
        }
        data.address += house.name;

// @todo добавить правильную фильтрацию (если нужно) всех свойств
        if (attrs.purpose) {
            data.purpose = attrs.purpose;
        }

        if (attrs.elevation) {
            console.log('elevation', attrs.elevation)
            data.elevation = '' + this.t("{n} floors", +attrs.elevation);
        }

        if (attrs.firmcount > 0) {
            data.link = '<a id="dg-showmorehouse" href="javascript:void(0)">' + this.t("Show all organisations in this building") + ' (' + attrs.firmcount + ')</a>';
        }

        return {
            tmpl: '<h3>{address}</h3><br/>' + '<div>{purpose}</div>' + '<div>{elevation}</div>' + '<div>{link}</div>',
            data: data
        };
    },

    _initShowMore: function () {
        var link = L.DomUtil.get('dg-showmorehouse')
        if (link) {
            L.DomEvent.on(link, 'click', this._showMoreClick, this);
        }
    },

    _initPaging: function () {
        //@todo implement this after JSAPI-3049
    },

    _showMoreClick: function () {

        //this._popup.showLoader();
        this._view.showLoader();

        this._page = 1;

        this._controller._catalogApi.firmsInHouse(this._id, L.bind(this._handleFirmsLoadingEnd, this)); //@todo encapsulations hack (controller._catalogApi.firmsInHouse) - fix
    },

    _handlePaging: function () {

        // @todo implement this
        //this._popup.showLoaderPaging();
        this._page++;

        this._controller._catalogApi.getFirms(this._id, L.bind(this._handleFirmsLoadingEnd, this), this._page);
    },

    _handleFirmsLoadingEnd: function (results) { // (Object)

        var content = this._renderFirms(results);

        if (this._page == 1) {
            this._contentFirms = content;
            //this._popup.setContent(content);
            //this._popup.hideLoader();
            this._view.renderPopup({
                tmpl: this._contentFirms
            });
            this._view.hideLoader();
            this._initShowLess();
        } else {
            //@todo проврерить, чтобы прокрутка не сбрасывалась вверх
            this._contentFirms = +content;
            //this._popup.setContent(this._contentFirms);
            this._view.renderPopup({
                tmpl: this._contentFirms
            });
            //this._popup.hideLoaderPaging();
        }

    },

    _renderFirms: function (list) { // (Array) -> String
        var listHtml = '';
        if (!list || !list.length) {
            return listHtml;
        }

        for (var i in list) {
            listHtml += this._view.render(this._renderFirm(list[i]));
        }

        listHtml += '<a id="dg-showlesshouse" href="javascript:void(0)">Скрыть организации в здании</a>';

        return listHtml;
    },

    _initShowLess: function () {
        var link = L.DomUtil.get('dg-showlesshouse')

        if (link) {
            L.DomEvent.on(link, 'click', this._showLessClick, this);
        }
    },

    _showLessClick: function (firm) { // (Object)
        this._view.render(this.houseObj);
        this._initShowMore();
    },

    _renderFirm: function (firm) { // (Object) -> Object
        // @todo move that to dedicated util
        var params = {
                name: firm.name,
                address: firm.geometry_name ? firm.geometry_name : '',
                contacts: this._renderFirmContacts(firm.contacts)
            };

        return {
            tmpl: '<h3>{name}</h3><br/><div>{contacts}</div>',
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


