describe('DG.Entrance', function () {
    var map,
        spy,
        entrance,
        mapContainer = document.createElement('div'),
        ua = navigator.userAgent.toLowerCase(),
        ff = ua.indexOf('firefox') > -1;

    after(function() {
        entrance.remove();
        map && map.remove();
        map = spy = entrance = mapContainer = ua = ff = null;
    });

    beforeEach(function () {
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(69.349552990994837, 87.75222519148015),
            zoom: 17
        });
        entrance = new DG.Entrance({
            'is_primary': false,
            'name': 'ЗАГС',
            'points': ['POINT(87.75222519148015 69.349552990994837)'],
            'vectors': ['LINESTRING(87.752433542237128 69.349501774294012,87.75222519148015 69.349552990994837)']
        });
    });

    afterEach(function () {
        entrance.removeFrom(map);
        map && map.remove();
        map = null;
    });

    // since ff/mocha/phantom has some strange bug with svg beginElement()
    if (!ff) {
        describe('#addTo', function () {
            it('should return \'DG.Entrance\' instance', function () {
                expect(entrance.addTo(map)).to.be.a(DG.Entrance);
            });

            it('should fire \'entranceshow\' event', function () {
                spy = sinon.spy();
                map.on('entranceshow', spy);
                entrance.addTo(map);
                expect(spy.called).to.be.ok();
            });

            it('should not fire \'entranceshow\' event if already shown', function () {
                entrance.addTo(map);
                spy = sinon.spy();
                map.on('entranceshow', spy);
                entrance.addTo(map);
                expect(spy.called).not.to.be.ok();
            });

            it('should adjust map center and show entrance in viewport', function () {
                map.setView([54.980206086231, 82.898068362003], 17); // Novosibirsk
                entrance.addTo(map);
                entrance.fitBounds();
                expect(map.getCenter()).to.eql(entrance.getBounds().getCenter()); // Kayerkan
            });

            it('should add layers on map and visible container', function() {
                var layers = entrance._layers;

                entrance.addTo(map);

                Object.keys(layers).forEach(function(el) {
                    expect(map.hasLayer(layers[el])).to.be.ok();
                    expect(layers[el]._visibility.isShown).to.be(true);
                });
            });
        });
    }
    describe('#removeFrom', function () {

        it('should return \'DG.Entrance\' instance', function () {
            expect(entrance.removeFrom(map)).to.be.a(DG.Entrance);
        });
        if (!ff) {
            it('should fire \'entrancehide\' event', function () {
                entrance.addTo(map);
                spy = sinon.spy();
                map.on('entrancehide', spy);
                entrance.removeFrom(map);
                expect(spy.called).to.be.ok();
            });
        }
        it('should not fire \'entrancehide\' event if already hidden (hidden by default)', function () {
            spy = sinon.spy();
            map.on('entrancehide', spy);
            entrance.removeFrom(map);
            expect(spy.called).not.to.be.ok();
        });

        it('should layers not on map and not visible container', function() {
            var layers = entrance._layers;

            Object.keys(layers).forEach(function(el) {
                expect(map.hasLayer(layers[el])).not.be.ok();
                expect(layers[el]._visibility.isShown).not.be(true);
            });
        });

    });

    describe('#isShown', function () {

        it('should return \'false\' by default', function () {
            expect(entrance.isShown()).not.to.be.ok();
        });
        if (!ff) {
            it('should return \'true\' after show and \'false\' after hide', function () {
                entrance.addTo(map);
                expect(entrance.isShown()).to.be.ok();
                entrance.removeFrom(map);
                expect(entrance.isShown()).not.to.be.ok();
            });
        }
    });

    describe('#getBounds', function () {

        it('should return bounds of all arrows of the entrance', function () {
            var entranceBounds = new DG.LatLngBounds(
                [69.349552990994837, 87.75222519148015],
                [69.349501774294012, 87.752433542237128]
            );
            expect(entrance.getBounds()).to.eql(entranceBounds);
        });
    });

});
