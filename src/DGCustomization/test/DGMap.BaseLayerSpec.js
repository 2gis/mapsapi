describe('DG.TileLayer', function() {
    var mapContainer = document.createElement('div'),
        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });

    after(function() {
        mapContainer = map = null;
    });

    describe('check init', function() {
        it('should tile url contain \'2gis\'', function() {
            var img = map.getPane('mapPane').getElementsByTagName('img');

            expect(img.length > 0).to.be.ok();

            expect(img[0].getAttribute('src')).contain('2gis');
        });

        it('should be map.baseLayer', function() {
            expect(map.baseLayer).to.be.a('object');
        });
    });
});
