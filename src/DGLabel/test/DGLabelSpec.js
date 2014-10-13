describe('DG.Label', function () {
    var map,
        mapContainer = document.createElement("div");

    after(function() {
        mapContainer = null;
    });

    beforeEach(function () {
        map = new DG.Map(mapContainer, {
            center: new DG.LatLng(69.349552990994837, 87.75222519148015),
            zoom: 17
        });
    });

    afterEach(function () {
        map && map.remove();
        map = null;
    });

    describe('"DG.Label" class', function(){
        var label = DG.label();
        it('it should have "onAdd()" public method', function(){
            expect(label.onAdd).to.be.a('function');
        });
        it('it should have "onRemove()" public method', function(){
            expect(label.onRemove).to.be.a('function');
        });
        it('it should properly merge options object passed to constructor', function(){
            var labelWithOptions = DG.label('', { className: "test-class" });
            expect(labelWithOptions.options.className).to.eql('test-class');
        });
        describe('#setContent and #setPosition', function(){
            it('should return "DG.Label" instance', function(){
                expect(label.setContent('ra-ta-ta')).to.be.a(DG.Label);
                expect(label.setPosition( new DG.LatLng(54.980206086231, 82.898068362003) )).to.be.a(DG.Label);

                expect(label.setContent( null )).to.be.a(DG.Label);
                expect(label.setPosition( null )).to.be.a(DG.Label);
            });
        });
    });

    describe('"DG.label()" factory', function(){
        it(' should return "DG.Label" instance', function(){
            var label = DG.label();
            expect(label).to.be.a(DG.Label);
        });
    });

    describe('mixins into "DG.Marker"', function(){
        it('#bindLabel should return "DG.Marker" instance', function(){
            var marker = DG.marker([54.950206086231, 82.898068362003]).addTo(map);

            expect(marker.bindLabel()).to.be.a(DG.Marker);
        });
        it('#unbindLabel should return "DG.Marker" instance', function(){
            var marker = DG.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = DG.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.unbindLabel()).to.be.a(DG.Marker);
            expect(markerWithLabel.unbindLabel()).to.be.a(DG.Marker);
        });
        it('#showLabel should return "DG.Marker" instance', function(){
            var marker = DG.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = DG.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.showLabel()).to.be.a(DG.Marker);
            expect(markerWithLabel.showLabel()).to.be.a(DG.Marker);
        });
        it('#hideLabel should return "DG.Marker" instance', function(){
            var marker = DG.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = DG.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.hideLabel()).to.be.a(DG.Marker);
            expect(markerWithLabel.hideLabel()).to.be.a(DG.Marker);
        });
        it('#getLabel should return "DG.Label" instance after #bindLabel call', function(){
            var markerWithLabel = DG.marker([54.950206086231, 82.898068362003])
                                        .addTo(map)
                                        .bindLabel('ra-ta-ta');

            expect(markerWithLabel.getLabel()).to.be.a(DG.Label);
        });
        it('#getLabel should return null after #unbindLabel call and before #bindLabel call', function(){
            var marker = DG.marker([54.950206086231, 82.898068362003]).addTo(map),
                markerWithLabel = DG.marker([54.950206086231, 82.898068362003]).addTo(map).bindLabel('ra-ta-ta');

            expect(marker.getLabel()).to.be(null);
            expect(markerWithLabel.unbindLabel().getLabel()).to.be(null);
        });
    });

    describe('mixins into "DG.Path"', function(){
        it('#bindLabel should return "DG.Path" instance', function(){
            var path = DG.circle([55.0, 83.0], 900).addTo(map);

            expect(path.bindLabel()).to.be.a(DG.Path);
        });
        it('#unbindLabel should return "DG.Path" instance', function(){
            var path = DG.circle([55.0, 83.0], 900).addTo(map),
                pathWithLabel = DG.circle([55.0, 83.0], 900).addTo(map).bindLabel('ra-ta-ta');

            expect(path.unbindLabel()).to.be.a(DG.Path);
            expect(pathWithLabel.unbindLabel()).to.be.a(DG.Path);
        });
        it('#getLabel should return "DG.Label" instance after #bindLabel call', function(){
            var pathWithLabel = DG.circle([55.0, 83.0], 900)
                                        .addTo(map)
                                        .bindLabel('ra-ta-ta');

            expect(pathWithLabel.getLabel()).to.be.a(DG.Label);
        });
        it('#getLabel should return null after #unbindLabel call and before #bindLabel call', function(){
            var path = DG.circle([55.0, 83.0], 900).addTo(map),
                pathWithLabel = DG.circle([55.0, 83.0], 900).addTo(map).bindLabel('ra-ta-ta');

            expect(path.getLabel()).to.be(null);
            expect(pathWithLabel.unbindLabel().getLabel()).to.be(null);
        });
    });

});
