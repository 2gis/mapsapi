DG.Geoclicker.Handler.Poi = DG.Geoclicker.Handler.House.extend({

    handle: function (results) { // (Object) -> Promise
        if (!results.building || !results.poi) {
            return false;
        }

        DG.Geoclicker.Handler.House.prototype.handle.call(this, results);

        this._firmCardObject = this._fillFirmCardObject(results.poi.reference.id);
        return Promise.resolve(this._firmCardObject);
    }

});
