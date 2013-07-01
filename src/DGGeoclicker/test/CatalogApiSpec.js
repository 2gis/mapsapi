describe('L.DG.Geoclicker.Provider.CatalogApi', function () {

    var catalogApi,
        spy,
        map,
        mapContainer = document.createElement("div");

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            center: new L.LatLng(54.98117239821992, 82.88922250270844),
            zoom: 17
        });
        catalogApi = new L.DG.Geoclicker.Provider.CatalogApi(map);
        spy =  sinon.spy(catalogApi, "getTypesByZoom");
    });

    afterEach(function () {
        spy = null;
        catalogApi = null;
        map.remove();
        map = null;
    });

    describe("#getTypesByZoom", function() {

        it('should send correct types to the server corresponded to zoomlevel', function () {
            var zoomToTypesMap = {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: 'city',
                    9: 'settlement,city',
                    10: 'settlement,city',
                    11: 'settlement,city',
                    12: 'settlement,city,district',
                    13: 'district',
                    14: 'district,house',
                    15: 'house,street,district',
                    16: 'house,street,sight,station_platform,district',
                    17: 'house,street,sight,station_platform,district',
                    18: 'house,street,sight,station_platform,district',
                    19: 'house,street,sight,station_platform,district'
                },
                zoom;

            for (zoom in zoomToTypesMap) {
                catalogApi.getTypesByZoom(zoom);
                expect(spy.returnValues.pop()).to.be.equal(zoomToTypesMap[zoom]);
            }

        });

    });

});
