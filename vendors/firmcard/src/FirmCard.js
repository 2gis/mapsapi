var FirmCard = function (firm, options) {

    this._setOptions(options);
    this._firmContentObject = {};
    this._schedule = new FirmCard.Schedule({
        localLang: options.lang
    });

    this.render(firm);
};

FirmCard.prototype = {

    /*toggleSchedule: function () {
        var schedule = this._fullFirmEl.querySelector('.schedule__table'),
            display = 'block';
        if (!schedule) { return; }

        if (schedule.style.display === 'block') {
            display = 'none';
        }
        schedule.style.display = display;
    },*/

    render: function (firmId) {

        if (firmId && firmId !== this._firmId) {
            this._firmContentObject = {};
            this._renderCardById(firmId);
        }

        return this._firmContentObject;
    },

    _renderCardById: function (firmId) {
        var self = this;

        this.options.ajax(firmId, function (data) {
            if (data !== 'undefined') {
                self._renderFirmCard.call(self, data[0]);
                self._firmId = firmId;
            }
        });
    },

    _renderFirmCard: function (data) {
        var firmCardBody,
            schedule,
            forecast,
            links,
            btns;

        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });
        forecast = this._schedule.forecast(schedule);

        firmCardBody = this.options.render(this.options.tmpls.body, {
            firm: data,
            schedule: schedule,
            dict: FirmCard.Schedule.dictionary,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });

        //fill header links
        links = this._fillHeaderLinks(data);

        btns = this._fillFooterButtons();

        this._firmContentObject.header = this.options.render(this.options.tmpls.header, {'firmName': data.name, 'links': links});
        this._firmContentObject.tmpl = firmCardBody;
        this._firmContentObject.footer = this.options.render(this.options.tmpls.footer, {'btns': btns});
        this._firmContentObject.isRendered = true;

        this.options.callback && this.options.callback(this._firmContentObject);
    },

    _fillFooterButtons: function () {
        return [
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
    },

    _fillHeaderLinks: function (data) {
        var links = [], reviewData = data.reviews, booklet = data.booklet;

        if (reviewData && reviewData.is_allowed_to_show_reviews) {
            links.push({name: 'flamp_reviews',
                       label: 'stars ' + reviewData.rating + ' ' + reviewData.review_count + ' отзывов'});
        }

        if (booklet && booklet.url) {
            links.push({name: 'booklet',
                        href: data.booklet.url,
                        label: 'Подробнее'});
        }

        return links;
    },

    _setOptions: function (options) {
        var option;

        this.options = this.options || {};
        options.lang = options.lang || 'ru';

        for (option in options) {
            if (options.hasOwnProperty(option)) {
                this.options[option] = options[option];
            }
        }
    },
};
