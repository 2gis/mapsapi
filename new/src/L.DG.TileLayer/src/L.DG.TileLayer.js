/**
 * Leaflet 2GIS TileLayer
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.TileLayer = L.TileLayer.extend({

    dgTileLayerUrl: 'http://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=4',
    options: {
        subdomains: '0123'
    },

    initialize: function () {
        var url = this.dgTileLayerUrl,
            options = L.setOptions(this, this.options);
        L.TileLayer.prototype.initialize.call(this, url, options);
    }


});


L.Map.addInitHook(function () {
    var layer = new L.DG.TileLayer();
    this.whenReady(function () {
        console.log("1 this=", this);
      //  this.addLayer(layer);
    },this);


    this.on("load", function(e){
        console.log("2 this=", e.target);
        e.target.whenReady(function () {
            console.log("3 this=",this);
           // this.addLayer(layer);
        });

    });
});

L.dgTileLayer = function () {
    return new L.DG.TileLayer();
};


//this.on("load", function (e) {
//    setTimeout(function () {
//        L.dgTileLayer().addTo(e.target);
//    }, 200);
//});