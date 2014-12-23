describe('DG.TrafficControl', function() {
    var controlClass = 'dg-control-round__icon_name_traffic',
        controlParentActiveClass = 'dg-control-round_state_active',
        controlParentHiddenClass = 'dg-control-round_is-hidden_true',

        centerNsk = [55.017493, 82.819576],
        centerSpb = [59.937706, 30.13249],
        centerWithoutProject = [54.83391822270635, 80.34439086914064],

        mapContainer = document.createElement('div'),
        map = new DG.Map(mapContainer, {
            center: centerSpb,
            zoom: 15
        }),

        control = mapContainer.getElementsByClassName(controlClass),
        trafficControl = DG.control.traffic(),
        controlParent;

    document.body.appendChild(mapContainer);
    map.addControl(trafficControl);

    describe('module init', function() {
        it('traffic control show', function() {
            expect(control.length).to.be(1);

            control = control[0];
            controlParent = control.parentElement;
        });

        it('remove hide class from control parent element', function () {
            expect(controlParent.className).not.contain(controlParentHiddenClass);
        });
    });

    describe('turn on control', function() {
        before(function() {
            happen.click(controlParent);
        });

        it('add active class to control parent element', function() {
            expect(controlParent.className).to.contain(controlParentActiveClass);
        });

        it('add traffic layer to map', function() {
            expect(map.hasLayer(trafficControl._trafficLayer)).to.be(true);
        });
    });

    describe('turn off control', function() {
        before(function() {
            happen.click(controlParent);
        });

        it('remove active class from control parent element', function() {
            expect(controlParent.className).not.contain(controlParentActiveClass);
        });

        it('remove traffic layer from map', function() {
            expect(map.hasLayer(trafficControl._trafficLayer)).to.be(false);
        });
    });

    describe('project leave/enter/change', function() {
        describe('with traffic off', function() {
            before(function() {
                // traffic off
                if (controlParent.className.indexOf(controlParentActiveClass) !== -1) {
                    happen.click(controlParent);
                }
            });

            it('control parent haven\'t active and hide classes', function() {
                expect(controlParent.className).not.contain(controlParentActiveClass);
                expect(controlParent.className).not.contain(controlParentHiddenClass);
            });

            it('add hide class to control parent element', function() {
                map.setView(centerWithoutProject, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentHiddenClass);
            });

            it('remove hide class from control parent element', function() {
                map.setView(centerSpb, 15, {animate: false});
                expect(controlParent.className).not.contain(controlParentHiddenClass);
            });

            it('control parent element haven\'t active class', function() {
                expect(controlParent.className).not.contain(controlParentActiveClass);
            });
        });

        describe('with traffic on', function() {
            before(function() {
                // traffic on
                if (controlParent.className.indexOf(controlParentActiveClass) === -1) {
                    happen.click(controlParent);
                }
            });

            it('control parent have active class', function() {
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });

            it('add hide class to control parent element', function() {
                map.setView(centerWithoutProject, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentHiddenClass);
            });

            it('remove hide class from control parent element', function() {
                map.setView(centerSpb, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentHiddenClass);
            });

            it('control parent element have active class', function() {
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });

            it('map have traffic layer', function() {
                expect(map.hasLayer(trafficControl._trafficLayer)).to.be(true);
            });

            it('control parent element have active class', function() {
                map.setView(centerNsk, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });
        });
    });

    describe('project change', function() {
        describe('with traffic off', function() {
            before(function() {
                map.setView(centerSpb, 15, {animate: false});
                // traffic off
                if (controlParent.className.indexOf(controlParentActiveClass) !== -1) {
                    happen.click(controlParent);
                }
            });

            it('control parent element haven\'t active class', function() {
                map.setView(centerNsk, 15, {animate: false});
                expect(controlParent.className).not.contain(controlParentActiveClass);
            });
        });

        describe('with traffic on', function() {
            before(function() {
                map.setView(centerSpb, 15, {animate: false});
                // traffic on
                if (controlParent.className.indexOf(controlParentActiveClass) === -1) {
                    happen.click(controlParent);
                }
                control.innerHTML = -50;
            });

            it('control parent element have active class', function() {
                map.setView(centerNsk, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });

            it('update traffic balls in control', function() {
                expect(control.innerHTML).not.be(-50);
            });
        });
    });
});
