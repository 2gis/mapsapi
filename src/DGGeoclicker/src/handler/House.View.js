DG.Geoclicker.Handler.House.include({
    _getAddressString: function (house) {
        if (!house.address || !house.address.components) {
            return '';
        }

        return house.address.components
            .filter(function (component) {
                return component.type === 'street_number';
            })
            .map(function (component) {
                return component.street + ', ' + component.number;
            })
            .join(' / ');
    },

    _fillBody: function (house) { // // (Object) -> (DOMElement)
        var data = {},
            wrapper = DG.DomUtil.create('div', 'dg-building-callout__body'),
            filials = house.links.branches;

        data.drilldown = this._getDrilldown(house);

        if (house.building_name) {
            data.address = this._getAddressString(house);
        }

        data.purpose = house.purpose_name +
            (house.floors ? ', ' + this.t('n_floors', house.floors.ground_count) : '');

        if (house.links.branches.count > 0) {
            this._totalPages = Math.ceil(house.links.branches.count / this._firmsOnPage);
        }

        wrapper.innerHTML = this._view.render({
            tmpl: 'house',
            data: data
        });

        if (filials.items) {
            wrapper.appendChild(this._initShortFirmList(filials.items));
        }

        return wrapper;
    },

    _fillHeader: function (house) { // (Object) -> (HTMLString)
        var header = {};

        if (house.building_name) {
            header.title = house.building_name;
        } else if (house.address && house.address.components) {
            header.title = this._getAddressString(house);
        } else {
            header.title = house.purpose_name;
        }

        this._header = this._view.render({
            tmpl: 'popupHeader',
            data: header
        });

        return this._header;
    },

    _fillFooter: function (house) { // (Object) -> (HTMLString)
        var btns = [],
            isShowOrgs = false;

        if (house.links.branches.count > 0) {
            if (house.links.branches.items) {
                if (house.links.branches.count > house.links.branches.items.length) {
                    isShowOrgs = true;
                }
            } else {
                isShowOrgs = true;
            }
        }
        isShowOrgs && btns.push(this._getShowAllData(house.links.branches.count));

        this._isRouteSearchAllowed() && btns.push({
            name: 'goto',
            label: this.t('go_to'),
            icon: true,
            href: this._directionsUrl
        });

        return this._view.render({
            tmpl: 'popupFooterBtns',
            data: {'btns': btns}
        });
    },

    _getShowAllData: function (filialsCount) {
        return {
            name: 'all',
            label: this.t('show_organization_in_building', filialsCount)
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
