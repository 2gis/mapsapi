describe('DG.Zoom', function() {
    var classZoomIn = 'dg-zoom__in',
        classZoomOut = 'dg-zoom__out',
        mapContainer,
        map,
        zoomControl,
        zoomContainer,
        zoomIn,
        zoomOut;

    before(function () {
        zoomControl = DG.control.zoom();
        mapContainer = document.createElement('div');
        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });
    });

    after(function() {
        map.remove();
        classZoomIn = classZoomOut = map = zoomControl = zoomContainer = zoomIn = zoomOut = null;
    });

    function checkInitControl() {
        before(function() {
            zoomContainer = mapContainer.getElementsByClassName('dg-zoom');
        });

        it('should only one zoom container', function() {
            expect(zoomContainer.length).to.be(1);
            zoomContainer = zoomContainer[0];
        });

        it('should zoom container init zoom in button', function() {
            zoomIn = zoomContainer.getElementsByClassName(classZoomIn);
            expect(zoomIn.length).to.be(1);
            zoomIn = zoomIn[0];
        });

        it('should zoom container init zoom out button', function() {
            zoomOut = zoomContainer.getElementsByClassName(classZoomOut);
            expect(zoomOut.length).to.be(1);
            zoomOut = zoomOut[0];
        });
    }

    describe('check auto init', checkInitControl);

    describe('#remove', function() {
        it('should remove zoom container', function() {
            map.zoomControl.remove();
            expect(mapContainer.getElementsByClassName('dg-zoom').length).to.be(0);
        });
    });

    describe('#addTo', function() {
        before(function() {
            zoomControl.addTo(map);
        });

        describe('check init', checkInitControl);

        describe('check clicks', function() {
            it('should map zoom in', function() {
                map.setZoom(15, {animate: false});
                happen.click(zoomIn);
                expect(map.getZoom()).to.be(16);
            });

            it('should map zoom out', function() {
                map.setZoom(15, {animate: false});
                happen.click(zoomOut);
                expect(map.getZoom()).to.be(14);
            });
        });

        describe('check enable/disable zoom controls', function() {
            it('should disable zoomIn button', function() {
                map.setZoom(map.getMaxZoom(), {animate: false});
                expect(zoomIn.className).contain('leaflet-disabled');
            });


            it('should enable zoomIn button', function() {
                map.zoomOut(1, {animate: false});
                expect(zoomIn.className).not.contain('leaflet-disabled');
            });

            it('should disable zoomOut button', function() {
                map.setZoom(map.getMinZoom(), {animate: false});
                expect(zoomOut.className).contain('leaflet-disabled');
            });

            it('should enable zoomOut button', function() {
                map.zoomIn(1, {animate: false});
                expect(zoomOut.className).not.contain('leaflet-disabled');
            });
        });

        describe('check several controls', function() {
            it.skip('should only one container for one zoom control', function() {
                map.addControl(zoomControl);
                expect(mapContainer.getElementsByClassName('dg-zoom').length).to.be(1);
            });

            it('should two containers for two zoom controls', function() {
                var zoomAnotherControl = DG.control.zoom();
                map.addControl(zoomAnotherControl);
                expect(mapContainer.getElementsByClassName('dg-zoom').length).to.be(2);
                zoomAnotherControl.remove();
            });
        });
    });
});
