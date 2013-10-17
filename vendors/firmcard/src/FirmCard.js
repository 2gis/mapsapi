var FirmCard = function (firm, options) {
    this._setOptions(options);
    this._firmContentObject = {};
    this._schedule = new FirmCard.Schedule({
        localLang: options.lang,
        dict: this.dict
    });

    this.render(firm);
};

FirmCard.prototype = {

    render: function (firmId) {
        if (!firmId) { return; }

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
                self._firmId = firmId;
                self._renderFirmCard();
                self._initEventHandlers();
            }
        });
    },

    _createFirmContainer: function () {
        var firm = document.createElement('div');
        firm.setAttribute('id', 'dg-map-firm-full-' + this._firmId);
        firm.setAttribute('class', 'dg-map-firm-full');

        return firm;
    },

    _renderFirmCard: function () {
        var firmCardBody,
            schedule,
            forecast,
            links,
            btns,
            data = this._firmData,
            container = this._container = this._createFirmContainer();

        this._footerContainer = document.createElement('div');

        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });
        forecast = this._schedule.forecast(schedule);

        firmCardBody = this.options.render(this.options.tmpls.body, {
            firm: data,
            schedule: schedule,
            dict: this.dict,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });

        links = this._fillHeaderLinks();

        btns = this._fillFooterButtons();

        //fill object for view render
        this._firmContentObject.header = this.options.render(this.options.tmpls.header, {'firmName': data.name, 'links': links});
        container.innerHTML = firmCardBody;
        this._firmContentObject.tmpl = container;
        this._footerContainer.innerHTML = this.options.render(this.options.tmpls.footer, {'btns': btns});
        this._firmContentObject.footer = this._footerContainer;

        this.options.onFirmReady && this.options.onFirmReady(this._firmContentObject);
    },

    _fillFooterButtons: function () {
        var btns = [];

        if (this.options.backBtn) {
            btns.push({ name: 'firmCard-back',
                        label: this.dict.t(this.options.lang, 'btnBack'),
                        icon: true
            });
        }
        // console.log(this.dict);
        btns.push({ name: 'goto',
                    label: this.dict.t(this.options.lang, 'btnFindWay'),
                    icon: true,
                    href: this.options.gotoUrl
        });

        if (this._firmData.geo.entrances) {
            btns.push({ name: 'show-entrance',
                        label: this.dict.t(this.options.lang, 'btnEntrance'),
                        icon: true
            });
        }

        return btns;
    },

    _fillHeaderLinks: function () {
        var links = [], reviewData = this._firmData.reviews, booklet = this._firmData.booklet;

        if (reviewData && reviewData.is_allowed_to_show_reviews) {
            links.push({
                name: 'flamp_reviews',
                label: [
                    this.dict.t(this.options.lang, 'stars'),
                    reviewData.rating,
                    reviewData.review_count,
                    this.dict.t(this.options.lang, 'linkReviews', reviewData.review_count)
                ].join(' ')
            });
        }

        if (booklet && booklet.url) {
            links.push({name: 'booklet',
                        href: this._firmData.booklet.url,
                        label: this.dict.t(this.options.lang, 'linkBooklet')});
        }

        return links;
    },

    _onFooterBtnClick: function (e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        if (target && target.nodeName === 'A') {
            if (target.id === 'popup-btn-firmCard-back') {
                this.options.backBtn();
            } else if (target.id ===  'popup-btn-show-entrance') {
                var ent = new this.options.showEntrance({'vectors': this._firmData.geo.entrances[0].vectors});
                ent.addTo(this.options.map).show();
            }
        }
    },

    _onToggleSchedule: function (e) {
        var schedule = this._container.querySelector('.schedule__table'),
            display = 'block',
            target = e.target || e.srcElement;

        if (!schedule) { return; }

        if (target && target.nodeName === 'DIV' && target.className.indexOf('schedule__today') !== -1) {
            if (schedule.style.display === 'block') {
                display = 'none';
            }
            schedule.style.display = display;
        }
    },

    _initEventHandlers: function () {

        var eventName = this._hasTouch() ? 'touchend' : 'click',
            footer = this._footerContainer;

        //TODO:  do it crossbrowser!
        if (footer.addEventListener) {
            footer.addEventListener(eventName, this._onFooterBtnClick.bind(this), false);
            this._container.addEventListener(eventName, this._onToggleSchedule.bind(this), false);
        } else {
            footer.attachEvent('on' + eventName, this._onFooterBtnClick);
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
