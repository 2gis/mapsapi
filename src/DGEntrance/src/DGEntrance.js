L.DG.Entrance = L.Class.extend({
    
    'use strict';

    includes: L.Mixin.Events,

    options: {
        is_primary: false,
        name: null,
        points: [],
        vectors: []
    },

    initialize: function (options) { // (Object)
        L.setOptions(this, options);
    },

    onAdd: function (map) { // (L.Map)
        this._map = map;

        // init arrow(s)
        // add arrow(s) to map
        // init event handler

        // mapShouldBeZoomed?
        // this._map.setView(this.getBounds().getCenter(), 16)
    },

    addTo: function (map) { // (L.Map) -> (L.DG.Entrance)
        map.addLayer(this);
        return this;
    },

    onRemove: function (map) { // (L.Map)
        // remove arrow(s) from map
        // destroy event handler
    },

    removeFrom: function (map) { // (L.Map) -> (L.DG.Entrance)
        map.removeLayer(this);
        return this;
    },

    show: function (animate) { // (Boolean) -> (L.DG.Entrance)
        // shouldBeShown?
        // show arrow(s)
        // fire event "showentrance"
        return this;
    },

    hide: function () { // () -> (L.DG.Entrance)
        // hide arrow(s)
        // fire event "hideentrance"
        return this;
    },

    isShown: function () { // () -> (Boolean)

    }

    shouldBeShown: function () { // () -> (Boolean)

    },

    mapShouldBeZoomed: function () { // () -> (Boolean)

    },

    getBounds: function () { // () -> (LatLngBounds)

    }
};