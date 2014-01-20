describe('DG.Ruler', function () {

    var map,
        mapContainer = document.createElement('div'),
        mRuler = [[54.98876904122557, 82.901930809021], [54.988842907519285, 82.89030075073241]],
        kmRuler = [[54.9798794714156, 82.89888381958008], [54.9788204717771, 82.89695262908936],
                   [54.98273616833678, 82.88879871368408], [54.98194813431667, 82.87236213684082]];

    beforeEach(function () {
        map = new L.Map(mapContainer, {
            'center': new L.LatLng(69.349552990994837, 87.75222519148015),
            'zoom': 17,
            'rulerControl': true
        });
    });

    afterEach(function () {
        map && map.remove();
        map = null;
    });

    describe("#setLang", function () {
        it("doesn't overwrite the given latlng array", function () {
            var originalLatLngs = [
                [1, 2],
                [3, 4]
            ];
            var sourceLatLngs = originalLatLngs.slice();

            var ruler = new L.Ruler();
            ruler.setLatLngs(originalLatLngs);

            expect(sourceLatLngs).to.eql(originalLatLngs);
            expect(ruler._points).to.not.eql(sourceLatLngs);
        });
    });

    // describe("#setLatLngs", function () {
    //     it("doesn't overwrite the given latlng array", function () {
    //         var originalLatLngs = [
    //             [1, 2],
    //             [3, 4]
    //         ];
    //         var sourceLatLngs = originalLatLngs.slice();

    //         var polyline = new L.Polyline(sourceLatLngs);

    //         polyline.setLatLngs(sourceLatLngs);

    //         expect(sourceLatLngs).to.eql(originalLatLngs);
    //     });
    // });

    // describe("#spliceLatLngs", function () {
    //     it("splices the internal latLngs", function () {
    //         var latLngs = [
    //             [1, 2],
    //             [3, 4],
    //             [5, 6]
    //         ];

    //         var polyline = new L.Polyline(latLngs);

    //         polyline.spliceLatLngs(1, 1, [7, 8]);

    //         expect(polyline._latlngs).to.eql([L.latLng([1, 2]), L.latLng([7, 8]), L.latLng([5, 6])]);
    //     });
    // });
});

// describe('L.DG.Entrance', function () {
//     var map,
//         mapContainer = document.createElement('div'),
//         mRuler = [{lat: 54.98876904122557, lng: 82.901930809021}, {lat: 54.988842907519285, lng: 82.89030075073241}],
//         kmRuler = [{lat: 54.9798794714156, lng: 82.89888381958008}, {lat: 54.9788204717771, lng: 82.89695262908936},
//                    {lat: 54.98273616833678, lng: 82.88879871368408}, {lat: 54.98194813431667, lng: 82.87236213684082}];

//     beforeEach(function () {
//         map = new L.Map(mapContainer, {
//             'center': new L.LatLng(69.349552990994837, 87.75222519148015),
//             'zoom': 17,
//             'rulerControl': true
//         });
//     });

//     describe('#startDrawing/#finishDrawing', function () {
//         it('should enable/disable ruler control', function () {
//             expect(map.rulerControl._drawingHelper._firstPoint).to.eql(null);

//             //enable ruler
//             map.rulerControl._drawingHelper.startDrawing();
//             //measure some distance
//             kmRuler.forEach(function (ll) {
//                 map.rulerControl._drawingHelper._addPoint({latlng: ll});
//             });

//             expect(map.rulerControl._drawingHelper._firstPoint).not.to.equal(null);

//             map.rulerControl._drawingHelper.finishDrawing();
//             expect(map.rulerControl._drawingHelper._firstPoint).to.eql(null);
//         });
//     });

//     describe('#_deleteFirstPoint', function () {
//         it('should remove first point', function () {
//             var firstP, newFirstP,
//             stop = sinon.stub(L.DomEvent, 'stop', function () {});

//             //enable ruler
//             map.rulerControl._drawingHelper.startDrawing();
//             //measure some distance
//             kmRuler.forEach(function (ll) {
//                 map.rulerControl._drawingHelper._addPoint({latlng: ll});
//             });

//             firstP = map.rulerControl._drawingHelper._firstPoint._latlng;
//             map.rulerControl._drawingHelper._deleteFirstPoint();
//             newFirstP = map.rulerControl._drawingHelper._firstPoint._latlng;

//             expect({lat: firstP.lat, lng: firstP.lng}).to.eql({lat: 54.9798794714156, lng: 82.89888381958008});
//             expect({lat: newFirstP.lat, lng: newFirstP.lng}).to.eql({lat: 54.9788204717771, lng: 82.89695262908936});
//         });
//     });

//     describe('should return distance in appropriate units, ', function () {
//         it('meters', function () {
//             var dist;
//             //enable ruler
//             map.rulerControl._drawingHelper.startDrawing();

//             //measure some distance
//             mRuler.forEach(function (ll) {
//                 map.rulerControl._drawingHelper._addPoint({latlng: ll});
//             });

//             dist = map.rulerControl._drawingHelper._calcDistance();
//             expect(dist).to.eql('743 м');
//         });

//         it('km', function () {
//             var dist;
//             //enable ruler
//             map.rulerControl._drawingHelper.startDrawing();

//             //measure some distance
//             kmRuler.forEach(function (ll) {
//                 map.rulerControl._drawingHelper._addPoint({latlng: ll});
//             });

//             dist = map.rulerControl._drawingHelper._calcDistance();
//             expect(dist).to.eql('1,90 км');
//         });
//     });

//     describe('should contain appropriate', function () {
//         it('lang strings', function () {
//             //enable ruler
//             map.rulerControl._drawingHelper.startDrawing();

//             //measure some distance
//             kmRuler.forEach(function (ll) {
//                 map.rulerControl._drawingHelper._addPoint({latlng: ll});
//             });

//             expect(map.rulerControl._drawingHelper._calcDistance()).to.eql('1,90 км');
//             map.setLang('en');
//             expect(map.rulerControl._drawingHelper._calcDistance()).to.eql('1,90 km');
//         });
//     });
// });
