describe('DG.Wkt#toLatLngs', function() {
    it('POINT (1 1)', function() {
        expect(DG.Wkt.toLatLngs('POINT (1 1)')).to.be.eql([
            {lat: 1, lng: 1}
        ]);
    });

    it('POINT(1 1)', function() {
        expect(DG.Wkt.toLatLngs('POINT(1 1)')).to.be.eql([
            {lat: 1, lng: 1}
        ]);
    });

    it('POINT\n\r(1 1))', function() {
        expect(DG.Wkt.toLatLngs('POINT\n\r(1 1)')).to.be.eql([
            {lat: 1, lng: 1}
        ]);
    });

    it('POINT(1.1 1.1)', function() {
        expect(DG.Wkt.toLatLngs('POINT(1.1 1.1)')).to.be.eql([
            {lat: 1.1, lng: 1.1}
        ]);
    });

    it('point(1.1 1.1)', function() {
        expect(DG.Wkt.toLatLngs('point(1.1 1.1)')).to.be.eql([
            {lat: 1.1, lng: 1.1}
        ]);
    });

    it('point(1 2 3)', function() {
        expect(DG.Wkt.toLatLngs('point(1 2 3)')).to.be.eql([{
            lng: 1,
            lat: 2,
            alt: 3
        }]);
    });

    it('[\'point(1 1)\', \'point(1.1 1.1)\']', function() {
        expect(DG.Wkt.toLatLngs(['point(1 1)', 'point(1.1 1.1)'])).to.be.eql([
            {lat: 1, lng: 1},
            {lat: 1.1, lng: 1.1}
        ]);
    });

    it('LINESTRING (30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toLatLngs('LINESTRING (30 10, 10 30, 40 40)')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 30},
            {lng: 40, lat: 40}
        ])
    });

    it('LINESTRING(30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toLatLngs('LINESTRING(30 10, 10 30, 40 40)')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 30},
            {lng: 40, lat: 40}
        ]);
    });

    it('LineString(30 10, 10 30, 40 40)', function() {
        expect(DG.Wkt.toLatLngs('LineString(30 10, 10 30, 40 40)')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 30},
            {lng: 40, lat: 40}
        ]);
    });

    it('LINESTRING (1 2 3, 4 5 6)', function() {
        expect(DG.Wkt.toLatLngs('LINESTRING (1 2 3, 4 5 6)')).to.be.eql([
            {lng: 1, lat: 2, alt: 3},
            {lng: 4, lat: 5, alt: 6}
        ]);
    });

    it('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))', function() {
        expect(DG.Wkt.toLatLngs('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 20},
            {lng: 20, lat: 40},
            {lng: 40, lat: 40},
            {lng: 30, lat: 10}
        ]);
    });

    it('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))', function() {
        expect(DG.Wkt.toLatLngs('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 20},
            {lng: 20, lat: 40},
            {lng: 40, lat: 40},
            {lng: 30, lat: 10}
        ]);
    });

    it('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))', function() {
        expect(DG.Wkt.toLatLngs('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))')).to.be.eql([
            {lng: 35, lat: 10},
            {lng: 10, lat: 20},
            {lng: 15, lat: 40},
            {lng: 45, lat: 45},
            {lng: 35, lat: 10},
            {lng: 20, lat: 30},
            {lng: 35, lat: 35},
            {lng: 30, lat: 20},
            {lng: 20, lat: 30}
        ]);
    });

    it('[\'POLYGON ((30 20, 10 40, 45 40, 30 20))\', \'POLYGON ((15 5, 40 10, 10 20, 5 10, 15 5))\']', function() {
        expect(DG.Wkt.toLatLngs(['POLYGON ((30 20, 10 40, 45 40, 30 20))', 'POLYGON ((15 5, 40 10, 10 20, 5 10, 15 5))'])).to.be.eql([
            {lng: 30, lat: 20},
            {lng: 10, lat: 40},
            {lng: 45, lat: 40},
            {lng: 30, lat: 20},

            {lng: 15, lat: 5},
            {lng: 40, lat: 10},
            {lng: 10, lat: 20},
            {lng: 5, lat: 10},
            {lng: 15, lat: 5}
        ]);
    });

    it('MULTIPOINT (1 1, 2 3)', function() {
        expect(DG.Wkt.toLatLngs('MULTIPOINT (1 1, 2 3)')).to.be.eql([
            {lng: 1, lat: 1},
            {lng: 2, lat: 3}
        ]);
    });

    it('MultiPoint (1 1, 2 3)', function() {
        expect(DG.Wkt.toLatLngs('MultiPoint (1 1, 2 3)')).to.be.eql([
            {lng: 1, lat: 1},
            {lng: 2, lat: 3}
        ]);
    });

    it('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))', function() {
        expect(DG.Wkt.toLatLngs('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))')).to.be.eql([
            {lng: 30, lat: 10},
            {lng: 10, lat: 30},
            {lng: 40, lat: 40},

            {lng: 30, lat: 10},
            {lng: 10, lat: 30},
            {lng: 40, lat: 40}
        ]);
    });

    it('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))', function() {
        expect(DG.Wkt.toLatLngs('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')).to.be.eql([
            {lng: 30, lat: 20},
            {lng: 10, lat: 40},
            {lng: 45, lat: 40},
            {lng: 30, lat: 20},

            {lng: 15, lat: 5},
            {lng: 40, lat: 10},
            {lng: 10, lat: 20},
            {lng: 5, lat: 10},
            {lng: 15, lat: 5}
        ]);
    });

    it('MULTIPOLYGON (((-74.03349399999999 40.688348)))', function() {
        expect(DG.Wkt.toLatLngs('MULTIPOLYGON (((-74.03349399999999 40.688348)))')).to.be.eql([
            {lng: -74.03349399999999, lat: 40.688348}
        ]);
    });

    it('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))', function() {
        expect(DG.Wkt.toLatLngs('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))')).to.be.eql([
            {lng: 30, lat: 20},
            {lng: 10, lat: 40},
            {lng: 45, lat: 40},
            {lng: 30, lat: 20},

            {lng: 15, lat: 5},
            {lng: 40, lat: 10},
            {lng: 10, lat: 20},
            {lng: 5, lat: 10},
            {lng: 15, lat: 5},

            {lng: 10, lat: 10},
            {lng: 15, lat: 10},
            {lng: 15, lat: 15},
            {lng: 10, lat: 10}
        ]);
    });
});
