describe("DG TileLayer Module", function () {
    var map,
        spy;

    beforeEach(function () {
        map = new L.Map(document.createElement('div'), {
            center: new L.LatLng(54.980206086231, 82.898068362003),
            zoom: 10
        });
        spy = jasmine.createSpy();
    });

    afterEach(function () {
        map = null;
        spy = null;
    });

    /**
     * Проверка, что метод L.DG.tileLayer() возвращает экземпляр класа L.DG.TileLayer()
     *
     * - Проверяем, что созданный слой методом L.DG.tileLayer() соответствует ожидаемому.
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 2.0.0
     * @module L.DG.TileLayer
     */
    it("when method L.DG.tileLayer() return correct layer", function () {
        var dgLayer1 = L.DG.tileLayer(),
            dgLayer2 = new L.DG.TileLayer();

        expect(dgLayer1).toEqual(dgLayer2);
    });



    /**
     * Проверка, что при инициализации карты атоматически создается тайловый слой
     *
     * - Проверяем, что слой присутствует на карте
     * - Проверяем, что это слой 2GIS
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 2.0.0
     * @module L.DG.TileLayer
     */
    it("when a tilelayer is added to a map automatically", function () {
        map.eachLayer(spy);

        expect(spy.calls.length).toEqual(1);
    });

    /**
     * Проверка, что автоматически созданный слой при инициализации карты - это тайловый слой 2GIS
     *
     * - Проверяем, что автоматически созданный слой - это слой 2GIS
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 2.0.0
     * @module L.DG.TileLayer
     */
    it("when a automatically layer is 2gis tilelayer", function () {
        var dgLayer = L.DG.tileLayer();

        map.eachLayer(function(layer){
            expect(layer.options).toEqual(dgLayer.options);
        });
    });

});