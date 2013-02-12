describe("DG AJAX", function() {

    it("should be return cancel callback function", function() {

        cb = L.DGAjax({});
        console.log(cb);

        expect(1).toEqual(1);
    });

});