DG.Entrance.include({
    bindLabel: function(content, options) {

        if (!this._label) {
            this._label = DG.label(content, options);
            this.on(this._labelEvents, this);
        } else {
            this._label.setContent(content);

            if (this._label.options.offset !== options.offset) {
                this._label.setOffset(options.offset);
            }
        }
        return this;
    },

    unbindLabel: function() {
        if (this._label) {
            this.off(this._labelEvents, this);
            this._map.removeLayer(this._label);
            this._label = null;
        }
        return this;
    },

    getLabel: function() {
        return this._label ? this._label : null;
    },

    _labelEvents : {
        mouseover: function(event) {
            this._map.addLayer(this._label.setPosition(event.latlng));
            DG.DomEvent.stop(event);
        },
        mousemove: function(event) {
            this._label.setPosition(event.latlng);
            DG.DomEvent.stop(event);
        },
        mouseout: function() {
            this._label.remove();
        },
        remove: function() {
            this._label.remove();
        }
    }
});

DG.Entrance.addInitHook(function() {
    if (typeof this.options.label !== 'undefined') {
        this.bindLabel(this.options.label);
    }
});
