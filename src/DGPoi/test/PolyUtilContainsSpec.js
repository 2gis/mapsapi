describe('Polygon', function() {

    // transformed from latlng by map.latLngToLayerPoint() method
    var polygonPointSet = [
        new L.Point(650, 209),
        new L.Point(624, 260),
        new L.Point(595, 153),
        new L.Point(740, 153),
        new L.Point(679, 306),
        new L.Point(796, 306),
        new L.Point(796, 331)
    ],
    innerPoints = [
        new L.Point(600, 159),
        new L.Point(636, 167),
        new L.Point(677, 174),
        new L.Point(723, 163),
        new L.Point(692, 219),
        new L.Point(625, 243),
        new L.Point(699, 239),
        new L.Point(703, 263),
        new L.Point(688, 300),
        new L.Point(745, 298),
        new L.Point(780, 314),
        new L.Point(791, 314),
        new L.Point(790, 323)
    ],
    outerPoints = [
        new L.Point(591, 159),
        new L.Point(618, 259),
        new L.Point(653, 220),
        new L.Point(690, 254),
        new L.Point(674, 313),
        new L.Point(762, 315),
        new L.Point(801, 343),
        new L.Point(854, 327),
        new L.Point(825, 295),
        new L.Point(768, 296),
        new L.Point(713, 251),
        new L.Point(744, 167),
        new L.Point(666, 145)
    ];

    beforeEach(function() {
    });

    afterEach(function() {
    });

    describe("#contains", function() {

        it('should return true if points are inside', function () {
            for (var i = 0; i < innerPoints.length; i++) {
                expect(L.PolyUtil.contains(innerPoints[i], polygonPointSet)).to.be.equal(true);
            }
        });

        it('should return false if points are outside', function () {
            for (var i = 0; i < outerPoints.length; i++) {
                expect(L.PolyUtil.contains(outerPoints[i], polygonPointSet)).to.be.equal(false);
            }
        });

    });

});