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
    it("should fire a projectsloaded event ", function () {
        map.on('projectsloaded', spy);

        waitsFor(function () {
            return spy.callCount === 1;
        });

        runs(function () {
            expect(spy).toHaveBeenCalled();
        });
    });

    /**
     * Проверка, что событие projectchange срабатывает при смене проекта
     *
     * - Проверяем, что вызвалось событие projectchange при смене проекта
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 1.0.0
     * @module DGProjectDetector
     */
    it("should fire a projectchange event ", function () {
        map.on('projectchange', spy);

        window.setTimeout(function () {
            map.setView([53.706875284187, 91.433050566441], 13);
        }, 1000);

        waitsFor(function () {
            return spy.callCount === 1;
        });

        runs(function () {
            expect(spy).toHaveBeenCalled();
        });
    });

    /**
     * Проверка, что метод getProjectsList() события projectsloaded  возвращает данные
     *
     * - Подписываемся на событие "projectsloaded"
     * - В полученном событии вызываем метод и роверяем что значение определено
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 1.0.0
     * @module DGProjectDetector
     */
    describe("#getProjectsList", function () {
        it("should be return not empty", function () {
            map.on('projectsloaded', spy);

            waitsFor(function () {
                return spy.callCount === 1;
            });

            runs(function () {
                expect(spy.mostRecentCall.args[0].getProjectsList()).toBeDefined();
            });
        });
    });

    /**
     * Проверка, что метод getProject() возвращает корректный проект
     *
     * - Подписываемся на событие "projectchange"
     * - Вызываем метод и роверяем что значение определено
     *
     * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
     * @version 1.0.0
     * @module DGProjectDetector
     */
    describe("#getProject", function () {
        it("should be return correct project", function () {
            map.on('projectchange', spy);

            window.setTimeout(function () {
                map.setView([53.706875284187, 91.433050566441], 13);
            }, 1000);

            waitsFor(function () {
                return spy.callCount === 1;
            });

            runs(function () {
                var project  = spy.mostRecentCall.args[0].getProject();
                expect(project.name).toContain('Абакан');
            });
        });
    });
});
