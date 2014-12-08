/*global describe:false, it:false, expect:false, beforeEach:false, afterEach:false, sinon:false */

describe('DG.Geoclicker.Controller', function () {
    var map,
        mapContainer = document.createElement('div'),
        spy,
        initZoom = 17,
        controller;

    after(function() {
        mapContainer = initZoom = null;
    });

    beforeEach(function () {
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(54.98117239821992, 82.88922250270844),
            zoom: initZoom
        });
        controller = map.geoclicker.getController();
    });

    afterEach(function () {
        map.remove();
        map = null;
        spy = null;
        controller = null;
    });

    describe('#findHandler', function () {

        it('should return null if handler name was not found (as a result - the default handler will be called)', function () {

            spy = sinon.spy(controller, 'findHandler');

            controller.findHandler({'somedummyhandler': 1});

            expect(spy.returnValues.pop()).to.be.equal(null);

        });


        it('should return correct handler name if handler was found', function () {

            spy = sinon.spy(controller, 'findHandler');

            controller.findHandler({'building': 2});

            expect(spy.returnValues.pop()).to.be.equal('building');
        });

    });

    describe('#handleResponse', function () {
        var defaultSpy,
            houseSpy,
            districtSpy,
            citySpy,
            defaultHandler,
            cityHandler,
            districtHandler,
            houseHandler;

        beforeEach(function () {

            defaultSpy = sinon.stub().returns(Promise.resolve({}));
            houseSpy = sinon.stub().returns(Promise.resolve({}));
            citySpy = sinon.stub().returns(Promise.resolve({}));
            districtSpy = sinon.stub().returns(false);

            addClickEventStub = sinon.stub();

            defaultHandler = DG.Class.extend({
                handle: defaultSpy,
                addClickEvent: addClickEventStub
            });
            houseHandler = DG.Class.extend({
                handle: houseSpy,
                addClickEvent: addClickEventStub
            });
            cityHandler = DG.Class.extend({
                handle: citySpy,
                addClickEvent: addClickEventStub
            });
            districtHandler = DG.Class.extend({
                handle: districtSpy,
                addClickEvent: addClickEventStub
            });

            DG.Geoclicker.Controller.mergeOptions({
                handlersSequence: {
                    default: defaultHandler,
                    house: houseHandler,
                    district: districtHandler,
                    city: cityHandler
                }
            });

        });

        afterEach(function () {

            defaultSpy = null;
            districtSpy = null;
            houseSpy = null;
            citySpy = null;
            defaultHandler = null;
            houseHandler = null;
            districtHandler = null;
            cityHandler = null;

        });


        it('should call only default handler if no result was received from WebApi', function () {

            controller.handleResponse(undefined);

            expect(defaultSpy.called).to.be.ok();
            expect(houseSpy.called).to.not.be.ok();

        });

        it('should call correct handler according to response of WebApi', function () {

            controller.handleResponse({
                'house' : 2
            });

            expect(defaultSpy.called).to.not.be.ok();
            expect(houseSpy.called).to.be.ok();

        });

        it('should call next handler if previous returned false', function () {

            controller.handleResponse({
                'district': 1,
                'city': 3
            });

            expect(districtSpy.called).to.be.ok();
            expect(citySpy.called).to.be.ok();
            expect(defaultSpy.called).to.not.be.ok();
            expect(houseSpy.called).to.not.be.ok();

        });

    });

});

