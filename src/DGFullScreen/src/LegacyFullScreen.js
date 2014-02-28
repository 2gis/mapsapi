if (!DG.screenfull ||
    //fallback since srange android ff bug with fullscreen mode
    (DG.Browser.android && DG.Browser.ff) ||
    //fallback for safari5.1 because of error on fullscreen exit
    DG.Browser.safari51) {

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
            var containerStyle = container.style,
                body = document.body;

            this._storePosition(container);
            // set full map mode style
            containerStyle.position = 'fixed';
            containerStyle.margin = '0px';
            containerStyle.padding = '0px';
            containerStyle.border = 'medium none';
            containerStyle.left = '0px';
            containerStyle.top = '0px';
            containerStyle.width = '100%';
            containerStyle.height = '100%';
            containerStyle.zIndex = '9999';
            body.style.overflow = 'hidden';

            // reset document.body params
            body.scrollTop = '0px';
            body.style.margin = '0px';
            body.style.padding = '0px';

            // reset document.documentElement params
            document.documentElement.scrollTop = '0px';
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
}
