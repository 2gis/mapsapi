L.DG.Geoclicker.View = L.Class.extend({

    initialize: function(map, options) { // (Object, Object)
        this._map = map;
        this._popup = L.popup({maxHeight:300, maxWidth: 400});
        options && L.Util.setOptions(this, options);
    },

    showLoader: function () {
        this.hideLoader();
        var i = 1,
            popup = this._popup;

        function showLoaderContent() {
            var str = 'loading.';
            if (i > 1) {
                str += i > 2 ? '..' : '.';
            }
            popup.setContent(str);
            i = i > 2 ? 1 : i + 1;
        }

        this._loaderTimer = setInterval(showLoaderContent, 400);
        showLoaderContent();
    },

    hideLoader: function () {
        clearInterval(this._loaderTimer);
    },

    showPopup: function (latlng) { // (Object)
        this._popup.setLatLng(latlng).openOn(this._map);
    },

    render: function(options) { // (Object) -> String
        var html;

        options = options || {};
        options.tmpl = options.tmpl || "";

        if (options.data) {
            html = L.Util.template(options.tmpl, options.data);
        } else {
            html = options.tmpl;
        }
        if (options.popup) {
            this._popup.setContent(html);
        }

        if (options.afterRender) {
            options.afterRender();
        }

        return html;
    },

    renderPopup: function(options) { // (Object) -> String
        options.popup = true;
        return this.render(options);
    },

    getPopup: function() { // () -> Object
        return this._popup;
    }
});
