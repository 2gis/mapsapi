describe("DG AJAX Module", function() {
    /**
     * Проверка, что AJAX возвращаем обьект с методом отмены вызова
     *
     * - Проводим запрос на тестовый сервер http://127.0.0.1:3000/test
     * - Проверяем, что вернулся объект
     * - Проверяем, что существует метод cancel
     *
     * @author Andrey Chizh <a.chizh@2gis.kiev.ua>
     * @version 2.0.0
     * @module DGAjax
     */
    it("should be return cancel callback function", function() {

        var ajax = L.DGAjax({
            url: 'http://127.0.0.1:3000/test'
        });

        expect(ajax).toBeDefined();
        expect(ajax.cancel).toBeDefined();
    });

    it("should get a success responce", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            success: callback
        });

        waitsFor(function() {
            return callback.callCount > 0;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith({ test : 'ok' });
        });

    });

    it("should get a error responce", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/cat',
            error: callback
        });

        waitsFor(function() {
            return callback.callCount > 0;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    it("should calls a beforeSend callback", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            beforeSend: callback
        });

        waitsFor(function() {
            return callback.callCount > 0;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

    it("should calls a complete callback", function () {
        var callback = jasmine.createSpy();

        L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            complete: callback
        });

        waitsFor(function() {
            return callback.callCount > 0;
        });

        runs(function() {
            expect(callback).toHaveBeenCalled();
        });

    });

});
