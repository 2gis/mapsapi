describe('DG.ProjectDetectorInit', function () {
    var map,
        mapContainer,
        maxZoom = 18,
        maxDesertZoom = 16,
        project1,
        desert1;

    before(function () {
        mapContainer = document.createElement('div');

        // Где-то где есть проект
        project1 = new DG.LatLng(54.97902673261798, 82.819265127182);

        // Где-то в лесу, там где нет проекта
        desert1 = new DG.LatLng(59.56, 86.32);

        document.body.appendChild(mapContainer);
        mapContainer.style.width = 1900 + 'px';
        mapContainer.style.height = 600 + 'px';
    });

    after(function() {
        document.body.removeChild(mapContainer);
        map = mapContainer = maxZoom = maxDesertZoom = project1 = desert1 = null;
    });

    describe('#initMap', function () {

        afterEach(function () {
            map.remove();
            map = null;
        });

        it('in project', function () {
            map = new DG.Map(mapContainer, {
                center: project1,
                key: window.__karma__.config.secretKey,
                'zoom': 19,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(maxZoom);
        });

        it('in desert', function () {
            map = new DG.Map(mapContainer, {
                center: desert1,
                key: window.__karma__.config.secretKey,
                'zoom': 19,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('in project with max zoom', function () {
            map = new DG.Map(mapContainer, {
                center: project1,
                key: window.__karma__.config.secretKey,
                'zoom': 19,
                'maxZoom': 15,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(15);
        });

        it('in desert with max zoom', function () {
            map = new DG.Map(mapContainer, {
                center: desert1,
                key: window.__karma__.config.secretKey,
                'zoom': 19,
                'maxZoom': 15,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('without options', function () {
            map = new DG.Map(mapContainer).setView([0, 0], 0);
            expect(map.getCenter()).to.be.eql({lat: 0, lng: 0});
        });

    });
});
