DG.Geoclicker.Handler.Sight = DG.Geoclicker.Handler.Default.extend({

    handle: function (results) { // (Object, String) -> Promise
        if (!results.sight) {
            return false;
        }

        this._popup = this._view.getPopup();
        this._initedPopupClose = false;

        return Promise.resolve(this._fillSightObject(results));
    },

    _fillSightObject: function (results) { // (Object) -> Object
        var attrs = results.sight.attributes,
            data = {
                description: attrs.info.description
            },
            self = this,
            abbr,
            footer = {
                btns: [
                    {
                        name: 'goto',
                        label: this.t('go_to'),
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

        data.drillDown = Object.keys(results)
            .filter(function (type) {
                return ['sight', 'place', 'extra'].indexOf(type) === -1;
            })
            .map(function (type) {
                return results[type];
            })
            .reduce(function (str, item) {
                if (item.attributes && item.attributes.abbreviation) {
                    abbr = item.attributes.abbreviation + ' ';
                }
                if (item.name) {
                    return abbr + item.name;
                }
            }, '');

        if (this._checkDescFieldHeight(data.description)) {
            data.showMoreText = this.t('show_more_about_sight');
        }

        footer.btns[0].href = this._getDirectionsUrl(data.buildingName);

        return {
            tmpl: 'sight',
            data: data,
            header: this._view.render({
                tmpl: 'popupHeader',
                data: {'title': data.buildingName}
            }),
            /*footer: this._view.render({
                tmpl: 'popupFooterBtns',
                data: footer
            }),*/
            afterRender: function () {
                if (self._needShowMore) {
                    self._initShowMore();
                }
                self._initPopupClose();
            }
        };
    },

    _initPopupClose: function () {
        if (this._initedPopupClose) {
            return;
        }

        this._controller.getMap().once('popupclose', DG.bind(this._clearPopup, this));
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
        this._popup.resize();
    },

    _initShowMore: function () {
        this._link = this._popup.findElement('.dg-map-geoclicker__show-more-sights-link');
        this._desc = this._popup.findElement('.dg-map-geoclicker__sight-description');

        if (this._link && this._desc) {
            this._addEventHandler('dg-map-geoclicker__show-more-sights-link', DG.bind(this._showMoreText, this));
        }
    },

    _checkDescFieldHeight: function (desc) {
        var el = DG.DomUtil.create('div', ''),
            height;

        el.style.visibility = 'hidden';
        el.innerHTML = desc;

        this._popup._contentNode.appendChild(el);
        height = el.offsetHeight;
        this._popup._contentNode.removeChild(el);
        this._needShowMore = (height > 40);

        return this._needShowMore;
    }
});
