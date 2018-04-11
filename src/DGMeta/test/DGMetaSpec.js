describe.skip('DGMeta', function () {
    var map, meta, ajaxSpy, ajaxStub, demoData, origin, poiCord, spy, div;

    beforeEach(function () {
        div = document.createElement('div');

        document.body.appendChild(div);

        map = new DG.Map(div, {
            center : new DG.LatLng(54.980206086231, 82.898068362003),
            zoom: 17
        });

        demoData = [{
            geometry: {
                type: 'Polygon',
                coordinates: [
                    DG.point(20, 85),
                    DG.point(40, 85),
                    DG.point(40, 105),
                    DG.point(20, 105),
                    DG.point(20, 85)
                ]
            },
            hint: 'Суши Терра, сеть ресторанов японской кухни',
            id: '141806935215016',
            linked: {
                id: '141265769904776',
                name: 'Суши Терра, сеть ресторанов японской кухни',
                type: 'filial'
            }
        }];

        poiCord = DG.latLng(51.73106181684307, 36.19431853294373); // администрация курской области

        meta = DG.Meta.layer(null);
        origin = meta.getOrigin();

        ajaxSpy = sinon.spy();
        ajaxStub = sinon.stub(DG, 'ajax', function () {
            ajaxSpy();
            return {then: function () {} };
        });

    });

    afterEach(function () {
        document.body.removeChild(div);
        map && map.remove();
        map = meta = origin = demoData = ajaxSpy = null;
        ajaxStub.restore();
    });

    describe('#DG.Meta.Layer', function () {
        it('should create and return origin instance', function () {
            expect(origin).to.be.an('object');
        });

        it('should click on map', function () {
            origin.setTileData('78713:43453:17:256x256', demoData);
            spy = sinon.spy();
            meta.addTo(map);

            map.on('click', spy);

            happen.click(map.getPane('tilePane'), {latlng: poiCord});

            expect(spy.called).to.be.ok();
        });
    });

    describe('#DG.Meta.Origin', function () {
        it('getTileData should NOT call ajax and return false', function () {
            origin.getTileData('124:12:42:256x256', function (tileData) {
                expect(tileData).to.not.be.ok();
                // ajax should not be called since empty url provided
                expect(ajaxSpy.callCount).to.be.eql(0);
            });
        });

        it('flush should clear cache', function () {
            var chain;

            origin.setTileData({x: 124, y: 12, z: 42, key: '256x256'}, demoData);
            chain = origin.flush();
            origin.getTileData({x: 124, y: 12, z: 42, key: '256x256'}, function (tileData) {
                expect(tileData).to.not.be.ok();
                // check for returning this
                expect(chain.flush).to.be.a('function');
            });
        });

        it('setURL flush option call flush method', function () {
            var flushSpy = sinon.spy();
                flushStub = sinon.stub(DG.Meta.Origin.prototype, 'flush', function () {
                    flushSpy();
                });

            origin.setURL('http://demo/data', true);

            expect(flushSpy.callCount).to.be.eql(1);

            flushStub.restore();
        });

        it('getTileData should cache tileData', function () {
            origin.setURL('http://demo/data');
            origin.getTileData({x: 124, y: 12, z: 42, key: '256x256'}, function (tileData) {
                expect(tileData).to.not.be.ok();
                expect(ajaxSpy.callCount).to.be.eql(1);
            });
        });

        it('setTileData by object key should write and cache tileData', function () {
            var chain;

            chain = origin.setTileData({x: 124, y: 12, z: 42, key: '256x256'}, demoData);

            origin.getTileData({x: 124, y: 12, z: 42, key: '256x256'}, function (tileData) {
                expect(tileData).to.be.a('object');
                expect(ajaxSpy.callCount).to.be.eql(0);
                // check for returning this
                expect(chain.setTileData).to.be.a('function');
            });
        });

        it('setTileData by string key should write and cache tileData', function () {
            var chain;

            chain = origin.setTileData('124:12:42:256x256', demoData);

            origin.getTileData({x: 124, y: 12, z: 42, key: '256x256'}, function (tileData) {
                expect(tileData).to.be.a('object');
                expect(ajaxSpy.callCount).to.be.eql(0);
                // check for returning this
                expect(chain.setTileData).to.be.a('function');
            });
        });

        it('getTileKey should string tileKey representation', function () {
            var tileKey;

            tileKey = origin.getTileKey({x: 124, y: 12, z: 42, key: '256x256'});

            expect(tileKey).to.be.eql('124:12:42:256x256');
        });
    });
});
