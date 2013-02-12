describe("DG AJAX", function() {

    it("should be return cancel callback function", function() {
        var ajax = L.DGAjax({});

        expect(ajax).toBeDefined();
    });

});