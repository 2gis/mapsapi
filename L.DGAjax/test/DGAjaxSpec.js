describe("DG AJAX Module", function() {

    /**
     * Проверка, что срабатывает success callback при корректном ответе сервера
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/test
     * - Проверяем, что сработал success callback
     * - Проверяем, что success callback вернул ожидаемые данные
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should get a success responce", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            success: callback
        });

        waitsFor(function() {
            return callback.callCount === 1;
        });

        runs(function() {
            expect(callback).toHaveBeenCalledWith({ pathname : 'test' });
        });

    });

    /**
     * Проверка, что срабатывает error callback при отсутствии параметров url
     *
     * - Вызываем AJAX без задания параметров url
     * - Проверяем, что сработал error callback
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should get a error responce on empty url", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            timeout: 1000,
            error: callback
        });

        waitsFor(function() {
            return callback.callCount === 1;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    /**
     * Проверка, что срабатывает error callback при некорректном запросе
     *
     * - Проводим некорректный запрос на тестовый сервер http://127.0.0.1:3000/cat (не существующий контроллер cat)
     * - Проверяем, что сработал error callback
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should get a error responce on bad server request", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/',
            error: callback
        });

        waitsFor(function() {
            return callback.callCount === 1;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    /**
     * Проверка, что перед запросом происходит вызов beforeSend callback
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/test
     * - Проверяем, что сработал beforeSend callback
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should calls a beforeSend callback", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            beforeSend: callback
        });

        waitsFor(function() {
            return callback.callCount === 1;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    /**
     * Проверка, что после запроса происходит вызов complete callback
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/test
     * - Проверяем, что сработал complete callback
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should calls a complete callback", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            complete: callback
        });

        waitsFor(function() {
            return callback.callCount === 1;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    /**
     * Проверка, что AJAX возвращает объект с методом отмены вызова
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/ на контроллер test
     * - Проверяем, что вернулся объект
     * - Проверяем, что существует метод cancel
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should be return cancel callback method", function() {

        var ajax = L.DGAjax({
            url: 'http://127.0.0.1:3000/test'
        });

        expect(ajax).toBeDefined();
        expect(ajax.cancel).toBeDefined();
    });

    /**
     * Проверка, что работает метод отмены вызова
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/test
     * - Проверяем, что вернулся объект
     * - Проверяем, что существует метод cancel
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should that the cancel callback method works", function () {
        var callback = jasmine.createSpy();

        var ajax = L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            success: callback
        });

        ajax.cancel();

        waitsFor(function() {
            return callback.callCount === 0;
        });

        runs(function() {
            expect(callback).not.toHaveBeenCalled();
        });

    });

    /**
     * Проверка, что не перепутываются 2 AJAX запроса
     *
     * - Проводим запросы на тестовый сервер http://127.0.0.1:3000/ на контроллеры testA и TestB
     * - Проверяем, что вернулся объект
     * - Проверяем, что сработали success callback для обоих запросов
     * - Проверяем, что success callback вернули ожидаемые данные
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should that 2 callbaks are not mixed", function () {
        var callbackA = jasmine.createSpy();
        var callbackB = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/testA',
            success: callbackA
        });

        L.DGAjax({
            url: 'http://127.0.0.1:3000/testB',
            success: callbackB
        });

        waitsFor(function() {
            return (callbackA.callCount === 1 && callbackB.callCount === 1);
        });

        runs(function() {
            expect(callbackA).toHaveBeenCalledWith({ pathname : 'testA' });
            expect(callbackB).toHaveBeenCalledWith({ pathname : 'testB' });
        });
    });

});
