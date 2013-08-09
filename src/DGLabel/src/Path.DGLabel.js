L.Path.include({
	bindLabel: function (content, options) {
		
		if (!this._label) {
			this._label = L.DG.label(content, options);
			this.on(this._labelEvents, this);
		} else {
			this._label.setContent(content);
		}
		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this._labelEvents['mouseout remove'].call(this);
			this._label = null;
			this.off(this._labelEvents, this);
		}
		return this;
	},

	getLabel: function () {
		return this._label ? this._label : null;
	},

	_labelEvents : {
		'mouseover': function (event) {
			this._map.addLayer( this._label.setPosition( event.latlng ) );
		},
		'mousemove': function (event) {
			this._label.setPosition( event.latlng )
		},
		'mouseout remove': function () {
			this._map.removeLayer( this._label );
		}
	}
});

L.Path.addInitHook(function (){
	if (typeof this.options.label !== 'undefined') {
		this.bindLabel( this.options.label );
	}
});