L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // (Array, Object)
        L.Polyline.prototype.initialize.call(this, latlngs, options);
    }

});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};