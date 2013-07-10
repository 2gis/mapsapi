describe('L.DG.Entrance', function () {
    var map,
        spy,
        entrance,
        mapContainer = document.createElement("div");

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            center: new L.LatLng(69.349552990994837, 87.75222519148015),
            zoom: 17
        });
        entrance = new L.DG.Entrance({
            "is_primary":false,
            "name":"ЗАГС",
            "points":["POINT(87.75222519148015 69.349552990994837)"],
            "vectors":["LINESTRING(87.752433542237128 69.349501774294012,87.75222519148015 69.349552990994837)"]
        });
        entrance.addTo(map);
    });

    afterEach(function () {
        entrance.removeFrom(map);
        map && map.remove();
        map = null;
    });

    describe("#addTo and #removeFrom", function() {
        it('should return "L.DG.Entrance" instance', function () {
            var entrance1 = new L.DG.Entrance({
                "is_primary":false,
                "name":"ЗАГС",
                "points":["POINT(87.75222519148015 69.349552990994837)"],
                "vectors":["LINESTRING(87.752433542237128 69.349501774294012,87.75222519148015 69.349552990994837)"]
            });
            expect(entrance1.addTo(map)).to.be.a(L.DG.Entrance);
            expect(entrance1.removeFrom(map)).to.be.a(L.DG.Entrance);
        });
    });

    describe("#show", function() {

        it('should return "L.DG.Entrance" instance', function () {
            expect(entrance.show()).to.be.a(L.DG.Entrance);
        });

        it('should fire "dgEntranceShow" event', function () {
            spy = sinon.spy();
            map.on('dgEntranceShow', spy);
            entrance.show();
            expect(spy.called).to.be.ok();
        });

        it('should not fire "dgEntranceShow" event if already shown', function () {
            entrance.show();
            spy = sinon.spy();
            map.on('dgEntranceShow', spy);
            entrance.show();
            expect(spy.called).not.to.be.ok();
        });

        it('should adjust map center and show entrance in viewport', function () {
            map.setView([54.980206086231, 82.898068362003], 17); // Novosibirsk
            entrance.show();
            expect(map.getCenter()).to.eql(entrance.getBounds().getCenter()); // Kayerkan
        });

        it('should not adjust map center if entrance already shown', function () {
            entrance.show();
            map.setView([54.980206086231, 82.898068362003], 17); // Novosibirsk
            entrance.show();
            expect(map.getCenter()).to.eql(entrance.getBounds().getCenter()); // Kayerkan
        });
    });

    describe("#hide", function() {

        it('should return "L.DG.Entrance" instance', function () {
            expect(entrance.hide()).to.be.a(L.DG.Entrance);
        });     

        it('should fire "dgEntranceHide" event', function () {
            entrance.show();
            spy = sinon.spy();
            map.on('dgEntranceHide', spy);
            entrance.hide();
            expect(spy.called).to.be.ok();
        });

        it('should not fire "dgEntranceHide" event if already hidden (hidden by default)', function () {
            spy = sinon.spy();
            map.on('dgEntranceHide', spy);
            entrance.hide();
            expect(spy.called).not.to.be.ok();
        });

    });

    describe("#isShown", function() {

        it('should return "false" by default', function () {
            expect(entrance.isShown()).not.to.be.ok();
        });

        it('should return "true" after show and "false" after hide', function () {
            entrance.show();
            expect(entrance.isShown()).to.be.ok();
            entrance.hide();
            expect(entrance.isShown()).not.to.be.ok();
        });

    });

    describe("#getBounds", function() {

        it('should return bounds of all arrows of the entrance', function () {
            var entranceBounds = new L.LatLngBounds(
                [69.349552990994837, 87.75222519148015],
                [69.349501774294012, 87.752433542237128]
            );
            expect(entrance.getBounds()).to.eql(entranceBounds);

            // TODO: test another entrance types
        });

    });

});
