describe('DGMap', function () {
    var mapContainer,
        center = [54.980206086231, 82.898068362003],
        map,
        newCenter = [55.01749277152058, 82.92145729064943],
        moveStartSpy,
        moveEndSpy;

    before(function () {
        mapContainer = document.createElement('div');
        map = new DG.Map(mapContainer, {
            center: center,
            zoom: 15
        });
        document.body.appendChild(mapContainer);
        map.setLang('ru');
        map.invalidateSize();
    });

    after(function () {
        mapContainer.parentElement.removeChild(mapContainer);
        mapContainer = map = center = newCenter = moveStartSpy = moveEndSpy = null;
    });

    describe('#setView', function () {
        describe('change center without animate', function () {
            before(function() {
                map.setView(center, 13, {animate: false});

                moveStartSpy = sinon.spy();
                moveEndSpy = sinon.spy();

                map.on('movestart', moveStartSpy);
                map.on('moveend', moveEndSpy);

                map.setView(newCenter, 13, {animate: false});
            });

            after(function () {
                map.off('movestart', moveStartSpy);
                map.off('moveend', moveEndSpy);
            });

            it('should change center', function () {
                expect(DG.latLng(newCenter)).to.nearLatLng(map.getCenter());
            });

            it('should fire movestart event', function () {
                expect(moveStartSpy.calledOnce).to.be.ok();
            });

            it('shouldn fire moveend event while animate', function () {
                expect(moveEndSpy.calledOnce).to.be.ok();
            });
        });

        describe('change center with animate = true', function () {
            before(function () {
                map.setView(center, 13, {animate: false});

                moveStartSpy = sinon.spy();
                moveEndSpy = sinon.spy();

                map.on('movestart', moveStartSpy);
                map.on('moveend', moveEndSpy);

                map.setView(newCenter, 13, {animate: true});
            });

            after(function () {
                map.off('movestart', moveStartSpy);
                map.off('moveend', moveEndSpy);
            });

            it('should fire movestart event before animate', function () {
                expect(moveStartSpy.calledOnce).to.be.ok();
            });

            it('shouldn\'t fire moveend event while animate', function () {
                expect(moveEndSpy.calledOnce).not.be.ok();
            });
        });
    });

    describe('#panBy', function () {
        it('should set zoom to 13 after panBy to place without project', function () {
            map.setView([55.005582426668404, 82.93081283569337], 18, {animate: false});
            map.panBy([1e15, 0]);
            expect(map.getZoom()).to.be(16);
        });
    });

    describe('#getBoundsZoom', function () {
        it('should return 16', function () {
            var sw = DG.latLng(54.97369439559682, 80.59043041467668),
                ne = DG.latLng(54.97441793550156, 80.59262982606889),
                b = DG.latLngBounds(sw, ne);

            expect(map.getBoundsZoom(b)).to.be(16);
        });
    });
});
