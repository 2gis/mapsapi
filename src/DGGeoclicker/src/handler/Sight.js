L.DG.Geoclicker.Handler.Sight = L.DG.Geoclicker.Handler.Default.extend({

    handle: function (results, type) { // (Object, String) -> Promise
        if (!results.sight) {
            return false;
        }

        this._sightObject = null;
        this._id = results.sight.id;

        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._fillsightObject(results.sight);

        this._initedPopupClose = false;

        return L.DG.when(this._sightObject);
    },

    _fillsightObject: function (sight) { // (Object)
        var attrs = sight.attributes,
            data = {
                address: '',
                buildingname: '',
                purpose: '',
                description: attrs.info.description
            },
            self = this;

        if (attrs.building_name) {
            data.buildingname = attrs.building_name;
        } else {
            data.buildingname = sight.short_name;
        }

        if (attrs.sight_description) {
            data.purpose = attrs.sight_description;
        }

        // if (attrs.info.description) {
        //     data.description = attrs.info.description;
        // }

        data.showMoreText = this.t('Show more about sight');

        this._sightObject = {
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
