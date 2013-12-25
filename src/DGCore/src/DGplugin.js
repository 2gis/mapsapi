L.DG.plugin = function (plugins) {
    var count,
        pluginDef = L.DG.when.defer();

    function checkLoading() {
        count--;

        if (count === 0) {
            pluginDef.resolve();
        }
    }

    function appendJS(link) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        js.onload = function () {
            checkLoading();
        };
        js.onerror = function () {
            checkLoading();
        };
        // load/error for IE
        js.onreadystatechange = function () {
            if (js.readyState === 'complete' || js.readyState === 'loaded') {
                checkLoading();
            }
        };

        document.getElementsByTagName('head')[0].appendChild(js);
    }

    function appendCSS(link) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);

        checkLoading();
    }

    function isJs(url) {
        return url.match(/\.[0-9a-z]+$/i)[0] === '.js';
    }

    if ([].isArray(plugins)) {
        count = plugins.length;
        plugins.forEach(function (plugin) {
            isJs(plugin) ? appendJS(plugin) : appendCSS(plugin);
        });
    }

    if (typeof plugins === 'string') {
        count = 1;
        isJs(plugins) ? appendJS(plugins) : appendCSS(plugins);
    }

    return pluginDef.promise;
};
