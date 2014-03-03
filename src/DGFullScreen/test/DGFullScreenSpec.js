/*global describe:false, it:false, expect:false, sinon:false */
describe('DG.FullScreen', function () {
    var mapContainer = document.createElement('div'),
        map = new DG.Map(mapContainer, {
            center: [54.98117239821992, 82.88922250270844],
            'zoom': 17,
            'geoclicker': true,
            'zoomAnimation': false
        });

    describe('#should fire', function () {

        it('events', function () {
            var enterFS = sinon.spy(),
                exitFS = sinon.spy();

            map.fullscreenControl._toggleFullscreen();
            map.fullscreenControl._toggleFullscreen();

            map.on('requestfullscreen', enterFS);
            map.on('cancelfullscreen', exitFS);
            expect(enterFS.calledOnce).to.be.ok();
            expect(exitFS.calledOnce).to.be.ok();
        });
    });
});
