DG.Control.Fullscreen.include({
    _initialMapParams: {
        zIndex: null,
        position: null,
        left: null,
        top: null,
        border: null,
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
        previousSibling: null,
        width: null,
        height: null
    },

    _initialDocumentParams: {
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
        overflow: null,
        scrollTop: null
    },

    _initialDocumentElementParams: {
        scrollTop: null
    },

    _storePosition: function (container) { // (HTMLDivElement)

        // store initial map container params
        this._initialMapParams.zIndex = container.style.zIndex;
        this._initialMapParams.position = container.style.position;
        this._initialMapParams.left = container.style.left;
        this._initialMapParams.top = container.style.top;
        this._initialMapParams.border = container.style.border;
        this._initialMapParams.marginTop = container.style.marginTop;
        this._initialMapParams.marginRight = container.style.marginRight;
        this._initialMapParams.marginBottom = container.style.marginBottom;
        this._initialMapParams.marginLeft = container.style.marginLeft;
        this._initialMapParams.paddingTop = container.style.paddingTop;
        this._initialMapParams.paddingRight = container.style.paddingRight;
        this._initialMapParams.paddingBottom = container.style.paddingBottom;
        this._initialMapParams.paddingLeft = container.style.paddingLeft;
        this._initialMapParams.previousSibling = container.previousSibling;
        this._initialMapParams.width = container.style.width;
        this._initialMapParams.height = container.style.height;

        // store initial document.body params
        this._initialDocumentParams.marginTop = document.body.style.marginTop;
        this._initialDocumentParams.marginRight = document.body.style.marginRight;
        this._initialDocumentParams.marginBottom = document.body.style.marginBottom;
        this._initialDocumentParams.marginLeft = document.body.style.marginLeft;
        this._initialDocumentParams.paddingTop = document.body.style.paddingTop;
        this._initialDocumentParams.paddingRight = document.body.style.paddingRight;
        this._initialDocumentParams.paddingBottom = document.body.style.paddingBottom;
        this._initialDocumentParams.paddingLeft = document.body.style.paddingLeft;
        this._initialDocumentParams.overflow = document.body.style.overflow;
        this._initialDocumentParams.scrollTop = document.body.scrollTop;

        // store initial document.documentElement params
        this._initialDocumentElementParams.scrollTop = document.documentElement.scrollTop;
    },

    _restorePosition: function (container) { // (HTMLDivElement)

        // restore map container params
        container.style.position = this._initialMapParams.position;
        container.style.zIndex = this._initialMapParams.zIndex;
        container.style.left = this._initialMapParams.left;
        container.style.top = this._initialMapParams.top;
        container.style.border = this._initialMapParams.border;
        container.style.marginTop = this._initialMapParams.marginTop;
        container.style.marginRight = this._initialMapParams.marginRight;
        container.style.marginBottom = this._initialMapParams.marginBottom;
        container.style.marginLeft = this._initialMapParams.marginLeft;
        container.style.paddingTop = this._initialMapParams.paddingTop;
        container.style.paddingRight = this._initialMapParams.paddingRight;
        container.style.paddingBottom = this._initialMapParams.paddingBottom;
        container.style.paddingLeft = this._initialMapParams.paddingLeft;
        container.style.width = this._initialMapParams.width;
        container.style.height = this._initialMapParams.height;

        // restore document.body params
        document.body.style.overflow = this._initialDocumentParams.overflow;
        document.body.style.marginTop = this._initialDocumentParams.marginTop;
        document.body.style.marginRight = this._initialDocumentParams.marginRight;
        document.body.style.marginBottom = this._initialDocumentParams.marginBottom;
        document.body.style.marginLeft = this._initialDocumentParams.marginLeft;
        document.body.style.paddingTop = this._initialDocumentParams.paddingTop;
        document.body.style.paddingRight = this._initialDocumentParams.paddingRight;
        document.body.style.paddingBottom = this._initialDocumentParams.paddingBottom;
        document.body.style.paddingLeft = this._initialDocumentParams.paddingLeft;
        document.body.scrollTop = this._initialDocumentParams.scrollTop;

        // restore document.documentElement params
        document.documentElement.scrollTop = this._initialDocumentElementParams.scrollTop;
    }
});
