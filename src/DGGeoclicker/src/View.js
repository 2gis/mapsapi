DG.Geoclicker.View = DG.Class.extend({

    initialize: function(map, options) { // (Object, Object)
        this._map = map;
        this._popup = DG.popup({
            maxHeight: 300,
            minHeight: 50,
            maxWidth: 385,
            minWidth: 310,
            sprawling: true,
            closeOnClick: true
        });

        if (options) {
            DG.Util.setOptions(this, options);
        }
    },

    initLoader: function(isSmall) {
        var loader = document.createElement('div');
        loader.innerHTML = DG.dust('DGGeoclicker/loader', {
            small: isSmall,
            anim: this._detectCssAnimation()
        });

        return loader.firstChild;
    },

    showPopup: function(latlng, content) { // (Object)
        this._popup
            .setContent(content)
            .setLatLng(latlng)
            .openOn(this._map);
    },

    render: function(options) { // (Object) -> String
        var html,
            data = {};

        options = options || {};
        options.tmpl = options.tmpl || '';

        if (options.data) {
            html = this.renderTemplate(options.tmpl, options.data);
        } else {
            html = options.tmpl;
        }

        if (options.beforeRender) {
            options.beforeRender();
        }

        if (options.popup) {
            if (options.header) {
                data.header = options.header;
            }
            if (options.footer) {
                data.footer = options.footer;
            }
            data.body = html;
            this._popup.setContent(data);
        }
        if (options.afterRender) {
            options.afterRender();
        }

        return html;
    },

    renderTemplate: function(name, data) {
        return DG.dust('DGGeoclicker/' + name, data);
    },

    renderPopup: function(options) { // (Object) -> String
        options.popup = true;
        return this.render(options);
    },

    getPopup: function() { // () -> Object
        return this._popup;
    },

    _detectCssAnimation: function() {
        var animation = false,
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            elm = document.createElement('div');

        if (elm.style.animationName) { animation = true; }

        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    animation = true;
                    break;
                }
            }
        }
        return animation;
    }
});
