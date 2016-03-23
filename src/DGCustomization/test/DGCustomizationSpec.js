describe('DGCustomization', function() {
    var mapContainer,
        map;

    before(function () {
        mapContainer = document.createElement('div');
        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });

        document.body.appendChild(mapContainer);
        map.setLang('ru');
    });

    after(function() {
        map.remove();
        mapContainer.parentElement.removeChild(mapContainer);
        mapContainer = map = null;
    });

    describe('DG.Control', function() {
        it ('change map lang should call _renderTranslation function', function() {
            var control = DG.control(),
                spy = sinon.spy();

            control._renderTranslation = spy;
            map.setLang('en');

            expect(spy).to.be.ok();
        });
    });
});
