DG.Geoclicker.Handler.Poi = DG.Geoclicker.Handler.House.extend({

    handle: function(results) { // (Object) -> Promise
        if (!results.poi) {
            return false;
        }

        // initialization setup
        this.firmCard = null;
        this._page = 1;
        this._houseObject = null;
        this._firmList = null;
        this._firmListObject = null;
        this._firmCardObject = null;
        this._onScroll = false;
        this._isFirmlistOpen = false;

        this._id = results.poi.reference.id;
        this._totalPages = 1;
        this._api = this._controller.getCatalogApi();
        this._popup = this._view.getPopup();
        this._initedPopupClose = false;
        this._directionsUrl = this._getDirectionsUrl(results.poi.reference.name);
        this._firmListLoader = this._view.initLoader(true);

        // If the POI refers to a building (e.g. galleries in Santiago),
        // show a building callout
        if (results.poi.reference.type === 'building') {
            var self = this;

            return self._api.geoGet(results.poi.reference.id)
                .then(function(result) {
                    self._houseObject = self._fillHouseObject(result.result.items[0]);
                    return Promise.resolve(self._houseObject);
                });
        }

        // Otherwise, show a firm callout
        if (results.poi.reference.type === 'branch') {
            this._fillFirmCardObject(results.poi.reference.id);
            return true;
        }

        return false;
    }

});
