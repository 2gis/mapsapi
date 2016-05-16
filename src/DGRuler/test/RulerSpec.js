describe('DG.Ruler', function () {

    var map,
        ruler,
        mRuler = [[54.98876904122557, 82.901930809021], [54.988842907519285, 82.89030075073241]],
        kmRuler = [[54.9798794714156, 82.89888381958008], [54.9788204717771, 82.89695262908936],
                   [54.98273616833678, 82.88879871368408], [54.98194813431667, 82.87236213684082]],
        originalLatLngs = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];

    after(function() {
        mRuler = kmRuler = originalLatLngs = null;
    });

    beforeEach(function () {
        map = new DG.Map(document.createElement('div'), {
            center: new DG.LatLng(51.7302800, 36.1938900),
            zoom: 17
        });
        ruler = DG.ruler();
        map.addLayer(ruler);
    });

    afterEach(function () {
        map && map.remove();
        ruler = map = null;
    });

    describe("#setLatLngs", function () {
        it("doesn't overwrite the given latlng array", function () {
            var sourceLatLngs = originalLatLngs.slice();

            ruler.setLatLngs(originalLatLngs);
            expect(sourceLatLngs).to.eql(originalLatLngs);
            expect(ruler._points).to.not.eql(sourceLatLngs);
        });
        it("chains ruler instance", function () {
            expect(ruler.setLatLngs(originalLatLngs)).to.be.a(DG.Ruler);
        });
    });

    describe("#getLatLngs", function () {
        it("should return empty array", function () {
            expect(ruler.getLatLngs()).to.eql([]);
        });
        it("should return latLngs array", function () {
            ruler.setLatLngs(originalLatLngs);
            expect(ruler.getLatLngs()).to.eql([DG.latLng([1, 2]), DG.latLng([3, 4]), DG.latLng([5, 6])]);
        });
    });

    describe("#addLatLng", function () {
        it("doesn't overwrite the given latlng", function () {
            var a = [5, 6],
                b = [5, 6];

            ruler.setLatLngs(originalLatLngs);
            ruler.addLatLng(a);
            expect(a).to.eql(b);
        });
        it("adds the given latlng to ruler", function () {
            ruler.setLatLngs(originalLatLngs);
            ruler.addLatLng([7, 8]);
            expect(ruler.getLatLngs()).to.eql([DG.latLng([1, 2]), DG.latLng([3, 4]), DG.latLng([5, 6]), DG.latLng([7, 8])]);
        });
        it("chains ruler instance", function () {
            expect(ruler.addLatLng(originalLatLngs[0])).to.be.a(DG.Ruler);
        });
    });

    describe("#spliceLatLngs", function () {
        it("returns removed latLngs", function () {
            ruler.setLatLngs(originalLatLngs);
            expect(ruler.spliceLatLngs(1, 1, [7, 8])).to.eql([DG.latLng([3, 4])]);
        });
        it("inserts the latLngs", function () {
            ruler.setLatLngs(originalLatLngs);
            ruler.spliceLatLngs(1, 1, [7, 8]);
            expect(ruler.getLatLngs()).to.eql([DG.latLng([1, 2]), DG.latLng([7, 8]), DG.latLng([5, 6])]);
        });
    });

    describe('#getTotalDistance', function () {
        it('meters', function () {
            mRuler.forEach(function (ll) {
                ruler.addLatLng(ll);
            });
            // it makes no sense to check with higher accuracy than 1 cm.
            var roundedDistance = Math.round(ruler.getTotalDistance() * 100) / 100;
            expect(roundedDistance).to.eql(742);
            expect(ruler._getFormatedDistance()).to.eql('742 м');
        });
        it('km', function () {
            kmRuler.forEach(function (ll) {
                ruler.addLatLng(ll);
            });
            // it makes no sense to check with higher accuracy than 1 cm.
            var roundedDistance = Math.round(ruler.getTotalDistance() * 100) / 100;
            expect(roundedDistance).to.eql(1901.31);
            expect(ruler._getFormatedDistance()).to.eql('1,90 км');
        });
    });

});
