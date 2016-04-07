describe('DG.Bezier', function () {
    var s = DG.point(1, 0), e = DG.point(7, 0),
        cp1 = DG.point(3, 1), cp2 = DG.point(5, -1);

    var bc;

    beforeEach(function () {
        bc = new DG.Bezier([s, cp1, cp2, e]);
    });

    after(function () {
        bc = s = e = cp1 = cp2 = null;
    });

    describe('#getPoint', function () {
        it('should return correct curve\'s point coordinates at specific (t) value', function () {
            expect(bc.getPoint(0.50)).to.be.eql({x: 4, y: 0});
            expect(bc.getPoint(0.25)).to.be.eql({x: 2.5, y: 0.28125});
            expect(bc.getPoint(0.75)).to.be.eql({x: 5.5, y: -0.28125});
        });
    });

    describe('#getLength', function () {
        it('should return correct (approximated) curve\'s length', function () {
            expect(bc.getLength()).to.be.within(6.1462605, 6.1462615);
        });
    });

    describe('#getCurveBefore', function () {
        it('should return new curve as a (beginning) part of original', function () {
            expect(bc.getCurveBefore(0.25).points)
                .to.be.eql([{x: 1, y: 0}, {x: 1.5, y: 0.25}, {x: 2, y: 0.3125}, {x: 2.5, y: 0.28125}]);
        });
    });

    describe('#getCurveAfter', function () {
        it('should return new curve as a (ending) part of original', function () {
            expect(bc.getCurveAfter(0.25).points)
                .to.be.eql([{x: 2.5, y: 0.28125}, {x: 4, y: 0.1875}, {x: 5.5, y: -0.75}, {x: 7, y: 0}]);
        });
    });
});


describe('DG.TimeBezier', function () {
    var cp1 = DG.point(0.42, 0.0);
    var cp2 = DG.point(0.58, 1.0);

    it('should return correct distance (Y) by time (X) value', function () {
        expect(new DG.TimeBezier(cp1, cp2).getYbyX(0.37)).to.be.within(0.2851635, 0.2851640);
    });
});


describe('DG.ArcBezier', function () {
    var s = DG.point(1, 0), e = DG.point(7, 0),
        cp1 = DG.point(3, 1), cp2 = DG.point(5, -1);

    var bc = new DG.ArcBezier([s, cp1, cp2, e]);

    after(function () {
        bc = null;
    });

    it('should return correct (t) value by curve\'s segment length', function () {
        expect(bc.getTbyL(3)).to.be.within(0.485, 0.490);
    });

    it('should return correct (t) value by curve\'s segment length', function () {
        expect(bc.getLength()).to.be.within(6.1461, 6.1463);
    });
});
