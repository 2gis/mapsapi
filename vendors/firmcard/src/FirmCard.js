var FirmCard = function (firm, options) {
    this._setOptions(options);
    this._firmContentObject = {};
    this._schedule = new FirmCard.Schedule({
        localLang: this.options.lang,
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
        } else {
            this._toggleEventHandlers();
        }

        return this._firmContentObject;
    },

    getSchedule: function () {
        return this._schedule;
    },

    getContainer: function () {
        return this._container;
    },

    _renderCardById: function (firmId) {
        var self = this;

        this.options.ajax(firmId).then(function (res) {
            if (!res) { return false; }
            var data = res.result.data;
            if (data !== 'undefined') {
                self._firmData = data[0];
                self._firmId = firmId;
                self._renderFirmCard();
                self._toggleEventHandlers();
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
        var firmCardBody, schedule, forecast, links, btns, attributes,
            data = this._firmData,
            container = this._container = this._createFirmContainer();


        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });
        forecast = this._schedule.forecast(schedule);

        if (!!(data.attributes && data.attributes.general && data.attributes.general.items)) {
            data.attributes.general.items ? attributes = data.attributes.general.items : attributes = [];
        }

        firmCardBody = this._buildFirmCardBody(
            this._getConfigFirmCardBody(data, schedule, forecast, attributes)
        );

        links = this._fillHeaderLinks();

        btns = this._fillFooterButtons();

        //fill object for view render
        this._firmContentObject.header = this.options.render('firmCardHeader', {'firmName': data.name, 'links': links});
        container.innerHTML = firmCardBody;
        this._firmContentObject.tmpl = container;
        if (btns.length) {
            this._footerContainer = document.createElement('div');

            this._footerContainer.innerHTML = this.options.render('popupFooterBtns', {'btns': btns});
            this._firmContentObject.footer = this._footerContainer;
        }

        if (this.options.onFirmReady) {
            this.options.onFirmReady(this._firmContentObject);
        }
    },

    _getConfigFirmCardBody: function (data, schedule, forecast, attributes) {
        return [
            {
                tmpl: 'firmCardAddr',
                data: {
                    data: data.geo
                }
            },
            {
                tmpl: 'firmCardContacts',
                data: {
                    groups: data.contact_groups
                }
            },
            {
                tmpl: 'firmCardSchedule',
                data: {
                    schedule: schedule,
                    forecast: forecast
                }
            },
            {
                tmpl: 'frimCardPayments',
                data: {
                    payments: attributes
                }
            },
            {
                tmpl: 'firmCardRubric',
                data: {
                    rubrics: data.rubrics
                }
            }
        ];
    },

    _buildFirmCardBody: function (parts) {
        var self = this;
        return parts.reduce(function (body, item) {
            var html = self.options.render(item.tmpl, item.data);
            return body + html;
        }, '');
    },

    _fillFooterButtons: function () {
        var btns = [];

        if (this.options.backBtn) {
            btns.push({ name: 'firm-card-back',
                        label: this.dict.t(this.options.lang, 'btnBack'),
                        icon: true
            });
        }
        //UNCOMMENT WHEN ONLINE 4 WILL BE READY
       /* btns.push({ name: 'goto',
                    label: this.dict.t(this.options.lang, 'btnFindWay'),
                    icon: true,
                    href: this.options.gotoUrl
        });*/

        if (this._firmData.geo.entrances && this.options.showEntrance) {
            btns.push({ name: 'show-entrance',
                        label: this.dict.t(this.options.lang, 'btnEntrance'),
                        icon: true
            });
        }

        return btns;
    },

    _fillHeaderLinks: function () {
        var links = [],
            reviewData = this._firmData.reviews,
            photos = this._firmData.photos,
            booklet = this._firmData.booklet,
            link;

        if (reviewData && reviewData.is_allowed_to_show_reviews) {
            links.push({
                name: 'flamp_stars',
                width: reviewData.rating * 20
            });
            links.push({
                name: 'flamp_reviews',
                label: this.dict.t(this.options.lang, 'linkReviews', reviewData.review_count),
                href: FirmCard.DataHelper.getFlampUrl(this._firmId)
            });
        }

        if (!this.options.isMobile && photos && photos.length && this.options.showPhotos) {
            link = L.Util.template('__PHOTOS_LINK__',
                {
                    'id': this._firmId
                });

            links.push({name: 'photos',
                        href: link,
                        label: this.dict.t(this.options.lang, 'linkPhoto', photos.length)
            });
        }

        if (!this.options.isMobile && booklet && booklet.url && this.options.showBooklet) {
            links.push({name: 'booklet',
                        href:  booklet.url,
                        label: this.dict.t(this.options.lang, 'linkBooklet')});
        }


        return links;
    },

    _events: {
        'dg-popup__button_name_firm-card-back': function() {
            this.options.backBtn();
            this._toggleEventHandlers(true);
        },
        'dg-popup__button_name_show-entrance': function() {
            var ent = new this.options.showEntrance({'vectors': this._firmData.geo.entrances[0].vectors});
            ent.addTo(this.options.map).show();
        },
        'dg-schedule__today': function(target) {
            this._onToggleSchedule(target);
        }
    },

    _toggleEventHandlers: function (flag) {
        this.options.popup[flag ? 'off' : 'on']('click', this._onClick, this);      
    },

    _onClick: function (e) {
        var target = e.originalEvent.target;

        for (var eventClass in this._events) {
            if (this._events.hasOwnProperty(eventClass) && target.className.indexOf(eventClass) > -1) {
                this._events[eventClass].call(this, target);
                return;
            }
        }
    },

    _onToggleSchedule: function (target) {
        var schedule = this._container.querySelector('.dg-schedule__table'),
            forecast = this._container.querySelector('.dg-schedule__now'),
            showClass = ' dg-schedule__today_shown_true';

        if (!schedule) { return; }

        if (schedule.style.display === 'block') {
            schedule.style.display = 'none';
            forecast.style.display = 'block';
            target.className = target.className.replace(showClass, '');
        } else {
            forecast.style.display = 'none';
            schedule.style.display = 'block';
            target.className += showClass;
        }

        if (this.options.onToggle) {
            this.options.onToggle();
        }
    },

    _setOptions: function (options) {
        var option,
            options = options || {};

        this.options = options;
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
