describe('DGCustomization', function() {
    var mapContainer = document.createElement('div'),
        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });

    document.body.appendChild(mapContainer);
    map.setLang('ru');

    after(function() {
        mapContainer.parentElement.removeChild(mapContainer);
        mapContainer = map = null;
    });

    describe('DG.Control', function() {
        it ('change map lang should call _renderTranslation function', function() {
            var control = DG.control(),
                spy = sinon.spy();

            control._renderTranslation = spy;
            map.setLang('en');

            expect(spy).to.be.ok();
        });
    });

    describe('DG.Map', function() {
        describe('#setView', function() {
            it('should change center with animate', function(done) {
                var events = {
                        movestart: sinon.spy(),
                        moveend: sinon.spy()
                    },
                    center = [55.01749277152058, 82.92145729064943];

                map.setView([55.01749277152058, 82.12145729064943], 13, {animate: false});

                map.on(events);

                function trasitionEnd() {
                    expect(events.moveend.called).to.be.ok();

                    map.off(events);
                    document.removeEventListener('transitionend', trasitionEnd);
                    document.removeEventListener('webkitTransitionEnd', trasitionEnd);

                    done();
                }

                document.addEventListener('transitionend', trasitionEnd);
                document.addEventListener('webkitTransitionEnd', trasitionEnd);

                map.setView(center, 13, {animate: true});

                expect(events.movestart.called).to.be.ok();
                expect(events.moveend.called).not.be.ok();
                expect(DG.latLng(center)).to.nearLatLng(map.getCenter());
            });

            it('should change center without animate', function() {
                var events = {
                        movestart: sinon.spy(),
                        moveend: sinon.spy()
                    },
                    center = [55.01749277152058, 82.92145729064943];

                map.setView([55.01749277152058, 82.12145729064943], 13, {animate: false});

                map.on(events);

                map.setView(center, 13, {animate: false});

                expect(events.movestart.called).to.be.ok();
                expect(events.moveend.called).to.be.ok();
                expect(DG.latLng(center)).to.nearLatLng(map.getCenter());

                map.off(events);
            });
        });

        describe('#panBy', function() {
            it('should set zoom to 13 after panBy to place without project', function() {
                map.setView([55.005582426668404, 82.93081283569337], 15, {animate: false});
                map.panBy([1e15, 0]);
                expect(map.getZoom()).to.be(13);
            });
        });

        describe('#getBoundsZoom', function() {
            it('should return 13', function() {
                var sw = DG.latLng(54.97369439559682, 80.99043041467668),
                    ne = DG.latLng(54.97441793550156, 80.99262982606889),
                    b = DG.latLngBounds(sw, ne);

                expect(map.getBoundsZoom(b)).to.be(13);
            });
        });
    });
});
