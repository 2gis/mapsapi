describe('DG.Geoclicker', function () {
    var map,
        mapContainer = document.createElement("div");

    afterEach(function () {
        DG.Map.mergeOptions({
            geoclicker: true
        });
        map && map.remove();
        map = null;
    });

    describe("#enabled", function() {

        it('should be inactive, if DG.Map.options.geoclicker was set to false', function () {

            DG.Map.mergeOptions({
                geoclicker: false
            });

            map = new DG.Map(mapContainer, {
                center: new DG.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.geoclicker.enabled()).to.be.equal(false);


        });

        it('should be active by default', function () {
            map = new DG.Map(mapContainer, {
                center: new DG.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.geoclicker.enabled()).to.be.equal(true);
        });

    });

});
