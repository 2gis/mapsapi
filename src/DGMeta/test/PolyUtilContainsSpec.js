/*global describe:false, it:false, expect:false */

describe('Polygon', function () {

    var polygonPointSet = [
        new L.Point(54.97952237000778, 82.89766073226929),
        new L.Point(54.98081530831201, 82.89707064628601),
        new L.Point(54.980944599852364, 82.89730668067932),
        new L.Point(54.98121549506299, 82.89891600608826),
        new L.Point(54.98071372180964, 82.89812743663788),
        new L.Point(54.98069832989291, 82.89967775344849),
        new L.Point(54.97954084084813, 82.8976821899414)
    ],
    innerPoints = [
        new L.Point(54.98067985958506, 82.89960801601408),
        new L.Point(54.98059366470269, 82.89906620979309),
        new L.Point(54.98043974480962, 82.89858877658844),
        new L.Point(54.98023041280807, 82.89815425872803),
        new L.Point(54.98044590161669, 82.89755344390868),
        new L.Point(54.9806459973319, 82.8972852230072),
        new L.Point(54.98087379739374, 82.89828300476074),
        new L.Point(54.98009804053787, 82.89771437644957),
        new L.Point(54.97958393944262, 82.89766609668732),
        new L.Point(54.980141138534236, 82.89808988571167),
        new L.Point(54.98067370281387, 82.89959192276001),
        new L.Point(54.98089226761238, 82.89737641811371)
    ],
    outerPoints = [
        new L.Point(54.98049823443851, 82.89948463439941),
        new L.Point(54.981049264127705, 82.89756953716278),
        new L.Point(54.98056903755945, 82.89710283279419),
        new L.Point(54.980950756582004, 82.89888918399811),
        new L.Point(54.980113432684746, 82.89712429046631),
        new L.Point(54.98108004768617, 82.89791285991669),
        new L.Point(54.979744019531346, 82.90242433547974),
        new L.Point(54.980113432684746, 82.89015054702759),
        new L.Point(54.98220670968463, 82.89379835128784),
        new L.Point(54.981049264127705, 82.90077209472656)
    ];

    describe('#contains', function () {

        it('should return true if points are inside', function () {
            for (var i = 0; i < innerPoints.length; i++) {
                expect(DG.PolyUtil.contains(innerPoints[i], polygonPointSet)).to.be.equal(true);
            }
        });

        it('should return false if points are outside', function () {
            for (var i = 0; i < outerPoints.length; i++) {
                expect(DG.PolyUtil.contains(outerPoints[i], polygonPointSet)).to.be.equal(false);
            }
        });

    });

});
