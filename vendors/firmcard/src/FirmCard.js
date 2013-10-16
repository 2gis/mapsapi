var FirmCard = function (firm, options) {
    this._setOptions(options);
    this._firmContentObject = {};
    this._schedule = new FirmCard.Schedule({
        localLang: options.lang
    });
    this._footerContainer = document.createElement('div');
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
        if (!firmId) { return; }

        this._initEventHandlers();

        if (firmId !== this._firmId) {
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
        this._footerContainer.innerHTML = this.options.render(this.options.tmpls.footer, {'btns': btns});
        this._firmContentObject.footer = this._footerContainer;

        this.options.onFirmReady && this.options.onFirmReady(this._firmContentObject);
    },

    _fillFooterButtons: function () {
        var btns = [];

        if (this.options.backBtn) {
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

    _initEventHandlers: function () {

        var self = this,
            eventName = this._hasTouch() ? 'touchend' : 'click';

        var onClickHandler =  function (e) {
            var e = e || window.event,
            target = e.target || e.srcElement;

            if (target && target.nodeName === 'A') {
                if (target.id === 'popup-btn-firmCard-back') {
                    self.options.backBtn();
                } else if (target.id ===  'popup-btn-show-entrance') {
                    var ent = new self.options.showEntrance({'vectors': self._firmData.geo.entrances[0].vectors});
                    ent.addTo(self.options.map).show();
                }
            }
        };

        if (this._footerContainer.addEventListener) {
            this._footerContainer.addEventListener(eventName, onClickHandler);
        } else {
            this._footerContainer.attachEvent('on' + eventName, onClickHandler);
        }
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

    _hasTouch: function () {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
};
