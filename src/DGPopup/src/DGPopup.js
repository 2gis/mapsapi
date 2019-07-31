require('../../../vendors/baron');

// 2GIS-related popup content wrapper and offset
(function() {
    var offsetX = DG.configTheme.balloonOptions.offset.x,
        offsetY = DG.configTheme.balloonOptions.offset.y,
        originalInitialize = DG.Popup.prototype.initialize,
        originalInitLayout = DG.Popup.prototype._initLayout,
        originalOnAdd = DG.Popup.prototype.onAdd,
        graf = baron.noConflict();

    var BaronDomHelper = function(element) {
        this[0] = element;
        this.length = 1;
    };
    BaronDomHelper.prototype = {
        setAttribute: function(name, value) {
            this[0].setAttribute(name, value);
            return this;
        },
        getAttribute: function(name) {
            return this[0].getAttribute(name);
        },
        removeAttribute: function(name) {
            this[0].removeAttribute(name);
            return this;
        },
        css: function(style, value) {
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
        border: 16,
        mapControlsWidth: 60,
        textDirection: 'auto' // 'auto' | 'ltr' | 'rtl
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

        _popupShowClass: 'leaflet-popup_show_true',
        _popupHideClass: 'leaflet-popup_show_false',

        _popupTipClass: 'leaflet-popup-tip-container',
        _tipSVGPath: 'M0 0c12.643 0 28 7.115 28 44h2c0-36.885 15.358-44 28-44h-58z',

        _isAutoPanPaddingUserDefined: false,

        initialize: function(options, source) { // (Object, Object)
            this._popupStructure = {};
            this._isAutoPanPaddingUserDefined = options && options.hasOwnProperty('autoPanPadding');
            originalInitialize.call(this, options, source);
        },

        onAdd: function(map) { // (Map)
            map.on({
                entranceshow: this._closePopup,
                resize: this.resize
            }, this);
            originalOnAdd.call(this, map);
            this._animateOpening();

            // Monitor popups usage
            // TODO: remove after successful research
            if (typeof ga !== undefined) {
                // eslint-disable-next-line no-undef
                ga(DG.config.gaName + '.send', 'event', 'Popup', 'Use');
            }
        },

        onRemove: function(map) { // (Map)
            this._animateClosing();
            map.off({
                entranceshow: this._closePopup,
                resize: this.resize
            }, this);

            if (DG.DomUtil.TRANSITION) {
                this._removeTimeout = setTimeout(L.bind(L.DomUtil.remove, L.DomUtil, this._container), 200);
            } else {
                L.DomUtil.remove(this._container);
            }

            map.fire('popupclose', {popup: this});

            if (this._source) {
                this._source.fire('popupclose', {popup: this}, true);
            }
        },

        setContent: function(content) { // (DOMElement | Object | HTML) -> Popup
            if (!this._isNode(content) && typeof content === 'object') {
                Object.keys(content).forEach(function(item) {
                    this['_' + item + 'Content'] = content[item];
                }, this);
            } else {
                this._bodyContent = content;
            }

            this.update();

            return this;
        },

        setHeaderContent: function(content) { // (HTML) -> Popup
            this._headerContent = content;
            this.update();

            return this;
        },

        setFooterContent: function(content) { // (HTML) -> Popup
            this._footerContent = content;
            this.update();

            return this;
        },

        getContent: function() { // () -> HTML
            return this._bodyContent;
        },

        getHeaderContent: function() { // () -> HTML
            return this._headerContent;
        },

        getFooterContent: function() { // () -> HTML
            return this._footerContent;
        },

        clear: function() { // () -> Popup
            Object.keys(this._popupStructure).forEach(this._clearElement, this);

            // think about move this set to another public method
            this._isBaronExist = false;
            return this;
        },

        clearHeader: function() { // () -> Popup
            return this._clearElement('header');
        },

        clearFooter: function() { // () -> Popup
            return this._clearElement('footer');
        },

        findElement: function(element) { // (String) -> DOMElement
            return this._contentNode.querySelector(element);
        },

        _animateOpening: function() {
            DG.DomUtil.addClass(this._innerContainer, this._popupShowClass);
            DG.DomUtil.removeClass(this._innerContainer, this._popupHideClass);
        },

        _animateClosing: function() {
            DG.DomUtil.addClass(this._innerContainer, this._popupHideClass);
            DG.DomUtil.removeClass(this._innerContainer, this._popupShowClass);
        },

        _closePopup: function() {
            this._map.closePopup(this);
        },

        _isNode: function(o) { // (Object) -> Boolean
            return (o.nodeName ? true : false);
        },

        _onCloseButtonClick: function(e) {
            if (this._map) {
                this._map.closePopup(this);
            }
            L.DomEvent.stop(e);
        },

        _close: function() {
            if (this._map) {
                if (DG.Browser.mobile && this._map.geoclicker &&
                    (this.options.closeOnClick || this._map.options.closePopupOnClick)) {
                    //  We need to signal geoclicker that popup was open before 'click' event
                    //  But by time it will get it's event the popup will be already closed
                    //  See 'DGGeoclicker' for '_mapEventsListeners' and '_singleClick' method
                    this._map.geoclicker.popupWasOpen = true;
                }

                this._map.closePopup(this);
            }
        },

        _initLayout: function() {
            originalInitLayout.call(this);

            // Prevents scroll events for div.leaflet-popup-content (this._contentNode) from web page scrolling when popup is opened
            DG.DomEvent.on(this._contentNode, 'wheel', function(e) {
                var eventPath;

                if (e.composedPath) {
                    eventPath = e.composedPath();
                } else {
                    var elem = e.target;
                    eventPath = [];
                    while (elem.parentNode) {
                        eventPath.push(elem);
                        elem = elem.parentNode;
                    }
                }

                if (eventPath.indexOf(this._scroller) === -1 || eventPath.indexOf(this._barWrapper) !== -1) {
                    e.preventDefault();
                }
            }, this);

            this._innerContainer = DG.DomUtil.create('div', 'leaflet-popup-inner ' + this._popupHideClass, this._container);

            // Prevents mouse events from leaking through close button
            // See https://github.com/2gis/mapsapi/pull/153/
            DG.DomEvent.disableClickPropagation(this._innerContainer);

            if (this.options.closeButton) {
                this._innerContainer.appendChild(this._detachEl(this._closeButton));
            }

            this._innerContainer.appendChild(this._detachEl(this._wrapper));

            var tip = this._detachEl(this._tipContainer);

            if (DG.Browser.svg) {
                var path = DG.SVG.create('path');
                var svgClass = this._popupTipClass + ' ' + this._popupTipClass + '_svg';

                path.setAttribute('d', this._tipSVGPath);

                tip = DG.SVG.create('svg');
                tip.setAttribute('class', svgClass);

                tip.appendChild(path);
                DG.DomEvent.disableClickPropagation(path);
            } else {
                DG.DomUtil.addClass(tip, this._popupTipClass + '_image');
                DG.DomEvent.disableClickPropagation(tip);
            }

            this._innerContainer.appendChild(tip);
        },

        _clearElement: function(elem) { // (DOMElement) -> Popup
            this['_' + elem + 'Content'] = null;
            this._detachEl(this._popupStructure[elem]);
            delete this._popupStructure[elem];
            return this;
        },

        _updateScrollPosition: function() {
            if (this._baron) {
                this._baron.update();
            }
        },

        resize: function() {
            var scrolled = this._updateLayout();
            this._updatePosition();

            if (!scrolled) {
                if (this._isBaronExist) {
                    this._scrollerWrapper.style.height = '';
                    DG.DomUtil.removeClass(this._scroller, 'dg-scroller');

                    DG.DomUtil.addClass(this._scroller, 'dg-scroller_hidden_true');
                    DG.DomUtil.removeClass(this._scroller, 'dg-scroller');
                    DG.DomEvent.off(this._scroller, 'scroll', this._onScroll);
                }
            } else if (this._isBaronExist) {
                DG.DomUtil.removeClass(this._scroller, 'dg-scroller_hidden_true');
                DG.DomUtil.addClass(this._scroller, 'dg-scroller');

                var scrollTop = this._isBaronExist ? this._scroller.scrollTop : false;

                if (scrollTop) {
                    this._scroller.scrollTop = scrollTop;
                }

                var innerHeight = this.options.maxHeight - this.options.border * 2 - this._getDelta();
                this._scrollerWrapper.style.height = innerHeight + 'px';

                this._updateScrollPosition();
            } else if (!this._isContentHeightEnough()) {
                this._initBaronScroller();
                this._initBaron();
            }

            this._adjustPan();
            this._bindAdjustPanOnTransitionEnd();
        },

        _adjustPan: function(e) {
            if (!this._map) { return; }

            if (e) { // animated popup is opening (height from 0 to max)
                if (e.propertyName === 'max-height') {
                    // when it's finished we are here
                    DG.DomEvent.off(this._wrapper, DG.DomUtil.TRANSITION_END, this._adjustPan);
                } else {
                    // here's intermediate steps - we don't need to process them
                    return;
                }
            }

            var options = this.options;

            if (!options.autoPan) { return; }

            var map = this._map,
                containerHeight = this._container.offsetHeight,
                containerWidth = this._containerWidth,
                layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

            if (this._zoomAnimated) {
                layerPos._add(L.DomUtil.getPosition(this._container));
            }

            var autoPanPadding = [options.autoPanPadding[0], options.autoPanPadding[1]];

            // if width of map is more then width of popup and controls
            // set default autoPanPadding to width controls
            if (
                !this._isAutoPanPaddingUserDefined &&
                    this._map._container.offsetWidth >= options.maxWidth + options.mapControlsWidth * 2
            ) {
                autoPanPadding[0] = options.mapControlsWidth;
            }

            var containerPos = map.layerPointToContainerPoint(layerPos),
                padding = L.point(autoPanPadding),
                paddingTL = L.point(options.autoPanPaddingTopLeft || padding),
                paddingBR = L.point(options.autoPanPaddingBottomRight || padding),
                size = map.getSize(),
                dx = 0,
                dy = 0;

            if (size.x === 0 || size.y === 0) {
                // map isn't visible
                return;
            }

            if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
                dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) { // left
                dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
                dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) { // top
                dy = containerPos.y - paddingTL.y;
            }

            if (dx || dy) {
                map
                    .fire('autopanstart')
                    .panBy([dx, dy]);
            }
        },

        _bindAdjustPanOnTransitionEnd: function() {
            if (DG.DomUtil.TRANSITION) {
                DG.DomEvent.on(this._wrapper, DG.DomUtil.TRANSITION_END, this._adjustPan, this);
            } else {
                this._adjustPan();
            }
        },

        _isContentHeightEnough: function() { // () -> Boolean
            var options = this.options;

            if (!options.maxHeight) {
                return true;
            }

            var popupHeight = this._popupStructure.body ?
                this._popupStructure.body.offsetHeight + this._getDelta() :
                this._contentNode.offsetHeight;

            popupHeight += options.border * 2;

            return popupHeight <= options.maxHeight;
        },

        _initBaronScroller: function() {
            var contentNode = this._popupStructure.body.parentNode,
                scrollerWrapper = this._scrollerWrapper = DG.DomUtil.create('div', 'dg-scroller__wrapper', contentNode),
                scroller = this._scroller = DG.DomUtil.create('div', 'dg-scroller', scrollerWrapper),
                barWrapper = this._barWrapper = DG.DomUtil.create('div', 'dg-scroller__bar-wrapper', scroller),
                innerHeight = this.options.maxHeight - this.options.border * 2;

            this._scrollerBar = DG.DomUtil.create('div', 'dg-scroller__bar', barWrapper);
            scroller.appendChild(this._detachEl(this._popupStructure.body));

            innerHeight -= this._getDelta();
            scrollerWrapper.style.height = Math.max(18, innerHeight) + 'px';
            scrollerWrapper.style.width = contentNode.offsetWidth + 5 + 'px'; //TODO

            this._isBaronExist = true;

            this._switchEvents();
        },

        _onScroll: function(e) {
            this.fire('scroll', {originalEvent: e});
        },

        _onClick: function(e) {
            e.target = e.target || e.srcElement;

            if (!this._moving) {
                this.fire('click', {originalEvent: e});
            }
        },

        _onStart: function(e) {
            this._moved = false;

            if (this._moving) { return; }

            var first = e.touches ? e.touches[0] : e;

            this._startPoint = new DG.Point(first.clientX, first.clientY);

            this._toggleTouchEvents();
        },

        _onEnd: function(e) {
            this._toggleTouchEvents(true);

            this._onClick(e);

            this._moving = false;
        },

        _onMove: function(e) {

            if (e.touches && e.touches.length > 1) {
                this._moved = true;
                return;
            }

            var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
                newPoint = DG.point(first.clientX, first.clientY),
                offset = Math.abs(newPoint.subtract(this._startPoint).y);

            if (!offset || offset < 10) { return; }

            this._moving = this._moved = true;

        },

        _initBaron: function() {
            var context = this._scrollerWrapper;
            this._baron = graf({
                scroller: '.dg-scroller',
                bar: '.dg-scroller__bar',
                track: '.dg-scroller__bar-wrapper',
                $: function(selector) {
                    var node = {}.toString.call(selector) === '[object String]' ?
                        context.querySelector(selector) : selector;

                    return new BaronDomHelper(node);
                },
                event: function(elem, event, func, mode) {
                    event.split(' ').forEach(function(type) {
                        DG.DomEvent[mode || 'on'](elem, type, func);
                    });
                }
            });
        },

        _initHeader: function() {
            this._popupStructure.header = DG.DomUtil.create('header', 'dg-popup__header', this._contentNode);
            this._popupStructure.header.setAttribute('dir', this.options.textDirection);
        },

        _initFooter: function() {
            this._popupStructure.footer = DG.DomUtil.create('footer', 'dg-popup__footer', this._contentNode);
            this._popupStructure.footer.setAttribute('dir', this.options.textDirection);
        },

        _initBodyContainer: function() {
            this._popupStructure.wrapper = DG.DomUtil.create('div', 'dg-popup__container-wrapper', this._contentNode);
            this._popupStructure.body = DG.DomUtil.create('div', 'dg-popup__container', this._popupStructure.wrapper);
            this._popupStructure.body.setAttribute('dir', this.options.textDirection);
        },

        update: function() {
            if (!this._map) { return; }

            if (!DG.Browser.ielt9) {
                this._container.style.visibility = 'hidden';
            }
            this._switchEvents(true);

            this._clearNode(this._contentNode);
            this._isBaronExist = false;

            // init popup content dom structure
            if (this._headerContent) { this._initHeader(); }
            if (this._bodyContent) { this._initBodyContainer(); }
            if (this._footerContent) { this._initFooter(); }

            this._updatePopupStructure();
            this.resize();

            DG.DomEvent.on(this._wrapper, 'click', DG.DomEvent.stopPropagation);
            this._switchEvents();

            if (DG.Browser.ielt9) {
                var elem = this._popupStructure.footer;
                if (elem) {
                    elem.className += ' ie8';
                }
            }

            if (!DG.Browser.ielt9) {
                this._container.style.visibility = '';
            }
        },

        _getDelta: function() { // () -> Number
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

        _updateLayout: function() {
            var opts = this.options,
                content = this._contentNode, // leaflet-popup-content
                wrapper = this._wrapper, // leaflet-popup-content-wrapper
                style = content.style,
                wrapperStyle = wrapper.style,
                width,
                scrolledClass = 'leaflet-popup-scrolled',
                result = false;

            style.margin = opts.border + 'px';

            DG.DomUtil.removeClass(content, scrolledClass);

            if (this._isContentHeightEnough()) {
                wrapperStyle.maxHeight = content.offsetHeight + opts.border * 2 + 'px';
            } else {
                wrapperStyle.maxHeight = opts.maxHeight + 'px';
                DG.DomUtil.addClass(content, scrolledClass);
                result = true;
            }

            var availableWidth = opts.autoPanPadding[0] * 2;

            if (opts.sprawling) {
                width = opts.maxWidth;

                width = Math.min(width, this._map._container.offsetWidth - availableWidth);
                width = Math.max(width, opts.minWidth);
            } else {
                wrapperStyle.width = '';

                style.whiteSpace = 'nowrap';
                width = wrapper.offsetWidth;
                style.whiteSpace = '';

                width = Math.min(width, this._map._container.offsetWidth - availableWidth);
                width = Math.min(Math.max(width, opts.minWidth), opts.maxWidth);
            }

            wrapperStyle.width = width + 'px';

            this._containerWidth = this._container.offsetWidth;

            return result;
        },

        _updatePopupStructure: function() {
            Object.keys(this._popupStructure).forEach(function(item) {
                this._insertContent(this['_' + item + 'Content'], this._popupStructure[item]);
            }, this);

            this.fire('contentupdate');
        },

        _insertContent: function(content, node) { // (String | DOMElement, DOMElement)
            if (!content || !node) { return; }

            content = (typeof content === 'function') ? content(this._source || this) : content;

            if (typeof content === 'string') {
                node.innerHTML = content;
            } else {
                this._clearNode(node);
                node.appendChild(content);
            }
        },

        _clearNode: function(node) { // (DOMElement)
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
        },

        _detachEl: function(elem) { // (DOMElement) -> DOMElement
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
            return elem;
        },

        _switchEvents: function(on) { // (Boolean)
            var switcher = on ? 'off' : 'on';

            if (!DG.Browser.touch) {
                DG.DomEvent[switcher](this._contentNode, 'click', this._onClick, this);
            } else {
                DG.DomEvent[switcher](this._contentNode, 'touchstart mousedown mousemove', this._onStart, this);
            }

            if (this._isBaronExist) {
                DG.DomEvent[switcher](this._scroller, 'scroll', this._onScroll, this);
            }
        },

        _toggleTouchEvents: function(on) {
            var switcher = on ? 'off' : 'on';

            DG.DomEvent[switcher](this._contentNode, 'touchmove', this._onMove, this);
            DG.DomEvent[switcher](this._contentNode, 'touchend', this._onEnd, this);
        }

    });
}());


DG.Map.include({
    _markerClass: 'dg-customization__marker_type_mushroom',
    _markerShowClass: 'dg-customization__marker_appear',
    _markerHideClass: 'dg-customization__marker_disappear',
    _dgHideClass: 'dg-popup_hidden_true',
    openPopup: function(popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
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

        if (this._popup && this._popup.options.autoClose) {
            this.closePopup();
        }

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

    closePopup: function(popup) {  // (Popup) -> Popup
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
