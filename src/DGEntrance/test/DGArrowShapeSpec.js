describe('DG.Entrance.Arrow.SHAPE', function () {
    var dgArrowShape = DG.Entrance.Arrow.SHAPE;

    after(function () {
        dgArrowShape = null;
    });

    it('should be an object', function () {
        expect(dgArrowShape).to.be.an('object');
    });

    it('should contain paired \'vertices\' and \'drawings\' objects', function () {
        var v = Object.keys(dgArrowShape.vertices);
        var d = Object.keys(dgArrowShape.drawings);

        expect(v.length).to.be.equal(d.length);
        expect(v).to.be.eql(d);
    });

    it('should contain paired \'vertices\' and \'drawings\' elements', function () {
        var vertices = dgArrowShape.vertices;
        var drawings = dgArrowShape.drawings;
        var k = Object.keys(drawings);

        for (var i = 0; i < k.length; i++) {
            var d = drawings[k[i]];
            for (var len = 0, j = 0; j < d.length; j++) {
                switch(d[j]) {
                    case 'C':
                    case 'c': len += 3; break;
                    case 'Q':
                    case 'q': len += 2; break;

                    default:  len += 1;
                }
            }
            expect(len).to.be.equal(vertices[k[i]].length);
        }
    });

    it('should contain instances of \'DG.Point\' objects in \'vertices\' arrays', function () {
        var vertices = dgArrowShape.vertices;
        var k = Object.keys(vertices);

        for (var i = 0; i < k.length; i++) {
            var v = vertices[k[i]];
            for (var j = 0; j < v.length; j++) {
                expect(v[j]).to.be.an(DG.Point);
            }
        }
    });
});
