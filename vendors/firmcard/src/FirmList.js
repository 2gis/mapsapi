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
            if (this.options.onListReady) {
                this.options.onListReady(this._container);
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
            this.options.firmCard.lang = newLang;
        },

        getLang: function () {
            return this.options.firmCard.lang;
        },

        getContainer: function () {
            return this._container;
        },

        clearList : function () {
            this._firms = {};
            this._clearContainer();
        },

        _removeFirm: function (id) {
            if (!this._firms[id]) { return false; }
            this._container.removeChild(this._firms[id]);
            delete this._firms[id];
        },

        _addFirm: function (firmData) {
            var tmpl = this.options.firmlistItemTmpl,
                domFirm, firm, content;

            firm = {
                name: firmData.name,
                id: firmData.id.split('_').slice(0, 1)
            };

            if (!(firm.id in this._firms)) {
                
                domFirm = this._createListItem();

                content = tmpl ? this.options.firmCard.render(tmpl, {'firm': firm}) : firm.name;
                
                domFirm.insertAdjacentHTML('beforeend', content);

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
            return new FirmCard(firmData, this.options.firmCard);
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
                eventName = this._hasTouch() ? 'touchend' : 'click',
                methodName = this._container.addEventListener ? 'addEventListener' : 'attachEvent',
                mouseoverEvent = this._container.addEventListener ? 'mouseover' : 'onmouseover';

            if (this._container.attachEvent) { eventName = 'on'+eventName; }

            this._eventHandlersInited = true;
            
            var onClickHandler =  function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                DG.DomEvent.stop(e);

                if (target.nodeName === 'A' && target.className.indexOf('popup-link') !== -1 && target.id) {

                    var s = self._firmCard.render(target.id);
                    self.options.firmCard[ self._isEmptyObj(s) ? 'pasteLoader' : 'onFirmReady'](s);

                    self.options.firmCard.onFirmClick && self.options.firmCard.onFirmClick(e);
                        
                }
            };

            this._container[methodName](eventName, onClickHandler, false);

            if (this._hasTouch()) {
                this._container[methodName](mouseoverEvent, onClickHandler, false);
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
            this.options = options;
            this.options.firmCard || (this.options.firmCard = {});
            if (!options.firmCard.lang) {
                this.options.firmCard.lang = 'ru';
            }

            for (var option in options) {
                if (options.hasOwnProperty(option)) {
                    this.options[option] = options[option];
                }
            }
        }
    };
})();
