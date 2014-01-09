/*global describe:false, it:false, expect:false, beforeEach:false, afterEach:false */
describe('L.DG.ProjectDetector', function () {
    var map,
        mapContainer = document.createElement('div'),
        spy,
        initZoom = 17,
        maxZoom = 18,
        maxDesertZoom = 13,
        start =        new L.LatLng(54.98117239821992, 82.88922250270844),
        project1 =     new L.LatLng(54.97902673261798, 82.819265127182),
        project2 =     new L.LatLng(54.98620210307464, 73.41429233551025),
        edgeProject1 =  new L.LatLng(55.24446959522988, 82.85625815391539),
        edgeProject2 = new L.LatLng(55.27354174049191, 82.869873046875),
        desert1 =      new L.LatLng(54.89635451954825, 82.40295410156249),
        desert2 =      new L.LatLng(61.1128985047811, 89.5414924621582);

    beforeEach(function () {
        document.body.appendChild(mapContainer);
        mapContainer.style.width = 1600 + 'px';
        mapContainer.style.height = 800 + 'px';
        map = new L.Map(mapContainer, {
            center: start,
            zoom: initZoom,
            zoomAnimation: false
        });
    });

    afterEach(function () {
        map.remove();
        map = null;
        spy = null;
    });

    describe('#setView', function () {

        it('go to from project to project', function () {
            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to from desert to project', function () {
            map.setView(desert1, maxZoom);

            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to from project1 to project2', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(project2)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project2);
        });

        it('go to from project to desert', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(desert1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to from desert1 to desert2', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.setView(desert2)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert2);
        });

        it('go to from desert1 to desert2', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(edgeProject1)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(edgeProject1);
        });

    });

    describe('#setZoom', function () {

        it('go to 18 zoom level in desert', function () {
            map.setView(desert1, maxDesertZoom);

            map.setZoom(maxZoom);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to 18 zoom level from 0', function () {
            map.setView(project1, 0);

            map.setZoom(maxZoom);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to 0 zoom level from 18', function () {
            map.setView(project1, maxZoom);

            map.setZoom(0);
            expect(map.getZoom()).to.be(0);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to max zoom level + 1', function () {
            map.setZoom(map.getMaxZoom() + 1);
            expect(map.getZoom()).to.be(map.getMaxZoom());
        });

        it('go to min zoom level - 1', function () {
            map.setZoom(map.getMinZoom() - 1);
            expect(map.getZoom()).to.be(map.getMinZoom());
        });
    });

    describe('#zoomIn', function () {

        it('call on maxZoom', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.zoomIn()).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('call on 16 level', function () {
            map.setView(desert1, 10);

            expect(map.zoomIn()).to.be(map);
            expect(map.getZoom()).to.be(11);
        });

    });

    describe('#zoomOut', function () {

        it('call on minZoom', function () {
            map.setView(desert1, 0);

            expect(map.zoomOut()).to.be(map);
            expect(map.getZoom()).to.be(0);
        });

        it('call on 16 level', function () {
            map.setView(desert1, 10);

            expect(map.zoomOut()).to.be(map);
            expect(map.getZoom()).to.be(9);
        });

    });

    describe('#setZoomAround', function () {

        it('zoom to other project', function () {
            map.setView(project1);

            expect(map.setZoomAround(project2, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getBounds().contains(project2)).to.be.ok();
        });

        it('zoom in the project', function () {
            map.setView(start, 13);

            expect(map.setZoomAround(project1, maxZoom)).to.be(map);
            expect(map.getBounds().contains(project1)).to.be.ok();
            expect(map.getZoom()).to.be(maxZoom);
        });

        it('zoom in the project', function () {
            map.setView(edgeProject1, 12);

            expect(map.setZoomAround(edgeProject2, maxZoom)).to.be(map);
            expect(map.getBounds().contains(edgeProject2)).to.be.ok();
            expect(map.getZoom()).to.be(maxDesertZoom);
        });
    });

});