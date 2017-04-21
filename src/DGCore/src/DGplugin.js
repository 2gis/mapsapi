DG.plugin = function(plugins) {
    var count,
        jsReg = new RegExp(/.js$/i),
        cssReg = new RegExp(/.css$/i);

    return new Promise(function(resolve) {
        function checkLoading() {
            count--;

            if (count === 0) {
                resolve();
            }
        }

        function appendJS(link) {
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', link);
            js.onload = function() {
                checkLoading();
            };
            js.onerror = function() {
                checkLoading();
            };
            // load/error for IE
            js.onreadystatechange = function() {
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
            return jsReg.test(url);
        }

        function isCss(url) {
            return cssReg.test(url);
        }

        function appendAsset(asset) {
            if (isJs(asset)) {
                appendJS(asset);
            } else if (isCss(asset)) {
                appendCSS(asset);
            } else {
                count--;
            }
        }

        if (DG.Util.isArray(plugins)) {
            count = plugins.length;
            plugins.forEach(function(plugin) {
                appendAsset(plugin);
            });
        }

        if (typeof plugins === 'string') {
            count = 1;
            appendAsset(plugins);
        }
    });
};
