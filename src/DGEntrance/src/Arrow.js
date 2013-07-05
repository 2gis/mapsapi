L.DG.Entrance.Arrow = L.Polyline.extend({

    initialize: function (latlngs, options) { // в options объект, описывающий анимацию

        L.Polyline.prototype.initialize.call(this, latlngs, options);

    },

    onAdd: function (map) { // (L.Map)
        L.Polyline.prototype.onAdd.call(this, map);
        this.hide();
    },

    show: function (animate) { // (Boolean) -> (L.DG.Entrance.Arrow)
        // show arrow
        return this;
    },

    hide: function () { // () -> (L.DG.Entrance.Arrow)
        // hide arrow
        return this;
    }

});