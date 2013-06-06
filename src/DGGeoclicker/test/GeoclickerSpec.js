describe('DG Geoclicker ', function () {

    describe(' MapHandler ', function () {

        afterEach(function () {
            L.Map.mergeOptions({
                dgGeoclicker: true
            });
        });


        it("should be inactive, if L.Map.options.dgGeoClicker was set to false  ", function () {

            L.Map.mergeOptions({
                dgGeoclicker: false
            });

            var map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(false);

        });


        it("should be active by default", sinon.test(function () {

            var map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(true);
        }));


        it("should handle click on map and give it to Geoclicker.Controller by calling handleClick with correct zoom", function (done) {
            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),
                spy = sinon.spy(map.dgGeoclicker._controller, "handleClick");

            happen.click(map.getContainer())

            expect(spy.called).to.be.ok();
            expect(spy.getCall(0).args[1]).to.be.equal(initZoom)

            done();
        });

        it("should handle event 'popupclose' and forward it to the Controller.handlePopup", function (done) {
            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),

                spy = sinon.spy(map.dgGeoclicker._controller, "handlePopupClose"),
                popupDummy = sinon.createStubInstance(L.Popup);

            map.fire('popupclose', {popup: popupDummy});

            expect(spy.calledWith(popupDummy)).to.be(true);

            done();
        });


        it("shouldn't handle click and popupclose, if dgGeoclicker was disabled", function (done) {
            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),
                spyClick = sinon.spy(map.dgGeoclicker._controller, "handleClick"),
                spyPopupClose = sinon.spy(map.dgGeoclicker._controller, "handlePopupClose"),
                popupDummy = sinon.createStubInstance(L.Popup);

            map.dgGeoclicker.disable();

            happen.click(map.getContainer())
            map.fire('popupclose', {popup: popupDummy});

            expect(spyClick.called).to.be(false);
            expect(spyPopupClose.called).to.be(false);

            done();
        });

    });

    describe(' GeoCoder ', function () {
        var webApi,
            stub,
            geoCoder,
            spy;


        beforeEach(function () {


            webApi = new L.DG.Geoclicker.WebApi();
            spy = stub = sinon.stub(webApi, 'geoSearch');
            geoCoder = new L.DG.Geoclicker.GeoCoder(webApi);


        });

        afterEach(function () {
            webApi = null;
            stub = null;
            geoCoder = null;
            spy = null;
        });


        it(" should  call WebApi.geoSearch() with corressponded params", function (done) {

            var latlng = L.latLng(5, 7),
                fn = function () {
                },
                zoom = 12;
            geoCoder.getLocations(latlng, zoom, fn);

            expect(spy.calledOnce).to.be(true);

            var args = spy.getCall(0).args;

            expect(args[0]).to.be.equal('7,5');
            expect(args[2]).to.be.equal(zoom);

            done();
        });


        it(" should call WebApi.geoSearch() with types corresponded to zoomlevel", function (done) {

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
                fn = function () {
                },
                zoom,
                correctTypes,
                shouldPerformSearch,
                callsCnt = 0,
                args;

            for (zoom in zoomToTypesMap) {

                geoCoder.getLocations(latlng, zoom, fn);

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

        describe(" should return undefined to callback if WebApi.geoSearch()", function () {
            var latlng, callback, zoom;

            beforeEach(function () {
                latlng = L.latLng(5, 7),
                    callback = sinon.spy(),
                    zoom = 9;
            });

            afterEach(function () {
                callback = null;
                latlng = null;
            });

            var testCases = {
                // "describe message" : <result from_WebApi>
                "didn't return any result": undefined,
                "returned answer with error_code": {
                    error_code: 4
                },
                " returned answer without result": {
                    someField: 'someValue'
                },
                " returned answer with empty result": {
                    result: []
                },
                " returned answer without requested types": {
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
                }
            }

            for (var i in testCases) {
                (function (webApiResult) {
                    it(i, function (done) {
                        stub.callsArgWith(3, webApiResult);

                        geoCoder.getLocations(latlng, zoom, callback);

                        expect(callback.calledOnce).to.be(true);

                        var args = callback.getCall(0).args;

                        expect(args.length).to.be(1);
                        expect(args[0]).to.be(undefined);

                        done();
                    });
                })(testCases[i]);
            }

        });


        it(" should return correct object with results from WebApi", function (done) {

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

            geoCoder.getLocations(latlng, zoom, callback);

            expect(callback.calledOnce).to.be(true);

            var args = callback.getCall(0).args;

            expect(args.length).to.be(1);
            expect(args[0]).to.only.have.keys('settlement', 'city');
            expect(args[0].settlement).to.equal(resSettlement);
            expect(args[0].city).to.equal(resCity);

            done();
        });


    });

    describe(' handler ', function () {
        var
            handlerName
            , handlerClass
            , hadlerObj;

        for (handlerName in  L.DG.Geoclicker.Handlers) {
            handlerClass = L.DG.Geoclicker.Handlers[handlerName];
            hadlerObj = sinon.createStubInstance(handlerClass);

            (function (handlerName, handlerClass, hadlerObj) {

                describe("'" + handlerName + "' as member of L.DG.Geoclicker.Handlers ", function () {


                    it("should be instance of L.DG.Geoclicker.Handlers.Default", function () {
                        expect(hadlerObj instanceof L.DG.Geoclicker.Handlers.Default).to.be(true)
                    });

                    it("should contain 'handle' method", function (done) {
                        expect(hadlerObj.handle).to.be.ok()
                        expect(hadlerObj.handle).to.be.a(Function)
                        done();
                    });

                });

            })(handlerName, handlerClass, hadlerObj)
        }
    });

    describe('Controller ', function () {

        it("should call GeoCoder.getLocations()", function (done) {

            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),

                spy = sinon.spy(map.dgGeoclicker._controller._geoCoder, "getLocations");

            happen.click(map.getContainer())

            expect(spy.called).to.be.ok();
            expect(spy.getCall(0).args[1]).to.be.equal(initZoom)

            done();

        });


        it("should use default handler if GeoCoder returned no result", function (done) {

            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),

            // stub the default handler inject him to the handlers sequence
                spy = sinon.spy(function () {
                    return true;
                }),
                handler = L.Class.extend({
                    handle: spy
                });

            L.DG.Geoclicker.Controller.mergeOptions({
                handlersSequence: {
                    default: handler
                }});

            // stub the GeoCoder
            sinon.stub(map.dgGeoclicker._controller._geoCoder, "getLocations").callsArgWith(2, undefined);


            happen.click(map.getContainer());

            expect(spy.called).to.be.ok();

            done();

        });


        it("should use default handler, unless handler was found", function (done) {

            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),

                geoCoderResult = {
                    street: {id: 1, type: 'street'},
                    district: {id: 2, type: 'district'}
                },

            // stub handlers and inject these handlers in the options.handlersSequence
                spyDefault = sinon.spy(function () {
                    return true;
                }),
                spyCity = sinon.spy(function () {
                    return true;
                });

            L.DG.Geoclicker.Controller.mergeOptions({
                handlersSequence: {
                    default: L.Class.extend({
                        handle: spyDefault
                    }),
                    city: L.Class.extend({
                        handle: spyCity
                    })
                }});

            // stub the GeoCoder
            sinon.stub(map.dgGeoclicker._controller._geoCoder, "getLocations").callsArgWith(2, geoCoderResult)


            happen.click(map.getContainer());


            expect(spyDefault.called).to.be(true);

            expect(spyCity.called).to.be(false);

            done();

        });

        it("should use call handlers in order, corresponded to the  L.DG.Geoclicker.Controller.handlersSequence, also should call the next handler in sequence, if the previous returned false", function (done) {

            var initZoom = 17,
                map = new L.Map(document.createElement('div'), {
                    center: new L.LatLng(54.98117239821992, 82.88922250270844),
                    zoom: initZoom
                }),

                geoCoderResult = {
                    city: {id: 1, type: 'city'},
                    house: {id: 2, type: 'house'}
                },

            // stub handlers and inject these handlers in the options.handlersSequence
                spyDefault = sinon.spy(function () {
                    return true;
                }),
                spyHouse = sinon.spy(function () {
                    // check whether the next handler would be called, if the previous handler returned false
                    return false;
                }),
                spyCity = sinon.spy(function () {
                    return true;
                });

            L.DG.Geoclicker.Controller.mergeOptions({
                handlersSequence: {
                    default: L.Class.extend({
                        handle: spyDefault
                    }),
                    house: L.Class.extend({
                        handle: spyHouse
                    }),
                    city: L.Class.extend({
                        handle: spyCity
                    })
                }});

            // stub the GeoCoder
            sinon.stub(map.dgGeoclicker._controller._geoCoder, "getLocations").callsArgWith(2, geoCoderResult)


            happen.click(map.getContainer());


            expect(spyDefault.called).to.be(false);

            expect(spyHouse.called).to.be(true);

            expect(spyCity.called).to.be(true);

            expect(spyHouse.calledBefore(spyCity)).to.be(true);

            done();

        });

    });

});
