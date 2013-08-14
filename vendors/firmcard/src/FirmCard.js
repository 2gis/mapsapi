var FirmCard = function( options ) {
	var tmpl = options.tmpl,
		firm = options.firm,
		
		scheduleData,
		content;

	this._container = document.createElement('div');
	this._id = firm.id;
	this._schedule = new FirmCard.Schedule(options);

	console.log( firm );

	scheduleTransformed = this._schedule.transform( firm.schedule );

	console.log( scheduleTransformed );

	content = FirmCard.render(tmpl, {
		firm: firm,
		payMethods: FirmCard.DataHelper.payMethods,
		flampUrl: FirmCard.DataHelper.getFlampUrl(firm.id),
		scheduleData: scheduleTransformed,
		schedule: FirmCard.DataHelper,
		msgs: {}
		// schedule: this._schedule,
		// scheduleData: this._schedule.setSchedule(whsParsed, FirmCard.Schedule.getFirmMsgs()), 
		// msgs: this._schedule.getMsgs()
	});

	this._container.innerHTML = content;
};

FirmCard.prototype = {
	getContainer: function() {
		return this._container;
	},

	getId: function() {
		return this._id;
	},

	toggle: function(type) {
		var id, display, el;

		if (type === 'firm') {
			id = "dg-map-firm-full-";
		} else {
			id = 'dg-map-weekly-schedule-';
		}
		id += this._id;

		el = document.getElementById(id);
		display = el.style.display;
		display === 'none' ? this._expand(el) : this._collapse(el);
	},

	_collapse: function(el) {
		el.style.display = 'none';
	},

	_expand: function(el) {
		el.style.display = 'block';
	}
}

FirmCard.setOptions = function(options) {
	for (var option in options) {
		if (options.hasOwnProperty(option)) {
			FirmCard[option] = options[option];	
		}
	}
}