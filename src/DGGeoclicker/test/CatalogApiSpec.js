describe('DG.Geoclicker.Provider.CatalogApi', function () {

    var catalogApi,
        spy,
        map,
        mapContainer = document.createElement("div");

    after(function() {
        mapContainer = null;
    });

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
                    8:  'adm_div.settlement,adm_div.city',
                    9:  'adm_div.settlement,adm_div.city',
                    10: 'adm_div.settlement,adm_div.city',
                    11: 'adm_div.settlement,adm_div.city,adm_div.division',
                    12: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district',
                    13: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district',
                    14: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building',
                    15: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building,adm_div.place,poi',
                    16: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building,adm_div.place,poi',
                    17: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building,adm_div.place,poi,attraction',
                    18: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building,adm_div.place,poi,attraction',
                    19: 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,street,building,adm_div.place,poi,attraction'
                },
                zoom;

            for (zoom in zoomToTypesMap) {
                catalogApi.getTypesByZoom(zoom);
                expect(spy.returnValues.pop()).to.be.equal(zoomToTypesMap[zoom]);
            }

        });

    });

});
