// this script will be run after loading js, but before starting tests
DG.Map.mergeOptions({
    tilesCheck: false
});

// Add function for remove all layers on map. Need for tests of leaflet, because we have our layers.
DG.Map.include({
    'clearLayers': function() {
        this.eachLayer(function(layer) {
            this.removeLayer(layer);
        }, this);
    }
});
