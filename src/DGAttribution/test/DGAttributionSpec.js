describe('DG.Control.Attribution', function() {
    var dictionaryLicense = {
            ru: 'соглашение',
            en: 'agreement',
            it: 'licenza',
            es: 'licencia',
            cs: 'smlouva'
        },

        latLngWithoutProject = [54.83391822270635, 80.34439086914064],
        latLngCenterNsk = [55.017493, 82.819576],

        mapContainer,
        map,
        attribution;

    before(function () {
        mapContainer = document.createElement('div');
        map = new DG.Map(mapContainer, {
            center: latLngCenterNsk,
            zoom: 15
        });
        attribution = mapContainer.getElementsByClassName('dg-attribution')[0];
    });

    after(function() {
        dictionaryLicense = latLngWithoutProject = latLngCenterNsk = mapContainer = map = attribution = null;
    });

    describe('check init', function() {
        it('should html element 2gis copyright', function() {
            var el = attribution.getElementsByClassName('dg-attribution__copyright');

            expect(el.length).to.be(1);
        });
    });

    describe('change languages', function() {
        after(function() {
           map.setLang('ru');
        });

        Object.keys(dictionaryLicense).forEach(function(el) {
            it('should copyright html ' + el + ' word license', function() {
                map.setLang(el);
                expect(attribution.innerHTML).to.contain(dictionaryLicense[el]);
            });
        });
    });
});
