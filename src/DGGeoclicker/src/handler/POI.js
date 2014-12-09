DG.Geoclicker.Handler.Poi = DG.Geoclicker.Handler.House.extend({

    handle: function (results) { // (Object) -> Promise
        if (!results.building || !results.poi) {
            return false;
        }

        var houseHandlerResult =
            DG.Geoclicker.Handler.House.prototype.handle.call(this, results);

        // If the POI refers to a building (e.g. galleries in Santiago), simply
        // show a building callout
        if (results.poi.reference.type === 'building') {
            return houseHandlerResult;
        }

        // Otherwise, show a firm callout
        this._firmCardObject = this._fillFirmCardObject(results.poi.reference.id);
        return Promise.resolve(this._firmCardObject);
    }

});
