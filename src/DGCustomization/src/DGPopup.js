//GIS-related popup content wrapper and offset
(function () {
    var offsetX = DG.configTheme.balloonOptions.offset.x,
        offsetY = DG.configTheme.balloonOptions.offset.y,
        originalInitialize = DG.Popup.prototype.initialize,
        originalInitLayout = DG.Popup.prototype._initLayout,
        originalOnClose = DG.Popup.prototype._onCloseButtonClick,
        originalOnAdd = DG.Popup.prototype.onAdd,
        originalOnRemove = DG.Popup.prototype.onRemove,
        originalAdjustPan = DG.Popup.prototype._adjustPan,
        /*global baron:false */
        graf = baron.noConflict();

    var BaronDomHelper = function (element) {
        this[0] = element;
        this.length = 1;
    };
    BaronDomHelper.prototype = {
        setAttribute: function (name, value) {
            this[0].setAttribute(name, value);
            return this;
        },
        getAttribute: function (name) {
            return this[0].getAttribute(name);
        },
        removeAttribute: function (name) {
            this[0].removeAttribute(name);
            return this;
        },
        css: function (style, value) {
            if (value) {
                this[0].style[style] = value;
                return this;
            } else {
                return DG.DomUtil.getStyle(this[0], style);
            }
        }
    };

    DG.Popup.prototype.options.offset = DG.point(offsetX, offsetY);

    DG.Popup.mergeOptions({
        border: 16
    });

    DG.Popup.include({
        _headerContent: null,
        _footerContent: null,

        //baron elements references
        _scroller: null,
        _scrollerBar: null,
        _barWrapper: null,
        _baron: null,
        _isBaronExist: false,
        _isScrolling: false,

        _popupShowClass: 'leaflet-popup_show_true',
        _popupHideClass: 'leaflet-popup_show_false',

        _popupTipClass: 'leaflet-popup-tip-container',
        _tipSVGPath: 'M0 0c12.643 0 28 7.115 28 44h2c0-36.885 15.358-44 28-44h-58z',

        initialize: function (options, source) { // (Object, Object)
            this._popupStructure = {};
            originalInitialize.call(this, options, source);
        },

        onAdd: function (map) { // (Map)
            map.on('entranceshow', this._closePopup, this);
            originalOnAdd.call(this, map);
            this._animateOpening();
        },

        onRemove: function (map) { // (Map)
            this._animateClosing();
            map.off('entranceshow', this._closePopup, this);
            originalOnRemove.call(this, map);
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
            Object.keys(this._popupStructure).forEach(this._clearElement, this);

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
            DG.DomUtil.addClass(this._innerContainer, this._popupShowClass);
            DG.DomUtil.removeClass(this._innerContainer, this._popupHideClass);
        },

        _animateClosing: function () {
            DG.DomUtil.addClass(this._innerContainer, this._popupHideClass);
            DG.DomUtil.removeClass(this._innerContainer, this._popupShowClass);
        },

        _closePopup: function () {
            this._map.closePopup(this);
        },

        _isNode: function (o) { // (Object) -> Boolean
            return (o.nodeName ? true : false);
        },

        _initLayout: function () {
            originalInitLayout.call(this);
            this._innerContainer = DG.DomUtil.create('div', 'leaflet-popup-inner ' + this._popupHideClass, this._container);

            this.options.closeButton && this._innerContainer.appendChild(this._detachEl(this._closeButton));

            this._innerContainer.appendChild(this._detachEl(this._wrapper));
            
            var tip = this._detachEl(this._tipContainer);

            if (DG.Browser.svg) {
                var path = DG.SVG.create('path');
                var svgClass = this._popupTipClass + ' ' + this._popupTipClass + '_svg';

                path.setAttribute('d', this._tipSVGPath);

                tip = DG.SVG.create('svg'),
                tip.setAttribute('class', svgClass);

                tip.appendChild(path);
                DG.DomEvent.disableClickPropagation(path);
            } else {
                DG.DomUtil.addClass(tip, this._popupTipClass + '_image');
                DG.DomEvent.disableClickPropagation(tip);
            }

            this._innerContainer.appendChild(tip);
        },

        _clearElement: function (elem) { // (DOMElement) -> Popup
            this['_' + elem + 'Content'] = null;
            this._detachEl(this._popupStructure[elem]);
            delete this._popupStructure[elem];
            return this;
        },

        _updateScrollPosition: function () {
            this._baron && this._baron.update();
        },

        resize: function () {
            var scrollTop = this._isBaronExist ? this._scroller.scrollTop : false;

            this._updateLayout();
            this._updatePosition();

            if (this._isContentHeightFit()) {
                if (!this._isBaronExist) {
                    this._initBaronScroller();
                    this._initBaron();
                } else {
                    DG.DomUtil.removeClass(this._scroller, 'scroller_hidden_true');
                    DG.DomUtil.addClass(this._scroller, 'scroller_has-header_true');
                    DG.DomUtil.addClass(this._scroller, 'scroller');
                    if (scrollTop) {
                        this._scroller.scrollTop = scrollTop;
                    }
                    this._updateScrollPosition();
                }
            } else {
                if (this._isBaronExist) {
                    DG.DomUtil.addClass(this._scroller, 'scroller_hidden_true');
                    DG.DomUtil.removeClass(this._scroller, 'scroller_has-header_true');
                    DG.DomUtil.removeClass(this._scroller, 'scroller');
                    DG.DomEvent.off(this._scroller, 'scroll', this._onScroll);
                }
            }

            originalAdjustPan.call(this);
            this._bindAdjustPanOnTransitionEnd();
        },

        _adjustPan: function (e) {
            if (!this._map) { return; }

            if (e) {
                if (e.propertyName === 'max-height') {
                    setTimeout(originalAdjustPan.bind(this), 1); //JSAPI-3409 fix safari glich
                    DG.DomEvent.off(this._wrapper, DG.DomUtil.TRANSITION_END, this._adjustPan);
                }
            } else {
                originalAdjustPan.call(this);
            }
        },

        _bindAdjustPanOnTransitionEnd: function () {
            DG.DomUtil.TRANSITION ?
                DG.DomEvent.on(this._wrapper, DG.DomUtil.TRANSITION_END, this._adjustPan, this) :
                this._adjustPan();
        },

        _isContentHeightFit: function () { // () -> Boolean
            var popupHeight,
                maxHeight = this.options.maxHeight;

            popupHeight = this._popupStructure.body ?
                this._popupStructure.body.offsetHeight + this._getDelta() :
                this._contentNode.offsetHeight;

            popupHeight += this.options.border * 2;

            return (maxHeight && maxHeight < popupHeight); // dont need scroll on 300 height
        },

        _initBaronScroller: function () {
            var contentNode = this._popupStructure.body.parentNode,
                scrollerWrapper = this._scrollerWrapper =  DG.DomUtil.create('div', 'scroller__wrapper', contentNode),
                scroller = this._scroller = DG.DomUtil.create('div', 'scroller', scrollerWrapper),
                barWrapper = this._barWrapper = DG.DomUtil.create('div', 'scroller__bar-wrapper', scroller),
                innerHeight = this.options.maxHeight - this.options.border * 2;

            this._scrollerBar = DG.DomUtil.create('div', 'scroller__bar', barWrapper);
            scroller.appendChild(this._detachEl(this._popupStructure.body));

            innerHeight -= this._getDelta();
            scrollerWrapper.style.height = Math.max(18, innerHeight) + 'px';
            scrollerWrapper.style.width = contentNode.offsetWidth + 5 + 'px'; //TODO

            this._isBaronExist = true;

            if (!DG.Browser.touch) {
                DG.DomEvent
                    .on(contentNode, 'click', this._onClick, this)
                    .on(scroller, 'scroll', this._onScroll, this);
            }

            DG.DomEvent.on(this._popupStructure.body.parentNode, 'touchstart mousedown mousemove', this._onStart, this);

        },

        _onScroll: function (e) {
            this.fire('scroll', {originalEvent: e});
        },

        _onClick: function (e) {
            if (!this._moving) { this.fire('click', {originalEvent: e}); }
            DG.DomEvent.stop(e);
        },

        _onStart: function (e) {

            this._moved = false;

            if (this._moving) { return; }

            var first = e.touches ? e.touches[0] : e;

            this._startPoint = new DG.Point(first.clientX, first.clientY);

            DG.DomEvent
                .on(this._popupStructure.body.parentNode, 'touchmove', this._onMove, this)
                .on(this._popupStructure.body.parentNode, 'touchend', this._onEnd, this);
        },

        _onEnd: function (e) {

            DG.DomEvent
                .off(this._popupStructure.body.parentNode, 'touchmove', this._onMove, this)
                .off(this._popupStructure.body.parentNode, 'touchend', this._onEnd, this);

            this._onClick(e);

            this._moving = false;

        },

        _onMove: function (e) {

            console.log(e);

            if (e.touches && e.touches.length > 1) {
                this._moved = true;
                return;
            }

            var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
                newPoint = DG.point(first.clientX, first.clientY),
                offset = Math.abs(newPoint.subtract(this._startPoint).y);

            if (!offset || offset < 10) { return; }

            this._onScroll(e);

            this._moving = this._moved = true;

        },

        _initBaron: function () {
            var context = this._scrollerWrapper;
            this._baron = graf({
                scroller: '.scroller',
                bar: '.scroller__bar',
                track: '.scroller__bar-wrapper',
                $: function (selector) {
                    var node = {}.toString.call(selector) === '[object String]' ?
                        context.querySelector(selector) : selector;

                    return new BaronDomHelper(node);
                },
                event: function (elem, event, func, mode) {
                    event.split(' ').forEach(function (type) {
                        DG.DomEvent[mode || 'on'](elem, type, func);
                    });
                }
            });
        },

        _initHeader: function () {
            this._popupStructure.header = DG.DomUtil.create('header', 'dg-popup__header', this._contentNode);
        },

        _initFooter: function () {
            this._popupStructure.footer = DG.DomUtil.create('footer', 'dg-popup__footer', this._contentNode);
        },

        _initBodyContainer: function () {
            this._popupStructure.wrapper = DG.DomUtil.create('div', 'dg-popup__container-wrapper', this._contentNode);
            this._popupStructure.body = DG.DomUtil.create('div', 'dg-popup__container', this._popupStructure.wrapper);
        },

        update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearNode(this._contentNode);

            //init popup content dom structure
            this._headerContent && this._initHeader();
            this._bodyContent && this._initBodyContainer();
            this._footerContent && this._initFooter();

            this._updatePopupStructure();
            this.resize();
            DG.DomEvent.on(this._wrapper, 'click', DG.DomEvent.stopPropagation);
            if (DG.Browser.ielt9) {
                var elem = this._popupStructure.footer;
                if (elem) {
                    elem.className += ' ie8';
                }
            }

            this._container.style.visibility = '';

            DG.DomEvent.on(this._popupStructure.body.parentNode, DG.Browser.touch ? 'touchend' : 'click', this._onClick, this);
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
                DG.DomUtil.addClass(container, scrolledClass);
            } else {
                wrapperStyle.maxHeight = container.offsetHeight + this.options.border * 2 + 'px';
                DG.DomUtil.removeClass(container, scrolledClass);
            }

            style.whiteSpace = 'nowrap';
            width = wrapper.offsetWidth;
            style.whiteSpace = '';

            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);

            wrapperStyle.width = width + 'px';

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
            elem.parentNode && elem.parentNode.removeChild(elem);
            return elem;
        },

        _onCloseButtonClick: function (e) { // (Event)
            this._animateClosing();

            DG.DomUtil.TRANSITION ?
                DG.DomEvent.on(this._innerContainer, DG.DomUtil.TRANSITION_END, this._firePopupClose, this) :
                this._firePopupClose(e);
            DG.DomEvent.stop(e);
        },

        _firePopupClose: function (e) { // (Event)
            DG.DomUtil.TRANSITION && DG.DomEvent.off(this._innerContainer, DG.DomUtil.TRANSITION_END, this._firePopupClose, this);
            originalOnClose.call(this, e);
        }
    });
}());


DG.Map.include({
    _markerClass: 'dg-customization__marker_type_mushroom',
    _markerShowClass: 'dg-customization__marker_appear',
    _markerHideClass: 'dg-customization__marker_disappear',
    _dgHideClass: 'dg-popup_hidden_true',
    openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
        if (!(popup instanceof L.Popup)) {
            var content = popup;

            popup = new L.Popup(options).setContent(content);
        }

        if (latlng) {
            popup.setLatLng(latlng);
        }

        if (this.hasLayer(popup)) {
            return this;
        }

        this.closePopup();
        this._popup = popup;

        if (popup._source && popup._source._icon) {
            if (popup._source._icon.className.indexOf(this._markerClass) !== -1) {
                DG.DomUtil.removeClass(popup._source._icon, this._markerShowClass);
                DG.DomUtil.addClass(popup._source._icon, this._markerHideClass);
            } else {
                DG.DomUtil.addClass(popup._source._icon, this._dgHideClass);
                if (popup._source._shadow) {
                    DG.DomUtil.addClass(popup._source._shadow, this._dgHideClass);
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
                    DG.DomUtil.removeClass(popup._source._icon, this._markerHideClass);
                    DG.DomUtil.addClass(popup._source._icon, this._markerShowClass);
                } else {
                    DG.DomUtil.removeClass(popup._source._icon, this._dgHideClass);
                    if (popup._source._shadow) {
                        DG.DomUtil.removeClass(popup._source._shadow, this._dgHideClass);
                    }
                }
            }
            this.removeLayer(popup);
        }

        return this;
    }
});