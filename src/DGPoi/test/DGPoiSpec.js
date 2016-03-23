describe('DG.Poi', function() {
    var map, mapContainer, ajaxSpy, ajaxStub, tileData, tileKey;

    before(function() {
        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);

        map = new DG.Map(mapContainer, {
            center: [55.017493, 82.819576],
            zoom: 15
        });

        tileKey = '23929:10367:15:256';
        tileData = JSON.parse('[{"id":"141806935212060","hint":"Сан Сити, многофункциональный комплекс","linked":{"id":"141265770417218","type":"branch","name":"Сан Сити, многофункциональный комплекс"},"geometry":{"type":"Polygon","coordinates":[[{"x":142,"y":132},{"x":162,"y":132},{"x":162,"y":152},{"x":142,"y":152},{"x":142,"y":132}]]}}]');
        tileData[0].geometry.coordinates[0].forEach(function(el, i) {
            tileData[0].geometry.coordinates[0][i] = DG.point(el.x, el.y);
        });
    });

    after(function() {
        map.remove();
        mapContainer.parentElement.removeChild(mapContainer);
        map = mapContainer = ajaxSpy = ajaxStub = tileData = tileKey = null;
    });

    describe('check init', function() {
        it('should object map has .poi', function() {
            expect(map.poi).to.be.a('object');
        });

        it('should map has poi meta layer', function() {
            expect(map.hasLayer(map.poi.getMetaLayer())).to.be.ok();
        });
    });

    describe('#removeHooks', function() {
        before(function() {
            map.poi.removeHooks();
        });

        it('should map hasn\'t meta layer', function() {
            expect(map.hasLayer(map.poi.getMetaLayer())).not.be.ok();
        });
    });

    describe('#addHooks', function() {
        before(function() {
            map.poi.addHooks();
        });

        it('should map has meta layer', function() {
            expect(map.hasLayer(map.poi.getMetaLayer())).to.be.ok();
        });
    });

    describe('mouse events', function() {
        var labelContent, metaLayer;

        before(function() {
            metaLayer = map.poi.getMetaLayer();
            metaLayer.getOrigin().setTileData(tileKey, tileData);
        });

        after(function() {
            labelContent = metaLayer = null;
        });

        describe('#mouseover', function() {
            before(function() {
                metaLayer.fire('mouseover', {
                    meta: tileData[0],
                    latlng: DG.latLng(54.98042127438281, 82.89879798889162)
                });
            });

            it('should view label on map', function() {
                labelContent = document.body.getElementsByClassName('dg-label__content');
                expect(labelContent.length).to.be(1);
            });

            it('should equel label text', function() {
                expect(labelContent[0].innerHTML).to.be(tileData[0].hint);
            });
        });

        describe('#mouseout', function() {
            before(function() {
                metaLayer.fire('mouseout', {
                    meta: tileData[0],
                    latlng: DG.latLng(54.98042127438281, 82.89879798889162)
                });
            });

            it('shouldn\'t view label on map', function() {
                labelContent = document.body.getElementsByClassName('dg-label__content');
                expect(labelContent.length).to.be(0);
            });

        });
    });
});
