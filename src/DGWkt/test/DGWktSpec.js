describe('DG.Wkt', function() {
    var wktExamples = [
        'POINT(82.918299581655 55.0414363815388)',
        'POLYGON((82.916999581655 55.0421363815388, 82.9175228440822 55.0401876099625, 82.9180633669606 55.0402351774059, 82.9175402952564 55.0421841282563,82.916999581655 55.0421363815388))',
        'LINESTRING (300 100, 100 300, 400 400)',
        'MULTIPOINT (1000 400, 1400 300, 1200 200, 1300 100)',
        'MULTILINESTRING ((600 100, 700 200, 600 400), (900 400, 800 300, 900 200, 800 100))',
        'MULTIPOLYGON (((1300 200, 1450 400, 1100 400, 1300 200)), ((1150 50, 1400 100, 1100 200, 1150 100, 1150 50)))',
        'GEOMETRYCOLLECTION(MULTIPOINT(100 60, 70 300), LINESTRING(100 60, 70 100, 70 300))'
    ];

    after(function() {
        wktExamples = null;
    });

    describe('check init', function() {
        it('should be DG.Wkt object', function() {
            expect(DG.Wkt).to.be.a('object');
        });
    });

    describe('#toGeoJSON', function() {
        wktExamples.forEach(function(el) {
            it(el.slice(0, el.indexOf('(')), function() {
                var val = DG.Wkt.toGeoJSON(el);

                // throw Error if not be ok
                DG.GeoJSON.geometryToLayer(val);
            });
        });
    });

    describe('#geoJsonLayer', function() {
        it('should return DG.GeoJSON', function() {
            expect(DG.Wkt.geoJsonLayer(wktExamples[1])).to.be.a(DG.GeoJSON);
        });
    });

    describe('#toLatLngs', function() {
        it('should equel example latLngs', function() {
            var latlngs = [
                    DG.latLng(55.0421363815388, 82.916999581655),
                    DG.latLng(55.0401876099625, 82.9175228440822),
                    DG.latLng(55.0402351774059, 82.9180633669606)
                ],
                example;

            example = 'POLYGON((';
            example += latlngs.map(function(el) {
                return el.lng + ' ' + el.lat;
            }).join(', ');
            example += '))';

            expect(DG.Wkt.toLatLngs(example)).to.eql(latlngs);
        });
    });

    describe('#toPoints', function() {
        it('should equel example points', function() {
            var points = [
                    [1, 2],
                    [5, 10],
                    [8, 7]
                ],
                example,
                res;

            example = 'POLYGON((';
            example += points.map(function(el) {
                return el.join(' ')
            }).join(', ');
            example += '))';

            res = DG.Wkt.toPoints(example);

            expect(res).to.be.a(Array);
            expect(res[0]).to.eql(points);
        });
    });

    describe('#pointsToLatLngOnMap', function() {
        var map;

        before(function() {
            map = new DG.Map(document.createElement('div'), {
                center: [55.017493, 82.819576],
                zoom: 15
            });
        });

        after(function() {
            map = null;
        });

        it('should return Array of DG.LatLng', function() {
            var example = 'POLYGON((1 2, 5 10, 8 7))',
                res;

            res = DG.Wkt.pointsToLatLngOnMap(example, map);

            expect(res).to.be.a(Array);
            expect(res[0]).to.be.a(Array);

            res[0].forEach(function(el) {
                expect(el).to.be.a(DG.LatLng);
            });
        });
    });
});
