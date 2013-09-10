describe('L.DG.Label', function () {
    var map,
        mapContainer = document.createElement("div");

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            center: new L.LatLng(69.349552990994837, 87.75222519148015),
            zoom: 17
        });
    });

    afterEach(function () {
        map && map.remove();
        map = null;
    });

    describe('"L.DG.Label" class', function(){
        var label = L.DG.label();
        it('it should have "onAdd()" public method', function(){
            expect(label.onAdd).to.be.a('function');
        });
        it('it should have "onRemove()" public method', function(){
            expect(label.onRemove).to.be.a('function');
        });
        it('it should properly merge options object passed to constructor', function(){
            var labelWithOptions = L.DG.label('', { className: "test-class" });
            expect(labelWithOptions.options.className).to.eql('test-class');
        });
        describe('#setContent and #setPosition', function(){
            it('should return "L.DG.Label" instance', function(){
                expect(label.setContent('ra-ta-ta')).to.be.a(L.DG.Label);
                expect(label.setPosition( new L.LatLng(54.980206086231, 82.898068362003) )).to.be.a(L.DG.Label);

                expect(label.setContent( null )).to.be.a(L.DG.Label);
                expect(label.setPosition( null )).to.be.a(L.DG.Label);
            });
        });
    });

    describe('"L.DG.label()" factory', function(){
        it(' should return "L.DG.Label" instance', function(){
            var label = L.DG.label();
            expect(label).to.be.a(L.DG.Label);
        });
    });

    describe('mixins into "L.Marker"', function(){
        it('#bindLabel should return "L.Marker" instance', function(){
            var marker = L.marker([54.950206086231, 82.898068362003]).addTo(map);

            expect(marker.bindLabel()).to.be.a(L.Marker);
        });
        it('#unbindLabel should return "L.Marker" instance', function(){
            var marker = L.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = L.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.unbindLabel()).to.be.a(L.Marker);
            expect(markerWithLabel.unbindLabel()).to.be.a(L.Marker);
        });
        it('#showLabel should return "L.Marker" instance', function(){
            var marker = L.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = L.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.showLabel()).to.be.a(L.Marker);
            expect(markerWithLabel.showLabel()).to.be.a(L.Marker);
        });
        it('#hideLabel should return "L.Marker" instance', function(){
            var marker = L.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = L.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.hideLabel()).to.be.a(L.Marker);
            expect(markerWithLabel.hideLabel()).to.be.a(L.Marker);
        });
        it('#getLabel should return "L.DG.Label" instance after #bindLabel call', function(){
            var markerWithLabel = L.marker([54.950206086231, 82.898068362003])
                                        .addTo(map)
                                        .bindLabel('ra-ta-ta');

            expect(markerWithLabel.getLabel()).to.be.a(L.DG.Label);
        });
        it('#getLabel should return null after #unbindLabel call and before #bindLabel call', function(){
            var marker = L.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = L.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.getLabel()).to.be(null);
            expect(markerWithLabel.unbindLabel().getLabel()).to.be(null);
        });
    });

    describe('mixins into "L.Path"', function(){
        it('#bindLabel should return "L.Path" instance', function(){
            var path = L.circle([55.0, 83.0], 900).addTo(map);

            expect(path.bindLabel()).to.be.a(L.Path);
        });
        it('#unbindLabel should return "L.Path" instance', function(){
            var path = L.circle([55.0, 83.0], 900).addTo(map),
                pathWithLabel = L.circle([55.0, 83.0], 900).addTo(map).bindLabel('ra-ta-ta');

            expect(path.unbindLabel()).to.be.a(L.Path);
            expect(pathWithLabel.unbindLabel()).to.be.a(L.Path);
        });
        it('#getLabel should return "L.DG.Label" instance after #bindLabel call', function(){
            var pathWithLabel = L.circle([55.0, 83.0], 900)
                                        .addTo(map)
                                        .bindLabel('ra-ta-ta');

            expect(pathWithLabel.getLabel()).to.be.a(L.DG.Label);
        });
        it('#getLabel should return null after #unbindLabel call and before #bindLabel call', function(){
            var path = L.circle([55.0, 83.0], 900).addTo(map),
                pathWithLabel = L.circle([55.0, 83.0], 900).addTo(map).bindLabel('ra-ta-ta');

            expect(path.getLabel()).to.be(null);
            expect(pathWithLabel.unbindLabel().getLabel()).to.be(null);
        });
    });

});
