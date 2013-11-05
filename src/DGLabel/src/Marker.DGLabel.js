L.Marker.include({

	bindLabel: function (content, options) {
		if (this._label) {
			this._label.setContent(content);
			if (options) {
				if (this.options.offset != options.offset) {
					this._label.setOffset(this.options.offset = options.offset);
				}
				if (this.options.static != options.static) {
					this.unbindLabel().bindLabel(content, options);
				}
			}
		} else {
			options = L.extend({
				offset: new L.Point(5, 5)
			}, options);

			this._label = L.DG.label(content, options);

			this.once('remove', this.unbindLabel);

			if (options.static) {
				this.showLabel();
			} else {
				this.once('mouseover', this._mouseOverLabel);
			}

			if (typeof this._map !== 'undefined') {
				this._updateLabelZIndex();
			} else {
				this.once( 'add', this._updateLabelZIndex );
			}
		}
		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this
				.hideLabel()
				.off( 'remove', this.unbindLabel )
				.off( 'mouseover', this._mouseOverLabel )
				.off( 'mouseout', this._mouseOutLabel )
				.off( 'dragstart', this._dragStartLabel )
				.off( 'dragend', this._dragEndLabel )
				.off( 'move', this._updatePosition )
				.off( 'add', this._updateLabelZIndex);
			this._label = null;
		}
		return this;
	},

	getLabel: function () {
		return this._label ? this._label : null;
	},

	_originalUpdateZIndex: L.Marker.prototype._updateZIndex,
	_updateZIndex: function (offset) {
		this._originalUpdateZIndex(offset);
		this._updateLabelZIndex();
		return this;
	},

	_updateLabelZIndex: function(){
		if (this._label && this._icon) {
			this._label.setZIndexOffset( this._icon.style.zIndex );
		}
		return this;
	},

	showLabel : function () {
		if (this._label) {
			this
				.on('move', this._updatePosition)
				._map.addLayer( this._label.setPosition( this.getLatLng() ) );
		}
		return this;
	},

	hideLabel : function(){
		if (this._label) {
			this
				.off('move', this._updatePosition)
				._map.removeLayer( this._label );
		}
		return this;
	},

	_updatePosition : function(){
		this._label.setPosition( this.getLatLng() );
	},

	_dragStartLabel: function(){
		this
			.off('mouseout', this._mouseOutLabel)
			.off('dragstart', this._mouseOutLabel)
			.once('dragend', this._dragEndLabel)
			.hideLabel();
	},

	_dragEndLabel: function(){
		this.once('mouseover', this._mouseOverLabel );
	},

	_mouseOverLabel: function(){
		this
			.showLabel()
			.on('dragstart', this._dragStartLabel)
			.on('mouseout', this._mouseOutLabel);
	},

	_mouseOutLabel: function(){
		this
			.hideLabel()
			.off('mouseout', this._mouseOutLabel)
			.off('dragstart', this._dragStartLabel)
			.once('mouseover', this._mouseOverLabel );
	}

});

L.Marker.addInitHook(function (){
	if (typeof this.options.label !== 'undefined') {
		this.bindLabel( this.options.label );
	}
});