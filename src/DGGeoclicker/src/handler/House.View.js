L.DG.Geoclicker.Handler.House.include({
    _fillBody: function (house) { // (Object)
        var attrs = house.attributes,
            data = {
                title: '',
                purpose: '',
                elevation: '',
                buildingname: '',
                headAddress: ''
            };

        if (attrs.postal_code) {
            data.address = attrs.district + ' ' + this.t('district') + ', ' + attrs.city + ', ' +  attrs.postal_code;
        }

        if (house.name && attrs.building_name) {
            data.headAddress = house.name.split(', ').slice(1).join(', ');
        }

        if (attrs.building_description) {
            data.purpose = attrs.building_description + ', ' + this.t('{n} floors', attrs.floors_count);
        }

        if (attrs.filials_count > 0) {
            this._totalPages = Math.ceil(attrs.filials_count / this._firmsOnPage);
        }

        return data;
    },

    _fillHeader: function (house) {
        var attrs = house.attributes,
            header = {};

        if (attrs.building_name) {
            header.title = attrs.building_name;
        } else if (house.name) {
            header.title = house.name.split(', ').slice(1).join(', ');
        }

        //DELETE IT!
        this._title = header.title;

        this._header = this._view.render({
            tmpl: this._view.getTemplate('popupHeader'),
            data: header
        });

        return this._header;
    },

    _fillFooter: function (house) {
        var attrs = house.attributes,
            btns = [];

        if (attrs.filials_count > 0) {
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

        this._footer = this._view.render({
            tmpl: this._view.getTemplate('popupFooterBtns'),
            data: {'btns': btns}
        });

        return this._footer;
    },

    _fillHouseObject: function (house) { // (Object)
        var self = this;

        this._houseObject = {
            tmpl: this._view.getTemplate('house'),
            // data: data,
            data: this._fillBody(house),
            header: this._fillHeader(house),
            footer: this._fillFooter(house),
            afterRender: function () {
                self._initShowMore();
                self._initPopupClose();
                // request data for first 3 organizations
                self._fillShortFirmListObject();
            }
        };
    }
});