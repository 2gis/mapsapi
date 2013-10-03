// Adds 2GIS-related popup content wrapper and offset
(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalOnAdd = L.Popup.prototype.onAdd,
        originalOnRemove = L.Popup.prototype.onRemove,
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

        _templates: __DGCustomization_TMPL__,

        onAdd: function (map) {
            map.on('dgEntranceShow', function () {
                map.closePopup(this);
            }, this);
            this._popupStructure = {};

            return originalOnAdd.call(this, map);
        },

        onRemove: function (map) {
            map.off('dgEntranceShow', function () {
                map.closePopup(this);
            }, this);

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
            var i;
            if (arguments.length) {
                for (i = arguments.length - 1; i >= 0; i--) {
                    this._clearElement(arguments[i]);
                }
            } else {
                for (i in this._popupStructure) {
                    if (this._popupStructure.hasOwnProperty(i)) {
                        this._clearElement(i);
                    }
                }
            }
            // think about remove this set to another public method
            this._isBaronExist = false;

            return this;
        },

        clearHeader: function () {
            return this.clear('header');
        },

        clearFooter: function () {
            return this.clear('footer');
        },

        findElement: function (node) {
            return this._contentNode.querySelector(node);
        },

        showLoader: function (tmpl) {
            this.clear();
            var html = tmpl || this._templates.loader;

            this._contentNode.innerHTML = html;

            return this;
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
                    L.Util.requestAnimFrame(arguments.callee, element);
                } else {
                    element.scrollTop = to;
                }
            };
            L.Util.requestAnimFrame(animateScroll, element);

            return this;
        },

        _clearElement: function (elem) {
            if (this._popupStructure[elem]) {
                this['_' + elem + 'Content'] = null;
                this._contentNode.removeChild(this._popupStructure[elem]);
                delete this._popupStructure[elem];
            }
        },

        _updateScrollPosition: function () {
            this._baron && this._baron.update();
        },

        _resize: function () {
            var isBaronExist = this._isBaronExist,
                scrollTop = isBaronExist ? this._scroller.scrollTop : false,
                shouldShowBaron;

            this._updateLayout();
            this._updatePosition();

            shouldShowBaron = this._isContentHeightFit();
            if (shouldShowBaron) {
                if (!isBaronExist) {
                    this._initBaronScroller();
                    this._initBaron();
                } else {
                    L.DomUtil.removeClass(this._scroller, 'dg-baron-hide');
                    L.DomUtil.addClass(this._scroller, 'scroller-with-header');
                    L.DomUtil.addClass(this._scroller, 'scroller');
                    if (scrollTop) {
                        this._scroller.scrollTop = scrollTop;
                    }
                    this._updateScrollPosition();
                }
            } else {
                if (isBaronExist) {
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

        _initBaron: function () {
            this._baron = graf({
                scroller: '.scroller',
                bar: '.scroller__bar',
                track: '.scroller__bar-wrapper',
                $: function (selector, context) {
                    return bonzo(qwery(selector, context));
                },
                event: function (elem, event, func, mode) {
                    if (mode === 'trigger') {
                        mode = 'fire';
                    }
                    bean[mode || 'on'](elem, event, func);
                }
            });
        },

        _initHeader: function () {
            var headerContainer = document.createElement('div');
            headerContainer.setAttribute('class', 'dg-popup-header');
            this._contentNode.appendChild(headerContainer);

            this._popupStructure.header = headerContainer;
            this._isHeaderExist = true;
        },

        _initFooter: function () {
            var footerContainer = document.createElement('div');
            footerContainer.setAttribute('class', 'dg-popup-footer');
            this._contentNode.appendChild(footerContainer);

            this._popupStructure.footer = footerContainer;
            this._isFooterExist = true;
        },

        _initBodyContainer: function () {
            var container = document.createElement('div');
            container.setAttribute('class', 'dg-popup-container');
            this._contentNode.appendChild(container);

            this._popupStructure.body = container;
            this._isBodyExist = true;
        },

        _initBaronScroller: function () {
            var scroller = document.createElement('div'),
                barWrapper = document.createElement('div'),
                scrollerBar = document.createElement('div'),
                contentNode = this._contentNode,
                footer = this.findElement('.dg-popup-footer');

            this._detachEl(this._popupStructure.body);
            scroller.setAttribute('class', 'scroller');
            barWrapper.setAttribute('class', 'scroller__bar-wrapper');
            scrollerBar.setAttribute('class', 'scroller__bar');

            if (this._isFooterExist || this._isHeaderExist) {
                scroller.className += ' scroller-with-header';
            }

            barWrapper.appendChild(scrollerBar);
            scroller.appendChild(this._popupStructure.body);
            scroller.appendChild(barWrapper);

            contentNode.insertBefore(scroller, footer);

            this._scroller = scroller;
            this._scrollerBar = scrollerBar;
            this._barWrapper = barWrapper;
            this._isBaronExist = true;

            L.DomEvent.on(this._scroller, 'scroll', this._onScroll, this);
        },

        _onScroll: function (event) {
            this.fire('dgScroll', {originalEvent: event});
        },

        _update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearStructure(this._contentNode);
            this._isHeaderExist = false;
            this._isBodyExist = false;
            this._isFooterExist = false;

            //init popup content dom structure
            this._headerContent && this._initHeader();
            this._bodyContent && this._initBodyContainer();
            this._footerContent && this._initFooter();

            this._updatePopupStructure();
            this._resize();
            L.DomEvent.on(this._wrapper, 'click', L.DomEvent.stopPropagation);
            // L.DomEvent.disableClickPropagation(this._wrapper);
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
            if (popup._source._icon.className.indexOf('map__marker-type-mushroom') !== -1) {
                L.DomUtil.removeClass(popup._source._icon, 'map__marker-appear');
                L.DomUtil.addClass(popup._source._icon, 'map__marker-disappear');
            } else {
                L.DomUtil.addClass(popup._source._icon, 'dg-hidden');
                popup._source._shadow && L.DomUtil.addClass(popup._source._shadow, 'dg-hidden');
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
                if (popup._source._icon.className.indexOf('map__marker-type-mushroom') !== -1) {
                    L.DomUtil.removeClass(popup._source._icon, 'map__marker-disappear');
                    L.DomUtil.addClass(popup._source._icon, 'map__marker-appear');
                } else {
                    L.DomUtil.removeClass(popup._source._icon, 'dg-hidden');
                    popup._source._shadow && L.DomUtil.removeClass(popup._source._shadow, 'dg-hidden');
                }
            }
            this.removeLayer(popup);
            popup._isOpen = false;
        }

        return this;
    }
});
