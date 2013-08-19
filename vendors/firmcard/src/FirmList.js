
var FirmList = (function () {
    var _firmsCache = {}, // {'firmID': renderedFirm}
        _firmsData = {}, // {'firmID': firmData}
        _defaultFirm = '',
        _addOptions = {
            ajax: function(){},
            render: function(){},
            lang: 'ru',
            tmpls: {}
        },
        _container = document.createElement('ul');

    var _clearCache = function () {
            _firmsCache = {};
        },

        _getCachedFirm = function (id) {
            return _firmsCache[id] ? _firmsCache[id] : null;
        },

        _initEventHandlers = function () {
            _container.addEventListener("click",function(e) {
                if(e.target && e.target.nodeName == "LI") {
                    console.log( e.target.id ," was clicked!");
                }
            });
        };

    return  {
        init: function (firms, options) {
            options || (options = {});

            if (firms) {
                for (var firm in firms) {
                    if (firms.hasOwnProperty(firm)) {
                        var id = firms[firm].firm.id;
                        _firmsData[id] = this.renderFirm(id, );
                    }
                }
            }
            console.log(_firmsData);
            if (options.defaultFirm) _defaultFirm = options.defaultFirm;
            if (options.ajax) _addOptions.ajax = options.ajax;
            if (options.render) _addOptions.render = options.render;
            if (options.tmpls) _addOptions.tmpls = options.tmpls;
            if (options.lang) _addOptions.lang = options.lang;
        },

        renderFirm: function (id, data) {
            var firmHtml = null;
                cached = _getCachedFirm(id);
            if (cached) {
                firmHtml = cached;
            } else {
                var newFirm = new FirmCard (data, _addOptions);
                this.addFirm (id, newFirm);
                firmHtml = newFirm.render();
            }

            return firmHtml;
        },

        renderList: function () {
            for (var firm in )
        },

        addFirm: function (id, firmObj) {
            _firmsData[id] ? '' : _firmsData[id] = firmObj;
        },

        removeFirm: function (id) {
            _firmsData[id] ? '' : delete _firmsData[id];
        },

        setLang: function (newLang) {
            options.lang = newLang;
            _clearCache();
        },

    };

})();
