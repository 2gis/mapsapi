describe('L.DG.Geoclicker', function () {
    var map,
//        mapContainer = document.getElementById('map');
        mapContainer = document.createElement("div");

    afterEach(function () {
        L.Map.mergeOptions({
            dgGeoclicker: true
        });
        map && map.remove();
        map = null;
    });

    describe("#enabled", function() {

        it('should be inactive, if L.Map.options.dgGeoClicker was set to false', function () {

            L.Map.mergeOptions({
                dgGeoclicker: false
            });

            map = new L.Map(mapContainer, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(false);


        });

        it('should be active by default', sinon.test(function () {
            //map.remove();
            map = new L.Map(mapContainer, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(true);


        }));

    });

});
