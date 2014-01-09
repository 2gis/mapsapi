describe('L.DG.ProjectDetector', function(){
    var map,
        mapContainer = document.createElement('div'),
        spy,
        initZoom = 17,
        maxZoom = 18,
        maxDesertZoom = 13,
        project1 =    new L.LatLng(54.97902673261798, 82.819265127182),
        project2 =    new L.LatLng(54.98620210307464, 73.41429233551025),
        edgeProject = new L.LatLng(55.24446959522988, 82.85625815391539),
        desert1 =     new L.LatLng(54.89635451954825, 82.40295410156249),
        desert2 =     new L.LatLng(61.1128985047811, 89.5414924621582);

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            center: new L.LatLng(54.98117239821992, 82.88922250270844),
            zoom: initZoom,
            zoomAnimation: false
        });
    });

    afterEach(function () {
        map.remove();
        map = null;
        spy = null;
    });

    describe('#setView', function(){

        it('go to from project to project', function() {
            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to from desert to project', function() {
            map.setView(desert1, maxZoom);

            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to from project1 to project2', function() {
            map.setView(project1, maxZoom);

            expect(map.setView(project2)).to.be(map);
                console.log(map.getZoom());
                expect(map.getZoom()).to.be(maxZoom);
                expect(map.getCenter()).to.be.equal(project2);
        });

        it('go to from project to desert', function() {
            map.setView(project1, maxZoom);

            expect(map.setView(desert1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to from desert1 to desert2', function() {
            map.setView(desert1, maxDesertZoom);

            expect(map.setView(desert2)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert2);
        });

        it('go to from desert1 to desert2', function() {
            map.setView(project1, maxZoom);

            expect(map.setView(edgeProject)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(edgeProject);
        });

    });
});