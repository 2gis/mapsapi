var FirmCard = function (firm, options) {

    options = options || {};
    this._firmContainer = null;
    this._fullFirmEl = null;
    this._firmId = firm;
    options.lang = options.lang || 'ru';
    this._setOptions(options);
    this._schedule = new FirmCard.Schedule({
        localLang : options.lang
    });
};

FirmCard.prototype = {

    toggleSchedule: function () {
        var schedule = this._fullFirmEl.querySelector('.schedule__table'),
            display = 'block';
        if (!schedule) { return; }

        if (schedule.style.display === 'block') {
            display = 'none';
        }
        schedule.style.display = display;
    },

    render: function () {
        this._renderCardById(this._firmId);

        return {tmpl: this._firmContainer};
    },

    _renderCardById: function () {
        var self = this;

        this._createContainer();
        this.options.ajax(this._firmId, function (data) {
            if (data !== 'undefined') {
                //self._firmData = data[0];
                //self._firmContainer.innerHTML = self._getShortContent();
                self._renderFirmCard.call(self, data[0]);
            }
        });
    },

    _createContainer: function () {
        this._firmContainer = document.createElement('div');
        this._firmContainer.setAttribute('id', 'dg-map-firm-' + this._firmId);
    },

    _createFullFirmEl: function (html) {
        this._fullFirmEl = document.createElement('div');
        this._fullFirmEl.setAttribute('id', 'dg-map-firm-full-' + this._firmId);
        this._fullFirmEl.setAttribute('class', 'dg-map-firm-full');
        this._fullFirmEl.style.display = 'block';
        this._fullFirmEl.innerHTML = html;
    },

    _renderFirmCard: function (data) {
        var html,
            schedule,
            forecast;


        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });

        forecast = this._schedule.forecast(schedule);

        //render firm body
        html = this.options.render(this.options.tmpls.fullFirm, {
            firm: data,
            schedule: schedule,
            dict: FirmCard.Schedule.dictionary,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });

        this._createFullFirmEl(html);


        this._firmContainer.appendChild(this._fullFirmEl);
        //this.options.callback && this.options.callback(this._renderedFirm);
    },

    /*_getShortContent: function () {
        return this.options.render(this.options.tmpls.shortFirm, {
            name: this._firmData.name,
            id: this._firmId
        });
    },*/

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
