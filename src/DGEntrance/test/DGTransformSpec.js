describe('DG.VertexTransform', function () {
    var a030 = Math.PI / 6,
        a045 = Math.PI / 4,
        a120 = Math.PI * 2 / 3,
        a210 = Math.PI * 7 / 6,

        p1 = DG.point(0, 0),
        p2 = DG.point(1, 0),
        p3 = DG.point(Math.cos(a030), Math.sin(a030)),
        p4 = DG.point(-Math.cos(a030), -Math.sin(a030)),
        p5 = DG.point(3, -4),
        p6 = DG.point(12.3, 45.6),

        DGVT = DG.VertexTransform, vt,
        EPSILON = 0.000000000000001;

    beforeEach(function () {
        vt = new DG.VertexTransform([p1, p2, p3, p4, p5, p6]);
    });

    after(function () {
        vt = p1 = p2 = p3 = p4 = p5 = p6 = null;
    });

    it('should contain chaining methods', function () {
        expect(vt.load().save().setScale(1).setAngle({cos: 1, sin: 0}).setTranslation({x: 0, y: 0}).setMatrix([1, 0, 0, 0, 1, 0])
            .scale().unScale().rotate().unRotate().translate().unTranslate().transform().vertices).to.be.an('array');
    });

    describe('statics', function () {
        it('should return array objects with working \'.clone()\' method', function () {
            expect(DGVT.scale(vt).clone().vertices).to.be.eql(vt.vertices);
            expect(DGVT.unScale(vt).clone().vertices).to.be.eql(vt.vertices);
            expect(DGVT.rotate(vt).clone().vertices).to.be.eql(vt.vertices);
            expect(DGVT.unRotate(vt).clone().vertices).to.be.eql(vt.vertices);
            expect(DGVT.translate(vt).clone().vertices).to.be.eql(vt.vertices);
            expect(DGVT.unTranslate(vt).clone().vertices).to.be.eql(vt.vertices);
        });

        describe('cloned objects', function () {
            it('should be distinct from original objects', function () {
                expect(DGVT.scale(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
                expect(DGVT.unScale(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
                expect(DGVT.rotate(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
                expect(DGVT.unRotate(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
                expect(DGVT.translate(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
                expect(DGVT.unTranslate(vt).clone().vertices[0]).not.to.be(vt._vertices[0]);
            });
        });
    });

    describe('#getLength', function () {
        it('should return correct length value in (vertex) case', function () {
            var pc = p5.clone();
            expect(DGVT.getLength(pc.x, pc.y)).to.be.equal(5);
        });

        it('should return correct length value in (vertex, vertex) case', function () {
            expect(DGVT.getLength(DG.point(10, -5), DG.point(13, -1))).to.be.equal(5);
        });
    });

    describe('#getScaled', function () {
        it('should return correct scaled vector in (vertex) case', function () {
            expect(DGVT.getScaled(p5.x, p5.y, 2)).to.be.eql({x: 6, y: -8});
        });

        it('should return correct scaled vector in (vertex, vertex) case', function () {
            expect(DGVT.getScaled(DG.point(10, -5), DG.point(13, -1), 0.5)).to.be.eql({x: 11.5, y: -3});
        });
    });

    describe('#getAngle', function () {
        it('should return correct angle in (vertex) case', function () {
            expect(DGVT.getAngle(p3.x, p3.y)).to.be.eql({cos: p3.x, sin: p3.y});
            expect(DGVT.getAngle(p5.x, p5.y)).to.be.eql({cos: 0.6, sin: -0.8});
        });

        it('should return correct angle in (vertex, vertex) case', function () {
            expect(DGVT.getAngle(p3.clone(), p2.clone(), p1.clone())).to.be.eql({cos: p3.x, sin: -p3.y});

            var angle = 4.048560303417995,
                cos = Math.cos(angle),
                sin = Math.sin(angle);

            angle = DGVT.getAngle(p6.clone(), p5.clone(), p1.clone());
            expect(Math.abs(angle.cos - cos) < EPSILON).to.be.ok();
            expect(Math.abs(angle.sin - sin) < EPSILON).to.be.ok();
        });
    });

    describe('#getAngles(Sum/Dif)', function () {
        it('should return correct angle', function () {
            var cos045 = Math.cos(a045),
                sin045 = Math.sin(a045),
                cos210 = Math.cos(a210),
                sin210 = Math.sin(a210),
                angle, cos, sin;

            angle = a045 + a210;
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            angle = DGVT.getAnglesSum({cos: cos045, sin: sin045}, {cos: cos210, sin: sin210});
            expect(Math.abs(angle.cos - cos) < EPSILON).to.be.ok();
            expect(Math.abs(angle.sin - sin) < EPSILON).to.be.ok();

            angle = a045 - a210;
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            angle = DGVT.getAnglesDif({cos: cos045, sin: sin045}, {cos: cos210, sin: sin210});
            expect(Math.abs(angle.cos - cos) < EPSILON).to.be.ok();
            expect(Math.abs(angle.sin - sin) < EPSILON).to.be.ok();
        });
    });


    describe('prototype', function () {
        describe('#scale', function () {
            it('should return correctly scaled vertices', function () {
                expect(vt.scale(2).save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: p.x * 2, y: p.y * 2};
                    }));

                expect(vt.setScale(0.25).scale().save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: p.x / 2, y: p.y / 2};
                    }));

                expect(vt.unScale(0.5).save()._vertices).to.be.eql([p1, p2, p3, p4, p5, p6]);
            });
        });

        describe('#rotate', function () {
            it('should return correctly rotated vertices', function () {
                var cos = Math.cos(a120), sin = Math.sin(a120);

                expect(vt.rotate({cos: cos, sin: sin}).save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos};
                    }));

                expect(vt.setAngle({cos: 0, sin: 1}).rotate().save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: -(p.x * sin + p.y * cos), y: p.x * cos - p.y * sin};
                    }));

                cos = Math.cos(a210); sin = Math.sin(a210);
                vt.unRotate({cos: cos, sin: sin});
                [p1, p2, p3, p4, p5, p6].forEach(function (p, i, a) {
                    expect(Math.abs(a[i].x - vt.vertices[i].x) < EPSILON * 10).to.be.ok();
                    expect(Math.abs(a[i].y - vt.vertices[i].y) < EPSILON * 10).to.be.ok();
                });
            });
        });

        describe('#translate', function () {
            it('should return correctly translated vertices', function () {
                expect(vt.translate(p5.clone()).save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: p.x + p5.x, y: p.y + p5.y};
                    }));

                expect(vt.setTranslation(DG.point(9.3, 49.6)).translate().save()._vertices).to.be
                    .eql([p1, p2, p3, p4, p5, p6].map(function (p) {
                        return {x: p.x + p6.x, y: p.y + p6.y};
                    }));

                vt.unTranslate(p6.clone());
                [p1, p2, p3, p4, p5, p6].forEach(function (p, i, a) {
                    expect(Math.abs(a[i].x - vt.vertices[i].x) < EPSILON).to.be.ok();
                    expect(Math.abs(a[i].y - vt.vertices[i].y) < EPSILON).to.be.ok();
                });
            });
        });
    });
});
