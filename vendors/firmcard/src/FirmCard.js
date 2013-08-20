var FirmCard = function(firmData, options) {
	var render = options.render,
		ajax = options.ajax;
		//scheduleTransformed,
		//tmpl;

	this._id = firmData.firm.id;
	this._container = document.createElement('li');
	this._container.setAttribute('id', 'dg-map-firm-' + this._id);
	this._container.innerHTML = firmData.firm.name;
	//this._schedule = new FirmCard.Schedule(options);
	//scheduleTransformed = this._schedule.transform( firm.schedule );
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

		/*if (type === 'firm') {
			id = "dg-map-firm-full-";
		} else {
			id = 'dg-map-weekly-schedule-';
		}*/
		id = 'dg-map-firm-' + this._id;

		el = document.getElementById(id);
		display = el.style.display;
		display === 'none' ? this._expand(el) : this._collapse(el);
	},

	render: function() {
		// launch project rendering function
		return this._container;
	},

	_collapse: function(el) {
		el.style.display = 'none';
	},

	_expand: function(el) {
		//make Ajax request or get firmData from cache
		el.style.display = 'block';
	}
};