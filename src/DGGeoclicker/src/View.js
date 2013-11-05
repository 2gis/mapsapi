L.DG.Geoclicker.View = L.Class.extend({

    initialize: function (map, options) { // (Object, Object)
        this._map = map;
        this._popup = L.popup({
            maxHeight: 300,
            minHeight: 50,
            maxWidth: 385,
            minWidth: 385
        });

        /*global __DGGeoclicker_TMPL__:false */
        this._templates = __DGGeoclicker_TMPL__;
        if (options) {
            L.Util.setOptions(this, options);
        }
    },

    showLoader: function (loader) {
        if (loader) {
            loader.style.display = 'block';
        }
    },

    hideLoader: function (loader) {
        if (loader) {
            loader.style.display = 'none';
        }
    },

    initLoader: function (isSmall) {
        var loader = document.createElement('div');
        loader.innerHTML = L.DG.template(this.getTemplate('loader'),
            {
                small: isSmall,
                anim: this._detectCssAnimation()
            }
        );

        return loader.firstChild;
    },

    showPopup: function (latlng, content) { // (Object)
        this._popup
                .setContent(content)
                .setLatLng(latlng)
                .openOn(this._map);
    },

    render: function (options) { // (Object) -> String
        var html,
            data = {};

        options = options || {};
        options.tmpl = options.tmpl || '';

        if (options.data) {
            html = L.DG.template(options.tmpl, options.data);
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

    renderPopup: function (options) { // (Object) -> String
        options.popup = true;
        return this.render(options);
    },

    getPopup: function () { // () -> Object
        return this._popup;
    },

    getTemplate: function (tmplFile) {
        var tmpl = this._templates[tmplFile];
        return tmpl ? tmpl : '';
    },

    _detectCssAnimation: function () {
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            elm = document.createElement('div'),
            pfx  = '';

        if (elm.style.animationName) { animation = true; }

        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    pfx = domPrefixes[i];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }
        return animation;
    }
});
