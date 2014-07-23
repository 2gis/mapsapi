/*global describe:false, it:false, expect:false, afterEach:false */
describe('DG.ProjectDetectorInit', function () {
    var map,
        mapContainer = document.createElement('div'),
        maxZoom = 18,
        maxDesertZoom = 13,
        project1 =     new DG.LatLng(54.97902673261798, 82.819265127182),
        desert1 =      new DG.LatLng(54.817453325877906, 81.85930252075195);

    document.body.appendChild(mapContainer);
    mapContainer.style.width = 1900 + 'px';
    mapContainer.style.height = 600 + 'px';

    describe('#initMap', function () {

        afterEach(function () {
            map.remove();
            map = null;
        });

        it('in project', function () {
            map = new DG.Map(mapContainer, {
                center: project1,
                'zoom': 19,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(maxZoom);
        });

        it('in desert', function () {
            map = new DG.Map(mapContainer, {
                center: desert1,
                'zoom': 19,
                'geoclicker': true,
                'zoomAnimation': false
            });
            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('in project with max zoom', function () {
            map = new DG.Map(mapContainer, {
                center: project1,
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
