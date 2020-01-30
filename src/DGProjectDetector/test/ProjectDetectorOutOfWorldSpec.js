describe('DG.ProjectDetectorOut', function () {
    var map,
        mapContainer,
        initZoom = 17,
        maxZoom = 18,
        maxDesertZoom = 16,
        start,
        project1,
        project2,
        desert1,
        desert2;

    before(function () {
        mapContainer = document.createElement('div');

        start =        new DG.LatLng(54.98117239821992, 360 + 82.88922250270844);
        project1 =     new DG.LatLng(54.97902673261798, 360 + 82.819265127182);
        project2 =     new DG.LatLng(54.98620210307464, 360 + 73.41429233551025);

        desert1 =      new DG.LatLng(55.00, 360 + 80.00);
        desert2 =      new DG.LatLng(61.00, 360 + 90.00);

        document.body.appendChild(mapContainer);
        mapContainer.style.width = 1900 + 'px';
        mapContainer.style.height = 600 + 'px';
    });

    after(function() {
        document.body.removeChild(mapContainer);
        mapContainer = initZoom = maxZoom = maxDesertZoom = start = project1 = null;
        project2 = desert1 = desert2 = null;
    });

    beforeEach(function () {
        map = new DG.Map(mapContainer, {
            center: start,
            'zoom': initZoom,
            'geoclicker': true,
            'zoomAnimation': false
        });
    });

    afterEach(function () {
        map.remove();
        map = null;
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
            map.setView(project1, maxZoom, {animate: false});

            expect(map.setView(desert1, maxZoom, {animate: false})).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to from desert1 to desert2', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.setView(desert2)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert2);
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
            map.setView(project1, 17);

            expect(map.setZoomAround(project2, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('zoom in the project', function () {
            map.setView(start, 13);

            expect(map.setZoomAround(project1, maxZoom)).to.be(map);
            expect(map.getBounds().contains(project1)).to.be.ok();
            expect(map.getZoom()).to.be(maxZoom);
        });
    });

    describe('#fitBounds', function () {

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 8);

            expect(map.fitBounds(new DG.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on project1 from project2 small zoom', function () {
            map.setView(project2, 8);

            expect(map.fitBounds(new DG.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on small square from project1 zero zoom', function () {
            map.setZoomAround(L.latLng(56.68037378950137, 89.4287109375), 4);

            expect(map.fitBounds([[54.98116931987221, 82.8987979888916], [54.97977172563573, 82.8981113433837]])).to.be(map);
            expect(map.getZoom()).to.be(18);
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

            expect(map.panTo(project1, {animate: false})).to.be(map);
            expect(map.getZoom()).to.be(15);
            expect(map.getCenter().distanceTo(project1)).to.be.below(15);
        });
    });

    describe('#panInsideBounds', function () {

        it('bound on project1 from project2', function () {
            map.setView(project2, 15);

            expect(map.panInsideBounds(new DG.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on project1 from desert', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.panInsideBounds(new DG.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 15);

            expect(map.panInsideBounds(new DG.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

    });

    describe('#panBy', function () {

        it('call with viewport size', function () {
            map.setView(project1, 16);

            expect(map.panBy([1901, 601]), {animate: false}).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.nearLatLng(DG.latLng(54.971628386497684, 442.8600454330445));
        });

        it('call on project viewport', function () {
            map.setView(project1, maxZoom);

            expect(map.panBy([100, -200], {animate: false})).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.nearLatLng(DG.latLng(54.97964243031826, 442.8198015689851));
        });

    });

    describe('#MaxZoom in options', function () {

        it('set less max project zoom and zoom to 20 in project', function () {
            map.options.maxZoom = 16;
            expect(map.getMaxZoom()).to.be.equal(16);

            map.setView(project1, 20);

            expect(map.getZoom()).to.be.equal(16);
        });

        it('set less max project zoom and zoom to 20 in desert', function () {
            map.options.maxZoom = 16;
            expect(map.getMaxZoom()).to.be.equal(16);

            map.setView(desert1, 20);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('set more max project zoom and zoom to 20 in project', function () {
            map.options.maxZoom = 19;
            expect(map.getMaxZoom()).to.be.equal(19);

            map.setView(project1, 20);

            expect(map.getZoom()).to.be.equal(19);
        });

        it('set more max project zoom and zoom to 20 in desert', function () {
            map.options.maxZoom = 19;
            expect(map.getMaxZoom()).to.be.equal(19);

            map.setView(desert1, 20);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('set max zoom, go to from project to desert and back to the project', function () {
            map.options.maxZoom = 16;
            expect(map.getMaxZoom()).to.be.equal(16);
            map.setView(project1, maxZoom, {animate: false});

            expect(map.setView(desert1, maxZoom, {animate: false})).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);

            expect(map.setView(project1, maxZoom, {animate: false})).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.be.equal(project1);
        });

    });

    describe('#multiLayers', function () {
        var cloudmade2;
        beforeEach(function () {
            function getCloudMadeUrl(styleId) {
                return 'http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/' + styleId + '/256/{z}/{x}/{y}.png';
            }
            cloudmade2 = DG.tileLayer(getCloudMadeUrl(998), {attribution: 'Hello world', minZoom: 5, maxZoom: 18}).addTo(map);
        });

        afterEach(function () {
            map.removeLayer(cloudmade2);
        });

        it('zoom to 18 in desert with added layer', function () {
            map.setView(desert1, maxZoom);

            expect(map.getZoom()).to.be.equal(maxZoom);
        });

        it('zoom to 18 in desert with remove layer', function () {
            map.removeLayer(cloudmade2);
            map.setView(desert1, maxZoom);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('zoom to 18 in desert with remove 2gis tilelayer', function () {
            map.removeLayer(map.baseLayer);
            map.setView(desert1, maxZoom);

            expect(map.getZoom()).to.be.equal(maxZoom);
        });
    });

    describe('#isProjectHere', function () {

        it('without params', function () {
            expect(map.projectDetector.isProjectHere()).to.not.be.ok();
        });

        it('in desert', function () {
            expect(map.projectDetector.isProjectHere(desert1)).to.not.be.ok();
        });

        it('in project', function () {
            expect(map.projectDetector.isProjectHere(project1)).to.have.property('latLngBounds');
            expect(map.projectDetector.isProjectHere(project1).code).to.be.eql('novosibirsk');
        });
    });

    describe('#should fire', function () {
        it('\'projectchange\' event', function (done) {
            var onProjectChange = function () {
                map.off('projectchange', onProjectChange);
                done();
            };
            map.on('projectchange', onProjectChange);
            map.setView(project2, maxZoom);
        });

        it('\'projectleave\' event', function (done) {
            var onProjectLeave = function () {
                map.off('projectleave', onProjectLeave);
                done();
            };
            map.on('projectleave', onProjectLeave);
            map.setView(desert1, maxZoom);
        });
    });
});
