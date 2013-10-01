describe("DG TileLayer Module", function () {
    var map,
        spy;

    beforeEach(function () {
        map = new L.Map(document.createElement('div'), {
            center: new L.LatLng(54.980206086231, 82.898068362003),
            zoom: 10
        });
        spy = sinon.spy();
    });

    afterEach(function () {
        map = null;
        spy = null;
    });

    it("when method L.DG.tileLayer() return correct layer", function () {
        var dgLayer1 = L.DG.tileLayer(),
            dgLayer2 = new L.DG.TileLayer();

        expect(dgLayer1).to.eql(dgLayer2);
    });

    it("when a tilelayer is added to a map automatically", function () {
        map.eachLayer(spy);
        expect(spy.calledOnce);
    });

    it("when a automatically layer is 2gis tilelayer", function () {
        var dgLayer = L.DG.tileLayer();

        map.eachLayer(function(layer){
            expect(layer.options).to.eql(dgLayer.options);
        });
    });

});