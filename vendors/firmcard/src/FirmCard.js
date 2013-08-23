/**
	
	firmCard.render(firmData); -> отдаю html

**/

var FirmCard = function(firm, options) {
	var self = this;

	this._firmCache = "";
	this._firmExpandedCache = "";
	this._fullFirmEl = null;
	
	this._schedule = new FirmCard.Schedule();
	this.setOptions(options);

		//scheduleTransformed,
		//tmpl;
	if ("[object Object]" !== Object.prototype.toString.call(firm)) {
		this._id = firm;
		//show loader
		//this.options.render(this.options.tmpls['loader']);
		this.options.ajax(firm, function(data) {
			var schedule = self._schedule.transform(data[0].schedule);
			var forecast = self._schedule.forecast(schedule);
			var html = self.options.render(self.options.tmpls.fullFirm, {
				firm: data[0],
					schedule: schedule,
					forecast: forecast,
					dataHelper: FirmCard.DataHelper,
					msgs: {},
					self: {}
			});
			console.log(html);
			if (data) self.options.callback(html);
		});
	} else {
		this._firmData = firm;
		this._id = firm.id.split("_").shift();
	}
};	

FirmCard.prototype = {
	getContainer: function() {
		return this._el;
	},

	getId: function() {
		return this._id;
	},

	toggle: function(type) {
		var id, display;

		if (!this._el) {
			this._el = document.getElementById('dg-map-firm-' + this._id);
		}
		if (!this._fullFirmEl) {
			/*this._fullFirmEl = document.createElement("div");
			this._fullFirmEl.setAttribute('id', 'dg-map-firm-full-' + this._id);
			this._fullFirmEl.setAttribute('class', 'dg-map-firm-full');
			this._fullFirmEl.style.display = 'block';*/

			this._expand();
		} else {
			display = this._fullFirmEl.style.display;
			display === 'none' ? this._expand() : this._collapse();
		}
	},

	render: function() {
		if (!this._firmCache) {
			this._firmCache = this.options.render(this.options.tmpls.shortFirm, {
				id: this._id, 
				name: this._firmData.name
			});
		}
		return this._firmCache;
	},

	setOptions: function(options) {
		this.options = this.options || {};

		for (var option in options) {
			if (options.hasOwnProperty(option)) {
				this.options[option] = options[option];
			}
		}
	},

	_collapse: function() {
		this._fullFirmEl.style.display = 'none';
	},

	_expand: function() {
		var self = this;

		if (!this._firmExpandedCache) {
			//this._firmExpandedCache = '<!--Name and adress--><ul class="dg-map-firm-box"><li class="dg-map-firm-row dg-map-firm-address">Карла Маркса площадь, 7<span class="note"> &mdash; 1 этаж; МФК Сан Сити</span></li></ul><!--Subcats--><ul class="dg-map-firm-box dg-map-firm-box-rubric dg-map-firm-subcats"><li>Игрушки,</a></li><li>Сувениры / Подарки,</a></li><li>Цветы,</a></li><li>Доставка цветов,</a></li><li>Услуги праздничного оформления</a></li></ul><!--Contacts--><ul class="dg-map-firm-box"><li class="dg-map-firm-row dg-map-firm-contacts"><ul class="dg-map-contacts-list"><li class="dg-map-contacts-row dg-map-row-with-icon dg-map-row-website"><span name="dg-map-row-website-141265771881838"><a target="_blank" href="http://link.2gis.ru/24144380/webapi/20130801/project1/141265771881838/34Afep563BH24H6i7a82uvmt5A72G45842h344288B1B544J8b4901G4H7G37264?http://www.la-rose.ru">www.la-rose.ru</a></span></li><li class="dg-map-contacts-row dg-map-row-with-icon dg-map-row-email"><span name="dg-map-row-email-141265771881838"register_bc_url=http://stat.api.2gis.ru/?v=1.3&hash=3cA5ep563BH24H877b8duvmt5A72G4584ghA44288B1B544J8e4b01G4HBG37264><a href="mailto:info@la-rose.ru">info@la-rose.ru</a></span></li></ul></li><li class="dg-map-firm-row additional-addresses"><ul class="dg-map-contacts-list"><li class="dg-map-contacts-row dg-map-row-with-icon dg-map-row-phone"><span name="dg-map-row-phone-141265771881838">(383) 310-77-10</span></li><li class="dg-map-contacts-row dg-map-row-with-icon dg-map-row-email"><span name="dg-map-row-email-141265771881838"register_bc_url=http://stat.api.2gis.ru/?v=1.3&hash=33Adep563BH24H6g7e89uvmt5A72G4584Ahg44288B1B544J834701G4HBG37264><a href="mailto:sancity@la-rose.ru">sancity@la-rose.ru</a></span></li></ul></li></ul><!--Time Shedule--><ul class="dg-map-firm-box"><li class="dg-map-firm-row"><div class="dg-map-firm-schedule"><span class="dg-map-firm-schedule-clock opened"></span><div class="dg-map-firm-schedule-short">Ежедневно 10:00&ndash;22:00<span class="dg-map-work-info">Открыто</span></div></div></li></ul><!-- Flamp -->';
			//this._fullFirmEl.innerHTML = this._firmExpandedCache;
			//this._el.appendChild(this._fullFirmEl);
			this.options.ajax(this._id, function(data) {
				self._firmData = data[0];
				console.log("_expand data", data);
				var schedule = self._schedule.transform(data[0].schedule),
					forecast = self._schedule.forecast(schedule);
					console.log("schedule+forecast", schedule, forecast);
					var html = self.options.render(self.options.tmpls.fullFirm, {
						firm: data[0],
						schedule: schedule,
						dict: FirmCard.Schedule.dictionary,
						forecast: forecast,
					    dataHelper: FirmCard.DataHelper,
						// msgs: {},
						// self: {}
					});
					console.log("html expand", html);
					self._el.insertAdjacentHTML('beforeEnd', html);
			});
		} else {
			this._fullFirmEl.style.display = 'block';
		}
	}
};