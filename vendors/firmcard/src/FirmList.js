/* TODO:
    1. Перевести работы с string в docFragment
++  2. Сделать FirmList классом
    3. Обернуть весь плагин в один неймспейс
    4. Пофиксить баг с popup.setContent( domElement )
    5. Автоскролл при открытии карточки
    6. Инит барона, если развернули много карточек
    7. Хендлер ИД филиала для отображения карточки ПОИ
    8. Механизм смены языка
    9. Описать в доке методы setHeader, setFooter
    10. Тесты FirmList
*/

var FirmList = function (options, firms) {
    this._firms = {}; // {'firmID': firmObj}
    this._defaultFirm = '';
    this._onToggleCard = null;
    this._addOptions = {
       ajax: function(){},
       render: function(){},
       lang: 'ru',
       tmpls: {}
    };
    this._container = document.createElement('div');
    this._container.setAttribute('class', 'dg-map-infocard-firmlist');
    this._innerFirmsList = document.createDocumentFragment();

    this._isCached = false;
    this._newPageFirms = {};

    this._setOptions(options);
    this.addFirms(firms);
}

FirmList.prototype = {

    initEventHandlers : function () {
        var self = this;

        this._container.addEventListener("click", function(e) {
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
            if (this._onToggleCard) this._onToggleCard(this._firms[id].getContainer(), true /*_firms[id].isExpanded()*/);
        }
    },

    isListCached: function () {
        return this._isCached;
    },

    getContainer: function () {
        return this._container;
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
        var id = firmData.id ? firmData.id.split("_").slice(0, 1) : firmData; //TODO provide functional for open POI card

        if (!this._firms.hasOwnProperty(id)) {
            firmObject = this._createFirm(firmData);
            this._firms[id] = firmObject;
        }

        this._newPageFirms[id] = firmObject;
    }
}
