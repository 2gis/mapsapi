describe('DG.TrafficControl', function() {
    var controlClass = 'dg-control-round__icon_name_traffic',
        controlParentActiveClass = 'dg-control-round_state_active',
        controlParentHiddenClass = 'dg-control-round_is-hidden_true',

        centerNsk = [55.017493, 82.819576],
        centerSpb = [59.937706, 30.13249],
        centerWithoutProject = [55.363990665081126, 77.81307220458986];

    after(function () {
        controlClass = controlParentActiveClass = controlParentHiddenClass = centerNsk = null;
        centerSpb = centerWithoutProject = null;
    });

    describe('common traffic control test', function() {
        var mapContainer,
            map,
            control,
            trafficControl,
            controlParent;

        before(function () {
            mapContainer = document.createElement('div');
            map = new DG.Map(mapContainer, {
                center: centerSpb,
                zoom: 15
            });
    
            control = mapContainer.getElementsByClassName(controlClass);
            trafficControl = DG.control.traffic();
    
            document.body.appendChild(mapContainer);
            map.addControl(trafficControl);
        });
    
        after(function () {
            map.remove();
            document.body.removeChild(mapContainer);
            mapContainer = map = control = trafficControl = controlParent = null;
        });
    
        describe('module init', function () {
            it('traffic control show', function () {
                expect(control.length).to.be(1);
    
                control = control[0];
                controlParent = control.parentElement;
            });
    
            it('remove hide class from control parent element', function () {
                expect(controlParent.className).not.contain(controlParentHiddenClass);
            });
        });
    
        describe('turn on control', function () {
            before(function () {
                happen.click(controlParent);
            });
    
            it('add active class to control parent element', function () {
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });
    
            it('add traffic layer to map', function () {
                expect(map.hasLayer(trafficControl._trafficLayer)).to.be(true);
            });
        });
    
        describe('turn off control', function () {
            before(function () {
                happen.click(controlParent);
            });
    
            it('remove active class from control parent element', function () {
                expect(controlParent.className).not.contain(controlParentActiveClass);
            });
    
            it('remove traffic layer from map', function () {
                expect(map.hasLayer(trafficControl._trafficLayer)).to.be(false);
            });
        });
    
        describe('traffic point request', function () {
            var xhr, center, zoom, requests;

            before(function () {
                zoom = map.getZoom();
                center = map.getCenter();
                xhr = sinon.useFakeXMLHttpRequest();
                requests =  [];
    
                xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };
    
                happen.click(controlParent);
    
            });

            after(function () {
                xhr.restore();
                map.setView(center, zoom);
                happen.click(controlParent);
            });
    
            it('traffic points request called', function () {
                var urlRE = new RegExp('http://traffic\\d+.maps.2gis.com/\\w+/meta/score/0/');
                expect(urlRE.test(requests[0].url)).to.be(true);
            });
        });
    
        describe('traffic point timer request', function () {
            var xhr, center, zoom, requests, clock;

            before(function () {
                zoom = map.getZoom();
                center = map.getCenter();
                xhr = sinon.useFakeXMLHttpRequest();
                clock = sinon.useFakeTimers();
                requests =  [];
    
                xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };
    
                happen.click(controlParent);
    
            });

            after(function () {
                xhr.restore();
                clock.restore();
                map.setView(center, zoom);
                happen.click(controlParent);
            });
    
            it('traffic points update request called', function () {
                var urlRE = new RegExp('http://traffic\\d+.maps.2gis.com/\\w+/meta/speed/time/');
                clock.tick(DG.config.trafficLayerUpdateInterval + 1);
                expect(urlRE.test(requests[1].url)).to.be(true);
            });
        });
    });

    describe('traffic test on project leave/enter/change', function () {
        var mapContainer,
            map,
            control,
            trafficControl,
            controlParent;

        beforeEach(function () {
            mapContainer = document.createElement('div');
            map = new DG.Map(mapContainer, {
                center: centerSpb,
                zoom: 15
            });
    
            trafficControl = DG.control.traffic();
    
            document.body.appendChild(mapContainer);
            map.addControl(trafficControl);

            control = mapContainer.getElementsByClassName(controlClass)[0];
            controlParent = control.parentElement;
        });
    
        afterEach(function () {
            map.remove();
            document.body.removeChild(mapContainer);
            mapContainer = map = control = trafficControl = controlParent = null;
        });

        describe('with traffic off', function () {
            // traffic layer is off after map initialization

            it('control parent haven\'t active and hide classes', function () {
                expect(controlParent.className).not.contain(controlParentActiveClass);
                expect(controlParent.className).not.contain(controlParentHiddenClass);
            });

            it('add hide class to control parent element', function (done) {
                var onProjectLeave = function (ev) {
                    map.off('projectleave', onProjectLeave);
                    expect(controlParent.className).to.contain(controlParentHiddenClass);
                    done();
                };

                map.on('projectleave', onProjectLeave);
                map.setView(centerWithoutProject, 15, {animate: false});
            });

            it('remove hide class and control doesn\'t have active class', function (done) {
                var onProjectChange = function (ev) {
                    map.off('projectchange', onProjectChange);
                    expect(controlParent.className).not.contain(controlParentHiddenClass);
                    expect(controlParent.className).not.contain(controlParentActiveClass);
                    done();
                };

                map.setView(centerWithoutProject, 15, {animate: false});
                map.on('projectchange', onProjectChange);
                map.setView(centerSpb, 15, {animate: false});
            });
        });

        describe('with traffic on', function () {
            beforeEach(function () {
                // traffic layer is on, click on traffic control
                happen.click(controlParent);
            });

            it('control parent have active class', function () {
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });

            // skipped due to unstable behavior on map.remove() after this test
            it.skip('add hide class to control parent element', function (done) {
                var onProjectLeave = function (ev) {
                    map.off('projectleave', onProjectLeave);
                    expect(controlParent.className).to.contain(controlParentHiddenClass);
                    done();
                };

                map.on('projectleave', onProjectLeave);
                map.setView(centerWithoutProject, 15, {animate: false});
            });

            it('remove hide class and control has active class, ', function (done) {
                var onProjectChange = function (ev) {
                    map.off('projectchange', onProjectChange);
                    expect(controlParent.className).not.contain(controlParentHiddenClass);
                    expect(controlParent.className).to.contain(controlParentActiveClass);
                    expect(map.hasLayer(trafficControl._trafficLayer)).to.be(true);
                    done();
                };
                
                map.setView(centerWithoutProject, 15, {animate: false});
                map.on('projectchange', onProjectChange);
                map.setView(centerSpb, 15, {animate: false});
            });

            it('control parent element have active class', function () {
                map.setView(centerNsk, 15, {animate: false});
                expect(controlParent.className).to.contain(controlParentActiveClass);
            });
        });

        describe('traffic test on project change', function () {    
            describe('with traffic off', function () {
                    // traffic layer is off after map initialization
    
                it('control parent element haven\'t active class', function () {
                    map.setView(centerNsk, 15, {animate: false});
                    expect(controlParent.className).not.contain(controlParentActiveClass);
                });
            });
    
            describe('with traffic on', function () {                    
                beforeEach(function () {
                    // traffic layer is on, click on traffic control
                    happen.click(controlParent);
                    control.innerHTML = -50;
                });
    
                it('control parent element have active class', function () {
                    map.setView(centerNsk, 15, {animate: false});
                    expect(controlParent.className).to.contain(controlParentActiveClass);
                });
    
                it('update traffic balls in control', function () {
                    expect(control.innerHTML).not.be(-50);
                });
            });
        });
    });
});
