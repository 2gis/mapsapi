L.DG.Geoclicker.Handler.Sight = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results) { // (Object, String) -> Promise
        if (!results.sight) {
            return false;
        }

        this._popup = this._view.getPopup();
        this._initedPopupClose = false;

        return L.DG.when(this._fillsightObject(results));
    },

    _fillsightObject: function (results) { // (Object)
        var attrs = results.sight.attributes,
            data = {
                address: '',
                drilldown: '',
                buildingname: '',
                purpose: '',
                description: attrs.info.description
            },
            self = this,
            abbr;

        if (attrs.building_name) {
            data.buildingname = attrs.building_name;
        } else {
            data.buildingname = results.sight.short_name;
        }

        if (attrs.sight_description) {
            data.purpose = attrs.sight_description;
        }

        if (data.buildingname === null) {
            data.buildingname = data.purpose;
            data.purpose = this.t('place');
        }

        if (results.house) {
            var house = results.house.attributes,
                buildAddress = function (array) {
                    var address = [],
                        pushValue = function (value) {
                            if (value) {
                                address.push(value);
                            }
                        };

                    for (var i = 0; i < array.length; i++) {
                        pushValue(array[i]);
                    }

                    console.log(address);

                    return address.join(', ');
                };
            if (house) {
                    // console.log(house.addresses[0].number);
                if (house.addresses && house.addresses.length) {
                    data.address = buildAddress([
                        house.addresses[0].street,
                        house.addresses[0].number
                    ]);
                }

                data.drilldown = buildAddress([
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
                    data.drilldown = abbr + results[obj].name;
                }
            }
        }

        data.showMoreText = this.t('Show more about sight');

        return {
            tmpl: this._view.getTemplate('sight'),
            data: data,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: {'addressWithoutIndex': data.buildingname}
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

        this._controller.getMap().once('popupclose', L.bind(this._onPopupClose, this));
        this._initedPopupClose = true;
    },

    _onPopupClose: function () {
        this._initedPopupClose = false;
        this._popup.clear('header');
        this._clearEventHandlers();
    },

    _initShowMore: function () {
        var link = this._popup.findElement('#dg-showmoresight'),
            desc = this._popup.findElement('.dg-map-geoclicker-sight-description'),
            self = this;
        if (link && desc) {
            this._addEventHandler('DgShowMoreClick', link, 'click', function () {
                desc.style.height = 'auto';
                link.parentNode.removeChild(link);
                self._popup._resize();
            });
        }
    }
});
