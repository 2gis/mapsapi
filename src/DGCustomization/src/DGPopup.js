// Adds 2GIS-related popup content wrapper and offset
(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalInitLayout = L.Popup.prototype._initLayout,
        originalOnClose = L.Popup.prototype._onCloseButtonClick,
        originalOnAdd = L.Popup.prototype.onAdd,
        originalOnRemove = L.Popup.prototype.onRemove,
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

        scrollTo: function (to) {
            var duration = 200,
                element = this._scroller,
                start = element.scrollTop,
                change = to - start,
                startTime = null;

            var ease = function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            };

            var animateScroll = function (currentTime) {
                currentTime = currentTime ? currentTime : (new Date()).getTime();
                if (!startTime) {
                    startTime = currentTime;
                }
                var timeFrame = currentTime - startTime;

                element.scrollTop = ease(timeFrame, start, change, duration);

                if (currentTime - startTime < duration) {
                    L.Util.requestAnimFrame(animateScroll, element);
                } else {
                    element.scrollTop = to;
                }
            };
            L.Util.requestAnimFrame(animateScroll, element);

            return this;
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

        _resize: function () {
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

            this._adjustPan();
        },

        _isContentHeightFit: function () {
            var popupHeight = this._contentNode.offsetHeight,
                maxHeight = this.options.maxHeight;

            return (maxHeight && maxHeight <= popupHeight);
        },

        _initBaronScroller: function () {
            var contentNode = this._popupStructure.body.parentNode,
                scrollerWrapper = L.DomUtil.create('div', 'scroller-wrapper', contentNode),
                scroller = this._scroller = L.DomUtil.create('div', 'scroller', scrollerWrapper),
                barWrapper = this._barWrapper = L.DomUtil.create('div', 'scroller__bar-wrapper', scroller);

            this._scrollerBar = L.DomUtil.create('div', 'scroller__bar', barWrapper);
            scroller.appendChild(this._detachEl(this._popupStructure.body));
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
            this._popupStructure.header = L.DomUtil.create('div', 'dg-popup-header', this._contentNode);
            this._isHeaderExist = true;
        },

        _initFooter: function () {
            this._popupStructure.footer = L.DomUtil.create('div', 'dg-popup-footer', this._contentNode);
            this._isFooterExist = true;
        },

        _initBodyContainer: function () {
            var bodyWrapper = L.DomUtil.create('div', 'dg-popup-container-wrapper', this._contentNode);
            this._popupStructure.body = L.DomUtil.create('div', 'dg-popup-container', bodyWrapper);
            this._isBodyExist = true;
        },

        _update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearStructure(this._contentNode);
            this._isHeaderExist = false;
            this._isBodyExist = false;
            this._isFooterExist = false;

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
            this._resize();
            L.DomEvent.on(this._wrapper, 'click', L.DomEvent.stopPropagation);

            // Delete this if fixed in new leaflet version (> 0.6.2)
            L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);

            this._container.style.visibility = '';
        },

        _updateLayout: function () {
            var container = this._contentNode,
                style = container.style;

            style.width = '';
            style.whiteSpace = 'nowrap';

            var width = container.offsetWidth;
            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);

            style.width = width + 'px';
            style.whiteSpace = '';

            style.height = '';

            var height = container.offsetHeight,
                maxHeight = this.options.maxHeight,
                minHeight = this.options.minHeight || 0,
                scrolledClass = 'leaflet-popup-scrolled';

            this._isBaronExist = false; //may case bugs
            if (maxHeight && height > maxHeight) {
                style.height = maxHeight + 'px';
                L.DomUtil.addClass(container, scrolledClass);

            } else {
                style.height = Math.max(height, minHeight) + 'px';
                L.DomUtil.removeClass(container, scrolledClass);
            }
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
            L.DomUtil.addClass(popup._source._icon, 'leaflet-marker-active');
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
                L.DomUtil.removeClass(popup._source._icon, 'leaflet-marker-active');
            }
            this.removeLayer(popup);
            popup._isOpen = false;
        }

        return this;
    }
});