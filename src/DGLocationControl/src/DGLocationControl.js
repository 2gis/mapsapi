L.DG.LocationControl = L.Control.Locate.extend({

});

L.DG.locate = function(options) {
	return new L.DG.LocationControl(options);
};