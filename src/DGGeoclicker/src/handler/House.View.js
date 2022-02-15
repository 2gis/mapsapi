DG.Geoclicker.Handler.House.include({
    _getAddressString: function(house) {
        if (!house.address || !house.address.components) {
            return '';
        }

        return house.address.components
            .filter(function(component) {
                return component.type === 'street_number';
            })
            .map(function(component) {
                return component.street + ', ' + component.number;
            })
            .join(' / ');
    },

    _fillBody: function(house) { // // (Object) -> (DOMElement)
        var data = {},
            wrapper = DG.DomUtil.create('div', 'dg-building-callout__body'),
            filials = house.links && house.links.branches;

        var drilldown = this._getDrilldown(house);

        if (house.building_name) {
            data.address = {
                header: this._getAddressString(house),
                drilldown: drilldown
            };
        } else if (drilldown) {
            data.address = {
                drilldown: drilldown
            };
        }

        data.purpose = house.purpose_name +
            (house.floors ? ', ' + this.t('n_floors', house.floors.ground_count) : '');

        if (filials && filials.count > 0) {
            this._totalPages = Math.ceil(house.links.branches.count / this._firmsOnPage);
        }

        if (house.links && house.links.attractions && house.links.attractions.length) {
            data.attractions = house.links.attractions.reduce(function(attractions, attraction) {
                if (attraction.name) {
                    attractions.push(attraction.name);
                }

                return attractions;
            }, []);
        }

        wrapper.innerHTML = this._view.render({
            tmpl: 'house',
            data: data
        });

        if (filials && filials.items) {
            wrapper.appendChild(this._initShortFirmList(filials.items));
        }

        return wrapper;
    },

    _fillHeader: function(house) { // (Object) -> (HTMLString)
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

    _fillFooter: function(house) { // (Object) -> (HTMLString)
        var btns = [];
        var houseFilials = house.links && house.links.branches;
        var filialsItemsCount = houseFilials &&
        houseFilials.items &&
        houseFilials.items.length || 0;

        // Decide if we need to display 'more organisations' button
        if (
            houseFilials &&
            houseFilials.count > filialsItemsCount
        ) {
            btns.push(this._getShowAllData(houseFilials.count));
        }

        if (this._isRouteSearchAllowed()) {
            btns.push({
                name: 'goto',
                label: this.t('go_to'),
                icon: true,
                href: this._directionsUrl
            });
        }

        return this._view.render({
            tmpl: 'popupFooterBtns',
            data: {'btns': btns}
        });
    },

    _getShowAllData: function(filialsCount) {
        return {
            name: 'all',
            label: this.t('show_organization_in_building', filialsCount)
        };
    },

    _fillHouseObject: function(house) { // (Object) -> (Object)
        var self = this;

        return {
            header: this._fillHeader(house),
            tmpl: this._fillBody(house),
            footer: this._fillFooter(house),
            afterRender: function() {
                self._initShowMore();
                self._initPopupClose();
            }
        };
    }
});
