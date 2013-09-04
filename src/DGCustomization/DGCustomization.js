// Sets default zoom position from current theme

L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};

// TODO: think about pull request to leaflet with zoom control button's titles as options

L.Control.Zoom.prototype.onAdd = function (map) {
    var zoomName = 'dg-zoom',
        container = L.DomUtil.create('div', zoomName),
        projectLeaveMaxZoom = '__PROJECT_LEAVE_MAX_ZOOM__';

    this._map = map;
    this._zoomInButton = this._createButton('+', 'Приблизить', zoomName + '__in', container, this._zoomIn, this);
    this._zoomOutButton = this._createButton('-', 'Отдалить', zoomName + '__out', container, this._zoomOut, this);

    map.on('zoomend zoomlevelschange', this._updateDisabled, this);
    map.on('dgProjectLeave', function() {
        map.setMaxZoom(projectLeaveMaxZoom);
        if (map.getZoom() > projectLeaveMaxZoom) {
            map.setZoom(projectLeaveMaxZoom);
        };
    });

    map.on('dgProjectChange', function(project) {
        var projectInfo = project.getProject();
        if (projectInfo) {
            map.setMaxZoom(projectInfo.max_zoom_level);
        }
    });
    return container;
};

// Adds 2GIS-related popup content wrapper and offset
(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalOnAdd = L.Popup.prototype.onAdd,
        originalOnRemove = L.Popup.prototype.onRemove,
        graf = baron.noConflict(),
        tmpl = __DGCustomization_TMPL__;

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.include({
        _headerContent: null,
        _footerContent: null,

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

        onAdd: function (map) {
            map.on('dgEntranceShow', function() {
                map.closePopup(this);
            }, this);
            this._popupStructure = {};

            return originalOnAdd.call(this, map);
        },

        setContent: function (content) {
            this._bodyContent = content;
            this._update();

            return this;
        },

        setHeaderContent: function (content) {
            this._headerContent = content;

            return this;
        },

        setFooterContent: function (content) {
            this._footerContent = content;

            return this;
        },

        clearHeaderFooter: function() {
            this.clearHeader();
            this.clearFooter();

            return this;
        },

        clearHeader: function () {
            if (this._popupStructure.header) {
                this._headerContent = null;
                this._contentNode.removeChild(this._popupStructure.header);
                delete this._popupStructure.header;
            }

            return this;
        },

        clearFooter: function () {
            if (this._popupStructure.footer) {
                this._footerContent = null;
                this._contentNode.removeChild(this._popupStructure.footer);
                delete this._popupStructure.footer;
            }

            return this;
        },

        _resize: function () {
            var shouldInitBaron;

            shouldInitBaron = this._shouldInitBaron();

            this._updateLayout();
            this._updatePosition();

            if ( shouldInitBaron ) {
                if (!this._isBaronExist) {
                    this._initBaronScroller();
                }
                this._initBaron();
            }
        },

        _shouldInitBaron: function () {
            var popupHeight = this._contentNode.offsetHeight,
                maxHeight = this.options.maxHeight;

            return (maxHeight && maxHeight < popupHeight);
        },

        _initBaron: function () {
            this._baron = graf({
                scroller: '.scroller',
                bar: '.scroller__bar',
                track: '.scroller__bar-wrapper',
                $: function(selector, context) {
                  return bonzo(qwery(selector, context));
                },
                event: function(elem, event, func, mode) {
                    if (mode == 'trigger') {
                    mode = 'fire';
                    }
                    bean[mode || 'on'](elem, event, func);
                }
            });
        },

        _initHeader: function () {
            var headerContainer = document.createElement('div'),
                contentNode = this._contentNode,
                isEmpty = true;

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
                footer = contentNode.querySelector('.dg-popup-footer');

            this._detachEl(this._popupStructure.body);
            scroller.setAttribute('class', 'scroller');
            barWrapper.setAttribute('class', 'scroller__bar-wrapper');
            scrollerBar.setAttribute('class', 'scroller__bar');

            barWrapper.appendChild(scrollerBar);
            scroller.appendChild(this._popupStructure.body);
            scroller.appendChild(barWrapper);

            contentNode.insertBefore(scroller, footer);

            this._scroller = scroller;
            this._scrollerBar = scrollerBar;
            this._barWrapper = barWrapper;
            this._isBaronExist = false;
        },

        _update: function () {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._clearStructure();
            //init popup content dom structure
            if (!this._isHeaderExist && this._headerContent) { this._initHeader(); }
            if (!this._isBodyExist && this._bodyContent) { this._initBodyContainer(); }
            if (!this._isFooterExist && this._footerContent) { this._initFooter(); }

            this._updateContent();
            this._resize();

            L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);

            this._container.style.visibility = '';
            this._adjustPan();
        },

        _updateContent: function () {
            var popupStructure = this._popupStructure,
                contentNode = this._contentNode;

            for (var i in popupStructure) {
                if (popupStructure.hasOwnProperty(i)) {
                    this._insertContent(this['_'+ i +'Content'], popupStructure[i]);
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
            var currNode = node || this._contentNode;

            while (currNode.hasChildNodes()) {
                currNode.removeChild(currNode.firstChild);
            }

            this._isHeaderExist = false;
            this._isBodyExist = false;
            this._isFooterExist = false;
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

// Applies 2GIS divIcon to marker

L.Marker.prototype.options.icon = L.DG.divIcon();

// Adds posibility to change max zoom level
L.Map.prototype.setMaxZoom = function(maxZoom) {
    this._layersMaxZoom = maxZoom;
};
