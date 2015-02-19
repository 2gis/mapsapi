DG.Marker.include({

    bindLabel: function (content, options) {
        if (this._label) {
            this._label.setContent(content);
            if (options) {
                if (this.options.offset !== options.offset) {
                    this._label.setOffset(this.options.offset = options.offset);
                }
                if (this.options.static !== options.static) {
                    this.unbindLabel().bindLabel(content, options);
                }
            }
        } else {
            options = DG.extend({
                offset: new DG.Point(5, 5)
            }, options);

            this._label = DG.label(content, options);

            this.once('remove', this.unbindLabel);

            if (options.static) {
                this.showLabel();
            } else {
                this
                    .on('mouseover', this._mouseOverLabel)
                    .on('mouseout', this._mouseOutLabel)
                    .on('dragstart', this._dragStartLabel)
                    .on('dragend', this._dragEndLabel);
            }

            if (typeof this._map !== 'undefined') {
                this._updateLabelZIndex();
            } else {
                this.once('add', this._updateLabelZIndex);
            }
        }
        return this;
    },

    unbindLabel: function () {
        if (this._label) {
            this
                .hideLabel()
                .off('remove', this.unbindLabel)
                .off('mouseover', this._mouseOverLabel)
                .off('mouseout', this._mouseOutLabel)
                .off('dragstart', this._dragStartLabel)
                .off('dragend', this._dragEndLabel)
                .off('move', this._updatePosition)
                .off('add', this._updateLabelZIndex);

            this._label = null;
        }
        return this;
    },

    getLabel: function () {
        return this._label ? this._label : null;
    },

    _originalUpdateZIndex: DG.Marker.prototype._updateZIndex,
    _updateZIndex: function (offset) {
        this._originalUpdateZIndex(offset);
        this._updateLabelZIndex();
        return this;
    },

    _updateLabelZIndex: function () {
        if (this._label && this._icon) {
            this._label.setZIndexOffset(this._icon.style.zIndex);
        }
        return this;
    },

    showLabel : function () {
        if (this._label) {
            this
                .on('move', this._updatePosition)
                ._map.addLayer(this._label.setPosition(this.getLatLng()));
        }

        return this;
    },

    hideLabel : function () {
        if (this._label) {
            this
                .off('move', this._updatePosition)
                ._map.removeLayer(this._label);
        }
        return this;
    },

    _updatePosition : function () {
        this._label.setPosition(this.getLatLng());
    },

    _dragStartLabel: function () {
        this
            .off('mouseover', this._mouseOverLabel)
            .off('mouseout', this._mouseOutLabel)
            .hideLabel();
    },

    _dragEndLabel: function () {
        this
            .on('mouseover', this._mouseOverLabel)
            .on('mouseout', this._mouseOutLabel)
            .showLabel();
    },

    _mouseOverLabel: function () {
        this.showLabel();
    },

    _mouseOutLabel: function () {
        this.hideLabel();
    }
});

DG.Marker.addInitHook(function () {
    if (typeof this.options.label !== 'undefined') {
        this.bindLabel(this.options.label);
    }
});
