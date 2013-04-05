/**
 * Leaflet DG ControlZoom
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.ControlZoom = L.Control.Zoom({
   

});

L.Map.addInitHook(function () {
    //  this.dgZoomControl = new L.DG.ControlZoom();
    //  this.addControl(this.dgZoomControl);

});

L.Map.mergeOptions({
    zoomControl : false
});
