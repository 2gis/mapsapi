describe('DG.Popup', function() {
    var map,
        mapContainer,
        shortString = 'qwerty',
        longString = (new Array(15)).join('1<br>'),

        classPopupBodyContainer = 'dg-popup__container',
        classPopupHeaderContainer = 'dg-popup__header',
        classPopupFooterContainer = 'dg-popup__footer',
        classScrollBar = 'dg-scroller__bar';

    before(function () {
        mapContainer = document.createElement('div');
        document.body.appendChild(mapContainer);

        map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        });
    });

    after(function() {
        map.remove();
        mapContainer.parentElement.removeChild(mapContainer);
        mapContainer = map = shortString = longString = classPopupBodyContainer = classPopupHeaderContainer = classPopupFooterContainer = classScrollBar = null;
    });

    describe('check contents', function() {
        var popup;

        beforeEach(function() {
            popup = DG.popup({maxHeight: 100})
                .setLatLng([54.980206086231, 82.898068362003])
                .addTo(map);
        });

        afterEach(function() {
            popup.clear();
            popup.remove();
        });

        describe('#setContent', function() {
            it('should change popup content without scroll', function() {
                popup.setContent(shortString);
                expect(mapContainer.getElementsByClassName(classPopupBodyContainer)[0].innerHTML).to.be(shortString);
                expect(mapContainer.getElementsByClassName(classScrollBar).length).to.be(0);
            });

            it('should change popup content with scroll', function() {
                popup.setContent(longString);
                expect(mapContainer.getElementsByClassName(classPopupBodyContainer)[0].innerHTML).to.be(longString);
                expect(mapContainer.getElementsByClassName(classScrollBar).length).to.be(1);
            });
        });

        describe('#getContent', function() {
            it('should get eql content', function() {
                popup.setContent(shortString);

                expect(popup.getContent()).to.be(shortString);
            });
        });

        describe('#setHeaderContent', function() {
            it('should change popup header content', function() {
                popup.setContent(shortString);
                popup.setHeaderContent(shortString);
                expect(mapContainer.getElementsByClassName(classPopupHeaderContainer)[0].innerHTML).to.be(shortString);
            });

            it('should be scroll in popup', function() {
                popup.setContent(shortString);
                popup.setHeaderContent(longString);
                expect(mapContainer.getElementsByClassName(classScrollBar).length).to.be(1);
            });
        });

        describe('#getHeaderContent', function() {
            it('should get eql header content', function() {
                popup.setHeaderContent(shortString);

                expect(popup.getHeaderContent()).to.be(shortString);
            });
        });

        describe('#setFooterContent', function() {
            it('should change popup footer content', function() {
                popup.setContent(shortString);
                popup.setFooterContent(shortString);
                expect(mapContainer.getElementsByClassName(classPopupFooterContainer)[0].innerHTML).to.be(shortString);
            });

            it('should be scroll in popup', function() {
                popup.setContent(shortString);
                popup.setFooterContent(longString);
                expect(mapContainer.getElementsByClassName(classScrollBar).length).to.be(1);
            });
        });

        describe('#getFooterContent', function() {
            it('should get eql footer content', function() {
                popup.setFooterContent(shortString);

                expect(popup.getFooterContent()).to.be(shortString);
            });
        });
    });

    describe('check events', function() {
        var popup;

        before(function() {
            popup = DG.popup({maxHeight: 100})
                .setLatLng([54.980206086231, 82.898068362003])
                .setContent(longString)
                .addTo(map);
        });

        after(function() {
            popup.remove();
        });

        it.skip('should call click event', function() {
            var spy = sinon.spy();

            popup.on('click', spy);

            happen.click(popup._contentNode);

            expect(spy.called).to.be.ok();
        });

        it('should call scroll event', function() {
            var spy = sinon.spy();

            popup.on('scroll', spy);

            happen.once(mapContainer.getElementsByClassName(classPopupBodyContainer)[0], {
                type: 'scroll'
            });

            expect(spy.called).to.be.ok();
        });
    });

    // TODO: дописать остальные тесты после фикса https://github.com/2gis/mapsapi/issues/44
});

//  Modified tests from PopupSpec.js
describe('L.Popup', function () {

    var c, map;

    beforeEach(function () {
        c = document.createElement('div');
        c.style.width = '400px';
        c.style.height = '400px';
        document.body.appendChild(c);
        map = new L.Map(c);
        map.setView(new L.LatLng(55.8, 37.6), 6);
    });

    afterEach(function () {
        document.body.removeChild(c);
    });

    it("it should use a popup with a function as content with a FeatureGroup", function () {
        var marker1 = new L.Marker(new L.LatLng(55.8, 37.6));
        var marker2 = new L.Marker(new L.LatLng(54.6, 38.2));
        var group = new L.FeatureGroup([marker1, marker2]).addTo(map);

        marker1.description = "I'm marker 1.";
        marker2.description = "I'm marker 2.";
        group.bindPopup(function (layer) {
            return layer.description;
        });

        map.options.closePopupOnClick = true;

        // toggle popup on marker1
        group.fire('click', {
            latlng: new L.LatLng(55.8, 37.6),
            layer: marker1
        });
        expect(map.hasLayer(group._popup)).to.be(true);
        expect(group._popup._contentNode.firstElementChild.firstElementChild.innerHTML).to.be("I'm marker 1.");

        // toggle popup on marker2
        group.fire('click', {
            latlng: new L.LatLng(54.6, 38.2),
            layer: marker2
        });
        expect(map.hasLayer(group._popup)).to.be(true);
        expect(group._popup._contentNode.firstElementChild.firstElementChild.innerHTML).to.be("I'm marker 2.");
    });

    it("it should function for popup content after bindPopup is called", function () {
        var marker1 = new L.Marker(new L.LatLng(55.8, 37.6));
        var marker2 = new L.Marker(new L.LatLng(54.6, 38.2));
        var group = new L.FeatureGroup([marker1]).addTo(map);

        marker1.description = "I'm marker 1.";
        marker2.description = "I'm marker 2.";
        group.bindPopup(function (layer) {
            return layer.description;
        });

        group.addLayer(marker2);

        map.options.closePopupOnClick = true;

        // toggle popup on marker1
        group.fire('click', {
            latlng: new L.LatLng(55.8, 37.6),
            layer: marker1
        });
        expect(map.hasLayer(group._popup)).to.be(true);
        expect(group._popup._contentNode.firstElementChild.firstElementChild.innerHTML).to.be("I'm marker 1.");

        // toggle popup on marker2
        group.fire('click', {
            latlng: new L.LatLng(54.6, 38.2),
            layer: marker2
        });
        expect(map.hasLayer(group._popup)).to.be(true);
        expect(group._popup._contentNode.firstElementChild.firstElementChild.innerHTML).to.be("I'm marker 2.");
    });

    it("should use a function for popup content when a source is passed to Popup", function () {
        var marker = new L.Marker(new L.LatLng(55.8, 37.6)).addTo(map);
        var popup = L.popup({}, marker);

        marker.description = "I am a marker.";

        marker.bindPopup(function (layer) {
            return layer.description;
        });

        marker.fire('click', {
            latlng: new L.LatLng(55.8, 37.6)
        });

        expect(map.hasLayer(marker._popup)).to.be(true);
        expect(marker._popup._contentNode.firstElementChild.firstElementChild.innerHTML).to.be("I am a marker.");
    });
});
