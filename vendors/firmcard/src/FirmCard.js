var FirmCard = function (firm, options) {
    var type;

    options = options || {};
    this._el = null;
    this._fullFirmEl = null;
    this._isExpanded = false;

    options.lang = options.lang || 'ru';
    this._setOptions(options);
    this._schedule = new FirmCard.Schedule({
        localLang : options.lang
    });
    type = Object.prototype.toString.call(firm);

    if ('[object Object]' === type) {
        this._firmData = firm;
        this._id = firm.id.split('_').shift();
    } else {
        this._renderFullCardById(firm);
    }
};

FirmCard.prototype = {

    getContainer: function () {
        return this._el;
    },

    getId: function () {
        return this._id;
    },

    getSchedule: function () {
        return this._schedule;
    },

    toggle: function () {
        var display,
            fullFirmElExists = !!this._fullFirmEl;

        if (!fullFirmElExists) {
            this._expand(fullFirmElExists);
        } else {
            display = this._fullFirmEl.style.display;
            display === 'none' ? this._expand(fullFirmElExists) : this._collapse();
            if (this.options.onToggleCard) {
                this.options.onToggleCard(this.getContainer(), this.isExpanded());
            }
        }
    },

    toggleSchedule: function () {
        var schedule = this._fullFirmEl.querySelector('.schedule__table'),
            display = 'block';
        if (!schedule) return;
        if (schedule.style.display === 'block') {
            display = 'none';
        }
        schedule.style.display = display;
        if (this.options.onToggleCard) {
            this.options.onToggleCard(this.getContainer(), this.isExpanded());
        }
    },

    render: function () {
        var html;

        if (!this._el) {
            html = this._getShortContent();
            this._createEl(html);
        }

        return this._el;
    },

    isExpanded: function () {
        return this._isExpanded;
    },

    _renderFullCardById: function (firmId) {
        var self = this,
            loader;

        this._id = firmId;
        loader = this.options.render(this.options.tmpls.loader);
        this._createEl(loader);
        this.options.ajax(firmId, function (data) {
            if (data !== 'undefined') {
                self._firmData = data[0];
                self._el.innerHTML = self._getShortContent();
                self.toggle.call(self);
            }
        });
    },

    _collapse: function () {
        this._fullFirmEl.style.display = 'none';
        this._isExpanded = false;
    },

    _createEl: function (html) {
        this._el = document.createElement('div');
        this._el.setAttribute('id', 'dg-map-firm-' + this._id);
        this._el.setAttribute('class', 'dg-map-firm');
        this._el.innerHTML = html;
    },

    _createFullFirmEl: function (html) {
        this._fullFirmEl = document.createElement('div');
        this._fullFirmEl.setAttribute('id', 'dg-map-firm-full-' + this._id);
        this._fullFirmEl.setAttribute('class', 'dg-map-firm-full');
        this._fullFirmEl.style.display = 'block';
        this._fullFirmEl.innerHTML = html;
    },

    _expand: function (fullFirmElExists) {
        var self = this;

        if (!fullFirmElExists) {
            var loaderHtml = this.options.render(this.options.tmpls.loader);
            this._el.insertAdjacentHTML('beforeend', loaderHtml);
            this.options.ajax(this._id, function (data) {
                if (data !== 'undefined') {
                    self._renderFullCard.call(self, data[0]);
                    self._el.removeChild(document.getElementById('dg-popup-firm-loading'));
                    if (self.options.onToggleCard) {
                        self.options.onToggleCard(self.getContainer(), self.isExpanded());
                    }
                }
            });
        } else {
            this._fullFirmEl.style.display = 'block';
        }
        this._isExpanded = true;
    },

    _renderFullCard: function (data) {
        var html,
            schedule,
            forecast;

        this._firmData = data;
        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });
        forecast = this._schedule.forecast(schedule);
        html = this.options.render(this.options.tmpls.fullFirm, {
            firm: data,
            schedule: schedule,
            dict: FirmCard.Schedule.dictionary,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });

        this._createFullFirmEl(html);


        this._el.appendChild(this._fullFirmEl);
        this.options.callback && this.options.callback(this._el);
        this._isExpanded = true;
    },

    _getShortContent: function () {
        return this.options.render(this.options.tmpls.shortFirm, {
            name: this._firmData.name,
            id: this._id
        });
    },

    _setOptions: function (options) {
        var option;

        this.options = this.options || {};

        for (option in options) {
            if (options.hasOwnProperty(option)) {
                this.options[option] = options[option];
            }
        }
    },
};
