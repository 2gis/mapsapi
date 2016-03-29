describe('DG.RoundControl', function() {
    var map, mapContainer, control, classIconControl, classActive, containerControl, spy;

    before(function() {
        classIconControl = 'dg-control-round__icon_name_default';
        classActive = 'dg-control-round__icon_state_active';

        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);

        map = new DG.Map(mapContainer, {
            center: [55.017493, 82.819576],
            zoom: 15
        });

        control = DG.roundControl();
    });

    after(function() {
        mapContainer.parentElement.removeChild(mapContainer);
        map.remove();
        map = mapContainer = control = classIconControl = classActive = containerControl = spy = null;
    });

    describe('#addTo', function() {
        before(function() {
            spy = sinon.spy();
            control.on('add', spy);
            control.addTo(map);
        });

        after(function() {
            spy = null;
        });

        it('should container control on map', function() {
            containerControl = document.body.getElementsByClassName(classIconControl);
            expect(containerControl.length).to.be(1);
            containerControl = containerControl[0];
        });

        it('should emit add event', function() {
            expect(spy.calledOnce).to.be.ok();
        });

        // TODO: включить после фикса leaflet'а с добавлением нескольких контейнеров для одного контрола
        it.skip('should only one container for one control', function() {
            control.addTo(map);
            expect(document.body.getElementsByClassName(classIconControl).length).to.be(1);
        });

        it('should emit click event', function() {
            var spy = sinon.spy();
            control.on('click', spy);
            happen.click(containerControl);
            expect(spy.callCount).to.be(1);
        });
    });

    describe('#setState', function() {
        it('should container have active class', function() {
            control.setState('active');
            expect(containerControl.className).to.contain(classActive);
        });

        it('should container haven\'t active class and have \'someclass\'', function() {
            control.setState('someclass');
            expect(containerControl.className).not.contain(classActive);
            expect(containerControl.className).to.contain('someclass');
        });

        it('should container haven\' someclass', function() {
            control.setState();
            expect(containerControl.className).not.contain('someclass');
        });
    });

    describe('#remove', function() {
        before(function() {
            spy = sinon.spy();
            control.on('remove', spy);
            control.remove();
        });

        after(function() {
            spy = null;
        });

        it('should remove container on map', function() {
            expect(document.body.getElementsByClassName(classIconControl).length).to.be(0);
        });

        it('should emit remove event', function() {
            expect(spy.calledOnce).to.be.ok();
        });

        it('shouldn\'t emit click event', function() {
            var spy = sinon.spy();
            control.on('click', spy);
            happen.click(containerControl);
            expect(spy.called).not.be.ok();
        });
    });
});
