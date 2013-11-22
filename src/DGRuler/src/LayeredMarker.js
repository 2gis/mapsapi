L.DG.Ruler.LayeredMarker = L.Marker.extend({

	options: {
		draggable: true,
		keyboard: false
    }

});

L.DG.Ruler.layeredMarker = function (options) {
    return new L.DG.Ruler.LayeredMarker(options);
};