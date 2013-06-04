describe('DG Geoclicker ', function () {

    describe(' MapHandler ', function () {

        var map;

        afterEach(function () {
            map = null;

            L.Map.mergeOptions({
                dgGeoclicker: true
            });
        });


        it("should be inactive, if L.Map.options.dgGeoClicker was set to false  ", function () {

            L.Map.mergeOptions({
                dgGeoclicker: false
            });

            map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(false);

        });


        it("should be active by default", sinon.test(function () {

            map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(true);
        }));


        it("should handle click on map and give it to Geoclicker.Controller by calling handleClick with correct zoom", function (done) {
            var initZoom = 17;
            map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: initZoom
            });

            var spy = sinon.spy(map.dgGeoclicker._controller, "handleClick");

            happen.click(map.getContainer())

            expect(spy.called).to.be.ok();
            expect(spy.getCall(0).args[1]).to.be.equal(initZoom)

            done();
        });


        it("shouldn't handle click, if dgGeoclicker was disabled", function (done) {
            var initZoom = 17;
            map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: initZoom
            });

            var spy = sinon.spy(map.dgGeoclicker._controller, "handleClick");

            map.dgGeoclicker.disable();

            happen.click(map.getContainer())

            expect(spy.called).to.be.equal(false);

            done();
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
                    // describe : result from WebApi
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

        });


    });
})
;


if (0) {


    describe('DG Geoclicker Module', function () {
        var map,
            spy,
            defaultHandler,
            handler1,
            handler2,
            handler3;

        beforeEach(function () {
            map = new L.Map(document.createElement('div'), {
                center: new L.LatLng(54.980206086231, 82.898068362003),
                zoom: 10
            });
            map.dgGeoclicker.options.url = 'http://catalog.api.2gis.ru/geo/search';
            map.dgGeoclicker.options.data = {
                key: 'rujrdp3400',
                version: '1.3',
                lang: 'ru',
                output: 'jsonp'
            };
            handler1 = sinon.spy(L.DG.GeoclickerHandlers, "handler1");
            handler2 = sinon.spy(L.DG.GeoclickerHandlers, "handler2");
            handler3 = sinon.spy(L.DG.GeoclickerHandlers, "handler3");
            defaultHandler = sinon.spy(L.DG.GeoclickerHandlers, "default");
        });

        afterEach(function () {
            map = null;
            spy = null;
            L.DG.GeoclickerHandlers.handler1.restore();
            L.DG.GeoclickerHandlers.handler2.restore();
            L.DG.GeoclickerHandlers.handler3.restore();
            L.DG.GeoclickerHandlers.default.restore();

        });

        it('should call an onMapClick handler in Geoclicker', function (done) {
            spy = sinon.spy(map.dgGeoclicker, "onMapClick");
            happen.click(map.getContainer());
            expect(spy.called).to.be.ok();
            done();
        });

        it('should call default handler when WebAPI has not responded to our JSONP request', function () {
            spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");
            spy.withArgs(undefined);

            spy.withArgs({
                response: undefined
            });
            spy.withArgs({
                response: {
                    result: undefined
                }
            });

            spy.withArgs({
                response: {
                    result: []
                }
            });

            map.dgGeoclicker.handlersManager.handle(undefined);
            map.dgGeoclicker.handlersManager.handle({
                response: undefined
            });
            map.dgGeoclicker.handlersManager.handle({
                response: {
                    result: undefined
                }
            });
            map.dgGeoclicker.handlersManager.handle({
                response: {
                    result: []
                }
            });

            expect(spy.withArgs(undefined).calledOnce).to.be.ok();
            expect(spy.withArgs({
                response: undefined
            }).calledOnce).to.be.ok();
            expect(spy.withArgs({
                response: {
                    result: undefined
                }
            }).calledOnce).to.be.ok();
            expect(spy.withArgs({
                response: {
                    result: []
                }
            }).calledOnce).to.be.ok();

            expect(defaultHandler.callCount).to.eql(4);

            expect(defaultHandler.returnValues).to.eql(["default", "default", "default", "default"]);

        });

        describe("Correct responses", function () {
            it("should run correct handler for street, district, city type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");


                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "city"
                            },
                            {
                                type: "district"
                            },
                            {
                                type: "street"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "city"
                            },
                            {
                                type: "district"
                            },
                            {
                                type: "street"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "city"
                            },
                            {
                                type: "district"
                            },
                            {
                                type: "street"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                }).calledOnce).to.be.ok();

                expect(handler1.calledThrice).to.be.ok();

                expect(handler1.returnValues).to.eql(["handler1", "handler1", "handler1"]);

            });

            it("should run correct handler for house, sight, place type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "house"
                            },
                            {
                                type: "sight"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "house"
                            },
                            {
                                type: "sight"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "house"
                            },
                            {
                                type: "sight"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                }).calledOnce).to.be.ok();

                expect(handler2.calledTwice).to.be.ok();

                expect(handler2.returnValues).to.eql(["handler2", "handler2"]);

            });

            it("should run correct handler for station, crossbroad, metro type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                }).calledOnce).to.be.ok();

                expect(handler3.calledOnce).to.be.ok();

                expect(handler3.returnValues).to.eql(["handler3"]);

            });
        });


        describe("Wrong responses", function () {
            it("should run default handler because reponse is wrong for street, district, city type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "metro"
                            }
                        ]
                    },
                    allowedTypes: ["street", "district", "city"]
                }).calledOnce).to.be.ok();

                expect(handler1.neverCalledWith("metro")).to.be.ok();
                expect(defaultHandler.calledOnce).to.be.ok();
                expect(defaultHandler.returnValues).to.eql(["default"]);

            });

            it("should run default handler because reponse is wrong for house, sight, place type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "city"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "city"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "city"
                            }
                        ]
                    },
                    allowedTypes: ["house", "sight", "place"]
                }).calledOnce).to.be.ok();

                expect(handler2.neverCalledWith("city")).to.be.ok();

                expect(defaultHandler.returnValues).to.eql(["default"]);
            });

            it("should run default handler because reponse is wrong for station, crossbroad, metro type of geoObject", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "house"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "house"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "house"
                            }
                        ]
                    },
                    allowedTypes: ["station", "crossbroad", "metro"]
                }).calledOnce).to.be.ok();

                expect(handler3.neverCalledWith("house")).to.be.ok();

                expect(defaultHandler.returnValues).to.eql(["default"]);
            });

            it("should run default handler because type of geoObject is absent in all mappings", function () {
                spy = sinon.spy(map.dgGeoclicker.handlersManager, "handle");

                spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "unknown"
                            }
                        ]
                    }
                });

                map.dgGeoclicker.handlersManager.handle({
                    response: {
                        result: [
                            {
                                type: "unknown"
                            }
                        ]
                    }
                });

                expect(spy.withArgs({
                    response: {
                        result: [
                            {
                                type: "unknown"
                            }
                        ]
                    }
                }).calledOnce).to.be.ok();
                expect(defaultHandler.calledOnce).to.be.ok();
                expect(defaultHandler.returnValues).to.eql(["default"]);
            });
        });

        describe("Correct geoObject type for specific zoom level", function () {
            beforeEach(function () {
                spy = sinon.spy(map.dgGeoclicker, "getTypesByZoom");
            });

            it("should return HOUSE, STREET types for zoomLevel between 14 and 18", function () {
                spy.withArgs(14);
                spy.withArgs(15);
                spy.withArgs(16);
                spy.withArgs(17);
                spy.withArgs(18);

                map.dgGeoclicker.getTypesByZoom(14);
                map.dgGeoclicker.getTypesByZoom(15);
                map.dgGeoclicker.getTypesByZoom(16);
                map.dgGeoclicker.getTypesByZoom(17);
                map.dgGeoclicker.getTypesByZoom(18);

                expect(spy.callCount).to.eql(5);

                expect(spy.withArgs(14).calledOnce).to.be.ok();
                expect(spy.withArgs(15).calledOnce).to.be.ok();
                expect(spy.withArgs(16).calledOnce).to.be.ok();
                expect(spy.withArgs(17).calledOnce).to.be.ok();
                expect(spy.withArgs(18).calledOnce).to.be.ok();

                expect(handler1.called).not.to.be(true);
                expect(handler2.called).not.to.be(true);
                expect(handler3.called).not.to.be(true);
                expect(defaultHandler.called).not.to.be(true);

                expect(spy.withArgs(14).returnValues[0]).to.eql(["house", "street"]);
                expect(spy.withArgs(15).returnValues[0]).to.eql(["house", "street", "sight", "station_platform"]);
                expect(spy.withArgs(16).returnValues[0]).to.eql(["house", "street", "sight", "station_platform"]);
                expect(spy.withArgs(17).returnValues[0]).to.eql(["house", "street", "sight", "station_platform"]);
                expect(spy.withArgs(18).returnValues[0]).to.eql(["house", "street", "sight", "station_platform"]);
            });

            it("should return DISTRICT type for zoomLevel between 12 and 13", function () {
                spy.withArgs(12);
                spy.withArgs(13);

                map.dgGeoclicker.getTypesByZoom(12);
                map.dgGeoclicker.getTypesByZoom(13);

                expect(spy.callCount).to.eql(2);

                expect(spy.withArgs(12).calledOnce).to.be.ok();
                expect(spy.withArgs(13).calledOnce).to.be.ok();

                expect(handler1.called).not.to.be(true);
                expect(handler2.called).not.to.be(true);
                expect(handler3.called).not.to.be(true);
                expect(defaultHandler.called).not.to.be(true);

                expect(spy.withArgs(12).returnValues[0]).to.eql(["district"]);
                expect(spy.withArgs(13).returnValues[0]).to.eql(["district"]);
            });

            it("should return SETTLEMENT, CITY type for zoomLevel between 8 and 11", function () {
                spy.withArgs(8);
                spy.withArgs(9);
                spy.withArgs(10);
                spy.withArgs(11);

                map.dgGeoclicker.getTypesByZoom(8);
                map.dgGeoclicker.getTypesByZoom(9);
                map.dgGeoclicker.getTypesByZoom(10);
                map.dgGeoclicker.getTypesByZoom(11);

                expect(spy.callCount).to.eql(4);

                expect(spy.withArgs(8).calledOnce).to.be.ok();
                expect(spy.withArgs(9).calledOnce).to.be.ok();
                expect(spy.withArgs(10).calledOnce).to.be.ok();
                expect(spy.withArgs(11).calledOnce).to.be.ok();

                expect(handler1.called).not.to.be(true);
                expect(handler2.called).not.to.be(true);
                expect(handler3.called).not.to.be(true);
                expect(defaultHandler.called).not.to.be(true);

                expect(spy.withArgs(8).returnValues[0]).to.eql(['settlement', 'city']);
                expect(spy.withArgs(9).returnValues[0]).to.eql(['settlement', 'city']);
                expect(spy.withArgs(10).returnValues[0]).to.eql(['settlement', 'city']);
                expect(spy.withArgs(11).returnValues[0]).to.eql(['settlement', 'city']);
            });

            it("should return NULL for zoomLevel less than 8 or greater than 18", function () {
                spy.withArgs(19);
                spy.withArgs(7);
                spy.withArgs(4);
                spy.withArgs(1);

                map.dgGeoclicker.getTypesByZoom(19);
                map.dgGeoclicker.getTypesByZoom(7);
                map.dgGeoclicker.getTypesByZoom(4);
                map.dgGeoclicker.getTypesByZoom(1);

                expect(spy.callCount).to.eql(4);

                expect(spy.withArgs(19).calledOnce).to.be.ok();
                expect(spy.withArgs(7).calledOnce).to.be.ok();
                expect(spy.withArgs(4).calledOnce).to.be.ok();
                expect(spy.withArgs(1).calledOnce).to.be.ok();

                expect(handler1.called).not.to.be(true);
                expect(handler2.called).not.to.be(true);
                expect(handler3.called).not.to.be(true);
                expect(defaultHandler.called).not.to.be(true);

                expect(spy.withArgs(19).returnValues[0]).to.eql(null);
                expect(spy.withArgs(7).returnValues[0]).to.eql(null);
                expect(spy.withArgs(4).returnValues[0]).to.eql(null);
                expect(spy.withArgs(1).returnValues[0]).to.eql(null);
            });
        });
    });

}