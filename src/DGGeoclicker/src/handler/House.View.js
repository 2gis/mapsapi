DG.Geoclicker.Handler.House.include({
    _fillBody: function (house) { // // (Object) -> (DOMElement)
        var attrs = house.attributes,
            data = {
                title: '',
                purpose: '',
                elevation: '',
                buildingname: '',
                headAddress: '',
                address: ''
            },
            wrapper = DG.DomUtil.create('div', 'building-callout__body'),
            filials = house.attributes.filials;

        if (attrs.city) {
            data.address = (attrs.district ? this.t('district') + ' ' + attrs.district  + ', ' : '') +
                            attrs.city +
                            (attrs.postal_code ? ', ' + attrs.postal_code : '');
        }

        if (house.name && attrs.building_name) {
            data.headAddress = house.name.split(', ').slice(1).join(', ');
        }

        if (attrs.building_description) {
            data.purpose = attrs.building_description +
                (attrs.floors_count !== null ? ', ' + this.t('{n} floors', attrs.floors_count) : '');
        }

        if (attrs.filials_count > 0) {
            this._totalPages = Math.ceil(attrs.filials_count / this._firmsOnPage);
        }

        wrapper.innerHTML = this._view.render({
            tmpl: this._view.getTemplate('house'),
            data: data
        });

        if (filials) {
            wrapper.appendChild(this._initShortFirmList(filials.popular));
        }

        return wrapper;
    },

    _fillHeader: function (house) { // (Object) -> (HTMLString)
        var attrs = house.attributes,
            header = {};

        if (attrs.building_name) {
            header.title = attrs.building_name;
        } else if (house.name) {
            header.title = house.name.split(', ').slice(1).join(', ');
        } else {
            header.title = attrs.building_description;
        }

        this._header = this._view.render({
            tmpl: this._view.getTemplate('popupHeader'),
            data: header
        });

        return this._header;
    },

    _fillFooter: function (house) { // (Object) -> (HTMLString)
        var attrs = house.attributes,
            btns = [],
            isShowOrgs = false;

        if (attrs.filials_count > 0) {
            if (attrs.filials && attrs.filials.popular) {
                if (attrs.filials_count > attrs.filials.popular.length) {
                    isShowOrgs = true;
                }
            } else {
                isShowOrgs = true;
            }
        }
        isShowOrgs && btns.push(this._getShowAllData(attrs.filials_count));

        //UNCOMMENT WHEN ONLINE 4 WILL BE READY
        /*btns.push({
            name: 'goto',
            label: this.t('goto'),
            icon: true,
            href: this._directionsUrl
        });*/

        return this._view.render({
            tmpl: this._view.getTemplate('popupFooterBtns'),
            data: {'btns': btns}
        });
    },

    _getShowAllData: function (filialsCount) {
        return {
            name: 'all',
            label: this.t('Show organization in the building', filialsCount)
        };
    },

    _fillHouseObject: function (house) { // (Object) -> (Object)
        var self = this;

        return {
            header: this._fillHeader(house),
            tmpl: this._fillBody(house),
            footer: this._fillFooter(house),
            afterRender: function () {
                self._initShowMore();
                self._initPopupClose();
            }
        };
    }
});
