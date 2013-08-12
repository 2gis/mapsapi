L.Marker.include({
	
	bindLabel: function (content, options) {

		if (this._label) {
			this._label.setContent(content);
		} else {
			options = L.extend({ offset: new L.Point(5, 5) }, options);
			this._label = L.DG.label(content, options);
			this.once('remove', this.unbindLabel);
			if (options.static) {
				this.showLabel();
			} else {
				this.once('mouseover', this._mouseOverLabel)
			}
		}

		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this
				.hideLabel()
				.off( 'mouseout', this._mouseOutLabel )
				.off( 'mouseover', this._mouseOverLabel )
				.off( 'remove', this.unbindLabel);
			this._label = null;
		}
		return this;
	},

	showLabel : function(){
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

	getLabel: function () {
		return this._label ? this._label : null;
	},

	_updatePosition : function(){
		this._label.setPosition( this.getLatLng() );
	},

	_mouseOverLabel: function(){
		this
			.showLabel()
			.once('mouseout', this._mouseOutLabel);
	},

	_mouseOutLabel: function(){
		this
			.hideLabel()
			.once('mouseover', this._mouseOverLabel );
	}

});

L.Marker.addInitHook(function (){
	if (typeof this.options.label !== 'undefined') {
		this.bindLabel( this.options.label );
	}
});