DG.Geoclicker.Handler.Poi = DG.Geoclicker.Handler.House.extend({

    handle: function (results) { // (Object) -> Promise
        if (!results.building || !results.poi) {
            return false;
        }

        var houseHandler = DG.Geoclicker.Handler.House.prototype.handle;
        houseHandler.call(this, results);

        // If the POI refers to a building (e.g. galleries in Santiago),
        // show a building callout
        if (results.poi.reference.type === 'building') {
            var self = this;

            return self._api.geoGet(results.poi.reference.id)
                .then(function (result) {
                    return houseHandler.call(self, {
                        building: result.result.items[0]
                    });
                });
        }

        // Otherwise, show a firm callout
        this._firmCardObject = this._fillFirmCardObject(results.poi.reference.id);
        return Promise.resolve(this._firmCardObject);
    }

});
