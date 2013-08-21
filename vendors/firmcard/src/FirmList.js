
var FirmList = (function () {
    var _firms = {}, // {'firmID': firmObj}
        _defaultFirm = '',
        _addOptions = {
            ajax: function(){},
            render: function(){},
            lang: 'ru',
            tmpls: {}
        },
        _container = document.createElement('div'),
        _isCached = false;

        // privat methods
        _clearContainer = function () {
            while (_container.hasChildNodes()) {
                _container.removeChild(_container.firstChild);
            }
        },

        _clearList = function () {
            _isCached = false;
            _firms = {};
            _clearContainer();
        },

        _createFirm = function (frimData) {
            return new FirmCard (frimData, _addOptions);
        },

        _initEventHandlers = function () {
            _container.addEventListener("click", function(e) {
                if (e.target && e.target.nodeName == "LI") {
                    //toggleFirm(e.target.id);
                    console.log( e.target.id ," was clicked!");
                }
            });
        },

        _setOptions = function (options) {
            options || (options = {});

            if (options.defaultFirm) _defaultFirm = options.defaultFirm;
            if (options.firmsOnPage) _firmsOnPage = options.firmsOnPage;
            if (options.ajax) _addOptions.ajax = options.ajax;
            if (options.render) _addOptions.render = options.render;
            if (options.tmpls) _addOptions.tmpls = options.tmpls;
            if (options.lang) _addOptions.lang = options.lang;
        },

        _renderFirm = function (id) {
            return  _firms[id] ? _firms[id].render() : null;
        }

    return  {
        init: function (firms, options) {
            _setOptions(options);
            _container.setAttribute('class', 'dg-map-infocard-firmlist');

            if (firms) {
                for (var firm in firms) {
                    if (firms.hasOwnProperty(firm)) {
                        this.addFirm(firms[firm]);
                    }
                }
            }
            //console.log(_firms);
        },

        renderList: function () {
            for (var firm in _firms) {
                if (_firms.hasOwnProperty(firm)) {
                    _container.appendChild(_renderFirm(firm));
                }
            }
            _isCached = true;

            return _container;
        },

        addFirm: function (firmData) {
            var id = firmData.firm.id ? firmData.firm.id : firmData;

            if (!_firms.hasOwnProperty(id)) {
                firmObject  = _createFirm(firmData);
                _firms[id] = firmObject;
            }


        },

        removeFirm: function (id) {
            _firms[id] ? '' : delete _firms[id];
        },

        setLang: function (newLang) {
            options.lang = newLang;
            //_clearCache();
        },

        getLang: function () {
            return options.lang;
        },

        toggleFirm: function (id) {
            _firms[id] ? _firms[id].toggle() : null;
        },

        isListCached: function () {
            return _isCached;
        },

        clearList: _clearList
    };
})();
