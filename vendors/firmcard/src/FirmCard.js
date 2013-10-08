var FirmCard = function (firm, options) {

    options = options || {};
    this._firmContainer = {};
    this._fullFirmEl = null;
    this._firmId = firm;
    options.lang = options.lang || 'ru';
    this._setOptions(options);
    this._schedule = new FirmCard.Schedule({
        localLang : options.lang
    });

    this._renderCardById(this._firmId);
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

    _renderCardById: function () {
        var self = this;

        this.options.ajax(this._firmId, function (data) {
            if (data !== 'undefined') {
                self._renderFirmCard.call(self, data[0]);
            }
        });
    },

    _renderFirmCard: function (data) {
        var firmCardBody,
            schedule,
            forecast,
            btns;

        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });

        forecast = this._schedule.forecast(schedule);
        //render firm body
        firmCardBody = this.options.render(this.options.tmpls.body, {
            firm: data,
            schedule: schedule,
            dict: FirmCard.Schedule.dictionary,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });

        //render footer
        btns = [
            {
                name: 'back',
                label: 'Назад'
            },
            {
                name: 'findway',
                label: 'Проехать сюда'
            },
            {
                name: 'entrance',
                label: 'Найти вход'
            }
        ];

        this._firmContainer.header = this.options.render(this.options.tmpls.header, {'addressWithoutIndex': data.name});
        this._firmContainer.tmpl = firmCardBody;
        this._firmContainer.footer = this.options.render(this.options.tmpls.footer, {'btns': btns});

        this.options.callback && this.options.callback(this._firmContainer);
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
