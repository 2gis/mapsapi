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
                    8: 'settlement,city',
                    9: 'settlement,city',
                    10: 'settlement,city',
                    11: 'division,settlement,city',
                    12: 'station_platform,station,metro,district,division,settlement,city',
                    13: 'station_platform,station,metro,district,division,settlement,city',
                    14: 'house,street,station_platform,station,metro,district,division,settlement,city',
                    15: 'poi,house,place,street,station_platform,station,metro,district,division,settlement,city',
                    16: 'poi,house,place,street,station_platform,station,metro,district,division,settlement,city',
                    17: 'sight,poi,house,place,street,station_platform,station,metro,district,division,settlement,city',
                    18: 'sight,poi,house,place,street,station_platform,station,metro,district,division,settlement,city',
                    19: 'sight,poi,house,place,street,station_platform,station,metro,district,division,settlement,city'
                },
                zoom;

            for (zoom in zoomToTypesMap) {
                catalogApi.getTypesByZoom(zoom);
                expect(spy.returnValues.pop()).to.be.equal(zoomToTypesMap[zoom]);
            }

        });

    });

});
