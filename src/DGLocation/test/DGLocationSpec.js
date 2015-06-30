describe('DG.Location', function () {
    var mapContainer, position, map, control, classControl, classControlRequest,
        classControlActive, container, classPin;
    var left = 'leaflet-left', right = 'leaflet-right', top = 'leaflet-top', bottom = 'leaflet-bottom';

    before(function () {
        geolocate.use();

        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);

        position = {lat: 54.910206086231, lng: 82.88806836200};
        map = new DG.Map(mapContainer, {
            center: [55.017493, 82.819576],
            zoom: 15,
            locationControl: true
        });
        control = DG.control.location();

        classControl = 'dg-control-round__icon_name_locate';
        classControlRequest = 'dg-control-round__icon_state_requesting';
        classControlActive = 'dg-control-round__icon_state_active';
        container = document.body.getElementsByClassName(classControl);
        classPin = 'dg-location__pin';
    });

    after(function () {
        geolocate.restore();
        map.remove();
        mapContainer.parentElement.removeChild(mapContainer);
    });

    function initTests() {
        var locationControl;
        describe('check init', function () {
            it('should be html container on map', function () {
                expect(container.length).to.be(1);

                locationControl = container[0];
            });
        });

        describe('check clicks', function () {
            describe('click to enable', function () {
                before(function () {
                    happen.click(locationControl);
                });

                it('should change to request class', function () {
                    expect(locationControl.className).to.contain(classControlRequest);
                });

                it('should change to active class', function () {
                    geolocate.send(position);
                    expect(locationControl.className).to.contain(classControlActive);
                });

                it('should change center map near coord', function () {
                    expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
                });

                it('should be location pin on map', function () {
                    expect(document.body.getElementsByClassName(classPin).length).to.be(1);
                });
            });

            describe('click to disable', function () {
                before(function () {
                    happen.click(locationControl);
                });

                it('should remove active class', function () {
                    expect(locationControl.className).not.contain(classControlActive);
                });

                it('shouldn\'t be location pin on map', function () {
                    expect(document.body.getElementsByClassName(classPin).length).to.be(0);
                });

                it('should center map near coord', function () {
                    expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
                });
            });
        });

        describe('change position', function () {
            before(function () {
                geolocate.change(position);
            });

            it('should center map near coord', function () {
                expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
            });
        });
    }

    describe('check auto init from map options', function () {
        initTests();
    });

    describe('check custom init', function () {
        before(function () {
            if (map.locationControl) {
                map.locationControl.remove();
            }

            map.addControl(control);
            container = document.body.getElementsByClassName(classControl);
        });

        initTests();

        after(function () {
            map.removeControl(control);
        });
    });

    describe('#addTo', function () {
        before(function () {
            if (map.locationControl) {
                map.locationControl.remove();
            }
            control.addTo(map);
        });

        initTests();

        after(function () {
            control.remove();
        });
    });

    describe('#remove', function () {
        before(function () {
            if (map.locationControl) {
                map.locationControl.remove();
                control.addTo(map);
            }
            control.remove(map);
        });

        it('control not present',function () {
            expect(container.length).to.be(0);
        });
    });

    describe('position init property', function () {
        var tmpControl, content;

        before(function () {
           if(map.locationControl){
               map.locationControl.remove();
           }
           control.remove(map);
        });

        it('default', function () {
            tmpControl = DG.control.location();
            content = document.querySelector(classControl) == document.querySelector([top, left].join('.'));
            expect(tmpControl.getPosition()).to.be('topleft');
            expect(content).to.be.ok();

        });

        it('topleft', function () {
            tmpControl = DG.control.location({position: 'topleft'});
            content = document.querySelector(classControl) == document.querySelector([top, left].join('.'));
            expect(tmpControl.getPosition()).to.be('topleft');
            expect(content).to.be.ok();
        });

        it('topright', function () {
            tmpControl = DG.control.location({position: 'topright'});
            content = document.querySelector(classControl) == document.querySelector([top, right].join('.'));
            expect(tmpControl.getPosition()).to.be('topright');
            expect(content).to.be.ok();
        });

        it('bottomleft', function () {
            tmpControl = DG.control.location({position: 'bottomleft'});
            content = document.querySelector(classControl) == document.querySelector([bottom, left].join('.'));
            expect(tmpControl.getPosition()).to.be('bottomleft');
            expect(content).to.be.ok();
        });

        it('topleft', function () {
            tmpControl = DG.control.location({position: 'bottomright'});
            content = document.querySelector(classControl) == document.querySelector([bottom, right].join('.'));
            expect(tmpControl.getPosition()).to.be('bottomright');
            expect(content).to.be.ok()
        });
    });

});
