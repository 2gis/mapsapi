// Adds 2GIS-related popup content wrapper and offset
(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalInitLayout = L.Popup.prototype._initLayout,
        originalOnClose = L.Popup.prototype._onCloseButtonClick,
        originalOnAdd = L.Popup.prototype.onAdd,
        originalOnRemove = L.Popup.prototype.onRemove,
        originalAdjustPan = L.Popup.prototype._adjustPan,
        /*global baron:false */
        graf = baron.noConflict();

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.include({
        _headerContent: null,
        _footerContent: null,
        _back: {},

        //baron elements references
        _scroller: null,
        _scrollerBar: null,
        _barWrapper: null,
        _baron: null,

        //structure flags
        _isHeaderExist: false,
        _isBodyExist: false,
        _isFooterExist: false,
        _isBaronExist: false,

        /*global __DGCustomization_TMPL__:false */
        _templates: __DGCustomization_TMPL__,

        onAdd: function (map) {
            map.on('dgEntranceShow', this._closePopup, this);
            this._popupStructure = {};
            this.once('open', this._animateOpening, this);
            return originalOnAdd.call(this, map);
        },

        onRemove: function (map) {
            map.off('dgEntranceShow', this._closePopup, this);
            return originalOnRemove.call(this, map);
        },

        setContent: function (content) {
            if (typeof content === 'object' && typeof content !== null) {
                for (var i in content) {
                    if (content.hasOwnProperty(i)) {
                        this['_' + i + 'Content'] = content[i];
                    }
                }
            } else {
                this._bodyContent = content;
            }

            this._update();

            return this;
        },

        setHeaderContent: function (content) {
            this._headerContent = content;
            this._update();

            return this;
        },

        setFooterContent: function (content) {
            this._footerContent = content;
            this._update();

            return this;
        },

        clear: function () {
            for (var i in this._popupStructure) {
                if (this._popupStructure.hasOwnProperty(i)) {
                    this._clearElement(i);
                }
            }

            // think about move this set to another public method
            this._isBaronExist = false;
            return this;
        },

        clearHeader: function () {
            return this._clearElement('header');
        },

        clearFooter: function () {
            return this._clearElement('footer');
        },

        findElement: function (node) {
            return this._contentNode.querySelector(node);
        },

        _animateOpening: function () {
            L.DomUtil.addClass(this._innerContainer, 'leaflet-popup_show_true');
            L.DomUtil.removeClass(this._innerContainer, 'leaflet-popup_show_false');
        },

        _animateClosing: function () {
            L.DomUtil.addClass(this._innerContainer, 'leaflet-popup_show_false');
            L.DomUtil.removeClass(this._innerContainer, 'leaflet-popup_show_true');
        },

        _closePopup: function () {
            this._map.closePopup(this);
        },

        _initLayout: function () {
            originalInitLayout.call(this);
            this._innerContainer = L.DomUtil.create('div', 'leaflet-popup-inner leaflet-popup_show_false', this._container);
            if (this.options.closeButton) {
                this._innerContainer.appendChild(this._detachEl(this._closeButton));
            }
            this._innerContainer.appendChild(this._detachEl(this._wrapper));
            this._innerContainer.appendChild(this._detachEl(this._tipContainer));
            L.DomEvent.disableClickPropagation(this._tipContainer);
        },

        _clearElement: function (elem) {
            if (this._popupStructure[elem]) {
                this['_' + elem + 'Content'] = null;
                this._popupStructure[elem].parentNode.removeChild(this._popupStructure[elem]);
                delete this._popupStructure[elem];
            }
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
                }
            }

            this._bindAdjustPan();
        },

        _adjustPan: function (ie9) {
            originalAdjustPan.call(this);
            if (!ie9) {
                L.DomEvent.off(this._wrapper, this._whichTransitionEvent(), this._adjustPan);
            }
        },

        _whichTransitionEvent: function () {
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
        },

        _bindAdjustPan: function () {
            var event = this._whichTransitionEvent();
            if (event) {
                L.DomEvent.on(this._wrapper, this._whichTransitionEvent(), this._adjustPan, this);
            } else {
                this._adjustPan(true);
            }
        },

        _isContentHeightFit: function () {
            var popupHeight = this._contentNode.offsetHeight + 32, //TODO: remove bone
                maxHeight = this.options.maxHeight;

            return (maxHeight && maxHeight <= popupHeight);
        },

        _initBaronScroller: function () {
            var contentNode = this._popupStructure.body.parentNode,
                scrollerWrapper = L.DomUtil.create('div', 'scroller-wrapper', contentNode),
                scroller = this._scroller = L.DomUtil.create('div', 'scroller', scrollerWrapper),
                barWrapper = this._barWrapper = L.DomUtil.create('div', 'scroller__bar-wrapper', scroller),
                innerHeight = this.options.maxHeight - 32; //TODO: remove bone

            this._scrollerBar = L.DomUtil.create('div', 'scroller__bar', barWrapper);
            scroller.appendChild(this._detachEl(this._popupStructure.body));

            innerHeight -= this._getDelta();
            scrollerWrapper.style.height = innerHeight + 'px';
            scrollerWrapper.style.width = contentNode.offsetWidth + 'px';

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
            this._isHeaderExist = true;
        },

        _initFooter: function () {
            this._popupStructure.footer = L.DomUtil.create('footer', 'dg-popup-footer', this._contentNode);
            this._isFooterExist = true;
        },

        _initBodyContainer: function () {
            this._popupStructure.wrapper = L.DomUtil.create('div', 'dg-popup-container-wrapper', this._contentNode);
            this._popupStructure.body = L.DomUtil.create('div', 'dg-popup-container', this._popupStructure.wrapper);
            this._isBodyExist = true;
        },

        _update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearStructure(this._contentNode);
            this._isHeaderExist = false;
            this._isBodyExist = false;
            this._isFooterExist = false;
            // this._wrapper.style.height = this.options.minHeight + 'px';
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

            // Delete this if fixed in new leaflet version (> 0.6.2)
            L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);

            this._container.style.visibility = '';
        },

        _getDelta: function () {
            var delta = 0,
                popup = this._popupStructure;

            if (this._isHeaderExist) {
                delta += popup.header.offsetHeight;
            }
            if (this._isFooterExist) {
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

            style.whiteSpace = 'nowrap';
            width = wrapper.offsetWidth;
            style.whiteSpace = '';

            if (this._isContentHeightFit()) {
                wrapperStyle.height = this.options.maxHeight + 'px';
                width += 10; //TODO: remove bone
                L.DomUtil.addClass(container, scrolledClass);
            } else {
                wrapperStyle.height = 'auto';
                L.DomUtil.removeClass(container, scrolledClass);
            }

            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);

            wrapperStyle.width = width + 'px';
            wrapperStyle.opacity = 1;
            this._containerWidth = this._container.offsetWidth;
        },

        _updatePopupStructure: function () {
            var popupStructure = this._popupStructure;

            for (var i in popupStructure) {
                if (popupStructure.hasOwnProperty(i)) {
                    this._insertContent(this['_' + i + 'Content'], popupStructure[i]);
                }
            }

            this.fire('contentupdate');
        },

        _insertContent: function (content, node) {
            if (!content) { return; }

            if (typeof content === 'string') {
                node.innerHTML = content;
            } else {
                if (!node) { return; }

                this._clearStructure(node);
                node.appendChild(content);
            }
        },

        _clearStructure: function (node) {
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
        },

        _detachEl: function (elem) {
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
            return elem;
        },

        _onCloseButtonClick: function (e) {
            var self = this;
            this._animateClosing();
            setTimeout(function () { //devil action
                originalOnClose.call(self, e);
            }, 200);
            L.DomEvent.stop(e);
        }
    });
}());


L.Map.include({
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
            if (popup._source._icon.className.indexOf('dg-customization__marker_type_mushroom') !== -1) {
                L.DomUtil.removeClass(popup._source._icon, 'dg-customization__marker_appear');
                L.DomUtil.addClass(popup._source._icon, 'dg-customization__marker_disappear');
            } else {
                L.DomUtil.addClass(popup._source._icon, 'dg-hidden');
                if (popup._source._shadow) {
                    L.DomUtil.addClass(popup._source._shadow, 'dg-hidden');
                }
            }
        }

        return this.addLayer(popup);
    },

    closePopup: function (popup) {
        if (!popup || popup === this._popup) {
            popup = this._popup;
            this._popup = null;
        }
        if (popup) {
            if (popup._source && popup._source._icon) {
                if (popup._source._icon.className.indexOf('dg-customization__marker_type_mushroom') !== -1) {
                    L.DomUtil.removeClass(popup._source._icon, 'dg-customization__marker_disappear');
                    L.DomUtil.addClass(popup._source._icon, 'dg-customization__marker_appear');
                } else {
                    L.DomUtil.removeClass(popup._source._icon, 'dg-hidden');
                    if (popup._source._shadow) {
                        L.DomUtil.removeClass(popup._source._shadow, 'dg-hidden');
                    }
                }
            }
            this.removeLayer(popup);
            popup._isOpen = false;
        }

        return this;
    }
});
