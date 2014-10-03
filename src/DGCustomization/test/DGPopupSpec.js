describe('DG.Popup', function() {
    var mapContainer = document.createElement('div');

    document.body.appendChild(mapContainer);

    var map = new DG.Map(mapContainer, {
            center: [54.980206086231, 82.898068362003],
            zoom: 15
        }),

        shortString = 'qwerty',
        longString = (new Array(15)).join('1<br>'),

        classPopupBodyContainer = 'dg-popup__container',
        classPopupHeaderContainer = 'dg-popup__header',
        classPopupFooterContainer = 'dg-popup__footer',
        classScrollBar = 'dg-scroller__bar';

    after(function() {
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

        it('should call click event', function() {
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
