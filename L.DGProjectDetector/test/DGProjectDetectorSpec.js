describe("DG Project Detector Module", function () {
    var map,
        spy;
    beforeEach(function () {
        map = new L.Map(document.createElement('div'), {
            center:new L.LatLng(54.980206086231, 82.898068362003),
            zoom:10
        });
        spy = jasmine.createSpy();
    });

    afterEach(function () {
        map = null;
        spy = null;
    });


    /**
     * Проверка, что событие projectsloaded срабатывает при корректном ответе сервера
     *
     * - Проверяем, что вызвалось событие projectsloaded после загрузки данных
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 1.0.0
     * @module DGProjectDetector
     */
    it("when server return projects", function () {
        map.on('projectsloaded', spy);

        expect(spy).toHaveBeenCalled();
    });

});
