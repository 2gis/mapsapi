var FirmCard = function(firm, options) {
	var self = this;

	this._el = null;
	this._fullFirmEl = null;
	this._isExpanded = false;

	this._schedule = new FirmCard.Schedule();
	this.setOptions(options);

	if ("[object Object]" !== Object.prototype.toString.call(firm)) {
		this._id = firm;
		//show loader
		var loader = this.options.render(this.options.tmpls['loader']);

		this._createEl(loader);
		this.options.ajax(firm, function(data) {
			self._firmData = data[0];
			self.toggle.call(self);
		});
	} else {
		this._firmData = firm;
		this._id = firm.id.split("_").shift();
	}
};

FirmCard.prototype = {
	_collapse: function() {
		this._fullFirmEl.style.display = 'none';
		this._isExpanded = false;
	},

	_createEl: function(html) {
		this._el = document.createElement("div");
		this._el.setAttribute("id", 'dg-map-firm-' + this._id);
		this._el.setAttribute("class", 'dg-map-firm');
		this._el.innerHTML = html;
	},

	_createFullFirmEl: function(html) {
		this._fullFirmEl = document.createElement("div");
		this._fullFirmEl.setAttribute("id", "dg-map-firm-full-" + this._id);
		this._fullFirmEl.setAttribute("class", "dg-map-firm-full");
		this._fullFirmEl.style.display = "block";
		this._fullFirmEl.innerHTML = html;
	},

	_expand: function(fullFirmElExists) {
		var self = this;

		if (!fullFirmElExists) {
			this.options.ajax(this._id, function(data) {
				self._renderFullCard.call(self, data[0]);
			});
		} else {
			this._fullFirmEl.style.display = 'block';
		}
	},

	_renderFullCard: function(data) {
		var html,
			schedule,
			forecast;

		this._firmData = data;
		schedule = this._schedule.transform(data.schedule);
		forecast = this._schedule.forecast(schedule);

		console.log("data+schedule+forecast", data, schedule, forecast);
		html = this.options.render(this.options.tmpls.fullFirm, {
			firm: data,
			schedule: schedule,
			dict: FirmCard.Schedule.dictionary,
			forecast: forecast,
		    dataHelper: FirmCard.DataHelper
		});

		this._createFullFirmEl(html);
		//this._el.removeChild(document.getElementById('dg-popup-firm-loading'));
		this._el.appendChild(this._fullFirmEl);
		this.options.callback && this.options.callback(this._el);
		this._isExpanded = true;
	},

	getContainer: function() {
		return this._el;
	},

	getId: function() {
		return this._id;
	},

	toggle: function(type) {
		var id, display,
			fullFirmElExists = !!this._fullFirmEl;

		if (!fullFirmElExists) {
			this._expand(fullFirmElExists);
		} else {
			display = this._fullFirmEl.style.display;
			display === 'none' ? this._expand(fullFirmElExists) : this._collapse();
		}
	},

	render: function() {
		var html;

		if (!this._el) {
			html = this.options.render(this.options.tmpls.shortFirm, {
				name: this._firmData.name,
				id: this._id
			});
			this._createEl(html);
		}

		return this._el;
	},

	isExpanded: function() {
		return this._isExpanded;
	},

	setOptions: function(options) {
		var option;

		this.options = this.options || {};

		for (option in options) {
			if (options.hasOwnProperty(option)) {
				this.options[option] = options[option];
			}
		}
	}
};
