L.DG.Ruler.DistanceMarkerIcon = L.Icon.extend({

    options: {
        className : 'dg-ruler-label'
    },

    createIcon: function () {
        var div = document.createElement('div');

        div.innerHTML = '<div><span class="dg-ruler-label-distance">0</span></div>';

        this._setIconStyles(div, 'icon');
        return div;
    },

    createShadow: function () {
        return null;
    }
});


L.DG.Ruler.distanceMarkerIcon = function (options) {
    return new L.DG.Ruler.DistanceMarkerIcon(options);
};