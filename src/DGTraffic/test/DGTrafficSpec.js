describe('DG.traffic', function () {
    var map,
        traffic,
        mapContainer,
        xhr,
        requests;

    before(function () {
        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(54.980156831455, 82.897440725094),
            zoom: 17
        });
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];

        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(function () {
        map.removeLayer(traffic);
    });

    after(function () {
        map.remove();
        document.body.removeChild(mapContainer);
        map = traffic = mapContainer = null;
        xhr.restore();
    });

    it('should present two layer', function (done) {
        traffic = DG.traffic();
        traffic.addTo(map);
        requests[0].respond(200, {'Content-Type': 'application/x-www-form-urlencoded'}, (new Date()).getTime().toString());

        setTimeout(function() {
            var layers = mapContainer.querySelectorAll('.leaflet-layer');
            expect(layers.length).to.eql(2);
            done();
        }, 0);
    });

});
