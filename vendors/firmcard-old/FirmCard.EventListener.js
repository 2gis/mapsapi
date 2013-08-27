// TODO: should be fixed in JSAPI-2870
FirmCard.EventListener = {
	_firmCards: {},

	initEvents : function() {
		FirmCard.event("on", document.getElementById('container'), "click", FirmCard.EventListener._onClick);
	},
	_onClick: function(e) {
		//filter firmCard dom elements
		var parent = e.target.parentNode,
			className = parent.className;
			
		if (e.target.nodeName != 'A') return;
		if (/dg-map-firm-title/.test(className)) {
			console.log("firm title click");
			var id = e.target.id,
				firmCard = FirmCard.EventListener._firmCards[id];
			//expand or collapse card
			if (firmCard) {
				firmCard.toggle('firm');
			}
		} else if(/dg-map-firm-schedule-short/.test(className)) {
			console.log("firm schedule click", parent);
			var id = e.target.id.split("-").pop(),
				firmCard = FirmCard.EventListener._firmCards[id];
				console.log(id)
			if (firmCard) {
				firmCard.toggle('schedule');
			}
		}
	},

	add: function(firmCard) {
		this._firmCards[firmCard.getId()] = firmCard;
	},

	remove: function(id) {
		delete this._firmCards[id];
	}
};