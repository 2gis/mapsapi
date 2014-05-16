DG.Map.addInitHook(function () {

	function dgInvalidateSize(event) {
		this.invalidateSize();
		return;
	}

	this._checker = DG.DomUtil.create('div', 'dg-core__invalidatesize', this._container);
	DG.DomEvent.addListener(this._checker, 'webkitAnimationStart', dgInvalidateSize, this);



});