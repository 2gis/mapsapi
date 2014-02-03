describe('DG.Geoclicker.Provider.CatalogApi', function () {

    var catalogApi,
        spy,
        map,
        mapContainer = document.createElement("div");

    beforeEach(function () {
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(54.98117239821992, 82.88922250270844),
            zoom: 17
        });
        catalogApi = new DG.Geoclicker.Provider.CatalogApi(map);
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
                    0:  null,
                    1:  null,
                    2:  null,
                    3:  null,
                    4:  null,
                    5:  null,
                    6:  null,
                    7:  null,
                    8:  'settlement,city',
                    9:  'settlement,city',
                    10: 'settlement,city',
                    11: 'settlement,city,division',
                    12: 'settlement,city,division,district,station,metro,station_platform',
                    13: 'settlement,city,division,district,station,metro,station_platform',
                    14: 'settlement,city,division,district,station,metro,station_platform,street,house',
                    15: 'settlement,city,division,district,station,metro,station_platform,street,house,place,poi',
                    16: 'settlement,city,division,district,station,metro,station_platform,street,house,place,poi',
                    17: 'settlement,city,division,district,station,metro,station_platform,street,house,place,poi,sight',
                    18: 'settlement,city,division,district,station,metro,station_platform,street,house,place,poi,sight',
                    19: 'settlement,city,division,district,station,metro,station_platform,street,house,place,poi,sight'
                },
                zoom;

            for (zoom in zoomToTypesMap) {
                catalogApi.getTypesByZoom(zoom);
                expect(spy.returnValues.pop()).to.be.equal(zoomToTypesMap[zoom]);
            }

        });

    });

});
