/*global describe:false, it:false, expect:false, sinon:false */
describe.skip('DG.FullScreen', function () {
    var mapContainer, map, classControl, container, spy;

    before(function() {
        mapContainer = document.createElement('div');

        document.body.appendChild(mapContainer);

        map = new DG.Map(mapContainer, {
            center: [54.98117239821992, 82.88922250270844],
            'zoom': 17,
            'geoclicker': true,
            'zoomAnimation': false
        });

        classControl = 'dg-control-round__icon_name_fullscreen';
    });

    after(function() {
        map.remove();
        document.body.removeChild(mapContainer);
        mapContainer = map = classControl = container = spy = null;
    });

    describe('check init', function() {
        it('should be one container on map', function() {
            container = mapContainer.getElementsByClassName(classControl);
            expect(container.length).to.be(1);
            container = container[0];
        });

        it('should be DG.control.fullscreen', function() {
            expect(DG.control.fullscreen).to.be.ok();
        });
    });

    describe('enable fullscreen', function() {
        before(function() {
            spy = sinon.spy();
            map.on('requestfullscreen', spy);

            happen.click(container);
        });

        after(function() {
            map.off('requestfullscreen', spy);
            spy = null;
        });

        it('should fire request event', function() {
            expect(spy.calledOnce).to.be.ok();
        });

        // phantom hasn't fullscreen
        if (DG.screenfull.api['fullscreenElement']) {
            it('should enable fullscreen', function () {
                expect(document[DG.screenfull.api['fullscreenElement']]).to.be(null);
            });
        }

        it('should container has active class', function() {
            expect(container.className).to.contain('active');
        });
    });

    describe('enable fullscreen', function() {
        before(function() {
            spy = sinon.spy();
            map.on('cancelfullscreen', spy);

            happen.click(container);
        });

        after(function() {
            map.off('cancelfullscreen', spy);
            spy = null;
        });

        it('should fire cancel event', function() {
            expect(spy.calledOnce).to.be.ok();
        });

        // phantom hasn't fullscreen
        if (DG.screenfull.api['fullscreenElement']) {
            it('should disable fullscreen', function() {
                expect(document[DG.screenfull.api['fullscreenElement']]).to.be(null);
            });
        }

        it('should container hasn\'t active class', function() {
            expect(container.className).not.to.contain('active');
        });
    });
});
