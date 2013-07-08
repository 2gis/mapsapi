L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // в options объект, описывающий анимацию
        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    onAdd: function (map) { // (L.Map)
        L.Polyline.prototype.onAdd.call(this, map);
    }/*,

    runAnimation: function (options) { // (Object)
        this.setStyle(options)
    }*/

});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
}
