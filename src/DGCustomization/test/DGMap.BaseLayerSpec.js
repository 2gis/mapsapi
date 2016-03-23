describe('DG.TileLayer', function () {
    var mapContainer,
        map;

    before(function () {
        mapContainer = document.createElement('div');
        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });
    });

    after(function () {
        map.remove();
        mapContainer = map = null;
    });

    describe('check init', function () {
        it('should be map.baseLayer', function () {
            expect(map.baseLayer).to.be.a('object');
        });

        it('should be zIndex 0 on layer container', function () {
            var layerContainer = map.baseLayer._container;

            expect(Number(layerContainer.style.zIndex)).to.be(0);
        });
    });
});
