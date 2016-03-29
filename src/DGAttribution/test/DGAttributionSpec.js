describe('DG.Control.Attribution', function() {
    var dictionaryLicense = {
            ru: 'соглашение',
            en: 'agreement',
            it: 'licenza',
            es: 'licencia',
            cs: 'smlouva'
        },
        osmCopyright = 'OpenStreetMap',

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
        dictionaryLicense = osmCopyright = latLngWithoutProject = latLngCenterNsk = mapContainer = map = attribution = null;
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

    describe('project leave', function() {
        it('should add osm copyright', function() {
            map.setView(latLngWithoutProject, 15, {animate: false});
            expect(attribution.innerHTML).to.contain(osmCopyright);
        });
    });

    describe('project enter', function() {
        it('should remove osm copyright', function() {
            map.setView(latLngCenterNsk, 19, {animate: false});
            expect(attribution.innerHTML).not.contain(osmCopyright);
        });
    });
});
