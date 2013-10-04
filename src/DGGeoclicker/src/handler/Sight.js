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
                buildingname: '',
                purpose: '',
                description: attrs.info.description
            },
            self = this,
            abbr = '';

        if (attrs.building_name) {
            data.buildingname = attrs.building_name;
        } else {
            data.buildingname = results.sight.short_name;
        }

        if (attrs.sight_description) {
            data.purpose = attrs.sight_description;
        }

        for (var obj in results) {
            if (obj !== 'sight' && obj !== 'extra') {
                if (results[obj].attributes && results[obj].attributes.abbreviation) {
                    abbr = results[obj].attributes.abbreviation + ' ';
                }
                data.address = abbr + results[obj].name;
            }
        }

        data.showMoreText = this.t('Show more about sight');

        return {
            tmpl: this._view.getTemplate('sight'),
            data: data,
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

        this._clearEventHandlers();
    },

    _initShowMore: function () {
        var link = this._popup.findElement('#dg-showmoresight'),
            desc = this._popup.findElement('.dg-map-geoclicker-sight-description');
        if (link && desc) {
            this._addEventHandler('DgShowMoreClick', link, 'click', function () {
                desc.style.height = 'auto';
                link.parentNode.removeChild(link);
            });
        }
    }
});
