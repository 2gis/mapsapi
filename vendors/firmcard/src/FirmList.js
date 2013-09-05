/* TODO:
 ++ 1. Обернуть весь плагин в один неймспейс
    2. Пофиксить автоскролл при открытии карточки в конце списка
 ++ 3. Инит барона, если развернули много карточек
    4. Механизм смены языка
    5. Описать в доке методы setHeader, setFooter
 ++ 6. Вернуть крестик закрытыя балуна
 ++ 7. Пофиксить лоадер
    8. Тесты FirmList
*/

(function(){
    FirmCard.List = function (options, firms) {
        this._firms = {}; // {'firmID': firmObj}
        this._defaultFirm = null;
        this._onToggleCard = null;
        this._onReady = null;
        this._addOptions = {
           ajax: function(){},
           render: function(){},
           lang: 'ru',
           tmpls: {}
        };
        this._container = options && options.container || document.createElement('div');
        this._container.setAttribute('class', 'dg-map-infocard-firmlist');
        this._innerFirmsList = document.createDocumentFragment();

        this._isCached = false;
        this._newPageFirms = {};

        this._eventHandlersInited = false;

        this._setOptions(options);
        this._prepareList(firms);
    }

    FirmCard.List.prototype = {

        _initEventHandlers : function () {
            var self = this;

            this._eventHandlersInited = true;
            this._container.addEventListener("click", function(e) {
                var e = e || window.event;
                if(!e.target) e.target = e.srcElement;

                if (e.target && e.target.nodeName == "A") {
                    if (e.target.className.indexOf('dg-firm-shortcard') !== -1) {
                        self.toggleFirm(e.target.id);
                    } else if (e.target.className.indexOf('dg-map-work-time') !== -1) {
                        console.log('schedule clicked');
                    }
                }
            });
        },

        renderFirms : function (isAppend) {
            var firms = isAppend ? this._newPageFirms : this._firms;

            for (var firm in firms)
                if (firms.hasOwnProperty(firm)) {
                    this._innerFirmsList.appendChild(this._renderFirm(firm));
                }

            return this._innerFirmsList;
        },

        renderList : function () {
            if (!this._eventHandlersInited) this._initEventHandlers();

            this._container.appendChild(this.renderFirms());
            this._isCached = true;

            return this._container;
        },

        addFirms : function (firms) {
            this._newPageFirms = {};
            if (firms) {
                for (var firm in firms) {
                    if (firms.hasOwnProperty(firm)) {
                        this._addFirm(firms[firm]);
                    }
                }
            }
        },

        removeFirms : function (id) {
            //TODO handle IDs if its array
            this._firms[id] ? '' : delete this._firms[id];
        },

        clearList : function () {
            this._isCached = false;
            this._firms = {};
            this._clearContainer();
        },

        setLang : function (newLang) {
            options.lang = newLang;
            //_clearCache();
        },

        getLang : function () {
            return options.lang;
        },

        toggleFirm : function (id) {
            if (this._firms[id]) {
                this._firms[id].toggle();
                if (this._onToggleCard) {
                    this._onToggleCard(this._firms[id].getContainer(), this._firms[id].isExpanded());
                }
            }
        },

        isListCached: function () {
            return this._isCached;
        },

        getContainer: function () {
            return this._container;
        },

        _prepareList: function(firms){
            var self = this;

            if (this._defaultFirm) {
                this._addFirm(this._defaultFirm);
            }

            self.addFirms(firms);
            setTimeout(self._onReady, 1);   // We need setTimeout here because _prepareList was called in constructor and would finish first
        },

        _clearContainer: function () {
            var container = this._container;

            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }
        },

        _createFirm: function (firmData) {
            return new FirmCard (firmData, this._addOptions);
        },

        _setOptions: function (options) {
            options || (options = {});

            if ('onReady' in options) this._onReady = options.onReady;
            if ('onToggleCard' in options) this._onToggleCard = options.onToggleCard;
            if ('defaultFirm' in options) this._defaultFirm = options.defaultFirm;
            if ('firmsOnPage' in options) this._firmsOnPage = options.firmsOnPage;
            if ('ajax' in options) this._addOptions.ajax = options.ajax;
            if ('render' in options) this._addOptions.render = options.render;
            if ('tmpls' in options) this._addOptions.tmpls = options.tmpls;
            if ('lang' in options) this._addOptions.lang = options.lang;
        },

        _renderFirm: function (id) {
            return this._firms[id] ? this._firms[id].render() : null;
        },

        _addFirm: function (firmData) {
            var id = firmData.id ? firmData.id.split("_").slice(0, 1) : firmData;

            if (!this._firms.hasOwnProperty(id)) {
                firmObject = this._createFirm(firmData);
                this._firms[id] = firmObject;
            }

            this._newPageFirms[id] = firmObject;
        }
    }
})();
