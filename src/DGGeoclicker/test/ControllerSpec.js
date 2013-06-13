describe('L.DG.Geoclicker.Controller', function () {
    var map,
        mapContainer = document.getElementById('map'),
        spy,
        initZoom = 17;

    beforeEach(function() {
        L.DG.Jsonp = sinon.stub(L.DG, 'Jsonp');
        map = new L.Map(mapContainer, {
            center: new L.LatLng(54.98117239821992, 82.88922250270844),
            zoom: initZoom
        });
    });

    afterEach(function() {
        L.DG.Jsonp.restore();
        map.remove();
        map = null;
        spy = null;
    });

    describe("#getLocations", function() {

it('should request locations from WebApi', function (done) {
            //delete
            spy = sinon.spy(map.dgGeoclicker._controller._catalogApi, "getLocations");

            happen.click(mapContainer);

            setTimeout(function() {
                expect(spy.calledOnce).to.be.ok();
                expect(spy.getCall(0).args[1]).to.be.equal(initZoom);
                done();
            }, 200);

        });

    });

    describe("default handler", function() {

it('should use default handler if CatalogApi returned no result', function (done) {
    // change to Controller._handleResponse to test correct handle called

            // stub the default handler inject him to the handlers sequence
            spy = sinon.spy(function () {
                return true;
            });

            var handler = L.Class.extend({
                    handle: spy
                });

            L.DG.Geoclicker.Controller.mergeOptions({
                handlersSequence: {
                    default: handler
                }
            });

            // stub the CatalogApi
            sinon.stub(map.dgGeoclicker._controller._catalogApi, "getLocations").callsArgWith(2, undefined);

            happen.click(mapContainer);

            setTimeout(function() {
                expect(spy.calledOnce).to.be.ok();
                done();
            }, 200);

        });


it('should use default handler, unless handler was found', function (done) {
    // the same as previous test
            var geoCoderResult = {
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

            // stub the CatalogApi
            sinon.stub(map.dgGeoclicker._controller._catalogApi, "getLocations").callsArgWith(2, geoCoderResult)

            happen.click(mapContainer);

            setTimeout(function() {
                expect(spyDefault.called).to.be(true);
                expect(spyCity.called).to.be(false);
                done();
            }, 200);

        });


    });

    describe("other handlers", function() {

it('should call handlers in order, corresponded to the  L.DG.Geoclicker.Controller.handlersSequence, also should call the next handler in sequence, if the previous returned false', function (done) {
            //the same as previous
            var geoCoderResult = {
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
            sinon.stub(map.dgGeoclicker._controller._catalogApi, "getLocations").callsArgWith(2, geoCoderResult)

            happen.click(mapContainer);

            setTimeout(function() {
                expect(spyDefault.called).to.be(false);

                expect(spyHouse.called).to.be(true);

                expect(spyCity.called).to.be(true);

                expect(spyHouse.calledBefore(spyCity)).to.be(true);

                done();

            }, 200);
        });


    });

});
