describe('DG.Control.Ruler', function() {
    var map, mapContainer, control, classControl, containerControl, ruler;

    before(function() {
        classControl = 'dg-control-round__icon_name_ruler';

        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);

        map = new DG.Map(mapContainer, {
            center: [55.017493, 82.819576],
            zoom: 15
        });

        control = DG.control.ruler();
    });

    after(function() {
        mapContainer.parentElement.removeChild(mapContainer);
        map.remove();
        map = mapContainer = control = classControl = containerControl = ruler = null;
    });

    describe('#addTo', function() {
        before(function() {
            control.addTo(map);
        });

        it('should map has ruler contrainer', function() {
            containerControl = document.body.getElementsByClassName(classControl);
            expect(containerControl.length).to.be(1);
            containerControl = containerControl[0];
            ruler = control._drawingHelper;
        });
    });

    describe('drawing', function() {
        it('should container has active class', function() {
            happen.click(containerControl);
            expect(containerControl.className).to.contain('active');
        });

        it('should change ruler after click on map', function() {
            var latlng = DG.latLng(54.980206086231, 82.898068362003),
                rulerLatLngs;

            map.fire('click', {latlng: latlng});
            rulerLatLngs = ruler.getLatLngs();

            expect(rulerLatLngs.length).to.be(1);
            expect(rulerLatLngs[0]).to.nearLatLng(latlng);
        });

        it('should change ruler after second click on map', function() {
            var latlng = DG.latLng(54.980206086231, 82.891068362003),
                rulerLatLngs;

            map.fire('click', {latlng: latlng});
            rulerLatLngs = ruler.getLatLngs();

            expect(rulerLatLngs.length).to.be(2);
            expect(rulerLatLngs[1]).to.nearLatLng(latlng);
        });

        it('should hasn\'t ruler layer on map', function() {
            happen.click(containerControl);
            expect(map.hasLayer(ruler._layersContainer)).not.be.ok();
        });
    });

    describe('#remove', function() {
        before(function() {
            happen.click(containerControl);
            map.fire('click', {latlng: DG.latLng(54.980206086231, 82.891068362003)});
            
            control.remove();
        });

        it('should hasn\'t ruler layer on map', function() {
            expect(map.hasLayer(ruler._layersContainer)).not.be.ok();
        });

        it('should map hasn\'t ruler contrainer', function() {
            expect(document.body.getElementsByClassName(classControl).length).to.be(0);
        });
    });
});
