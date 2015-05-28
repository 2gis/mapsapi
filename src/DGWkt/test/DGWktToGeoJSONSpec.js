describe('DG.Wkt#toLatlngs', function() {
    // test cases took from https://github.com/mapbox/wellknown

    it('POINT (1 1)', function() {
        expect(DG.Wkt.toGeoJSON('POINT (1 1)')).to.be.eql({
            type: 'Point',
            coordinates: [1, 1]
        });
    });

    it('POINT(1 1)', function() {
        expect(DG.Wkt.toGeoJSON('POINT(1 1)')).to.be.eql({
            type: 'Point',
            coordinates: [1, 1]
        });
    });

    it('POINT\n\r(1 1))', function() {
        expect(DG.Wkt.toGeoJSON('POINT\n\r(1 1)')).to.be.eql({
            type: 'Point',
            coordinates: [1, 1]
        });
    });

    it('POINT(1.1 1.1)', function() {
        expect(DG.Wkt.toGeoJSON('POINT(1.1 1.1)')).to.be.eql({
            type: 'Point',
            coordinates: [1.1, 1.1]
        });
    });

    it('point(1.1 1.1)', function() {
        expect(DG.Wkt.toGeoJSON('point(1.1 1.1)')).to.be.eql({
            type: 'Point',
            coordinates: [1.1, 1.1]
        });
    });

    it('point(1 2 3)', function() {
        expect(DG.Wkt.toGeoJSON('point(1 2 3)')).to.be.eql({
            type: 'Point',
            coordinates: [1, 2, 3]
        });
    });

    it('LINESTRING (30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toGeoJSON('LINESTRING (30 10, 10 30, 40 40)')).to.be.eql({
            type: 'LineString',
            coordinates: [[30, 10], [10, 30], [40, 40]]
        });
    });

    it('LINESTRING(30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toGeoJSON('LINESTRING(30 10, 10 30, 40 40)')).to.be.eql({
            type: 'LineString',
            coordinates: [[30, 10], [10, 30], [40, 40]]
        });
    });

    it('LineString(30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toGeoJSON('LineString(30 10, 10 30, 40 40)')).to.be.eql({
            type: 'LineString',
            coordinates: [[30, 10], [10, 30], [40, 40]]
        });
    });

    it('LINESTRING (1 2 3, 4 5 6)', function() {
        expect(DG.Wkt.toGeoJSON('LINESTRING (1 2 3, 4 5 6)')).to.be.eql({
            type: 'LineString',
            coordinates: [[1, 2, 3], [4, 5, 6]]
        });
    });

    it('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))', function() {
        expect(DG.Wkt.toGeoJSON('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.be.eql({
            type: 'Polygon',
            coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
        });
    });

    it('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))', function() {
        expect(DG.Wkt.toGeoJSON('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))')).to.be.eql({
            type: 'Polygon',
            coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
        });
    });

    it('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))', function() {
        expect(DG.Wkt.toGeoJSON('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))')).to.be.eql({
            type: 'Polygon',
            coordinates:
                [
                    [
                        [ 35, 10 ],
                        [ 10, 20 ],
                        [ 15, 40 ],
                        [ 45, 45 ],
                        [ 35, 10 ]
                    ], [
                    [ 20, 30 ],
                    [ 35, 35 ],
                    [ 30, 20 ],
                    [ 20, 30 ]
                ]
                ]
        });
    });

    it('MULTIPOINT (1 1, 2 3)', function() {
        expect(DG.Wkt.toGeoJSON('MULTIPOINT (1 1, 2 3)')).to.be.eql({
            type: 'MultiPoint',
            coordinates: [[1, 1], [2, 3]]
        });
    });

    it('MultiPoint (1 1, 2 3)', function() {
        expect(DG.Wkt.toGeoJSON('MultiPoint (1 1, 2 3)')).to.be.eql({
            type: 'MultiPoint',
            coordinates: [[1, 1], [2, 3]]
        });
    });

    it('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))', function() {
        expect(DG.Wkt.toGeoJSON('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))')).to.be.eql({
            type: 'MultiLineString',
            coordinates: [
                [[30, 10], [10, 30], [40, 40]],
                [[30, 10], [10, 30], [40, 40]]]
        });
    });

    it('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))', function() {
        expect(DG.Wkt.toGeoJSON('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')).to.be.eql({
            type: 'MultiPolygon',
            coordinates: [
                [[[30, 20], [10, 40], [45, 40], [30, 20]]],
                [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]]
        });
    });

    it('MULTIPOLYGON (((-74.03349399999999 40.688348)))', function() {
        expect(DG.Wkt.toGeoJSON('MULTIPOLYGON (((-74.03349399999999 40.688348)))')).to.be.eql(
            {"type":"MultiPolygon","coordinates":[[[[-74.03349399999999,40.688348]]]]}
        );
    });

    it('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))', function() {
        expect(DG.Wkt.toGeoJSON('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))')).to.be.eql({
            type: 'MultiPolygon',
            coordinates: [
                [[[30, 20], [10, 40], [45, 40], [30, 20]]],
                [
                    [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]],
                    [[10, 10], [15, 10], [15, 15], [10, 10]]]]
        });
    });
});
