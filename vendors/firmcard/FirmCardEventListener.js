var FirmCardEventListener = {
	_firmCards: {},

	initEvents : function() {
		FirmCard.event("on", document.getElementById('container'), "click", FirmCardEventListener._onClick);
	},
	_onClick: function(e) {
		//filter firmCard dom elements
		var parent = e.target.parentNode,
			className = parent.className;
			
		if (e.target.nodeName != 'A') return;
		if (/dg-map-firm-title/.test(className)) {
			console.log("firm title click");
			var id = e.target.id,
				firmCard = FirmCardEventListener._firmCards[id];
			//expand or collapse card
			if (firmCard) {
				firmCard.toggle('firm');
			}
		} else if(/dg-map-firm-schedule-short/.test(className)) {
			console.log("firm schedule click", parent);
			var id = e.target.id.split("-").pop(),
				firmCard = FirmCardEventListener._firmCards[id];
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