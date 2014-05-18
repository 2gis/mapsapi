DG.Geoclicker.Handler.Poi = DG.Geoclicker.Handler.House.extend({

    handle: function (results) { // (Object) -> Promise
        if (!results.house || !results.poi) {
            return false;
        }
        
        DG.Geoclicker.Handler.House.prototype.handle.call(this, results);
        
        this._firmCardObject = this._fillFirmCardObject(results.poi.attributes.links.poi[0].id);
        return DG.when(this._firmCardObject);
    }

});