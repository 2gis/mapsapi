describe("DG TileLayer Module", function () {
    var map,
        spy;

    beforeEach(function () {
        map = new DG.Map(document.createElement('div'), {
            center: new DG.LatLng(54.980206086231, 82.898068362003),
            zoom: 10
        });
        spy = sinon.spy();
    });

    afterEach(function () {
        map = null;
        spy = null;
    });

    it("when method DG.tileLayer() return correct layer", function () {
        var dgLayer1 = DG.tileLayerDgis(),
            dgLayer2 = new DG.TileLayer.dgis();

        expect(dgLayer1).to.eql(dgLayer2);
    });

    it("when a tilelayer is added to a map automatically", function () {
        map.eachLayer(spy);
        expect(spy.calledOnce);
    });

    it("when a automatically layer is 2gis tilelayer", function () {
        var dgLayer = DG.tileLayerDgis();

        map.eachLayer(function(layer){
            expect(layer.options).to.eql(dgLayer.options);
        });
    });

});