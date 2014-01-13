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
        edgeProject1 = new L.LatLng(55.24446959522988, 82.85625815391539),
        edgeProject2 = new L.LatLng(55.27354174049191, 82.869873046875),
        edgeProject3 = new L.LatLng(55.28664323349526, 82.87656784057617),
        desert1 =      new L.LatLng(54.89635451954825, 82.40295410156249),
        desert2 =      new L.LatLng(61.1128985047811, 89.5414924621582);

    document.body.appendChild(mapContainer);
    mapContainer.style.width = 1900 + 'px';
    mapContainer.style.height = 600 + 'px';

    beforeEach(function () {
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

    describe('#fitBounds', function () {

        it('bound on project edge', function () {
            map.setView(project1, 8);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject1, edgeProject2))).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 8);

            expect(map.fitBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on project1 from project2 small zoom', function () {
            map.setView(project2, 8);

            expect(map.fitBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on desert from project1 max zoom', function () {
            map.setView(project1, 18);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });

        it('bound on desert from desert small zoom', function () {
            map.setView(edgeProject2, 8);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });
    });

    describe('#fitWorld', function () {

        it('fire from max zoom', function () {
            map.setView(project1, maxZoom);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });

        it('fire from min zoom', function () {
            map.setView(project1, 0);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });

        it('fire after min zoom 15', function () {
            map.setZoom(15);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });

        it('fire after min zoom 15', function () {
            map.setMaxZoom(1);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });
    });

    describe('#panTo', function () {

        it('fire on project2 from project1', function () {
            map.setView(project1, 16);

            expect(map.panTo(project2)).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.be.equal(project2);
        });

        it('fire on desert from project1 max zoom', function () {
            map.setView(project1, maxZoom);

            expect(map.panTo(desert1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('fire on project1 from desert', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.panTo(project1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('fire on project1 from project1', function () {
            map.setView(start, 15);

            expect(map.panTo(project1)).to.be(map);
            expect(map.getZoom()).to.be(15);
            expect(map.getCenter().distanceTo(project1)).to.be.below(15);
        });
    });

    describe('#panInsideBounds', function () {

        it('bound on project1 from project2', function () {
            map.setView(project2, 15);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on desert from project1 max zoom', function () {
            map.setView(project1, 18);

            expect(map.panInsideBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });

        it('bound on project1 from desert', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 15);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

    });

    describe('#panBy', function () {

        it('fire with viewport size', function () {
            map.setView(project1, 16);

            expect(map.panBy([1901, 601])).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.be.eql(new L.LatLng(54.971628386497684, 82.86006689071654));
        });

        it('fire on project edge from desert', function () {
            map.setView(edgeProject1, maxZoom);

            expect(map.panBy([0, -2000])).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(new L.LatLng(55.250493647659134, 82.85625815391539));
        });

        it('fire on project viewport', function () {
            map.setView(project1, maxZoom);

            expect(map.panBy([100, -200])).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.eql(new L.LatLng(54.97964243031826, 82.81980156898499));
        });

    });

    describe('#setMaxZoom', function () {

        it('set max 15 and zoom to 18 in project', function () {
            map.setView(project1);

            expect(map.setMaxZoom(15)).to.be(map);
            expect(map.setZoom(maxZoom).getZoom()).to.be(15);
        });

        it('set max 15 and zoom to 18 in desert', function () {
            map.setView(desert1);

            expect(map.setMaxZoom(15)).to.be(map);
            expect(map.setZoom(maxZoom).getZoom()).to.be(maxDesertZoom);
        });

        it('set max 10 and zoom to 18 in desert', function () {
            map.setView(desert1);

            expect(map.setMaxZoom(10)).to.be(map);
            expect(map.setZoom(maxZoom).getZoom()).to.be(10);
        });

        it('setMaxZoom without parametrs in project', function () {
            map.setView(project1);

            expect(map.setMaxZoom()).to.be(map);
            expect(map.setZoom(28).getZoom()).to.be(maxZoom);
        });

        it('setMaxZoom without parametrs in desert', function () {
            map.setView(desert1);

            expect(map.setMaxZoom()).to.be(map);
            expect(map.setZoom(28).getZoom()).to.be(maxDesertZoom);
        });
    });

});