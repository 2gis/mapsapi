var FirmCard = function(options) {
	var tmpl = options.tmpl,
		firm = options.firm,
		whsParsed,
		scheduleData,
		content;

	this._container = document.createElement('div');
	this._id = firm.id;

	this._schedule = new Schedule();
	whsParsed = this._schedule.parseWorkingHours(firm.whs);
	
	content = FirmCard.render(tmpl, {
		firm: firm, 
		scheduleData: this._schedule.setSchedule(whsParsed, Schedule.getFirmMsgs()), 
		msgs: this._schedule.getMsgs(), 
		payMethods: Schedule.payMethods,
		flampUrl: Schedule.getFlampUrl(firm.id),
		schedule: this._schedule
	});

	this._container.innerHTML = content;

	FirmCardEventListener.add(this);
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