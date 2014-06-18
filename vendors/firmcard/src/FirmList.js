/* global
    FirmCard: false
*/
(function () {
    FirmCard.List = function (firms, options) {
        this._firms = {}; // {'firmID': firmDomObj}
        this._setOptions(options);

        this._container = options && options.container || document.createElement('ul');
        this._container.setAttribute('class', 'dg-building-callout__list');

        this._eventHandlersInited = false;
        this._firmCard = this._createFirm();
        this.renderList(firms);
    };

    FirmCard.List.prototype = {

        renderList: function (firms) {
            console.log('RENDER FirmList');
            if (firms) {
                //if (!this._eventHandlersInited) {
                    this._toggleEventHandlers();
                //}

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
            item.setAttribute('class', 'dg-building-callout__list-item');

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

        _toggleEventHandlers : function (flag) {
            this.options.firmCard.popup[flag ? 'off' : 'on']('click', this._onClick, this);
        },

        _events: {
            'dg-popup__link': function(target) {
                console.log('FirmList : clicked on link');
                var s = this._firmCard.render(target.id);

                this.options.firmCard[this._isEmptyObj(s) ? 'pasteLoader' : 'onFirmReady'](s);

                this.options.firmCard.onFirmClick && this.options.firmCard.onFirmClick();

                this._toggleEventHandlers(true);
            },
            'dg-popup__button_name_back': function() {
                console.log('FirmList : back');
                this.options.firmCard.onShowLess();
                this._toggleEventHandlers(true);
            }
        },

        _onClick: function (e) {

            console.log('FirmList CLICK');

            var target = e.originalEvent.target;

            // DG.DomEvent.stop(e.originalEvent);

            if (target.className.indexOf('dg-building-callout__list-item') !== -1 ) { target = target.children[0] };

            for (eventClass in this._events) {
                if (this._events.hasOwnProperty(eventClass) && target.className.indexOf(eventClass) > -1) {
                    this._events[eventClass].call(this, target);
                    return;
                }
            }

            return false;


            // if (target.className.indexOf('dg-popup__link') !== -1 && target.id) {
            //     console.log('FirmList : clicked on link');
            //     var s = this._firmCard.render(target.id);
            //     this.options.firmCard[this._isEmptyObj(s) ? 'pasteLoader' : 'onFirmReady'](s);
            //     // this._unsetEventHandlers();
            //     this.options.firmCard.onFirmClick && this.options.firmCard.onFirmClick(e);

            // } else if (target.className.indexOf('dg-popup__button_name_back') !== -1) {
            //     //this.options.firmCard.backBtn();
            // }

            /*else 
                if (target.className.indexOf('dg-popup__button_name_all') !== -1) {
                    this.options.firmCard.onShowMore();
                } else if (target.className.indexOf('dg-schedule__today') !== -1 ) {
                    this.options.firmCard.onToggle();
            }*/

             // DG.DomEvent.stop(e.originalEvent);

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
