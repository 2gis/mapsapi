describe('L.DG.Geoclicker', function () {
    var map,
        spy,
        mapContainer = document.getElementById('map');

    afterEach(function () {
        L.Map.mergeOptions({
            dgGeoclicker: true
        });
        map.remove();
        map = null;
        spy = null;
    });

    describe("#enabled", function() {

        it('should be inactive, if L.Map.options.dgGeoClicker was set to false', function () {

            L.Map.mergeOptions({
                dgGeoclicker: false
            });

            map = new L.Map(mapContainer, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(false);
        });

        it('should be active by default', sinon.test(function () {

            map = new L.Map(mapContainer, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            });

            expect(map.dgGeoclicker.enabled()).to.be.equal(true);
        }));

    });

    describe("#handleClick", function() {

it('should handle click on map and give it to Geoclicker.Controller by calling handleClick with correct zoom', function (done) {

            map = new L.Map(mapContainer, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: 17
            }),
            spy = sinon.spy(map.dgGeoclicker._controller, "handleClick");

            happen.click(mapContainer);

            setTimeout(function() {
                expect(spy.called).to.be.ok();
                done();
            }, 200);
        });


    });

    describe("#handlePopupClose", function() {

        it('should handle event "popupclose" and forward it to the Controller.handlePopup', function (done) {

            var initZoom = 17,
                popupDummy = sinon.createStubInstance(L.Popup);

            map = new L.Map(document.getElementById('map'), {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: initZoom
            }),
            spy = sinon.spy(map.dgGeoclicker._controller, "handlePopupClose");

            map.fire('popupclose', {popup: popupDummy});

            expect(spy.calledWith(popupDummy)).to.be(true);

            done();

        });

    });

    describe("#disable", function() {

it('shouldn\'t handle click and popupclose, if dgGeoclicker was disabled', function (done) {
            var initZoom = 17,
                popupDummy = sinon.createStubInstance(L.Popup),
                container = document.getElementById('map');

            map = new L.Map(container, {
                center: new L.LatLng(54.98117239821992, 82.88922250270844),
                zoom: initZoom
            });
            var handleClickSpy = sinon.spy(map.dgGeoclicker._controller, "handleClick"),
                popupSpy =  sinon.spy(map.dgGeoclicker._controller, "handlePopupClose");

            map.dgGeoclicker.disable();

            happen.click(container);
            map.fire('popupclose', {popup: popupDummy});

            setTimeout(function() {
                expect(handleClickSpy.called).to.not.be.ok();
                expect(popupSpy.calledWith(popupDummy)).to.be(false);
                done();
            }, 400);

        });


    });

});
