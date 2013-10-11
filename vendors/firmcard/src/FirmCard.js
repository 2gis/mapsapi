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
                self._firmData = data[0];
                self._renderFirmCard();
                self._firmId = firmId;
            }
        });
    },

    _renderFirmCard: function () {
        var firmCardBody,
            schedule,
            forecast,
            links,
            btns,
            data = this._firmData;

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
        links = this._fillHeaderLinks();

        btns = this._fillFooterButtons();

        this._firmContentObject.header = this.options.render(this.options.tmpls.header, {'firmName': data.name, 'links': links});
        this._firmContentObject.tmpl = firmCardBody;
        this._firmContentObject.footer = this.options.render(this.options.tmpls.footer, {'btns': btns});

        this.options.callback && this.options.callback(this._firmContentObject);

        if (!this._eventHandlersInited) { this._events(); }
    },

    _fillFooterButtons: function () {
        var btns = [];

        if (!this.options.defaultFirm) {
            btns.push({ name: 'firmCard-back',
                        label: 'Назад',
                        icon: true
            });
        }
        btns.push({ name: 'goto',
                    label: 'Проехать сюда',
                    icon: true,
                    href: this.options.gotoUrl
        });

        if (this._firmData.geo.entrances) {
            btns.push({ name: 'show-entrance',
                        label: 'Найти вход',
                        icon: true
            });
        }

        return btns;
    },

    _fillHeaderLinks: function () {
        var links = [], reviewData = this._firmData.reviews, booklet = this._firmData.booklet;

        if (reviewData && reviewData.is_allowed_to_show_reviews) {
            links.push({name: 'flamp_reviews',
                       label: 'stars ' + reviewData.rating + ' ' + reviewData.review_count + ' отзывов'});
        }

        if (booklet && booklet.url) {
            links.push({name: 'booklet',
                        href: this._firmData.booklet.url,
                        label: 'Подробнее'});
        }

        return links;
    },

    _events: function () {
        var self = this,
            data = this._firmData,
            // TODO Search inside card
            back = document.querySelector('#popup-btn-firmCard-back'),
            entrance = document.querySelector('#popup-btn-show-entrance');

        this._eventHandlersInited = true;

        back && back.addEventListener('click', function () {
            self.options.backBtn();
        });

        entrance && entrance.addEventListener('click', function () {
            if (data.geo.entrances) {
                var ent = new self.options.showEntrance({'vectors': data.geo.entrances[0].vectors});
                ent.addTo(self.options.map).show();
            }

        });
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
