/**
 *
 */

L.DG.Geoclicker.Handlers.House = L.Class.extend({

    initialize: function (controller, popup) {
        this._popup = popup;
        this.controller = controller;
    },

    handle: function (results) {

        if (!results.house) {
            return false;
        }

        this._id = results.house.id;

        this._houseContent = this._renderHouse(results.house)
        this._popup.setContent(this._houseContent);

        this._initShowMore();
        this._initPaging();
        return true;
    },

    _renderHouse: function (house) {

        var
            attrs = house.attributes,
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


        if (attrs.purpose) {
            data.purpose = attrs.purpose;
        }

        if (attrs.elevation) {
            data.elevation = 'Этажей: ' + attrs.elevation; //@todo i18n
        }

        if (attrs.firmcount > 0) {
            data.link = '<a id="dg-showmorehouse" href="javascript:void(0)">Показать все организации в здании (' + attrs.firmcount + ')</a>';
        }


        var tmpl = '<h3>{address}</h3><br/>' +
            '<div>{purpose}</div>' +
            '<div>{elevation}</div>' +
            '<div>{link}</div>';

        return L.Util.template(tmpl, data);
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

        this._popup.showLoader();

        this._page = 1;

        this.controller._webApi.firmsInHouse(this._id, L.bind(this._handleFirmsLoadingEnd, this)); //@todo encapsulations hack (controller._webApi.firmsInHouse) - fix
    },

    _handlePaging: function () {

        //this._popup.showLoaderPaging();
        this._page++;

        this.controller._geoCoder.getFirms(this._id, L.bind(this._handleFirmsLoadingEnd, this), this._page);
    },

    _handleFirmsLoadingEnd: function (results) {

        var content = this._renderFirms(results);

        if (this._page == 1) {
            this._contentFirms = content;
            this._popup.setContent(content);

            this._popup.hideLoader();
            this._initShowLess();
        } else {
            this._contentFirms = +content;
            this._popup.setContent(this._contentFirms);

            //this._popup.hideLoaderPaging();
        }

    },

    _renderFirms: function (list) {
        var listHtml = '';
        if (!list || !list.length) {
            return listHtml;
        }

        for (var i in list) {
            listHtml += this._renderFirm(list[i]);
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

    _showLessClick: function (firm) {
        this._popup.setContent(this._houseContent);
        this._initShowMore();
    },

    _renderFirm: function (firm) { // @todo move that to dedicated util

        var params = {
                name: firm.name,
                address: firm.geometry_name ? firm.geometry_name : '',
                contacts: this._renderFirmContacts(firm.contacts)
            },

            tmpl = '<h3>{name}</h3><br/>' +
                '<div>{contacts}</div>';

        return L.Util.template(tmpl, params);

    },

    _renderFirmContacts: function (contacts) {
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


