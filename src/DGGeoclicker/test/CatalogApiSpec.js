describe('L.DG.Geoclicker.Provider.CatalogApi', function () {

    var catalogApi,
        stub,
        spy,
        map,
        mapContainer = document.getElementById('map');

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            center: new L.LatLng(54.98117239821992, 82.88922250270844),
            zoom: 17
        });
        catalogApi = new L.DG.Geoclicker.Provider.CatalogApi(map);
        spy = stub = sinon.stub(catalogApi, 'geoSearch');
    });

    afterEach(function () {
        catalogApi = null;
        stub = null;
        spy = null;
        map.remove();
        map = null;
    });

    describe("#getLocations", function() {

        it('should send correct latLng and zoom to the server', function (done) {

            var latlng = L.latLng(5, 7),
                fn = function () {},
                zoom = 12;

            catalogApi.getLocations(latlng, zoom, fn);

            expect(spy.calledOnce).to.be(true);

            var args = spy.getCall(0).args;

            expect(args[0]).to.be.equal('7,5');
            expect(args[2]).to.be.equal(zoom);

            done();

        });

        it('should send correct types to the server corresponded to zoomlevel', function (done) {

            var zoomToTypesMap = {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null,
                    9: 'settlement,city',
                    10: 'settlement,city',
                    11: 'settlement,city',
                    12: 'settlement,city',
                    13: 'district',
                    14: 'district',
                    15: 'house,street',
                    16: 'house,street,sight,station_platform',
                    17: 'house,street,sight,station_platform',
                    18: 'house,street,sight,station_platform',
                    19: 'house,street,sight,station_platform'
                },
                latlng = L.latLng(5, 7),
                fn = function () {},
                zoom,
                correctTypes,
                shouldPerformSearch,
                callsCnt = 0,
                args;

            for (zoom in zoomToTypesMap) {

                catalogApi.getLocations(latlng, zoom, fn);

                shouldPerformSearch = !!zoomToTypesMap[zoom];

                if (shouldPerformSearch) {
                    callsCnt++;
                }

                expect(spy.callCount).to.be.equal(callsCnt);

                if (!shouldPerformSearch) {
                    continue;
                }

                correctTypes = zoomToTypesMap[zoom];
                args = spy.getCall(callsCnt - 1).args;

                expect(args[1]).to.be.equal(correctTypes);
            }

            done();

        });

    });

    describe('should return undefined to callback if WebApi.geoSearch()', function () {

        var latlng,
            callback,
            zoom;

        beforeEach(function () {
            latlng = L.latLng(5, 7),
                callback = sinon.spy(),
                zoom = 9;
        });

        afterEach(function () {
            callback = null;
            latlng = null;
        });

        it('didn\'t return any result', function(done) {

            stub.callsArgWith(3, undefined);

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;
            expect(args.length).to.be(1);
            expect(args[0]).to.not.be.ok();

            done()

        });

        it('returned answer with error_code', function(done) {

            stub.callsArgWith(3, {
                error_code: 4
            });

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;
            expect(args.length).to.be(1);
            expect(args[0]).to.not.be.ok();

            done();

        });

        it('returned answer without result', function(done) {

            stub.callsArgWith(3, {
                someField: 'someValue'
            });

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;
            expect(args.length).to.be(1);
            expect(args[0]).to.not.be.ok();

            done();

        });

        it('returned answer with empty result', function(done) {

            stub.callsArgWith(3, {
                result: []
            });

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;
            expect(args.length).to.be(1);
            expect(args[0]).to.not.be.ok();

            done();

        });

        it('returned answer without requested types', function(done) {

            stub.callsArgWith(3, {
                result: [
                    {
                        id: 118454545,
                        type: 'house'
                    },
                    {
                        id: 118454545,
                        type: 'street'
                    }
                ]
            });

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;
            expect(args.length).to.be(1);
            expect(args[0]).to.not.be.ok();

            done();

        });

    });

    describe("correct result", function() {

        it('should return correct object with results from WebApi', function (done) {

            var
                latlng = L.latLng(5, 7),
                callback = sinon.spy(),
                zoom = 9,

                resSettlement = {
                    id: 2,
                    type: 'settlement'
                },
                resCity = {
                    id: 2,
                    type: 'city'
                }, resStreet = {
                    id: 3,
                    type: 'street'
                },

                webApiResult = {result: [resSettlement, resCity, resStreet] };


            stub.callsArgWith(3, webApiResult);

            catalogApi.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;

            expect(args.length).to.be(1);
            expect(args[0]).to.only.have.keys('settlement', 'city');
            expect(args[0].settlement).to.equal(resSettlement);
            expect(args[0].city).to.equal(resCity);

            done();

        });

    });


});
