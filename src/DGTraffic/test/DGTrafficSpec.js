describe('DG.traffic', function () {
    var map,
        traffic,
        mapContainer;

    before(function () {
        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(54.980156831455, 82.897440725094),
            zoom: 17
        });
    });

    afterEach(function () {
        map.removeLayer(traffic);
    });

    after(function () {
        map.remove();
        document.body.removeChild(mapContainer);
        map = traffic = mapContainer = null;
    });

    it('should present two layer', function () {
        traffic = DG.traffic();
        traffic.addTo(map);
        var layers = mapContainer.querySelectorAll('.leaflet-layer');
        expect(layers.length).to.eql(2);
    });

});
