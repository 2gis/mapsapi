// Adds 2GIS-related popup content wrapper and offset
(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalInitialize = L.Popup.prototype.initialize,
        originalInitLayout = L.Popup.prototype._initLayout,
        originalOnClose = L.Popup.prototype._onCloseButtonClick,
        originalOnAdd = L.Popup.prototype.onAdd,
        originalOnRemove = L.Popup.prototype.onRemove,
        originalAdjustPan = L.Popup.prototype._adjustPan,
        /*global baron:false */
        graf = baron.noConflict();

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.mergeOptions({
        border: 16
    });

    L.Popup.include({
        _headerContent: null,
        _footerContent: null,
        _back: {},

        //baron elements references
        _scroller: null,
        _scrollerBar: null,
        _barWrapper: null,
        _baron: null,
        _isBaronExist: false,

        /*global __DGCustomization_TMPL__:false */
        _templates: __DGCustomization_TMPL__,
        _popupShowClass: 'leaflet-popup_show_true',
        _popupHideClass: 'leaflet-popup_show_false',

        initialize: function (options, sourse) { // (Object, Object)
            this._popupStructure = {};
            originalInitialize.call(this, options, sourse);
        },

        onAdd: function (map) { // (Map)
            map.on('dgEntranceShow', this._closePopup, this);
            this.once('open', this._animateOpening, this);
            return originalOnAdd.call(this, map);
        },

        onRemove: function (map) { // (Map)
            map.off('dgEntranceShow', this._closePopup, this);
            return originalOnRemove.call(this, map);
        },

        setContent: function (content) { // (DOMElement | Object | HTML) -> Popup
            if (!this._isNode(content) && typeof content === 'object' && typeof content !== null) {
                Object.keys(content).forEach(function (item) {
                    this['_' + item + 'Content'] = content[item];
                }, this);
            } else {
                this._bodyContent = content;
            }

            this.update();

            return this;
        },

        setHeaderContent: function (content) { // (HTML) -> Popup
            this._headerContent = content;
            this.update();

            return this;
        },

        setFooterContent: function (content) { // (HTML) -> Popup
            this._footerContent = content;
            this.update();

            return this;
        },

        clear: function () { // () -> Popup
            Object.keys(this._popupStructure).forEach(function (elem) {
                this._clearElement(elem);
            }, this);

            // think about move this set to another public method
            this._isBaronExist = false;
            return this;
        },

        clearHeader: function () { // () -> Popup
            return this._clearElement('header');
        },

        clearFooter: function () { // () -> Popup
            return this._clearElement('footer');
        },

        findElement: function (element) { // (String) -> DOMElement
            return this._contentNode.querySelector(element);
        },

        _animateOpening: function () {
            L.DomUtil.addClass(this._innerContainer, this._popupShowClass);
            L.DomUtil.removeClass(this._innerContainer, this._popupHideClass);
        },

        _animateClosing: function () {
            L.DomUtil.addClass(this._innerContainer, this._popupHideClass);
            L.DomUtil.removeClass(this._innerContainer, this._popupShowClass);
        },

        _closePopup: function () {
            this._map.closePopup(this);
        },

        _isNode: function (o) { // (Object) -> Boolean
            return (o.nodeName ? true : false);
        },

        _initLayout: function () {
            originalInitLayout.call(this);
            this._innerContainer = L.DomUtil.create('div', 'leaflet-popup-inner ' + this._popupHideClass, this._container);
            if (this.options.closeButton) {
                this._innerContainer.appendChild(this._detachEl(this._closeButton));
            }
            this._innerContainer.appendChild(this._detachEl(this._wrapper));
            this._innerContainer.appendChild(this._detachEl(this._tipContainer));
            L.DomEvent.disableClickPropagation(this._tipContainer);
        },

        _clearElement: function (elem) { // (DOMElement) -> Popup
            this['_' + elem + 'Content'] = null;
            this._detachEl(this._popupStructure[elem]);
            delete this._popupStructure[elem];
            return this;
        },

        _updateScrollPosition: function () {
            if (this._baron) {
                this._baron.update();
            }
        },

        resize: function () {
            var scrollTop = this._isBaronExist ? this._scroller.scrollTop : false;

            this._updateLayout();
            this._updatePosition();

            if (this._isContentHeightFit()) {
                if (!this._isBaronExist) {
                    this._initBaronScroller();
                    this._initBaron();
                }
                else {
                    L.DomUtil.removeClass(this._scroller, 'dg-baron-hide');
                    L.DomUtil.addClass(this._scroller, 'scroller-with-header');
                    L.DomUtil.addClass(this._scroller, 'scroller');
                    if (scrollTop) {
                        this._scroller.scrollTop = scrollTop;
                    }
                    this._updateScrollPosition();
                }
            } else {
                if (this._isBaronExist) {
                    L.DomUtil.addClass(this._scroller, 'dg-baron-hide');
                    L.DomUtil.removeClass(this._scroller, 'scroller-with-header');
                    L.DomUtil.removeClass(this._scroller, 'scroller');
                    L.DomEvent.off(this._scroller, 'scroll', this._onScroll);
                }
            }

            this._bindAdjustPanOnTransitionEnd();
        },

        _adjustPan: function (e) {
            if (e) {
                if (e.propertyName === 'max-height') {
                    originalAdjustPan.call(this);
                    L.DomEvent.off(this._wrapper, this._whichTransitionEndEvent(), this._adjustPan);
                }
            } else {
                originalAdjustPan.call(this);
            }
        },

        _whichTransitionEndEvent: function () { // () -> String | Null
            var t,
                el = document.createElement('fakeelement'),
                transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }

            return null;
        },

        _bindAdjustPanOnTransitionEnd: function () {
            var transEv = this._whichTransitionEndEvent();
            if (transEv) {
                L.DomEvent.on(this._wrapper, transEv, this._adjustPan, this);
            } else {
                this._adjustPan();
            }
        },

        _isContentHeightFit: function () { // () -> Boolean
            var popupHeight,
                maxHeight = this.options.maxHeight;

            if (this._popupStructure.body) {
                popupHeight = this._popupStructure.body.offsetHeight + this._getDelta();
            } else {
                popupHeight = this._contentNode.offsetHeight;
            }

            popupHeight += this.options.border * 2;

            return (maxHeight && maxHeight < popupHeight); // dont need scroll on 300 height
        },

        _initBaronScroller: function () {
            var contentNode = this._popupStructure.body.parentNode,
                scrollerWrapper = this._scrollerWrapper =  L.DomUtil.create('div', 'scroller-wrapper', contentNode),
                scroller = this._scroller = L.DomUtil.create('div', 'scroller', scrollerWrapper),
                barWrapper = this._barWrapper = L.DomUtil.create('div', 'scroller__bar-wrapper', scroller),
                innerHeight = this.options.maxHeight - this.options.border * 2;

            this._scrollerBar = L.DomUtil.create('div', 'scroller__bar', barWrapper);
            scroller.appendChild(this._detachEl(this._popupStructure.body));

            innerHeight -= this._getDelta();
            scrollerWrapper.style.height = Math.max(18, innerHeight) + 'px';
            scrollerWrapper.style.width = contentNode.offsetWidth + 5 + 'px'; //TODO

            this._isBaronExist = true;

            L.DomEvent.on(scroller, 'scroll', this._onScroll, this);
        },

        _onScroll: function (event) {
            this.fire('dgScroll', {originalEvent: event});
        },

        _initBaron: function () {
            this._baron = graf({
                scroller: '.scroller',
                bar: '.scroller__bar',
                track: '.scroller__bar-wrapper',
                $: function (selector, context) {
                    /*global bonzo:false, qwery:false */
                    return bonzo(qwery(selector, context));
                },
                event: function (elem, event, func, mode) {
                    if (mode === 'trigger') {
                        mode = 'fire';
                    }
                    /*global bean:false */
                    bean[mode || 'on'](elem, event, func);
                }
            });
        },

        _initHeader: function () {
            this._popupStructure.header = L.DomUtil.create('header', 'dg-popup-header', this._contentNode);
        },

        _initFooter: function () {
            this._popupStructure.footer = L.DomUtil.create('footer', 'dg-popup-footer', this._contentNode);
        },

        _initBodyContainer: function () {
            this._popupStructure.wrapper = L.DomUtil.create('div', 'dg-popup-container-wrapper', this._contentNode);
            this._popupStructure.body = L.DomUtil.create('div', 'dg-popup-container', this._popupStructure.wrapper);
        },

        update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearNode(this._contentNode);
            this._wrapper.style.opacity = 0;

            //init popup content dom structure
            if (this._headerContent) {
                this._initHeader();
            }
            if (this._bodyContent) {
                this._initBodyContainer();
            }
            if (this._footerContent) {
                this._initFooter();
            }

            this._updatePopupStructure();
            this.resize();
            L.DomEvent.on(this._wrapper, 'click', L.DomEvent.stopPropagation);
            if (L.Browser.ielt9) {
                // alert('tadam3');
                var elem = this._popupStructure.footer;
                if (elem) {
                    elem.className += ' ie-shit';
                }
            }

            // Delete this if fixed in new leaflet version (> 0.6.2)
            L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);

            this._container.style.visibility = '';
        },

        _getDelta: function () { // () -> Number
            var delta = 0,
                popup = this._popupStructure;

            if (popup.header) {
                delta += popup.header.offsetHeight;
            }
            if (popup.footer) {
                delta += popup.footer.offsetHeight;
            }

            return delta;
        },

        _updateLayout: function () {
            var container = this._contentNode, // leaflet-popup-content
                wrapper = this._wrapper, //leaflet-popup-content-wrapper
                style = container.style,
                wrapperStyle = wrapper.style,
                width,
                scrolledClass = 'leaflet-popup-scrolled';

            style.margin = this.options.border + 'px';
            if (this._isContentHeightFit()) {
                wrapperStyle.maxHeight = this.options.maxHeight + 'px';
                L.DomUtil.addClass(container, scrolledClass);
            } else {
                wrapperStyle.maxHeight = container.offsetHeight + this.options.border * 2 + 'px';
                L.DomUtil.removeClass(container, scrolledClass);
            }

            style.whiteSpace = 'nowrap';
            width = wrapper.offsetWidth;
            style.whiteSpace = '';

            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);

            wrapperStyle.width = width + 'px';
            wrapperStyle.opacity = 1;

            this._containerWidth = this._container.offsetWidth;
        },

        _updatePopupStructure: function () {
            Object.keys(this._popupStructure).forEach(function (item) {
                this._insertContent(this['_' + item + 'Content'], this._popupStructure[item]);
            }, this);

            this.fire('contentupdate');
        },

        _insertContent: function (content, node) { // (String | DOMElement, DOMElement)
            if (!content || !node) { return; }

            if (typeof content === 'string') {
                node.innerHTML = content;
            } else {
                this._clearNode(node);
                node.appendChild(content);
            }
        },

        _clearNode: function (node) { // (DOMElement)
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
        },

        _detachEl: function (elem) { // (DOMElement) -> DOMElement
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
            return elem;
        },

        _onCloseButtonClick: function (e) { // (Event)
            var transEv;

            this._animateClosing();
            transEv = this._whichTransitionEndEvent();

            if (transEv) {
                L.DomEvent.on(this._innerContainer, transEv, this._firePopupClose, this);
            }
            else {
                this._firePopupClose(e);
            }
            L.DomEvent.stop(e);
        },

        _firePopupClose: function (e) { // (Event)
            var transEv = this._whichTransitionEndEvent();

            originalOnClose.call(this, e);

            if (this._whichTransitionEndEvent()) {
                L.DomEvent.off(this._innerContainer, transEv, this._firePopupClose);
            }
        }
    });
}());


L.Map.include({
    _markerClass: 'dg-customization__marker_type_mushroom',
    _markerShowClass: 'dg-customization__marker_appear',
    _markerHideClass: 'dg-customization__marker_disappear',
    _dgHideClass: 'dg-hidden',
    openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
        var content;

        this.closePopup();

        if (!(popup instanceof L.Popup)) {
            content = popup;
            popup = new L.Popup(options).setLatLng(latlng).setContent(content);
        }
        popup._isOpen = true;

        this._popup = popup;

        if (popup._source && popup._source._icon) {
            if (popup._source._icon.className.indexOf(this._markerClass) !== -1) {
                L.DomUtil.removeClass(popup._source._icon, this._markerShowClass);
                L.DomUtil.addClass(popup._source._icon, this._markerHideClass);
            } else {
                L.DomUtil.addClass(popup._source._icon, this._dgHideClass);
                if (popup._source._shadow) {
                    L.DomUtil.addClass(popup._source._shadow, this._dgHideClass);
                }
            }
        }

        return this.addLayer(popup);
    },

    closePopup: function (popup) {  // (Popup) -> Popup
        if (!popup || popup === this._popup) {
            popup = this._popup;
            this._popup = null;
        }
        if (popup) {
            if (popup._source && popup._source._icon) {
                if (popup._source._icon.className.indexOf(this._markerClass) !== -1) {
                    L.DomUtil.removeClass(popup._source._icon, this._markerHideClass);
                    L.DomUtil.addClass(popup._source._icon, this._markerShowClass);
                } else {
                    L.DomUtil.removeClass(popup._source._icon, this._dgHideClass);
                    if (popup._source._shadow) {
                        L.DomUtil.removeClass(popup._source._shadow, this._dgHideClass);
                    }
                }
            }
            this.removeLayer(popup);
            popup._isOpen = false;
        }

        return this;
    }
});
