describe('DG.Wkt', function() {
    describe('check init', function() {
        it('should be DG.Wkt object', function() {
            expect(DG.Wkt).to.be.a('object');
        });
    });

    describe('#geoJsonLayer', function() {
        it('should return DG.GeoJSON', function() {
            expect(DG.Wkt.geoJsonLayer('POLYGON((82.916999581655 55.0421363815388, 82.9175228440822 55.0401876099625, 82.9180633669606 55.0402351774059, 82.9175402952564 55.0421841282563,82.916999581655 55.0421363815388))'))
                .to.be.a(DG.GeoJSON);
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
