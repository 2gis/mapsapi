DG.Control.Fullscreen.include({
    _mapParams: [
        'zIndex', 'position', 'left', 'top', 'border', 'marginTop', 'marginRight',
        'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
        'paddingLeft', 'previousSibling', 'width', 'height'
    ],

    _documentParams: [
        'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop',
        'paddingRight', 'paddingBottom', 'paddingLeft', 'overflow', 'scrollTop'
    ],
    _initialDocumentParams: {},
    _initialMapParams: {},
    _initialDocumentElementParams: {},

    _storePosition: function (container) { // (HTMLDivElement)

        // store initial map container params
        this._mapParams.forEach(function (cssRule) {
            this._initialMapParams[cssRule] = container.style[cssRule];
        }, this);

        // store initial document.body params
        this._documentParams.forEach(function (cssRule) {
            this._initialDocumentParams[cssRule] = document.body.style[cssRule];
        }, this);

        // store initial document.documentElement params
        this._initialDocumentElementParams.scrollTop = document.documentElement.scrollTop;
    },

    _restorePosition: function (container) { // (HTMLDivElement)

        // restore map container params
        this._mapParams.forEach(function (cssRule) {
            container.style[cssRule] = this._initialMapParams[cssRule];
        }, this);

        // restore map container params
        this._documentParams.forEach(function (cssRule) {
            document.body.style[cssRule] = this._initialDocumentParams[cssRule];
        }, this);

        // restore document.documentElement params
        document.documentElement.scrollTop = this._initialDocumentElementParams.scrollTop;
    },

    _legacyRequest: function (container) { // (HTMLDivElement)
        this._storePosition(container);
        // set full map mode style
        container.style.position = 'fixed';
        container.style.margin = '0px';
        container.style.padding = '0px';
        container.style.border = 'medium none';
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = '9999';
        document.body.style.overflow = 'hidden';

        // reset document.documentElement params
        document.documentElement.scrollTop = '0px';

        // reset document.body params
        document.body.scrollTop = '0px';
        document.body.style.margin = '0px';
        document.body.style.padding = '0px';
    },

    _onKeyUp: function (e) { // (Object)
        if (!e) {
            e = window.event;
        }
        if (e.keyCode === 27) {
            this._exitFullScreen();
        }
    }
});
