describe('L.DG.Entrance', function () {
    var map,
        mapContainer = document.createElement("div");

    afterEach(function () {
        map && map.remove();
        map = null;
    });

    describe("#show", function() {

        it('should return "L.DG.Entrance" instance', function () {

        });

        it('should fire "entranceshow" event on map', function () {

        });

    });

    describe("#hide", function() {

        it('should return "L.DG.Entrance" instance', function () {

        });

        it('should fire "entrancehide" event on map', function () {

        });

    });

    // оставить только один

    describe("#shouldBeShown", function() {

        it('should be true, if zoom > 16', function () {

        });

        it('should be false, if zoom < 16', function () {

        });

    });

    describe("#mapShouldBeZoomed", function() {

        it('should zoom in map if zoom < 16', function () {

        });

    });

    describe("#getBounds", function() {

        it('bounds should be correct', function () {

        });

    });

});
