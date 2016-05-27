describe('DG.Metric', function () {
    var dgMetric = DG.Metric;

    it('should be a function object', function () {
        expect(dgMetric).to.be.a('function');
    });

    describe('DG.Metric.Segments', function () {
        var dgMetricSegments;

        beforeEach(function () {
            dgMetricSegments = new dgMetric.Segments();
        });
        
        after(function () {
            dgMetricSegments = null;
        });

        describe('#push', function () {
            it('should return \'DG.Metric.Segments\' instance', function () {
                expect(dgMetricSegments.push(0)).to.be.a(DG.Metric.Segments);
            });

            it('should update .length counter', function () {
                expect(dgMetricSegments.push(0).push(1).push(2).length).to.be.equal(3);
            });
        });

        describe('#getLength', function () {
            it('should return correct total segments length in case of [0]', function () {
                expect(dgMetricSegments.push(0).getLength()).to.be.equal(0);
            });

            it('should return correct total segments length in case of [0, 1, 2]', function () {
                expect(dgMetricSegments.push(2).push(1).push(0).getLength()).to.be.equal(3);
            });
        });

        describe('#getReverse', function () {
            it('should return new instance of \'DG.Metric.Segments\'', function () {
                var segments = dgMetricSegments.getReverse();
                expect(segments).to.be.a(DG.Metric.Segments);
                expect(segments).not.equal(dgMetricSegments);
            });

            it('should return correct total segments length', function () {
                expect(dgMetricSegments.push(2).push(3).push(5).getReverse().getLength()).to.be.equal(10);
            });

            it('should map to correct segment lengths', function () {
                expect(dgMetricSegments.push(2).push(3).push(5).getReverse())
                    .to.be.eql({'0': 5, '1': 8, '2': 10, length: 3});
            });
        });

        describe('#getIndex', function () {
            it('should return correct index value in case of []', function () {
                expect(dgMetricSegments.getIndex(5)).to.be.equal(-1);
            });

            it('should return correct index value in case of [1, 2, 3]', function () {
                expect(dgMetricSegments.push(1).push(2).push(3).getIndex(2)).to.be.equal(1);
            });

            it('should return correct index value in case of [3, 2, 1]', function () {
                expect(dgMetricSegments.push(3).push(2).push(1).getIndex(2)).to.be.equal(0);
            });
        });

        describe('#getSegRatio', function () {
            it('should return correct intra-segment ratio value in case of [1, 2, 3]', function () {
                expect(dgMetricSegments.push(1).push(2).push(3).getSegRatio(4.5)).to.be.equal((4.5 - 3) / (6 - 3));
            });

            it('should return correct intra-segment ratio value in case of [3, 2, 1]', function () {
                expect(dgMetricSegments.push(3).push(2).push(1).getSegRatio(4.5)).to.be.equal((4.5 - 3) / (5 - 3));
            });
        });

        describe('#getSegLength', function () {
            it('should return correct segment length in case of [1, 2, 3]', function () {
                expect(dgMetricSegments.push(1).push(2).push(3).getSegLength(5)).to.be.equal(2);
            });

            it('should return correct segment length in case of [3, 2, 1]', function () {
                expect(dgMetricSegments.push(3).push(2).push(1).getSegLength(5)).to.be.equal(0);
            });
        });
    });
});
