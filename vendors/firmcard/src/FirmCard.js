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
            var data = res.result.items;
            if (data !== 'undefined') {
                self._firmData = data[0];

                // Support for old WebAPI format.
                // TODO: remove this call after WebAPI release
                self._convertWebsite();

                self._firmId = firmId;
                self._renderFirmCard();
                self._toggleEventHandlers();
            }
        }, function (error) {
            self._renderError();
        });
    },

    _createFirmContainer: function () {
        var firm = document.createElement('div');
        firm.setAttribute('id', 'dg-map-firm-full-' + this._firmId);
        firm.setAttribute('class', 'dg-map-firm-full');

        return firm;
    },

    _getPaymentTypes: function (data) {
        var result = [],
            groupName = 'general_payment_type';

        if (!data.attribute_groups) {
            return result;
        }

        data.attribute_groups.forEach(function (group) {
            if (group.name) {
                return;
            }

            group.attributes.forEach(function (attr) {
                if (attr.tag.substring(0, groupName.length) === groupName) {
                    result.push(attr.name);
                }
            });
        });

        return result;
    },

    _groupRubrics: function (data) {
        var result = {
            primary: [],
            additional: []
        };

        if (!data.rubrics || !data.rubrics.length) {
            return result;
        }

        data.rubrics.forEach(function (rubric) {
            result[rubric.kind].push(rubric);
        });

        return result;
    },

    // Support for old WebAPI format.
    // TODO: remove this function after WebAPI release
    _convertWebsite: function () {
        if (!this._firmData.contact_groups) {
            return;
        }

        this._firmData.contact_groups.forEach(function (group) {
            if (!group.contacts) {
                return;
            }

            group.contacts.forEach(function (contact) {
                if (contact.type != 'website') {
                    return;
                }

                if (!contact.url) {
                    contact.url = contact.value;
                }
            });
        });
    },

    _renderFirmCard: function () {
        var firmCardBody, schedule, forecast, links, btns, paymentTypes, rubrics,
            data = this._firmData,
            container = this._container = this._createFirmContainer();

        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });

        forecast = this._schedule.forecast(schedule);

        paymentTypes = this._getPaymentTypes(data);
        rubrics = this._groupRubrics(data);

        firmCardBody = this._buildFirmCardBody(
            this._getConfigFirmCardBody(data, schedule, forecast, paymentTypes, rubrics)
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

    _renderError: function() {
        this._firmContentObject.header = this.options.render('popupHeader', {
            title: this.options.t('apiErrorTitle')
        });

        this._firmContentObject.tmpl = this.options.t('apiErrorBody');

        if (this.options.onFirmReady) {
            this.options.onFirmReady(this._firmContentObject);
        }
    },

    _getConfigFirmCardBody: function (data, schedule, forecast, attributes, rubrics) {
        return [
            {
                tmpl: 'firmCardAddr',
                data: {
                    address: data.address_name,
                    comment: data.address_comment
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
                    rubrics: rubrics
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

        if (this.options.showRouteSearch) {
            btns.push({ name: 'goto',
                        label: this.dict.t(this.options.lang, 'btnFindWay'),
                        icon: true,
                        href: this.options.gotoUrl
            });
        }

        if (
            this._firmData.links &&
                this._firmData.links.entrances &&
                this.options.showEntrance
        ) {
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
            booklet,
            link;

        if (this._firmData.external_content) {
            this._firmData.external_content.forEach(function (el) {
                if (el && el.type == 'booklet') {
                    booklet = el;
                }
            });
        }

        if (reviewData && reviewData.is_reviewable) {
            links.push({
                name: 'flamp_stars',
                width: reviewData.rating * 20
            });
            links.push({
                name: 'flamp_reviews',
                label: this.dict.t(this.options.lang, 'linkReviews', reviewData.review_count ? reviewData.review_count : 0),
                href: FirmCard.DataHelper.getFlampUrl(this._firmId)
            });
        }

        // Retrieve photo data from external content block
        var photos;
        var externalContent = this._firmData.external_content;

        for (var i = 0; i < externalContent.length; i++) {
            if (
                externalContent[i].type == 'photo_album' &&
                externalContent[i].subtype == 'common'
            ) {
                photos = externalContent[i];
                break;
            }
        }

        if (!this.options.isMobile && photos && photos.count && this.options.showPhotos) {
            link = L.Util.template(DG.config.photosLink, {
                'id': this._firmId,
                'domain': this.options.domain
            });

            links.push({name: 'photos',
                href: link,
                label: this.dict.t(this.options.lang, 'linkPhoto', photos.count)
            });
        }

        if (!this.options.isMobile && booklet && booklet.url && this.options.showBooklet) {
            links.push({
                name: 'booklet',
                href:  booklet.url,
                label: this.dict.t(this.options.lang, 'linkBooklet')
            });
        }


        return links;
    },

    _events: {
        'dg-popup__button_name_firm-card-back': function() {
            this.options.backBtn();
            this._toggleEventHandlers(true);
        },
        'dg-popup__button_name_show-entrance': function() {
            var ent = new this.options.showEntrance({'vectors': this._firmData.links.entrances[0].geometry.vectors});
            ent.addTo(this.options.map);
            ent.fitBounds();
            this._toggleEventHandlers(true);
        },
        'dg-schedule__today': function() {
            this._onToggleSchedule();
        }
    },

    _toggleEventHandlers: function (flag) {
        this.options.popup[flag ? 'off' : 'on']('click', this._onClick, this);
        this.options.map[flag ? 'off' : 'on']('popupclose', this._onClose, this);
    },

    _onClick: function (e) {
        var target = e.originalEvent.target;

        for (var eventClass in this._events) {
            if (this._events.hasOwnProperty(eventClass) && target.className.indexOf(eventClass) > -1) {
                DG.DomEvent.preventDefault(e.originalEvent);
                this._events[eventClass].call(this, target);
                return;
            }
        }
    },

    _onClose: function (e) {
        this._toggleEventHandlers(true);
    },

    _onToggleSchedule: function () {
        var schedule = this._container.querySelector('.dg-schedule__table'),
            forecast = this._container.querySelector('.dg-schedule__now'),
            target = this._container.querySelector('.dg-schedule__today'),
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
