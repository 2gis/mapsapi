/* global
    FirmCard: false
*/
(function () {
    FirmCard.List = function (firms, options) {
        this._firms = {}; // {'firmID': firmDomObj}
        this._setOptions(options);

        this._container = options && options.container || document.createElement('ul');
        this._container.setAttribute('class', 'building-callout__list');

        this._eventHandlersInited = false;
        this._firmCard = this._createFirm();
        this.renderList(firms);
    };

    FirmCard.List.prototype = {

        renderList: function (firms) {
            if (firms) {
                if (!this._eventHandlersInited) {
                    this._initEventHandlers();
                }

                this.addFirms(firms);
            }
            if (this._onListReady) {
                this._onListReady(this._container);
            }

            return this._container;
        },

        addFirms: function (firms) {
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

        removeFirms: function (ids) {
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

        setLang: function (newLang) {
            this._addOptions.lang = newLang;
        },

        getLang: function () {
            return this._addOptions.lang;
        },

        getContainer: function () {
            return this._container;
        },

        clearList : function () {
            this._firms = {};
            this._clearContainer();
        },

        _removeFirm: function (id) {
            var firmCard = this._firms[id] ? this._firms[id].getContainer() : false;
            firmCard ? this._container.removeChild(firmCard) : false;
            this._firms[id] ? delete this._firms[id] : false;
        },

        _addFirm: function (firmData) {
            var domFirm,
                firm;

            firm = {
                name: firmData.name,
                id: firmData.id.split('_').slice(0, 1)
            };
            if (!(firm.id in this._firms)) {
                domFirm = this._createListItem();
                domFirm.insertAdjacentHTML('beforeend',
                                            this._addOptions.render(this._addOptions.tmpls.firmlistItem, {'firm': firm}));

                this._firms[firm.id] = domFirm;
                this._container.appendChild(domFirm);
            }
        },

        _createListItem: function () {
            var item = document.createElement('li');
            item.setAttribute('class', 'building-callout__list-item');

            return item;
        },

        _isArray: function (obj) {
            return {}.toString.call(obj) === '[object Array]';
        },

        _createFirm: function (firmData) {
            return new FirmCard(firmData, this._addOptions);
        },

        _isEmptyObj: function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        },

        _initEventHandlers : function () {
            var self = this,
                eventName = this._hasTouch() ? 'touchend' : 'click';

            this._eventHandlersInited = true;
            var onClickHandler =  function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                if (target && target.nodeName === 'A') {
                    if (target.className.indexOf('popup-link') !== -1) {
                        if (target.id) {
                            var s = self._firmCard.render(target.id);
                            if (!self._isEmptyObj(s)) {
                                self._addOptions.onFirmReady(s);
                            }
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

        _clearContainer: function () {
            var container = this._container;

            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }
        },

        _setOptions: function (options) {
            options || (options = {});
            this._addOptions = {};
            if ('onListReady' in options) { this._onListReady = options.onListReady; }
            //firmcard options
            if ('onToggle' in options) { this._addOptions.onToggle = options.onToggle; }
            if ('backBtn' in options) { this._addOptions.backBtn = options.backBtn; }
            if ('map' in options) { this._addOptions.map = options.map; }
            if ('showEntrance' in options) { this._addOptions.showEntrance = options.showEntrance; }
            if ('gotoUrl' in options) { this._addOptions.gotoUrl = options.gotoUrl; }
            if ('onFirmReady' in options) { this._addOptions.onFirmReady = options.onFirmReady; }
            if ('ajax' in options) { this._addOptions.ajax = options.ajax; }
            if ('render' in options) { this._addOptions.render = options.render; }
            if ('tmpls' in options) { this._addOptions.tmpls = options.tmpls; }
            if ('lang' in options) { this._addOptions.lang = options.lang; }
            if ('timezoneOffset' in options) { this._addOptions.timezoneOffset = options.timezoneOffset; }
        }
    };
})();
