/* TODO:
    1. Перевести работы с string в docFragment
    2. Сделать FirmList классом
    3. Обернуть весь плагин в один неймспейс
    4. Пофиксить баг с popup.setContent( domElement )
    5. Автоскролл при открытии карточки
    6. Инит барона, если развернули много карточек
    7. Хендлер ИД филиала для отображения карточки ПОИ
    8. Механизм смены языка
    9. Тесты FirmList
*/

var FirmList = function () {
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
   this._isCached = false;
   this._newPageFirms = {};
}
// private methods
FirmList.prototype._clearContainer = function () {
    while (this._container.hasChildNodes()) {
        this._container.removeChild(this._container.firstChild);
    }
}
FirmList.prototype._clearList = function () {
    this._isCached = false;
    this._firms = {};
    this._clearContainer();
}
FirmList.prototype._createFirm = function (frimData) {
    return new FirmCard (frimData, this._addOptions);
}
FirmList.prototype._setOptions = function (options) {
    options || (options = {});

    if ('onToggleCard' in options) this._onToggleCard = options.onToggleCard;
    if (options.defaultFirm) this._defaultFirm = options.defaultFirm;
    if (options.firmsOnPage) this._firmsOnPage = options.firmsOnPage;
    if (options.ajax) _addOptions.ajax = options.ajax;
    if (options.render) _addOptions.render = options.render;
    if (options.tmpls) _addOptions.tmpls = options.tmpls;
    if (options.lang) _addOptions.lang = options.lang;
}
FirmList.prototype._renderFirm = function (id) {
    return this._firms[id] ? this._firms[id].render() : null;
}
FirmList.prototype._addFirm = function (firmData) {
    var id = firmData.id ? firmData.id.split("_").slice(0, 1) : firmData; //TODO provide functional for open POI card

    if (!this._firms.hasOwnProperty(id)) {
        firmObject = this._createFirm(firmData);
        this._firms[id] = firmObject;
    }

    this._newPageFirms[id] = firmObject;
}

// public methods

FirmList.prototype.init = function (firms, options) {
    this._setOptions(options);
    this._container.setAttribute('class', 'dg-map-infocard-firmlist');
    this._container.setAttribute('id', 'dg-map-infocard-firmlist');
    this.addFirms(firms);
}
FirmList.prototype.initEventHandlers = function () {
    var cont = document.getElementById('dg-map-infocard-firmlist'),
        self = this;

    cont.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "A") {
            self.toggleFirm(e.target.id);
        }
    });
}
FirmList.prototype.renderFirms = function (isAppend) {
    var content = '',
        firms = isAppend ? this._newPageFirms : this._firms;

    for (var firm in firms) {
        if (firms.hasOwnProperty(firm)) {
            content += this._renderFirm(firm);
        }
    }

    return content;
}
FirmList.prototype.renderList = function () {
    this._container.innerHTML = this.renderFirms();
    this._isCached = true;

    return this._container;

}
FirmList.prototype.addFirms = function (firms) {
    this._newPageFirms = {};

    if (firms) {
        for (var firm in firms) {
            if (firms.hasOwnProperty(firm)) {
                this._addFirm(firms[firm]);
            }
        }
    }
}
FirmList.prototype.removeFirms = function (id) {
    //TODO handle IDs if its array
    this._firms[id] ? '' : delete this._firms[id];
}
FirmList.prototype.setLang = function (newLang) {
    options.lang = newLang;
    //_clearCache();
}
FirmList.prototype.getLang = function () {
    return options.lang;
}
FirmList.prototype.toggleFirm = function (id) {
    if (this._firms[id]) {
        this._firms[id].toggle();
        if (this._onToggleCard) this._onToggleCard(this._firms[id].getContainer(), true /*_firms[id].isExpanded()*/);
    }
}
FirmList.prototype.isListCached = function () {
    return this._isCached;
}

// var FirmList = (function () {
//     var _firms = {}, // {'firmID': firmObj}
//         _defaultFirm = '',
//         _onToggleCard = null,
//         _addOptions = {
//             ajax: function(){},
//             render: function(){},
//             lang: 'ru',
//             tmpls: {}
//         },
//         _container = document.createElement('div'),
//         _isCached = false,
//         _newPageFirms = {};
// 
//         // privatе methods
//         _clearContainer = function () {
//             while (_container.hasChildNodes()) {
//                 _container.removeChild(_container.firstChild);
//             }
//         },
// 
//         _clearList = function () {
//             _isCached = false;
//             _firms = {};
//             _clearContainer();
//         },
// 
//         _createFirm = function (frimData) {
//             return new FirmCard (frimData, _addOptions);
//         }
// 
//         _setOptions = function (options) {
//             options || (options = {});
// 
//             if ('onToggleCard' in options) _onToggleCard = options.onToggleCard;
//             if (options.defaultFirm) _defaultFirm = options.defaultFirm;
//             if (options.firmsOnPage) _firmsOnPage = options.firmsOnPage;
//             if (options.ajax) _addOptions.ajax = options.ajax;
//             if (options.render) _addOptions.render = options.render;
//             if (options.tmpls) _addOptions.tmpls = options.tmpls;
//             if (options.lang) _addOptions.lang = options.lang;
//         },
// 
//         _renderFirm = function (id) {
//             return  _firms[id] ? _firms[id].render() : null;
//         },
// 
//         _addFirm = function (firmData) {
//             var id = firmData.id ? firmData.id.split("_").slice(0, 1) : firmData; //TODO provide functional for open POI card
// 
//             if (!_firms.hasOwnProperty(id)) {
//                 firmObject  = _createFirm(firmData);
//                 _firms[id] = firmObject;
//             }
// 
//             _newPageFirms[id] = firmObject;
//         }
// 
//     return  {
//         init: function (firms, options) {
//             _setOptions(options);
//             _container.setAttribute('class', 'dg-map-infocard-firmlist');
//             _container.setAttribute('id', 'dg-map-infocard-firmlist');
// 
//             this.addFirms(firms);
// 
//         },
// 
//         initEventHandlers: function () {
//             var cont = document.getElementById('dg-map-infocard-firmlist'),
//                 self = this;
// 
//             cont.addEventListener("click", function(e) {
// 
//                 if (e.target && e.target.nodeName == "A") {
//                     self.toggleFirm(e.target.id);
//                 }
//             });
//         },
// 
//         renderFirms: function (isAppend) {
//             var content = '',
//                 firms = isAppend ? _newPageFirms : _firms;
// 
//             for (var firm in firms) {
//                 if (firms.hasOwnProperty(firm)) {
//                     content += _renderFirm(firm);
//                 }
//             }
// 
//             return content;
//         },
// 
//         renderList: function () {
//             _container.innerHTML = this.renderFirms();;
//             _isCached = true;
// 
//             return _container;
// 
//         },
// 
//         addFirms: function (firms) {
//             _newPageFirms = {};
// 
//             if (firms) {
//                 for (var firm in firms) {
//                     if (firms.hasOwnProperty(firm)) {
//                         _addFirm(firms[firm]);
//                     }
//                 }
//             }
//         },
// 
//         removeFirms: function (id) {
//             //TODO handle IDs if its array
//             _firms[id] ? '' : delete _firms[id];
//         },
// 
//         setLang: function (newLang) {
//             options.lang = newLang;
//             //_clearCache();
//         },
// 
//         getLang: function () {
//             return options.lang;
//         },
// 
//         toggleFirm: function (id) {
//             if (_firms[id]) {
//                 _firms[id].toggle();
//                 if (_onToggleCard) _onToggleCard(_firms[id].getContainer(), true /*_firms[id].isExpanded()*/);
//             }
//         },
// 
//         isListCached: function () {
//             return _isCached;
//         },
// 
//         clearList: _clearList
//     };
// })();
