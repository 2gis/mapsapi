/*global describe:false, it:false, expect:false, sinon:false */

describe('DG.FullScreen', function () {
    var map = new DG.Map(mapContainer, {
        center: [54.98117239821992, 82.88922250270844],
        'zoom': 17,
        'geoclicker': true,
        'zoomAnimation': false,
        'fullscreenControl': false
    });

    describe('#should fire', function () {

        it('events', function () {
            var enterFS = sinon.spy(),
                exitFS = sinon.spy(),
                fs = new DG.Control.Fullscreen();
            fs.addTo(map);
            fs.toggleFullscreen();
            fs.toggleFullscreen();

            map.on('requestfullscreen', enterFS);
            map.on('cancelfullscreen', exitFS);
            expect(enterFS.calledOnce).to.be.ok();
            expect(exitFS.calledOnce).to.be.ok();
        });
    });
});
