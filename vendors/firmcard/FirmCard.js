/**
	
	firmCard.render(firmData); -> отдаю html

**/

var FirmCard = function(options) {
	var tmpl = options.tmpl,
		firm = options.firm,
		whsParsed,
		scheduleData,
		balloonContent;

	this._container = document.createElement('div');
	this._id = firm.id;
	this._schedule = new Schedule();

	whsParsed = this._schedule.parseWorkingHours(firm.whs);
	scheduleData = this._schedule.setSchedule(whsParsed, Schedule.getFirmMsgs());
	balloonContent = FirmCard.render(tmpl, {
		firm: firm, 
		scheduleData: scheduleData, 
		msgs: this._schedule.getMsgs(), 
		payMethods: Schedule.payMethods,
		flampUrl: Schedule.getFlampUrl(firm.id),
		schedule: this._schedule
	});

	this._container.innerHTML = balloonContent;

	FirmCardEventListener.add(this);
};

FirmCard.prototype.getContainer = function() {
	return this._container;
};

FirmCard.prototype.getId = function() {
	return this._id;
};

FirmCard.prototype._collapse = function(el) {
	el.style.display = 'none';
};

FirmCard.prototype._expand = function(el) {
	el.style.display = 'block';
};

FirmCard.prototype.toggle = function(type) {
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
};

FirmCard.setOptions = function(options) {
	for (var option in options) {
		if (options.hasOwnProperty(option)) {
			FirmCard[option] = options[option];	
		}
	}
};

