L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // в options объект, описывающий анимацию
        var options = options || {},
            animation = this.getArrowAnimation();
        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    onAdd: function (map) { // (L.Map)
        L.Polyline.prototype.onAdd.call(this, map);
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
}
