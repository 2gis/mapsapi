L.DG.Geoclicker.Handler.Sight = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results) { // (Object, String) -> Promise
        if (!results.sight) {
            return false;
        }

        this._popup = this._view.getPopup();
        this._initedPopupClose = false;

        return L.DG.when(this._fillSightObject(results));
    },

    _buildAddress: function (array) { // (Array) -> String
        var address = [];

        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                address.push(array[i]);
            }
        }

        return address.join(', ');
    },

    _fillSightObject: function (results) { // (Object) -> Object
        var attrs = results.sight.attributes,
            data = {
                address: '',
                drillDown: '',
                buildingName: '',
                purpose: '',
                description: attrs.info.description
            },
            self = this,
            abbr,
            house,
            PPNOTUrl = '__PPNOT_LINK__',
            footer = {
                btns: [
                    {
                        name: 'goto',
                        label: this.t('goto'),
                        icon: true
                    }
                ]
            };

        if (attrs.building_name) {
            data.buildingName = attrs.building_name;
        } else {
            data.buildingName = results.sight.short_name;
        }

        if (attrs.sight_description) {
            data.purpose = attrs.sight_description;
        }

        if (data.buildingName === null) {
            data.buildingName = data.purpose;
            data.purpose = this.t('place');
        }

        if (results.house) {
            house = results.house.attributes;
            if (house) {
                if (house.addresses && house.addresses.length) {
                    data.address = this._buildAddress([
                        house.addresses[0].street,
                        house.addresses[0].number
                    ]);
                }

                data.drillDown = this._buildAddress([
                    house.micro_district,
                    house.district,
                    house.city,
                    house.postal_code
                ]);
            } else {
                if (results.house.name) {
                    data.address = results.house.name;
                }
            }
        } else {
            for (var obj in results) {
                if (obj !== 'sight' && obj !== 'extra') {
                    if (results[obj].attributes && results[obj].attributes.abbreviation) {
                        abbr = results[obj].attributes.abbreviation + ' ';
                    }
                    data.drillDown = abbr + results[obj].name;
                }
            }
        }

        data.showMoreText = this.t('Show more about sight');

        footer.btns[0].href = L.Util.template(PPNOTUrl, {
            'code': this._map.dgProjectDetector.getProject().code,
            'name': encodeURIComponent(data.buildingName),
            'point': 'POINT(' + this._popup._latlng.lng + ' ' + this._popup._latlng.lat + ')'
        });

        return {
            tmpl: this._view.getTemplate('sight'),
            data: data,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: {'title': data.buildingName}
            }),
            footer: this._view.render({
                tmpl: this._view.getTemplate('popupFooterBtns'),
                data: footer
            }),
            afterRender: function () {
                self._initShowMore();
                self._initPopupClose();
            }
        };
    },

    _initPopupClose: function () {
        if (this._initedPopupClose) {
            return;
        }

        this._controller.getMap().once('popupclose', L.bind(this._clearPopup, this));
        this._initedPopupClose = true;
    },

    _clearPopup: function () {
        this._initedPopupClose = false;
        this._popup.clear();
        this._clearEventHandlers();
    },

    _showMoreText: function () {
        this._desc.style.maxHeight = '100%';
        this._link.parentNode.removeChild(this._link);
        this._popup._resize();
    },

    _initShowMore: function () {
        this._link = this._popup.findElement('#dg-showmoresight'),
        this._desc = this._popup.findElement('.dg-map-geoclicker-sight-description');

        if (this._link && this._desc) {
            this._addEventHandler('DgShowMoreClick', this._link, 'click', L.bind(this._showMoreText, this));
        }
    }
});
