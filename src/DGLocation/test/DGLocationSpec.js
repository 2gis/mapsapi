describe('DG.Location', function() {
    geolocate.use();

    var mapContainer = document.createElement('div');
    document.body.appendChild(mapContainer);

    var position = {lat: 54.910206086231, lng: 82.88806836200},
        map = new DG.Map(mapContainer, {
            center: [55.017493, 82.819576],
            zoom: 15,
            locationControl: true
        }),
        control = DG.control.location(),
        classControl = 'dg-control-round__icon_name_locate',
        classControlRequest = 'dg-control-round__icon_state_requesting',
        classControlActive = 'dg-control-round__icon_state_active',
        container = document.body.getElementsByClassName(classControl),

        classPin = 'dg-location__pin';


    after(function() {
        geolocate.restore();
        mapContainer.parentElement.removeChild(mapContainer);
    });

    function initTests() {
        describe('check init', function() {
            it('should be html container on map', function() {
                expect(container.length).to.be(1);

                container = container[0];
            });
        });

        describe('check clicks', function() {
            describe('click to enable', function() {
                before(function() {
                    happen.click(container);
                });

                it('should change to request class', function() {
                    expect(container.className).to.contain(classControlRequest);
                });

                it('should change to active class', function() {
                    geolocate.send(position);
                    expect(container.className).to.contain(classControlActive);
                });

                it('should change center map near coord', function() {
                    expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
                });

                it('should be location pin on map', function() {
                    expect(document.body.getElementsByClassName(classPin).length).to.be(1);
                });
            });

            describe('click to disable', function() {
                before(function() {
                    happen.click(container);
                });

                it('should remove active class', function() {
                    expect(container.className).not.contain(classControlActive);
                });

                it('shouldn\'t be location pin on map', function() {
                    expect(document.body.getElementsByClassName(classPin).length).to.be(0);
                });

                it('should center map near coord', function() {
                    expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
                });
            });
        });

        describe('change position', function() {
            before(function() {
                geolocate.change(position);
            });

            it('should center map near coord', function() {
                expect(map.getCenter()).to.nearLatLng(DG.latLng(position));
            });
        });
    }

    describe('check auto init from map options', function() {
        initTests();
    });

    // TODO: после фиксов багов с DGLocation доделать #remove #addTo и пр.

    describe.skip('check custom init', function() {
        before(function() {
            if (map.locationControl) {
                map.locationControl.remove();
            }

            map.addControl(control);
            container = document.body.getElementsByClassName(classControl);
        });

        initTests();
    });
});
