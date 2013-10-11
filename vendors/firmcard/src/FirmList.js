(function () {
    FirmCard.List = function (options, firms) {
        this._firms = {}; // {'firmID': firmObj}
        this._defaultFirm = null;
        this._onReady = null;
        this._addOptions = {
            ajax: function () {},
            render: function () {},
            //onToggleCard: function () {},
            lang: 'ru',
            tmpls: {}
        };
        this._container = options && options.container || document.createElement('ul');
        this._container.setAttribute('class', 'dg-map-infocard-firmlist');
        this._innerFirmsList = document.createDocumentFragment();

        this._newPageFirms = {};

        this._eventHandlersInited = false;

        this._setOptions(options);
        this.renderList(firms);
    };

    FirmCard.List.prototype = {

        renderList : function (firms) {
            //var firms = this._newPageFirms;
            if (!this._eventHandlersInited) { this._initEventHandlers(); }
            /*for (var firm in firms)
                if (firms.hasOwnProperty(firm)) {
                    this._innerFirmsList.appendChild(this._renderFirm(firm));
                }
            this._container.appendChild(this._innerFirmsList);
            this._newPageFirms = {};*/
            var i, l, firm;
            for (i = 0, l = firms.length; i < l; i++) {
                firm = {
                    name: firms[i].name,
                    id: firms[i].id.split('_').slice(0, 1)
                };

                this._container.insertAdjacentHTML('beforeend',
                                                   this._addOptions.render(this._addOptions.tmpls.firmlistItem, {'firm': firm}));
            }

            return this._container;
        },

        /*addFirms : function (firms) {
            if (firms) {
                if (this._isArray(firms)) {
                    for (var i = 0, l = firms.length; i < l; i++) {
                        this._addFirm(firms[i]);
                    }
                } else {
                    this._addFirm(firms);
                }
            }
        },

        removeFirms : function (ids) {
            if (ids) {
                if (this._isArray(ids)) {
                    for (var i = 0, l = ids.length; i < l; i++) {
                        this._removeFirm(ids[i]);
                    }
                } else {
                    this._removeFirm(ids);
                }
            }
        },



        setLang : function (newLang) {
            this._addOptions.lang = newLang;
        },

        getLang : function () {
            return this._addOptions.lang;
        },

        toggleFirm : function (id) {
            if (this._firms[id]) {
                this._firms[id].toggle();
            }
        },

        toggleSchedule: function (id) {
            if (this._firms[id]) {
                this._firms[id].toggleSchedule();
            }
        },

        getContainer: function () {
            return this._container;
        },





        _removeFirm: function (id) {
            var firmCard = this._firms[id] ? this._firms[id].getContainer() : false;
            firmCard ? this._container.removeChild(firmCard) : false;
            this._firms[id] ? delete this._firms[id] : false;
        },

        _isArray: function (obj) {
            return {}.toString.call(obj) === '[object Array]';
        },

        _prepareList: function (firms) {
            var self = this;

            if (this._defaultFirm) {
                //firms.unshift(this._defaultFirm);
                firms = [];
                firms.push(this._defaultFirm);
            }

            this.addFirms(firms);
            setTimeout(self._onReady, 1);   // We need setTimeout here because _prepareList was called in constructor and would finish first
        },



        _createFirm: function (firmData) {
            return new FirmCard (firmData, this._addOptions);
        },



        _renderFirm: function (id) {
            return this._firms[id] ? this._firms[id].render() : null;
        },

        _addFirm: function (firmData) {
            var id = firmData.id ? firmData.id.split('_').slice(0, 1) : firmData;

            if (!(id in this._firms)) {
                firmObject = this._createFirm(firmData);
                this._firms[id] = firmObject;

                this._newPageFirms[id] = firmObject;
            }
        }*/
        _initEventHandlers : function () {
            var self = this,
                eventName = this._hasTouch() ? 'touchend' : 'click';

            this._eventHandlersInited = true;
            var onClickHandler =  function (e) {
                var e = e || window.event,
                target = e.target || e.srcElement;

                if (target && target.nodeName === 'SPAN') {
                    if (target.className.indexOf('building-callout__list-item-link') !== -1) {
                        if (target.id) {
                            self._firmCard.render(target.id);
                        }
                    }
                } /*else if (target && target.nodeName === 'DIV' || target.nodeName === 'SPAN') {
                    if (target.className.indexOf('schedule__today') !== -1) {
                        var wrapper = target.parentNode;
                        while (wrapper.className.indexOf('dg-map-firm-full') === -1) {
                            wrapper = wrapper.parentNode;
                        }
                        var id = wrapper.id.split('-').pop();
                        self.toggleSchedule(id);
                    }
                }*/
            };

            if (this._container.addEventListener) {
                this._container.addEventListener(eventName, onClickHandler);
            } else {
                this._container.attachEvent('on' + eventName, onClickHandler);
            }
        },

        _hasTouch: function () {
            return (('ontouchstart' in window) ||       // html5 browsers
                    (navigator.maxTouchPoints > 0) ||   // future IE
                    (navigator.msMaxTouchPoints > 0));  // current IE10
        },

        clearList : function () {
            this._newPageFirms = {};
            this._firms = {};
            this._clearContainer();
        },

        _clearContainer: function () {
            var container = this._container;

            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }
        },

        _setOptions: function (options) {
            options || (options = {});

            //if ('onReady' in options) { this._onReady = options.onReady; }
            if ('defaultFirm' in options) { this._defaultFirm = options.defaultFirm; }
            if ('firmsOnPage' in options) { this._firmsOnPage = options.firmsOnPage; }
            if ('firmCard' in options) { this._firmCard = options.firmCard; }
            //if ('onToggleCard' in options) { this._addOptions.onToggleCard = options.onToggleCard; }
            if ('ajax' in options) { this._addOptions.ajax = options.ajax; }
            if ('render' in options) { this._addOptions.render = options.render; }
            if ('tmpls' in options) { this._addOptions.tmpls = options.tmpls; }
            if ('lang' in options) { this._addOptions.lang = options.lang; }
            if ('timezoneOffset' in options) { this._addOptions.timezoneOffset = options.timezoneOffset; }
        }
    };
})();
